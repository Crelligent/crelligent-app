/**
 * Small sliding-window rate limiter, in memory, per server instance.
 *
 * On Vercel each warm function instance keeps its own map, so this is a
 * best-effort brake on bursts from one IP, not a global quota. For a hard limit
 * add a Vercel Firewall rate-limit rule on /api/notify and /api/institutional.
 * Pure module (no Next imports) so it can be unit-tested.
 */

const buckets = new Map<string, number[]>()
const MAX_KEYS = 5000

export interface RateLimitResult {
  allowed: boolean
  /** Seconds until the oldest hit leaves the window (0 when allowed). */
  retryAfter: number
}

export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now()): RateLimitResult {
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    buckets.set(key, recent)
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000)) }
  }
  recent.push(now)
  buckets.set(key, recent)
  if (buckets.size > MAX_KEYS) prune(now, windowMs)
  return { allowed: true, retryAfter: 0 }
}

function prune(now: number, windowMs: number) {
  buckets.forEach((hits, k) => {
    if (!hits.length || now - hits[hits.length - 1] >= windowMs) buckets.delete(k)
  })
  // Still too big (many active IPs): drop the oldest keys.
  if (buckets.size > MAX_KEYS) {
    const excess = buckets.size - MAX_KEYS
    Array.from(buckets.keys())
      .slice(0, excess)
      .forEach((k) => buckets.delete(k))
  }
}

/** Test helper. */
export function _resetRateLimit() {
  buckets.clear()
}
