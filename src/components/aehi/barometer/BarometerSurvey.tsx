'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  CONFIDENCE_ITEMS,
  CONFIDENCE_SCALE,
  CONSTRAINTS,
  EMPLOYEE_BANDS,
  INDEX_NAME,
  LOCATIONS,
  MAX_CONSTRAINTS,
  OUTLOOK_ITEMS,
  OUTLOOK_SCALE,
  REVENUE_BANDS,
  ROLES,
  SECTORS,
  TRUST_ITEMS,
  TRUST_SCALE,
  WAVE,
  type BarometerAnswers,
  type ConstraintId,
  type Item,
  type Likert,
} from '@/data/aehi/barometer'
import { LAYER_BY_CODE, type LayerCode } from '@/data/aehi/edition'
import type { Score } from '@/lib/aehi/barometer'
import { DiagnosticLink } from '@/components/aehi/ui/DiagnosticLink'
import { track } from '@/components/aehi/ui/analytics'
import { Checkbox, Field, FieldError, FormAlert, SelectInput, Spinner, SuccessPanel, TextInput } from '@/components/aehi/forms/fields'

type Draft = {
  role: string
  sector: string
  employees: string
  revenue: string
  location: string
  confidence: Partial<Record<string, Likert>>
  outlook: Partial<Record<string, Likert>>
  constraints: ConstraintId[]
  trust: Partial<Record<string, Likert>>
}

const EMPTY: Draft = { role: '', sector: '', employees: '', revenue: '', location: '', confidence: {}, outlook: {}, constraints: [], trust: {} }

const STEPS = ['Your enterprise', 'Your operating model', 'The year ahead', 'Trust', 'Finish'] as const

const MSG_NETWORK = 'We could not save your answers. Please try again, or email aehi@crelligent.com.'
const MSG_RATE = 'Too many responses from this connection. Please wait a little and try again.'

type Errors = Record<string, string>

function stepErrors(step: number, d: Draft): Errors {
  const e: Errors = {}
  if (step === 0) {
    if (!d.role) e.role = 'Select your role.'
    if (!d.sector) e.sector = 'Select a sector.'
    if (!d.employees) e.employees = 'Select the number of staff.'
    if (!d.revenue) e.revenue = 'Select a revenue band, or "Prefer not to say".'
    if (!d.location) e.location = 'Select where the enterprise is based.'
  }
  const needAll = (items: readonly Item[], rec: Draft['confidence'], prefix: string) =>
    items.forEach((i) => {
      if (!rec[i.id]) e[`${prefix}.${i.id}`] = 'Choose one answer.'
    })
  if (step === 1) needAll(CONFIDENCE_ITEMS, d.confidence, 'confidence')
  if (step === 2) {
    needAll(OUTLOOK_ITEMS, d.outlook, 'outlook')
    if (d.constraints.length === 0) e.constraints = `Choose at least one, and up to ${MAX_CONSTRAINTS}.`
  }
  if (step === 3) needAll(TRUST_ITEMS, d.trust, 'trust')
  return e
}

/** A 1-to-5 question as a group of radio "pills". */
function LikertRow({
  name,
  item,
  scale,
  value,
  error,
  onChange,
}: {
  name: string
  item: Item
  scale: readonly string[]
  value?: Likert
  error?: string
  onChange: (v: Likert) => void
}) {
  const id = name.replace('.', '-')
  return (
    <fieldset id={id} tabIndex={-1} className="border-t border-aehi-line py-5 focus:outline-none" aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="float-left w-full">
        <span className="t-body block font-medium text-aehi-text">{item.label}</span>
        {item.hint && <span className="t-small mt-0.5 block text-aehi-text-subtle">{item.hint}</span>}
      </legend>
      <div className="clear-both flex flex-wrap gap-2 pt-3">
        {scale.map((label, idx) => {
          const v = (idx + 1) as Likert
          return (
            <label
              key={label}
              className="t-small cursor-pointer select-none rounded-md border border-aehi-line-strong px-3 py-2 text-aehi-text-muted transition-colors duration-150 hover:border-aehi-text-subtle has-[:checked]:border-aehi-accent has-[:checked]:bg-aehi-accent-tint has-[:checked]:text-aehi-text has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-aehi-accent"
            >
              <input type="radio" className="sr-only" name={name} value={v} checked={value === v} onChange={() => onChange(v)} />
              {label}
            </label>
          )
        })}
      </div>
      <FieldError id={id} message={error} />
    </fieldset>
  )
}

