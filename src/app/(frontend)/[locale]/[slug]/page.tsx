import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BokunWidget } from '@/components/BokunWidget'
import { ContactSection } from '@/components/ContactSection'
import type { Experience, Homepage, Media, SiteSetting } from '@/payload-types'
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const payload = await getPayload({ config })
  const res = await payload.find({ collection: 'experiences', where: { slug: { equals: slug } }, limit: 1, locale })
  const exp = res.docs[0] as Experience | undefined
  if (!exp) return {}
  const image = mediaUrl(exp.image, '/images/boat-porto-bridge.png')
  return {
    title: exp.subtitle || exp.title,
    description: exp.shared?.shortCopy || undefined,
    alternates: {
      canonical: `/${locale}/${exp.slug}`,
      languages: {
        ...Object.fromEntries(locales.map((x) => [localeTags[x], `/${x}/${exp.slug}`])),
        'x-default': `/en/${exp.slug}`,
      },
    },
    openGraph: {
      title: exp.subtitle || exp.title,
      description: exp.shared?.shortCopy || undefined,
      images: [{ url: image, alt: exp.subtitle || exp.title }],
    },
  }
}

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.dourowonders.com'

const mediaUrl = (m?: (number | null) | Media | null, fallback?: string): string => {
  if (m && typeof m === 'object' && m.url) return m.url
  return fallback || '/images/hero.png'
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(locale)
  const base = `/${locale}`
  const payload = await getPayload({ config })

  const [expRes, home, settings] = await Promise.all([
    payload.find({ collection: 'experiences', where: { slug: { equals: slug } }, limit: 1, locale }),
    payload.findGlobal({ slug: 'homepage', locale }) as Promise<Homepage>,
    payload.findGlobal({ slug: 'site-settings', locale }) as Promise<SiteSetting>,
  ])

  const exp = expRes.docs[0] as Experience | undefined
  if (!exp) notFound()

  const campaignActive = home?.campaign?.active !== false
  const bookingChannelUUID = settings?.bokun?.bookingChannelUUID
  const schedule = (exp.schedule || []).map((s) => s.time).join(' | ')
  const d = exp.details
  const email = settings?.email || 'info@dourowonders.com'
  const paragraphs = (d?.fullDescription || '').split(/\n\s*\n/).filter(Boolean)

  return (
    <>
      <Header locale={locale} dict={dict} announcement={campaignActive ? home?.campaign?.badgeText : null} />

      <section className="hero exp-hero">
        <div className="hero__bg">
          <Image
            src={mediaUrl(exp.image, '/images/hero.png')}
            alt={exp.subtitle || exp.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="container hero__content">
          {campaignActive && home?.campaign?.badgeText && (
            <span className="badge badge--onimage">{home.campaign.badgeText}</span>
          )}
          <h1 className="hero__title">{exp.title}</h1>
          <p className="hero__sub">{exp.subtitle}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container detail-layout">
          {/* -------- Main column -------- */}
          <div>
            {/* Photo gallery — first thing in the main column, beside the booking box */}
            {!!exp.gallery?.length && (
              <div className="exp-gallery exp-gallery--inline">
                {exp.gallery.map((g, i) => (
                  <figure key={g.id || i}>
                    <img src={mediaUrl(g.image)} alt={g.caption || exp.subtitle || exp.title} loading="lazy" />
                    {g.caption && <figcaption>{g.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            )}

            {/* Facts */}
            <div className="facts">
              <div className="fact">
                <div className="fact__icon">⏱</div>
                <div>
                  <strong>{dict.detail.duration} {exp.duration}</strong>
                  <span>{schedule ? `${dict.detail.departures}: ${schedule}` : dict.detail.checkAvailability}</span>
                </div>
              </div>
              <div className="fact">
                <div className="fact__icon">✓</div>
                <div>
                  <strong>{dict.detail.freeCancellation}</strong>
                  <span>{dict.detail.freeCancellationNote}</span>
                </div>
              </div>
              <div className="fact">
                <div className="fact__icon">🗣</div>
                <div>
                  <strong>{dict.detail.localHosts}</strong>
                  <span>{d?.languages ? `${dict.detail.languages}: ${d.languages}` : dict.detail.localHostsNote}</span>
                </div>
              </div>
              <div className="fact">
                <div className="fact__icon">👥</div>
                <div>
                  <strong>{dict.detail.smallGroup}</strong>
                  <span>{dict.detail.smallGroupNote}</span>
                </div>
              </div>
            </div>

            {/* Highlights */}
            {!!d?.highlights?.length && (
              <div className="detail-section">
                <h2>{dict.detail.highlights}</h2>
                <ul className="check-list">
                  {d.highlights.map((h) => (
                    <li key={h.id || h.text}>{h.text}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full description */}
            {paragraphs.length > 0 && (
              <div className="detail-section">
                <h2>{dict.detail.fullDescription}</h2>
                <div className="prose">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {!!d?.itinerary?.length && (
              <div className="detail-section">
                <h2>{dict.detail.itinerary}</h2>
                <ol className="route__stops">
                  {d.itinerary.map((s) => (
                    <li key={s.id || s.stop}>
                      <strong style={{ fontWeight: 500, color: '#3f3d38' }}>{s.stop}</strong>
                      {s.note && (
                        <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--muted-grey)' }}>{s.note}</div>
                      )}
                    </li>
                  ))}
                </ol>
                <p className="route__note">
                  {dict.detail.routeNote}
                </p>
              </div>
            )}

            {/* Includes */}
            {!!d?.includes?.length && (
              <div className="detail-section">
                <h2>{dict.detail.includes}</h2>
                <ul className="check-list">
                  {d.includes.map((i) => (
                    <li key={i.id || i.item}>{i.item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Meeting point */}
            <div className="detail-section">
              <h2>{dict.detail.meetingPoint}</h2>
              <p>
                {settings?.meetingPoint?.name || 'Douro Marina | Afurada'} ·{' '}
                {(settings?.meetingPoint?.addressLines || []).map((l) => l.line).join(' · ') ||
                  'Rua da Praia 430 · Gate B · 4400-354 Vila Nova de Gaia · Porto, Portugal'}
              </p>
              <p style={{ fontWeight: 500, color: '#3f3d38', marginTop: '0.4rem' }}>
                {settings?.meetingPoint?.arrivalNote || 'Please arrive 10 minutes before departure.'}
              </p>
              {settings?.meetingPoint?.mapsUrl && (
                <p style={{ marginTop: '0.8rem' }}>
                  <a
                    href={settings.meetingPoint.mapsUrl}
                    className="link-gold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dict.detail.openInMaps}
                  </a>
                </p>
              )}
            </div>

            {/* Important information */}
            {(!!d?.notSuitableFor?.length || !!d?.notAllowed?.length || !!d?.knowBeforeYouGo?.length) && (
              <div className="detail-section">
                <h2>{dict.detail.importantInfo}</h2>
                {!!d?.notSuitableFor?.length && (
                  <>
                    <h3 style={{ fontSize: '1rem', margin: '0.8rem 0 0.4rem' }}>{dict.detail.notSuitable}</h3>
                    <ul className="x-list">
                      {d.notSuitableFor.map((i) => (
                        <li key={i.id || i.item}>{i.item}</li>
                      ))}
                    </ul>
                  </>
                )}
                {!!d?.notAllowed?.length && (
                  <>
                    <h3 style={{ fontSize: '1rem', margin: '0.8rem 0 0.4rem' }}>{dict.detail.notAllowed}</h3>
                    <ul className="x-list">
                      {d.notAllowed.map((i) => (
                        <li key={i.id || i.item}>{i.item}</li>
                      ))}
                    </ul>
                  </>
                )}
                {!!d?.knowBeforeYouGo?.length && (
                  <>
                    <h3 style={{ fontSize: '1rem', margin: '0.8rem 0 0.4rem' }}>{dict.detail.knowBefore}</h3>
                    <ul className="check-list">
                      {d.knowBeforeYouGo.map((i) => (
                        <li key={i.id || i.item}>{i.item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>

          {/* -------- Booking aside -------- */}
          <aside className="detail-aside" id="book">
            <article className="card rate-card" id="shared">
              <p className="eyebrow">{dict.detail.sharedRate}</p>
              <div className="rate-card__price">
                {campaignActive && exp.shared?.referencePrice ? (
                  <s style={{ fontWeight: 300, color: 'var(--muted-grey)', marginRight: '0.5rem' }}>
                    €{exp.shared.referencePrice}
                  </s>
                ) : null}
                €{exp.shared?.launchPrice} <small>{dict.hero.perPerson}</small>
              </div>
              <p style={{ fontSize: '0.92rem' }}>{exp.shared?.shortCopy}</p>
              <BokunWidget
                bookingChannelUUID={bookingChannelUUID}
                widgetSrc={exp.bokun?.widgetSrc}
                ctaLabel={exp.shared?.ctaLabel || dict.common.bookNow}
              />
            </article>

            <article className="card rate-card" id="private">
              <p className="eyebrow">{dict.detail.privateRate}</p>
              <div className="rate-card__price">
                €{exp.private?.launchPrice} <small>{dict.hero.perBoat}</small>
              </div>
              <p style={{ fontSize: '0.92rem' }}>{exp.private?.shortCopy}</p>
              <BokunWidget
                bookingChannelUUID={bookingChannelUUID}
                widgetSrc={exp.bokun?.widgetSrc}
                ctaLabel={exp.private?.ctaLabel || dict.common.bookNow}
              />
            </article>

            <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--muted-grey)' }}>
              {dict.detail.customDetails}{' '}
              <a href={`mailto:${email}`} className="link-gold">
                {dict.detail.speakWithUs}
              </a>
              .
            </p>
          </aside>
        </div>
      </section>

      {/* Contact */}
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
        email={settings?.email}
        whatsapp={settings?.whatsapp}
        meetingPointName={settings?.meetingPoint?.name}
        addressLines={settings?.meetingPoint?.addressLines?.map((l) => l.line)}
        social={settings?.social || undefined}
        phones={settings?.phones?.filter((p) => p.number) as { label?: string | null; number: string }[] | undefined}
        livroReclamacoesUrl={settings?.legal?.livroReclamacoesUrl}
        rnaat={settings?.legal?.rnaat}
      />

      <div className="sticky-cta">
        <a href={`#book`} className="btn btn--primary">
          {home?.hero?.mobileStickyCta || 'Check Availability'}
        </a>
      </div>

      {/* Structured data: product + breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: exp.subtitle || exp.title,
              description: exp.shared?.shortCopy,
              url: `${SITE_URL}/${exp.slug}`,
              image: `${SITE_URL}${mediaUrl(exp.image, '/images/boat-porto-bridge.png')}`,
              brand: { '@type': 'Brand', name: 'Douro Wonders' },
              offers: [
                {
                  '@type': 'Offer',
                  name: 'Shared cruise (per person)',
                  price: exp.shared?.launchPrice,
                  priceCurrency: 'EUR',
                  availability: 'https://schema.org/InStock',
                  url: `${SITE_URL}/${exp.slug}`,
                },
                {
                  '@type': 'Offer',
                  name: 'Private cruise (whole boat)',
                  price: exp.private?.launchPrice,
                  priceCurrency: 'EUR',
                  availability: 'https://schema.org/InStock',
                  url: `${SITE_URL}/${exp.slug}#private`,
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Experiences', item: `${SITE_URL}/#experiences` },
                { '@type': 'ListItem', position: 3, name: exp.title, item: `${SITE_URL}/${exp.slug}` },
              ],
            },
          ]),
        }}
      />
    </>
  )
}
