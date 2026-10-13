import { NextResponse } from 'next/server'
import { EDITION_REVALIDATE_SECONDS, getPublishedEdition } from '@/lib/aehi/editions'

// Cached for 10 minutes (ISR).
export const revalidate = 600

/**
 * GET /api/edition: { edition: PublishedEdition | null }.
 * null until an edition is published in the database. Render nothing while null.
 */
export async function GET() {
  const edition = await getPublishedEdition()
  return NextResponse.json(
    { edition },
    {
      headers: {
        'Cache-Control': `public, s-maxage=${EDITION_REVALIDATE_SECONDS}, stale-while-revalidate=${EDITION_REVALIDATE_SECONDS * 6}`,
      },
    },
  )
}
