import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { InstagramIcon, FacebookIcon, LinkedInIcon, GoogleIcon } from './SocialIcons'
import { FooterWave } from './FooterWave'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

type FooterProps = {
  locale: Locale
  dict: Dictionary
  email?: string | null
  meetingPointName?: string | null
  addressLines?: string[]
  social?: {
    instagram?: string | null
    facebook?: string | null
    linkedin?: string | null
    google?: string | null
  }
  livroReclamacoesUrl?: string | null
  phones?: Array<{ label?: string | null; number: string }> | null
  whatsapp?: string | null
  rnaat?: string | null
  tagline?: string | null
  cofinancingLabel?: string | null
  cofinancingLogos?: Array<{ name: string; url?: string | null; logo: { url?: string | null } | number | null }> | null
}

export function Footer({
  locale,
  dict,
  email,
  meetingPointName,
  addressLines,
  social,
  livroReclamacoesUrl,
  phones,
  whatsapp,
  rnaat,
  tagline,
  cofinancingLabel,
  cofinancingLogos,
}: FooterProps) {
  const base = `/${locale}`
  return (
    <footer className="site-footer">
      <FooterWave />

      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__logo">
            <Image
              src="/brand/slogan-trim.png"
              alt="Douro Wonders — Authentic Experiences"
              width={207}
              height={110}
              style={{ height: 110, width: 'auto' }}
            />
            <p>{tagline || dict.footer.tagline}</p>
            <div className="site-footer__social">
              {social?.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon />
                </a>
              )}
              {social?.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FacebookIcon />
                </a>
              )}
              {social?.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
              )}
              {social?.google && (
                <a href={social.google} target="_blank" rel="noopener noreferrer" aria-label="Google">
                  <GoogleIcon />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4>{dict.footer.meetingPoint}</h4>
            <address>
              {meetingPointName && <strong>{meetingPointName}</strong>}
              {addressLines?.map((line) => <div key={line}>{line}</div>)}
            </address>
          </div>

          <div>
            <h4>{dict.footer.contact}</h4>
            <ul>
              {email && (
                <li>
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp: {whatsapp}
                  </a>
                </li>
              )}
              {phones?.map((p) => (
                <li key={p.number}>
                  {p.label ? `${p.label}: ` : ''}
                  <a href={`tel:${p.number.replace(/\s/g, '')}`}>{p.number}</a>
                </li>
              ))}
              {!!phones?.length && <li className="site-footer__callcost">{dict.footer.callCost}</li>}
              <li>
                <Link href={`${base}/contact`}>{dict.footer.contactForm}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>{dict.footer.bookings}</h4>
            <ul>
              <li>
                <Link href={`${base}/${dict.nav.dayCruiseSlug}`}>{dict.nav.dayCruise}</Link>
              </li>
              <li>
                <Link href={`${base}/${dict.nav.sunsetCruiseSlug}`}>{dict.nav.sunsetCruise}</Link>
              </li>
              <li>
                <Link href={`${base}/blog`}>{dict.nav.blog}</Link>
              </li>
              <li>
                <a href={`${base}#faq`}>{dict.footer.faq}</a>
              </li>
              <li>
                <Link href={`${base}/cancellation-policy`}>{dict.footer.cancellation}</Link>
              </li>
              <li>
                <a
                  href={livroReclamacoesUrl || 'https://www.livroreclamacoes.pt'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dict.footer.livro}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {!!cofinancingLogos?.length && (
          <div className="site-footer__cofinancing">
            {cofinancingLabel && <p>{cofinancingLabel}</p>}
            <div className="site-footer__cofinancing-logos">
              {cofinancingLogos.map((item, i) => {
                const src = item.logo && typeof item.logo === 'object' ? item.logo.url : undefined
                if (!src) return null
                const img = <img src={src} alt={item.name} loading="lazy" />
                return (
                  <span key={i}>
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {img}
                      </a>
                    ) : (
                      img
                    )}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        <div className="site-footer__bottom">
          <span>
            © {new Date().getFullYear()} Douro Wonders, Lda. · Authentic Experiences
            {rnaat ? ` · ${rnaat}` : ''}
          </span>
          <span>
            <Link href={`${base}/privacy-policy`}>{dict.footer.privacy}</Link> ·{' '}
            <Link href={`${base}/terms`}>{dict.footer.terms}</Link>
          </span>
          <span className="site-footer__credit">
            {dict.footer.madeBy}{' '}
            <a href="https://hodoki.pt" target="_blank" rel="noopener noreferrer">
              Hodoki
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
