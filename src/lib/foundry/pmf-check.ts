/**
 * Free PMF snapshot (/foundry/pmf-check). Client-safe: shared by the quiz and POST /api/foundry/pmf-check.
 *
 * The seven scored questions use the same dimensions and weights as the VeloDesk PMF Score
 * (velodesk-app src/lib/pmf-score.ts), but on self-reported bands. It is a snapshot, not the
 * measured VeloDesk score, and the page says so.
 */
import { z } from 'zod'
import { STAGE_OPTIONS, TEAM_SIZE_OPTIONS, HEARD_FROM_OPTIONS, HONEYPOT_FIELD } from './schema'
import type { FoundryPackageId } from './packages'

export type DimensionKey = 'retention' | 'revenueGrowth' | 'love' | 'engagement' | 'timeToValue' | 'expansion' | 'referral'

/** Same weights as VeloDesk (nps there = "love" here, measured with the 40% "very disappointed" test). */
export const DIMENSION_WEIGHTS: Record<DimensionKey, number> = {
  retention: 0.25,
  revenueGrowth: 0.2,
  love: 0.15,
  engagement: 0.15,
  timeToValue: 0.1,
  expansion: 0.1,
  referral: 0.05,
}

export interface Choice {
  value: string
  label: string
  /** 0–100; null = "don't know" (scored as 0 and flagged as unmeasured). */
  points: number | null
}

export interface ScoredQuestion {
  id: DimensionKey
  dimension: string
  prompt: string
  help?: string
  choices: Choice[]
  /** What to do about a weak answer. Shown in the gap list. */
  fix: string
}

const DK = { value: 'unknown', label: "We don't measure this", points: null }

export const SCORED_QUESTIONS: ScoredQuestion[] = [
  {
    id: 'retention',
    dimension: 'Retention',
    prompt: 'Of the customers who started with you 3 months ago, how many are still active or paying?',
    choices: [
      { value: 'lt20', label: 'Under 20%', points: 10 },
      { value: '20-40', label: '20–40%', points: 35 },
      { value: '40-60', label: '40–60%', points: 60 },
      { value: '60-80', label: '60–80%', points: 80 },
      { value: 'gt80', label: 'Over 80%', points: 95 },
      DK,
    ],
    fix: 'Retention carries the most weight in PMF. Track cohorts by start month and find where customers drop off.',
  },
  {
    id: 'revenueGrowth',
    dimension: 'Revenue growth',
    prompt: 'How fast has revenue grown, month on month, over the last 3 months?',
    choices: [
      { value: 'none', label: 'No revenue yet', points: 5 },
      { value: 'flat', label: 'Flat or falling', points: 15 },
      { value: 'lt5', label: 'Under 5% a month', points: 35 },
      { value: '5-10', label: '5–10% a month', points: 60 },
      { value: '10-20', label: '10–20% a month', points: 80 },
      { value: 'gt20', label: 'Over 20% a month', points: 95 },
      DK,
    ],
    fix: 'Investors read growth as demand. Separate new-customer revenue from expansion so you know which is driving it.',
  },
  {
    id: 'love',
    dimension: 'Customer love',
    prompt: 'If your product disappeared tomorrow, what share of customers would be "very disappointed"?',
    help: 'This is the Sean Ellis test. 40% or more is the common PMF benchmark.',
    choices: [
      { value: 'lt10', label: 'Under 10%', points: 10 },
      { value: '10-25', label: '10–25%', points: 35 },
      { value: '25-40', label: '25–40%', points: 60 },
      { value: 'gt40', label: '40% or more', points: 90 },
      { value: 'never', label: "We've never asked", points: null },
    ],
    fix: 'Run the "very disappointed" survey with active customers. Below 40%, find what the most disappointed customers have in common.',
  },
  {
    id: 'engagement',
    dimension: 'Engagement',
    prompt: 'How often do active customers use the product compared with how often it is meant to be used?',
    choices: [
      { value: 'rarely', label: 'Rarely', points: 15 },
      { value: 'sometimes', label: 'Less than intended', points: 40 },
      { value: 'intended', label: 'About as intended', points: 75 },
      { value: 'more', label: 'More than intended', points: 95 },
      DK,
    ],
    fix: 'Define the one action that shows a customer got value, then measure how often it happens per customer.',
  },
  {
    id: 'timeToValue',
    dimension: 'Time to value',
    prompt: 'How long does a new customer take to get their first real result?',
    choices: [
      { value: 'gt1m', label: 'Over a month', points: 15 },
      { value: '1-4w', label: '1–4 weeks', points: 45 },
      { value: 'days', label: 'A few days', points: 75 },
      { value: 'same', label: 'The same day', points: 95 },
      DK,
    ],
    fix: 'Shorten onboarding to the first result. Most churn happens before customers reach it.',
  },
  {
    id: 'expansion',
    dimension: 'Expansion',
    prompt: 'Do existing customers spend more with you over time?',
    choices: [
      { value: 'no', label: 'No, or they spend less', points: 10 },
      { value: 'few', label: 'A few do', points: 35 },
      { value: 'some', label: 'Many do', points: 65 },
      { value: 'most', label: 'Yes, they spend more in total than when they joined', points: 95 },
      DK,
    ],
    fix: 'Look at what the customers who upgrade have in common, and build the path for others to follow.',
  },
  {
    id: 'referral',
    dimension: 'Referrals',
    prompt: 'What share of new customers come from referrals or word of mouth?',
    choices: [
      { value: 'lt5', label: 'Under 5%', points: 10 },
      { value: '5-15', label: '5–15%', points: 40 },
      { value: '15-30', label: '15–30%', points: 70 },
      { value: 'gt30', label: 'Over 30%', points: 95 },
      DK,
    ],
    fix: 'Ask every new customer how they heard of you. Referrals are the cheapest proof that customers value you.',
  },
]

