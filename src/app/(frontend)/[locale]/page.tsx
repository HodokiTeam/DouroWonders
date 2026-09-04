import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeroCinematic } from '@/components/HeroCinematic'
import { RouteMap } from '@/components/RouteMap'
import { IncludedItem } from '@/components/IncludedIcons'
import { ContactSection } from '@/components/ContactSection'
import type { Experience, Homepage, Media, SiteSetting, SpecialOccasion } from '@/payload-types'
import { isLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dourowonders.com'

const mediaUrl = (m?: (number | null) | Media | null, fallback?: string): string => {
  if (m && typeof m === 'object' && m.url) return m.url
  return fallback || '/images/hero.png'
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(locale)
  const base = `/${locale}`
  const payload = await getPayload({ config })

  const [home, settings, experiencesRes, faqsRes, specialOccasions] = await Promise.all([
    payload.findGlobal({ slug: 'homepage', locale }) as Promise<Homepage>,
    payload.findGlobal({ slug: 'site-settings', locale }) as Promise<SiteSetting>,
    payload.find({ collection: 'experiences', sort: 'order', limit: 10, locale }),
    payload.find({ collection: 'faqs', sort: 'order', limit: 30, locale }),
    payload.findGlobal({ slug: 'special-occasions', locale }) as Promise<SpecialOccasion>,
  ])

  const experiences = experiencesRes.docs as Experience[]
  const faqs = faqsRes.docs

  // Grouped under fixed headings — the section itself isn't localized (it's
  // structural, not editorial), so the label comes from the dictionary.
  const FAQ_SECTION_ORDER = ['booking', 'meeting-point', 'getting-here', 'onboard', 'guests', 'weather'] as const
  const faqSectionLabel: Record<(typeof FAQ_SECTION_ORDER)[number], string> = {
    booking: dict.faqSections.booking,
    'meeting-point': dict.faqSections.meetingPoint,
    'getting-here': dict.faqSections.gettingHere,
    onboard: dict.faqSections.onboard,
    guests: dict.faqSections.guests,
    weather: dict.faqSections.weather,
  }
  const faqGroups = FAQ_SECTION_ORDER.map((key) => ({
    key,
    label: faqSectionLabel[key],
    items: faqs.filter((f) => (f.section || 'booking') === key),
  })).filter((g) => g.items.length > 0)

  // The route map labels its points from each cruise's itinerary in the CMS.
  // Slugs are localized now, so look these two fixed experiences up by id
  // (1 = Day Cruise, 2 = Sunset Cruise) rather than by slug.
  const itineraryOf = (id: number) =>
    experiences.find((e) => e.id === id)?.details?.itinerary?.map((s) => s.stop) ?? undefined
  const campaignActive = home?.campaign?.active !== false

  // Two category rows built from the 2 experiences (shared + private rate each)
  type Card = {
    key: string
    variant: 'shared' | 'private'
    title: string
    subtitle?: string | null
    duration: string
    priceNow?: number | null
    priceRef?: number | null
    priceUnit: string
    copy?: string | null
    cta?: string | null
    href: string
    image: string
  }

  // One group per cruise (Day, Sunset), each holding its own Shared + Private
  // pair — guests need to see both options for the SAME trip side by side.
  // The group heading names the cruise itself (e.g. "Day Cruise"), not the
  // "Shared ..." card title, which would misleadingly label the Private card too.
  const cruiseGroups = experiences.map((exp) => ({
    key: exp.slug,
    // Slugs are localized now (they vary per language), so id is the only
    // stable way to tell these two fixed experiences apart — id 2 is Sunset.
    title: exp.id === 2 ? dict.nav.sunsetCruise : dict.nav.dayCruise,
    cards: [
      {
        key: `${exp.slug}-shared`,
        variant: 'shared' as const,
        title: exp.title,
        subtitle: exp.subtitle,
        duration: exp.duration,
        priceNow: exp.shared?.launchPrice,
        priceRef: campaignActive ? exp.shared?.referencePrice : null,
        priceUnit: dict.hero.perPerson,
        copy: exp.shared?.shortCopy,
        cta: exp.shared?.ctaLabel,
        href: `${base}/${exp.slug}`,
        image: mediaUrl(exp.image),
      },
      {
        key: `${exp.slug}-private`,
        variant: 'private' as const,
        title: exp.private?.subtitle || `${dict.hero.privateCruise} · ${exp.title}`,
        subtitle: exp.private?.subtitle,
        duration: exp.duration,
        priceNow: exp.private?.launchPrice,
        priceRef: campaignActive ? exp.private?.referencePrice : null,
        priceUnit: dict.hero.perBoat,
        copy: exp.private?.shortCopy,
        cta: exp.private?.ctaLabel,
        href: `${base}/${exp.slug}-private`,
        image: mediaUrl(exp.imagePrivate, mediaUrl(exp.image)),
      },
    ] satisfies Card[],
  }))
  const renderCard = (card: Card) => (
    <article className={`card exp-card exp-card--${card.variant}`} key={card.key}>
      <Link href={card.href} className="exp-card__img">
        <img src={card.image} alt={card.subtitle || card.title || ''} loading="lazy" />
      </Link>
      <div className="exp-card__body">
        <h3 className="exp-card__title">{card.title}</h3>
        <div className="exp-card__meta">
          <span>{card.duration}</span>
        </div>
        <div className="exp-card__price">
          {card.priceRef ? <s>€{card.priceRef}</s> : null}€{card.priceNow}{' '}
          <small style={{ fontWeight: 300, color: 'var(--muted-grey)' }}>{card.priceUnit}</small>
        </div>
        <p className="exp-card__copy">{card.copy}</p>
        <Link href={card.href} className={`btn ${card.variant === 'private' ? 'btn--secondary' : 'btn--primary'}`}>
          {card.cta || dict.common.bookNow}
        </Link>
      </div>
    </article>
  )

  return (
    <>
      <Header locale={locale} dict={dict} announcement={campaignActive ? home?.campaign?.badgeText : null} />

      {/* 1 · Hero — cinematic, layered */}
      <HeroCinematic
        eyebrow={dict.hero.eyebrow}
        headline={home?.hero?.headline || 'Authentic Douro Experiences'}
        subheadline={
          home?.hero?.subheadline ||
          'Small-group and private Douro River cruises from Porto and Vila Nova de Gaia, hosted by locals who know the river personally.'
        }
        rates={[
          {
            label: dict.hero.sharedCruise,
            price: `${dict.hero.from} €${experiences[0]?.shared?.launchPrice ?? 40}`,
            unit: dict.hero.perPerson,
            note: dict.hero_notes.shared,
            href: `${base}#experiences`,
          },
          {
            label: dict.hero.privateCruise,
            price: `${dict.hero.from} €${experiences[0]?.private?.launchPrice ?? 420}`,
            unit: dict.hero.perBoat,
            note: dict.hero_notes.private,
            href: `${base}#experiences`,
          },
        ]}
        trust={[dict.trust.freeCancellation, dict.trust.welcomeDrink, dict.trust.dailyDepartures]}
        primaryCta={home?.hero?.primaryCta || dict.common.bookNow}
        secondaryCta={home?.hero?.secondaryCta || 'Explore Authentic Experiences'}
        ctaHref={`${base}#experiences`}
        slides={
          home?.hero?.slides?.length
            ? home.hero.slides.map((s) => ({
                src: mediaUrl(s.image),
                alt: s.alt,
                caption: s.caption || undefined,
              }))
            : [
                {
                  src: mediaUrl(home?.hero?.image, '/images/boat-porto-bridge.png'),
                  alt: 'The Douro Wonders boat on the river with Porto and the Ponte D. Luís I behind',
                  caption: 'Porto · Ponte D. Luís I',
                },
                {
                  src: '/images/bow-sunset.png',
                  alt: 'The bow of the boat facing Ponte D. Luís I at sunset',
                  caption: 'Douro · Ponte D. Luís I',
                },
                {
                  src: '/images/boat-douro-valley.png',
                  alt: 'The boat cruising the Douro valley',
                  caption: 'Wondy · Rio Douro',
                },
                {
                  src: '/images/ribeira-view.png',
                  alt: 'The Ribeira seen from the river',
                  caption: 'Porto · Ribeira',
                },
                {
                  src: '/images/wine-deck.png',
                  alt: 'A glass of wine on the teak deck at golden hour',
                  caption: 'Wondy · Porto Tonic',
                },
              ]
        }
      />

      {/* 2 · Experiences — by category */}
      <section className="section" id="experiences">
        <div className="container">
          <div className="section-head--center">
            <p className="eyebrow">{dict.sections.experiences}</p>
            <h2 className="section-title">{home?.experiencesSection?.title || 'Choose your Douro experience'}</h2>
            <p className="section-lead">
              {home?.experiencesSection?.lead ||
                'Shared cruises for up to 12 guests, or the whole boat privately for your group.'}
            </p>
          </div>

          <div className="categories">
            {cruiseGroups.map((group) => (
              <div className="category" id={group.key} key={group.key}>
                <div className="category__head">
                  <h3>{group.title}</h3>
                </div>
                <div className="exp-grid--two">{group.cards.map(renderCard)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 · Special Occasions — teaser for the dedicated page */}
      <section className="section section--white" id="special-occasions-teaser">
        <div className="container occasions-teaser">
          <div className="occasions-teaser__intro">
            <p className="eyebrow">{dict.homeSpecialOccasions.eyebrow}</p>
            <h2 className="section-title">{dict.homeSpecialOccasions.title}</h2>
            <p className="occasions-teaser__closing">
              {specialOccasions?.closingLine || dict.homeSpecialOccasions.closingLine}
            </p>
            <Link href={`${base}/special-occasions`} className="btn btn--primary">
              {dict.homeSpecialOccasions.cta}
            </Link>
          </div>
          <div className="occasions-teaser__lists">
            {!!specialOccasions?.ideas?.length && (
              <div>
                <h3 className="occasions-teaser__label">{dict.homeSpecialOccasions.occasionsLabel}</h3>
                <ul className="occasions-teaser__list">
                  {specialOccasions.ideas.map((idea, i) => (
                    <li key={i}>{idea.text}</li>
                  ))}
                </ul>
              </div>
            )}
            {!!specialOccasions?.extras?.length && (
              <div>
                <h3 className="occasions-teaser__label">{dict.homeSpecialOccasions.extrasLabel}</h3>
                <ul className="occasions-teaser__list">
                  {specialOccasions.extras.map((extra, i) => (
                    <li key={i}>{extra.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3 · Launch offer */}
      {campaignActive && (
        <section className="section section--sand" id="launch-offer">
          <div className="container" style={{ textAlign: 'center', maxWidth: '52rem' }}>
            <p className="eyebrow">{home?.campaign?.offerTitle || 'Opening Offer'}</p>
            <h2 className="section-title">
              {home?.campaign?.badgeText ||
                'Special launch prices, with local flavours and a few small surprises on board.'}
            </h2>
            {home?.campaign?.offerBody && (
              <p className="section-lead" style={{ margin: '0 auto' }}>
                {home.campaign.offerBody}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 4 · Route — interactive */}
      <section className="section section--white" id="route">
        <div className="container">
          <div className="section-head--center">
            <p className="eyebrow">{dict.sections.route}</p>
            <h2 className="section-title">{home?.route?.title || 'From the marina to the bridges'}</h2>
            <p className="section-lead">
              {home?.route?.lead ||
                'Follow the trajectory — from Afurada to the heart of Porto and back. Tap any stop to explore.'}
            </p>
          </div>
          <RouteMap
            labels={dict.routeMap}
            dayStops={itineraryOf(1)}
            sunsetStops={itineraryOf(2)}
          />
          <p className="route__note" style={{ textAlign: 'center' }}>
            {home?.route?.note || 'The route may vary depending on river, weather and safety conditions.'}
          </p>
        </div>
      </section>

      {/* 5 · The Boat */}
      <section className="section" id="boat">
        <div className="container boat">
          <div className="boat__img">
            <img
              src={mediaUrl(home?.boat?.image, '/images/boat-douro-valley.png')}
              alt="The Douro Wonders boat cruising the river"
              loading="lazy"
            />
          </div>
          <div>
            <p className="eyebrow">{dict.sections.theBoat}</p>
            <h2 className="section-title">{home?.boat?.headline || 'Comfort, teak and open views'}</h2>
            <p>
              {home?.boat?.body ||
                'A robust and comfortable boat, purpose-suited to the Douro, with cushioned seating, warm teak details and all-weather canopies that extend the season. Small by design — so every guest has space, views and the attention of the hosts.'}
            </p>
            <div className="boat__specs">
              {(home?.boat?.specs?.length
                ? home.boat.specs
                : [
                    { label: 'Guests', value: 'Up to 12' },
                    { label: 'Crew', value: 'Skipper + host' },
                    { label: 'Seating', value: 'Cushioned lounge' },
                    { label: 'Season', value: 'All-weather canopies' },
                  ]
              ).map((s) => (
                <div className="boat__spec" key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container boat__gallery">
          {[
            {
            src: '/images/bow-sunset.png',
            alt: 'The bow of the boat facing Ponte D. Luís I at sunset',
            caption: 'Douro · Ponte D. Luís I',
          },
            { src: '/images/teak-detail.png', alt: 'Teak deck and stainless-steel details at golden hour' },
            { src: '/images/wine-deck.png', alt: 'A glass of wine on the teak deck on the Douro' },
          ].map((g) => (
            <figure key={g.src}>
              <img src={g.src} alt={g.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      {/* 5 · What's included */}
      <section className="section section--white" id="included">
        <div className="container">
          <p className="eyebrow">{dict.sections.onboard}</p>
          <h2 className="section-title">{home?.included?.title || 'What’s included'}</h2>
          <p className="section-lead">
            {home?.included?.intro ||
              'Each experience includes a welcome drink, selected drinks, local flavours and a few small surprises on board.'}
          </p>
          <ul className="included-list">
            {(home?.included?.items?.length
              ? home.included.items.map((i) => i.item)
              : [
                  'Welcome drink: Porto Tonic or non-alcoholic alternative',
                  'Selected drinks',
                  'Local flavours or small Portuguese bites',
                  'Small launch surprises on board',
                  'Skipper and host',
                  'Blankets',
                  'Insurance',
                  'Local recommendations',
                  'Small-group atmosphere',
                ]
            ).map((item) => (
              <IncludedItem key={item} text={item} />
            ))}
          </ul>
        </div>
      </section>

      {/* 7 · Onboard Boutique */}
      <section className="section section--sand" id="boutique">
        <div className="container founders">
          <div className="founders__img">
            <img
              src={mediaUrl(home?.boutique?.image, '/images/pillow-boutique.png')}
              alt="Douro Wonders onboard boutique details"
              loading="lazy"
            />
          </div>
          <div>
            <p className="eyebrow">{dict.sections.boutique}</p>
            <h2 className="section-title">{home?.boutique?.headline || 'A small floating boutique'}</h2>
            <p>
              {home?.boutique?.body ||
                'A small floating boutique of things made here, found here and worth carrying home. A curated selection of Portuguese products, local finds and small design objects.'}
            </p>
          </div>
        </div>
      </section>

      {/* 8 · About / Founders — trimmed to a short intro; full bios live on /about */}
      <section className="section" id="about">
        <div className="container founders">
          <div>
            <p className="eyebrow">{dict.homeAbout.eyebrow}</p>
            <h2 className="section-title">{dict.homeAbout.title}</h2>
            <p>{dict.homeAbout.intro}</p>
            <p style={{ marginTop: '1.4rem' }}>
              <Link href={`${base}/about`} className="btn btn--secondary">
                {dict.homeAbout.cta}
              </Link>
            </p>
          </div>
          <div className="founders__img">
            <img
              src={mediaUrl(home?.founders?.image, '/images/founders-onboard.png')}
              alt="Inês and António on board on the Douro"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 8.5 · Reviews — real guest stories, hidden until the founders add some */}
      {!!home?.reviewsSection?.reviews?.length && (
        <section className="section section--white" id="reviews">
          <div className="container">
            <div className="section-head--center">
              <p className="eyebrow">{dict.homeReviews.eyebrow}</p>
              <h2 className="section-title">{dict.homeReviews.title}</h2>
            </div>
            <div className="reviews-grid">
              {home.reviewsSection.reviews.map((review, i) => (
                <figure className="review-card" key={i}>
                  <div className="review-card__stars" aria-hidden="true">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                  <blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
                  <figcaption>
                    {review.name} · {review.source === 'tripadvisor' ? 'Tripadvisor' : 'Google'}
                  </figcaption>
                </figure>
              ))}
            </div>
            {(home.reviewsSection.googleReviewsUrl || home.reviewsSection.tripadvisorUrl) && (
              <p style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                {home.reviewsSection.googleReviewsUrl && (
                  <a
                    href={home.reviewsSection.googleReviewsUrl}
                    className="btn btn--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dict.homeReviews.cta}
                  </a>
                )}
                {home.reviewsSection.tripadvisorUrl && (
                  <a
                    href={home.reviewsSection.tripadvisorUrl}
                    className="link-gold"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: '1.2rem' }}
                  >
                    {dict.homeReviews.tripadvisorCta}
                  </a>
                )}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 9 · FAQ */}
      <section className="section section--sand" id="faq">
        <div className="container">
          <p className="eyebrow">{dict.sections.goodToKnow}</p>
          <h2 className="section-title">{home?.faqSection?.title || 'Frequently asked questions'}</h2>
          {home?.faqSection?.lead && <p className="section-lead">{home.faqSection.lead}</p>}
          <div className="faq-list">
            {faqGroups.map((group) => (
              <div className="faq-group" key={group.key}>
                <h3 className="faq-group__title">{group.label}</h3>
                {group.items.map((faq) => (
                  <details className="faq-item" key={faq.id}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 · Meeting point */}
      <section className="section section--white" id="meeting-point">
        <div className="container meeting">
          <div>
            <p className="eyebrow">{dict.sections.meetingPoint}</p>
            <h2 className="section-title">{settings?.meetingPoint?.name || 'Douro Marina | Afurada'}</h2>
            <address>
              {(settings?.meetingPoint?.addressLines?.length
                ? settings.meetingPoint.addressLines.map((l) => l.line)
                : ['Rua da Praia 430', 'Gate B', '4400-354 Vila Nova de Gaia', 'Porto, Portugal']
              ).map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
            <p style={{ marginTop: '1rem', fontWeight: 500, color: 'var(--ink)' }}>
              {settings?.meetingPoint?.arrivalNote || 'Please arrive 10 minutes before departure.'}
            </p>
            {!!settings?.phones?.length && (
              <p style={{ marginTop: '0.8rem' }}>
                {settings.phones.map((p) => (
                  <span key={p.number} style={{ display: 'block' }}>
                    {p.label ? `${p.label}: ` : ''}
                    <a href={`tel:${(p.number || '').replace(/\s/g, '')}`} className="link-gold">
                      {p.number}
                    </a>
                  </span>
                ))}
              </p>
            )}
            <p style={{ marginTop: '1.4rem' }}>
              <a
                href={
                  settings?.meetingPoint?.mapsUrl ||
                  'https://www.google.com/maps/dir/?api=1&destination=Douro+Marina,+Rua+da+Praia+430,+Vila+Nova+de+Gaia'
                }
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.common.getDirections}
              </a>
            </p>
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
      </section>

      {/* 10 · Contact */}
      <ContactSection
        locale={locale}
        dict={dict}
        email={settings?.email}
        whatsapp={settings?.whatsapp}
        phones={settings?.phones?.filter((p) => p.number) as { label?: string | null; number: string }[] | undefined}
      />

      {/* 11 · Footer */}
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

      {/* Mobile sticky CTA */}
      <div className="sticky-cta">
        <a href={`${base}#experiences`} className="btn btn--primary">
          {home?.hero?.mobileStickyCta || 'Book Now'}
        </a>
      </div>

      {/* Structured data for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'TouristAttraction',
              '@id': `${SITE_URL}/#organization`,
              name: 'Douro Wonders',
              slogan: 'Authentic Experiences',
              description:
                settings?.seo?.description ||
                'Premium small-group and private Douro River cruises from Porto and Vila Nova de Gaia.',
              url: SITE_URL,
              email: settings?.email || 'info@dourowonders.com',
              logo: `${SITE_URL}/brand/20260510_DW_BRAND_Logo_Variations_SYMBOL_TRANSP_v1.png`,
              image: `${SITE_URL}/images/boat-porto-bridge.png`,
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Douro Marina, Rua da Praia 430, Gate B',
                addressLocality: 'Vila Nova de Gaia',
                postalCode: '4400-354',
                addressCountry: 'PT',
              },
              sameAs: [
                settings?.social?.instagram,
                settings?.social?.facebook,
                settings?.social?.linkedin,
              ].filter(Boolean),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: experiences.map((exp, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'Product',
                  name: exp.subtitle || exp.title,
                  description: exp.shared?.shortCopy,
                  url: `${SITE_URL}/${exp.slug}`,
                  image: `${SITE_URL}${mediaUrl(exp.image)}`,
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
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
            },
          ]),
        }}
      />
    </>
  )
}
