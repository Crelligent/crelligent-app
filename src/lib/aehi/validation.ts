/**
 * Request validation for the AEHI site's form endpoints.
 * Pure module (only depends on zod) so it can be unit-tested with node:test.
 */
import { z } from 'zod'

/** Optional free-text field: trims, treats "" as absent, enforces a max length. */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { message: `Must be ${max} characters or fewer` })
    .optional()
    .transform((v) => (v ? v : undefined))

const email = z
  .string({ message: 'Enter your email address' })
  .trim()
  .toLowerCase()
  .max(254, { message: 'Email is too long' })
  .pipe(z.email({ message: 'Enter a valid email address' }))

const consent = z.literal(true, { message: 'Please tick the box to agree' })

/** Short slug identifying where on the site a form was submitted, e.g. "report". */
const source = z
  .string()
  .trim()
  .regex(/^[a-z0-9_-]{1,40}$/, { message: 'Invalid source' })
  .optional()

/** Honeypot: real users never see or fill this field. */
export const HONEYPOT_FIELD = 'website'

export const notifySchema = z.object({
  name: z.string({ message: 'Enter your name' }).trim().min(2, { message: 'Enter your name' }).max(120, { message: 'Name is too long' }),
  email,
  organisation: z
    .string({ message: 'Enter your organisation' })
    .trim()
    .min(2, { message: 'Enter your organisation' })
    .max(160, { message: 'Organisation is too long' }),
  role: optionalText(120),
  country: optionalText(80),
  consent,
  source,
})

export const institutionalSchema = z.object({
  firstName: z.string({ message: 'Enter your first name' }).trim().min(1, { message: 'Enter your first name' }).max(60, { message: 'First name is too long' }),
  lastName: z.string({ message: 'Enter your last name' }).trim().min(1, { message: 'Enter your last name' }).max(60, { message: 'Last name is too long' }),
  email,
  institution: z
    .string({ message: 'Enter your institution' })
    .trim()
    .min(2, { message: 'Enter your institution' })
    .max(160, { message: 'Institution name is too long' }),
  institutionType: z.string({ message: 'Select a type' }).trim().min(2, { message: 'Select a type' }).max(80, { message: 'Select a type' }),
  interest: z.string({ message: 'Select what you are interested in' }).trim().min(2, { message: 'Select what you are interested in' }).max(80, { message: 'Select what you are interested in' }),
  message: optionalText(1500),
  country: optionalText(80),
  consent,
  source,
})

export type NotifyInput = z.output<typeof notifySchema>
export type InstitutionalInput = z.output<typeof institutionalSchema>

export type FieldErrors = Record<string, string>

export type ValidationResult<T> = { ok: true; data: T } | { ok: false; fieldErrors: FieldErrors }

/** Validates `body` and returns either the parsed data or a { field: firstMessage } map. */
export function validate<S extends z.ZodType>(schema: S, body: unknown): ValidationResult<z.output<S>> {
  const parsed = schema.safeParse(body)
  if (parsed.success) return { ok: true, data: parsed.data }
  const fieldErrors: FieldErrors = {}
  for (const issue of parsed.error.issues) {
    const key = issue.path.length ? String(issue.path[0]) : '_form'
    if (!(key in fieldErrors)) fieldErrors[key] = issue.message
  }
  return { ok: false, fieldErrors }
}

/** True when the honeypot field is present and non-empty (a bot filled it in). */
export function isHoneypotTripped(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false
  const v = (body as Record<string, unknown>)[HONEYPOT_FIELD]
  return typeof v === 'string' ? v.trim().length > 0 : v != null && v !== false
}

/** Removes CR/LF and collapses whitespace, for values placed in email subjects. */
export function oneLine(value: string, max = 120): string {
  return value.replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim().slice(0, max)
}
