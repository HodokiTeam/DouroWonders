'use client'

import React, { useEffect, useRef, useState } from 'react'

type Slide = { src: string; alt: string; caption?: string }

type Rate = { label: string; price: string; unit: string; note: string; href: string }

export function HeroCinematic({
  slides,
  eyebrow,
  headline,
  subheadline,
  rates,
  trust,
  primaryCta,
  secondaryCta,
  ctaHref,
  interval = 6000,
}: {
  slides: Slide[]
  eyebrow: string
  headline: string
  subheadline: string
  rates: [Rate, Rate]
  trust: string[]
  primaryCta: string
  secondaryCta: string
  ctaHref: string
  interval?: number
}) {
  const [active, setActive] = useState(0)
  const mediaRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)

  // Slow crossfade between the photographs
  useEffect(() => {
    if (slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), interval)
    return () => clearInterval(t)
  }, [slides.length, interval])

  // Depth on the photograph only — the copy is never moved or faded.
  useEffect(() => {
    const media = mediaRef.current
    const layer = layerRef.current
    if (!media || !layer) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const apply = () => {
      raf = 0
      const rect = media.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh
      layer.style.transform = `translate3d(0, ${progress * 24}px, 0) scale(1.08)`
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const words = headline.trim().split(/\s+/)
  const afterTitle = 0.25 + words.length * 0.07

  return (
    <section className="hero-full">
      {/* Photograph carousel, full-bleed behind everything */}
      <div className="hero-full__media" ref={mediaRef}>
        <div className="hero-full__layer" ref={layerRef} aria-hidden="true">
          {slides.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.src}
              src={s.src}
              alt=""
              className={i === active ? 'is-active' : ''}
              loading={i ? 'lazy' : 'eager'}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="hero-full__content">
          <p className="hero-full__eyebrow reveal" style={{ animationDelay: '0.05s' }}>
            {eyebrow}
          </p>

          <h1 className="hero-full__title">
            {words.map((w, i) => (
              <React.Fragment key={`${w}-${i}`}>
                {i > 0 ? ' ' : null}
                <span className="hero-full__word">
                  <span style={{ animationDelay: `${0.18 + i * 0.07}s` }}>{w}</span>
                </span>
              </React.Fragment>
            ))}
          </h1>

          <p className="hero-full__sub reveal" style={{ animationDelay: `${afterTitle}s` }}>
            {subheadline}
          </p>

          <div className="hero-full__rates reveal" style={{ animationDelay: `${afterTitle + 0.06}s` }}>
            {rates.map((r) => (
              <a key={r.label} href={r.href} className="hero-full__rate">
                {r.label}: <b>{r.price}</b> {r.unit}
              </a>
            ))}
          </div>

          <div className="hero-full__actions reveal" style={{ animationDelay: `${afterTitle + 0.12}s` }}>
            <a href={ctaHref} className="btn btn--primary">
              {primaryCta}
            </a>
            <a href={ctaHref} className="btn btn--outline-light">
              {secondaryCta}
            </a>
          </div>

          <ul className="hero-full__trust reveal" style={{ animationDelay: `${afterTitle + 0.18}s` }}>
            {trust.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hero-full__caption">
        <span>{slides[active]?.caption ?? slides[active]?.alt}</span>
        <span className="hero-full__dots" role="tablist" aria-label="Photos">
          {slides.map((s, i) => (
            <button
              key={s.src}
              role="tab"
              aria-selected={i === active}
              aria-label={s.alt}
              className={i === active ? 'is-active' : ''}
              onClick={() => setActive(i)}
            />
          ))}
        </span>
      </div>
    </section>
  )
}
