/**
 * Crelligent Foundry packages and pricing: the single place to edit what /foundry shows.
 * Prices are NGN ranges; the final fee is agreed in the proposal after a discovery call.
 * International clients are quoted and invoiced in USD, GBP or EUR (no converted figures are shown).
 */

export type FoundryPath = 'validate' | 'venture'
export type FoundryPackageId = 'pmf' | 'os-lite' | 'foundry' | 'venture'

export interface FoundryPackage {
  id: FoundryPackageId
  path: FoundryPath
  name: string
  forWho: string
  summary: string
  includes: string[]
  /** NGN, whole naira. null = custom quote */
  priceFromNgn: number | null
  priceToNgn: number | null
  timeline: string
  featured?: boolean
}

export const FOUNDRY_PACKAGES: FoundryPackage[] = [
  {
    id: 'pmf',
    path: 'validate',
    name: 'PMF Validation',
    forWho: 'Founders preparing a raise',
    summary: 'Prove product-market fit with evidence investors accept.',
    includes: [
      'VeloDesk PMF Score across 10 weighted dimensions',
      'Investor Readiness Assessment',
      'PMF Narrative Framework for investor conversations',
    ],
    priceFromNgn: 350_000,
    priceToNgn: 1_000_000,
    timeline: '2–3 weeks',
  },
  {
    id: 'os-lite',
    path: 'validate',
    name: 'ESRE OS Lite',
    forWho: 'Founders scaling a team',
    summary: 'Install the operating system your startup needs to grow without breaking.',
    includes: [
      'L1 Business Design: model and positioning validated',
      'L2 Operating Model installed first: processes, roles, decision rights',
      'L3 Technology & Platform: the right stack for your stage',
    ],
    priceFromNgn: 750_000,
    priceToNgn: 2_000_000,
    timeline: '4–6 weeks',
  },
  {
    id: 'foundry',
    path: 'validate',
    name: 'Foundry Package',
    forWho: 'Founders 3–6 months from a raise',
    summary: 'PMF Validation and ESRE OS Lite together: one team, one plan.',
    includes: [
      'Everything in PMF Validation',
      'Everything in ESRE OS Lite',
      'L2 fixes mapped to the PMF dimensions they lift (retention, referrals)',
    ],
    priceFromNgn: 1_000_000,
    priceToNgn: 2_500_000,
    timeline: '6–8 weeks',
    featured: true,
  },
  {
    id: 'venture',
    path: 'venture',
    name: 'Venture Build',
    forWho: 'Growing startups and their founders',
    summary: 'Co-build your next venture: a second product, a spin-out or a new market.',
    includes: [
      'Validation: demand, pricing and PMF evidence before you commit',
      'Build: our team designs and builds the product with you',
      'Launch: operating system, go-to-market and first customers',
    ],
    priceFromNgn: null,
    priceToNgn: null,
    timeline: 'Scoped per venture',
  },
]

/** Prices stay in this file for internal reference. The public site shows "Request a quote" while this is false. */
export const SHOW_PRICES = false

export const FOUNDRY_BILLING = {
  depositPercent: 50,
  balanceLabel: 'on delivery',
  domesticCurrency: 'NGN' as const,
  internationalCurrency: 'USD' as const,
  billingEmail: 'billing@crelligent.com',
}

export function formatNgn(n: number) {
  return `₦${n.toLocaleString('en-NG')}`
}

export function priceLabel(p: FoundryPackage) {
  if (!SHOW_PRICES) return 'Quote on request'
  if (p.priceFromNgn == null || p.priceToNgn == null) return 'Custom quote'
  return `${formatNgn(p.priceFromNgn)} – ${formatNgn(p.priceToNgn)}`
}

export function getPackage(id: string) {
  return FOUNDRY_PACKAGES.find((p) => p.id === id)
}
