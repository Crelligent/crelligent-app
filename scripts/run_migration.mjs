import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://jvbdlzbezrvlhfszxnxk.supabase.co';
const PROJECT_REF = 'jvbdlzbezrvlhfszxnxk';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SECRET_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YmRsemJlenJ2bGhmc3p4bnhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjczNzgxNCwiZXhwIjoyMDk4MzEzODE0fQ.Kq52UyfrevhqEapH92HkbYfuOQDYBzp_IH4nAmVaH8U';
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;

// Default search paths for migration.sql
const potentialSqlPaths = [
  path.join(__dirname, 'migration.sql'),
  'C:\\Users\\OWNER\\.gemini\\antigravity\\brain\\1e34fbf1-00ce-48bd-ad1c-6bd1c80fef08\\scratch\\migration.sql',
  path.join(__dirname, '..', 'migration.sql')
];

const sqlFilePath = potentialSqlPaths.find(p => fs.existsSync(p)) || potentialSqlPaths[1];

async function main() {
  console.log(`[Migration] Reading SQL from ${sqlFilePath}...`);
  if (!fs.existsSync(sqlFilePath)) {
    console.error(`[Error] SQL file not found at ${sqlFilePath}`);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
  console.log(`[Migration] Loaded SQL (${sqlContent.length} bytes)`);

  // Method 1: If Supabase Access Token is available, use Supabase Management API
  if (ACCESS_TOKEN) {
    console.log('[Migration] Attempting execution via Supabase Management API (/database/query)...');
    try {
      const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: sqlContent })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(`Management API error (${res.status}): ${JSON.stringify(data)}`);
      }

      console.log('[Migration] Success via Management API:', data);
      return;
    } catch (err) {
      console.warn('[Migration] Management API failed:', err.message);
    }
  }

  // Method 2: Try project pg-meta endpoint if available
  console.log('[Migration] Attempting execution via Supabase project endpoint...');
  try {
    const res = await fetch(`${SUPABASE_URL}/pg/query`, {
      method: 'POST',
      headers: {
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: sqlContent })
    });

    if (res.ok) {
      const data = await res.json();
      console.log('[Migration] Success via project pg endpoint:', data);
      return;
    } else {
      console.log(`[Migration] /pg/query endpoint returned ${res.status}: ${res.statusText}`);
    }
  } catch (err) {
    console.log('[Migration] Project pg endpoint not accessible:', err.message);
  }

  // Method 3: Try exec_sql RPC function if it exists on the instance
  console.log('[Migration] Attempting execution via Supabase RPC exec_sql...');
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({ query: sqlContent })
    });

    if (res.ok) {
      const data = await res.json();
      console.log('[Migration] Success via exec_sql RPC:', data);
      return;
    } else {
      const errorText = await res.text();
      console.log(`[Migration] RPC exec_sql returned ${res.status}: ${errorText}`);
    }
  } catch (err) {
    console.log('[Migration] RPC exec_sql failed:', err.message);
  }

  console.log('\n--- MIGRATION RUNNER SUMMARY ---');
  console.log('To run this migration, you can:');
  console.log('1. Copy the contents of migration.sql into Supabase Dashboard -> SQL Editor:');
  console.log(`   https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new`);
  console.log('2. Or run via Supabase CLI with personal access token:');
  console.log(`   $env:SUPABASE_ACCESS_TOKEN="<token>"; npx supabase db push`);
  console.log('3. Or connect directly via Postgres connection string with the DB password.');
}

main().catch(err => {
  console.error('[Fatal Error]', err);
  process.exit(1);
});
