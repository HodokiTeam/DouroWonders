import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactSection } from '@/components/ContactSection'
import type { Experience, Homepage, Media, Post, SiteSetting } from '@/payload-types'
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.dourowonders.com'

const mediaUrl = (m?: (number | null) | Media | null, fallback?: string): string => {
  if (m && typeof m === 'object' && m.url) return m.url
  return fallback || '/images/boat-porto-bridge.png'
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const payload = await getPayload({ config })
  const res = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, locale })
  const post = res.docs[0] as Post | undefined
  if (!post) return {}

  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt
  return {
    title,
    description,
    keywords: post.keywords ? post.keywords.split(',').map((k) => k.trim()) : undefined,
    alternates: {
      canonical: `/${locale}/blog/${post.slug}`,
      languages: {
        ...Object.fromEntries(locales.map((x) => [localeTags[x], `/${x}/blog/${post.slug}`])),
        'x-default': `/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: post.publishedAt || undefined,
      images: [{ url: mediaUrl(post.coverImage), alt: post.title }],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(locale)
  const base = `/${locale}`
  const payload = await getPayload({ config })

  const [postRes, home, settings] = await Promise.all([
    payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, locale, depth: 2 }),
    payload.findGlobal({ slug: 'homepage', locale }) as Promise<Homepage>,
    payload.findGlobal({ slug: 'site-settings', locale }) as Promise<SiteSetting>,
  ])

  const post = postRes.docs[0] as Post | undefined
  if (!post) notFound()

  const campaignActive = home?.campaign?.active !== false
  const dateFmt = new Intl.DateTimeFormat(localeTags[locale], { dateStyle: 'long' })
  const related = (typeof post.relatedExperience === 'object' ? post.relatedExperience : null) as Experience | null

  // A few more articles to keep people on the site
  const moreRes = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' }, slug: { not_equals: slug } },
    sort: '-publishedAt',
    limit: 3,
    locale,
  })
  const more = moreRes.docs as Post[]

  return (
    <>
      <Header locale={locale} dict={dict} announcement={campaignActive ? home?.campaign?.badgeText : null} />

      <article>
        <section className="section post-hero">
          <div className="container" style={{ maxWidth: '48rem' }}>
            <p className="post-hero__back">
              <Link href={`${base}/blog`} className="link-gold">
                ← {dict.blog.backToBlog}
              </Link>
            </p>
            <h1 className="post-hero__title">{post.title}</h1>
            <div className="post-card__meta" style={{ justifyContent: 'flex-start' }}>
              {post.publishedAt && (
                <span>
                  {dict.blog.publishedOn} {dateFmt.format(new Date(post.publishedAt))}
                </span>
              )}
              {post.readingMinutes ? (
                <span>
                  {post.readingMinutes} {dict.blog.readingTime}
                </span>
              ) : null}
            </div>
          </div>
        </section>

        {post.coverImage && (
          <div className="container post-cover">
            <img src={mediaUrl(post.coverImage)} alt={post.title} />
          </div>
        )}

        <section className="section" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
          <div className="container post-body">
            {post.content && <RichText data={post.content} />}

            {related && (
              <aside className="post-cta">
                <p className="eyebrow">{dict.sections.experiences}</p>
                <h2>{dict.blog.relatedCta}</h2>
                <p>{related.shared?.shortCopy}</p>
                <Link href={`${base}/${related.slug}`} className="btn btn--primary">
                  {related.shared?.ctaLabel || dict.common.bookNow}
                </Link>
              </aside>
            )}
          </div>
        </section>

        {more.length > 0 && (
          <section className="section section--white">
            <div className="container">
              <h2 className="section-title" style={{ marginBottom: '2rem' }}>
                {dict.blog.title}
              </h2>
              <div className="post-grid">
                {more.map((p) => (
                  <article className="card post-card" key={p.id}>
                    <Link href={`${base}/blog/${p.slug}`} className="post-card__img">
                      <img src={mediaUrl(p.coverImage)} alt={p.title} loading="lazy" />
                    </Link>
                    <div className="post-card__body">
                      <h3 className="post-card__title">
                        <Link href={`${base}/blog/${p.slug}`}>{p.title}</Link>
                      </h3>
                      <p className="post-card__excerpt">{p.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <ContactSection
        locale={locale}
        dict={dict}
        email={settings?.email}
        whatsapp={settings?.whatsapp}
        phones={settings?.phones?.filter((p) => p.number) as { label?: string | null; number: string }[] | undefined}
      />

      <Footer
        locale={locale}
        dict={dict}
        tagline={settings?.footerTagline}
        email={settings?.email}
        whatsapp={settings?.whatsapp}
        meetingPointName={settings?.meetingPoint?.name}
        addressLines={settings?.meetingPoint?.addressLines?.map((l) => l.line)}
        social={settings?.social || undefined}
        phones={settings?.phones?.filter((p) => p.number) as { label?: string | null; number: string }[] | undefined}
        livroReclamacoesUrl={settings?.legal?.livroReclamacoesUrl}
        rnaat={settings?.legal?.rnaat}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.seoTitle || post.title,
              description: post.seoDescription || post.excerpt,
              image: `${SITE_URL}${mediaUrl(post.coverImage)}`,
              datePublished: post.publishedAt,
              dateModified: post.updatedAt,
              inLanguage: localeTags[locale],
              author: { '@type': 'Organization', name: post.author || 'Douro Wonders' },
              publisher: {
                '@type': 'Organization',
                name: 'Douro Wonders',
                logo: {
                  '@type': 'ImageObject',
                  url: `${SITE_URL}/brand/symbol-trim.png`,
                },
              },
              mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${locale}/blog/${post.slug}` },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
                { '@type': 'ListItem', position: 2, name: dict.sections.blog, item: `${SITE_URL}/${locale}/blog` },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: post.title,
                  item: `${SITE_URL}/${locale}/blog/${post.slug}`,
                },
              ],
            },
          ]),
        }}
      />
    </>
  )
}
