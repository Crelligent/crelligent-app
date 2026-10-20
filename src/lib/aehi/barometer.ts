/**
 * AEHI Executive Barometer: validation, scoring, eligibility and aggregation.
 * Pure module (zod only), safe to import from client components and unit tests.
 */
import { z } from 'zod'
import {
  CONFIDENCE_ITEMS,
  CONSTRAINTS,
  EMPLOYEE_BANDS,
  LOCATIONS,
  MAX_CONSTRAINTS,
  MIN_SUBGROUP_SAMPLE,
  MIN_WAVE_SAMPLE,
  OUTLOOK_ITEMS,
  REVENUE_BANDS,
  ROLES,
  SECTORS,
  TRUST_ITEMS,
  type BarometerAnswers,
  type ConfidenceId,
  type ConstraintId,
  type OutlookId,
  type TrustId,
} from '@/data/aehi/barometer'
import { MIN_GROUP_SIZE } from './kanon'

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const likert = z.number().int().min(1).max(5)

function likertRecord<const T extends readonly { id: string }[]>(items: T, message: string) {
  const shape = Object.fromEntries(items.map((i) => [i.id, likert])) as { [K in T[number]['id']]: typeof likert }
  return z.object(shape, { message }).strict()
}

const choose = <const T extends readonly string[]>(values: T, message: string) => z.enum(values, { message })

const constraintIds = CONSTRAINTS.map((c) => c.id) as unknown as readonly [ConstraintId, ...ConstraintId[]]

export const answersSchema = z.object({
  role: choose(ROLES, 'Select your role'),
  sector: choose(SECTORS, 'Select a sector'),
  employees: choose(EMPLOYEE_BANDS, 'Select the number of staff'),
  revenue: choose(REVENUE_BANDS, 'Select a revenue band'),
  location: choose(LOCATIONS, 'Select where you are based'),
  confidence: likertRecord(CONFIDENCE_ITEMS, 'Answer every confidence question'),
  outlook: likertRecord(OUTLOOK_ITEMS, 'Answer every outlook question'),
  constraints: z
    .array(z.enum(constraintIds))
    .min(1, { message: 'Choose at least one constraint' })
    .max(MAX_CONSTRAINTS, { message: `Choose up to ${MAX_CONSTRAINTS}` })
    .refine((a) => new Set(a).size === a.length, { message: 'Each constraint can be chosen once' }),
  trust: likertRecord(TRUST_ITEMS, 'Answer every trust question'),
})

const optionalEmail = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, { message: 'Email is too long' })
  .optional()
  .transform((v) => (v ? v : undefined))
  .pipe(z.email({ message: 'Enter a valid email address' }).optional())

export const submissionSchema = z
  .object({
    answers: answersSchema,
    email: optionalEmail,
    wantsResults: z.boolean().optional().default(false),
    wantsDiagnostic: z.boolean().optional().default(false),
    consent: z.literal(true, { message: 'Please tick the box so we can store your answers' }),
    source: z
      .string()
      .trim()
      .regex(/^[a-z0-9_-]{1,40}$/)
      .optional(),
  })
  .refine((d) => d.email || (!d.wantsResults && !d.wantsDiagnostic), {
    message: 'Add your email so we can send it',
    path: ['email'],
  })

export type Submission = z.output<typeof submissionSchema>

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

/** 1..5 → 0..100 */
export const rescale = (v: number) => ((v - 1) / 4) * 100

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN)
const round1 = (x: number) => Math.round(x * 10) / 10

export interface Score {
  /** Enterprise Confidence Index, 0 to 100. */
  index: number
  /** Operating-model confidence sub-index, 0 to 100. */
  confidence: number
  /** Outlook sub-index, 0 to 100. */
  outlook: number
  /** Layer with the lowest confidence (first on ties, so L1 before L2). */
  weakestLayer: ConfidenceId
}

export function scoreAnswers(a: { confidence: Record<ConfidenceId, number>; outlook: Record<OutlookId, number> }): Score {
  const conf = mean(CONFIDENCE_ITEMS.map((i) => rescale(a.confidence[i.id])))
  const out = mean(OUTLOOK_ITEMS.map((i) => rescale(a.outlook[i.id])))
  let weakest: ConfidenceId = CONFIDENCE_ITEMS[0].id
  for (const i of CONFIDENCE_ITEMS) if (a.confidence[i.id] < a.confidence[weakest]) weakest = i.id
  return { index: round1((conf + out) / 2), confidence: round1(conf), outlook: round1(out), weakestLayer: weakest }
}