function ScoreResult({ score, email, headingRef }: { score: Score; email?: string; headingRef: React.Ref<HTMLHeadingElement> }) {
  const weakest = LAYER_BY_CODE[score.weakestLayer as LayerCode]
  return (
    <div className="space-y-6">
      <SuccessPanel title="Thank you. Your answers are in." headingRef={headingRef}>
        <p>
          They will count towards {WAVE.label}, which closes at {WAVE.closesLabel}. Results are published only as anonymised totals.
          {email ? ` We'll email ${email} if you asked us to.` : ''}
        </p>
      </SuccessPanel>

      <div className="panel">
        <p className="t-label text-aehi-text-subtle">Your {INDEX_NAME}</p>
        <p className="mt-2 font-mono text-6xl font-medium tabular-nums text-aehi-text">
          {Math.round(score.index)}
          <span className="text-2xl text-aehi-text-subtle">/100</span>
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-aehi-line pt-5">
          <div>
            <dt className="t-small text-aehi-text-subtle">Confidence in your operating model</dt>
            <dd className="t-data mt-1 text-xl tabular-nums text-aehi-text">{Math.round(score.confidence)}/100</dd>
          </div>
          <div>
            <dt className="t-small text-aehi-text-subtle">Outlook for the next 12 months</dt>
            <dd className="t-data mt-1 text-xl tabular-nums text-aehi-text">{Math.round(score.outlook)}/100</dd>
          </div>
        </dl>
        <p className="t-body mt-6">
          You were least confident in <strong className="text-aehi-text">{weakest.name}</strong> ({weakest.code}). This score is what you
          believe. The diagnostic measures it: it scores your enterprise on all five layers and shows where the primary constraint is.
        </p>
        <div className="mt-6">
          <DiagnosticLink location="barometer-result" fullWidthOnMobile />
        </div>
        <p className="t-small mt-6 text-aehi-text-subtle">
          The wave average is not shown yet. It is published when fieldwork closes and enough leaders have answered.
        </p>
      </div>
    </div>
  )
}

