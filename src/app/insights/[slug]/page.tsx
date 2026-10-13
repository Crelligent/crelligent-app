import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { insights } from '@/data/insights'
import { foundryResearch } from '@/data/foundry-research'
import { aehiResearch } from '@/data/aehi-research'
import type { Article } from '@/data/cms'
import { formatLibraryDate, library, libraryItemBySlug, TYPE_LABEL } from '@/data/library'
import { generateSeoMetadata } from '@/lib/seo/metadata'
import { enhanceProse } from '@/lib/library/prose'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { InternalAuthorityGraph } from '@/components/shared/InternalAuthorityGraph'
import { Cover } from '@/components/library/Cover'
import { LibraryCard } from '@/components/library/LibraryCard'
import { PhotoCredit } from '@/components/library/PhotoCredit'
import { PrintButton } from '@/components/library/PrintButton'
import { btnPrimary, btnSecondary, chip, chipAccent, cx, eyebrow, linkAccent } from '@/components/foundry/ui'

type Params = Promise<{ slug: string }>

const SITE_URL = 'https://www.crelligent.com'

/** Foundry research pieces first, then the legacy insight articles. */
function findArticle(slug: string): { article: Article; foundry: boolean; aehi: boolean } | null {
  const f = foundryResearch.find((a) => a.slug === slug)
  if (f) return { article: f, foundry: true, aehi: false }
  const a = aehiResearch.find((x) => x.slug === slug)
  if (a) return { article: a, foundry: false, aehi: true }
  const legacy = insights.find((x) => x.slug === slug)
  return legacy ? { article: legacy, foundry: false, aehi: false } : null
}

