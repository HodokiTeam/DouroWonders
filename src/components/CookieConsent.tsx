'use client'

import React, { useEffect, useState } from 'react'
import type { Dictionary } from '@/i18n/dictionaries'

const KEY = 'dw-cookie-consent'

export function CookieConsent({
  dict,
  privacyHref,
}: {
  dict: Dictionary['cookies']
  privacyHref: string
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true)
  }, [])

  const choose = (value: 'all' | 'essential') => {
    localStorage.setItem(KEY, JSON.stringify({ value, at: new Date().toISOString() }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie preferences">
      <p>
        {dict.text}{' '}
        <a href={`${privacyHref}#cookies`} className="link-gold">
          {dict.learnMore}
        </a>
        .
      </p>
      <div className="cookie-banner__actions">
        <button className="btn btn--secondary" onClick={() => choose('essential')}>
          {dict.essential}
        </button>
        <button className="btn btn--primary" onClick={() => choose('all')}>
          {dict.acceptAll}
        </button>
      </div>
    </div>
  )
}
