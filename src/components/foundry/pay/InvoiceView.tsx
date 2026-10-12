import { Ban, CheckCircle2, Clock, Landmark, Lock, Mail } from 'lucide-react'
import { cx, linkAccent } from '../ui'
import { formatDate, formatDateTime, formatMinor, kindLabel, type PublicInvoice } from './format'
import { PayButton, PrintButton } from './PayButton'

export function InvoiceStatusBadge({ status }: { status: PublicInvoice['status'] }) {
  const map = {
    sent: { label: 'Due', Icon: Clock, cls: 'text-(--cr-warning) bg-(--cr-warning-tint) border-(--cr-warning)' },
    paid: { label: 'Paid', Icon: CheckCircle2, cls: 'text-(--cr-success) bg-(--cr-accent-tint) border-(--cr-success)' },
    void: { label: 'Void', Icon: Ban, cls: 'text-(--cr-text-muted) border-(--cr-border-strong)' },
  } as const
  const { label, Icon, cls } = map[status]
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm font-medium', cls)}>
      <Icon aria-hidden className="size-4" />
      {label}
    </span>
  )
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-(--cr-text-muted)">{label}</dt>
      <dd className="mt-1 text-(--cr-text)">{children}</dd>
    </div>
  )
}

export interface PaymentOptions {
  /** Paystack card/bank checkout is configured. */
  online: boolean
  /** Bank transfer details for this invoice's currency, or null. */
  bank: { label: string; value: string }[] | null
}

function BankTransfer({
  rows,
  invoiceNumber,
  amountLabel,
  billingEmail,
  mailHref,
  alsoOnline,
}: {
  rows: { label: string; value: string }[]
  invoiceNumber: string
  amountLabel: string
  billingEmail: string
  mailHref: string
  alsoOnline: boolean
}) {
  return (
    <section
      aria-labelledby="bank-transfer"
      className={cx('rounded-lg border border-(--cr-border) bg-(--cr-surface-2) p-4 sm:p-5 text-sm', alsoOnline && 'mt-6')}
    >
      <h2 id="bank-transfer" className="flex items-center gap-2 font-medium text-(--cr-text)">
        <Landmark aria-hidden className="size-4 shrink-0 text-(--cr-accent)" />
        {alsoOnline ? 'Or pay by bank transfer' : 'Pay by bank transfer'}
      </h2>
      <dl className="mt-4 grid grid-cols-1 sm:grid-cols-[max-content_1fr] gap-x-6 gap-y-2">
        {rows.map((r, i) => (
          <div key={i} className="contents">
            {r.label ? <dt className="text-(--cr-text-muted)">{r.label}</dt> : <dt className="sr-only">Detail</dt>}
            <dd className={cx('font-mono text-(--cr-text) break-all', !r.label && 'sm:col-span-2')}>{r.value}</dd>
          </div>
        ))}
        <dt className="text-(--cr-text-muted)">Amount</dt>
        <dd className="font-mono text-(--cr-text)">{amountLabel}</dd>
        <dt className="text-(--cr-text-muted)">Reference</dt>
        <dd className="font-mono text-(--cr-text) break-all">{invoiceNumber}</dd>
      </dl>
      <p className="mt-4 text-(--cr-text-muted)">
        Use <span className="font-mono text-(--cr-text)">{invoiceNumber}</span> as the transfer reference, then send
        the receipt to{' '}
        <a href={mailHref} className={cx(linkAccent, 'font-medium')}>
          {billingEmail}
        </a>
        . This page changes to a receipt once we confirm the payment.
      </p>
    </section>
  )
}

