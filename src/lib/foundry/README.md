# Crelligent Foundry backend

Applications, engagements, invoices and Paystack payments for crelligent.com/foundry.

## Environment variables (names only — never commit values)

| Name | Required | Used for |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | yes | Supabase project URL |
| `SUPABASE_SECRET_KEY` | yes | Server-only service-role access to `foundry_*` tables |
| `PAYSTACK_SECRET_KEY` | yes (payments) | Paystack API calls and webhook signature (HMAC SHA512) |
| `NEXT_PUBLIC_SITE_URL` | recommended | Paystack callback base URL (defaults to `https://crelligent.com`) |
| `RESEND_API_KEY` | optional | Email admin@crelligent.com on new applications (skipped if unset) |
| `FOUNDRY_NOTIFY_FROM` | optional | Sender for that email (default `Crelligent Foundry <foundry@crelligent.com>`, domain must be verified in Resend) |

USD invoices need USD enabled on the Paystack account.

## Database

Migration: `supabase/migrations/20261012_foundry.sql` (not auto-applied). RLS is on with no anon policies;
all access is through the API routes below using the service key.

## Paystack webhook

Set the webhook URL in the Paystack dashboard (Settings → API Keys & Webhooks):

```
https://crelligent.com/api/foundry/paystack/webhook
```

The Paystack account is shared with other Crelligent apps. This handler only acts on `charge.success`
events whose reference starts with `CF-`; everything else gets a 200 and is ignored. If another app already
owns the single webhook URL on the account, that app must forward `CF-` events here unchanged (raw body and
`x-paystack-signature` header).

## Admin: create an engagement and its two invoices

After the discovery call, run this in the Supabase SQL editor. Amounts are in the lowest unit
(NGN kobo or USD cents = amount × 100). The deposit invoice is created as `sent` (payable now); the balance
stays `draft` until delivery.

```sql
with eng as (
  insert into public.foundry_engagements
    (application_id, client_name, client_email, company_name, package_id, title,
     currency, total_minor, deposit_percent, status)
  values
    (null, 'Founder Name', 'founder@example.com', 'Example Ltd',
     'foundry', 'Foundry Package: Example Ltd',
     'NGN', 150000000, 50, 'active')          -- NGN 1,500,000
  returning id, currency, total_minor, deposit_percent
),
inv as (
  insert into public.foundry_invoices (engagement_id, kind, description, amount_minor, currency, status, sent_at)
  select id, 'deposit', 'Deposit (50% on signing)',
         round(total_minor * deposit_percent / 100.0)::bigint, currency, 'sent', now() from eng
  union all
  select id, 'balance', 'Balance (50% on delivery)',
         total_minor - round(total_minor * deposit_percent / 100.0)::bigint, currency, 'draft', null from eng
  returning invoice_number, kind, amount_minor, currency, status, pay_token
)
select invoice_number, kind, amount_minor, currency, status,
       'https://crelligent.com/foundry/pay/' || pay_token as pay_link
from inv;
```

Release the balance on delivery and get its link:

```sql
update public.foundry_invoices set status = 'sent', sent_at = now()
 where engagement_id = '<engagement id>' and kind = 'balance' and status = 'draft'
returning invoice_number, 'https://crelligent.com/foundry/pay/' || pay_token as pay_link;
```

Check payments: `select invoice_number, kind, status, paid_at, paystack_reference, notes from public.foundry_invoices order by created_at desc;`
Mismatched or unexpected payments are never marked paid; they are logged and written to `notes`.

### Bank transfer (while Paystack is not live, or as an alternative)

The invoice page shows bank details when these Vercel env vars are set (never put them in the repo):

- NGN: `FOUNDRY_BANK_NAME`, `FOUNDRY_BANK_ACCOUNT_NAME`, `FOUNDRY_BANK_ACCOUNT_NUMBER`
- USD, GBP, EUR (domiciliary accounts): `FOUNDRY_BANK_USD_DETAILS`, `FOUNDRY_BANK_GBP_DETAILS`, `FOUNDRY_BANK_EUR_DETAILS`. Each is one line, with details separated by `|`, e.g. `Bank: ... | Account name: ... | Account number: ... | SWIFT: ...`
- GBP and EUR invoices are bank transfer only (Paystack settles NGN and USD). They need migration `20261012_foundry_gbp_eur.sql`.

The card button only shows when `PAYSTACK_SECRET_KEY` is set. After the money lands, mark the invoice paid:

```sql
update public.foundry_invoices
   set status = 'paid', paid_at = now(), notes = 'Bank transfer confirmed'
 where invoice_number = 'CF-2026-0001' and status = 'sent'
returning invoice_number, status, paid_at;
```

## API routes

| Route | Purpose |
|---|---|
| `POST /api/foundry/apply` | Intake form (zod, honeypot `website_url`, 5/hour/IP) |
| `GET /api/foundry/invoice/[token]` | Public invoice view (404 for unknown/draft) |
| `POST /api/foundry/pay/[token]` | Start Paystack checkout for a `sent` invoice |
| `GET /api/foundry/pay/verify?reference=` | Server-side verify after the Paystack redirect |
| `POST /api/foundry/paystack/webhook` | Paystack `charge.success` (signature-checked) |

## Tests

```
npx tsx src/lib/foundry/__tests__/paystack.test.ts
```
