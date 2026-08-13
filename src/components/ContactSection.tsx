import React from 'react'
import { ContactForm } from './ContactForm'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

type Props = {
  locale: Locale
  dict: Dictionary
  email?: string | null
  whatsapp?: string | null
  phones?: Array<{ label?: string | null; number: string }> | null
}

export function ContactSection({ locale, dict, email, whatsapp, phones }: Props) {
  const mail = email || 'info@dourowonders.com'
  return (
    <section className="section section--sand" id="contact">
      <div className="container contact-layout">
        <div>
          <p className="eyebrow">{dict.sections.contact}</p>
          <h2 className="section-title">{dict.contact.title}</h2>
          <p className="section-lead">{dict.contact.lead}</p>
          <ul className="contact-channels">
            <li>
              <strong>{dict.contact.email}</strong>
              <a href={`mailto:${mail}`} className="link-gold">
                {mail}
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
            {phones?.map((p) => (
              <li key={p.number}>
                <strong>{p.label || dict.contact.phone}</strong>
                <a href={`tel:${p.number.replace(/\s/g, '')}`} className="link-gold">
                  {p.number}
                </a>
              </li>
            ))}
          </ul>
          {!!phones?.length && <p className="contact-callcost">{dict.footer.callCost}</p>}
        </div>
        <div className="booking-panel">
          <h3 style={{ marginBottom: '1.2rem' }}>{dict.contact.sendMessage}</h3>
          <ContactForm dict={dict.contact} privacyHref={`/${locale}/privacy-policy`} />
        </div>
      </div>
    </section>
  )
}
