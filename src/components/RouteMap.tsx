'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Interactive route map drawn on top of the brand map artwork
 * (public/images/route-map.png, 2048×1152). The river centreline below was
 * traced from that artwork, so the animated trail follows the drawn river exactly.
 */
const RIVER: Array<[number, number]> = [
  // out through the mouth into open sea — measured from the artwork's water
  [200, 584],
  [230, 570],
  [262, 560],
  [301, 569],
  [361, 576],
  [421, 622],
  [487, 648],
  [547, 619],
  [607, 591],
  [667, 553],
  [727, 552],
  [787, 540],
  [847, 545],
  [907, 578],
  [967, 610],
  [1027, 624],
  [1087, 647],
  [1147, 692],
  [1207, 726],
  [1267, 719],
  [1327, 702],
  [1387, 685],
  [1447, 676],
  [1507, 696],
  [1567, 729],
  [1627, 727],
  [1687, 694],
  [1747, 666],
  [1807, 662],
  [1867, 674],
  [1927, 747],
]

const MARINA_X = 658

type Stop = { x: number; name: string }

/**
 * Where each stop of the itinerary sits along the drawn river, in artwork
 * coordinates. The order and the count match the itinerary stored on each
 * experience in the CMS, so the names arrive already translated.
 */
const DAY_X = [
  MARINA_X, // Douro Marina, Afurada
  789, // Ponte da Arrábida
  855, // Ponte Ferreirinha (under construction)
  910, // Tram Museum
  950, // Massarelos Parish Church
  995, // Crystal Palace Gardens
  1090, // Alfândega
  1120, // Jardim das Virtudes
  1195, // Ribeira
  1220, // Clérigos Tower
  1250, // Cathedral
  1268, // Episcopal Palace
  1290, // Cais de Gaia & the cellars
  1305, // Rabelo boats
  1338, // Serra do Pilar Monastery
  1352, // Jardim do Morro
  1322, // Ponte D. Luís I
  1390, // Fernandina Wall
  1451, // Ponte do Infante
  1520, // Ponte D. Maria Pia
  1567, // Ponte São João
  1807, // Ponte do Freixo
  MARINA_X, // back to Afurada
]

/**
 * Of the western stops, only this one carries a written label. Passeio Alegre
 * is already named on the artwork itself, so a second label just repeats it.
 */
const LABELLED_X = [200] // Foz do Douro

/**
 * The sunset cruise carries on west, out to the Atlantic. Positions were read
 * off the artwork: Passeio Alegre sits under its printed label, and the last
 * three step out through the mouth to the open sea.
 */
const SUNSET_X = [
  560, // Farol de São Miguel-o-Anjo
  470, // Douro Estuary Nature Reserve — the Cabedelo sandbank
  293, // Passeio Alegre — aligned with the label printed on the map
  262, // São João da Foz Fortress
  232, // Farol de Felgueiras — on the pier
  200, // Foz do Douro — at the sea
]

/** Used only if the CMS itinerary is empty. */
const FALLBACK_DAY = [
  'Douro Marina, Afurada',
  'Ponte da Arrábida',
  'Ponte Ferreirinha',
  'Museu do Carro Eléctrico',
  'Igreja de Massarelos',
  'Palácio de Cristal',
  'Alfândega',
  'Jardim das Virtudes',
  'Ribeira',
  'Torre dos Clérigos',
  'Sé Catedral',
  'Paço Episcopal',
  'Cais de Gaia',
  'Barcos Rabelo',
  'Serra do Pilar',
  'Jardim do Morro',
  'Ponte D. Luís I',
  'Muralha Fernandina',
  'Ponte do Infante',
  'Ponte D. Maria Pia',
  'Ponte São João',
  'Ponte do Freixo',
  'Afurada',
]
const FALLBACK_SUNSET = [
  'Farol de São Miguel-o-Anjo',
  'Reserva Natural do Estuário',
  'Passeio Alegre',
  'Fortaleza de São João da Foz',
  'Farol de Felgueiras',
  'Foz do Douro',
]

const dist = (a: [number, number], b: [number, number]) => Math.hypot(b[0] - a[0], b[1] - a[1])

/** y on the traced river for any x. */
function riverY(x: number): number {
  if (x <= RIVER[0][0]) return RIVER[0][1]
  if (x >= RIVER[RIVER.length - 1][0]) return RIVER[RIVER.length - 1][1]
  for (let i = 0; i < RIVER.length - 1; i++) {
    const [x0, y0] = RIVER[i]
    const [x1, y1] = RIVER[i + 1]
    if (x >= x0 && x <= x1) return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0)
  }
  return RIVER[0][1]
}

/** Points from the marina outwards, in the given direction. */
function branch(direction: 'east' | 'west'): Array<[number, number]> {
  const start: [number, number] = [MARINA_X, riverY(MARINA_X)]
  const rest = RIVER.filter(([x]) => (direction === 'east' ? x > MARINA_X : x < MARINA_X))
  const ordered = direction === 'east' ? rest : [...rest].reverse()
  return [start, ...ordered]
}

