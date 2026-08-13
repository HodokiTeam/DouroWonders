'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import Script from 'next/script'

type BokunWidgetProps = {
  bookingChannelUUID?: string | null
  widgetSrc?: string | null
  ctaLabel: string
  className?: string
}

/**
 * Bókun booking button. Loads the Bókun widgets loader once and renders the
 * approved "book now" button which opens the experience calendar overlay.
 * Falls back to a disabled button while the loader initialises.
 */
export function BokunWidget({ bookingChannelUUID, widgetSrc, ctaLabel, className }: BokunWidgetProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // The Bokun loader scans for [data-src] buttons on script load; if it loaded
    // before this component mounted, nudge it to re-scan.
    const w = window as unknown as { BokunWidgetsLoader?: { reset?: () => void } }
    if (ready && w.BokunWidgetsLoader?.reset) {
      w.BokunWidgetsLoader.reset()
    }
  }, [ready])

  if (!bookingChannelUUID || !widgetSrc) {
    // Bokun link not configured yet — show a mailto fallback so the CTA never dead-ends.
    return (
      <a href="mailto:info@dourowonders.com" className={className || 'btn btn--primary'}>
        {ctaLabel}
      </a>
    )
  }

  return (
    <>
      <Script
        src={`https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bookingChannelUUID}`}
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <button
        ref={buttonRef}
        id={`bokun_${id}`}
        className={`bokunButton ${className || 'btn btn--primary'}`}
        data-src={widgetSrc}
        data-testid="widget-book-button"
        type="button"
      >
        {ctaLabel}
      </button>
    </>
  )
}
