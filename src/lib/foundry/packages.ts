/**
 * Crelligent Foundry tiers, add-ons and launch packages: the single place to edit what /foundry shows.
 * Every engagement is quoted after a discovery call. Price levels are kept out of this public repository.
 * International clients are quoted and invoiced in USD, GBP or EUR.
 */

export type FoundryPath = 'validate' | 'venture'

/** Tiers and the Raise Ready add-on: what a founder can apply for. */
export type ApplyPackageId = 'sprint' | 'blueprint' | 'build' | 'partner' | 'raise' | 'venture'
/** Launch packages, delivered by AD+Vantage inside a Foundry contract. */
export type LaunchPackageId = 'launch-essentials' | 'launch-pro' | 'launch-scale'
export type FoundryPackageId = ApplyPackageId | LaunchPackageId
/** Package names used before October 2026; kept so older applications and engagements still read correctly. */
export type LegacyPackageId = 'pmf' | 'os-lite' | 'foundry'

export type FoundryPackageKind = 'tier' | 'addon' | 'launch'

export interface FoundryPackage {
  id: FoundryPackageId
  kind: FoundryPackageKind
  /** Apply-form path. Launch packages are added to a quote, not applied for on their own. */
  path?: FoundryPath
  name: string
  /** ESRE phase the tier maps to */
  phase?: string
  forWho: string
  summary: string
  includes: string[]
  timeline: string
  featured?: boolean
}

