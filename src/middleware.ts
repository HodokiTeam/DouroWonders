import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale, type Locale } from '@/i18n/config'

/** Picks the best locale from the browser's Accept-Language header. */
function detectLocale(header: string | null): Locale {
  if (!header) return defaultLocale
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { tag: tag.trim().toLowerCase(), q: q ? parseFloat(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    const base = tag.split('-')[0]
    const match = locales.find((l) => l === base)
    if (match) return match
  }
  return defaultLocale
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return NextResponse.next()

  const locale = detectLocale(req.headers.get('accept-language'))
  const url = req.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Skip the Payload admin/API, Next internals, static assets and SEO files.
  matcher: ['/((?!api|admin|_next|media|images|brand|sitemap.xml|robots.txt|favicon.ico|.*\\..*).*)'],
}
