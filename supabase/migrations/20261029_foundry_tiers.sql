-- Foundry tiers (Oct 2026): Sprint, Blueprint, Build, Venture, Partner, the Raise Ready add-on,
-- and the AD+Vantage launch packages. The old package names (pmf, os-lite, foundry) stay valid
-- so existing applications and engagements keep their values.
-- No new tables, so no new grants are needed.

alter table public.foundry_applications
  drop constraint if exists foundry_applications_package_interest_check;
alter table public.foundry_applications
  add constraint foundry_applications_package_interest_check check (package_interest in (
    'sprint', 'blueprint', 'build', 'venture', 'partner', 'raise', 'not-sure',
    'pmf', 'os-lite', 'foundry'
  ));

alter table public.foundry_engagements
  drop constraint if exists foundry_engagements_package_id_check;
alter table public.foundry_engagements
  add constraint foundry_engagements_package_id_check check (package_id in (
    'sprint', 'blueprint', 'build', 'venture', 'partner', 'raise',
    'launch-essentials', 'launch-pro', 'launch-scale',
    'pmf', 'os-lite', 'foundry'
  ));
