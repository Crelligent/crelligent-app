'use client'

import { Printer } from 'lucide-react'
import { btnSecondary, cx } from '@/components/foundry/ui'

export function PrintButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={cx(btnSecondary, 'no-print', className)}>
      <Printer aria-hidden className="size-4" />
      Print or save as PDF
    </button>
  )
}
