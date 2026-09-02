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
  title: 'Privacy Policy',
  description: 'How Douro Wonders handles your personal information when you book or contact us.',
    alternates: {
      canonical: `/${l}/privacy-policy`,
      languages: {
        ...Object.fromEntries(activeLocales.map((x) => [localeTags[x], `/${x}/privacy-policy`])),
        'x-default': '/en/privacy-policy',
      },
    },
  }
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
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
          <h1 className="section-title">Privacy policy</h1>
          <div className="prose">
            <p>
              <strong>Who we are.</strong> Douro Wonders, Lda. is the data controller for the personal data
              collected through this website. Bookings and payments are processed by Bókun, our booking
              provider, under its own privacy terms.
            </p>
            <p>
              <strong>What we collect and why.</strong> We only use the personal information needed to manage
              your booking (name, email, booking details), reply to your messages (contact form, email,
              WhatsApp) and meet our legal obligations. We do not sell or share your data for marketing.
            </p>
            <p>
              <strong>Your rights (GDPR / RGPD).</strong> Under the General Data Protection Regulation you
              may request access to, correction or deletion of your personal data, object to or restrict its
              processing, and request portability. To exercise any of these rights, write to{' '}
              <a href={`mailto:${settings?.email || 'info@dourowonders.com'}`} className="link-gold">
                {settings?.email || 'info@dourowonders.com'}
              </a>
              . You may also lodge a complaint with the Portuguese supervisory authority (CNPD —{' '}
              <a href="https://www.cnpd.pt" className="link-gold" target="_blank" rel="noopener noreferrer">
                cnpd.pt
              </a>
              ).
            </p>
            <p>
              <strong>Retention.</strong> Contact messages and booking records are kept only as long as
              needed for the purposes above or as required by law (e.g. invoicing).
            </p>
            <h2 id="cookies" style={{ fontSize: '1.3rem', margin: '2rem 0 0.8rem' }}>
              Cookies
            </h2>
            <p>
              This website uses <strong>essential cookies</strong> that are strictly necessary for it to work
              — including those set by the Bókun booking widget during checkout. These do not require
              consent. With your consent, we may also use <strong>analytics cookies</strong> (e.g. Google
              Analytics) to understand how the site is used; these are only set if you choose
              &ldquo;Accept all&rdquo; in the cookie banner. You can change your choice at any time by
              clearing this site&rsquo;s data in your browser.
            </p>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: 'var(--fs-caption)', color: 'var(--muted-grey)' }}>
            Last updated: July 2026.
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
