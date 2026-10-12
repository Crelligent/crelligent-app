'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, Clock, Loader2, Lock, Printer } from 'lucide-react'
import { btnPrimary, btnSecondary, cx, linkAccent } from '../ui'
import { minutes } from './format'

type PayError =
  | { kind: 'not_payable' }
  | { kind: 'not_found' }
  | { kind: 'rate_limited'; minutes: number }
  | { kind: 'init_failed' }

const BILLING = 'billing@crelligent.com'

function Mail({ invoiceNumber }: { invoiceNumber: string }) {
  return (
    <a href={`mailto:${BILLING}?subject=${encodeURIComponent(`Invoice ${invoiceNumber}`)}`} className={linkAccent}>
      {BILLING}
    </a>
  )
}

export function PayButton({
  token,
  invoiceNumber,
  amountLabel,
}: {
  token: string
  invoiceNumber: string
  amountLabel: string
}) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<PayError | null>(null)

  async function pay() {
    if (busy) return
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(`/api/foundry/pay/${encodeURIComponent(token)}`, { method: 'POST' })
      const body = (await res.json().catch(() => null)) as
        | { authorizationUrl?: string; error?: string; retryAfterSeconds?: number }
        | null
      if (res.ok && body?.authorizationUrl) {
        // Keep the busy state while the browser leaves for Paystack.
        window.location.assign(body.authorizationUrl)
        return
      }
      if (res.status === 409 && body?.error === 'already_paid') {
        router.refresh()
        setBusy(false)
        return
      }
      if (res.status === 409) setError({ kind: 'not_payable' })
      else if (res.status === 404) setError({ kind: 'not_found' })
      else if (res.status === 429) setError({ kind: 'rate_limited', minutes: minutes(body?.retryAfterSeconds ?? 60) })
      else setError({ kind: 'init_failed' })
    } catch {
      setError({ kind: 'init_failed' })
    }
    setBusy(false)
  }

  const disabledForGood = error?.kind === 'not_payable' || error?.kind === 'not_found'

  return (
    <div className="print:hidden">
      {error && (
        <div
          role="alert"
          className={cx(
            'mb-4 flex gap-3 rounded-lg border p-4 text-sm',
            error.kind === 'rate_limited'
              ? 'border-(--cr-warning) bg-(--cr-warning-tint)'
              : 'border-(--cr-danger) bg-(--cr-danger-tint)',
          )}
        >
          {error.kind === 'rate_limited' ? (
            <Clock aria-hidden className="size-5 shrink-0 text-(--cr-warning)" />
          ) : (
            <AlertCircle aria-hidden className="size-5 shrink-0 text-(--cr-danger)" />
          )}
          <div>
            {error.kind === 'not_payable' && (
              <>
                <p className="font-medium text-(--cr-text)">This invoice can&apos;t be paid online right now.</p>
                <p className="mt-1 text-(--cr-text-muted)">
                  Please email <Mail invoiceNumber={invoiceNumber} /> and quote {invoiceNumber}.
                </p>
              </>
            )}
            {error.kind === 'not_found' && (
              <>
                <p className="font-medium text-(--cr-text)">We can&apos;t find this invoice anymore.</p>
                <p className="mt-1 text-(--cr-text-muted)">
                  Please email <Mail invoiceNumber={invoiceNumber} /> and quote {invoiceNumber}.
                </p>
              </>
            )}
            {error.kind === 'rate_limited' && (
              <>
                <p className="font-medium text-(--cr-text)">Too many attempts.</p>
                <p className="mt-1 text-(--cr-text-muted)">
                  Please try again in {error.minutes} minute{error.minutes === 1 ? '' : 's'}.
                </p>
              </>
            )}
            {error.kind === 'init_failed' && (
              <>
                <p className="font-medium text-(--cr-text)">We couldn&apos;t start the payment.</p>
                <p className="mt-1 text-(--cr-text-muted)">
                  No money has been taken. Try again, or email <Mail invoiceNumber={invoiceNumber} />.
                </p>
              </>
            )}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={pay}
        disabled={busy || disabledForGood}
        aria-busy={busy || undefined}
        className={cx(btnPrimary, 'w-full min-h-12 text-base')}
      >
        {busy ? (
          <>
            <Loader2 aria-hidden className="size-4 motion-safe:animate-spin" />
            Opening secure checkout…
          </>
        ) : (
          <>
            <Lock aria-hidden className="size-4" />
            {error?.kind === 'init_failed' ? 'Try again' : `Pay ${amountLabel} with Paystack`}
          </>
        )}
      </button>
      <p className="mt-3 text-xs text-(--cr-text-muted)">
        You&apos;ll pay on Paystack&apos;s secure checkout and come back here when it&apos;s done.
      </p>
    </div>
  )
}

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className={cx(btnSecondary, 'print:hidden')}>
      <Printer aria-hidden className="size-4" />
      Print or save as PDF
    </button>
  )
}
