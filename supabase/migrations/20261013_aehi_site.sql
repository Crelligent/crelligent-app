-- =============================================================================
-- AEHI site (aehi.crelligent.com): combined, idempotent migration. 12 Oct 2026.
--
-- Safe to run more than once. Run it in the Supabase SQL editor for project
-- crelligent-db (jvbdlzbezrvlhfszxnxk), or `psql -f` against that database.
--
-- Contents
--   1. aehi_interest            "notify me" sign-ups and partner enquiries (site forms)
--   2. aehi_assessments_v       cleaned view over aehi_scores (what the crelligent.com
--                               diagnostic writes), one row per completed assessment
--   3. aehi_public_stats()      honest live counts for GET /api/stats
--   4. aehi_editions            published-editions model (OFF until a row is 'published')
--      aehi_edition_aggregates  frozen, k-anonymous aggregates per edition (n >= 10)
--      aehi_compute_edition()   fills aggregates for a DRAFT edition
--      aehi_published_aggregates_v  read view: published editions only, n >= threshold
--
-- Access model: every object is service_role only. RLS is enabled on every table
-- with NO policies, and anon/authenticated have all privileges revoked, so the
-- public Supabase API (publishable/anon key) can read or write nothing here.
-- The AEHI site's server code uses SUPABASE_SECRET_KEY (service_role).
--
-- Existing objects this file relies on but does NOT change:
--   public.aehi_scores        written by crelligent.com/diagnostic (crelligent-app)
-- Existing objects this file deliberately ignores:
--   public.aehi_enterprises, public.aehi_os_scores, public.aehi_vitals_scores
--   (all rows were created in a single batch on 2026-10-01; they are seed rows,
--   not diagnostic submissions, so they never feed counts or editions.)
-- =============================================================================

begin;

-- -----------------------------------------------------------------------------
-- 1. aehi_interest (replaces supabase/aehi_interest.sql; table already exists
--    in the live DB with exactly this base definition, so CREATE is a no-op there)
-- -----------------------------------------------------------------------------
create table if not exists public.aehi_interest (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  kind          text not null check (kind in ('edition_notify', 'partner_inquiry')),
  name          text not null check (char_length(name) between 1 and 160),
  email         text not null check (char_length(email) between 3 and 254),
  organisation  text check (organisation is null or char_length(organisation) <= 160),
  role          text check (role is null or char_length(role) <= 120),
  org_type      text check (org_type is null or char_length(org_type) <= 80),
  interest      text check (interest is null or char_length(interest) <= 80),
  message       text check (message is null or char_length(message) <= 1500),
  country       text check (country is null or char_length(country) <= 80),
  consent       boolean not null check (consent = true),
  status        text not null default 'new' check (status in ('new', 'contacted', 'closed', 'spam')),
  user_agent    text
);

-- Where on the site the form was submitted (e.g. 'report', 'home'). Optional.
alter table public.aehi_interest add column if not exists source text;
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'aehi_interest_source_chk') then
    alter table public.aehi_interest
      add constraint aehi_interest_source_chk check (source is null or source ~ '^[a-z0-9_-]{1,40}$');
  end if;
end $$;

-- One "notify me" row per email address (case-insensitive). Partner enquiries
-- get NULL here, and NULLs never collide, so one person can send several enquiries.
-- The API treats a unique violation on this key as success (idempotent sign-up).
-- NOTE: if duplicate edition_notify emails already exist, delete the extras first
-- or the unique index below will fail to build.
alter table public.aehi_interest
  add column if not exists notify_key text
  generated always as (case when kind = 'edition_notify' then lower(email) end) stored;
create unique index if not exists aehi_interest_notify_key_uidx on public.aehi_interest (notify_key);

create index if not exists aehi_interest_created_idx on public.aehi_interest (created_at desc);
create index if not exists aehi_interest_kind_status_idx on public.aehi_interest (kind, status);

alter table public.aehi_interest enable row level security;
revoke all on public.aehi_interest from anon, authenticated;
grant all on public.aehi_interest to service_role;

-- -----------------------------------------------------------------------------
-- 2. aehi_assessments_v: cleaned view of completed diagnostic submissions
--
-- Source: public.aehi_scores, written by crelligent.com/diagnostic
-- (crelligent-app src/app/actions/aehi.ts). One row = one completed diagnostic.
--
-- Scale used by the diagnostic today: 15 questions, 3 per layer, answers worth
-- 0 / 5 / 10. So l1_score..l5_score are 0-30 and total_score is 0-100 (unweighted
-- sum of all answers / 150 * 100). This view rescales layers to the published
-- 0-10 scale (layer / 3). If the diagnostic changes its scale, change it here.
--
-- Test-row rule (documented in BACKEND.md): a row is excluded when
--   * source is not 'website_diagnostic', or
--   * the email is on Crelligent's own domain (crelligent.com, any subdomain), or
--     on a reserved example domain (example.com/.org/.net, RFC 2606), or
--   * any score is outside the diagnostic's possible range (corrupt row).
-- There is no other reliable test marker, so nothing else is excluded.
-- -----------------------------------------------------------------------------
create or replace view public.aehi_assessments_v
with (security_invoker = true) as
select
  s.id,
  s.created_at,
  lower(btrim(regexp_replace(s.company_name, '\s+', ' ', 'g')))  as company_key,
  nullif(btrim(s.country), '')                                     as country,
  nullif(btrim(s.industry), '')                                    as sector,
  s.total_score::numeric                                           as composite,
  round(s.l1_score / 3.0, 2)                                       as l1,
  round(s.l2_score / 3.0, 2)                                       as l2,
  round(s.l3_score / 3.0, 2)                                       as l3,
  round(s.l4_score / 3.0, 2)                                       as l4,
  round(s.l5_score / 3.0, 2)                                       as l5
