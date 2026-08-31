'use client'

import React, { useCallback, useEffect, useState } from 'react'

type Photo = { src: string; alt: string }

const VISIBLE_COUNT = 5

/**
 * One large photo plus a thumbnail grid (GetYourGuide-style), click-through
 * to a full-screen lightbox. A small "View all" pill sits in the corner of
 * the last tile — the lightbox cycles through every photo, including any
 * beyond the tiles shown.
 */
export function ExperienceGallery({ photos, viewAllLabel }: { photos: Photo[]; viewAllLabel: string }) {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const prev = useCallback(
    () => setOpen((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  )
  const next = useCallback(() => setOpen((i) => (i === null ? null : (i + 1) % photos.length)), [photos.length])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, prev, next])

  if (!photos.length) return null

  const visible = photos.slice(0, VISIBLE_COUNT)
  const [main, ...thumbs] = visible

  return (
    <>
      <div className="exp-gallery exp-gallery--inline">
        <figure
          className="exp-gallery__main"
          onClick={() => setOpen(0)}
          role="button"
          tabIndex={0}
          aria-label={main.alt}
        >
          <img src={main.src} alt={main.alt} loading="eager" />
        </figure>
        {thumbs.length > 0 && (
          <div className="exp-gallery__thumbs">
            {thumbs.map((p, i) => {
              const index = i + 1
              const isLast = i === thumbs.length - 1
              return (
                <figure
                  key={p.src}
                  onClick={() => setOpen(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={p.alt}
                >
                  <img src={p.src} alt={p.alt} loading="lazy" />
                  {isLast && photos.length > 1 && (
                    <span className="exp-gallery__viewall">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                      </svg>
                      {viewAllLabel}
                    </span>
                  )}
                </figure>
              )
            })}
          </div>
        )}
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="lightbox__close" onClick={close} aria-label="Close">
            ✕
          </button>
          {photos.length > 1 && (
            <button
              className="lightbox__nav lightbox__nav--prev"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous photo"
            >
              ‹
            </button>
          )}
          <img
            src={photos[open].src}
            alt={photos[open].alt}
            className="lightbox__img"
            onClick={(e) => e.stopPropagation()}
          />
          {photos.length > 1 && (
            <button
              className="lightbox__nav lightbox__nav--next"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next photo"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  )
}
