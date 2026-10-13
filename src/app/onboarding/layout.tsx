import type { Metadata } from 'next'

// Client onboarding form: not a search landing page.
export const metadata: Metadata = {
  title: 'Client Onboarding',
  robots: { index: false, follow: true },
  alternates: { canonical: '/onboarding' },
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children
}
