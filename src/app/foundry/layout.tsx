import { IBM_Plex_Mono } from 'next/font/google'
import './foundry.css'

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export default function FoundryLayout({ children }: { children: React.ReactNode }) {
  return <div className={`foundry ${plexMono.variable} min-h-screen`}>{children}</div>
}
