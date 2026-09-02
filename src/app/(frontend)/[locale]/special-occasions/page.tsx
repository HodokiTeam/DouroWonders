import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PrivateEnquiryForm } from '@/components/PrivateEnquiryForm'
import type { Homepage, SiteSetting } from '@/payload-types'
import { isLocale, activeLocales, localeTags, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const l: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(l)
  const payload = await getPayload({ config })
  const page = await payload.findGlobal({ slug: 'special-occasions', locale: l })
  return {
    title: page?.title || dict.nav.specialOccasions,
    description: page?.intro || dict.privateEnquiry.body,
    alternates: {
      canonical: `/${l}/special-occasions`,
      languages: {
        ...Object.fromEntries(activeLocales.map((x) => [localeTags[x], `/${x}/special-occasions`])),
        'x-default': '/en/special-occasions',
      },
    },
  }
}

export default async function SpecialOccasionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(locale)
  const payload = await getPayload({ config })

  const [home, settings, page] = await Promise.all([
    payload.findGlobal({ slug: 'homepage', locale }) as Promise<Homepage>,
    payload.findGlobal({ slug: 'site-settings', locale }) as Promise<SiteSetting>,
    payload.findGlobal({ slug: 'special-occasions', locale }),
  ])

  const campaignActive = home?.campaign?.active !== false

  return (
    <>
      <Header locale={locale} dict={dict} announcement={campaignActive ? home?.campaign?.badgeText : null} />

      <section className="section private-cta" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container private-cta__grid">
          <div>
            <p className="eyebrow">{page?.eyebrow || dict.privateEnquiry.eyebrow}</p>
            <h1 className="section-title">{page?.title || dict.privateEnquiry.title}</h1>
            <p>{page?.intro || dict.privateEnquiry.body}</p>
            {!!page?.ideas?.length && (
              <>
                <h2 className="occasions-teaser__label" style={{ marginTop: '2rem' }}>
                  {dict.homeSpecialOccasions.occasionsLabel}
                </h2>
                <ul className="occasions-teaser__list">
                  {page.ideas.map((idea, i) => (
                    <li key={i}>{idea.text}</li>
                  ))}
                </ul>
              </>
            )}
            {!!page?.extras?.length && (
              <>
                <h2 className="occasions-teaser__label" style={{ marginTop: '2rem' }}>
                  {dict.homeSpecialOccasions.extrasLabel}
                </h2>
                <ul className="occasions-teaser__list">
                  {page.extras.map((extra, i) => (
                    <li key={i}>{extra.text}</li>
                  ))}
                </ul>
              </>
            )}
            <p className="private-cta__events">
              {page?.closingLine || dict.homeSpecialOccasions.closingLine}
              <br />
              {dict.privateEnquiry.eventsNote}
            </p>
          </div>
          <PrivateEnquiryForm dict={dict.privateEnquiry} contactDict={dict.contact} privacyHref={`/${locale}/privacy-policy`} />
        </div>
      </section>

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
    </>
  )
}
