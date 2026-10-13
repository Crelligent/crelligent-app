import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fleet, Fuel & Generator Monitoring for African Industry',
  description:
    "IoT hardware and the PRISM platform for real-time fleet tracking, fuel and diesel monitoring, generator and energy telemetry across Nigerian and African operations.",
  alternates: { canonical: '/intelligent-systems' },
  keywords:
    'intelligent systems Nigeria, IoT Africa, fleet intelligence Nigeria, operational intelligence platform, PRISM enterprise, industrial IoT West Africa, fuel monitoring Nigeria, generator monitoring Africa',
}

export default function IntelligentSystemsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
