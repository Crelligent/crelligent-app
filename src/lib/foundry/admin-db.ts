/**
 * Server-only Supabase client for the foundry_* tables.
 * Uses SUPABASE_SECRET_KEY (service role; bypasses RLS). Never import this from a client component.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

if (typeof window !== 'undefined') {
  throw new Error('src/lib/foundry/admin-db.ts is server-only and must not be imported in client code.')
}

let cached: SupabaseClient | null = null

export function getFoundryAdminDb(): SupabaseClient {
  if (cached) return cached
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  const missing = [!url && 'NEXT_PUBLIC_SUPABASE_URL', !key && 'SUPABASE_SECRET_KEY'].filter(Boolean)
  if (missing.length) {
    throw new Error(`Foundry DB is not configured: missing env ${missing.join(', ')}`)
  }
  cached = createClient(url!, key!, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
  return cached
}
