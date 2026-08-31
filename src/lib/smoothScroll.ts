import type { MouseEvent } from 'react'

/**
 * Smooth-scrolls same-page anchor links (e.g. "/en#experiences" clicked
 * while already on "/en"). Cross-page hash links (clicked from a different
 * route) are left alone so Next.js's own instant post-navigation jump
 * still applies — only in-page jumps get the animated scroll.
 */
export function smoothScrollTo(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href') || ''
  const hashIndex = href.indexOf('#')
  if (hashIndex === -1) return

  const path = href.slice(0, hashIndex)
  const hash = href.slice(hashIndex + 1)
  if (path && path !== window.location.pathname) return

  const el = document.getElementById(hash)
  if (!el) return

  e.preventDefault()
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
