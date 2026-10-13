import { NextResponse } from 'next/server'
import { getPublicStats, STATS_REVALIDATE_SECONDS } from '@/lib/aehi/stats'

// Cached for 10 minutes (ISR). Never returns a made-up figure: unknown = null.
export const revalidate = 600

/** GET /api/stats: { enterprisesAssessed, assessmentsCompleted, updatedAt, status } */
export async function GET() {
  const stats = await getPublicStats()
  return NextResponse.json(stats, {
    headers: {
      'Cache-Control': `public, s-maxage=${STATS_REVALIDATE_SECONDS}, stale-while-revalidate=${STATS_REVALIDATE_SECONDS * 6}`,
    },
  })
}
