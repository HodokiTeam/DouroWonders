export const locales = ['en', 'pt', 'fr', 'es', 'de'] as const
export type Locale = (typeof locales)[number]

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

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value)