from public.aehi_scores s
where s.source = 'website_diagnostic'
  and s.email !~* '@([a-z0-9-]+\.)*crelligent\.com$'
  and s.email !~* '@example\.(com|org|net)$'
  and btrim(s.company_name) <> ''
  and s.total_score between 0 and 100
  and s.l1_score between 0 and 30 and s.l2_score between 0 and 30
  and s.l3_score between 0 and 30 and s.l4_score between 0 and 30
  and s.l5_score between 0 and 30;

revoke all on public.aehi_assessments_v from anon, authenticated;
grant select on public.aehi_assessments_v to service_role;

-- -----------------------------------------------------------------------------
-- 3. aehi_public_stats(): the only live figures the site may show
--   enterprises_assessed  = distinct enterprises (normalised company name)
--   assessments_completed = completed diagnostics (an enterprise may retake it)
-- -----------------------------------------------------------------------------
create or replace function public.aehi_public_stats()
returns json
language sql
stable
security invoker
set search_path = public
as $$
  select json_build_object(
    'enterprises_assessed',  count(distinct a.company_key),
    'assessments_completed', count(*)
  )
  from public.aehi_assessments_v a;
$$;

revoke all on function public.aehi_public_stats() from public, anon, authenticated;
grant execute on function public.aehi_public_stats() to service_role;

-- -----------------------------------------------------------------------------
-- 4. Published-editions model. OFF by default: the site shows nothing from it
--    until a row in aehi_editions has status = 'published'.
-- -----------------------------------------------------------------------------
create table if not exists public.aehi_editions (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique check (slug ~ '^[a-z0-9-]{3,40}$'),   -- e.g. 'q4-2026'
  label               text not null check (char_length(label) between 2 and 40), -- e.g. 'Q4 2026'
  period_start        date not null,
  period_end          date not null,
  country             text,                    -- NULL = all countries; e.g. 'Nigeria'
  status              text not null default 'draft' check (status in ('draft', 'published', 'withdrawn')),
  min_group_size      integer not null default 10 check (min_group_size >= 10),
  methodology_version text,
  summary             text check (summary is null or char_length(summary) <= 2000),
  report_url          text check (report_url is null or report_url ~ '^https://'),
  computed_at         timestamptz,
  published_at        timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  constraint aehi_editions_period_chk check (period_end >= period_start),
  constraint aehi_editions_published_chk
    check (status <> 'published' or (published_at is not null and computed_at is not null))
);

create table if not exists public.aehi_edition_aggregates (
  edition_id        uuid not null references public.aehi_editions (id) on delete cascade,
  group_type        text not null check (group_type in ('overall', 'sector')),
  group_key         text not null check (char_length(group_key) between 1 and 120), -- 'all' for overall
  n                 integer not null check (n >= 10),   -- hard k-anonymity floor
  composite_mean    numeric(5,2) not null check (composite_mean between 0 and 100),
  composite_median  numeric(5,2) not null check (composite_median between 0 and 100),
  composite_p25     numeric(5,2) not null check (composite_p25 between 0 and 100),
  composite_p75     numeric(5,2) not null check (composite_p75 between 0 and 100),
  l1_mean           numeric(4,2) not null check (l1_mean between 0 and 10),
  l2_mean           numeric(4,2) not null check (l2_mean between 0 and 10),
  l3_mean           numeric(4,2) not null check (l3_mean between 0 and 10),
  l4_mean           numeric(4,2) not null check (l4_mean between 0 and 10),
  l5_mean           numeric(4,2) not null check (l5_mean between 0 and 10),
  weakest_layer     text not null check (weakest_layer in ('L1', 'L2', 'L3', 'L4', 'L5')),
  primary key (edition_id, group_type, group_key)
);

alter table public.aehi_editions enable row level security;
alter table public.aehi_edition_aggregates enable row level security;
revoke all on public.aehi_editions, public.aehi_edition_aggregates from anon, authenticated;
grant all on public.aehi_editions, public.aehi_edition_aggregates to service_role;

