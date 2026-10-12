import { generateSeoMetadata } from '@/lib/seo/metadata'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { Eyebrow } from '@/components/foundry/primitives'
import { LibraryBrowser } from '@/components/library/LibraryBrowser'
import { isLibraryFilter } from '@/data/library'

export const metadata = generateSeoMetadata({
  title: 'Library: Articles, Whitepapers and Research | Crelligent',
  description:
    'Articles, whitepapers and research by Crelligent on product-market fit, fundraising, operating models and the health of African enterprises.',
  path: '/insights',
})

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ type?: string | string[] }> }) {
  const { type } = await searchParams
  const initial = isLibraryFilter(type) ? type : 'all'

  return (
    <>
      <Navigation />
      <main id="main" className="bg-(--cr-bg)">
        <section aria-labelledby="library-title" className="px-4 sm:px-6 pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="max-w-6xl mx-auto">
            <header className="max-w-3xl">
              <Eyebrow>Crelligent Library</Eyebrow>
              <h1
                id="library-title"
                className="mt-4 font-outfit text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-6xl tracking-[-0.03em] text-(--cr-text)"
              >
                Library
              </h1>
              <p className="mt-5 text-base lg:text-lg text-(--cr-text-muted) leading-relaxed">
                Articles, whitepapers and research by Crelligent, for founders and the leaders of growing African
                enterprises.
              </p>
            </header>
            <div className="mt-10 lg:mt-14">
              <LibraryBrowser initial={initial} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
