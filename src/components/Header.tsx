import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileMenu } from './MobileMenu'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

export function Header({
  locale,
  dict,
  announcement,
}: {
  locale: Locale
  dict: Dictionary
  announcement?: string | null
}) {
  const base = `/${locale}`
  return (
    <>
      {announcement && (
        <div className="announce">
          <a href={`${base}#experiences`}>{announcement}</a>
        </div>
      )}
      <header className="site-header">
        <div className="container">
          <Link href={base} className="site-header__logo" aria-label="Douro Wonders — home">
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
            <a href={`${base}#experiences`}>{dict.nav.experiences}</a>
            <a href={`${base}#boat`}>{dict.nav.boat}</a>
            <a href={`${base}#route`}>{dict.nav.route}</a>
            <Link href={`${base}/blog`}>{dict.nav.blog}</Link>
            <a href={`${base}#faq`}>{dict.nav.faq}</a>
            <Link href={`${base}/about`}>{dict.nav.about}</Link>
            <LanguageSwitcher locale={locale} label={dict.common.language} />
            <a href={`${base}#experiences`} className="btn btn--primary">
              {dict.nav.bookNow}
            </a>
          </nav>

          <MobileMenu locale={locale} dict={dict} />
        </div>
      </header>
    </>
  )
}
