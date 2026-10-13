import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/** Secondary or primary button that navigates within the site. */
export function ButtonLink({
  href,
  children,
  variant = 'secondary',
  fullWidthOnMobile = false,
  className = '',
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  fullWidthOnMobile?: boolean
  className?: string
}) {
  const cls = ['btn', variant === 'primary' ? 'btn-primary' : 'btn-secondary', fullWidthOnMobile ? 'w-full sm:w-auto' : '', className].join(' ')
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}

/** Tertiary text link with a trailing arrow (DESIGN.md 2.5). */
export function TextLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  const external = /^https?:|^mailto:/.test(href)
  const inner = (
    <>
      <span>{children}</span>
      <ArrowRight className="arrow h-4 w-4 flex-none" aria-hidden="true" />
    </>
  )
  return external ? (
    <a href={href} className={`link-tertiary ${className}`}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={`link-tertiary ${className}`}>
      {inner}
    </Link>
  )
}
