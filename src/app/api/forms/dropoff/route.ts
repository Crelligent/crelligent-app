import { NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Created on first use, not at import, so a build never fails when these env vars are absent.
let client: SupabaseClient | null = null
function db() {
    if (!client) client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    return client
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { form_id, session_id, events } = body
        // events: Array of { field_id, event_type, time_spent_ms }

        if (!form_id || !session_id || !events || !Array.isArray(events)) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
        }

        // Batch insert drop-off telemetry events
        const payload = events.map(evt => ({
            form_id,
            session_id,
            field_id: evt.field_id,
            event_type: evt.event_type,
            time_spent_ms: evt.time_spent_ms || 0
        }))

        const { error } = await db()
            .from('form_dropoff_events')
            .insert(payload)

        if (error) {
            console.error('Supabase Insert Error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
