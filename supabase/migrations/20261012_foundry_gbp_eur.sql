-- Foundry: allow GBP and EUR invoices (paid by bank transfer to the domiciliary accounts).
-- Card payments stay NGN/USD (Paystack); the app enforces that.
alter table public.foundry_engagements drop constraint if exists foundry_engagements_currency_check;
alter table public.foundry_engagements
  add constraint foundry_engagements_currency_check check (currency in ('NGN', 'USD', 'GBP', 'EUR'));

alter table public.foundry_invoices drop constraint if exists foundry_invoices_currency_check;
alter table public.foundry_invoices
  add constraint foundry_invoices_currency_check check (currency in ('NGN', 'USD', 'GBP', 'EUR'));
