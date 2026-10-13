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
        const { form_id, file_name, file_type } = body

        if (!form_id || !file_name) {
            return NextResponse.json({ error: 'Missing form_id or file_name' }, { status: 400 })
        }

        const filePath = `${form_id}/${Date.now()}_${file_name}`

        // Generate a pre-signed URL for direct upload from the browser
        const { data, error } = await db().storage
            .from('form_uploads')
            .createSignedUploadUrl(filePath)

        if (error) {
            console.error('Storage Error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ 
            success: true, 
            upload_url: data.signedUrl,
            file_path: filePath,
            public_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/form_uploads/${filePath}`
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
