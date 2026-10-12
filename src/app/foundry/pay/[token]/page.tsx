import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getInvoiceByToken } from '@/lib/foundry/invoices'
import { InvoiceView, type PaymentOptions } from '@/components/foundry/pay/InvoiceView'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Invoice',
  description: 'Crelligent invoice.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export default async function InvoicePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const invoice = await getInvoiceByToken(token)
  if (!invoice) notFound()
  return <InvoiceView invoice={invoice} payment={paymentOptions(invoice.currency)} />
}

/**
 * Card payment needs Paystack. Until it is live, invoices show bank transfer details
 * (set in Vercel env, never in the repo) and Crelligent marks the invoice paid by hand.
 */
function paymentOptions(currency: string): PaymentOptions {
  const env = process.env
  const ngn =
    env.FOUNDRY_BANK_NAME && env.FOUNDRY_BANK_ACCOUNT_NAME && env.FOUNDRY_BANK_ACCOUNT_NUMBER
      ? [
          { label: 'Bank', value: env.FOUNDRY_BANK_NAME },
          { label: 'Account name', value: env.FOUNDRY_BANK_ACCOUNT_NAME },
          { label: 'Account number', value: env.FOUNDRY_BANK_ACCOUNT_NUMBER },
        ]
      : null
  // USD details vary by bank (domiciliary account, SWIFT, routing), so they are one free-text value.
  const usd = env.FOUNDRY_BANK_USD_DETAILS
    ? env.FOUNDRY_BANK_USD_DETAILS.split('|').map((line) => {
        const [label, ...rest] = line.split(':')
        return rest.length ? { label: label.trim(), value: rest.join(':').trim() } : { label: '', value: line.trim() }
      })
    : null
  return {
    online: Boolean(env.PAYSTACK_SECRET_KEY),
    bank: currency === 'USD' ? usd : ngn,
  }
}
