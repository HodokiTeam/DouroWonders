import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactSection } from '@/components/ContactSection'
import type { Homepage, Media, Post, SiteSetting } from '@/payload-types'
import { isLocale, activeLocales, localeTags, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dourowonders.com'

const mediaUrl = (m?: (number | null) | Media | null, fallback?: string): string => {
  if (m && typeof m === 'object' && m.url) return m.url
  return fallback || '/images/boat-porto-bridge.png'
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const l: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(l)
  return {
    title: dict.blog.title,
    description: dict.blog.lead,
    alternates: {
      canonical: `/${l}/blog`,
      languages: {
        ...Object.fromEntries(activeLocales.map((x) => [localeTags[x], `/${x}/blog`])),
        'x-default': '/en/blog',
      },
    },
    openGraph: {
      title: `${dict.blog.title} | Douro Wonders`,
      description: dict.blog.lead,
      images: [{ url: '/images/ribeira-view.png', alt: 'The Douro river in Porto' }],
    },
  }
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(locale)
  const base = `/${locale}`
  const payload = await getPayload({ config })

  const [home, settings, postsRes] = await Promise.all([
    payload.findGlobal({ slug: 'homepage', locale }) as Promise<Homepage>,
    payload.findGlobal({ slug: 'site-settings', locale }) as Promise<SiteSetting>,
    payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 50,
      locale,
    }),
  ])

  const posts = postsRes.docs as Post[]
  const campaignActive = home?.campaign?.active !== false
  const dateFmt = new Intl.DateTimeFormat(localeTags[locale], { dateStyle: 'long' })

  return (
    <>
      <Header locale={locale} dict={dict} announcement={campaignActive ? home?.campaign?.badgeText : null} />

      <section className="section" style={{ paddingTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
        <div className="container">
          <div className="section-head--center">
            <p className="eyebrow">{dict.sections.blog}</p>
            <h1 className="section-title">{dict.blog.title}</h1>
            <p className="section-lead">{dict.blog.lead}</p>
          </div>

          <div className="post-grid">
            {posts.map((post) => (
              <article className="card post-card" key={post.id}>
                <Link href={`${base}/blog/${post.slug}`} className="post-card__img">
                  <img src={mediaUrl(post.coverImage)} alt={post.title} loading="lazy" />
                </Link>
                <div className="post-card__body">
                  <div className="post-card__meta">
                    {post.publishedAt && <span>{dateFmt.format(new Date(post.publishedAt))}</span>}
                    {post.readingMinutes ? (
                      <span>
                        {post.readingMinutes} {dict.blog.readingTime}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="post-card__title">
                    <Link href={`${base}/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="post-card__excerpt">{post.excerpt}</p>
                  <Link href={`${base}/blog/${post.slug}`} className="link-gold post-card__more">
                    {dict.blog.readMore} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
        cofinancingLabel={settings?.cofinancing?.label}
        cofinancingLogos={settings?.cofinancing?.logos}
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
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: dict.blog.title,
            description: dict.blog.lead,
            url: `${SITE_URL}/${locale}/blog`,
            publisher: { '@type': 'Organization', name: 'Douro Wonders' },
            blogPost: posts.map((p) => ({
              '@type': 'BlogPosting',
              headline: p.title,
              description: p.excerpt,
              url: `${SITE_URL}/${locale}/blog/${p.slug}`,
              datePublished: p.publishedAt,
            })),
          }),
        }}
      />
    </>
  )
}
