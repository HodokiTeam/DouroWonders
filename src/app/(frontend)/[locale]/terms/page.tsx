import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactSection } from '@/components/ContactSection'
import type { SiteSetting } from '@/payload-types'
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const l = isLocale(raw) ? raw : 'en'
  return {
  title: 'Terms & Conditions',
  description: 'Booking terms and conditions for Douro Wonders river experiences in Porto and Vila Nova de Gaia.',
    alternates: {
      canonical: `/${l}/terms`,
      languages: {
        ...Object.fromEntries(locales.map((x) => [localeTags[x], `/${x}/terms`])),
        'x-default': '/en/terms',
      },
    },
  }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
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
          <p className="eyebrow">Legal</p>
          <h1 className="section-title">Terms &amp; conditions</h1>
          <p>
            Experiences are operated by Douro Wonders, Lda. Bookings are subject to the cancellation
            policy. The route may vary depending on river, weather and safety conditions.
          </p>
          <p style={{ marginTop: '1rem', fontSize: 'var(--fs-caption)', color: 'var(--muted-grey)' }}>
            Full legal text to be completed before launch.
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
