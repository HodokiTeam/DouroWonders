import React from 'react'

/**
 * Small stroke icons in the champagne/gold family for the "What's included" list.
 * Icon is picked by keyword-matching the (CMS-editable) item text.
 */

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const icons = {
  cocktail: (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M4 4h16l-8 9v6" />
      <path d="M8.5 20h7" />
      <path d="M7.5 8h9" />
    </svg>
  ),
  wine: (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M8 3h8c0 5-1.5 8-4 8s-4-3-4-8Z" />
      <path d="M12 11v8" />
      <path d="M8.5 21h7" />
    </svg>
  ),
  bites: (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M4 13h16a8 8 0 0 1-16 0Z" />
      <path d="M9 9c0-1.5 1-2 1-3.5M14 9c0-1.5 1-2 1-3.5" />
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 24 24" {...S}>
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M12 9v11M4 13h16" />
      <path d="M12 9c-4 0-5-1.5-5-3a2 2 0 0 1 4-.5c.3 1 .7 2.3 1 3.5.3-1.2.7-2.5 1-3.5a2 2 0 0 1 4 .5c0 1.5-1 3-5 3Z" />
    </svg>
  ),
  helm: (
    <svg viewBox="0 0 24 24" {...S}>
      <circle cx="12" cy="12" r="6.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
    </svg>
  ),
  blanket: (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M4 7c0-1.1.9-2 2-2h12a2 2 0 0 1 0 4H7a2 2 0 0 0 0 4h11a2 2 0 0 1 0 4H6a2 2 0 0 1-2-2V7Z" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" {...S}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M16 14.7c2.3.1 4 1.4 4.5 3.8" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M12 4c.6 3.5 2 5 5.5 5.5C14 10 12.6 11.5 12 15c-.6-3.5-2-5-5.5-5.5C10 9 11.4 7.5 12 4Z" />
      <path d="M18.5 15c.3 1.7 1 2.4 2.5 2.7-1.5.3-2.2 1-2.5 2.7-.3-1.7-1-2.4-2.5-2.7 1.5-.3 2.2-1 2.5-2.7Z" />
    </svg>
  ),
}

type IconKey = keyof typeof icons

/**
 * Keywords in all five site languages, accent-stripped. Order matters: the
 * welcome drink also says "drink", so it has to be tested before `wine`.
 */
const KEYWORDS: Array<[IconKey, string[]]> = [
  ['cocktail', ['welcome', 'tonic', 'boas-vindas', 'bienvenue', 'bienvenid', 'willkommen']],
  ['wine', ['drink', 'bebida', 'boisson', 'getrank']],
  [
    'bites',
    [
      'flavour', 'flavor', 'bite', 'food', 'snack',
      'sabor', 'iguaria', 'petisc',
      'saveur', 'bouchee', 'gourmandise',
      'aperitivo', 'bocado',
      'spezialitat', 'happchen', 'kostlichkeit',
    ],
  ],
  ['gift', ['surprise', 'surpresa', 'sorpresa', 'uberraschung']],
  [
    'helm',
    [
      'skipper', 'host', 'crew',
      'anfitri', 'capita', 'patra', 'tripula', 'equipa',
      'capitaine', 'hote', 'equipage',
      'patron', 'tripulacion',
      'kapitan', 'gastgeber', 'besatzung',
    ],
  ],
  ['blanket', ['blanket', 'manta', 'couverture', 'plaid', 'decke']],
  ['shield', ['insurance', 'safety', 'seguro', 'assurance', 'versicherung']],
  ['pin', ['recommend', 'recomenda', 'recomienda', 'recommanda', 'empfehl', 'tipp']],
  [
    'people',
    ['group', 'atmosphere', 'grupo', 'ambiente', 'atmosfera', 'groupe', 'ambiance', 'gruppe'],
  ],
]

/** Lowercase and drop accents, so "Tónico" and "Tonico" match the same key. */
const normalise = (text: string) =>
  Array.from(text.toLowerCase().normalize('NFD'))
    .filter((c) => {
      const code = c.charCodeAt(0)
      return code < 0x0300 || code > 0x036f
    })
    .join('')

const pick = (text: string): IconKey => {
  const t = normalise(text)
  for (const [key, words] of KEYWORDS) {
    if (words.some((w) => t.includes(w))) return key
  }
  return 'sparkle'
}

export function IncludedItem({ text }: { text: string }) {
  return (
    <li>
      <span className="included-icon" aria-hidden="true">
        {icons[pick(text)]}
      </span>
      <span>{text}</span>
    </li>
  )
}