/** Smooth polyline through points (Catmull-Rom → cubic bezier). */
function smoothPath(pts: Array<[number, number]>): string {
  if (pts.length < 2) return ''
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`
  }
  return d
}

/** Cumulative straight-line length up to the point nearest x. */
function lengthTo(pts: Array<[number, number]>, x: number): number {
  let total = 0
  for (let i = 0; i < pts.length - 1; i++) {
    const seg = dist(pts[i], pts[i + 1])
    const [x0] = pts[i]
    const [x1] = pts[i + 1]
    const between = (x >= Math.min(x0, x1) && x <= Math.max(x0, x1)) || i === pts.length - 2
    if (between) {
      const t = x1 === x0 ? 1 : Math.min(1, Math.max(0, (x - x0) / (x1 - x0)))
      return total + seg * t
    }
    total += seg
  }
  return total
}

const pathLength = (pts: Array<[number, number]>) =>
  pts.slice(1).reduce((sum, p, i) => sum + dist(pts[i], p), 0)

export function RouteMap({
  labels,
  dayStops,
  sunsetStops,
  lockedRoute,
  compact,
}: {
  labels?: { day: string; sunset: string }
  /** Itinerary names from the CMS, in visit order (already translated). */
  dayStops?: string[]
  sunsetStops?: string[]
  /** Fixes the map to one route and hides the Day/Sunset toggle — for use on
      a page that's already about one specific experience. */
  lockedRoute?: 'day' | 'sunset'
  /** Smaller companion map (e.g. beside the itinerary) — drops the stop
      chips and caption, which the itinerary text already covers. */
  compact?: boolean
}) {
  const [route, setRoute] = useState<'day' | 'sunset'>(lockedRoute || 'day')
  const [active, setActive] = useState(0)
  const [started, setStarted] = useState(false)
  const [showAllChips, setShowAllChips] = useState(false)
  const playing = useRef(true)
  const wrapRef = useRef<HTMLDivElement>(null)

  const east = useMemo(() => branch('east'), [])
  const west = useMemo(() => branch('west'), [])
  const eastLen = useMemo(() => pathLength(east), [east])
  const westLen = useMemo(() => pathLength(west), [west])

  // Names come from the CMS itinerary; positions are fixed to the artwork.
  const visits: Stop[] = useMemo(() => {
    const names = (route === 'sunset' ? sunsetStops : dayStops) || []
    const xs = route === 'sunset' ? [...DAY_X, ...SUNSET_X] : DAY_X
    const fallback = route === 'sunset' ? [...FALLBACK_DAY, ...FALLBACK_SUNSET] : FALLBACK_DAY
    return xs.map((x, i) => ({ x, name: names[i] || fallback[i] || '' }))
  }, [route, dayStops, sunsetStops])

  // Reset when switching route
  useEffect(() => {
    setActive(0)
    setShowAllChips(false)
    playing.current = true
  }, [route])

  // The chip list gets unwieldy past ~29 stops — show start, a short middle
  // preview and the end by default, with a button to expand the rest. The
  // map itself (dots + trail) always draws every stop; only this list below
  // it is trimmed.
  const CHIP_PREVIEW_EDGE = 3
  const CHIP_THRESHOLD = 8
  const visibleChipIndices = useMemo(() => {
    if (showAllChips || visits.length <= CHIP_THRESHOLD) return visits.map((_, i) => i)
    const head = Array.from({ length: CHIP_PREVIEW_EDGE }, (_, i) => i)
    const tail = Array.from({ length: CHIP_PREVIEW_EDGE }, (_, i) => visits.length - CHIP_PREVIEW_EDGE + i)
    return [...head, ...tail]
  }, [visits, showAllChips])
  const hiddenChipCount = visits.length - visibleChipIndices.length

  // Start once the map is roughly in view. A scroll check rather than an
  // IntersectionObserver, so it also works when frames aren't being composited.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    let done = false
    const check = () => {
      if (done) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (r.top < vh * 0.8 && r.bottom > vh * 0.15) {
        done = true
        setStarted(true)
        window.removeEventListener('scroll', check)
        window.removeEventListener('resize', check)
      }
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  useEffect(() => {
    if (!started) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(visits.length - 1)
      return
    }
    const t = setInterval(() => {
      if (!playing.current) return
      setActive((a) => {
        if (a >= visits.length - 1) {
          clearInterval(t)
          return a
        }
        return a + 1
      })
    }, 900)
    return () => clearInterval(t)
  }, [started, visits.length])

  // Several stops share a spot on the river (Ribeira, Clérigos, the Sé and the
  // Paço are all the same stretch). Merge them into one dot so the map stays
  // legible — the chips below still list every stop.
  const anchors = useMemo(() => {
    const sorted = visits.map((s, i) => ({ x: s.x, i })).sort((a, b) => a.x - b.x)
    const out: Array<{ x: number; stops: number[] }> = []
    for (const { x, i } of sorted) {
      const last = out[out.length - 1]
      // 24 artwork units ≈ 14px on screen — close enough to be the same place,
      // but far enough apart that the landmark bridges keep their own marker.
      if (last && x - last.x < 24) last.stops.push(i)
      else out.push({ x, stops: [i] })
    }
    return out
  }, [visits])

  const select = (i: number) => {
    playing.current = false
    setActive(i)
  }

  // How far east and west the boat has been so far
  const reached = visits.slice(0, active + 1)
  const maxX = Math.max(...reached.map((s) => s.x))
  const minX = Math.min(...reached.map((s) => s.x))
  const eastShown = maxX > MARINA_X ? lengthTo(east, maxX) : 0
  const westShown = minX < MARINA_X ? lengthTo(west, minX) : 0

  const current = visits[active]

  return (
    <div className={`routemap${compact ? ' routemap--compact' : ''}`} ref={wrapRef}>
      {!lockedRoute && (
        <div className="routemap__toggle" role="tablist" aria-label="Route">
          <button
            role="tab"
            aria-selected={route === 'day'}
            className={route === 'day' ? 'is-active' : ''}
            onClick={() => setRoute('day')}
          >
            {labels?.day || 'Day Cruise'}
          </button>
          <button
            role="tab"
            aria-selected={route === 'sunset'}
            className={route === 'sunset' ? 'is-active' : ''}
            onClick={() => setRoute('sunset')}
          >
            {labels?.sunset || 'Sunset Cruise'}
          </button>
        </div>
      )}

      <div className="routemap__canvas">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/route-map.png" alt="" className="routemap__base" />
        <svg viewBox="0 0 2048 1152" className="routemap__overlay" aria-hidden="true">
          <path
            d={smoothPath(east)}
            className="routemap__trail"
            style={{ strokeDasharray: eastLen, strokeDashoffset: eastLen - eastShown }}
          />
          <path
            d={smoothPath(west)}
            className="routemap__trail"
            style={{ strokeDasharray: westLen, strokeDashoffset: westLen - westShown }}
          />

          {anchors.map((a, ai) => {
            const reachedThis = a.stops.some((i) => i <= active)
            const isActive = a.stops.includes(active)
            const label = a.stops.map((i) => visits[i].name).join(' · ')
            const y = riverY(a.x)

            // Only the two named western stops get a label. The river drops as
            // it runs east, so fixed heights (not river-relative) keep them apart.
            const west = LABELLED_X.includes(a.x)
            const labelIndex = LABELLED_X.indexOf(a.x)
            const labelY = 690 + labelIndex * 58

            return (
              <g
                key={a.x}
                className={`routemap__stop ${reachedThis ? 'is-reached' : ''} ${isActive ? 'is-active' : ''}`}
                onClick={() => select(Math.min(...a.stops))}
                role="button"
                tabIndex={0}
                aria-label={label}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && select(Math.min(...a.stops))}
              >
                <circle cx={a.x} cy={y} r={30} className="routemap__hit" />
                <circle cx={a.x} cy={y} r={11} className="routemap__dot" />
                {west && (
                  <>
                    <line
                      x1={a.x}
                      y1={y + 14}
                      x2={a.x}
                      y2={labelY - 14}
                      className="routemap__leader"
                    />
                    <text x={a.x + 16} y={labelY} className="routemap__name" style={{ textAnchor: 'start' }}>
                      {a.stops.map((i) => visits[i].name).join(' · ')}
                    </text>
                  </>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {!compact && (
        <>
          <div className="routemap__chips" role="tablist" aria-label="Route stops">
            {visibleChipIndices.map((i, pos) => {
              const s = visits[i]
              const prev = visibleChipIndices[pos - 1]
              const hasGapBefore = prev !== undefined && i - prev > 1
              return (
                <React.Fragment key={`${s.name}-${s.x}`}>
                  {hasGapBefore && (
                    <button
                      type="button"
                      className="routemap__chip routemap__chip--more"
                      onClick={() => setShowAllChips(true)}
                    >
                      +{hiddenChipCount}
                    </button>
                  )}
                  <button
                    role="tab"
                    aria-selected={i === active}
                    className={`routemap__chip ${i <= active ? 'is-reached' : ''} ${i === active ? 'is-active' : ''}`}
                    onClick={() => select(i)}
                  >
                    <span className="routemap__chip-num">{i + 1}</span>
                    <span className="routemap__chip-label">{s.name}</span>
                  </button>
                </React.Fragment>
              )
            })}
          </div>

          <p className="routemap__caption" aria-live="polite">
            <strong>{current.name}</strong>
          </p>
        </>
      )}
    </div>
  )
}
