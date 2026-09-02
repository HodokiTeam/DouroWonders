export const locales = ['en', 'pt', 'fr', 'es', 'de'] as const
export type Locale = (typeof locales)[number]

/**
 * Locales actually live on the public site — routed, shown in the language
 * switcher, listed in the sitemap and hreflang tags. `locales` above stays
 * the full list Payload understands, so translators can keep preparing
 * content in the other languages ahead of time; flip this list (and
 * redeploy) whenever the founders want to switch one on.
 */
export const activeLocales: Locale[] = ['en', 'pt']

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
}

/** hreflang / html lang values */
export const localeTags: Record<Locale, string> = {
  en: 'en',
  pt: 'pt-PT',
  fr: 'fr',
  es: 'es',
  de: 'de',
}

/** True only for locales actually served on the public site. */
export const isLocale = (value: string): value is Locale => (activeLocales as string[]).includes(value)
