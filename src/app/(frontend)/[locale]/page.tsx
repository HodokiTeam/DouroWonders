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
import type { Experience, Homepage, Media, SiteSetting } from '@/payload-types'
import { isLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.dourowonders.com'

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

  const [home, settings, experiencesRes, faqsRes] = await Promise.all([
    payload.findGlobal({ slug: 'homepage', locale }) as Promise<Homepage>,
    payload.findGlobal({ slug: 'site-settings', locale }) as Promise<SiteSetting>,
    payload.find({ collection: 'experiences', sort: 'order', limit: 10, locale }),
    payload.find({ collection: 'faqs', sort: 'order', limit: 30, locale }),
  ])

  const experiences = experiencesRes.docs as Experience[]
  const faqs = faqsRes.docs

  // The route map labels its points from each cruise's itinerary in the CMS
  const itineraryOf = (slug: string) =>
    experiences.find((e) => e.slug === slug)?.details?.itinerary?.map((s) => s.stop) ?? undefined
  const campaignActive = home?.campaign?.active !== false

  // Two category rows built from the 2 experiences (shared + private rate each)
  type Card = {
    key: string
    title: string
    subtitle?: string | null
    duration: string
    schedule: string | null
    priceNow?: number | null
    priceRef?: number | null
    priceUnit: string
    copy?: string | null
    cta?: string | null
    href: string
    image: string
  }

  const sharedCards: Card[] = experiences.map((exp) => ({
    key: `${exp.slug}-shared`,
    title: exp.title,
    subtitle: exp.subtitle,
    duration: exp.duration,
    schedule: (exp.schedule || []).map((s) => s.time).join(' | '),
    priceNow: exp.shared?.launchPrice,
    priceRef: campaignActive ? exp.shared?.referencePrice : null,
    priceUnit: dict.hero.perPerson,
    copy: exp.shared?.shortCopy,
    cta: exp.shared?.ctaLabel,
    href: `${base}/${exp.slug}`,
    image: mediaUrl(exp.image),
  }))
  const privateCards: Card[] = experiences.map((exp) => ({
    key: `${exp.slug}-private`,
    title: exp.private?.subtitle || `${dict.hero.privateCruise} · ${exp.title}`,
    subtitle: exp.private?.subtitle,
    duration: exp.duration,
    schedule: null,
    priceNow: exp.private?.launchPrice,
    priceRef: null,
    priceUnit: dict.hero.perBoat,
    copy: exp.private?.shortCopy,
    cta: exp.private?.ctaLabel,
    href: `${base}/${exp.slug}#private`,
    image: mediaUrl(exp.imagePrivate, mediaUrl(exp.image)),
  }))
  const renderCard = (card: Card) => (
    <article className="card" key={card.key}>
      <Link href={card.href} className="exp-card__img">
        <img src={card.image} alt={card.subtitle || card.title || ''} loading="lazy" />
      </Link>
      <div className="exp-card__body">
        <h3 className="exp-card__title">{card.title}</h3>
        <div className="exp-card__meta">
          <span>{card.duration}</span>
          {card.schedule && <span>{card.schedule}</span>}
        </div>
        <div className="exp-card__price">
          {card.priceRef ? <s>€{card.priceRef}</s> : null}€{card.priceNow}{' '}
          <small style={{ fontWeight: 300, color: 'var(--muted-grey)' }}>{card.priceUnit}</small>
        </div>
        <p className="exp-card__copy">{card.copy}</p>
        <Link href={card.href} className="btn btn--primary">
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
            href: `${base}#shared-cruises`,
          },
          {
            label: dict.hero.privateCruise,
            price: `${dict.hero.from} €${experiences[0]?.private?.launchPrice ?? 420}`,
            unit: dict.hero.perBoat,
            note: dict.hero_notes.private,
            href: `${base}#private-cruises`,
          },
        ]}
        trust={[dict.trust.freeCancellation, dict.trust.welcomeDrink, dict.trust.dailyDepartures]}
        primaryCta={home?.hero?.primaryCta || dict.common.bookNow}
        secondaryCta={home?.hero?.secondaryCta || 'Explore Authentic Experiences'}
        ctaHref={`${base}#experiences`}
        slides={[
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
        ]}
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
            <div className="category category--shared" id="shared-cruises">
            <div className="category__head">
              <h3>{home?.experiencesSection?.sharedLabel || 'Shared Cruises'}</h3>
              <span className="category__tag">
                {home?.experiencesSection?.sharedTag || 'Per person · small groups of up to 12 guests'}
              </span>
            </div>
              <div className="exp-grid--two">{sharedCards.map(renderCard)}</div>
            </div>

            <div className="category category--private" id="private-cruises">
            <div className="category__head">
              <h3>{home?.experiencesSection?.privateLabel || 'Private Cruises'}</h3>
              <span className="category__tag">
                {home?.experiencesSection?.privateTag || 'Per boat · your people, your moment, our river'}
              </span>
            </div>
              <div className="exp-grid--two">{privateCards.map(renderCard)}</div>
            </div>
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
            dayStops={itineraryOf('day-cruise')}
            sunsetStops={itineraryOf('sunset-cruise')}
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

      {/* 8 · About / Founders — near the end */}
      <section className="section" id="about">
        <div className="container">
          <div className="founders" style={{ marginBottom: 'clamp(3.5rem, 8vw, 6rem)' }}>
            <div>
              <p className="eyebrow">{dict.sections.about}</p>
              <h2 className="section-title">
                {home?.founders?.headline || 'Made by two people who know this river personally.'}
              </h2>
              <p>
                {home?.founders?.body ||
                  'Douro Wonders was created by Inês Veloso and António Ferrer to share the Douro with more care, detail and local knowledge. António brings the maritime experience, navigation and safety. Inês shapes the guest experience, communication, creative direction and the small details that make the moment feel considered.'}
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

          {/* Inês */}
          <div className="person">
            <div className="person__img">
              <img
                src={mediaUrl(home?.founders?.ines?.photo, '/images/ines-helm.png')}
                alt={home?.founders?.ines?.name || 'Inês Veloso'}
                loading="lazy"
              />
            </div>
            <div>
              <p className="person__intro">This is Inês</p>
              <h3 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', marginBottom: '0.4rem' }}>
                {home?.founders?.ines?.name || 'Inês Veloso'}
              </h3>
              <p className="person__role">{home?.founders?.ines?.role || 'Guest experience & creative direction'}</p>
              <p>
                {home?.founders?.ines?.bio ||
                  'Inês shapes the guest experience, communication, creative direction and the small details that make the moment feel considered. With a doctorate in Fine Arts, international experience in maritime tourism in Australia and international maritime certifications, she brings photography, art direction and genuine hosting to every cruise.'}
              </p>
              <p className="person__sig">
                &ldquo;The best moments on the river are the ones that feel effortless — that&rsquo;s where all
                the work goes.&rdquo;
              </p>
            </div>
          </div>

          {/* António */}
          <div className="person person--flip">
            <div className="person__img">
              <img
                src={mediaUrl(home?.founders?.antonio?.photo, '/images/antonio-helm.png')}
                alt={home?.founders?.antonio?.name || 'António Ferrer'}
                loading="lazy"
              />
            </div>
            <div>
              <p className="person__intro">And this is António</p>
              <h3 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', marginBottom: '0.4rem' }}>
                {home?.founders?.antonio?.name || 'António Ferrer'}
              </h3>
              <p className="person__role">{home?.founders?.antonio?.role || 'Skipper — navigation & safety'}</p>
              <p>
                {home?.founders?.antonio?.bio ||
                  'António is responsible for the maritime operation, navigation and safety. An experienced skipper on the Douro since 2019, he knows the river personally — its bridges, its stories and its quieter corners — and brings that deep local knowledge to every departure.'}
              </p>
              <p className="person__sig">
                &ldquo;Every day the river is different. That&rsquo;s why I never get tired of it.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9 · FAQ */}
      <section className="section section--white" id="faq">
        <div className="container">
          <p className="eyebrow">{dict.sections.goodToKnow}</p>
          <h2 className="section-title">{home?.faqSection?.title || 'Frequently asked questions'}</h2>
          {home?.faqSection?.lead && <p className="section-lead">{home.faqSection.lead}</p>}
          <div className="faq-list">
            {faqs.map((faq) => (
              <details className="faq-item" key={faq.id}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9 · Meeting point */}
      <section className="section" id="meeting-point">
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
              title="Douro Marina — meeting point map"
              src="https://www.google.com/maps?q=Douro+Marina,+Rua+da+Praia+430,+4400-554+Vila+Nova+de+Gaia&output=embed"
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
          {home?.hero?.mobileStickyCta || 'Check Availability'}
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
