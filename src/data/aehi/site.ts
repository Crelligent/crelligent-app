import type { Metadata } from 'next'

export const SITE_URL = 'https://crelligent.com'
export const SITE_NAME = 'African Enterprise Health Index (AEHI)'

export const NAV_LINKS = [
  { label: 'Overview', href: '/aehi' },
  { label: 'Methodology', href: '/aehi/methodology' },
  { label: 'Take part', href: '/aehi/contribute' },
  { label: 'Barometer', href: '/aehi/barometer' },
  { label: 'Report', href: '/aehi/report' },
  { label: 'Data', href: '/aehi/data' },
  { label: 'Partners', href: '/aehi/institutional' },
] as const

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
