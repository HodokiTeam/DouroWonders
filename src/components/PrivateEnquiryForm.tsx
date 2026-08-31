'use client'

import React, { useState } from 'react'
import type { Dictionary } from '@/i18n/dictionaries'

export function PrivateEnquiryForm({
  dict,
  contactDict,
  privacyHref,
}: {
  dict: Dictionary['privateEnquiry']
  contactDict: Dictionary['contact']
  privacyHref: string
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [consent, setConsent] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    if (fd.get('_gotcha')) {
      setStatus('sent')
      form.reset()
      return
    }

    const name = String(fd.get('name') || '')
    const email = String(fd.get('email') || '')
    const phone = String(fd.get('phone') || '')
    const cruise = String(fd.get('cruise') || '')
    const date = String(fd.get('date') || '')
    const guests = String(fd.get('guests') || '')
    const occasion = String(fd.get('occasion') || '')
    const extras = String(fd.get('extras') || '')
    const note = String(fd.get('message') || '')

    const message = [
      `${dict.cruise}: ${cruise || '—'}`,
      `${dict.date}: ${date || '—'}`,
      `${dict.guests}: ${guests || '—'}`,
      `${dict.occasion}: ${occasion || '—'}`,
      `${dict.extras}: ${extras || '—'}`,
      '',
      note,
    ].join('\n')

    setStatus('sending')
    try {
      const res = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject: dict.eyebrow,
          message,
        }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('sent')
      form.reset()
      setConsent(false)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="contact-form__done" role="status">
        <p>
          <strong>{dict.sentTitle}</strong>
        </p>
        <p>{dict.sentBody}</p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-form__row">
        <label>
          {contactDict.name}
          <input name="name" type="text" required autoComplete="name" placeholder={contactDict.namePlaceholder} />
        </label>
        <label>
          {contactDict.email}
          <input name="email" type="email" required autoComplete="email" placeholder={contactDict.emailPlaceholder} />
        </label>
      </div>
      <div className="contact-form__row">
        <label>
          {contactDict.phoneOptional}
          <input name="phone" type="tel" autoComplete="tel" placeholder={contactDict.phonePlaceholder} />
        </label>
        <label>
          {dict.cruise}
          <select name="cruise" defaultValue="">
            <option value="" disabled>
              {dict.cruiseUnsure}
            </option>
            <option value={dict.cruiseDay}>{dict.cruiseDay}</option>
            <option value={dict.cruiseSunset}>{dict.cruiseSunset}</option>
            <option value={dict.cruiseUnsure}>{dict.cruiseUnsure}</option>
          </select>
        </label>
      </div>
      <div className="contact-form__row">
        <label>
          {dict.date}
          <input name="date" type="date" />
        </label>
        <label>
          {dict.guests}
          <input name="guests" type="number" min={1} max={12} placeholder={dict.guestsPlaceholder} />
        </label>
      </div>
      <div className="contact-form__row">
        <label>
          {dict.occasion}
          <input name="occasion" type="text" placeholder={dict.occasionPlaceholder} />
        </label>
        <label>
          {dict.extras}
          <input name="extras" type="text" placeholder={dict.extrasPlaceholder} />
        </label>
      </div>
      <label>
        {contactDict.message}
        <textarea name="message" rows={4} placeholder={dict.messagePlaceholder} />
      </label>

      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: 'none' }}
      />

      <label className="contact-form__consent">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          {dict.consent}{' '}
          <a href={privacyHref} className="link-gold">
            {contactDict.privacyLink}
          </a>
          .
        </span>
      </label>

      <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
        {status === 'sending' ? contactDict.sending : dict.send}
      </button>
      {status === 'error' && (
        <p className="contact-form__error" role="alert">
          {contactDict.error}
        </p>
      )}
    </form>
  )
}
