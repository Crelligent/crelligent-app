import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Business Templates: Operating Model, Process and Governance',
  description:
    'Free templates for growing companies: operating model canvas, process-to-system map, dependency mapping, governance framework and system health audit.',
}

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return children
}
