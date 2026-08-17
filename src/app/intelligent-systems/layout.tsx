import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crelligent Intelligent Systems | Operational Intelligence for African Industry',
  description:
    'One reusable operational intelligence architecture deployed across ten African industry verticals. IoT hardware, PRISM platform, and real-time command intelligence — built for African operating conditions.',
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
