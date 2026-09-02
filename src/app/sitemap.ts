import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { activeLocales, localeTags } from '@/i18n/config'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.dourowonders.com'

/** Builds one entry per locale, each listing the other locales as alternates. */
function localizedEntries(
  path: string,
  opts: { priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; lastModified?: Date },
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(activeLocales.map((l) => [localeTags[l], `${SITE_URL}/${l}${path}`]))
  return activeLocales.map((l) => ({
    url: `${SITE_URL}/${l}${path}`,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages },
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths: Array<[string, number, MetadataRoute.Sitemap[number]['changeFrequency']]> = [
    ['', 1, 'weekly'],
    ['/blog', 0.8, 'weekly'],
    ['/about', 0.7, 'monthly'],
    ['/special-occasions', 0.7, 'monthly'],
    ['/contact', 0.6, 'monthly'],
    ['/cancellation-policy', 0.3, 'yearly'],
    ['/privacy-policy', 0.2, 'yearly'],
    ['/terms', 0.2, 'yearly'],
  ]

  const entries: MetadataRoute.Sitemap = staticPaths.flatMap(([path, priority, changeFrequency]) =>
    localizedEntries(path, { priority, changeFrequency }),
  )

  try {
    const payload = await getPayload({ config })
    const [experiences, posts] = await Promise.all([
      payload.find({ collection: 'experiences', limit: 50, depth: 0 }),
      payload.find({
        collection: 'posts',
        where: { status: { equals: 'published' } },
        limit: 500,
        depth: 0,
      }),
    ])

    for (const exp of experiences.docs) {
      entries.push(
        ...localizedEntries(`/${exp.slug}`, {
          priority: 0.9,
          changeFrequency: 'weekly',
          lastModified: exp.updatedAt ? new Date(exp.updatedAt) : undefined,
        }),
        ...localizedEntries(`/${exp.slug}-private`, {
          priority: 0.8,
          changeFrequency: 'weekly',
          lastModified: exp.updatedAt ? new Date(exp.updatedAt) : undefined,
        }),
      )
    }
    for (const post of posts.docs) {
      entries.push(
        ...localizedEntries(`/blog/${post.slug}`, {
          priority: 0.7,
          changeFrequency: 'monthly',
          lastModified: post.updatedAt ? new Date(post.updatedAt) : undefined,
        }),
      )
    }
  } catch {
    // If the CMS is unreachable at build time, still return the static routes.
  }

  return entries
}
