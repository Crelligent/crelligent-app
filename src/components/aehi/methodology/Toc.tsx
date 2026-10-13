'use client'

import { useEffect, useState } from 'react'

export type TocItem = { id: string; n: string; label: string }

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0])
  const key = ids.join(',')
  useEffect(() => {
    const ids = key.split(',')
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!els.length || typeof IntersectionObserver === 'undefined') return
    const visible = new Map<string, boolean>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting))
        const first = ids.find((id) => visible.get(id))
        if (first) setActive(first)
      },
      { rootMargin: '-96px 0px -55% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
  return active
}

function TocList({ items, active }: { items: TocItem[]; active?: string }) {
  return (
    <ol className="space-y-0.5">
      {items.map((it) => {
        const on = it.id === active
        return (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={on ? 'true' : undefined}
              className={`flex min-h-[40px] items-center gap-3 border-l-2 py-1.5 pl-3 text-sm transition-colors duration-150 ${
                on ? 'border-aehi-accent text-aehi-text' : 'border-transparent text-aehi-text-muted hover:text-aehi-text'
              }`}
            >
              <span className="t-data text-xs text-aehi-text-subtle">{it.n}</span>
              {it.label}
            </a>
          </li>
        )
      })}
    </ol>
  )
}

/** Desktop sticky table of contents with the current section highlighted. */
export function TocDesktop({ items }: { items: TocItem[] }) {
  const active = useActiveSection(items.map((i) => i.id))
  return (
    <nav aria-label="Methodology sections" className="sticky top-24">
      <p className="t-label mb-3 text-aehi-text-subtle">In this section</p>
      <TocList items={items} active={active} />
    </nav>
  )
}

/** Mobile: closed <details> under the intro. */
export function TocMobile({ items }: { items: TocItem[] }) {
  return (
    <details className="group rounded-md border border-aehi-line-strong">
      <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between px-4 text-[15px] font-medium text-aehi-text [&::-webkit-details-marker]:hidden">
        On this page
        <span aria-hidden="true" className="text-aehi-text-muted transition-transform duration-150 group-open:rotate-180">
          ▾
        </span>
      </summary>
      <nav aria-label="Methodology sections" className="border-t border-aehi-line px-2 py-2">
        <TocList items={items} />
      </nav>
    </details>
  )
}
