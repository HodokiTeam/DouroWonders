'use client'

import React, { useEffect, useRef } from 'react'

/**
 * Shared water-line generator, from superposed cosines:
 *
 *   y(x, t) = base + Σ Aᵢ · cos(kᵢ·x + ωᵢ·t)
 *
 * Three components with different wavelengths, speeds and directions. Because
 * their periods never line up, the swell keeps changing shape instead of
 * repeating — and the crests genuinely rise and fall rather than sliding past.
 *
 * Used both above the footer (crest pointing up) and below the opening-offer
 * banner (the same shape, flipped, so the crest points down instead).
 */

const W = 1200
const H = 100
const BASE = 58
const SAMPLES = 110

const COMPONENTS: Array<[number, number, number]> = [
  [14, 430, 0.42],
  [9, 670, -0.29],
  [5, 1030, 0.17],
]

function buildPath(t: number): string {
  let d = `M0,${H} L0,`
  for (let i = 0; i <= SAMPLES; i++) {
    const x = (i / SAMPLES) * W
    let y = BASE
    for (const [amp, wavelength, omega] of COMPONENTS) {
      y += amp * Math.cos((2 * Math.PI * x) / wavelength + omega * t)
    }
    d += i === 0 ? `${y.toFixed(2)}` : ` L${x.toFixed(1)},${y.toFixed(2)}`
  }
  return `${d} L${W},${H} Z`
}

export function Wave({ className }: { className: string }) {
  const pathRef = useRef<SVGPathElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const path = pathRef.current
    const wrap = wrapRef.current
    if (!path || !wrap) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      path.setAttribute('d', buildPath(0))
      return
    }

    let raf = 0
    let onScreen = true
    const start = performance.now()

    const measure = () => {
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      onScreen = rect.bottom > -200 && rect.top < vh + 200
    }

    const frame = (now: number) => {
      if (onScreen && !document.hidden) {
        path.setAttribute('d', buildPath((now - start) / 1000))
      }
      raf = requestAnimationFrame(frame)
    }

    measure()
    path.setAttribute('d', buildPath(0))
    raf = requestAnimationFrame(frame)
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <div className={className} ref={wrapRef} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <path ref={pathRef} d={buildPath(0)} />
      </svg>
    </div>
  )
}
