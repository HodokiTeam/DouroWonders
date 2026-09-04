import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BokunWidget } from '@/components/BokunWidget'
import { ContactSection } from '@/components/ContactSection'
import { ExperienceGallery } from '@/components/ExperienceGallery'
import { RouteMap } from '@/components/RouteMap'
import { StickyBookingCta } from '@/components/StickyBookingCta'
import { strokeIcons } from '@/components/IncludedIcons'
import type { Experience, Homepage, Media, SiteSetting } from '@/payload-types'
import { isLocale, activeLocales, localeTags, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const dynamic = 'force-dynamic'

type Variant = 'shared' | 'private'

const PRIVATE_SUFFIX = '-private'

/** "/day-cruise-private" books the same Bókun experience as "/day-cruise" —
    the suffix only picks which side of the page leads. */
function parseSlug(raw: string): { baseSlug: string; variant: Variant } {
  if (raw.endsWith(PRIVATE_SUFFIX)) {
    return { baseSlug: raw.slice(0, -PRIVATE_SUFFIX.length), variant: 'private' }
  }
  return { baseSlug: raw, variant: 'shared' }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug: raw, locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en'
  const { baseSlug, variant } = parseSlug(raw)
  const payload = await getPayload({ config })
  const res = await payload.find({ collection: 'experiences', where: { slug: { equals: baseSlug } }, limit: 1, locale })
  const exp = res.docs[0] as Experience | undefined
  if (!exp) return {}

  // Slugs are localized — the hreflang alternates need each locale's own slug, not this one's.
  const allSlugsRes = await payload.findByID({ collection: 'experiences', id: exp.id, locale: 'all', depth: 0 })
  const slugsByLocale = allSlugsRes.slug as unknown as Record<Locale, string>
  const suffix = variant === 'private' ? PRIVATE_SUFFIX : ''

  const image = mediaUrl(exp.image, '/images/boat-porto-bridge.png')
  const title = variant === 'private' ? `${exp.subtitle || exp.title} — Private` : exp.subtitle || exp.title
  const description = (variant === 'private' ? exp.private?.shortCopy : exp.shared?.shortCopy) || undefined
  const path = variant === 'private' ? `${exp.slug}${PRIVATE_SUFFIX}` : exp.slug
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/${path}`,
      languages: {
        ...Object.fromEntries(
          activeLocales.filter((x) => slugsByLocale[x]).map((x) => [localeTags[x], `/${x}/${slugsByLocale[x]}${suffix}`]),
        ),
        'x-default': `/en/${(slugsByLocale.en || exp.slug)}${suffix}`,
      },
    },
    openGraph: {
      title,
      description,
      images: [{ url: image, alt: exp.subtitle || exp.title }],
    },
  }
}

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dourowonders.com'

const mediaUrl = (m?: (number | null) | Media | null, fallback?: string): string => {
  if (m && typeof m === 'object' && m.url) return m.url
  return fallback || '/images/hero.png'
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug: rawSlug, locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const { baseSlug, variant } = parseSlug(rawSlug)
  const dict = getDictionary(locale)
  const base = `/${locale}`
  const payload = await getPayload({ config })

  const [expRes, allExpRes, home, settings] = await Promise.all([
    payload.find({ collection: 'experiences', where: { slug: { equals: baseSlug } }, limit: 1, locale }),
    payload.find({ collection: 'experiences', sort: 'order', limit: 10, depth: 0, locale }),
    payload.findGlobal({ slug: 'homepage', locale }) as Promise<Homepage>,
    payload.findGlobal({ slug: 'site-settings', locale }) as Promise<SiteSetting>,
  ])

  const exp = expRes.docs[0] as Experience | undefined
  if (!exp) notFound()

  const otherExperiences = (allExpRes.docs as Experience[]).filter((e) => e.id !== exp.id)

  // Slugs are localized — the language switcher needs each locale's own slug for this page.
  const allSlugsRes = await payload.findByID({ collection: 'experiences', id: exp.id, locale: 'all', depth: 0 })
  const slugsByLocale = allSlugsRes.slug as unknown as Record<Locale, string>
  const suffix = variant === 'private' ? PRIVATE_SUFFIX : ''
  const localizedPaths = Object.fromEntries(
    activeLocales.filter((l) => slugsByLocale[l]).map((l) => [l, `/${l}/${slugsByLocale[l]}${suffix}`]),
  ) as Partial<Record<Locale, string>>

  const campaignActive = home?.campaign?.active !== false
  const bookingChannelUUID = settings?.bokun?.bookingChannelUUID
  const d = exp.details
  const paragraphs = (d?.fullDescription || '').split(/\n\s*\n/).filter(Boolean)

  const sharedHref = `${base}/${exp.slug}`
  const privateHref = `${base}/${exp.slug}${PRIVATE_SUFFIX}`

  const reviews = home?.reviewsSection?.reviews || []
  const reviewCount = reviews.length
  const avgRating = reviewCount ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount : 0

  return (
    <>
      <Header
        locale={locale}
        dict={dict}
        announcement={campaignActive ? home?.campaign?.badgeText : null}
        localizedPaths={localizedPaths}
      />

      {/* Compact hero — title and subtitle only; the photo now lives in the gallery below,
          and the Opening Offer already shows in the top banner */}
      <section className="exp-hero-plain">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={base}>{dict.detail.breadcrumbHome}</Link>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <a href={`${base}#experiences`}>{dict.nav.experiences}</a>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <span className="breadcrumb__current" aria-current="page">
              {variant === 'private' ? exp.private?.subtitle || exp.title : exp.title}
            </span>
            {otherExperiences.length > 0 && (
              <span className="breadcrumb__also">
                {dict.detail.seeAlso}:{' '}
                {otherExperiences.map((other) => (
                  <Link
                    key={other.id}
                    href={`${base}/${other.slug}${variant === 'private' ? PRIVATE_SUFFIX : ''}`}
                  >
                    {variant === 'private' ? other.private?.subtitle || other.title : other.title}
                  </Link>
                ))}
              </span>
            )}
          </nav>
          <h1 className="exp-hero-plain__title">
            {variant === 'private' ? exp.private?.subtitle || exp.title : exp.title}
          </h1>
          <div className="exp-hero-plain__meta">
            <span className="exp-hero-plain__sub">{exp.subtitle}</span>
            {reviewCount > 0 &&
              (home?.reviewsSection?.googleReviewsUrl ? (
                <a
                  href={home.reviewsSection.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="exp-hero-plain__rating"
                >
                  <span aria-hidden="true">★</span> {avgRating.toFixed(1)} · {reviewCount} {dict.detail.reviews}
                </a>
              ) : (
                <span className="exp-hero-plain__rating">
                  <span aria-hidden="true">★</span> {avgRating.toFixed(1)} · {reviewCount} {dict.detail.reviews}
                </span>
              ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 'clamp(1rem, 2vw, 1.5rem)' }}>
        <div className="container detail-top">
          {/* -------- Intro row — gallery and facts, above the fold -------- */}
          <div className="detail-top__intro">
            <ExperienceGallery
              photos={(exp.gallery || []).map((g) => ({
                src: mediaUrl(g.image),
                alt: g.caption || exp.subtitle || exp.title,
              }))}
              viewAllLabel={dict.detail.viewAllPhotos}
            />

            {/* -------- Facts — same thin-stroke icon language as the On Board list -------- */}
            <div className="facts">
              <div className="fact">
                <div className="fact__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7.5V12l3 2" />
                  </svg>
                </div>
                <div>
                  <strong>{dict.detail.duration} {exp.duration}</strong>
                  {/* Departure times change often — checked on Bókun at booking time */}
                  <span>{dict.detail.checkAvailability}</span>
                </div>
              </div>
              <div className="fact">
                <div className="fact__icon">{strokeIcons.shield}</div>
                <div>
                  <strong>{dict.detail.freeCancellation}</strong>
                  <span>{dict.detail.freeCancellationNote}</span>
                </div>
              </div>
              <div className="fact">
                <div className="fact__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 5h13a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H10l-4 3.5V15H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
                  </svg>
                </div>
                <div>
                  <strong>{dict.detail.localHosts}</strong>
                  <span>{d?.languages ? `${dict.detail.languages}: ${d.languages}` : dict.detail.localHostsNote}</span>
                </div>
              </div>
              <div className="fact">
                <div className="fact__icon">{strokeIcons.people}</div>
                <div>
                  <strong>{dict.detail.smallGroup}</strong>
                  <span>{dict.detail.smallGroupNote}</span>
                </div>
              </div>
            </div>
          </div>

          {/* -------- Booking options — Shared and Private shown side by side, right away.
              Spans both rows below and stays sticky beside all the content, not just the intro. -------- */}
          <div className={`rate-options${variant === 'private' ? ' rate-options--private-first' : ''}`} id="book">
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

            <article className="card rate-card rate-card--private" id="private">
              <p className="eyebrow">{dict.detail.privateRate}</p>
              <div className="rate-card__price">
                {campaignActive && exp.private?.referencePrice ? (
                  <s style={{ fontWeight: 300, color: 'var(--muted-grey)', marginRight: '0.5rem' }}>
                    €{exp.private.referencePrice}
                  </s>
                ) : null}
                €{exp.private?.launchPrice} <small>{dict.hero.perBoat}</small>
              </div>
              <p style={{ fontSize: '0.92rem' }}>{exp.private?.shortCopy}</p>
              <BokunWidget
                bookingChannelUUID={bookingChannelUUID}
                widgetSrc={exp.bokun?.widgetSrc}
                ctaLabel={exp.private?.ctaLabel || dict.common.bookNow}
                className="btn btn--secondary"
              />
            </article>

            <div className="rate-nudge">
              <p>{dict.privateEnquiry.eventsNote}</p>
              <a href={`${base}/special-occasions`} className="btn btn--secondary btn--sm">
                {dict.privateEnquiry.ctaButton}
              </a>
            </div>
          </div>

          {/* -------- Body row — everything else, directly below the intro; the
              booking column (above) stays sticky alongside all of this -------- */}
          <div className="detail-top__body">
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

            {/* Full description — first two paragraphs visible, rest collapsible */}
          {paragraphs.length > 0 && (
            <div className="detail-section">
              <h2>{dict.detail.fullDescription}</h2>
              <div className="prose">
                {paragraphs.slice(0, 2).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {paragraphs.length > 2 && (
                <details className="detail-disclosure">
                  <summary>{dict.detail.readFullDescription}</summary>
                  <div className="prose">
                    {paragraphs.slice(2).map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </details>
              )}
            </div>
          )}

          {/* Itinerary — main route highlights, rest collapsible, map alongside */}
          {!!d?.itinerary?.length && (
            <div className="detail-section">
              <h2>{dict.detail.itinerary}</h2>
              <div className="itinerary-layout">
                <div>
                  <ol className="route__stops">
                    {d.itinerary.slice(0, 8).map((s) => (
                      <li key={s.id || s.stop}>
                        <strong style={{ fontWeight: 500, color: '#3f3d38' }}>{s.stop}</strong>
                        {s.note && (
                          <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--muted-grey)' }}>{s.note}</div>
                        )}
                      </li>
                    ))}
                  </ol>
                  {d.itinerary.length > 8 && (
                    <details className="detail-disclosure">
                      <summary>{dict.detail.viewFullRoute}</summary>
                      <ol className="route__stops" start={9}>
                        {d.itinerary.slice(8).map((s) => (
                          <li key={s.id || s.stop}>
                            <strong style={{ fontWeight: 500, color: '#3f3d38' }}>{s.stop}</strong>
                            {s.note && (
                              <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--muted-grey)' }}>
                                {s.note}
                              </div>
                            )}
                          </li>
                        ))}
                      </ol>
                    </details>
                  )}
                  <p className="route__note">{dict.detail.routeNote}</p>
                </div>
                <RouteMap
                  labels={dict.routeMap}
                  // Slugs are localized now — id 2 is the fixed Sunset Cruise experience.
                  lockedRoute={exp.id === 2 ? 'sunset' : 'day'}
                  compact
                  dayStops={exp.id !== 2 ? d?.itinerary?.map((s) => s.stop) : undefined}
                  sunsetStops={exp.id === 2 ? d?.itinerary?.map((s) => s.stop) : undefined}
                />
              </div>
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

          {/* Meeting point */}
          <div className="detail-section">
            <h2>{dict.detail.meetingPoint}</h2>
            <div className="meeting">
              <div>
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
              <div className="map-embed">
                <iframe
                  title="Douro Wonders — meeting point map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2738.552023923769!2d-8.652937472880195!3d41.14224762933593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2465d7be3f7e91%3A0xcb3ec2ec26c38215!2sDouro%20Wonders%20-%20Authentic%20Experiences%20-%20Daytime%20%26%20Sunset%20River%20Boat%20Cruise!5e1!3m2!1spt-PT!2spt!4v1787863962258!5m2!1spt-PT!2spt"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Review links — placed here rather than the hero, so they don't sit as
              near-empty lines above the fold */}
          {(exp.reviewUrl || settings?.googleReviewUrl) && (
            <div className="detail-section review-links">
              <h2>{dict.detail.enjoyedTrip}</h2>
              <p>
                {settings?.googleReviewUrl && (
                  <a href={settings.googleReviewUrl} className="link-gold" target="_blank" rel="noopener noreferrer">
                    {dict.detail.leaveReviewGoogle}
                  </a>
                )}
                {exp.reviewUrl && (
                  <a href={exp.reviewUrl} className="link-gold" target="_blank" rel="noopener noreferrer">
                    {dict.detail.leaveReview}
                  </a>
                )}
              </p>
            </div>
          )}
          </div>
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

      <StickyBookingCta label={home?.hero?.mobileStickyCta || 'Book Now'} />

      {/* Structured data: product + breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: exp.subtitle || exp.title,
              description: variant === 'private' ? exp.private?.shortCopy : exp.shared?.shortCopy,
              url: `${SITE_URL}${variant === 'private' ? privateHref : sharedHref}`,
              image: `${SITE_URL}${mediaUrl(exp.image, '/images/boat-porto-bridge.png')}`,
              brand: { '@type': 'Brand', name: 'Douro Wonders' },
              offers: [
                {
                  '@type': 'Offer',
                  name: 'Shared cruise (per person)',
                  price: exp.shared?.launchPrice,
                  priceCurrency: 'EUR',
                  availability: 'https://schema.org/InStock',
                  url: `${SITE_URL}${sharedHref}`,
                },
                {
                  '@type': 'Offer',
                  name: 'Private cruise (whole boat)',
                  price: exp.private?.launchPrice,
                  priceCurrency: 'EUR',
                  availability: 'https://schema.org/InStock',
                  url: `${SITE_URL}${privateHref}`,
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Experiences', item: `${SITE_URL}/#experiences` },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: variant === 'private' ? exp.private?.subtitle || exp.title : exp.title,
                  item: `${SITE_URL}${variant === 'private' ? privateHref : sharedHref}`,
                },
              ],
            },
          ]),
        }}
      />
    </>
  )
}
