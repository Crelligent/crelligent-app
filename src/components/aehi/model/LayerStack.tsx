'use client'

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AlertTriangle, ArrowUp } from 'lucide-react'
import { LAYERS, LAYER_BY_CODE, type Layer, type LayerCode } from '@/data/aehi/edition'
import { LayerPanelContent, type ExplorerMode } from './LayerPanel'

/**
 * The Layer Stack explorer (DESIGN.md 3). Five slabs, L5 on top, L1 at the foundation.
 * Slab thickness = 24 + 32 × weight px, so L2 is visibly the heaviest.
 * Explore mode shows one layer; Trace mode shows a weakness travelling upward.
 */

type SlabState = 'rest' | 'selected' | 'weak' | 'affected' | 'unaffected'

const FACE = 6 // top-face strip above each slab
const GAP = 8
const slabHeight = (l: Layer) => Math.round((24 + 32 * l.weight) / 4) * 4 // 56, 68, 56, 56, 44
const TOP_DOWN: readonly Layer[] = [...LAYERS].reverse() // DOM + visual order: L5 → L1

// Fixed geometry, so the spine can be drawn on the server with no measuring.
const CENTRES: Record<LayerCode, number> = (() => {
  const out = {} as Record<LayerCode, number>
  let y = 0
  for (const l of TOP_DOWN) {
    const h = slabHeight(l)
    out[l.code] = y + FACE + h / 2
    y += FACE + h + GAP
  }
  return out
})()
const STACK_HEIGHT = TOP_DOWN.reduce((sum, l) => sum + FACE + slabHeight(l), 0) + GAP * (TOP_DOWN.length - 1)

function stateOf(layer: Layer, mode: ExplorerMode, sel: Layer): SlabState {
  if (mode === 'explore') return layer.code === sel.code ? 'selected' : 'rest'
  if (layer.n === sel.n) return 'weak'
  return layer.n > sel.n ? 'affected' : 'unaffected'
}

const SLAB_CLASSES: Record<SlabState, string> = {
  rest: 'bg-aehi-surface-2 border border-aehi-line motion-safe:hover:-translate-y-0.5 hover:border-aehi-line-strong hover:[background-image:linear-gradient(rgba(255,255,255,0.04),rgba(255,255,255,0.04))]',
  selected: 'bg-aehi-accent-tint border-[1.5px] border-aehi-accent',
  weak: 'bg-aehi-danger-tint border-[1.5px] border-aehi-danger',
  affected: 'bg-aehi-warn-tint border border-aehi-warn/60',
  unaffected: 'bg-aehi-bg-deep border border-dashed border-aehi-line-strong',
}
const CODE_CLASSES: Record<SlabState, string> = {
  rest: 'text-aehi-text-muted',
  selected: 'text-aehi-accent',
  weak: 'text-aehi-danger',
  affected: 'text-aehi-warn',
  unaffected: 'text-aehi-text-subtle',
}
const NODE_CLASSES: Record<SlabState, string> = {
  rest: 'fill-aehi-bg-deep stroke-aehi-line-strong',
  selected: 'fill-aehi-accent stroke-aehi-accent',
  weak: 'fill-aehi-danger stroke-aehi-danger',
  affected: 'fill-aehi-warn stroke-aehi-warn',
  unaffected: 'fill-aehi-bg-deep stroke-aehi-line-strong',
}
const STATE_WORD: Partial<Record<SlabState, string>> = { weak: 'weak', affected: 'affected', unaffected: 'not affected' }

