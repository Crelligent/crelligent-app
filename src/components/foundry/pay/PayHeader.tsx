import Image from 'next/image'
import Link from 'next/link'

/** Slim brand header for invoice pages (no site navigation). */
export function PayHeader() {
  return (
    <header className="px-4 py-5 border-b border-(--cr-border) print:border-0">
      <div className="max-w-2xl mx-auto">
        <Link href="/" aria-label="Crelligent home" className="inline-flex items-center gap-3 min-h-11">
          <Image src="/logo.png" alt="" width={32} height={32} className="size-8" />
          <span className="font-outfit text-xl font-light tracking-tight text-(--cr-text)">Crelligent</span>
        </Link>
      </div>
    </header>
  )
}

export function PayFooter() {
  return (
    <footer className="px-4 py-6 border-t border-(--cr-border) print:hidden">
      <p className="max-w-2xl mx-auto text-xs text-(--cr-text-muted)">
        © Crelligent &amp; Company Limited · Lagos, Nigeria
      </p>
    </footer>
  )
}
