/**
 * AEHI Executive Barometer: the question set, the wave and the publishing rules.
 *
 * The Barometer is a short perception survey of senior executives. It measures what leaders
 * believe about their own enterprise and the year ahead. It is published separately from the
 * AEHI scores (which come from the diagnostic) and is never mixed into them.
 *
 * Client-safe: no server imports. NEVER hand-edit results into this file. Published figures are
 * computed from stored responses (src/lib/aehi/barometer-results.ts) and only once the wave's
 * status is 'published' and the sample rules below are met.
 */
import { MIN_GROUP_SIZE } from '@/lib/aehi/kanon'

// ---------------------------------------------------------------------------
// Wave
// ---------------------------------------------------------------------------

export type WaveStatus = 'fielding' | 'closed' | 'published'

export interface Wave {
  id: string
  label: string
  status: WaveStatus
  /** Plain-language close, shown on the site. */
  closesLabel: string
  /** Short form for chips. */
  closesShort: string
  /** ISO date the results were published (only when status = 'published'). */
  publishedAt?: string
}

// OWNER CONFIRM: the first wave's name and when fieldwork closes.
export const WAVE: Wave = {
  id: '2026-w1',
  label: 'Wave 1, 2026',
  status: 'fielding',
  closesLabel: 'the end of November 2026',
  closesShort: 'Nov 2026',
}

// OWNER CONFIRM: publishing thresholds. Perception data needs larger groups than the index:
// a percentage from 12 people moves too much to report.
/** No wave headline is published below this many eligible responses. */
export const MIN_WAVE_SAMPLE = 100
/** No sector or size breakdown is published below this many eligible responses. */
export const MIN_SUBGROUP_SAMPLE = Math.max(30, MIN_GROUP_SIZE)

export const SURVEY_MINUTES = 5

// ---------------------------------------------------------------------------
// Profile questions
// ---------------------------------------------------------------------------

export const ROLES = [
  'Founder, CEO or Managing Director',
  'Other C-suite (CFO, COO, CTO and similar)',
  'Director or head of a function',
  'Other role',
] as const

export const SECTORS = [
  'Financial services',
  'Manufacturing',
  'Agriculture and agro-processing',
  'Trade, retail and distribution',
  'Logistics and transport',
  'Energy and power',
  'Oil and gas',
  'Technology and telecoms',
  'Healthcare and pharmaceuticals',
  'Real estate and construction',
  'Professional services',
  'Hospitality, media and entertainment',
  'Education',
  'Other',
] as const

export const EMPLOYEE_BANDS = ['1 to 19', '20 to 49', '50 to 99', '100 to 249', '250 to 499', '500 or more'] as const

export const REVENUE_BANDS = [
  'Under ₦100 million',
  '₦100 million to ₦500 million',
  '₦500 million to ₦2 billion',
  '₦2 billion to ₦10 billion',
  'Over ₦10 billion',
  'Prefer not to say',
] as const

export const LOCATIONS = [
  'Lagos',
  'Abuja (FCT)',
  'Rivers',
  'Ogun',
  'Oyo',
  'Kano',
  'Elsewhere in Nigeria',
  'Outside Nigeria',
] as const

// ---------------------------------------------------------------------------
// Scored blocks
// ---------------------------------------------------------------------------

export const CONFIDENCE_SCALE = ['Not at all confident', 'Slightly confident', 'Moderately confident', 'Very confident', 'Completely confident'] as const
export const OUTLOOK_SCALE = ['Fall a lot', 'Fall a little', 'Stay about the same', 'Rise a little', 'Rise a lot'] as const
export const TRUST_SCALE = ['Not at all', 'A little', 'Somewhat', 'A lot', 'Completely'] as const

export interface Item {
  id: string
  label: string
  /** Optional plain-language gloss under the label. */
  hint?: string
}