export function LayerStack({ stacked = false, footer }: { stacked?: boolean; footer?: React.ReactNode }) {
  const uid = useId()
  const captionId = `${uid}-caption`
  const reduce = useReducedMotion()
  const [mode, setMode] = useState<ExplorerMode>('explore')
  const [selected, setSelected] = useState<LayerCode>('L2')
  const [interacted, setInteracted] = useState(false)
  const [modeMessage, setModeMessage] = useState('')
  const slabRefs = useRef<Partial<Record<LayerCode, HTMLButtonElement | null>>>({})
  const modeRefs = useRef<Record<ExplorerMode, HTMLButtonElement | null>>({ explore: null, trace: null })

  const sel = LAYER_BY_CODE[selected]

  const choose = (code: LayerCode, focus = false) => {
    setInteracted(true)
    setSelected(code)
    if (focus) slabRefs.current[code]?.focus()
  }

  const changeMode = (m: ExplorerMode, focus = false) => {
    if (focus) modeRefs.current[m]?.focus()
    if (m === mode) return
    setInteracted(true)
    setMode(m)
    setModeMessage(m === 'trace' ? 'Trace a weakness view. Choose a layer to see what it affects.' : 'Explore view.')
  }

  const onSlabKey = (e: KeyboardEvent<HTMLButtonElement>, layer: Layer) => {
    let target: number | null = null
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') target = Math.min(5, layer.n + 1)
    else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') target = Math.max(1, layer.n - 1)
    else if (e.key === 'Home') target = 1
    else if (e.key === 'End') target = 5
    if (target === null) return
    e.preventDefault()
    choose(LAYERS[target - 1].code, true)
  }

  const onModeKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault()
      changeMode(mode === 'explore' ? 'trace' : 'explore', true)
    }
  }

  const affectedDelay = (l: Layer) => 0.12 + (l.n - sel.n) * 0.08
  const traceKey = `${mode}-${selected}`
  const showPath = mode === 'trace' && sel.n < 5
  const xs = 12

  return (
    <div>
      {/* Mode switch */}
      <div
        role="radiogroup"
        aria-label="Explorer view"
        className="grid h-11 w-full grid-cols-2 rounded-md border border-aehi-line-strong p-px sm:inline-grid sm:w-auto"
      >
        {(
          [
            ['explore', 'Explore the layers'],
            ['trace', 'Trace a weakness'],
          ] as const
        ).map(([m, label]) => {
          const on = mode === m
          return (
            <button
              key={m}
              ref={(el) => {
                modeRefs.current[m] = el
              }}
              type="button"
              role="radio"
              aria-checked={on}
              tabIndex={on ? 0 : -1}
              onClick={() => changeMode(m)}
              onKeyDown={onModeKey}
              className={`rounded-[5px] px-4 text-[15px] font-medium transition-colors duration-150 ${
                on ? 'bg-aehi-surface-2 text-aehi-text' : 'text-aehi-text-muted hover:text-aehi-text'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {modeMessage}
      </p>

      <p className="t-small mt-4 text-aehi-text-subtle lg:hidden">Tap a layer to see what it covers.</p>
      <p className="t-small mt-4 hidden text-aehi-text-subtle lg:block">Choose a layer, or use the arrow keys.</p>

      <div className={`mt-4 grid grid-cols-1 gap-6 ${stacked ? '' : 'lg:grid-cols-12'}`}>
        <div className={stacked ? '' : 'lg:col-span-7'}>
          <div className="relative pr-8">
            <div
              role="radiogroup"
              aria-label="ESRE OS layers"
              aria-describedby={captionId}
              className="flex flex-col"
              style={{ gap: GAP }}
            >
              {TOP_DOWN.map((layer) => {
                const state = stateOf(layer, mode, sel)
                const delay = state === 'affected' ? affectedDelay(layer) : 0
                const label = [
                  layer.code,
                  layer.spokenName,
                  `weight ${layer.weight.toFixed(1)}`,
                  layer.code === 'L2' ? 'highest weight' : null,
                  mode === 'trace' ? STATE_WORD[state] : null,
                ]
                  .filter(Boolean)
                  .join(', ')
                return (
                  <div key={layer.code}>
                    <div
                      aria-hidden="true"
                      className="bg-aehi-line"
                      style={{ height: FACE, clipPath: `polygon(${FACE}px 0, 100% 0, calc(100% - ${FACE}px) ${FACE}px, 0 ${FACE}px)` }}
                    />
                    <button
                      ref={(el) => {
                        slabRefs.current[layer.code] = el
                      }}
                      type="button"
                      role="radio"
                      aria-checked={layer.code === selected}
                      aria-label={label}
                      tabIndex={layer.code === selected ? 0 : -1}
                      onClick={() => layer.code !== selected && choose(layer.code)}
                      onKeyDown={(e) => onSlabKey(e, layer)}
                      className={`relative flex w-full items-center gap-3 overflow-hidden rounded-[3px] px-4 text-left transition-[background-color,border-color,transform] duration-200 ease-out ${SLAB_CLASSES[state]}`}
                      style={{ height: slabHeight(layer), transitionDelay: `${delay}s` }}
                    >
                      {layer.code === 'L2' && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-aehi-accent" />}
                      <span className="flex min-w-0 flex-1 items-center gap-3">
                        <span
                          className={`t-data w-6 flex-none text-sm transition-colors duration-200 ${CODE_CLASSES[state]}`}
                          style={{ transitionDelay: `${delay}s` }}
                        >
                          {layer.code}
                        </span>
                        <span className="flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3">
                          <span
                            className={`text-base font-medium leading-5 ${state === 'unaffected' ? 'text-aehi-text-subtle' : 'text-aehi-text'}`}
                          >
                            {layer.name}
                          </span>
                          {layer.code === 'L2' && (
                            <span className="chip chip-weight !min-h-[20px] !py-0 !text-[11px]">Highest weight</span>
                          )}
                        </span>
                      </span>
                      <span className="flex flex-none items-center gap-2">
                        {state === 'weak' && (
                          <span className="chip chip-weak fade-in-delayed">
                            <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                            Weak
                          </span>
                        )}
                        {state === 'affected' && (
                          <span className="chip chip-affected fade-in-delayed" style={{ animationDelay: `${delay}s` }}>
                            <ArrowUp className="h-3 w-3" aria-hidden="true" />
                            Affected
                          </span>
                        )}
                        <span
                          className={`t-data text-sm text-aehi-text-subtle ${
                            state === 'weak' || state === 'affected' ? 'hidden min-[400px]:inline' : ''
                          }`}
                        >
                          {layer.weightLabel}
                        </span>
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Spine */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 w-6 overflow-visible"
              width={24}
              height={STACK_HEIGHT}
              viewBox={`0 0 24 ${STACK_HEIGHT}`}
            >
              <line x1={xs} x2={xs} y1={CENTRES.L5} y2={CENTRES.L1} className="stroke-aehi-line" strokeWidth={1} />
              {showPath && (
                <>
                  <motion.path
                    key={traceKey}
                    d={`M${xs} ${CENTRES[sel.code]} L${xs} ${CENTRES.L5}`}
                    className="stroke-aehi-warn"
                    strokeWidth={2}
                    fill="none"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 0.12, ease: [0.2, 0, 0, 1] }}
                  />
                  {LAYERS.filter((l) => l.n > sel.n).map((l) => {
                    const below = LAYERS[l.n - 2]
                    const y = (CENTRES[l.code] + CENTRES[below.code]) / 2
                    return (
                      <path
                        key={`${traceKey}-chev-${l.code}`}
                        d={`M${xs - 4} ${y + 2} L${xs} ${y - 2} L${xs + 4} ${y + 2}`}
                        className="fade-in-delayed stroke-aehi-warn"
                        strokeWidth={1.5}
                        fill="none"
                        style={{ animationDelay: `${affectedDelay(l)}s` }}
                      />
                    )
                  })}
                </>
              )}
              {TOP_DOWN.map((l) => {
                const state = stateOf(l, mode, sel)
                return (
                  <circle
                    key={l.code}
                    cx={xs}
                    cy={CENTRES[l.code]}
                    r={3}
                    strokeWidth={1}
                    className={`transition-[fill,stroke] duration-200 ${NODE_CLASSES[state]}`}
                    style={{ transitionDelay: `${state === 'affected' ? affectedDelay(l) : 0}s` }}
                  />
                )
              })}
            </svg>
          </div>
          <p id={captionId} className="t-small mt-4 max-w-prose text-aehi-text-subtle">
            Illustration of the ESRE OS model: slab thickness shows each layer&apos;s weight in the score. It shows how the method
            reasons, not results from the index.
          </p>
          {footer}
        </div>

        <div className={stacked ? '' : 'self-start lg:sticky lg:top-24 lg:col-span-5'}>
          <div className="panel" aria-live="polite" aria-atomic="true">
            <motion.div
              key={`${mode}-${selected}`}
              initial={interacted ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <LayerPanelContent layer={sel} mode={mode} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