const SENIOR = new Set<string>(ROLES.slice(0, 3))
const SMALL_STAFF = new Set<string>([EMPLOYEE_BANDS[0]])
const SMALL_REVENUE = new Set<string>([REVENUE_BANDS[0], REVENUE_BANDS[1]])

/** See ELIGIBILITY_TEXT in src/data/aehi/barometer.ts. */
export function isEligible(a: Pick<BarometerAnswers, 'role' | 'employees' | 'revenue' | 'location'>): boolean {
  return SENIOR.has(a.role) && !SMALL_STAFF.has(a.employees) && !SMALL_REVENUE.has(a.revenue) && a.location !== 'Outside Nigeria'
}

// ---------------------------------------------------------------------------
// Aggregation (published results)
// ---------------------------------------------------------------------------

export interface StoredResponse {
  answers: BarometerAnswers
}

export interface WaveResults {
  n: number
  index: number
  confidence: number
  outlook: number
  /** Share (0-100) answering "very" or "completely" confident, per layer. */
  layerConfident: Record<ConfidenceId, number>
  /** Net balance per outlook item: % rise minus % fall (-100 to 100). */
  outlookNet: Record<OutlookId, number>
  /** Share (0-100) choosing each constraint, sorted high to low. */
  constraints: { id: ConstraintId; share: number }[]
  /** Share (0-100) naming at least one constraint inside the enterprise. */
  internalConstraintShare: number
  /** Share (0-100) trusting "a lot" or "completely". */
  trust: Record<TrustId, number>
  /** Sectors at or above the subgroup threshold only. */
  sectors: { sector: string; n: number; index: number }[]
}

const pct = (count: number, n: number) => round1((count / n) * 100)

/**
 * Computes wave results. Returns null when the sample is below MIN_WAVE_SAMPLE, so nothing
 * can be published from too few responses. Sector rows below MIN_SUBGROUP_SAMPLE are dropped.
 */
export function aggregate(rows: readonly StoredResponse[], minWave = MIN_WAVE_SAMPLE, minSub = MIN_SUBGROUP_SAMPLE): WaveResults | null {
  const floorWave = Math.max(minWave, MIN_GROUP_SIZE)
  const floorSub = Math.max(minSub, MIN_GROUP_SIZE)
  const valid = rows.map((r) => r.answers).filter((a) => answersSchema.safeParse(a).success)
  const n = valid.length
  if (n < floorWave) return null

  const scores = valid.map(scoreAnswers)
  const layerConfident = Object.fromEntries(
    CONFIDENCE_ITEMS.map((i) => [i.id, pct(valid.filter((a) => a.confidence[i.id] >= 4).length, n)]),
  ) as Record<ConfidenceId, number>
  const outlookNet = Object.fromEntries(
    OUTLOOK_ITEMS.map((i) => {
      const rise = valid.filter((a) => a.outlook[i.id] >= 4).length
      const fall = valid.filter((a) => a.outlook[i.id] <= 2).length
      return [i.id, round1(((rise - fall) / n) * 100)]
    }),
  ) as Record<OutlookId, number>
  const constraints = CONSTRAINTS.map((c) => ({ id: c.id, share: pct(valid.filter((a) => a.constraints.includes(c.id)).length, n) })).sort(
    (x, y) => y.share - x.share,
  )
  const internalIds = new Set<string>(CONSTRAINTS.filter((c) => c.internal).map((c) => c.id))
  const internalConstraintShare = pct(valid.filter((a) => a.constraints.some((c) => internalIds.has(c))).length, n)
  const trust = Object.fromEntries(TRUST_ITEMS.map((i) => [i.id, pct(valid.filter((a) => a.trust[i.id] >= 4).length, n)])) as Record<
    TrustId,
    number
  >

  const bySector = new Map<string, number[]>()
  valid.forEach((a, idx) => {
    const list = bySector.get(a.sector) ?? []
    list.push(scores[idx].index)
    bySector.set(a.sector, list)
  })
  const sectors = [...bySector.entries()]
    .filter(([, xs]) => xs.length >= floorSub)
    .map(([sector, xs]) => ({ sector, n: xs.length, index: round1(mean(xs)) }))
    .sort((x, y) => y.index - x.index)

  return {
    n,
    index: round1(mean(scores.map((s) => s.index))),
    confidence: round1(mean(scores.map((s) => s.confidence))),
    outlook: round1(mean(scores.map((s) => s.outlook))),
    layerConfident,
    outlookNet,
    constraints,
    internalConstraintShare,
    trust,
    sectors,
  }
}