export const OPS_OPTIONS = [
  { value: 'founder', label: 'The founder decides almost everything' },
  { value: 'informal', label: 'Roles exist, but decisions and processes are informal' },
  { value: 'documented', label: 'Roles, decision rights and key processes are written down' },
] as const

export const RAISE_OPTIONS = [
  { value: '0-6', label: 'In the next 6 months' },
  { value: '6-12', label: 'In 6–12 months' },
  { value: 'no', label: 'Not planning to raise' },
] as const

export type OpsValue = (typeof OPS_OPTIONS)[number]['value']
export type RaiseValue = (typeof RAISE_OPTIONS)[number]['value']
export type StageValue = (typeof STAGE_OPTIONS)[number]['value']

export type Answers = Partial<Record<DimensionKey, string>> & {
  stage?: StageValue
  raise?: RaiseValue
  ops?: OpsValue
}

export const TOTAL_STEPS = SCORED_QUESTIONS.length + 3

export interface Gap {
  id: DimensionKey
  dimension: string
  points: number
  unmeasured: boolean
  fix: string
}

export interface SnapshotResult {
  score: number
  band: 'searching' | 'emerging' | 'strong'
  bandLabel: string
  bandSummary: string
  dimensions: { id: DimensionKey; dimension: string; points: number; unmeasured: boolean; weight: number }[]
  gaps: Gap[]
  unmeasuredCount: number
  recommended: Exclude<FoundryPackageId, never>
  recommendationReason: string
}

export function scoreSnapshot(answers: Answers): SnapshotResult {
  const dimensions = SCORED_QUESTIONS.map((q) => {
    const choice = q.choices.find((c) => c.value === answers[q.id])
    const unmeasured = !choice || choice.points === null
    return {
      id: q.id,
      dimension: q.dimension,
      points: unmeasured ? 0 : (choice!.points as number),
      unmeasured,
      weight: DIMENSION_WEIGHTS[q.id],
    }
  })
  const score = Math.round(dimensions.reduce((s, d) => s + d.points * d.weight, 0))
  const unmeasuredCount = dimensions.filter((d) => d.unmeasured).length

  // Biggest weighted shortfall first; unmeasured counts as a full shortfall.
  const gaps: Gap[] = [...dimensions]
    .map((d) => ({ d, shortfall: (100 - d.points) * d.weight }))
    .filter(({ d }) => d.unmeasured || d.points < 70)
    .sort((a, b) => b.shortfall - a.shortfall)
    .slice(0, 3)
    .map(({ d }) => ({
      id: d.id,
      dimension: d.dimension,
      points: d.points,
      unmeasured: d.unmeasured,
      fix: SCORED_QUESTIONS.find((q) => q.id === d.id)!.fix,
    }))

  const band = score >= 70 ? 'strong' : score >= 40 ? 'emerging' : 'searching'
  const bandLabel = { strong: 'Strong PMF signals', emerging: 'Emerging fit', searching: 'Still searching' }[band]
  const bandSummary = {
    strong: 'Customers stay, pay and bring others. The next risk is scaling the company around the product.',
    emerging: 'Some customers clearly value the product, but the evidence is uneven. Investors will probe the weak spots.',
    searching: 'The evidence for product-market fit is thin so far. Spending on growth now would mostly buy churn.',
  }[band]

  const { recommended, recommendationReason } = recommend(score, answers)
  return { score, band, bandLabel, bandSummary, dimensions, gaps, unmeasuredCount, recommended, recommendationReason }
}

