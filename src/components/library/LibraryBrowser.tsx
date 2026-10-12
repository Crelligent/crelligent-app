'use client'

import { useCallback, useRef, useState, type KeyboardEvent } from 'react'
import { LIBRARY_TYPES, library, type LibraryFilter } from '@/data/library'
import { cx } from '@/components/foundry/ui'
import { LibraryCard, LibraryLeadCard } from './LibraryCard'

/** Filter tabs (URL ?type= synced) + featured lead card + photo grid. */
export function LibraryBrowser({ initial }: { initial: LibraryFilter }) {
  const [active, setActive] = useState<LibraryFilter>(initial)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const select = useCallback((value: LibraryFilter, focus = false) => {
    setActive(value)
    const url = new URL(window.location.href)
    if (value === 'all') url.searchParams.delete('type')
    else url.searchParams.set('type', value)
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
    if (focus) tabRefs.current[LIBRARY_TYPES.findIndex((t) => t.value === value)]?.focus()
  }, [])

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = LIBRARY_TYPES.length - 1
    let next: number | null = null
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1
    else if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    select(LIBRARY_TYPES[next].value, true)
  }

  const items = active === 'all' ? library : library.filter((i) => i.type === active)
  const lead = items.find((i) => i.type === 'whitepaper' && i.foundryFeatured)
  const rest = items.filter((i) => i !== lead)
  const activeLabel = LIBRARY_TYPES.find((t) => t.value === active)?.label ?? 'All'

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter the library by type"
        className="flex flex-wrap gap-2 border-b border-(--cr-border) pb-4"
      >
        {LIBRARY_TYPES.map((t, i) => {
          const selected = t.value === active
          const count = t.value === 'all' ? library.length : library.filter((x) => x.type === t.value).length
          return (
            <button
              key={t.value}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              id={`library-tab-${t.value}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="library-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(t.value)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cx(
                'inline-flex min-h-11 items-center gap-2 rounded-md border px-4 text-sm transition-colors duration-150',
                selected
                  ? 'border-(--cr-accent)/50 bg-(--cr-accent-tint) text-(--cr-text)'
                  : 'border-(--cr-border) text-(--cr-text-muted) hover:border-(--cr-border-strong) hover:text-(--cr-text)',
              )}
            >
              {t.label}
              <span
                className={cx(
                  'font-mono text-xs tabular',
                  selected ? 'text-(--cr-accent-ink)' : 'text-(--cr-text-muted)',
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div
        id="library-panel"
        role="tabpanel"
        aria-labelledby={`library-tab-${active}`}
        tabIndex={0}
        className="mt-8 focus-visible:outline-offset-4"
      >
        <p className="sr-only" aria-live="polite">
          {`${activeLabel}: ${items.length} ${items.length === 1 ? 'item' : 'items'}`}
        </p>

        {items.length === 0 ? (
          <p className="rounded-lg border border-(--cr-border) bg-(--cr-surface) p-6 text-sm text-(--cr-text-muted)">
            Nothing here yet. New {activeLabel.toLowerCase()} will appear in this list when they are published.
          </p>
        ) : (
          <>
            {lead && <LibraryLeadCard item={lead} />}
            {rest.length > 0 && (
              <ul role="list" className={cx('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6', lead && 'mt-6')}>
                {rest.map((item) => (
                  <li key={item.slug} className="min-w-0">
                    <LibraryCard item={item} headingLevel={lead ? 'h3' : 'h2'} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  )
}
