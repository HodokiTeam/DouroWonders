import React from 'react'
import { Poppins } from 'next/font/google'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import '../styles.css'
import { CookieConsent } from '@/components/CookieConsent'
import { activeLocales, localeTags, isLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dourowonders.com'

export function generateStaticParams() {
  return activeLocales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'

  const fallbackTitle = 'Douro Wonders | Authentic Douro Experiences'
  const fallbackDescription =
    'Premium small-group and private Douro River cruises from Porto and Vila Nova de Gaia.'
  let title = fallbackTitle
  let description = fallbackDescription
  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({ slug: 'site-settings', locale })
    title = settings?.seo?.title || fallbackTitle
    description = settings?.seo?.description || fallbackDescription
  } catch {
    // fall through to defaults
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: '%s | Douro Wonders' },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(activeLocales.map((l) => [localeTags[l], `/${l}`])),
        'x-default': '/en',
      },
    },
    keywords: [
      'Douro River cruise',
      'Porto river cruise',
      'Douro boat tour',
      'Porto boat experience',
      'Sunset cruise Porto',
      'Private boat tour Porto',
      'Vila Nova de Gaia',
      'Douro Marina',
      'Afurada',
    ],
    openGraph: {
      type: 'website',
      siteName: 'Douro Wonders',
      locale: localeTags[locale],
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      images: [
        { url: '/images/boat-porto-bridge.png', width: 1920, height: 1280, alt: 'Douro Wonders on the river in Porto' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/boat-porto-bridge.png'],
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const dict = getDictionary(raw)

  return (
    <html lang={localeTags[raw]} className={poppins.variable}>
      <body style={{ fontFamily: 'var(--font-poppins)' }}>
        {children}
        <CookieConsent dict={dict.cookies} privacyHref={`/${raw}/privacy-policy`} />
      </body>
    </html>
  )
}
