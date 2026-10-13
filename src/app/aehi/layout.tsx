import type { Metadata } from 'next'
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import './aehi.css'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { MotionProvider } from '@/components/aehi/ui/MotionProvider'
import { SITE_NAME } from '@/data/aehi/site'

const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-aehi-grotesk', weight: ['400', '500', '600'], display: 'swap' })
const plex = IBM_Plex_Mono({ subsets: ['latin'], variable: '--font-aehi-plex', weight: ['400', '500'], display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'African Enterprise Health Index (AEHI) | Crelligent',
    template: '%s | AEHI | Crelligent',
  },
  description:
    'A quarterly benchmark of how Nigerian mid-market enterprises are run, scored on five OS layers. Inaugural edition Q4 2026. Take the free diagnostic.',
  openGraph: { type: 'website', siteName: SITE_NAME, locale: 'en_GB' },
}

/**
 * The AEHI section of crelligent.com: main Crelligent navigation on top (fixed), the one-page AEHI,
 * then the site footer. Section navigation lives in the hero's jump links.
 */
export default function AehiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`aehi ${grotesk.variable} ${plex.variable} flex min-h-screen flex-col`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ResearchProject',
            name: 'African Enterprise Health Index',
            url: 'https://crelligent.com/aehi',
            description: 'A quarterly benchmark of how Nigerian mid-market enterprises are run. Inaugural edition in preparation.',
            parentOrganization: { '@type': 'Organization', name: 'Crelligent & Company', url: 'https://crelligent.com' },
            areaServed: 'Nigeria',
          }),
        }}
      />
      <Navigation />
      <MotionProvider>
        <div className="aehi-offset">
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
        </div>
      </MotionProvider>
      <Footer />
    </div>
  )
}