export function BarometerSurvey({ source = 'barometer' }: { source?: string }) {
  const [step, setStep] = useState(0)
  const [d, setD] = useState<Draft>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [email, setEmail] = useState('')
  const [wantsResults, setWantsResults] = useState(false)
  const [wantsDiagnostic, setWantsDiagnostic] = useState(false)
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [result, setResult] = useState<Score | null>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (result) headingRef.current?.focus()
  }, [result])

  const update = (patch: Partial<Draft>) => {
    if (!started.current) {
      started.current = true
      track('barometer_start', { source })
    }
    setD((prev) => ({ ...prev, ...patch }))
  }
  const clear = (key: string) => setErrors((prev) => (key in prev ? Object.fromEntries(Object.entries(prev).filter(([k]) => k !== key)) : prev))

  const focusFirst = (e: Errors) => {
    const first = Object.keys(e)[0]
    if (!first) return
    requestAnimationFrame(() => document.getElementById(`bar-${first.replace('.', '-')}`)?.focus())
  }

  const goTo = (next: number) => {
    setStep(next)
    setErrors({})
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      topRef.current?.focus({ preventScroll: true })
    })
  }

  const next = () => {
    const e = stepErrors(step, d)
    setErrors(e)
    if (Object.keys(e).length) return focusFirst(e)
    goTo(step + 1)
  }

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const e: Errors = {}
    const trimmed = email.trim()
    if (trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) e.email = 'Enter an email address like name@company.com.'
    if (!trimmed && (wantsResults || wantsDiagnostic)) e.email = 'Add your email, or untick the boxes below.'
    if (!consent) e.consent = 'Tick this box so we can store your answers.'
    setErrors(e)
    if (Object.keys(e).length) return focusFirst(e)

    setSubmitting(true)
    setFormError(null)
    try {
      const answers = d as unknown as BarometerAnswers
      const res = await fetch('/api/aehi/barometer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          email: trimmed || undefined,
          wantsResults: !!trimmed && wantsResults,
          wantsDiagnostic: !!trimmed && wantsDiagnostic,
          consent: true,
          source,
          website,
        }),
      })
      const body = (await res.json().catch(() => null)) as { ok: boolean; score?: Score; message?: string; fieldErrors?: Errors } | null
      if (body?.ok && body.score) {
        track('barometer_submit', { source })
        setResult(body.score)
        return
      }
      if (res.status === 429) return setFormError(MSG_RATE)
      if (body?.fieldErrors?.email) {
        setErrors({ email: body.fieldErrors.email })
        return focusFirst({ email: '' })
      }
      setFormError(body?.message ?? MSG_NETWORK)
    } catch {
      setFormError(MSG_NETWORK)
    } finally {
      setSubmitting(false)
    }
  }

  if (result) return <ScoreResult score={result} email={email.trim() && wantsResults ? email.trim() : undefined} headingRef={headingRef} />

  const select = (key: 'role' | 'sector' | 'employees' | 'revenue' | 'location', label: string, options: readonly string[]) => (
    <Field id={`bar-${key}`} label={label} error={errors[key]}>
      <SelectInput
        id={`bar-${key}`}
        options={options}
        placeholder="Select…"
        value={d[key]}
        invalid={!!errors[key]}
        onChange={(e) => {
          update({ [key]: e.target.value } as Partial<Draft>)
          clear(key)
        }}
      />
    </Field>
  )

  const likerts = (items: readonly Item[], block: 'confidence' | 'outlook' | 'trust', scale: readonly string[]) =>
    items.map((item) => (
      <LikertRow
        key={item.id}
        name={`bar-${block}.${item.id}`}
        item={item}
        scale={scale}
        value={d[block][item.id]}
        error={errors[`${block}.${item.id}`]}
        onChange={(v) => {
          update({ [block]: { ...d[block], [item.id]: v } } as Partial<Draft>)
          clear(`${block}.${item.id}`)
        }}
      />
    ))

  const isLast = step === STEPS.length - 1

  return (
    <div className="panel">
      <div ref={topRef} tabIndex={-1} className="scroll-mt-28 focus:outline-none">
        <div className="flex items-baseline justify-between gap-4">
          <p className="t-label text-aehi-text-subtle">
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="t-small text-aehi-text-subtle">{WAVE.label}</p>
        </div>
        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          {STEPS.map((s, i) => (
            <span key={s} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-aehi-accent' : 'bg-aehi-line'}`} />
          ))}
        </div>
        <h2 className="t-h3 mt-6">{STEPS[step]}</h2>
      </div>

      <form onSubmit={isLast ? submit : (e) => (e.preventDefault(), next())} noValidate className="mt-4" aria-label="Executive Barometer survey">
        {step === 0 && (
          <div className="space-y-5 pt-2">
            <p className="t-small text-aehi-text-muted">About you and the enterprise you lead. Used only to group answers.</p>
            {select('role', 'Your role', ROLES)}
            {select('sector', 'Main sector', SECTORS)}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {select('employees', 'Number of staff', EMPLOYEE_BANDS)}
              {select('revenue', 'Annual revenue', REVENUE_BANDS)}
            </div>
            {select('location', 'Where the enterprise is based', LOCATIONS)}
          </div>
        )}

        {step === 1 && (
          <>
            <p className="t-small text-aehi-text-muted">
              Over the next 12 months, how confident are you that each part of your business can support your plans?
            </p>
            <div className="mt-2">{likerts(CONFIDENCE_ITEMS, 'confidence', CONFIDENCE_SCALE)}</div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="t-small text-aehi-text-muted">Over the next 12 months, compared with the last 12, do you expect each of these to…</p>
            <div className="mt-2">{likerts(OUTLOOK_ITEMS, 'outlook', OUTLOOK_SCALE)}</div>
            <fieldset id="bar-constraints" tabIndex={-1} className="border-t border-aehi-line py-5 focus:outline-none">
              <legend className="float-left w-full">
                <span className="t-body block font-medium text-aehi-text">What most holds your business back right now?</span>
                <span className="t-small mt-0.5 block text-aehi-text-subtle">
                  Choose up to {MAX_CONSTRAINTS}. {d.constraints.length}/{MAX_CONSTRAINTS} chosen.
                </span>
              </legend>
              <div className="clear-both grid grid-cols-1 gap-2 pt-3 sm:grid-cols-2">
                {CONSTRAINTS.map((c) => {
                  const checked = d.constraints.includes(c.id)
                  const full = !checked && d.constraints.length >= MAX_CONSTRAINTS
                  return (
                    <label
                      key={c.id}
                      className={`t-small flex items-start gap-3 rounded-md border px-3 py-2.5 transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-aehi-accent ${
                        checked
                          ? 'border-aehi-accent bg-aehi-accent-tint text-aehi-text'
                          : full
                            ? 'cursor-not-allowed border-aehi-line text-aehi-text-subtle'
                            : 'cursor-pointer border-aehi-line-strong text-aehi-text-muted hover:border-aehi-text-subtle'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 flex-none accent-[var(--accent)]"
                        checked={checked}
                        disabled={full}
                        onChange={() => {
                          update({ constraints: checked ? d.constraints.filter((x) => x !== c.id) : [...d.constraints, c.id] })
                          clear('constraints')
                        }}
                      />
                      {c.label}
                    </label>
                  )
                })}
              </div>
              <FieldError id="bar-constraints" message={errors.constraints} />
            </fieldset>
          </>
        )}

        {step === 3 && (
          <>
            <p className="t-small text-aehi-text-muted">How much do you trust each of these to support your business over the next 12 months?</p>
            <div className="mt-2">{likerts(TRUST_ITEMS, 'trust', TRUST_SCALE)}</div>
          </>
        )}

        {isLast && (
          <div className="space-y-5 pt-2">
            <p className="t-small text-aehi-text-muted">
              Your email is optional. Without it your answers are anonymous. With it, we can send you the results and invite you to the
              diagnostic. It is never published or shared.
            </p>
            <div className="sr-only" aria-hidden="true">
              <label>
                Website
                <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
            </div>
            <Field id="bar-email" label="Work email (optional)" error={errors.email}>
              <TextInput
                id="bar-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                invalid={!!errors.email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clear('email')
                }}
              />
            </Field>
            <Checkbox
              id="bar-results"
              label="Email me the results of this wave when they are published."
              checked={wantsResults}
              onChange={(e) => setWantsResults(e.target.checked)}
            />
            <Checkbox
              id="bar-diagnostic"
              label="Invite me to take the full diagnostic for my enterprise."
              checked={wantsDiagnostic}
              onChange={(e) => setWantsDiagnostic(e.target.checked)}
            />
            <div className="border-t border-aehi-line pt-5">
              <Checkbox
                id="bar-consent"
                label="Crelligent may store my answers and use them, anonymised and only in totals, in the AEHI Executive Barometer."
                checked={consent}
                invalid={!!errors.consent}
                error={errors.consent}
                onChange={(e) => {
                  setConsent(e.target.checked)
                  clear('consent')
                }}
              />
            </div>
            {formError && <FormAlert message={formError} />}
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" className="btn btn-secondary w-full sm:w-auto" onClick={() => goTo(step - 1)} disabled={submitting}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
          ) : (
            <span />
          )}
          <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={submitting} aria-busy={submitting || undefined}>
            {submitting && <Spinner />}
            {isLast ? (submitting ? 'Sending…' : 'Send my answers') : 'Continue'}
            {!isLast && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </form>
    </div>
  )
}
