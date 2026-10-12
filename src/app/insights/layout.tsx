import { IBM_Plex_Mono } from 'next/font/google'
import '../foundry/foundry.css'
import './library.css'

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})

/** Library pages share the Foundry-scoped Crelligent tokens (dark) and IBM Plex Mono for numbers. */
export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <div className={`foundry ${plexMono.variable} min-h-screen`}>{children}</div>
}
