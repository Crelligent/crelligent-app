import { WHAT_HAPPENS_NEXT } from '../content'
import { cx } from '../ui'

function Steps() {
  return (
    <ol className="space-y-5">
      {WHAT_HAPPENS_NEXT.map((s, i) => (
        <li key={s.title} className="grid grid-cols-[1.75rem_1fr] gap-3">
          <span className="size-7 rounded-full border border-(--cr-accent) bg-(--cr-bg) grid place-items-center font-mono text-xs text-(--cr-accent-ink)">
            {i + 1}
          </span>
          <p className="text-sm text-(--cr-text-muted) leading-relaxed">
            <strong className="font-medium text-(--cr-text)">{s.title}</strong> {s.text}
          </p>
        </li>
      ))}
    </ol>
  )
}

const footer = 'No equity. No cohort. You own everything we build.'

/** Expanded panel (desktop sidebar, success screen). */
export function WhatHappensNext({ className, headingLevel = 2 }: { className?: string; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <div className={cx('rounded-lg border border-(--cr-border) bg-(--cr-surface) p-5 lg:p-6', className)}>
      <H className="font-outfit text-base font-medium! text-(--cr-text)">What happens next</H>
      <div className="mt-5">
        <Steps />
      </div>
      <p className="mt-5 text-xs text-(--cr-text-muted)">{footer}</p>
    </div>
  )
}

/** Collapsed variant for mobile. */
export function WhatHappensNextCollapsed({ className }: { className?: string }) {
  return (
    <details className={cx('group rounded-lg border border-(--cr-border) bg-(--cr-surface)', className)}>
      <summary className="flex min-h-11 items-center justify-between gap-3 px-4 py-3 cursor-pointer list-none text-sm font-medium text-(--cr-text)">
        What happens after you apply
        <svg aria-hidden viewBox="0 0 20 20" className="size-5 text-(--cr-text-muted) transition-transform group-open:rotate-180">
          <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="px-4 pb-4">
        <Steps />
        <p className="mt-4 text-xs text-(--cr-text-muted)">{footer}</p>
      </div>
    </details>
  )
}