export function generateStaticParams() {
  return [...foundryResearch, ...aehiResearch, ...insights].map((a) => ({ slug: a.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const found = findArticle(slug)
  if (!found) return {}
  return generateSeoMetadata({
    title: found.article.seo.title,
    description: found.article.seo.description,
    path: `/insights/${slug}`,
    ogType: 'article',
  })
}

const titleCase = (slug: string) => slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

export default async function InsightPage({ params }: { params: Params }) {
  const { slug } = await params
  const found = findArticle(slug)
  if (!found) notFound()
  const { article, foundry, aehi } = found

  const item = libraryItemBySlug(slug)
  const type = article.type ?? item?.type ?? 'article'
  const isWhitepaper = type === 'whitepaper'
  const readingMinutes = article.readingMinutes ?? item?.readingMinutes
  const dek = article.dek ?? article.excerpt
  const sources = article.sources ?? []

  const more = library.filter((i) => i.slug !== slug).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isWhitepaper ? 'Report' : 'Article',
    headline: article.title,
    description: article.seo.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { '@type': 'Organization', name: article.author },
    publisher: { '@type': 'Organization', name: 'Crelligent', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/insights/${slug}`,
    keywords: article.tags.join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="no-print">
        <Navigation />
      </div>
      <main id="main" className="bg-(--cr-bg)">
        <article aria-labelledby="article-title">
          {/* Hero */}
          <header className="px-4 sm:px-6 pt-28 lg:pt-36">
            <div className="max-w-3xl mx-auto">
              <Link
                href="/insights"
                className={cx(linkAccent, 'no-print inline-flex min-h-11 items-center gap-1.5 text-sm no-underline hover:underline')}
              >
                <ArrowLeft aria-hidden className="size-4" />
                Library
              </Link>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className={isWhitepaper ? chipAccent : chip}>{TYPE_LABEL[type]}</span>
                <span className={chip}>{article.category}</span>
              </div>
              <h1
                id="article-title"
                className="mt-5 font-outfit text-[2rem] leading-[1.1] sm:text-[2.5rem] lg:text-5xl tracking-[-0.03em] text-(--cr-text) text-balance"
              >
                {article.title}
              </h1>
              <p className="mt-5 text-lg lg:text-xl leading-relaxed text-(--cr-text-muted)">{dek}</p>
              <div className="mt-6 flex flex-col gap-4 border-y border-(--cr-border) py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-(--cr-text-muted)">
                  <span className="text-(--cr-text)">{article.author}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={article.publishedAt} className="tabular">
                    {formatLibraryDate(article.publishedAt)}
                  </time>
                  {readingMinutes ? (
                    <>
                      <span aria-hidden>·</span>
                      <span className="tabular">{readingMinutes} min read</span>
                    </>
                  ) : null}
                </p>
                {isWhitepaper && <PrintButton className="w-full sm:w-auto" />}
              </div>
            </div>
            {item && (
              <figure className="max-w-5xl mx-auto mt-10 lg:mt-14">
                <Cover
                  src={item.cover}
                  alt={item.coverAlt}
                  type={type}
                  priority
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="aspect-video lg:aspect-[21/9] rounded-lg border border-(--cr-border)"
                />
                {!aehi && (
                  <figcaption className="mt-2 flex justify-end">
                    <PhotoCredit />
                  </figcaption>
                )}
              </figure>
            )}
          </header>

          {/* Body */}
          <div className="px-4 sm:px-6 pt-10 lg:pt-14 pb-16 lg:pb-24">
            <div className="max-w-3xl mx-auto">
              <div className="cr-prose" dangerouslySetInnerHTML={{ __html: enhanceProse(article.body) }} />

              {sources.length > 0 && (
                <section aria-labelledby="sources-title" className="mt-14 border-t border-(--cr-border) pt-8">
                  <h2 id="sources-title" className="font-outfit text-xl font-normal! text-(--cr-text)">
                    Sources
                  </h2>
                  <ol className="mt-4 space-y-1 text-sm text-(--cr-text-muted)">
                    {sources.map((s, i) => (
                      <li
                        key={i}
                        id={`src-${i + 1}`}
                        className="cr-source grid grid-cols-[2rem_1fr] gap-1 scroll-mt-24 rounded-md p-2 target:bg-(--cr-surface-2)"
                      >
                        <span className="font-mono text-xs leading-6 text-(--cr-accent-ink) tabular">{i + 1}.</span>
                        <span className="min-w-0 leading-6" dangerouslySetInnerHTML={{ __html: s }} />
                      </li>
                    ))}
                  </ol>
                  {article.sourcesNote && (
                    <p
                      className="cr-source mt-4 p-2 text-sm leading-6 text-(--cr-text-muted)"
                      dangerouslySetInnerHTML={{ __html: article.sourcesNote }}
                    />
                  )}
                </section>
              )}

              {/* Closing CTA */}
              {aehi ? (
                <aside
                  aria-labelledby="cta-title"
                  className="no-print mt-14 rounded-lg border border-(--cr-accent)/40 bg-(--cr-accent-tint) p-6 sm:p-8"
                >
                  <p className={eyebrow}>African Enterprise Health Index</p>
                  <h2 id="cta-title" className="mt-3 font-outfit text-2xl leading-tight font-normal! text-(--cr-text)">
                    See how your enterprise scores
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-(--cr-text-muted)">
                    The free diagnostic scores your business on all five ESRE OS layers. Your anonymised answers become part of the
                    inaugural AEHI edition.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link href="/diagnostic" className={cx(btnPrimary, 'w-full sm:w-auto')}>
                      Take the free diagnostic
                      <ArrowRight aria-hidden className="size-4" />
                    </Link>
                    <Link href="/aehi/research" className={cx(btnSecondary, 'w-full sm:w-auto')}>
                      See the evidence charts
                    </Link>
                  </div>
                </aside>
              ) : foundry ? (
                <aside
                  aria-labelledby="cta-title"
                  className="no-print mt-14 rounded-lg border border-(--cr-accent)/40 bg-(--cr-accent-tint) p-6 sm:p-8"
                >
                  <p className={eyebrow}>Crelligent Foundry</p>
                  <h2 id="cta-title" className="mt-3 font-outfit text-2xl leading-tight font-normal! text-(--cr-text)">
                    Get a quote for your startup
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-(--cr-text-muted)">
                    Apply in about 5 minutes. We review every application and reply with next steps.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link href="/foundry/apply" className={cx(btnPrimary, 'w-full sm:w-auto')}>
                      Request a quote
                      <ArrowRight aria-hidden className="size-4" />
                    </Link>
                    <Link href="/foundry" className={cx(btnSecondary, 'w-full sm:w-auto')}>
                      See Foundry packages
                    </Link>
                  </div>
                </aside>
              ) : (
                <div className="no-print">
                  <InternalAuthorityGraph
                    relatedCapabilities={article.relatedCapabilities.map((s) => ({ name: titleCase(s), slug: s }))}
                    relatedTemplates={article.relatedTemplates.map((s) => ({ name: titleCase(s), slug: s }))}
                    relatedDiagnostics={[{ name: 'ESRE OS Score', slug: 'esre-os-score' }]}
                  />
                  <aside
                    aria-labelledby="cta-title"
                    className="mt-16 rounded-lg border border-(--cr-border) bg-(--cr-surface) p-6 sm:p-8"
                  >
                    <h2 id="cta-title" className="font-outfit text-2xl leading-tight font-normal! text-(--cr-text)">
                      Apply this to your enterprise
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-(--cr-text-muted)">
                      Book an L1 Kernel Review to discuss how these systems engineering principles apply directly to your
                      organization.
                    </p>
                    <Link href="/onboarding" className={cx(btnPrimary, 'mt-6 w-full sm:w-auto')}>
                      Book Diagnostic
                      <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  </aside>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* More from the Library */}
        <section
          aria-labelledby="more-title"
          className="no-print px-4 sm:px-6 py-16 lg:py-20 bg-(--cr-surface) border-t border-(--cr-border)"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="more-title" className="heading-lg text-(--cr-text)">
                More from the Library
              </h2>
              <Link href="/insights" className={cx(linkAccent, 'inline-flex min-h-11 items-center gap-1.5 text-sm')}>
                Browse the library
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
            <ul role="list" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {more.map((m) => (
                <li key={m.slug} className="min-w-0">
                  <LibraryCard item={m} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <div className="no-print">
        <Footer />
      </div>
    </>
  )
}