export function InvoiceView({
  invoice: inv,
  payment = { online: true, bank: null },
}: {
  invoice: PublicInvoice
  payment?: PaymentOptions
}) {
  const paid = inv.status === 'paid'
  const isVoid = inv.status === 'void'
  const kl = kindLabel(inv.kind, inv.depositPercent)
  const due = formatMinor(inv.amountMinor, inv.currency)
  const mailHref = `mailto:${inv.billingEmail}?subject=${encodeURIComponent(`Invoice ${inv.invoiceNumber}`)}`

  return (
    <article className="rounded-lg border border-(--cr-border) bg-(--cr-surface) p-5 sm:p-8 print:border-0 print:p-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-outfit text-3xl text-(--cr-text)">{paid ? 'Receipt' : 'Invoice'}</h1>
          <p className="mt-1 font-mono text-sm text-(--cr-text-muted) break-all">{inv.invoiceNumber}</p>
        </div>
        <InvoiceStatusBadge status={inv.status} />
      </div>

      <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <Meta label="Billed to">
          <span className="block">{inv.clientName}</span>
          {inv.companyName && <span className="block text-(--cr-text-muted)">{inv.companyName}</span>}
        </Meta>
        <Meta label="Issued">{formatDate(inv.issuedAt)}</Meta>
        {!paid && !isVoid && <Meta label="Due">{inv.dueDate ? formatDate(inv.dueDate) : 'On receipt'}</Meta>}
        {paid && inv.paidAt && <Meta label="Paid">{formatDateTime(inv.paidAt)}</Meta>}
        <Meta label="Package">{inv.packageName}</Meta>
        {inv.engagementTitle && <Meta label="Engagement">{inv.engagementTitle}</Meta>}
      </dl>

      <table className="mt-8 w-full text-sm">
        <thead>
          <tr className="border-b border-(--cr-border)">
            <th scope="col" className="pb-2 text-left text-xs font-medium uppercase tracking-wide text-(--cr-text-muted)">
              Description
            </th>
            <th scope="col" className="pb-2 text-right text-xs font-medium uppercase tracking-wide text-(--cr-text-muted)">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-3 pr-4 align-top text-(--cr-text)">
              {inv.description ?? kl}
              {inv.description && <span className="block text-xs text-(--cr-text-muted)">{kl}</span>}
            </td>
            <td className="py-3 align-top text-right font-mono text-(--cr-text) whitespace-nowrap">{due}</td>
          </tr>
        </tbody>
      </table>

      <dl className="mt-4 border-t border-(--cr-border) pt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-(--cr-text-muted)">Engagement total</dt>
          <dd className="font-mono text-(--cr-text) text-right">{formatMinor(inv.engagementTotalMinor, inv.currency)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-(--cr-text-muted)">This invoice ({kl})</dt>
          <dd className="font-mono text-(--cr-text) text-right whitespace-nowrap">{due}</dd>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 pt-3">
          <dt className="text-base font-medium text-(--cr-text)">Amount due</dt>
          <dd className="text-right">
            <span className="font-mono text-3xl sm:text-4xl text-(--cr-text) tabular">
              {isVoid ? '—' : paid ? formatMinor(0, inv.currency) : due}
            </span>
            <span className="ml-2 font-mono text-sm text-(--cr-text-muted)">{inv.currency}</span>
          </dd>
        </div>
      </dl>

      <div className="mt-8">
        {inv.status === 'sent' && payment.online && (
          <PayButton token={inv.token} invoiceNumber={inv.invoiceNumber} amountLabel={due} />
        )}
        {inv.status === 'sent' && payment.bank && (
          <BankTransfer
            rows={payment.bank}
            invoiceNumber={inv.invoiceNumber}
            amountLabel={due}
            billingEmail={inv.billingEmail}
            mailHref={mailHref}
            alsoOnline={payment.online}
          />
        )}
        {inv.status === 'sent' && !payment.online && !payment.bank && (
          <div className="flex gap-3 rounded-lg border border-(--cr-border) bg-(--cr-surface-2) p-4 text-sm">
            <Mail aria-hidden className="size-5 shrink-0 text-(--cr-accent)" />
            <p className="text-(--cr-text-muted)">
              To pay this invoice, email{' '}
              <a href={mailHref} className={cx(linkAccent, 'font-medium')}>
                {inv.billingEmail}
              </a>{' '}
              quoting {inv.invoiceNumber} and we&apos;ll send payment details.
            </p>
          </div>
        )}
        {paid && (
          <div className="space-y-4">
            <div className="flex gap-3 rounded-lg border border-(--cr-accent) bg-(--cr-accent-tint) p-4 text-sm">
              <CheckCircle2 aria-hidden className="size-5 shrink-0 text-(--cr-success)" />
              <div>
                <p className="font-medium text-(--cr-text)">Payment received. Thank you.</p>
                <p className="mt-1 text-(--cr-text-muted)">
                  Paid on {inv.paidAt ? formatDateTime(inv.paidAt) : 'record'}. Keep this page as your receipt.
                </p>
              </div>
            </div>
            <PrintButton />
          </div>
        )}
        {isVoid && (
          <div className="flex gap-3 rounded-lg border border-(--cr-border-strong) bg-(--cr-surface-2) p-4 text-sm">
            <Ban aria-hidden className="size-5 shrink-0 text-(--cr-text-muted)" />
            <div>
              <p className="font-medium text-(--cr-text)">This invoice has been cancelled.</p>
              <p className="mt-1 text-(--cr-text-muted)">
                It can&apos;t be paid. If you think this is a mistake, email{' '}
                <a href={mailHref} className={linkAccent}>
                  {inv.billingEmail}
                </a>{' '}
                and quote {inv.invoiceNumber}.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-(--cr-border) space-y-2 text-xs text-(--cr-text-muted)">
        {payment.online && (
          <p className="flex items-center gap-2">
            <Lock aria-hidden className="size-3.5 shrink-0" />
            Card payments are processed securely by Paystack.
          </p>
        )}
        <p className="flex items-center gap-2">
          <Mail aria-hidden className="size-3.5 shrink-0" />
          <span>
            Payments and receipts:{' '}
            <a href={mailHref} className={cx(linkAccent, 'font-medium')}>
              {inv.billingEmail}
            </a>
          </span>
        </p>
        <p>Crelligent &amp; Company Limited · Lagos, Nigeria</p>
      </div>
    </article>
  )
}
