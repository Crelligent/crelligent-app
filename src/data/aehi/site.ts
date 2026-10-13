import type { Metadata } from 'next'

export const SITE_URL = 'https://crelligent.com'
export const SITE_NAME = 'African Enterprise Health Index (AEHI)'

/** One-page AEHI: every item is a section on /aehi (ids match the section components). */
export const NAV_LINKS = [
  { label: 'Overview', href: '/aehi' },
  { label: 'Methodology', href: '/aehi#methodology' },
  { label: 'Take part', href: '/aehi#take-part' },
  { label: 'Barometer', href: '/aehi#barometer' },
  { label: 'Report', href: '/aehi#report' },
  { label: 'Research', href: '/aehi#research' },
  { label: 'Partners', href: '/aehi#partners' },
] as const

export const SECTION_IDS = ['methodology', 'take-part', 'barometer', 'report', 'research', 'partners'] as const

/** Per-page metadata with canonical URL and Open Graph / Twitter fields (DESIGN.md 8). */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string
  description: string
  path: string
  absoluteTitle?: boolean
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | AEHI`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_GB',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
  }
}
