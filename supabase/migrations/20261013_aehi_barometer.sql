-- =============================================================================
-- AEHI Executive Barometer: responses table. 13 Oct 2026. Idempotent.
--
-- Run in the Supabase SQL editor for crelligent-db (jvbdlzbezrvlhfszxnxk).
--
-- Access model (same as the rest of AEHI): RLS on, NO policies, anon/authenticated
-- privileges revoked. Only the site's server code (SUPABASE_SECRET_KEY, service_role)
-- can read or write. Individual responses are never exposed; the site publishes
-- aggregates only, once a wave is published and the sample is large enough.
-- =============================================================================

begin;

create table if not exists public.aehi_barometer_responses (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  wave              text not null check (wave ~ '^[0-9]{4}-w[0-9]{1,2}$'),
  role              text not null check (char_length(role) <= 80),
  sector            text not null check (char_length(sector) <= 80),
  employees_band    text not null check (char_length(employees_band) <= 40),
  revenue_band      text not null check (char_length(revenue_band) <= 60),
  location          text not null check (char_length(location) <= 60),
  -- Full validated answers (profile + four blocks), as sent by POST /api/aehi/barometer.
  answers           jsonb not null check (jsonb_typeof(answers) = 'object'),
  -- Enterprise Confidence Index for this response, 0-100 (recomputed server-side).
  confidence_index  numeric(5,1) not null check (confidence_index between 0 and 100),
  -- Counts towards published figures (senior role, Nigeria, mid-market). See src/lib/aehi/barometer.ts.
  eligible          boolean not null,
  email             text check (email is null or char_length(email) between 3 and 254),
  wants_results     boolean not null default false,
  wants_diagnostic  boolean not null default false,
  consent           boolean not null check (consent = true),
  source            text check (source is null or source ~ '^[a-z0-9_-]{1,40}$'),
  status            text not null default 'valid' check (status in ('valid', 'excluded')),
  user_agent        text
);

-- One response per email per wave (anonymous responses are allowed and not deduplicated).
create unique index if not exists aehi_barometer_wave_email_key
  on public.aehi_barometer_responses (wave, lower(email))
  where email is not null;

create index if not exists aehi_barometer_wave_idx
  on public.aehi_barometer_responses (wave, eligible);

alter table public.aehi_barometer_responses enable row level security;
revoke all on public.aehi_barometer_responses from anon, authenticated;
grant all on public.aehi_barometer_responses to service_role;

commit;

-- Useful checks (read-only):
--   select wave, count(*) filter (where eligible) as eligible, count(*) as total
--     from public.aehi_barometer_responses group by wave;
--   To exclude a response from published figures (e.g. a test or duplicate):
--   update public.aehi_barometer_responses set eligible = false, status = 'excluded' where id = '<id>';
