import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactSection } from '@/components/ContactSection'
import type { SiteSetting } from '@/payload-types'
import { isLocale, activeLocales, localeTags, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const l = isLocale(raw) ? raw : 'en'
  return {
  title: 'Cancellation Policy',
  description:
    'Free cancellation up to 24 hours before your Douro Wonders cruise. Reschedule or full refund if we cancel for safety, weather or river conditions.',
    alternates: {
      canonical: `/${l}/cancellation-policy`,
      languages: {
        ...Object.fromEntries(activeLocales.map((x) => [localeTags[x], `/${x}/cancellation-policy`])),
        'x-default': '/en/cancellation-policy',
      },
    },
  }
}

export default async function CancellationPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(locale)
  const base = `/${locale}`
  const payload = await getPayload({ config })
  const settings = (await payload.findGlobal({ slug: 'site-settings', locale })) as SiteSetting

  return (
    <>
      <Header locale={locale} dict={dict} />
      <section className="section" style={{ paddingTop: '10rem' }}>
        <div className="container" style={{ maxWidth: '46rem' }}>
          <p className="eyebrow">Bookings</p>
          <h1 className="section-title">Cancellation policy</h1>
          <p style={{ whiteSpace: 'pre-line' }}>
            {settings?.cancellationPolicy ||
              'Free cancellation up to 24 hours before the experience.\n\nLess than 24 hours before departure, late arrivals and no-shows are non-refundable.\n\nIf the experience needs to be cancelled for safety, weather, river or operational reasons, guests will be offered a reschedule or refund.'}
          </p>
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
    </>
  )
}
