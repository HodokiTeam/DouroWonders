'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * Fixed mobile "Check Availability" bar — hidden once the real Book buttons
 * (inside #book) are already on screen, so it doesn't float on top of them
 * with a second, differently-worded call to action.
 */
export function StickyBookingCta({ label, targetId = 'book' }: { label: string; targetId?: string }) {
  const [hidden, setHidden] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = document.getElementById(targetId)
    if (!target) return
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      rootMargin: '0px 0px -20% 0px',
    })
    observer.observe(target)
    return () => observer.disconnect()
  }, [targetId])

  return (
    <div className="sticky-cta" ref={ref} style={hidden ? { display: 'none' } : undefined}>
      <a href={`#${targetId}`} className="btn btn--primary">
        {label}
      </a>
    </div>
  )
}
