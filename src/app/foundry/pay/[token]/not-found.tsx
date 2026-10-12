import Link from 'next/link'
import { FileQuestion } from 'lucide-react'
import { linkAccent, linkAccentStandalone } from '@/components/foundry/ui'

export default function InvoiceNotFound() {
  return (
    <div className="rounded-lg border border-(--cr-border) bg-(--cr-surface) p-6 sm:p-10 text-center">
      <FileQuestion aria-hidden className="mx-auto size-8 text-(--cr-text-muted)" />
      <h1 className="mt-5 font-outfit text-2xl text-(--cr-text)">We can&apos;t find this invoice.</h1>
      <p className="mt-3 text-(--cr-text-muted) leading-relaxed max-w-md mx-auto">
        The link may be incomplete, or the invoice hasn&apos;t been issued yet. Check the link in your email, or contact{' '}
        <a href="mailto:billing@crelligent.com" className={linkAccent}>
          billing@crelligent.com
        </a>
        .
      </p>
      <Link href="/foundry" className={`${linkAccentStandalone} mt-4`}>
        Go to Crelligent Foundry
      </Link>
    </div>
  )
}