-- Fill (or refill) aggregates for a DRAFT edition from aehi_assessments_v.
-- * Uses each enterprise's latest assessment inside [period_start, period_end].
-- * Writes only groups with n >= the edition's min_group_size (never below 10).
-- * Refuses to touch an edition that is already published or withdrawn.
-- Returns the number of groups written (0 means nothing is publishable yet).
create or replace function public.aehi_compute_edition(p_slug text)
returns integer
language plpgsql
security invoker
set search_path = public
as $$
declare
  e        public.aehi_editions%rowtype;
  k        integer;
  written  integer;
begin
  select * into e from public.aehi_editions where slug = p_slug for update;
  if not found then
    raise exception 'AEHI edition % not found', p_slug;
  end if;
  if e.status <> 'draft' then
    raise exception 'AEHI edition % is %, only draft editions can be recomputed', p_slug, e.status;
  end if;
  k := greatest(10, e.min_group_size);

  delete from public.aehi_edition_aggregates where edition_id = e.id;

  with latest as (
    select distinct on (a.company_key) a.*
    from public.aehi_assessments_v a
    where a.created_at >= e.period_start
      and a.created_at <  e.period_end + 1
      and (e.country is null or lower(a.country) = lower(e.country))
    order by a.company_key, a.created_at desc
  ),
  grouped as (
    select 'overall'::text as group_type, 'all'::text as group_key, l.* from latest l
    union all
    select 'sector', l.sector, l.* from latest l where l.sector is not null
  ),
  agg as (
    select
      group_type, group_key,
      count(*)::int                                                         as n,
      round(avg(composite), 2)                                              as composite_mean,
      round(percentile_cont(0.5)  within group (order by composite)::numeric, 2) as composite_median,
      round(percentile_cont(0.25) within group (order by composite)::numeric, 2) as composite_p25,
      round(percentile_cont(0.75) within group (order by composite)::numeric, 2) as composite_p75,
      round(avg(l1), 2) as l1_mean, round(avg(l2), 2) as l2_mean, round(avg(l3), 2) as l3_mean,
      round(avg(l4), 2) as l4_mean, round(avg(l5), 2) as l5_mean
    from grouped
    group by group_type, group_key
    having count(*) >= k
  )
  insert into public.aehi_edition_aggregates (
    edition_id, group_type, group_key, n,
    composite_mean, composite_median, composite_p25, composite_p75,
    l1_mean, l2_mean, l3_mean, l4_mean, l5_mean, weakest_layer)
  select
    e.id, group_type, group_key, n,
    composite_mean, composite_median, composite_p25, composite_p75,
    l1_mean, l2_mean, l3_mean, l4_mean, l5_mean,
    -- lowest mean wins; ties go to the lower layer number
    case least(l1_mean, l2_mean, l3_mean, l4_mean, l5_mean)
      when l1_mean then 'L1' when l2_mean then 'L2' when l3_mean then 'L3'
      when l4_mean then 'L4' else 'L5' end
  from agg;

  get diagnostics written = row_count;

  update public.aehi_editions
     set computed_at = now(), updated_at = now()
   where id = e.id;

  return written;
end;
$$;

revoke all on function public.aehi_compute_edition(text) from public, anon, authenticated;
grant execute on function public.aehi_compute_edition(text) to service_role;

-- Read view: aggregates of PUBLISHED editions only, re-applying the threshold.
create or replace view public.aehi_published_aggregates_v
with (security_invoker = true) as
select
  e.slug, e.label, e.period_start, e.period_end, e.country, e.published_at,
  greatest(10, e.min_group_size) as min_group_size,
  g.group_type, g.group_key, g.n,
  g.composite_mean, g.composite_median, g.composite_p25, g.composite_p75,
  g.l1_mean, g.l2_mean, g.l3_mean, g.l4_mean, g.l5_mean, g.weakest_layer
from public.aehi_editions e
join public.aehi_edition_aggregates g on g.edition_id = e.id
where e.status = 'published'
  and g.n >= greatest(10, e.min_group_size);

revoke all on public.aehi_published_aggregates_v from anon, authenticated;
grant select on public.aehi_published_aggregates_v to service_role;

commit;

-- =============================================================================
-- Publishing an edition later (run by hand, after review). Example:
--
--   insert into public.aehi_editions (slug, label, period_start, period_end, country, methodology_version)
--   values ('q4-2026', 'Q4 2026', '2026-10-01', '2026-12-31', 'Nigeria', 'diagnostic-v1-15q')
--   on conflict (slug) do nothing;
--
--   select public.aehi_compute_edition('q4-2026');        -- returns number of groups written
--   select * from public.aehi_edition_aggregates
--    where edition_id = (select id from public.aehi_editions where slug = 'q4-2026');  -- review
--
--   update public.aehi_editions
--      set status = 'published', published_at = now(), updated_at = now()
--    where slug = 'q4-2026' and status = 'draft';
--
-- To take it down again:  update public.aehi_editions set status = 'withdrawn', updated_at = now() where slug = 'q4-2026';
-- =============================================================================