function recommend(score: number, a: Answers): { recommended: FoundryPackageId; recommendationReason: string } {
  const raisingSoon = a.raise === '0-6'
  const opsWeak = a.ops === 'founder' || a.ops === 'informal'
  const later = a.stage === 'series-a' || a.stage === 'series-b-plus'

  if (score >= 70 && later && !opsWeak) {
    return {
      recommended: 'venture',
      recommendationReason: 'Your core product shows strong signals and your operations are documented. You are ready to co-build the next venture: a second product, a spin-out or a new market.',
    }
  }
  if (raisingSoon && score < 70 && opsWeak) {
    return {
      recommended: 'foundry',
      recommendationReason: 'You plan to raise within 6 months, the PMF evidence has gaps and decisions still sit with a few people. The Foundry Package closes both before you meet investors.',
    }
  }
  if (score < 70 || raisingSoon) {
    return {
      recommended: 'pmf',
      recommendationReason: 'The priority is evidence: a measured PMF score and a narrative investors accept, built from your real customer data.',
    }
  }
  return {
    recommended: 'os-lite',
    recommendationReason: 'Your PMF signals are solid. What usually breaks next is the operating model, so install it before the team grows further.',
  }
}

/* ---------- Save request (lead capture) ---------- */

const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [T[number]['value'], ...T[number]['value'][]]

const answerShape = Object.fromEntries(
  SCORED_QUESTIONS.map((q) => [q.id, z.enum(q.choices.map((c) => c.value) as [string, ...string[]])]),
) as Record<DimensionKey, z.ZodEnum<Record<string, string>>>

export const pmfCheckSaveSchema = z.object({
  answers: z.object({
    ...answerShape,
    stage: z.enum(values(STAGE_OPTIONS)),
    raise: z.enum(values(RAISE_OPTIONS)),
    ops: z.enum(values(OPS_OPTIONS)),
  }),
  founderName: z.string().trim().min(1, 'Your name is required').max(120),
  email: z.string().trim().toLowerCase().pipe(z.email('Enter a valid email address').max(254)),
  companyName: z.string().trim().min(1, 'Company name is required').max(160),
  country: z.string().trim().min(1, 'Country is required').max(80),
  teamSize: z.enum(values(TEAM_SIZE_OPTIONS), { error: 'Select your team size' }),
  heardFrom: z.enum(values(HEARD_FROM_OPTIONS), { error: 'Tell us how you heard of us' }),
  consent: z.literal(true, { error: 'Please agree to be contacted so we can send your review' }),
  [HONEYPOT_FIELD]: z.string().optional(),
})

export type PmfCheckSaveInput = z.input<typeof pmfCheckSaveSchema>

export type PmfCheckSaveResponse =
  | { ok: true }
  | { ok: false; error: 'validation'; fieldErrors: Record<string, string[]> }
  | { ok: false; error: 'rate_limited'; retryAfterSeconds: number }
  | { ok: false; error: 'invalid_json' | 'server_error' }

/** Plain-text summary stored in foundry_applications.goals and sent to admin. */
export function summariseSnapshot(answers: Answers, r: SnapshotResult): string {
  const label = (q: ScoredQuestion) => q.choices.find((c) => c.value === answers[q.id])?.label ?? '-'
  const lines = [
    `Free PMF snapshot: ${r.score}/100 (${r.bandLabel}). Recommended: ${r.recommended}.`,
    ...SCORED_QUESTIONS.map((q) => `${q.dimension}: ${label(q)}`),
    `Raising: ${RAISE_OPTIONS.find((o) => o.value === answers.raise)?.label ?? '-'}`,
    `Operations: ${OPS_OPTIONS.find((o) => o.value === answers.ops)?.label ?? '-'}`,
    `Top gaps: ${r.gaps.map((g) => g.dimension).join(', ') || 'none'}`,
  ]
  return lines.join('\n').slice(0, 1500)
}
