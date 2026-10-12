'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  CloudOff,
  Copy,
  Loader2,
  SearchX,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import { btnPrimary, btnSecondary, cx, linkAccent } from '../ui'

type VerifyStatus = 'paid' | 'pending' | 'failed' | 'mismatch' | 'not_payable' | 'not_found' | 'error'
type State = { phase: 'checking' } | { phase: 'done'; status: VerifyStatus; token: string | null }

/** Auto-poll delays for 'pending', measured from the first result: 3s, 6s, 10s, 15s, 20s. */
const POLL_AT_MS = [3000, 6000, 10000, 15000, 20000]
const BILLING = 'billing@crelligent.com'

function BillingLink() {
  return (
    <a href={`mailto:${BILLING}`} className={linkAccent}>
      {BILLING}
    </a>
  )
}

export function PaymentResult({ token }: { token: string }) {
  const sp = useSearchParams()
  const reference = sp.get('reference') ?? sp.get('trxref')
  const [state, setState] = useState<State>({ phase: 'checking' })
  const [polling, setPolling] = useState(false)
  const [copied, setCopied] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const headingRef = useRef<HTMLHeadingElement>(null)

  const verify = useCallback(async (): Promise<{ status: VerifyStatus; token: string | null }> => {
    if (!reference) return { status: 'not_found', token: null }
    try {
      const res = await fetch(`/api/foundry/pay/verify?reference=${encodeURIComponent(reference)}`, {
        cache: 'no-store',
      })
      const body = (await res.json().catch(() => null)) as { status?: string; token?: string | null } | null
      const s = body?.status
      const known: VerifyStatus[] = ['paid', 'pending', 'failed', 'mismatch', 'not_payable', 'not_found', 'error']
      if (s === 'invalid_reference') return { status: 'not_found', token: null }
      if (s && (known as string[]).includes(s)) return { status: s as VerifyStatus, token: body?.token ?? null }
      return { status: 'error', token: null }
    } catch {
      return { status: 'error', token: null }
    }
  }, [reference])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const run = useCallback(async () => {
    clearTimers()
    setPolling(false)
    setState({ phase: 'checking' })
    const first = await verify()
    setState({ phase: 'done', ...first })
    if (first.status !== 'pending') return
    // Pending: poll at fixed offsets, stop as soon as the status changes.
    setPolling(true)
    let stopped = false
    POLL_AT_MS.forEach((ms, i) => {
      timers.current.push(
        setTimeout(async () => {
          if (stopped) return
          const r = await verify()
          if (stopped) return
          if (r.status !== 'pending') {
            stopped = true
            clearTimers()
            setPolling(false)
            setState({ phase: 'done', ...r })
          } else if (i === POLL_AT_MS.length - 1) {
            setPolling(false)
          }
        }, ms),
      )
    })
  }, [verify])

  useEffect(() => {
    void run()
    return clearTimers
  }, [run])

  useEffect(() => {
    if (state.phase === 'done') headingRef.current?.focus()
  }, [state])

  async function copyRef() {
    if (!reference) return
    try {
      await navigator.clipboard.writeText(reference)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  const invoiceHref = `/foundry/pay/${encodeURIComponent(state.phase === 'done' && state.token ? state.token : token)}`

  let Icon: LucideIcon = Loader2
  let iconCls = 'text-(--cr-text-muted) motion-safe:animate-spin'
  let heading = 'Confirming your payment…'
  let body: React.ReactNode = (
    <>We&apos;re checking with Paystack. This usually takes a few seconds. Please don&apos;t close this page or pay again.</>
  )
  let actions: React.ReactNode = null

  if (state.phase === 'done') {
    switch (state.status) {
      case 'paid':
        Icon = CheckCircle2
        iconCls = 'text-(--cr-success)'
        heading = 'Payment confirmed.'
        body = <>Thank you. Your invoice is now marked as paid.</>
        actions = (
          <Link href={invoiceHref} className={btnPrimary}>
            View receipt
          </Link>
        )
        break
      case 'pending':
        Icon = Clock
        iconCls = 'text-(--cr-warning)'
        heading = 'Your payment is still processing.'
        body = (
          <>
            Some banks take a minute to confirm. We&apos;ll keep checking.{' '}
            <strong className="font-medium text-(--cr-text)">You don&apos;t need to pay again.</strong>
          </>
        )
        actions = polling ? (
          <p className="flex items-center gap-2 text-sm text-(--cr-text-muted)">
            <Loader2 aria-hidden className="size-4 motion-safe:animate-spin" /> Checking again shortly…
          </p>
        ) : (
          <div className="space-y-3">
            <button type="button" onClick={() => void run()} className={btnSecondary}>
              Check again
            </button>
            <p className="text-sm text-(--cr-text-muted)">
              If your invoice still shows unpaid after an hour, email <BillingLink /> with the reference below.
            </p>
          </div>
        )
        break
      case 'failed':
        Icon = XCircle
        iconCls = 'text-(--cr-danger)'
        heading = 'Payment not completed.'
        body = (
          <>
            Paystack reports this payment as unsuccessful. If money left your account, your bank normally reverses it.
            Email <BillingLink /> with the reference below if it doesn&apos;t.
          </>
        )
        actions = (
          <Link href={invoiceHref} className={btnPrimary}>
            Try again
          </Link>
        )
        break
      case 'mismatch':
        Icon = AlertTriangle
        iconCls = 'text-(--cr-warning)'
        heading = "We couldn't match this payment to your invoice."
        body = (
          <>
            Paystack received a payment, but the amount or currency doesn&apos;t match this invoice, so we haven&apos;t
            marked it as paid. We&apos;ve logged it for review.{' '}
            <strong className="font-medium text-(--cr-text)">Please don&apos;t pay again.</strong> Email <BillingLink />{' '}
            with the reference below and we&apos;ll resolve it.
          </>
        )
        actions = (
          <Link href={invoiceHref} className={btnSecondary}>
            View invoice
          </Link>
        )
        break
      case 'not_payable':
        Icon = AlertTriangle
        iconCls = 'text-(--cr-warning)'
        heading = "This invoice wasn't open for payment."
        body = (
          <>
            Paystack confirmed a payment, but this invoice had already been closed or cancelled. We&apos;ve logged it for
            review. Email <BillingLink /> with the reference below.
          </>
        )
        actions = (
          <Link href={invoiceHref} className={btnSecondary}>
            View invoice
          </Link>
        )
        break
      case 'not_found':
        Icon = SearchX
        iconCls = 'text-(--cr-text-muted)'
        heading = "We couldn't find this payment."
        body = (
          <>
            The link may be incomplete. If you completed a payment, email <BillingLink /> with your Paystack receipt.
          </>
        )
        actions = (
          <Link href={invoiceHref} className={btnSecondary}>
            Back to invoice
          </Link>
        )
        break
      default:
        Icon = CloudOff
        iconCls = 'text-(--cr-text-muted)'
        heading = "We couldn't confirm your payment yet."
        body = (
          <>
            This is a problem on our side, not with your payment.{' '}
            <strong className="font-medium text-(--cr-text)">Don&apos;t pay again.</strong> Check again in a moment.
          </>
        )
        actions = (
          <button type="button" onClick={() => void run()} className={btnPrimary}>
            Check again
          </button>
        )
    }
  }

  return (
    <div
      className="rounded-lg border border-(--cr-border) bg-(--cr-surface) p-6 sm:p-10 text-center"
      aria-busy={state.phase === 'checking' || undefined}
    >
      <Icon aria-hidden className={cx('mx-auto size-10', iconCls)} />
      <h1 ref={headingRef} tabIndex={-1} className="mt-5 font-outfit text-2xl text-(--cr-text) outline-none">
        {heading}
      </h1>
      <p aria-live="polite" className="mt-3 text-(--cr-text-muted) leading-relaxed max-w-md mx-auto">
        {body}
      </p>

      {state.phase === 'checking' && (
        <div aria-hidden className="mt-6 space-y-2 max-w-xs mx-auto">
          <div className="h-3 rounded-md bg-(--cr-surface-2) motion-safe:animate-pulse" />
          <div className="h-3 w-2/3 mx-auto rounded-md bg-(--cr-surface-2) motion-safe:animate-pulse" />
        </div>
      )}

      {reference && (
        <div className="mt-6 inline-flex max-w-full items-center gap-2 rounded-md border border-(--cr-border-strong) bg-(--cr-bg) pl-3">
          <span className="text-xs text-(--cr-text-muted)">Reference</span>
          <code className="font-mono text-sm text-(--cr-text) break-all text-left">{reference}</code>
          <button
            type="button"
            onClick={copyRef}
            aria-label="Copy payment reference"
            className="grid place-items-center size-11 shrink-0 rounded-md text-(--cr-text-muted) hover:text-(--cr-text) hover:bg-(--cr-surface-2)"
          >
            <Copy aria-hidden className="size-4" />
          </button>
        </div>
      )}
      <p aria-live="polite" className="mt-1 h-5 text-xs text-(--cr-accent-ink)">
        {copied ? 'Copied' : ''}
      </p>

      {actions && <div className="mt-4 flex flex-col items-center gap-3">{actions}</div>}
    </div>
  )
}
