import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getInvoiceByToken } from '@/lib/foundry/invoices'
import { InvoiceView } from '@/components/foundry/pay/InvoiceView'

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
  return <InvoiceView invoice={invoice} />
}
