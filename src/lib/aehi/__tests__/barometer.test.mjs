// Unit tests for the Executive Barometer's pure logic.
// Run: npx tsx --test src/lib/aehi/__tests__/barometer.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { aggregate, isEligible, rescale, scoreAnswers, submissionSchema, answersSchema } from '../barometer.ts'

const answers = (over = {}) => ({
  role: 'Founder, CEO or Managing Director',
  sector: 'Manufacturing',
  employees: '50 to 99',
  revenue: '₦500 million to ₦2 billion',
  location: 'Lagos',
  confidence: { L1: 4, L2: 2, L3: 3, L4: 3, L5: 4 },
  outlook: { revenue: 4, headcount: 3, systems: 3, conditions: 2 },
  constraints: ['fx', 'processes'],
  trust: { banks: 3, government: 2, suppliers: 4, customers: 3, own_data: 4 },
  ...over,
})

test('rescale maps 1..5 to 0..100', () => {
  assert.equal(rescale(1), 0)
  assert.equal(rescale(3), 50)
  assert.equal(rescale(5), 100)
})

test('score: index is the mean of the two sub-indices; weakest layer found', () => {
  const s = scoreAnswers(answers())
  assert.equal(s.confidence, 55) // (75+25+50+50+75)/5
  assert.equal(s.outlook, 50) // (75+50+50+25)/4
  assert.equal(s.index, 52.5)
  assert.equal(s.weakestLayer, 'L2')
})

test('validation: complete answers pass; missing item or 4 constraints fail', () => {
  assert.equal(answersSchema.safeParse(answers()).success, true)
  assert.equal(answersSchema.safeParse(answers({ confidence: { L1: 4, L2: 2, L3: 3, L4: 3 } })).success, false)
  assert.equal(answersSchema.safeParse(answers({ constraints: ['fx', 'power', 'finance', 'talent'] })).success, false)
  assert.equal(answersSchema.safeParse(answers({ constraints: ['fx', 'fx'] })).success, false)
  assert.equal(answersSchema.safeParse(answers({ confidence: { L1: 6, L2: 2, L3: 3, L4: 3, L5: 4 } })).success, false)
})

test('submission: consent required; email required only when asking for emails', () => {
  assert.equal(submissionSchema.safeParse({ answers: answers(), consent: true }).success, true)
  assert.equal(submissionSchema.safeParse({ answers: answers(), consent: false }).success, false)
  assert.equal(submissionSchema.safeParse({ answers: answers(), consent: true, wantsResults: true }).success, false)
  assert.equal(submissionSchema.safeParse({ answers: answers(), consent: true, email: '', wantsResults: false }).success, true)
  const ok = submissionSchema.safeParse({ answers: answers(), consent: true, email: ' Ada@X.NG ', wantsResults: true })
  assert.equal(ok.success, true)
  assert.equal(ok.data.email, 'ada@x.ng')
  assert.equal(submissionSchema.safeParse({ answers: answers(), consent: true, email: 'nope' }).success, false)
})

test('eligibility: senior, Nigeria, 20+ staff, revenue above ₦500m or undisclosed', () => {
  assert.equal(isEligible(answers()), true)
  assert.equal(isEligible(answers({ role: 'Other role' })), false)
  assert.equal(isEligible(answers({ employees: '1 to 19' })), false)
  assert.equal(isEligible(answers({ revenue: '₦100 million to ₦500 million' })), false)
  assert.equal(isEligible(answers({ revenue: 'Prefer not to say' })), true)
  assert.equal(isEligible(answers({ location: 'Outside Nigeria' })), false)
})

test('aggregate: refuses to publish below the wave minimum', () => {
  const rows = Array.from({ length: 99 }, () => ({ answers: answers() }))
  assert.equal(aggregate(rows), null)
  // even if a caller passes a tiny threshold, the k-anonymity floor (10) holds
  assert.equal(aggregate(rows.slice(0, 9), 1, 1), null)
})

test('aggregate: computes shares, net balances and drops small sectors', () => {
  const rows = [
    ...Array.from({ length: 60 }, () => ({ answers: answers() })),
    ...Array.from({ length: 40 }, () => ({ answers: answers({ sector: 'Financial services', outlook: { revenue: 1, headcount: 3, systems: 3, conditions: 2 }, constraints: ['fx'] }) })),
    ...Array.from({ length: 5 }, () => ({ answers: answers({ sector: 'Education' }) })),
    { answers: { broken: true } },
  ]
  const r = aggregate(rows)
  assert.ok(r)
  assert.equal(r.n, 105)
  assert.equal(r.layerConfident.L1, 100)
  assert.equal(r.layerConfident.L2, 0)
  assert.equal(r.outlookNet.revenue, Math.round(((65 - 40) / 105) * 1000) / 10)
  assert.equal(r.constraints[0].id, 'fx')
  assert.equal(r.constraints[0].share, 100)
  assert.equal(r.internalConstraintShare, Math.round((65 / 105) * 1000) / 10)
  assert.deepEqual(r.sectors.map((s) => s.sector).sort(), ['Financial services', 'Manufacturing'])
})
