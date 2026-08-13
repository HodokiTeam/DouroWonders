import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactSection } from '@/components/ContactSection'
import type { Homepage, Media, SiteSetting } from '@/payload-types'
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const l = isLocale(raw) ? raw : 'en'
  return {
  title: 'About Us — Inês & António',
  description:
    'Douro Wonders was created by Inês Veloso and António Ferrer to share the Douro with more care, detail and local knowledge. Meet the two people behind the boat.',
  openGraph: {
    title: 'About Us — Inês & António | Douro Wonders',
    description:
      'Meet Inês Veloso and António Ferrer — the two founders hosting every Douro Wonders cruise personally.',
    images: [{ url: '/images/founders-onboard.png', alt: 'Inês and António on board on the Douro' }],
  },
    alternates: {
      canonical: `/${l}/about`,
      languages: {
        ...Object.fromEntries(locales.map((x) => [localeTags[x], `/${x}/about`])),
        'x-default': '/en/about',
      },
    },
  }
}

const mediaUrl = (m?: (number | null) | Media | null, fallback?: string): string => {
  if (m && typeof m === 'object' && m.url) return m.url
  return fallback || '/images/founders-onboard.png'
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(locale)
  const base = `/${locale}`
  const payload = await getPayload({ config })
  const [home, settings] = await Promise.all([
    payload.findGlobal({ slug: 'homepage', locale }) as Promise<Homepage>,
    payload.findGlobal({ slug: 'site-settings', locale }) as Promise<SiteSetting>,
  ])

  const f = home?.founders
  const campaignActive = home?.campaign?.active !== false

  return (
    <>
      <Header locale={locale} dict={dict} announcement={campaignActive ? home?.campaign?.badgeText : null} />

      {/* Intro */}
      <section className="section" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container founders">
          <div>
            <p className="eyebrow">About Douro Wonders</p>
            <h1 className="section-title">{f?.headline || 'Made by two people who know this river personally.'}</h1>
            <p>
              {f?.body ||
                'Douro Wonders was created by Inês Veloso and António Ferrer to share the Douro with more care, detail and local knowledge.'}
            </p>
            <p style={{ marginTop: '1rem' }}>
              We host experiences, not tours. Small groups, real people — curated experiences for people who
              notice. Every cruise is hosted by us personally, from the welcome drink at Gate B to the last
              recommendation before you step off the boat.
            </p>
          </div>
          <div className="founders__img">
            <img
              src={mediaUrl(f?.image, '/images/founders-onboard.png')}
              alt="Inês and António on board on the Douro"
            />
          </div>
        </div>
      </section>

      {/* The two of them — main feature */}
      <section className="section section--white">
        <div className="container">
          <div className="section-head--center">
            <p className="eyebrow">The Founders</p>
            <h2 className="section-title">Your hosts on the river</h2>
          </div>

          {/* Inês */}
          <div className="person">
            <div className="person__img">
              <img src={mediaUrl(f?.ines?.photo, '/images/ines-helm.png')} alt={f?.ines?.name || 'Inês Veloso'} />
            </div>
            <div>
              <p className="person__intro">This is Inês</p>
              <h2>{f?.ines?.name || 'Inês Veloso'}</h2>
              <p className="person__role">{f?.ines?.role || 'Guest experience & creative direction'}</p>
              <p>
                {f?.ines?.bio ||
                  'Inês shapes the guest experience, communication, creative direction and the small details that make the moment feel considered. With a doctorate in Fine Arts, international experience in maritime tourism in Australia and international maritime certifications (STCW, LROCP, Coxswain Grade 1), she brings photography, art direction and genuine hosting to every cruise.'}
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
                src={mediaUrl(f?.antonio?.photo, '/images/antonio-helm.png')}
                alt={f?.antonio?.name || 'António Ferrer'}
              />
            </div>
            <div>
              <p className="person__intro">And this is António</p>
              <h2>{f?.antonio?.name || 'António Ferrer'}</h2>
              <p className="person__role">{f?.antonio?.role || 'Skipper — navigation & safety'}</p>
              <p>
                {f?.antonio?.bio ||
                  'António is responsible for the maritime operation, navigation and safety. An experienced skipper on the Douro since 2019, he knows the river personally — its bridges, its stories and its quieter corners — and brings that deep local knowledge to every departure.'}
              </p>
              <p className="person__sig">
                &ldquo;Every day the river is different. That&rsquo;s why I never get tired of it.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Promise + CTA */}
      <section className="section section--sand">
        <div className="container" style={{ textAlign: 'center', maxWidth: '52rem' }}>
          <p className="eyebrow">Our promise</p>
          <h2 className="section-title">Premium experiences, hosted by people who care.</h2>
          <p className="section-lead" style={{ margin: '0 auto 2rem' }}>
            Small-group cruises of up to 12 guests between Porto and Vila Nova de Gaia — with a welcome drink,
            local flavours, and the kind of stories only locals can tell.
          </p>
          <Link href={`${base}#experiences`} className="btn btn--primary">
            Explore Authentic Experiences
          </Link>
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
