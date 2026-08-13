'use client'

import React, { useState } from 'react'
import type { Dictionary } from '@/i18n/dictionaries'

export function ContactForm({
  dict,
  privacyHref,
}: {
  dict: Dictionary['contact']
  privacyHref: string
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    // Honeypot: bots fill hidden fields. Pretend it worked and drop it.
    if (fd.get('_gotcha')) {
      setStatus('sent')
      form.reset()
      return
    }

    const name = String(fd.get('name') || '')
    const email = String(fd.get('email') || '')
    const subject = String(fd.get('subject') || '')
    const message = String(fd.get('message') || '')

    setStatus('sending')
    try {
      // One call to our own server, which stores the message and sends the
      // email. The mail API key stays on the server.
      const res = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('sent')
      form.reset()
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
          {dict.name}
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label>
          {dict.email}
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label>
        {dict.subject}
        <input name="subject" type="text" placeholder={dict.subjectPlaceholder} />
      </label>
      <label>
        {dict.message}
        <textarea name="message" rows={5} required />
      </label>

      {/* Anti-spam honeypot — must stay empty */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: 'none' }}
      />

      <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
        {status === 'sending' ? dict.sending : dict.send}
      </button>
      {status === 'error' && (
        <p className="contact-form__error" role="alert">
          {dict.error}
        </p>
      )}
      <p className="contact-form__privacy">
        {dict.privacy}{' '}
        <a href={privacyHref} className="link-gold">
          {dict.privacyLink}
        </a>
        .
      </p>
    </form>
  )
}
