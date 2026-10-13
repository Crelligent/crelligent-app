'use client'

import { ArrowUpRight } from 'lucide-react'
import { EDITION } from '@/data/aehi/edition'
import { track } from './analytics'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'inline' | 'plain'

/**
 * Every link to the diagnostic (DESIGN.md 1.2): same tab, ArrowUpRight, hidden
 * " (opens crelligent.com)", and a diagnostic_click event with the section id.
 */
export function DiagnosticLink({
  location,
  variant = 'primary',
  size = 'md',
  fullWidthOnMobile = false,
  className = '',
  children = 'Take the free diagnostic',
}: {
  location: string
  variant?: Variant
  size?: 'md' | 'sm'
  fullWidthOnMobile?: boolean
  className?: string
  children?: React.ReactNode
}) {
  const onClick = () => track('diagnostic_click', { location })
  const hidden = <span className="sr-only"> (opens crelligent.com)</span>

  if (variant === 'inline' || variant === 'plain') {
    return (
      <a href={EDITION.diagnosticUrl} onClick={onClick} className={`${variant === 'inline' ? 'link-inline' : ''} ${className}`}>
        {children}
        {hidden}
      </a>
    )
  }
  if (variant === 'tertiary') {
    return (
      <a href={EDITION.diagnosticUrl} onClick={onClick} className={`link-tertiary ${className}`}>
        <span>{children}</span>
        {hidden}
        <ArrowUpRight className="arrow h-4 w-4 flex-none" aria-hidden="true" />
      </a>
    )
  }
  const cls = [
    'btn',
    variant === 'primary' ? 'btn-primary' : 'btn-secondary',
    size === 'sm' ? 'btn-sm' : '',
    fullWidthOnMobile ? 'w-full sm:w-auto' : '',
    className,
  ].join(' ')
  return (
    <a href={EDITION.diagnosticUrl} onClick={onClick} className={cls}>
      <span>{children}</span>
      {hidden}
      <ArrowUpRight className="h-4 w-4 flex-none" aria-hidden="true" />
    </a>
  )
}

