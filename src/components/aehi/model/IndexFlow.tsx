'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { DIAGNOSTIC_MINUTES, MIN_GROUP_SIZE } from '@/data/aehi/edition'

/**
 * "How the index works" (DESIGN.md 4): diagnostic → private score → [identity removed] →
 * anonymised aggregate → quarterly edition. One <ol>; the privacy boundary sits inside
 * step 03's <li> so numbering stays intact.
 */

const STEPS = [
  {
    n: '01',
    label: 'You',
    title: 'Take the diagnostic',
    // OWNER CONFIRM: 10 minutes
    body: `A senior leader answers questions about how the enterprise runs, across the five OS layers. It takes about ${DIAGNOSTIC_MINUTES} minutes and is free.`,
    glyph: 'questionnaire',
  },
  {
    n: '02',
    label: 'Private',
    title: 'Get your own score',
    body: 'You see your ESRE OS Performance Score and your five layer scores straight away. Only you and Crelligent see them.',
    glyph: 'stack',
  },
  {
    n: '03',
    label: 'Anonymised',
    title: 'Joined with others',
    body: `Names and identifying details are removed. Results are only combined in groups of at least ${MIN_GROUP_SIZE} enterprises; smaller groups are merged into a broader one so no company can be picked out.`,
    glyph: 'converge',
  },
  {
    n: '04',
    label: 'Published',
    title: 'The quarterly edition',
    body: 'Each quarter, Crelligent publishes the aggregate results with the sample size, method and limitations stated. The inaugural edition covers Q4 2026.',
    glyph: 'document',
  },
] as const

