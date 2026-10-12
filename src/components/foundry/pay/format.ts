/** Client-safe copy of the PublicInvoice shape from src/lib/foundry/invoices.ts (that file is server-only). */
export type InvoiceCurrency = 'NGN' | 'USD' | 'GBP' | 'EUR'
export interface PublicInvoice {
  token: string
  invoiceNumber: string
  kind: 'deposit' | 'balance'
  description: string | null
  amountMinor: number
  currency: InvoiceCurrency
  status: 'sent' | 'paid' | 'void'
  issuedAt: string
  dueDate: string | null
  paidAt: string | null
  clientName: string
  companyName: string | null
  packageId: string
  packageName: string
  engagementTitle: string | null
  engagementTotalMinor: number
  depositPercent: number
  billingEmail: string
}

export function formatMinor(minor: number, currency: InvoiceCurrency) {
  return new Intl.NumberFormat({ NGN: 'en-NG', USD: 'en-US', GBP: 'en-GB', EUR: 'en-IE' }[currency], {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(minor / 100)
}

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Africa/Lagos',
  }).format(new Date(iso))

export const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Lagos',
    timeZoneName: 'short',
  }).format(new Date(iso))

export function kindLabel(kind: PublicInvoice['kind'], depositPercent: number) {
  return kind === 'deposit'
    ? `Deposit · ${depositPercent}% on signing`
    : `Balance · ${100 - depositPercent}% on delivery`
}

export const minutes = (seconds: number) => Math.max(1, Math.ceil(seconds / 60))
