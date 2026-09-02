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

/** Same as localizedEntries, but each locale gets its own translated path (e.g. localized slugs). */
function localizedContentEntries(
  pathsByLocale: Partial<Record<(typeof activeLocales)[number], string>>,
  opts: { priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; lastModified?: Date },
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    activeLocales.filter((l) => pathsByLocale[l]).map((l) => [localeTags[l], `${SITE_URL}/${l}${pathsByLocale[l]}`]),
  )
  return activeLocales
    .filter((l) => pathsByLocale[l])
    .map((l) => ({
      url: `${SITE_URL}/${l}${pathsByLocale[l]}`,
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

    // Slugs are localized now, so each locale needs its own fetch to know its own path.
    const [experiencesByLocale, postsByLocale] = await Promise.all([
      Promise.all(activeLocales.map((l) => payload.find({ collection: 'experiences', limit: 50, depth: 0, locale: l }))),
      Promise.all(
        activeLocales.map((l) =>
          payload.find({
            collection: 'posts',
            where: { status: { equals: 'published' } },
            limit: 500,
            depth: 0,
            locale: l,
          }),
        ),
      ),
    ])

    const experienceSlugsById = new Map<number, Partial<Record<(typeof activeLocales)[number], string>>>()
    const experienceUpdatedById = new Map<number, string | undefined>()
    experiencesByLocale.forEach((res, i) => {
      const l = activeLocales[i]
      for (const exp of res.docs) {
        const entry = experienceSlugsById.get(exp.id) ?? {}
        entry[l] = exp.slug
        experienceSlugsById.set(exp.id, entry)
        experienceUpdatedById.set(exp.id, exp.updatedAt)
      }
    })

    const postSlugsById = new Map<number, Partial<Record<(typeof activeLocales)[number], string>>>()
    const postUpdatedById = new Map<number, string | undefined>()
    postsByLocale.forEach((res, i) => {
      const l = activeLocales[i]
      for (const post of res.docs) {
        const entry = postSlugsById.get(post.id) ?? {}
        entry[l] = post.slug
        postSlugsById.set(post.id, entry)
        postUpdatedById.set(post.id, post.updatedAt)
      }
    })

    for (const [id, slugs] of experienceSlugsById) {
      const lastModified = experienceUpdatedById.get(id) ? new Date(experienceUpdatedById.get(id) as string) : undefined
      entries.push(
        ...localizedContentEntries(
          Object.fromEntries(Object.entries(slugs).map(([l, s]) => [l, `/${s}`])),
          { priority: 0.9, changeFrequency: 'weekly', lastModified },
        ),
        ...localizedContentEntries(
          Object.fromEntries(Object.entries(slugs).map(([l, s]) => [l, `/${s}-private`])),
          { priority: 0.8, changeFrequency: 'weekly', lastModified },
        ),
      )
    }
    for (const [id, slugs] of postSlugsById) {
      const lastModified = postUpdatedById.get(id) ? new Date(postUpdatedById.get(id) as string) : undefined
      entries.push(
        ...localizedContentEntries(
          Object.fromEntries(Object.entries(slugs).map(([l, s]) => [l, `/blog/${s}`])),
          { priority: 0.7, changeFrequency: 'monthly', lastModified },
        ),
      )
    }
  } catch {
    // If the CMS is unreachable at build time, still return the static routes.
  }

  return entries
}
