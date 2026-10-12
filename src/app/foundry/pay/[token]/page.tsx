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
  // Domiciliary details vary by bank (account number, SWIFT, IBAN, sort code), so each currency is one
  // free-text value with lines separated by "|", e.g. "Bank: GTBank | Account number: ... | SWIFT: ...".
  const parse = (raw?: string) =>
    raw
      ? raw
          .split('|')
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const [label, ...rest] = line.split(':')
            return rest.length ? { label: label.trim(), value: rest.join(':').trim() } : { label: '', value: line }
          })
      : null
  const bank =
    currency === 'NGN'
      ? ngn
      : parse({ USD: env.FOUNDRY_BANK_USD_DETAILS, GBP: env.FOUNDRY_BANK_GBP_DETAILS, EUR: env.FOUNDRY_BANK_EUR_DETAILS }[currency])
  return {
    // Card checkout needs Paystack, which only settles NGN and USD on our account.
    online: Boolean(env.PAYSTACK_SECRET_KEY) && (currency === 'NGN' || currency === 'USD'),
    bank,
  }
}
