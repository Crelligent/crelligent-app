import type { Metadata } from 'next'
import SurveyClient from './SurveyClient'

export const metadata: Metadata = {
  title: 'The PMF Blind Spot — 2026 Founder Research Study',
  description:
    'How do early-stage founders measure product-market fit? Take our 3-minute anonymous survey and get access to the full research findings.',
  openGraph: {
    title: 'The PMF Blind Spot — 2026 Founder Research Study',
    description:
      "42% of startups fail because they never found PMF. We’re researching how founders actually measure it. 3 minutes. Anonymous. Results shared with all participants.",
    url: 'https://crelligent.com/research/pmf-blind-spot',
    siteName: 'Crelligent',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The PMF Blind Spot — 2026 Founder Research Study',
    description:
      "42% of startups fail because they never found PMF. We’re researching how founders actually measure it.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PMFSurveyPage() {
  return <SurveyClient />
}
