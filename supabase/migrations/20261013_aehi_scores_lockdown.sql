-- =============================================================================
-- OPTIONAL but recommended: lock down public.aehi_scores. 12 Oct 2026.
-- Review before applying. Idempotent.
--
-- Why: as of 12 Oct 2026, aehi_scores (written by crelligent.com/diagnostic) has
--   * policy "Allow public inserts to AEHI scores"  INSERT, role public, WITH CHECK (true)
--       -> anyone holding the publishable/anon key (it ships in browser bundles)
--          can insert fake diagnostic rows, which would inflate the live
--          "enterprises assessed" figure on aehi.crelligent.com.
--   * policy "Allow authenticated read access"       SELECT, role authenticated, USING (true)
--       -> any signed-in user of this Supabase project can read every row,
--          including respondents' emails and company names.
--
-- Nothing needs these policies: crelligent-app writes and reads aehi_scores
-- server-side with SUPABASE_SECRET_KEY (service_role bypasses RLS), and the AEHI
-- site does the same. After this, only service_role can touch the table.
--
-- Not changed here (flagged only): aehi_enterprises, aehi_os_scores and
-- aehi_vitals_scores are publicly readable; they hold seed rows, not diagnostic data.
-- =============================================================================

begin;

drop policy if exists "Allow public inserts to AEHI scores" on public.aehi_scores;
drop policy if exists "Allow authenticated read access" on public.aehi_scores;

alter table public.aehi_scores enable row level security;
revoke all on public.aehi_scores from anon, authenticated;
grant all on public.aehi_scores to service_role;

commit;
