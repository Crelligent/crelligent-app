'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowRight, CheckCircle2, Clock, Loader2 } from 'lucide-react'
import { z } from 'zod'
import type { FoundryPath } from '@/lib/foundry/packages'
import {
  foundryApplicationSchema,
  GOALS_MAX,
  HEARD_FROM_OPTIONS,
  HONEYPOT_FIELD,
  REVENUE_BAND_OPTIONS,
  STAGE_OPTIONS,
  TEAM_SIZE_OPTIONS,
  type FoundryApplicationInput,
  type FoundryApplyResponse,
} from '@/lib/foundry/schema'
import { btnPrimary, btnSecondary, cx, linkAccent, linkAccentStandalone } from '../ui'
import {
  ChoiceChips,
  describedBy,
  Field,
  FieldError,
  GroupField,
  inputClass,
  PACKAGES_BY_PATH,
  PackageOptions,
  PathCards,
} from './fields'
import { WhatHappensNext } from './WhatHappensNext'

type Values = {
  founderName: string
  email: string
  phone: string
  companyName: string
  website: string
  country: string
  stage: string
  teamSize: string
  path: string
  packageInterest: string
  revenueBand: string
  goals: string
  heardFrom: string
  heardFromOther: string
  consent: boolean
  [HONEYPOT_FIELD]: string
}
type FieldName = Exclude<keyof Values, typeof HONEYPOT_FIELD>
type Errors = Partial<Record<string, string>>

const EMPTY: Values = {
  founderName: '',
  email: '',
  phone: '',
  companyName: '',
  website: '',
  country: '',
  stage: '',
  teamSize: '',
  path: '',
  packageInterest: '',
  revenueBand: '',
  goals: '',
  heardFrom: '',
  heardFromOther: '',
  consent: false,
  [HONEYPOT_FIELD]: '',
}

/** Visual order, used for the error summary and focusing the first invalid field. */
const FIELD_ORDER: FieldName[] = [
  'path',
  'packageInterest',
  'founderName',
  'email',
  'phone',
  'companyName',
  'website',
  'country',
  'stage',
  'teamSize',
  'revenueBand',
  'goals',
  'heardFrom',
  'heardFromOther',
  'consent',
]

const FIELD_LABELS: Record<FieldName, string> = {
  path: 'Which path fits you?',
  packageInterest: 'Which package are you interested in?',
  founderName: 'Your name',
  email: 'Email',
  phone: 'Phone',
  companyName: 'Company name',
  website: 'Website',
  country: 'Country',
  stage: 'Stage',
  teamSize: 'Team size',
  revenueBand: 'Monthly revenue',
  goals: 'What do you want to achieve?',
  heardFrom: 'How did you hear about us?',
  heardFromOther: 'Where did you hear about us?',
  consent: 'Consent',
}

const COUNTRIES = [
  'Nigeria',
  'Ghana',
  'Kenya',
  'South Africa',
  'Egypt',
  "Côte d'Ivoire",
  'Senegal',
  'Rwanda',
  'United Kingdom',
  'United States',
]

const DRAFT_KEY = 'foundry-apply-draft'

type Alert =
  | { kind: 'validation'; count: number; formErrors: string[] }
  | { kind: 'rate_limited'; minutes: number }
  | { kind: 'server' }
  | { kind: 'network' }

function toInput(v: Values): FoundryApplicationInput {
  return { ...v } as FoundryApplicationInput
}

function validate(v: Values): Errors {
  const r = foundryApplicationSchema.safeParse(toInput(v))
  if (r.success) return {}
  const flat = z.flattenError(r.error).fieldErrors as Record<string, string[] | undefined>
  const out: Errors = {}
  for (const [k, msgs] of Object.entries(flat)) if (msgs && msgs.length) out[k] = msgs[0]
  return out
}

