'use client'

import React, { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { locales, localeNames, isLocale, type Locale } from '@/i18n/config'

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const switchTo = (next: Locale) => {
    // Swap the leading /xx segment, keep the rest of the path
    const segments = (pathname || '/').split('/')
    if (segments[1] && isLocale(segments[1])) segments[1] = next
    else segments.splice(1, 0, next)
    setOpen(false)
    router.push(segments.join('/') || `/${next}`)
  }

  return (
    <div className="lang" ref={ref}>
      <button
        type="button"
        className="lang__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
        </svg>
        <span>{locale.toUpperCase()}</span>
      </button>
      {open && (
        <ul className="lang__menu" role="listbox">
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                className={l === locale ? 'is-active' : ''}
                onClick={() => switchTo(l)}
              >
                {localeNames[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
