/**
 * Foundry application schema: shared by the /foundry/apply form (client) and POST /api/foundry/apply (server).
 * Client-safe: no server-only imports. Keep option values in sync with the CHECK constraints in
 * supabase/migrations/20261012_foundry.sql.
 */
import { z } from 'zod'
import type { FoundryPackageId, FoundryPath } from './packages'

type Option<V extends string> = { value: V; label: string }

export const STAGE_OPTIONS = [
  { value: 'idea', label: 'Idea' },
  { value: 'pre-seed', label: 'Pre-seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series-a', label: 'Series A' },
  { value: 'series-b-plus', label: 'Series B+' },
] as const satisfies readonly Option<string>[]

export const TEAM_SIZE_OPTIONS = [
  { value: '1', label: 'Just me' },
  { value: '2-5', label: '2–5' },
  { value: '6-15', label: '6–15' },
  { value: '16-50', label: '16–50' },
  { value: '51-200', label: '51–200' },
  { value: '200+', label: '200+' },
] as const satisfies readonly Option<string>[]

export const PATH_OPTIONS = [
  { value: 'validate', label: 'Validate & scale' },
  { value: 'venture', label: 'Venture build' },
] as const satisfies readonly Option<FoundryPath>[]

/** Package ids from packages.ts plus "not-sure". */
export const PACKAGE_INTEREST_OPTIONS = [
  { value: 'pmf', label: 'PMF Validation' },
  { value: 'os-lite', label: 'ESRE OS Lite' },
  { value: 'foundry', label: 'Foundry Package' },
  { value: 'venture', label: 'Venture Build' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const satisfies readonly Option<FoundryPackageId | 'not-sure'>[]

/** Monthly revenue bands (NGN). Optional field. */
export const REVENUE_BAND_OPTIONS = [
  { value: 'pre-revenue', label: 'Pre-revenue' },
  { value: 'under-1m', label: 'Under ₦1m / month' },
  { value: '1m-5m', label: '₦1m – ₦5m / month' },
  { value: '5m-20m', label: '₦5m – ₦20m / month' },
  { value: '20m-100m', label: '₦20m – ₦100m / month' },
  { value: 'over-100m', label: 'Over ₦100m / month' },
  { value: 'prefer-not', label: 'Prefer not to say' },
] as const satisfies readonly Option<string>[]

export const HEARD_FROM_OPTIONS = [
  { value: 'referral', label: 'Referral or word of mouth' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'email', label: 'Email from Crelligent' },
  { value: 'search', label: 'Search engine' },
  { value: 'event', label: 'Event or talk' },
  { value: 'social', label: 'Other social media' },
  { value: 'velodesk', label: 'VeloDesk' },
  { value: 'other', label: 'Other' },
] as const satisfies readonly Option<string>[]

type Values<T extends readonly { value: string }[]> = T[number]['value']
const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [Values<T>, ...Values<T>[]]

export type FoundryStage = Values<typeof STAGE_OPTIONS>
export type FoundryTeamSize = Values<typeof TEAM_SIZE_OPTIONS>
export type FoundryPackageInterest = Values<typeof PACKAGE_INTEREST_OPTIONS>
export type FoundryRevenueBand = Values<typeof REVENUE_BAND_OPTIONS>
export type FoundryHeardFrom = Values<typeof HEARD_FROM_OPTIONS>

export const GOALS_MAX = 1500
/** Hidden honeypot input name. Real users leave it empty. */
export const HONEYPOT_FIELD = 'website_url' as const

/** Trim; turn "" into undefined so optional fields accept empty inputs. */
const optionalText = (max: number) =>
  z.preprocess(
    (v) => (typeof v === 'string' ? (v.trim() === '' ? undefined : v.trim()) : v),
    z.string().max(max).optional(),
  )

const requiredText = (label: string, max: number) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be ${max} characters or fewer`)

const enumField = <T extends readonly { value: string }[]>(opts: T, message: string) =>
  z.enum(values(opts), { error: message })

const WEBSITE_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i
const PHONE_RE = /^[+()\-.\s0-9]{6,40}$/

export const foundryApplicationSchema = z
  .object({
    founderName: requiredText('Your name', 120),
    email: z.string().trim().toLowerCase().pipe(z.email('Enter a valid email address').max(254)),
    phone: optionalText(40).refine((v) => v === undefined || PHONE_RE.test(v), 'Enter a valid phone number'),
    companyName: requiredText('Company name', 160),
    website: optionalText(300)
      .refine((v) => v === undefined || WEBSITE_RE.test(v), 'Enter a valid website, e.g. example.com')
      .transform((v) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v)),
    country: requiredText('Country', 80),
    stage: enumField(STAGE_OPTIONS, 'Select your stage'),
    teamSize: enumField(TEAM_SIZE_OPTIONS, 'Select your team size'),
    path: enumField(PATH_OPTIONS, 'Select a path'),
    packageInterest: enumField(PACKAGE_INTEREST_OPTIONS, 'Select a package'),
    revenueBand: z.preprocess(
      (v) => (v === '' || v === null ? undefined : v),
      enumField(REVENUE_BAND_OPTIONS, 'Select a revenue band').optional(),
    ),
    goals: requiredText('What you want to achieve', GOALS_MAX),
    heardFrom: enumField(HEARD_FROM_OPTIONS, 'Tell us how you heard of us'),
    heardFromOther: optionalText(200),
    consent: z.literal(true, { error: 'Please agree to be contacted so we can reply' }),
    /** Honeypot: must be empty. The server silently accepts (and drops) filled submissions. */
    [HONEYPOT_FIELD]: z.string().optional(),
  })
  .superRefine((d, ctx) => {
    if (d.path === 'venture' && d.packageInterest !== 'venture' && d.packageInterest !== 'not-sure') {
      ctx.addIssue({
        code: 'custom',
        path: ['packageInterest'],
        message: 'Venture build applications use the Venture Build package',
      })
    }
    if (d.path === 'validate' && d.packageInterest === 'venture') {
      ctx.addIssue({
        code: 'custom',
        path: ['packageInterest'],
        message: 'Venture Build belongs to the Venture build path',
      })
    }
  })

/** What the form sends (before parsing). */
export type FoundryApplicationInput = z.input<typeof foundryApplicationSchema>
/** Parsed, normalised application. */
export type FoundryApplication = z.output<typeof foundryApplicationSchema>

/** Response shapes for POST /api/foundry/apply. */
export type FoundryApplyResponse =
  | { ok: true }
  | { ok: false; error: 'validation'; fieldErrors: Record<string, string[]>; formErrors: string[] }
  | { ok: false; error: 'rate_limited'; retryAfterSeconds: number }
  | { ok: false; error: 'invalid_json' | 'server_error' }