export function ApplyForm({ initialPath, initialPackage }: { initialPath: string; initialPackage: string }) {
  const [values, setValues] = useState<Values>({ ...EMPTY, path: initialPath, packageInterest: initialPackage })
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [errors, setErrors] = useState<Errors>({})
  const [alert, setAlert] = useState<Alert | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState<{ firstName: string; email: string } | null>(null)
  const alertRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const restored = useRef(false)

  /* Draft restore (URL preselection wins for path and package). */
  useEffect(() => {
    if (restored.current) return
    restored.current = true
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY)
      if (!raw) return
      const draft = JSON.parse(raw) as Partial<Values>
      setValues((cur) => {
        const next = { ...cur }
        for (const k of Object.keys(EMPTY) as (keyof Values)[]) {
          if (k === 'consent' || k === HONEYPOT_FIELD) continue
          const dv = draft[k]
          if (typeof dv === 'string') (next as Record<string, unknown>)[k] = dv
        }
        if (initialPath) {
          next.path = initialPath
          next.packageInterest = initialPackage
        }
        return next
      })
    } catch {
      /* storage unavailable */
    }
  }, [initialPath, initialPackage])

  /* Draft save (debounced). */
  useEffect(() => {
    if (done) return
    const t = setTimeout(() => {
      try {
        const { consent: _c, [HONEYPOT_FIELD]: _hp, ...rest } = values
        void _c
        void _hp
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(rest))
      } catch {
        /* storage unavailable */
      }
    }, 500)
    return () => clearTimeout(t)
  }, [values, done])

  useEffect(() => {
    if (alert) {
      alertRef.current?.focus()
    }
  }, [alert])

  useEffect(() => {
    if (done) {
      successRef.current?.focus()
      successRef.current?.scrollIntoView({ block: 'center' })
    }
  }, [done])

  const set = <K extends keyof Values>(name: K, v: Values[K]) => {
    const next: Values = { ...values, [name]: v }
    if (name === 'path') {
      const allowed = PACKAGES_BY_PATH[v as FoundryPath] ?? []
      if (v === 'venture') next.packageInterest = 'venture'
      else if (!allowed.includes(next.packageInterest)) next.packageInterest = ''
    }
    if (name === 'heardFrom' && v !== 'other') next.heardFromOther = ''
    setValues(next)
    // Once a field shows an error, re-check it live so the error clears as soon as it's fixed.
    if (Object.keys(errors).length) {
      const all = validate(next)
      const out: Errors = {}
      for (const k of Object.keys(errors)) if (all[k]) out[k] = all[k]
      if (touched[name as FieldName] && all[name]) out[name] = all[name]
      setErrors(out)
    }
  }

  const blur = (name: FieldName) => {
    setTouched((t) => ({ ...t, [name]: true }))
    const all = validate(values)
    setErrors((prev) => {
      const out = { ...prev }
      if (all[name]) out[name] = all[name]
      else delete out[name]
      return out
    })
  }

  const focusFirst = (errs: Errors) => {
    const first = FIELD_ORDER.find((f) => errs[f])
    if (!first) return
    document.getElementById(`field-${first}`)?.scrollIntoView({ block: 'center' })
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return
    const errs = validate(values)
    if (Object.keys(errs).length) {
      setErrors(errs)
      setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])))
      setAlert({ kind: 'validation', count: Object.keys(errs).length, formErrors: [] })
      focusFirst(errs)
      return
    }
    setSubmitting(true)
    setAlert(null)
    try {
      const res = await fetch('/api/foundry/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toInput(values)),
      })
      let body: FoundryApplyResponse | null = null
      try {
        body = (await res.json()) as FoundryApplyResponse
      } catch {
        body = null
      }
      if (res.ok && body && body.ok) {
        try {
          sessionStorage.removeItem(DRAFT_KEY)
        } catch {
          /* ignore */
        }
        setDone({ firstName: values.founderName.trim().split(/\s+/)[0] ?? '', email: values.email.trim() })
        return
      }
      if (body && !body.ok && body.error === 'validation') {
        const mapped: Errors = {}
        for (const [k, msgs] of Object.entries(body.fieldErrors ?? {})) if (msgs?.length) mapped[k] = msgs[0]
        setErrors(mapped)
        setAlert({ kind: 'validation', count: Object.keys(mapped).length, formErrors: body.formErrors ?? [] })
        focusFirst(mapped)
      } else if (body && !body.ok && body.error === 'rate_limited') {
        setAlert({ kind: 'rate_limited', minutes: Math.max(1, Math.ceil(body.retryAfterSeconds / 60)) })
      } else if (res.status === 429) {
        setAlert({ kind: 'rate_limited', minutes: 60 })
      } else {
        setAlert({ kind: 'server' })
      }
    } catch {
      setAlert({ kind: 'network' })
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="rounded-lg border border-(--cr-border) bg-(--cr-surface) p-5 sm:p-8">
        <CheckCircle2 aria-hidden className="size-8 text-(--cr-success)" />
        <h2 ref={successRef} tabIndex={-1} className="mt-4 heading-lg text-(--cr-text) outline-none scroll-mt-28">
          Application received.
        </h2>
        <p className="mt-3 text-(--cr-text-muted) leading-relaxed">
          Thanks{done.firstName ? `, ${done.firstName}` : ''}. We review every application and reply to{' '}
          <span className="text-(--cr-text) break-all">{done.email}</span> with next steps.
        </p>
        <WhatHappensNext className="mt-6 bg-(--cr-bg)!" headingLevel={3} />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Link href="/foundry" className={btnSecondary}>
            Back to Foundry
          </Link>
          <Link href="/foundry#faq" className={linkAccentStandalone}>
            How payment works
          </Link>
        </div>
      </div>
    )
  }

  const err = (n: FieldName) => errors[n]
  const ro = submitting
  const textInput = (
    name: 'founderName' | 'email' | 'phone' | 'companyName' | 'website' | 'country' | 'heardFromOther',
    props: React.InputHTMLAttributes<HTMLInputElement>,
    help?: string,
  ) => (
    <input
      id={`field-${name}`}
      name={name}
      value={values[name]}
      onChange={(e) => set(name, e.target.value)}
      onBlur={() => blur(name)}
      readOnly={ro}
      aria-invalid={err(name) ? true : undefined}
      aria-describedby={describedBy(name, !!help, !!err(name))}
      className={cx(inputClass(!!err(name)), 'scroll-mt-28')}
      {...props}
    />
  )

  const goalsLen = values.goals.length
  const nearLimit = goalsLen >= 1400
  const legend = 'font-outfit text-lg font-normal! text-(--cr-text) mb-6'
  const group = 'min-w-0 [&>div]:space-y-6'
  const sep = 'pt-8 mt-8 border-t border-(--cr-border)'

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={alert ? 'apply-alert' : undefined} className="relative">
      {alert && (
        <div
          id="apply-alert"
          ref={alertRef}
          role="alert"
          tabIndex={-1}
          className={cx(
            'mb-8 rounded-lg border p-4 sm:p-5 outline-none scroll-mt-28',
            alert.kind === 'rate_limited'
              ? 'border-(--cr-warning) bg-(--cr-warning-tint)'
              : 'border-(--cr-danger) bg-(--cr-danger-tint)',
          )}
        >
          <div className="flex gap-3">
            {alert.kind === 'rate_limited' ? (
              <Clock aria-hidden className="size-5 shrink-0 mt-0.5 text-(--cr-warning)" />
            ) : (
              <AlertCircle aria-hidden className="size-5 shrink-0 mt-0.5 text-(--cr-danger)" />
            )}
            <div className="min-w-0 text-sm">
              {alert.kind === 'validation' && (
                <>
                  <p className="font-medium text-(--cr-text)">
                    {alert.count > 0
                      ? `Please check ${alert.count} field${alert.count === 1 ? '' : 's'}.`
                      : 'Please check your application.'}
                  </p>
                  {alert.formErrors.map((m) => (
                    <p key={m} className="mt-1 text-(--cr-text-muted)">
                      {m}
                    </p>
                  ))}
                  <ul className="mt-2 space-y-1">
                    {FIELD_ORDER.filter((f) => errors[f]).map((f) => (
                      <li key={f}>
                        <a href={`#field-${f}`} className={cx(linkAccent, 'inline-block py-1')}>
                          {FIELD_LABELS[f]}: {errors[f]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {alert.kind === 'rate_limited' && (
                <>
                  <p className="font-medium text-(--cr-text)">Too many applications from this connection.</p>
                  <p className="mt-1 text-(--cr-text-muted)">
                    Please try again in {alert.minutes} minute{alert.minutes === 1 ? '' : 's'}. Your answers are still
                    here. If it&apos;s urgent, email{' '}
                    <a href="mailto:admin@crelligent.com" className={linkAccent}>
                      admin@crelligent.com
                    </a>
                    .
                  </p>
                </>
              )}
              {alert.kind === 'server' && (
                <>
                  <p className="font-medium text-(--cr-text)">We couldn&apos;t send your application.</p>
                  <p className="mt-1 text-(--cr-text-muted)">
                    This is a problem on our side. Your answers are still here, so please try again. If it keeps
                    happening, email{' '}
                    <a href="mailto:admin@crelligent.com" className={linkAccent}>
                      admin@crelligent.com
                    </a>
                    .
                  </p>
                </>
              )}
              {alert.kind === 'network' && (
                <>
                  <p className="font-medium text-(--cr-text)">We couldn&apos;t reach our server.</p>
                  <p className="mt-1 text-(--cr-text-muted)">
                    Check your connection and try again. Your answers are still here.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 1. Your path */}
      <fieldset className={group}>
        <legend className={legend}>Your path</legend>
        <div>
        <GroupField name="path" label="Which path fits you?" error={err('path')}>
          <PathCards
            value={values.path}
            onChange={(v) => set('path', v)}
            onBlur={() => blur('path')}
            readOnly={ro}
            invalid={!!err('path')}
          />
        </GroupField>
        <GroupField
          name="packageInterest"
          label="Which package are you interested in?"
          help="Not sure? Pick the closest. Your quote is set after the discovery call."
          error={err('packageInterest')}
        >
          <PackageOptions
            path={values.path}
            value={values.packageInterest}
            onChange={(v) => set('packageInterest', v)}
            onBlur={() => blur('packageInterest')}
            readOnly={ro}
            invalid={!!err('packageInterest')}
          />
        </GroupField>
        </div>
      </fieldset>

      {/* 2. About you */}
      <div className={sep}>
      <fieldset className={group}>
        <legend className={legend}>About you</legend>
        <div>
        <Field name="founderName" label="Your name" error={err('founderName')}>
          {textInput('founderName', { type: 'text', autoComplete: 'name', 'aria-required': true })}
        </Field>
        <Field name="email" label="Email" help="We reply to this address." error={err('email')}>
          {textInput(
            'email',
            { type: 'email', inputMode: 'email', autoComplete: 'email', 'aria-required': true },
            'help',
          )}
        </Field>
        <Field name="phone" label="Phone" optional help="Include your country code, e.g. +234." error={err('phone')}>
          {textInput('phone', { type: 'tel', autoComplete: 'tel' }, 'help')}
        </Field>
        </div>
      </fieldset>
      </div>

      {/* 3. Your company */}
      <div className={sep}>
      <fieldset className={group}>
        <legend className={legend}>Your company</legend>
        <div>
        <Field name="companyName" label="Company name" error={err('companyName')}>
          {textInput('companyName', { type: 'text', autoComplete: 'organization', 'aria-required': true })}
        </Field>
        <Field name="website" label="Website" optional help="example.com is fine." error={err('website')}>
          {textInput('website', { type: 'text', inputMode: 'url', autoComplete: 'url' }, 'help')}
        </Field>
        <Field
          name="country"
          label="Country"
          help="International clients are quoted and invoiced in USD."
          error={err('country')}
        >
          {textInput(
            'country',
            { type: 'text', list: 'foundry-countries', autoComplete: 'country-name', 'aria-required': true },
            'help',
          )}
          <datalist id="foundry-countries">
            {COUNTRIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
        <GroupField name="stage" label="Stage" error={err('stage')}>
          <ChoiceChips
            name="stage"
            options={STAGE_OPTIONS}
            value={values.stage}
            onChange={(v) => set('stage', v)}
            onBlur={() => blur('stage')}
            readOnly={ro}
            invalid={!!err('stage')}
          />
        </GroupField>
        <GroupField name="teamSize" label="Team size" error={err('teamSize')}>
          <ChoiceChips
            name="teamSize"
            options={TEAM_SIZE_OPTIONS}
            value={values.teamSize}
            onChange={(v) => set('teamSize', v)}
            onBlur={() => blur('teamSize')}
            readOnly={ro}
            invalid={!!err('teamSize')}
          />
        </GroupField>
        <Field
          name="revenueBand"
          label="Monthly revenue"
          optional
          help="In naira. A rough equivalent is fine if you report in another currency."
          error={err('revenueBand')}
        >
          <select
            id="field-revenueBand"
            name="revenueBand"
            value={values.revenueBand}
            onChange={(e) => !ro && set('revenueBand', e.target.value)}
            onBlur={() => blur('revenueBand')}
            aria-invalid={err('revenueBand') ? true : undefined}
            aria-describedby={describedBy('revenueBand', true, !!err('revenueBand'))}
            className={cx(inputClass(!!err('revenueBand')), 'scroll-mt-28')}
          >
            <option value="">Select…</option>
            {REVENUE_BAND_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        </div>
      </fieldset>
      </div>

      {/* 4. Your goals */}
      <div className={sep}>
      <fieldset className={group}>
        <legend className={legend}>Your goals</legend>
        <div>
        <Field
          name="goals"
          label="What do you want to achieve?"
          help="What you're building, your traction so far, and what a good result looks like."
          error={err('goals')}
          helpRight={
            <span
              aria-live={nearLimit ? 'polite' : undefined}
              className={cx(
                'shrink-0 font-mono text-xs',
                nearLimit ? 'text-(--cr-warning)' : 'text-(--cr-text-muted)',
              )}
            >
              {goalsLen.toLocaleString('en-US')} / {GOALS_MAX.toLocaleString('en-US')}
            </span>
          }
        >
          <textarea
            id="field-goals"
            name="goals"
            rows={6}
            maxLength={GOALS_MAX}
            value={values.goals}
            onChange={(e) => set('goals', e.target.value)}
            onBlur={() => blur('goals')}
            readOnly={ro}
            aria-required="true"
            aria-invalid={err('goals') ? true : undefined}
            aria-describedby={describedBy('goals', true, !!err('goals'))}
            className={cx(inputClass(!!err('goals')), 'resize-y scroll-mt-28')}
          />
        </Field>
        <Field name="heardFrom" label="How did you hear about us?" error={err('heardFrom')}>
          <select
            id="field-heardFrom"
            name="heardFrom"
            value={values.heardFrom}
            onChange={(e) => !ro && set('heardFrom', e.target.value)}
            onBlur={() => blur('heardFrom')}
            aria-required="true"
            aria-invalid={err('heardFrom') ? true : undefined}
            aria-describedby={describedBy('heardFrom', false, !!err('heardFrom'))}
            className={cx(inputClass(!!err('heardFrom')), 'scroll-mt-28')}
          >
            <option value="">Select…</option>
            {HEARD_FROM_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        {values.heardFrom === 'other' && (
          <Field name="heardFromOther" label="Where did you hear about us?" optional error={err('heardFromOther')}>
            {textInput('heardFromOther', { type: 'text', maxLength: 200 })}
          </Field>
        )}
        </div>
      </fieldset>
      </div>

      {/* Consent */}
      <div className={sep}>
        <label htmlFor="field-consent" className="flex gap-3 min-h-11 items-start cursor-pointer">
          <input
            id="field-consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => !ro && set('consent', e.target.checked)}
            onBlur={() => blur('consent')}
            aria-required="true"
            aria-invalid={err('consent') ? true : undefined}
            aria-describedby={err('consent') ? 'consent-error' : undefined}
            className="mt-0.5 size-5 shrink-0 accent-(--cr-accent) scroll-mt-28"
          />
          <span className="text-sm text-(--cr-text)">
            I agree to Crelligent contacting me about this application. Read our{' '}
            <Link href="/privacy" className={linkAccent}>
              privacy policy
            </Link>
            .
          </span>
        </label>
        <FieldError name="consent" message={err('consent')} />
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto size-px overflow-hidden">
        <label htmlFor={`field-${HONEYPOT_FIELD}`}>Leave this field empty</label>
        <input
          id={`field-${HONEYPOT_FIELD}`}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values[HONEYPOT_FIELD]}
          onChange={(e) => set(HONEYPOT_FIELD, e.target.value)}
        />
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting || undefined}
          className={cx(btnPrimary, 'w-full sm:w-auto')}
        >
          {submitting ? (
            <>
              <Loader2 aria-hidden className="size-4 motion-safe:animate-spin" />
              Sending application…
            </>
          ) : (
            <>
              Submit application
              <ArrowRight aria-hidden className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