/** Block A: confidence in the enterprise's own operating model, one item per ESRE OS layer. */
export const CONFIDENCE_ITEMS = [
  { id: 'L1', label: 'Business design', hint: 'What you sell, to whom, and at what margin' },
  { id: 'L2', label: 'Operating model', hint: 'Whether work gets done the same way without you stepping in' },
  { id: 'L3', label: 'Technology', hint: 'Whether your systems connect and support the work' },
  { id: 'L4', label: 'Data and intelligence', hint: 'Whether you can see what is happening in time to act' },
  { id: 'L5', label: 'Governance', hint: 'Who can approve what, and how risk is controlled' },
] as const satisfies readonly Item[]

/** Block B: twelve-month outlook. */
export const OUTLOOK_ITEMS = [
  { id: 'revenue', label: 'Your revenue' },
  { id: 'headcount', label: 'Your number of staff' },
  { id: 'systems', label: 'Your spending on systems and technology' },
  { id: 'conditions', label: 'Business conditions for companies like yours in Nigeria' },
] as const satisfies readonly Item[]

/** Block C: biggest constraints, choose up to MAX_CONSTRAINTS. `internal` marks constraints inside the enterprise. */
export const CONSTRAINTS = [
  { id: 'fx', label: 'Exchange rates and import costs', internal: false },
  { id: 'power', label: 'Cost and reliability of power', internal: false },
  { id: 'finance', label: 'Access to finance', internal: false },
  { id: 'regulation', label: 'Regulation, tax and levies', internal: false },
  { id: 'demand', label: 'Customer demand and purchasing power', internal: false },
  { id: 'logistics', label: 'Logistics, roads and security', internal: false },
  { id: 'talent', label: 'Finding and keeping skilled staff', internal: true },
  { id: 'processes', label: 'Our own processes and ways of working', internal: true },
  { id: 'systems', label: 'Our systems and data', internal: true },
  { id: 'decisions', label: 'Too many decisions going through the top', internal: true },
] as const

export const MAX_CONSTRAINTS = 3

/** Block D: trust in what the enterprise depends on. */
export const TRUST_ITEMS = [
  { id: 'banks', label: 'Banks and lenders' },
  { id: 'government', label: 'Government and regulators' },
  { id: 'suppliers', label: 'Your key suppliers' },
  { id: 'customers', label: 'Your largest customers, to pay on time' },
  { id: 'own_data', label: 'The figures your own business runs on', hint: 'Management reports, dashboards, accounts' },
] as const satisfies readonly Item[]

export type ConfidenceId = (typeof CONFIDENCE_ITEMS)[number]['id']
export type OutlookId = (typeof OUTLOOK_ITEMS)[number]['id']
export type TrustId = (typeof TRUST_ITEMS)[number]['id']
export type ConstraintId = (typeof CONSTRAINTS)[number]['id']

/** Answers are stored as 1 to 5 (the scale position). */
export type Likert = 1 | 2 | 3 | 4 | 5

export interface BarometerAnswers {
  role: (typeof ROLES)[number]
  sector: (typeof SECTORS)[number]
  employees: (typeof EMPLOYEE_BANDS)[number]
  revenue: (typeof REVENUE_BANDS)[number]
  location: (typeof LOCATIONS)[number]
  confidence: Record<ConfidenceId, Likert>
  outlook: Record<OutlookId, Likert>
  constraints: ConstraintId[]
  trust: Record<TrustId, Likert>
}

// ---------------------------------------------------------------------------
// Index
// ---------------------------------------------------------------------------

export const INDEX_NAME = 'Enterprise Confidence Index'

export const INDEX_FORMULA =
  'Enterprise Confidence Index = ½ × operating-model confidence + ½ × outlook, each rescaled from the 1 to 5 answers to 0 to 100'

// OWNER CONFIRM: who counts as eligible for the published figures. Mirrors the mid-market
// definition in the methodology (20+ staff and revenue above ₦500 million) plus a senior role
// and an enterprise based in Nigeria. "Prefer not to say" on revenue is accepted when staff >= 20.
export const ELIGIBILITY_TEXT =
  'Published figures include only senior leaders (founder, CEO, managing director, C-suite or director) of enterprises based in Nigeria with 20 or more staff and revenue above ₦500 million. Respondents who preferred not to give revenue are included when the staff rule is met.'
