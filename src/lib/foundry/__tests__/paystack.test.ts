/**
 * Run: npx tsx src/lib/foundry/__tests__/paystack.test.ts
 * No network or database access; uses a dummy secret.
 */
import { createHmac } from 'node:crypto'
import assert from 'node:assert/strict'
import { isFoundryReference, verifyWebhookSignature } from '../paystack'
import { checkPaymentMatches, newPaystackReference, referencePrefixFor } from '../invoices'
import { foundryApplicationSchema } from '../schema'

const SECRET = 'sk_test_dummy_not_a_real_key'
let passed = 0
function test(name: string, fn: () => void) {
  fn()
  passed++
  console.log(`ok - ${name}`)
}

// --- verifyWebhookSignature -------------------------------------------------
const body = JSON.stringify({ event: 'charge.success', data: { reference: 'CF-2026-0001-abc', amount: 100 } })
const sig = createHmac('sha512', SECRET).update(body).digest('hex')

test('accepts a valid signature', () => assert.equal(verifyWebhookSignature(body, sig, SECRET), true))
test('accepts uppercase hex', () => assert.equal(verifyWebhookSignature(body, sig.toUpperCase(), SECRET), true))
test('accepts Buffer body', () => assert.equal(verifyWebhookSignature(Buffer.from(body), sig, SECRET), true))
test('rejects tampered body', () => assert.equal(verifyWebhookSignature(body.replace('100', '1'), sig, SECRET), false))
test('rejects wrong secret', () => assert.equal(verifyWebhookSignature(body, sig, 'sk_test_other'), false))
test('rejects missing signature', () => {
  assert.equal(verifyWebhookSignature(body, null, SECRET), false)
  assert.equal(verifyWebhookSignature(body, '', SECRET), false)
})
test('rejects wrong-length / non-hex signature', () => {
  assert.equal(verifyWebhookSignature(body, sig.slice(0, 64), SECRET), false)
  assert.equal(verifyWebhookSignature(body, 'z'.repeat(128), SECRET), false)
})
test('throws a clear error when PAYSTACK_SECRET_KEY is missing', () => {
  const prev = process.env.PAYSTACK_SECRET_KEY
  delete process.env.PAYSTACK_SECRET_KEY
  assert.throws(() => verifyWebhookSignature(body, sig), /PAYSTACK_SECRET_KEY/)
  if (prev !== undefined) process.env.PAYSTACK_SECRET_KEY = prev
})

// --- references ---------------------------------------------------------------
test('reference format CF-<number>-<random>', () => {
  const ref = newPaystackReference('CF-2026-0007')
  assert.match(ref, /^CF-2026-0007-[0-9a-f]{12}$/)
  assert.ok(ref.startsWith(referencePrefixFor('CF-2026-0007')))
  assert.notEqual(ref, newPaystackReference('CF-2026-0007'))
  assert.equal(isFoundryReference(ref), true)
  assert.equal(isFoundryReference('VD-123'), false)
  assert.equal(isFoundryReference(undefined), false)
})

// --- amount / currency matching ----------------------------------------------
const invoice = { amount_minor: 75_000_000, currency: 'NGN' } // NGN 750,000
const ok = { status: 'success', amount: 75_000_000, currency: 'NGN', reference: 'CF-2026-0001-x' }

test('matches exact amount and currency', () => assert.deepEqual(checkPaymentMatches(invoice, ok, ok.reference), { ok: true }))
test('bigint-as-string amount from DB still matches', () =>
  assert.deepEqual(checkPaymentMatches({ amount_minor: '75000000', currency: 'NGN' }, ok), { ok: true }))
test('rejects underpayment', () =>
  assert.deepEqual(checkPaymentMatches(invoice, { ...ok, amount: 74_999_999 }), { ok: false, reason: 'amount_mismatch' }))
test('rejects overpayment', () =>
  assert.deepEqual(checkPaymentMatches(invoice, { ...ok, amount: 75_000_100 }), { ok: false, reason: 'amount_mismatch' }))
test('rejects naira-vs-kobo confusion', () =>
  assert.deepEqual(checkPaymentMatches(invoice, { ...ok, amount: 750_000 }), { ok: false, reason: 'amount_mismatch' }))
test('rejects currency mismatch', () =>
  assert.deepEqual(checkPaymentMatches(invoice, { ...ok, currency: 'USD' }), { ok: false, reason: 'currency_mismatch' }))
test('rejects non-success status', () =>
  assert.deepEqual(checkPaymentMatches(invoice, { ...ok, status: 'abandoned' }), { ok: false, reason: 'not_successful' }))
test('rejects reference mismatch', () =>
  assert.deepEqual(checkPaymentMatches(invoice, ok, 'CF-2026-0002-y'), { ok: false, reason: 'reference_mismatch' }))

// --- application schema smoke test ------------------------------------------
test('application schema parses a valid payload and normalises fields', () => {
  const r = foundryApplicationSchema.safeParse({
    founderName: ' Ada ',
    email: 'ADA@Example.com',
    phone: '',
    companyName: 'Example Ltd',
    website: 'example.com',
    country: 'Nigeria',
    stage: 'seed',
    teamSize: '6-15',
    path: 'validate',
    packageInterest: 'foundry',
    revenueBand: '',
    goals: 'Prove PMF before our seed extension.',
    heardFrom: 'linkedin',
    consent: true,
    website_url: '',
  })
  assert.ok(r.success, JSON.stringify(!r.success && r.error.issues))
  assert.equal(r.data.email, 'ada@example.com')
  assert.equal(r.data.website, 'https://example.com')
  assert.equal(r.data.phone, undefined)
  assert.equal(r.data.revenueBand, undefined)
})
test('application schema rejects missing consent and long goals', () => {
  const r = foundryApplicationSchema.safeParse({
    founderName: 'A', email: 'a@b.co', companyName: 'C', country: 'NG', stage: 'idea', teamSize: '1',
    path: 'validate', packageInterest: 'pmf', goals: 'x'.repeat(1501), heardFrom: 'other', consent: false,
  })
  assert.equal(r.success, false)
  const paths = r.success ? [] : r.error.issues.map((i) => i.path.join('.'))
  assert.ok(paths.includes('consent') && paths.includes('goals'), paths.join(','))
})

console.log(`\n${passed} tests passed`)
