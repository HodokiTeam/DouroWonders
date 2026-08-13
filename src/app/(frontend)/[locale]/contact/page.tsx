import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'
import type { Homepage, SiteSetting } from '@/payload-types'
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const l: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(l)
  return {
    title: dict.sections.contact,
    description: dict.contact.lead,
    alternates: {
      canonical: `/${l}/contact`,
      languages: {
        ...Object.fromEntries(locales.map((x) => [localeTags[x], `/${x}/contact`])),
        'x-default': '/en/contact',
      },
    },
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(locale)
  const payload = await getPayload({ config })
  const [home, settings] = await Promise.all([
    payload.findGlobal({ slug: 'homepage', locale }) as Promise<Homepage>,
    payload.findGlobal({ slug: 'site-settings', locale }) as Promise<SiteSetting>,
  ])
  const campaignActive = home?.campaign?.active !== false
  const email = settings?.email || 'info@dourowonders.com'
  const whatsapp = settings?.whatsapp

  return (
    <>
      <Header locale={locale} dict={dict} announcement={campaignActive ? home?.campaign?.badgeText : null} />

      <section className="section" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container contact-layout">
          <div>
            <p className="eyebrow">{dict.sections.contact}</p>
            <h1 className="section-title">{dict.contact.title}</h1>
            <p className="section-lead">{dict.contact.lead}</p>
            <ul className="contact-channels">
              <li>
                <strong>{dict.contact.email}</strong>
                <a href={`mailto:${email}`} className="link-gold">
                  {email}
                </a>
              </li>
              {whatsapp && (
                <li>
                  <strong>{dict.contact.whatsapp}</strong>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-gold"
                  >
                    {whatsapp}
                  </a>
                </li>
              )}
              {settings?.phones?.map((p) => (
                <li key={p.number}>
                  <strong>{p.label || dict.contact.phone}</strong>
                  <a href={`tel:${(p.number || '').replace(/\s/g, '')}`} className="link-gold">
                    {p.number}
                  </a>
                </li>
              ))}
            </ul>
            {!!settings?.phones?.length && <p className="contact-callcost">{dict.footer.callCost}</p>}
          </div>
          <div className="booking-panel">
            <h2 style={{ marginBottom: '1.2rem' }}>{dict.contact.sendMessage}</h2>
            <ContactForm dict={dict.contact} privacyHref={`/${locale}/privacy-policy`} />
          </div>
        </div>
      </section>

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
    </>
  )
}
