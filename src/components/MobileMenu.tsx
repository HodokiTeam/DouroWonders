'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { activeLocales, isLocale, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { usePathname, useRouter } from 'next/navigation'
import { smoothScrollTo } from '@/lib/smoothScroll'

export function MobileMenu({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const base = `/${locale}`

  // Lock the page behind the panel and allow Escape to close it
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const switchLocale = (next: Locale) => {
    const segments = (pathname || '/').split('/')
    if (segments[1] && isLocale(segments[1])) segments[1] = next
    else segments.splice(1, 0, next)
    setOpen(false)
    router.push(segments.join('/') || `/${next}`)
  }

  const links: Array<{ href: string; label: string; internal?: boolean; sub?: boolean }> = [
    { href: `${base}#experiences`, label: dict.nav.experiences },
    { href: `${base}/day-cruise`, label: dict.nav.dayCruise, internal: true, sub: true },
    { href: `${base}/sunset-cruise`, label: dict.nav.sunsetCruise, internal: true, sub: true },
    { href: `${base}/special-occasions`, label: dict.nav.specialOccasions, internal: true },
    { href: `${base}#route`, label: dict.nav.route },
    { href: `${base}#boat`, label: dict.nav.boat },
    { href: `${base}#faq`, label: dict.nav.faq },
    { href: `${base}/about`, label: dict.nav.about, internal: true },
    { href: `${base}/blog`, label: dict.nav.blog, internal: true },
  ]

  return (
    <>
      <button
        type="button"
        className="navtoggle"
        aria-label={dict.common.menu}
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      {open && (
        <div className="mobilemenu" role="dialog" aria-modal="true" aria-label={dict.common.menu}>
          <div className="mobilemenu__bar">
            <span className="mobilemenu__title">{dict.common.menu}</span>
            <div className="mobilemenu__langs-inline" aria-label={dict.common.language}>
              {activeLocales.map((l) => (
                <button
                  key={l}
                  type="button"
                  className={l === locale ? 'is-active' : ''}
                  onClick={() => switchLocale(l)}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button type="button" className="mobilemenu__close" aria-label={dict.common.close} onClick={() => setOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="mobilemenu__links" aria-label="Main">
            {links.map((l) =>
              l.internal ? (
                <Link
                  key={l.label}
                  href={l.href}
                  className={l.sub ? 'mobilemenu__sub' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => {
                    smoothScrollTo(e)
                    setOpen(false)
                  }}
                >
                  {l.label}
                </a>
              ),
            )}
          </nav>

          <a
            href={`${base}#experiences`}
            className="btn btn--primary mobilemenu__cta"
            onClick={(e) => {
              smoothScrollTo(e)
              setOpen(false)
            }}
          >
            {dict.nav.bookNow}
          </a>
        </div>
      )}
    </>
  )
}
