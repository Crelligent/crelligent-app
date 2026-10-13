// Unit tests for the AEHI backend's pure logic.
// Run: node --experimental-strip-types --no-warnings --test src/lib/__tests__/
// (Node 22+. No extra dependencies. .mjs so `tsc --noEmit` ignores it.)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { notifySchema, institutionalSchema, validate, isHoneypotTripped, oneLine } from '../validation.ts'
import { MIN_GROUP_SIZE, effectiveThreshold, filterKAnon, toGroup, buildGroups } from '../kanon.ts'
import { rateLimit, _resetRateLimit } from '../rate-limit.ts'

const notify = { name: 'Ada Obi', email: '  Ada@Example.NG ', organisation: 'Acme Ltd', consent: true }
const inst = {
  firstName: 'Ada', lastName: 'Obi', email: 'ada@uni.edu.ng', institution: 'A University',
  institutionType: 'Academic Institution', interest: 'Research partnership', consent: true,
}

// ---------------- validation ----------------
test('notify: valid payload is normalised', () => {
  const r = validate(notifySchema, { ...notify, role: '', country: ' Nigeria ', website: '' })
  assert.equal(r.ok, true)
  assert.equal(r.data.email, 'ada@example.ng')
  assert.equal(r.data.role, undefined) // "" -> absent
  assert.equal(r.data.country, 'Nigeria')
  assert.equal('website' in r.data, false) // unknown keys stripped
})

test('notify: missing/invalid fields give per-field messages', () => {
  const r = validate(notifySchema, { name: 'A', email: 'nope', consent: false })
  assert.equal(r.ok, false)
  assert.deepEqual(Object.keys(r.fieldErrors).sort(), ['consent', 'email', 'name', 'organisation'])
  assert.match(r.fieldErrors.email, /valid email/i)
})

test('notify: over-long values are rejected', () => {
  const r = validate(notifySchema, { ...notify, organisation: 'x'.repeat(161) })
  assert.equal(r.ok, false)
  assert.ok(r.fieldErrors.organisation)
})

test('notify: source must be a short slug', () => {
  assert.equal(validate(notifySchema, { ...notify, source: 'report' }).ok, true)
  assert.equal(validate(notifySchema, { ...notify, source: 'Report Page!' }).ok, false)
})

test('institutional: valid payload passes, message optional and capped', () => {
  assert.equal(validate(institutionalSchema, inst).ok, true)
  assert.equal(validate(institutionalSchema, { ...inst, message: '' }).data.message, undefined)
  const long = validate(institutionalSchema, { ...inst, message: 'x'.repeat(1501) })
  assert.equal(long.ok, false)
  assert.ok(long.fieldErrors.message)
})

test('institutional: consent must be literally true', () => {
  const r = validate(institutionalSchema, { ...inst, consent: 'true' })
  assert.equal(r.ok, false)
  assert.ok(r.fieldErrors.consent)
})

test('non-object body fails validation without throwing', () => {
  assert.equal(validate(notifySchema, null).ok, false)
  assert.equal(validate(notifySchema, 'hello').ok, false)
})

test('honeypot', () => {
  assert.equal(isHoneypotTripped({ website: '' }), false)
  assert.equal(isHoneypotTripped({ website: '   ' }), false)
  assert.equal(isHoneypotTripped({}), false)
  assert.equal(isHoneypotTripped(null), false)
  assert.equal(isHoneypotTripped({ website: 'http://spam' }), true)
  assert.equal(isHoneypotTripped({ website: 1 }), true)
})

test('oneLine strips newlines for email subjects', () => {
  assert.equal(oneLine('Acme\r\nBcc: x@y.z'), 'Acme Bcc: x@y.z')
  assert.equal(oneLine('a'.repeat(200), 10).length, 10)
})

// ---------------- k-anonymity ----------------
test('threshold never drops below 10', () => {
  assert.equal(MIN_GROUP_SIZE, 10)
  assert.equal(effectiveThreshold(undefined), 10)
  assert.equal(effectiveThreshold(null), 10)
  assert.equal(effectiveThreshold(3), 10)
  assert.equal(effectiveThreshold(NaN), 10)
  assert.equal(effectiveThreshold(25), 25)
})

test('filterKAnon keeps only n >= threshold', () => {
  const g = [{ n: 9 }, { n: 10 }, { n: 11 }, { n: 0 }, { n: 10.5 }, { n: NaN }, { n: -1 }]
  assert.deepEqual(filterKAnon(g).map((x) => x.n), [10, 11])
  assert.deepEqual(filterKAnon(g, 11).map((x) => x.n), [11])
  assert.deepEqual(filterKAnon(g, 2).map((x) => x.n), [10, 11]) // cannot lower the floor
})

const row = (o = {}) => ({
  group_type: 'sector', group_key: 'Logistics', n: 12,
  composite_mean: '48.50', composite_median: '47.00', composite_p25: '40.00', composite_p75: '56.00',
  l1_mean: '5.10', l2_mean: '3.90', l3_mean: '5.00', l4_mean: '4.20', l5_mean: '6.00',
  weakest_layer: 'L2', ...o,
})

test('toGroup parses numeric strings and rejects out-of-range rows', () => {
  const g = toGroup(row())
  assert.equal(g.composite.mean, 48.5)
  assert.equal(g.layers.L2, 3.9)
  assert.equal(g.weakestLayer, 'L2')
  assert.equal(toGroup(row({ l3_mean: '11' })), null)
  assert.equal(toGroup(row({ composite_mean: '-1' })), null)
  assert.equal(toGroup(row({ weakest_layer: 'L9' })), null)
  assert.equal(toGroup(row({ group_type: 'city' })), null)
})

test('buildGroups applies k-anonymity and splits overall/sectors', () => {
  const rows = [
    row({ group_type: 'overall', group_key: 'all', n: 40 }),
    row({ group_key: 'Logistics', n: 12 }),
    row({ group_key: 'FMCG', n: 15 }),
    row({ group_key: 'Energy', n: 9 }), // below floor: must be dropped
  ]
  const r = buildGroups(rows, 10)
  assert.equal(r.overall.n, 40)
  assert.deepEqual(r.sectors.map((s) => s.key), ['FMCG', 'Logistics'])
  const strict = buildGroups(rows, 13)
  assert.deepEqual(strict.sectors.map((s) => s.key), ['FMCG'])
  assert.equal(buildGroups([row({ group_type: 'overall', group_key: 'all', n: 5 })], 10).overall, null)
})

// ---------------- rate limit ----------------
test('rateLimit allows `limit` hits per window, then blocks with Retry-After', () => {
  _resetRateLimit()
  const t0 = 1_000_000
  for (let i = 0; i < 3; i++) assert.equal(rateLimit('k', 3, 60_000, t0 + i).allowed, true)
  const blocked = rateLimit('k', 3, 60_000, t0 + 10)
  assert.equal(blocked.allowed, false)
  assert.ok(blocked.retryAfter >= 59 && blocked.retryAfter <= 60)
  assert.equal(rateLimit('other', 3, 60_000, t0 + 10).allowed, true) // keys are independent
  assert.equal(rateLimit('k', 3, 60_000, t0 + 60_001).allowed, true) // window slides
})