export const FOUNDRY_PACKAGES: FoundryPackage[] = [
  {
    id: 'sprint',
    kind: 'tier',
    path: 'validate',
    name: 'Foundry Sprint',
    phase: 'Diagnostic',
    forWho: 'Founders with an idea or early product',
    summary: 'Find out if it is worth building before you spend on building it.',
    includes: [
      'Market and competitor research',
      'Customer interviews and problem–solution testing',
      'Business model and unit economics',
      'VeloDesk PMF Score as your baseline',
      'A clear go / no-go report with the next step',
    ],
    timeline: '4–6 weeks',
  },
  {
    id: 'blueprint',
    kind: 'tier',
    path: 'validate',
    name: 'Foundry Blueprint',
    phase: 'Architecture',
    forWho: 'Founders ready to commit',
    summary: 'Design the whole system your venture runs on, before a line of code.',
    includes: [
      'Everything in the Sprint',
      'ESRE OS Lite blueprint: L1 Business Design, L2 Operating Model, L3 Technology & Platform',
      'L2 first: processes, roles and decision rights',
      'MVP specification, roadmap and build budget',
      'Company registration and data-protection (NDPA) setup',
    ],
    timeline: '6–8 weeks',
    featured: true,
  },
  {
    id: 'build',
    kind: 'tier',
    path: 'validate',
    name: 'Foundry Build',
    phase: 'Build',
    forWho: 'Founders with a blueprint',
    summary: 'Build the product and the systems behind it, then launch it.',
    includes: [
      'MVP, web or mobile, built by our team',
      'CRM, finance and operations set up and connected',
      'Payments with Paystack, in NGN and foreign currency',
      'Dashboards that show how the business is running',
      'Launch Essentials by AD+Vantage, with a VeloDesk score at launch',
    ],
    timeline: '12–16 weeks',
  },
  {
    id: 'partner',
    kind: 'tier',
    path: 'validate',
    name: 'Foundry Partner',
    phase: 'Evolution',
    forWho: 'Ventures that are working and growing',
    summary: 'A technical co-founder on retainer while the venture scales.',
    includes: [
      'Fractional CTO or COO',
      'ESRE OS subscription and VeloDesk tracking',
      'Quarterly reviews and an annual ESRE Health Score review',
      'Systems scaled as the team grows, plus hiring support',
    ],
    timeline: 'Monthly, 6-month minimum',
  },
  {
    id: 'venture',
    kind: 'tier',
    path: 'venture',
    name: 'Foundry Venture',
    phase: 'Build, for established companies',
    forWho: 'Established companies, development finance institutions and impact programmes',
    summary: 'Co-build a new venture: a second product, a spin-out or a new market.',
    includes: [
      'Blueprint: demand, pricing and PMF evidence before you commit, and the full operating design',
      'Build: our team designs and builds the product and its systems with you',
      'Launch: Launch Pro or Launch Scale by AD+Vantage',
      'Raise Ready, and measured results reported with VeloDesk',
    ],
    timeline: '4–9 months, scoped per venture',
  },
  {
    id: 'raise',
    kind: 'addon',
    path: 'validate',
    name: 'Raise Ready',
    forWho: 'Founders preparing a raise',
    summary: 'Walk into investor meetings with evidence, not just a deck.',
    includes: [
      'VeloDesk PMF Score with investor-shareable results',
      'Financial model and pitch deck',
      'Investor Readiness Assessment and PMF Narrative Framework',
      'A data room investors can review',
    ],
    timeline: '2–4 weeks, on its own or with any tier',
  },
  {
    id: 'launch-essentials',
    kind: 'launch',
    name: 'Launch Essentials',
    forWho: 'A new venture that needs to look credible',
    summary: 'A brand and a presence that customers trust from day one.',
    includes: [
      'Full brand identity: logo, palette, type and guidelines',
      'Landing page',
      'Social setup and 30 days of launch content',
      'VeloDesk baseline and a day-30 score',
    ],
    timeline: '3–4 weeks',
  },
  {
    id: 'launch-pro',
    kind: 'launch',
    name: 'Launch Pro',
    forWho: 'A venture going after its first customers',
    summary: 'A launch campaign built to bring in the first paying customers.',
    includes: [
      'Everything in Launch Essentials',
      'Positioning, messaging and a website of up to 5 pages',
      'Launch campaign and 60 days of content',
      'Paid ads managed for 60 days, and a press release',
      'VeloDesk scores at days 30 and 60',
    ],
    timeline: '6–8 weeks',
  },
  {
    id: 'launch-scale',
    kind: 'launch',
    name: 'Launch Scale',
    forWho: 'A funded launch that wants to own attention',
    summary: 'A full market entry: brand, film, media and a 90-day growth sprint.',
    includes: [
      'Everything in Launch Pro',
      'Brand architecture, full website and a campaign microsite',
      'Video commercial and influencer creative',
      '90-day paid growth sprint, media relations and a launch activation',
      'VeloDesk scores at days 30, 60 and 90, and a review',
    ],
    timeline: '10–12 weeks',
  },
]

const LEGACY_NAMES: Record<LegacyPackageId, string> = {
  pmf: 'PMF Validation',
  'os-lite': 'ESRE OS Lite',
  foundry: 'Foundry Package',
}

export const FOUNDRY_BILLING = {
  depositPercent: 50,
  balanceLabel: 'on delivery',
  domesticCurrency: 'NGN' as const,
  internationalCurrency: 'USD' as const,
  billingEmail: 'billing@crelligent.com',
}

/** Every engagement is quoted after a discovery call. */
export function priceLabel(_p?: FoundryPackage) {
  return 'Quote on request'
}

export function getPackage(id: string) {
  return FOUNDRY_PACKAGES.find((p) => p.id === id)
}

/** A package a founder can apply for (tiers and Raise Ready); launch packages are added to a quote. */
export function getApplyPackage(id: string) {
  const p = getPackage(id)
  return p && p.kind !== 'launch' ? p : undefined
}

/** Display name for any stored package id, including names used before October 2026. */
export function packageName(id: string) {
  return getPackage(id)?.name ?? LEGACY_NAMES[id as LegacyPackageId] ?? id
}

export const packagesOfKind = (kind: FoundryPackageKind) => FOUNDRY_PACKAGES.filter((p) => p.kind === kind)
