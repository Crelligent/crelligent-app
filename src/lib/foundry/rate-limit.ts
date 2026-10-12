/**
 * Simple in-memory sliding-window rate limiter. Per server instance only (good enough for a form;
 * serverless instances each keep their own window).
 */
const buckets = new Map<string, number[]>()

export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now()) {
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    buckets.set(key, recent)
    const retryAfterSeconds = Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000))
    return { allowed: false as const, retryAfterSeconds }
  }
  recent.push(now)
  buckets.set(key, recent)
  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 5000) {
    for (const [k, ts] of buckets) if (!ts.some((t) => now - t < windowMs)) buckets.delete(k)
  }
  return { allowed: true as const }
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip')?.trim() || 'unknown'
}
