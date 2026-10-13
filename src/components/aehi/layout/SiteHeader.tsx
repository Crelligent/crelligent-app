'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SECTION_IDS } from '@/data/aehi/site'
import { EDITION, DIAGNOSTIC_MINUTES } from '@/data/aehi/edition'
import { DiagnosticLink } from '@/components/aehi/ui/DiagnosticLink'
import { Chip } from '@/components/aehi/ui/Typography'

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }, [])

  // Close on route change.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close if the viewport grows to desktop while open.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Body scroll lock, focus first link, Esc and focus trap while open.
  useEffect(() => {
    if (!open) return
    // The section bar sits under the fixed site navigation and scrolls with the page; bring it into view.
    window.scrollTo({ top: 0 })
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close(true)
        return
      }
      if (e.key !== 'Tab' || !headerRef.current) return
      const focusables = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((el) => el.offsetParent !== null)
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  // Scrollspy: on /aehi, the current nav item is the section in view (Overview above the first section).
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    if (pathname !== '/aehi') return setActive(null)
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) return
    const update = () => {
      const line = window.innerHeight * 0.3
      let current: string | null = null
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pathname])

  const isCurrent = (href: string) => {
    if (pathname !== '/aehi') return false
    const hash = href.split('#')[1] ?? null
    return hash === active
  }
  const solid = scrolled || open

  return (
    <header
      ref={headerRef}
      className={`aehi-section-bar relative z-40 border-b transition-colors duration-150 ${
        open ? 'border-aehi-line bg-aehi-bg' : solid ? 'border-aehi-line bg-aehi-bg/[0.92] backdrop-blur-[8px]' : 'border-transparent bg-aehi-bg'
      }`}
    >
      <div className="container-x flex h-14 items-center justify-between gap-4 lg:h-16">
        <div className="flex min-w-0 items-center gap-5">
          <Link href="/aehi" aria-label="AEHI home" className="flex min-h-[44px] items-center gap-2.5 rounded-sm">
            <span className="font-aehi-head text-lg font-semibold tracking-tight text-aehi-text">AEHI</span>
            <span className="whitespace-nowrap text-[13px] text-aehi-text-subtle">by Crelligent</span>
          </Link>
        </div>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const current = isCurrent(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current ? 'page' : undefined}
                    className={`relative inline-flex min-h-[44px] items-center whitespace-nowrap text-sm font-medium transition-colors duration-150 ${
                      current ? 'text-aehi-text' : 'text-aehi-text-muted hover:text-aehi-text'
                    }`}
                  >
                    {link.label}
                    {current && <span aria-hidden="true" className="absolute inset-x-0 bottom-[6px] h-0.5 bg-aehi-accent" />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <DiagnosticLink location="header" size="sm" className="whitespace-nowrap">
            Take the diagnostic
          </DiagnosticLink>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 flex-none items-center justify-center rounded-md text-aehi-text lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => (open ? close(false) : setOpen(true))}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="site-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[calc(var(--aehi-nav-h)+3.5rem)] overflow-y-auto border-t border-aehi-line bg-aehi-bg lg:hidden"
      >
        <div className="container-x pb-10 pt-2">
          <nav aria-label="Main">
            <ul>
              {NAV_LINKS.map((link, i) => {
                const current = isCurrent(link.href)
                return (
                  <li key={link.href} className="border-b border-aehi-line">
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      aria-current={current ? 'page' : undefined}
                      onClick={(e) => {
                        // The open menu locks page scroll; close it first, then scroll to the section.
                        const hash = link.href.split('#')[1]
                        if (pathname !== '/aehi') return setOpen(false)
                        e.preventDefault()
                        setOpen(false)
                        requestAnimationFrame(() => {
                          if (hash) document.getElementById(hash)?.scrollIntoView({ block: 'start' })
                          else window.scrollTo({ top: 0 })
                          history.replaceState(null, '', link.href)
                        })
                      }}
                      className={`flex h-14 items-center justify-between font-aehi-head text-[22px] font-medium ${
                        current ? 'text-aehi-text' : 'text-aehi-text-muted'
                      }`}
                    >
                      {link.label}
                      {current && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-aehi-accent" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="mt-8 space-y-5">
            <Chip>{EDITION.chip}</Chip>
            <DiagnosticLink location="mobile-menu" className="w-full">
              Take the free diagnostic
            </DiagnosticLink>
            <p className="t-small text-aehi-text-subtle">About {DIAGNOSTIC_MINUTES} minutes. Free.</p>
          </div>
        </div>
      </div>
    </header>
  )
}
