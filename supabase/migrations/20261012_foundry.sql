-- =============================================================================
-- Crelligent Foundry: applications, engagements, invoices
-- Migration: 20261012_foundry.sql
--
-- NOT APPLIED AUTOMATICALLY. The lead reviews and applies this migration.
--
-- Access model: RLS is ON for every table and there are NO policies for the
-- anon or authenticated roles. The public site never touches these tables with
-- the anon key; all reads/writes go through Next.js server routes using
-- SUPABASE_SECRET_KEY (service role, which bypasses RLS).
--
-- Idempotent where reasonable: safe to re-run.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Shared: updated_at trigger
-- -----------------------------------------------------------------------------
create or replace function public.foundry_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- Invoice numbers: CF-<year>-<0001>
-- -----------------------------------------------------------------------------
create sequence if not exists public.foundry_invoice_number_seq start 1;

create or replace function public.foundry_next_invoice_number()
returns text
language sql
volatile
set search_path = ''
as $$
  select 'CF-' || to_char(now() at time zone 'Africa/Lagos', 'YYYY') || '-'
         || lpad(nextval('public.foundry_invoice_number_seq')::text, 4, '0');
$$;

-- Long random URL-safe token (64 hex chars, ~244 bits of randomness).
create or replace function public.foundry_new_pay_token()
returns text
language sql
volatile
set search_path = ''
as $$
  select replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');
$$;

-- -----------------------------------------------------------------------------
-- foundry_applications: the /foundry/apply intake form
-- Keep CHECK lists in sync with src/lib/foundry/schema.ts
-- -----------------------------------------------------------------------------
create table if not exists public.foundry_applications (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  founder_name      text not null check (char_length(founder_name) between 1 and 120),
  email             text not null check (char_length(email) between 3 and 254),
  phone             text check (phone is null or char_length(phone) <= 40),
  company_name      text not null check (char_length(company_name) between 1 and 160),
  website           text check (website is null or char_length(website) <= 300),
  country           text not null check (char_length(country) between 1 and 80),

  stage             text not null check (stage in ('idea', 'pre-seed', 'seed', 'series-a', 'series-b-plus')),
  team_size         text not null check (team_size in ('1', '2-5', '6-15', '16-50', '51-200', '200+')),
  path              text not null check (path in ('validate', 'venture')),
  package_interest  text not null check (package_interest in ('pmf', 'os-lite', 'foundry', 'venture', 'not-sure')),
  revenue_band      text check (revenue_band is null or revenue_band in
                      ('pre-revenue', 'under-1m', '1m-5m', '5m-20m', '20m-100m', 'over-100m', 'prefer-not')),
  goals             text not null check (char_length(goals) between 1 and 1500),
  heard_from        text not null check (heard_from in
                      ('referral', 'linkedin', 'email', 'search', 'event', 'social', 'velodesk', 'other')),
  heard_from_other  text check (heard_from_other is null or char_length(heard_from_other) <= 200),

  consent           boolean not null check (consent = true),
  consent_at        timestamptz not null default now(),

  -- Internal pipeline status (admin app)
  status            text not null default 'new' check (status in
                      ('new', 'contacted', 'discovery-scheduled', 'proposal-sent', 'won', 'lost', 'spam')),
  user_agent        text,
  notes             text
);

create index if not exists foundry_applications_status_idx     on public.foundry_applications (status);
create index if not exists foundry_applications_created_at_idx on public.foundry_applications (created_at desc);
create index if not exists foundry_applications_email_idx      on public.foundry_applications (lower(email));

drop trigger if exists foundry_applications_updated_at on public.foundry_applications;
create trigger foundry_applications_updated_at
  before update on public.foundry_applications
  for each row execute function public.foundry_set_updated_at();

-- -----------------------------------------------------------------------------
-- foundry_engagements: agreed scope and fee after the discovery call
-- -----------------------------------------------------------------------------
create table if not exists public.foundry_engagements (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  application_id    uuid references public.foundry_applications (id) on delete set null,

  client_name       text not null,
  client_email      text not null,
  company_name      text,

  package_id        text not null check (package_id in ('pmf', 'os-lite', 'foundry', 'venture')),
  title             text,                       -- e.g. "Foundry Package: Acme Ltd"
  currency          text not null check (currency in ('NGN', 'USD')),
  total_minor       bigint not null check (total_minor > 0),   -- kobo / cents
  deposit_percent   integer not null default 50 check (deposit_percent between 1 and 100),

  status            text not null default 'draft' check (status in
                      ('draft', 'active', 'delivered', 'completed', 'cancelled')),
  notes             text
);

create index if not exists foundry_engagements_status_idx      on public.foundry_engagements (status);
create index if not exists foundry_engagements_created_at_idx  on public.foundry_engagements (created_at desc);
create index if not exists foundry_engagements_application_idx on public.foundry_engagements (application_id);

drop trigger if exists foundry_engagements_updated_at on public.foundry_engagements;
create trigger foundry_engagements_updated_at
  before update on public.foundry_engagements
  for each row execute function public.foundry_set_updated_at();

