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
      layer.style.transform = `translate3d(0, ${progress * 34}px, 0) scale(1.08)`
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
    <section className="hero-cine">
      <div className="container hero-cine__grid">
        {/* Copy — left column */}
        <div className="hero-cine__content">
          <p className="hero-cine__eyebrow reveal" style={{ animationDelay: '0.05s' }}>
            {eyebrow}
          </p>

          <h1 className="hero-cine__title">
            {words.map((w, i) => (
              <React.Fragment key={`${w}-${i}`}>
                {i > 0 ? ' ' : null}
                <span className="hero-cine__word">
                  <span style={{ animationDelay: `${0.18 + i * 0.07}s` }}>{w}</span>
                </span>
              </React.Fragment>
            ))}
          </h1>

          <p className="hero-cine__sub reveal" style={{ animationDelay: `${afterTitle}s` }}>
            {subheadline}
          </p>

          <div className="hero-cine__rule reveal" style={{ animationDelay: `${afterTitle + 0.08}s` }} />

          {/* Rates — typographic, no boxes */}
          <div className="hero-cine__rates reveal" style={{ animationDelay: `${afterTitle + 0.14}s` }}>
            {rates.map((r) => (
              <a key={r.label} href={r.href} className="hero-cine__rate">
                <span className="hero-cine__rate-label">{r.label}</span>
                <span className="hero-cine__rate-price">
                  {r.price}
                  <i aria-hidden="true">/</i>
                </span>
                <span className="hero-cine__rate-unit">{r.unit}</span>
                <span className="hero-cine__rate-note">{r.note}</span>
              </a>
            ))}
          </div>

          <div className="hero-cine__rule reveal" style={{ animationDelay: `${afterTitle + 0.2}s` }} />

          <div className="hero-cine__actions reveal" style={{ animationDelay: `${afterTitle + 0.26}s` }}>
            <a href={ctaHref} className="btn btn--primary">
              {primaryCta}
            </a>
            <a href={ctaHref} className="hero-cine__textlink">
              {secondaryCta} <span aria-hidden="true">→</span>
            </a>
          </div>

          <ul className="hero-cine__trust reveal" style={{ animationDelay: `${afterTitle + 0.32}s` }}>
            {trust.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        {/* Photograph — right column, framed portrait */}
        <figure className="hero-cine__media" ref={mediaRef}>
          <div className="hero-cine__frame">
            <div className="hero-cine__layer" ref={layerRef} aria-hidden="true">
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

          <figcaption className="hero-cine__caption">
            <span>{slides[active]?.caption ?? slides[active]?.alt}</span>
            <span className="hero-cine__dots" role="tablist" aria-label="Photos">
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
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
