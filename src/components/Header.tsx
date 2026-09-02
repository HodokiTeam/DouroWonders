'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileMenu } from './MobileMenu'
import { AnnounceWave } from './AnnounceWave'
import { smoothScrollTo } from '@/lib/smoothScroll'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

export function Header({
  locale,
  dict,
  announcement,
  localizedPaths,
}: {
  locale: Locale
  dict: Dictionary
  announcement?: string | null
  localizedPaths?: Partial<Record<Locale, string>>
}) {
  const base = `/${locale}`
  const pathname = usePathname()

  // Link alone only scrolls to top when it actually navigates. Clicking the
  // logo while already on the homepage is a no-op route-wise, so it needs an
  // explicit scroll to behave like a "go to top" shortcut in that case too.
  const onLogoClick = () => {
    if (pathname === base || pathname === `${base}/`) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      {announcement && (
        <div className="announce">
          <a href={`${base}#experiences`} onClick={smoothScrollTo}>{announcement}</a>
          <AnnounceWave />
        </div>
      )}
      <header className="site-header">
        <div className="container">
          <Link
            href={base}
            className="site-header__logo"
            aria-label="Douro Wonders — home"
            onClick={onLogoClick}
          >
            <Image
              src="/brand/symbol-trim.png"
              alt=""
              width={104}
              height={48}
              priority
              className="site-header__symbol"
            />
            <Image
              src="/brand/wordmark-trim.png"
              alt="Douro Wonders"
              width={160}
              height={38}
              priority
              className="site-header__wordmark"
            />
          </Link>
          <nav className="site-header__nav" aria-label="Main">
            <div className="nav-dropdown">
              <a href={`${base}#experiences`} onClick={smoothScrollTo}>{dict.nav.experiences}</a>
              <div className="nav-dropdown__panel">
                <Link href={`${base}/${dict.nav.dayCruiseSlug}`}>{dict.nav.dayCruise}</Link>
                <Link href={`${base}/${dict.nav.sunsetCruiseSlug}`}>{dict.nav.sunsetCruise}</Link>
              </div>
            </div>
            <Link href={`${base}/special-occasions`}>{dict.nav.specialOccasions}</Link>
            <a href={`${base}#route`} onClick={smoothScrollTo}>{dict.nav.route}</a>
            <a href={`${base}#boat`} onClick={smoothScrollTo}>{dict.nav.boat}</a>
            <a href={`${base}#faq`} onClick={smoothScrollTo}>{dict.nav.faq}</a>
            <Link href={`${base}/about`}>{dict.nav.about}</Link>
            <Link href={`${base}/blog`}>{dict.nav.blog}</Link>
            <LanguageSwitcher locale={locale} label={dict.common.language} localizedPaths={localizedPaths} />
            <a href={`${base}#experiences`} className="btn btn--primary" onClick={smoothScrollTo}>
              {dict.nav.bookNow}
            </a>
          </nav>

          <MobileMenu locale={locale} dict={dict} localizedPaths={localizedPaths} />
        </div>
      </header>
    </>
  )
}