function Glyph({ kind }: { kind: (typeof STEPS)[number]['glyph'] }) {
  const common = { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none', strokeWidth: 1.5, 'aria-hidden': true as const }
  switch (kind) {
    case 'questionnaire':
      return (
        <svg {...common} className="text-aehi-text-muted" stroke="currentColor" strokeLinecap="round">
          {[32, 26, 20, 14, 8].map((y, i) => (
            <g key={y}>
              <rect x={7} y={y - 2} width={4} height={4} rx={1} className={i === 0 ? 'stroke-aehi-accent' : ''} />
              <line x1={15} x2={i % 2 ? 27 : 33} y1={y} y2={y} className={i === 0 ? 'stroke-aehi-accent' : ''} />
            </g>
          ))}
        </svg>
      )
    case 'stack':
      return (
        <svg {...common} className="text-aehi-text-muted" stroke="currentColor">
          {[
            [8, 4],
            [14, 4.5],
            [20.5, 4],
            [26.5, 5.5],
            [34, 4],
          ].map(([y, h], i) => (
            <rect
              key={y}
              x={6}
              y={y - h / 2}
              width={28}
              height={h}
              rx={0.5}
              className={i === 3 ? 'fill-aehi-accent stroke-aehi-accent' : ''}
            />
          ))}
        </svg>
      )
    case 'converge':
      return (
        <svg {...common} className="text-aehi-text-muted" stroke="currentColor" strokeLinecap="round">
          {[8, 14, 20, 26, 32].map((y) => (
            <g key={y}>
              <circle cx={6} cy={y} r={2} />
              <line x1={9} y1={y} x2={26} y2={20} strokeWidth={1} />
            </g>
          ))}
          <rect x={28} y={11} width={6} height={18} rx={1} className="fill-aehi-accent stroke-aehi-accent" />
        </svg>
      )
    case 'document':
      return (
        <svg {...common} className="text-aehi-text-muted" stroke="currentColor" strokeLinejoin="round">
          <path d="M9 4 H25 L32 11 V36 H9 Z" />
          <path d="M25 4 V11 H32" />
          <text x={12.5} y={28} className="fill-aehi-accent" stroke="none" fontSize={10} fontFamily="var(--font-mono), monospace" fontWeight={500}>
            Q4
          </text>
        </svg>
      )
  }
}

export function IndexFlow({ compact = false, tone = 'bg' }: { compact?: boolean; tone?: 'bg' | 'deep' }) {
  const olRef = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const [path, setPath] = useState<{ x0: number; y0: number; x1: number; y1: number; f: number } | null>(null)
  const glyphBg = tone === 'deep' ? 'bg-aehi-bg-deep' : 'bg-aehi-bg'

  useEffect(() => {
    if (reduce) return
    const ol = olRef.current
    if (!ol || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        const glyphs = Array.from(ol.querySelectorAll<HTMLElement>('[data-glyph]'))
        const boundary = Array.from(ol.querySelectorAll<HTMLElement>('[data-boundary-line]')).find((el) => el.offsetParent !== null)
        if (glyphs.length !== 4 || glyphs.some((g) => g.offsetParent === null) || !boundary) return
        const base = ol.getBoundingClientRect()
        const centre = (el: HTMLElement) => {
          const r = el.getBoundingClientRect()
          return { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2 }
        }
        const a = centre(glyphs[0])
        const b = centre(glyphs[3])
        const c = centre(boundary)
        const horizontal = Math.abs(b.x - a.x) > Math.abs(b.y - a.y)
        const f = horizontal ? (c.x - a.x) / (b.x - a.x) : (c.y - a.y) / (b.y - a.y)
        setPath({ x0: a.x, y0: a.y, x1: b.x, y1: b.y, f: Math.min(0.95, Math.max(0.05, f)) })
      },
      { threshold: 0.4 },
    )
    io.observe(ol)
    return () => io.disconnect()
  }, [reduce])

  return (
    <div>
      <ol ref={olRef} className="relative grid grid-cols-1 lg:grid-cols-4 lg:gap-6 lg:pt-12">
        {STEPS.map((step, i) => {
          const last = i === STEPS.length - 1
          return (
            <li key={step.n} className={`relative ${last ? '' : 'pb-8 lg:pb-0'}`}>
              {/* Mobile vertical connector segment */}
              {!compact && (
                <span
                  aria-hidden="true"
                  className={`absolute left-5 w-px bg-aehi-line-strong lg:hidden ${i === 0 ? 'top-5' : 'top-0'} ${last ? 'h-5' : 'bottom-0'}`}
                />
              )}

              {i === 2 && (
                <div className="relative mb-8 flex justify-center lg:absolute lg:-bottom-4 lg:-left-3 lg:-top-4 lg:mb-0 lg:block lg:w-px">
                  <span aria-hidden="true" data-boundary-line className="dash-h absolute inset-x-0 top-1/2 lg:hidden" />
                  <span aria-hidden="true" data-boundary-line className="dash-v absolute inset-y-0 left-0 hidden lg:block" />
                  <span
                    className={`t-label relative inline-flex items-center gap-1.5 px-2 py-1 text-aehi-accent ${glyphBg} lg:absolute lg:bottom-full lg:left-0 lg:mb-2 lg:-translate-x-1/2 lg:whitespace-nowrap lg:px-0`}
                  >
                    <ShieldCheck className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
                    Company identity removed here
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4 lg:block">
                <div className={`relative flex-none items-center lg:flex ${compact ? 'hidden' : 'flex'}`}>
                  <span data-glyph className={`relative z-[1] inline-flex h-10 w-10 ${glyphBg}`}>
                    <Glyph kind={step.glyph} />
                  </span>
                  {!last && (
                    <span aria-hidden="true" className="relative ml-3 hidden h-px flex-1 bg-aehi-line-strong lg:-mr-6 lg:block">
                      <svg
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        className="absolute -right-0 -top-[4.5px] stroke-aehi-line-strong"
                        fill="none"
                        strokeWidth={1}
                      >
                        <path d="M1 1 L5 5 L1 9" />
                      </svg>
                    </span>
                  )}
                </div>
                <div className="min-w-0 lg:mt-5">
                  <p className="t-label text-aehi-text-subtle">
                    <span className="t-data">{step.n}</span> · {step.label}
                  </p>
                  <h3 className="t-h3 mt-2">{step.title}</h3>
                  <p className="t-body mt-2">{step.body}</p>
                </div>
              </div>
            </li>
          )
        })}

        {path && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-[2] block h-1.5 w-1.5 rounded-full border border-aehi-accent"
            initial={{ x: path.x0 - 3, y: path.y0 - 3, opacity: 1 }}
            animate={{ x: path.x1 - 3, y: path.y1 - 3 }}
            transition={{ duration: 1.6, ease: 'linear' }}
          >
            <motion.span
              className="block h-full w-full rounded-full bg-aehi-accent"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1.6, times: [0, path.f, path.f + 0.02, 1], ease: 'linear' }}
            />
          </motion.span>
        )}
      </ol>

      <p className="t-small mt-10 max-w-prose text-aehi-text-muted">
        Your individual answers and score are never published or shared with other participants. See the{' '}
        <Link href="/aehi/methodology#anonymisation" className="link-inline">
          methodology
        </Link>{' '}
        for the full anonymisation rules.
      </p>
    </div>
  )
}
