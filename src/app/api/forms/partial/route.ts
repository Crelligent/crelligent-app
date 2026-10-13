import { NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Initialize a server-side Supabase client using Service Role for bypass RLS if needed,
// but for public insertions, anon key is fine.
// Created on first use, not at import, so a build never fails when these env vars are absent.
let client: SupabaseClient | null = null
function db() {
    if (!client) client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    return client
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { form_id, session_id, current_step, partial_answers } = body

        if (!form_id || !session_id) {
            return NextResponse.json({ error: 'Missing form_id or session_id' }, { status: 400 })
        }

        // Upsert the partial submission
        const { data, error } = await db()
            .from('form_partial_submissions')
            .upsert({
                form_id,
                session_id,
                current_step,
                partial_answers,
                last_active_at: new Date().toISOString()
            }, {
                onConflict: 'form_id, session_id'
            })
            .select()

        if (error) {
            console.error('Supabase Upsert Error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true, data }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