-- -----------------------------------------------------------------------------
-- foundry_invoices: deposit (50% on signing) and balance (50% on delivery)
-- -----------------------------------------------------------------------------
create table if not exists public.foundry_invoices (
  id                      uuid primary key default gen_random_uuid(),
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),

  engagement_id           uuid not null references public.foundry_engagements (id) on delete restrict,
  invoice_number          text not null unique default public.foundry_next_invoice_number(),
  kind                    text not null check (kind in ('deposit', 'balance')),
  description             text,
  amount_minor            bigint not null check (amount_minor > 0),   -- kobo / cents
  currency                text not null check (currency in ('NGN', 'USD')),
  status                  text not null default 'draft' check (status in ('draft', 'sent', 'paid', 'void')),
  due_date                date,

  pay_token               text not null unique default public.foundry_new_pay_token()
                            check (char_length(pay_token) >= 32),

  -- Paystack: latest reference generated for this invoice (CF-...).
  paystack_reference      text unique,
  paystack_transaction_id bigint,
  payment_channel         text,
  paid_amount_minor       bigint,
  paid_currency           text,
  paid_at                 timestamptz,

  sent_at                 timestamptz,
  voided_at               timestamptz,
  notes                   text,

  constraint foundry_invoices_one_per_kind unique (engagement_id, kind),
  constraint foundry_invoices_paid_has_paid_at check (status <> 'paid' or paid_at is not null)
);

-- pay_token and paystack_reference already have unique indexes via UNIQUE.
create index if not exists foundry_invoices_status_idx      on public.foundry_invoices (status);
create index if not exists foundry_invoices_created_at_idx  on public.foundry_invoices (created_at desc);
create index if not exists foundry_invoices_engagement_idx  on public.foundry_invoices (engagement_id);

drop trigger if exists foundry_invoices_updated_at on public.foundry_invoices;
create trigger foundry_invoices_updated_at
  before update on public.foundry_invoices
  for each row execute function public.foundry_set_updated_at();

-- -----------------------------------------------------------------------------
-- Row Level Security: ON, no anon/authenticated policies (server-only access)
-- -----------------------------------------------------------------------------
alter table public.foundry_applications enable row level security;
alter table public.foundry_engagements  enable row level security;
alter table public.foundry_invoices     enable row level security;

revoke all on public.foundry_applications from anon, authenticated;
revoke all on public.foundry_engagements  from anon, authenticated;
revoke all on public.foundry_invoices     from anon, authenticated;
revoke all on sequence public.foundry_invoice_number_seq from anon, authenticated;
revoke execute on function public.foundry_next_invoice_number() from anon, authenticated, public;
revoke execute on function public.foundry_new_pay_token()       from anon, authenticated, public;

grant all on public.foundry_applications, public.foundry_engagements, public.foundry_invoices to service_role;
grant usage, select on sequence public.foundry_invoice_number_seq to service_role;
grant execute on function public.foundry_next_invoice_number(), public.foundry_new_pay_token() to service_role;

-- =============================================================================
-- ADMIN EXAMPLE (commented out): create an engagement + deposit/balance invoices
-- after the discovery call, then get the pay links. Run in the SQL editor.
-- Amounts are in the lowest unit: NGN kobo (x100), USD cents (x100).
-- Example: agreed fee NGN 1,500,000 => total_minor = 150000000.
-- =============================================================================
-- with eng as (
--   insert into public.foundry_engagements
--     (application_id, client_name, client_email, company_name, package_id, title,
--      currency, total_minor, deposit_percent, status)
--   values
--     (null,                         -- or the foundry_applications.id
--      'Founder Name', 'founder@example.com', 'Example Ltd',
--      'foundry', 'Foundry Package: Example Ltd',
--      'NGN', 150000000, 50, 'active')
--   returning id, currency, total_minor, deposit_percent
-- ),
-- inv as (
--   insert into public.foundry_invoices (engagement_id, kind, description, amount_minor, currency, status, sent_at)
--   select id, 'deposit', 'Deposit (50% on signing)',
--          round(total_minor * deposit_percent / 100.0)::bigint, currency, 'sent', now()
--   from eng
--   union all
--   select id, 'balance', 'Balance (50% on delivery)',
--          total_minor - round(total_minor * deposit_percent / 100.0)::bigint, currency, 'draft', null
--   from eng
--   returning invoice_number, kind, amount_minor, currency, status, pay_token
-- )
-- select invoice_number, kind, amount_minor, currency, status,
--        'https://crelligent.com/foundry/pay/' || pay_token as pay_link
-- from inv;
--
-- On delivery, release the balance invoice:
-- update public.foundry_invoices set status = 'sent', sent_at = now()
--  where engagement_id = '<engagement id>' and kind = 'balance' and status = 'draft'
--  returning invoice_number, 'https://crelligent.com/foundry/pay/' || pay_token as pay_link;
-- =============================================================================
