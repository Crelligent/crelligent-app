/**
 * Minimal server-only Supabase REST (PostgREST) client using plain fetch.
 * Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY (service_role).
 * Never import this from a client component: the secret key must stay on the server.
 */

export interface SupabaseConfig {
  url: string
  key: string
}

/** Returns the config, or null when the env is not set (callers degrade safely). */
export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) return null
  return { url: url.replace(/\/+$/, ''), key }
}

export function supabaseHeaders(cfg: SupabaseConfig, extra: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = { apikey: cfg.key, 'Content-Type': 'application/json', ...extra }
  // Legacy JWT service keys also need Authorization; new sb_secret_ keys use apikey only.
  if (cfg.key.startsWith('eyJ')) headers.Authorization = `Bearer ${cfg.key}`
  return headers
}

/** Next.js fetch options: either no caching or a revalidate window in seconds. */
export type CacheMode = { revalidate: number; tags?: string[] } | 'no-store'

export function restFetch(
  cfg: SupabaseConfig,
  path: string,
  init: { method?: string; body?: unknown; headers?: Record<string, string>; cache: CacheMode; timeoutMs?: number },
): Promise<Response> {
  const nextOpts =
    init.cache === 'no-store'
      ? { cache: 'no-store' as const }
      : { next: { revalidate: init.cache.revalidate, tags: init.cache.tags } }
  return fetch(`${cfg.url}/rest/v1/${path.replace(/^\/+/, '')}`, {
    method: init.method ?? 'GET',
    headers: supabaseHeaders(cfg, init.headers),
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    signal: AbortSignal.timeout(init.timeoutMs ?? 8000),
    ...nextOpts,
  })
}

/** PostgREST error body, when there is one. */
export interface PostgrestError {
  code?: string
  message?: string
}

export async function readPostgrestError(res: Response): Promise<PostgrestError> {
  try {
    const body = (await res.json()) as PostgrestError
    return { code: body?.code, message: body?.message }
  } catch {
    return {}
  }
}

/** True when PostgREST says the table/view/function does not exist (SQL not applied yet). */
export function isMissingObject(status: number, err: PostgrestError): boolean {
  return status === 404 || err.code === 'PGRST202' || err.code === 'PGRST205' || err.code === '42P01' || err.code === '42883'
}
