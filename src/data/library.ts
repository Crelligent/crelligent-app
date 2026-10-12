/**
 * Crelligent Library catalogue: every article, whitepaper, research item and CEO Corner issue.
 * Source: foundry-brief/LIBRARY_CONTENT.md (CATALOGUE). Order is the catalogue order.
 * Cover photos live at public/images/insights/<slug>.webp (fetched by scripts/fetch-insight-images.mjs);
 * the <Cover> component falls back to a branded panel when a file is missing.
 */
import { insights } from './insights'
import { foundryResearch } from './foundry-research'

export type LibraryType = 'article' | 'whitepaper' | 'research' | 'ceo-corner'

export interface LibraryItem {
  slug: string
  type: LibraryType
  title: string
  excerpt: string
  /** ISO date (YYYY-MM-DD) or null when the source has no date. Never invented. */
  date: string | null
  href: string
  readingMinutes?: number
  foundryFeatured?: boolean
  cover: string
  coverAlt: string
  /** Short status shown instead of a date when `date` is null. */
  statusLabel?: string
}

export type LibraryFilter = LibraryType | 'all'

export const LIBRARY_TYPES: { value: LibraryFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'article', label: 'Articles' },
  { value: 'whitepaper', label: 'Whitepapers' },
  { value: 'research', label: 'Research' },
  { value: 'ceo-corner', label: 'CEO Corner' },
]

export const TYPE_LABEL: Record<LibraryType, string> = {
  article: 'Article',
  whitepaper: 'Whitepaper',
  research: 'Research',
  'ceo-corner': 'CEO Corner',
}

export const PHOTO_CREDIT = { label: 'Photos: DC Studio on Freepik', href: 'https://www.freepik.com/author/dc-studio' }

const cover = (slug: string) => `/images/insights/${slug}.webp`

/** Reading time from an HTML body at ~220 words a minute (for legacy articles without a set value). */
function minutesFromHtml(html: string) {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

const research = (slug: string) => foundryResearch.find((a) => a.slug === slug)!
const legacy = (slug: string) => insights.find((a) => a.slug === slug)!

export const library: LibraryItem[] = [
  {
    slug: 'pmf-evidence-gap',
    type: 'whitepaper',
    title: 'The PMF Evidence Gap: what African investors now need to see before a seed or Series A',
    excerpt:
      'African capital is back, but it goes to fewer companies. The PMF evidence investors trust, how VeloDesk weights it, and a 30-day plan to build it before your raise.',
    date: '2026-10-12',
    href: '/insights/pmf-evidence-gap',
    readingMinutes: research('pmf-evidence-gap').readingMinutes,
    foundryFeatured: true,
    cover: cover('pmf-evidence-gap'),
    coverAlt: 'Founders presenting their business to a panel of investors',
  },
  {
    slug: 'seed-to-series-a-africa',
    type: 'article',
    title: 'Seed to Series A in Africa: the 2025 numbers and what they mean for your raise',
    excerpt:
      'What Partech, Africa: The Big Deal, Briter and Carta data say about seed and Series A in 2025, why the trackers disagree, and five things it means for your raise.',
    date: '2026-10-12',
    href: '/insights/seed-to-series-a-africa',
    readingMinutes: research('seed-to-series-a-africa').readingMinutes,
    foundryFeatured: true,
    cover: cover('seed-to-series-a-africa'),
    coverAlt: 'A team in an office reviewing revenue figures in printed documents',
  },
  {
    slug: 'second-product-without-breaking-the-first',
    type: 'article',
    title: 'Launching a second product without breaking the first',
    excerpt:
      'Most new launches fail, and first-time builders skip validation more often. How to test a second product before you build it, protect your core team, and when to co-build.',
    date: '2026-10-12',
    href: '/insights/second-product-without-breaking-the-first',
    readingMinutes: research('second-product-without-breaking-the-first').readingMinutes,
    foundryFeatured: true,
    cover: cover('second-product-without-breaking-the-first'),
    coverAlt: 'Entrepreneurs standing around a growth chart, brainstorming ideas in a startup office',
  },
  {
    slug: 'what-is-enterprise-operating-model',
    type: 'article',
    title: 'What Is an Enterprise Operating Model?',
    excerpt:
      'An operating model bridges the gap between strategy and execution. Discover how to architect your enterprise for scale.',
    date: '2026-10-15',
    href: '/insights/what-is-enterprise-operating-model',
    readingMinutes: minutesFromHtml(legacy('what-is-enterprise-operating-model').body),
    foundryFeatured: false,
    cover: cover('what-is-enterprise-operating-model'),
    coverAlt: 'A manager giving instructions to a team of employees',
  },
  {
    slug: 'what-is-technology-debt',
    type: 'article',
    title: 'What Is Technology Debt?',
    excerpt: 'When your engineering team spends 80% of their time fixing bugs, you have a structural technology debt crisis.',
    date: '2026-10-18',
    href: '/insights/what-is-technology-debt',
    readingMinutes: minutesFromHtml(legacy('what-is-technology-debt').body),
    foundryFeatured: false,
    cover: cover('what-is-technology-debt'),
    coverAlt: 'A software engineer writing code across two monitors',
  },
  {
    slug: 'aehi-q4-2026',
    type: 'research',
    title: 'African Enterprise Health Index - Q4 2026',
    excerpt: 'Analysis of operational resilience in Nigerian mid-market companies.',
    date: '2026-10-01',
    href: '/research/aehi/q4-2026',
    foundryFeatured: false,
    cover: cover('aehi-q4-2026'),
    coverAlt: 'A team of coworkers analysing charts and printed reports around a table',
  },
  {
    slug: 'pmf-blind-spot',
    type: 'research',
    title: 'The PMF Blind Spot: 2026 Founder Research Study',
    excerpt:
      'How do early-stage founders measure product-market fit? Take our 3-minute anonymous survey and get access to the full research findings.',
    date: null,
    statusLabel: 'Open study',
    href: '/research/pmf-blind-spot',
    foundryFeatured: false,
    cover: cover('pmf-blind-spot'),
    coverAlt: 'An African businesswoman reviewing a report at a conference desk',
  },
  {
    slug: 'ceo-corner-issue-1',
    type: 'ceo-corner',
    title: 'The Hidden Cost of Your Last Technology Investment',
    excerpt:
      'Systems thinking for African enterprise leaders. Why the real cost of an ERP is the gap between what you paid for and what you received, and why that gap is not about the technology.',
    date: null,
    statusLabel: 'Issue #1',
    href: '/insights/ceo-corner/issue-1',
    foundryFeatured: false,
    cover: cover('ceo-corner-issue-1'),
    coverAlt: 'A man leading a group meeting around a table',
  },
]

/** Foundry-featured items, whitepaper first. */
export const foundryFeaturedItems = library
  .filter((i) => i.foundryFeatured)
  .sort((a, b) => Number(b.type === 'whitepaper') - Number(a.type === 'whitepaper'))

export function libraryItemBySlug(slug: string) {
  return library.find((i) => i.slug === slug)
}

/** "12 Oct 2026", formatted in UTC so server and client agree. */
export function formatLibraryDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function isLibraryFilter(v: unknown): v is LibraryFilter {
  return typeof v === 'string' && LIBRARY_TYPES.some((t) => t.value === v)
}
