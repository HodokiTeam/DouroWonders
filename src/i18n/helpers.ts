import type { Locale } from './config'

/** Builds an internal URL for a locale: localePath('pt', '/blog') → '/pt/blog' */
export const localePath = (locale: Locale, path = ''): string => `/${locale}${path === '/' ? '' : path}`
