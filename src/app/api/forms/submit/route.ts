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
        const { form_id, session_id, answers, duration_seconds } = body

        if (!form_id || !answers) {
            return NextResponse.json({ error: 'Missing form_id or answers' }, { status: 400 })
        }

        // 1. Insert Final Submission
        const { error: insertError } = await db()
            .from('form_submissions')
            .insert({
                form_id,
                answers,
                duration_seconds: duration_seconds || 0
            })

        if (insertError) {
            console.error('Submission Error:', insertError)
            return NextResponse.json({ error: insertError.message }, { status: 500 })
        }

        // 2. Clear Partial Submission State (if it exists)
        if (session_id) {
            await db()
                .from('form_partial_submissions')
                .delete()
                .match({ form_id, session_id })
        }

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
