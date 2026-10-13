import { FlaskConical } from 'lucide-react'

export function Eyebrow({ children, as: Tag = 'p', className = '' }: { children: React.ReactNode; as?: 'p' | 'span' | 'div'; className?: string }) {
  return <Tag className={`eyebrow t-label ${className}`}>{children}</Tag>
}

type ChipVariant = 'neutral' | 'live' | 'hypothesis' | 'weight'

export function Chip({ children, variant = 'neutral', className = '' }: { children: React.ReactNode; variant?: ChipVariant; className?: string }) {
  const v = { neutral: '', live: 'chip-live', hypothesis: 'chip-hypothesis', weight: 'chip-weight' }[variant]
  return (
    <span className={`chip ${v} ${className}`}>
      {variant === 'hypothesis' && <FlaskConical className="h-3 w-3 flex-none" aria-hidden="true" />}
      {children}
    </span>
  )
}

/** Section band with alternating background (DESIGN.md 2.4). */
export function Band({
  children,
  tone = 'bg',
  id,
  className = '',
  labelledBy,
}: {
  children: React.ReactNode
  tone?: 'bg' | 'deep'
  id?: string
  className?: string
  labelledBy?: string
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`band ${tone === 'deep' ? 'bg-aehi-bg-deep' : 'bg-aehi-bg'} ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  )
}
