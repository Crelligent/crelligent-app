import type { ReactNode } from 'react'
import type { Seg } from './content'
import { chipAccent, cx, eyebrow } from './ui'

export function Section({
  id,
  labelledBy,
  surface = false,
  className,
  children,
}: {
  id: string
  labelledBy?: string
  surface?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(
        'scroll-mt-24 px-4 sm:px-6 py-16 lg:py-24',
        surface ? 'bg-(--cr-surface) border-y border-(--cr-border)' : 'bg-(--cr-bg)',
        className,
      )}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx(eyebrow, className)}>{children}</p>
}

export function SectionHeader({
  id,
  eyebrow: eb,
  title,
  intro,
}: {
  id: string
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
}) {
  return (
    <header>
      {eb && <Eyebrow className="mb-3">{eb}</Eyebrow>}
      <h2 id={id} className="heading-lg text-(--cr-text)">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 max-w-2xl text-base lg:text-lg text-(--cr-text-muted) leading-relaxed">{intro}</p>
      )}
    </header>
  )
}

/** Footnote-style source link(s): <Cite n={[1, 15]} /> */
export function Cite({ n }: { n: number | number[] }) {
  const keys = Array.isArray(n) ? n : [n]
  return (
    <sup className="ml-0.5">
      {keys.map((k, i) => (
        <span key={k}>
          {i > 0 && <span className="font-mono text-[0.7em] text-(--cr-text-muted)">,</span>}
          <a
            href={`#src-${k}`}
            aria-label={`Source ${k}`}
            className="relative font-mono text-[0.7em] text-(--cr-accent-ink) no-underline hover:underline after:absolute after:-inset-2 after:content-['']"
          >
            {k}
          </a>
        </span>
      ))}
    </sup>
  )
}

/** Inline label for Crelligent's own AEHI figures. */
export function AehiTag({ className }: { className?: string }) {
  return (
    <a href="#src-aehi" className={cx(chipAccent, 'no-underline hover:underline align-middle', className)}>
      Crelligent AEHI data
    </a>
  )
}

/** Renders a rich-text segment array (plain text, citations, AEHI chip, L2 highlight). */
export function RichText({ segs }: { segs: Seg[] }) {
  return (
    <>
      {segs.map((s, i) => {
        if (typeof s === 'string') return <span key={i}>{s}</span>
        if ('cite' in s) return <Cite key={i} n={s.cite} />
        if ('aehi' in s) return <AehiTag key={i} />
        return (
          <strong key={i} className="text-(--cr-l2-ink) font-medium">
            {s.l2}
          </strong>
        )
      })}
    </>
  )
}

export function ChartFigure({
  takeaway,
  title,
  subtitle,
  caption,
  legend,
  onSurface = false,
  className,
  children,
}: {
  takeaway: ReactNode
  title: string
  subtitle?: string
  caption: ReactNode
  legend?: ReactNode
  onSurface?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <figure
      className={cx(
        'rounded-lg border border-(--cr-border) p-4 sm:p-5 lg:p-6 min-w-0',
        onSurface ? 'bg-(--cr-bg)' : 'bg-(--cr-surface)',
        className,
      )}
    >
      <p className="text-sm font-medium text-(--cr-text)">{takeaway}</p>
      <h3 className="mt-1 text-xs text-(--cr-text-muted) font-sans! font-normal! tracking-normal!">
        {title}
        {subtitle && <> · {subtitle}</>}
      </h3>
      <div className="mt-4">{children}</div>
      {legend}
      <figcaption className="mt-3 text-xs text-(--cr-text-muted)">{caption}</figcaption>
    </figure>
  )
}
