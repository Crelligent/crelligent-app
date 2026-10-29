import assert from 'node:assert/strict'
import { FOUNDRY_PACKAGES, getApplyPackage, packageName, packagesOfKind, priceLabel } from '../packages'
import { PACKAGE_INTEREST_OPTIONS, foundryApplicationSchema } from '../schema'
import { scoreSnapshot } from '../pmf-check'

let passed = 0
const test = (name: string, fn: () => void) => {
  fn()
  passed++
  console.log(`ok - ${name}`)
}

test('five tiers, one add-on, three launch packages', () => {
  assert.deepEqual(packagesOfKind('tier').map((p) => p.id), ['sprint', 'blueprint', 'build', 'partner', 'venture'])
  assert.deepEqual(packagesOfKind('addon').map((p) => p.id), ['raise'])
  assert.deepEqual(packagesOfKind('launch').map((p) => p.id), ['launch-essentials', 'launch-pro', 'launch-scale'])
})

test('no prices in the public package data', () => {
  for (const p of FOUNDRY_PACKAGES) {
    assert.equal(priceLabel(p), 'Quote on request')
    assert.ok(!JSON.stringify(p).includes('₦'), `${p.id} mentions a naira amount`)
  }
})

test('every form option is a real package, and launch packages cannot be applied for alone', () => {
  for (const o of PACKAGE_INTEREST_OPTIONS) if (o.value !== 'not-sure') assert.ok(getApplyPackage(o.value), o.value)
  assert.equal(getApplyPackage('launch-pro'), undefined)
})

test('older package names still read correctly', () => {
  assert.equal(packageName('pmf'), 'PMF Validation')
  assert.equal(packageName('os-lite'), 'ESRE OS Lite')
  assert.equal(packageName('foundry'), 'Foundry Package')
  assert.equal(packageName('blueprint'), 'Foundry Blueprint')
})

test('venture path only takes Foundry Venture', () => {
  const base = {
    founderName: 'A', email: 'a@b.co', companyName: 'C', country: 'NG', stage: 'seed', teamSize: '6-15',
    goals: 'Grow', heardFrom: 'linkedin', consent: true,
  }
  assert.equal(foundryApplicationSchema.safeParse({ ...base, path: 'venture', packageInterest: 'build' }).success, false)
  assert.equal(foundryApplicationSchema.safeParse({ ...base, path: 'validate', packageInterest: 'venture' }).success, false)
  assert.equal(foundryApplicationSchema.safeParse({ ...base, path: 'validate', packageInterest: 'raise' }).success, true)
})

test('PMF snapshot always recommends a package that can be applied for', () => {
  const choices = {
    stage: ['idea', 'seed', 'series-a'],
    raise: ['0-6', '6-12', 'none'],
    ops: ['founder', 'documented'],
  }
  for (const stage of choices.stage)
    for (const raise of choices.raise)
      for (const ops of choices.ops) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const r = scoreSnapshot({ stage, raise, ops } as any)
        assert.ok(getApplyPackage(r.recommended), `${stage}/${raise}/${ops} → ${r.recommended}`)
      }
})

console.log(`\n${passed} tests passed`)
