'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, CircleHelp, Loader2, RotateCcw } from 'lucide-react'
import {
  OPS_OPTIONS,
  RAISE_OPTIONS,
  SCORED_QUESTIONS,
  TOTAL_STEPS,
  scoreSnapshot,
  type Answers,
  type PmfCheckSaveResponse,
  type SnapshotResult,
} from '@/lib/foundry/pmf-check'
import { HEARD_FROM_OPTIONS, HONEYPOT_FIELD, STAGE_OPTIONS, TEAM_SIZE_OPTIONS } from '@/lib/foundry/schema'
import { getPackage } from '@/lib/foundry/packages'
import { btnPrimary, btnSecondary, cx, eyebrow, linkAccent } from '../ui'
import { ChoiceChips, Field, GroupField, inputClass } from '../apply/fields'

const VELODESK_SIGNUP = 'https://velodesk.crelligent.com/signup'

type Step =
  | { kind: 'scored'; q: (typeof SCORED_QUESTIONS)[number] }
  | { kind: 'stage' }
  | { kind: 'raise' }
  | { kind: 'ops' }

const STEPS: Step[] = [
  { kind: 'stage' },
  ...SCORED_QUESTIONS.map((q) => ({ kind: 'scored' as const, q })),
  { kind: 'raise' },
  { kind: 'ops' },
]

function stepView(step: Step) {
  switch (step.kind) {
    case 'scored':
      return { key: step.q.id, label: step.q.dimension, prompt: step.q.prompt, help: step.q.help, options: step.q.choices }
    case 'stage':
      return { key: 'stage', label: 'Stage', prompt: 'What stage is your company at?', help: undefined, options: STAGE_OPTIONS }
    case 'raise':
      return { key: 'raise', label: 'Fundraising', prompt: 'When do you plan to raise your next round?', help: undefined, options: RAISE_OPTIONS }
    case 'ops':
      return {
        key: 'ops',
        label: 'Operating model',
        prompt: 'When priorities conflict, how are decisions made?',
        help: 'This is the L2 Operating Model: the layer that usually breaks first as a team grows.',
        options: OPS_OPTIONS,
      }
  }
}

export function PmfCheck() {
  const [answers, setAnswers] = useState<Answers>({})
  const [i, setI] = useState(0)
  const [done, setDone] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [i, done])

  const result = useMemo(() => (done ? scoreSnapshot(answers) : null), [done, answers])

  if (done && result) {
    return (
      <Results
        result={result}
        answers={answers}
        headingRef={headingRef}
        onRestart={() => {
          setAnswers({})
          setI(0)
          setDone(false)
        }}
      />
    )
  }

  const view = stepView(STEPS[i])
  const value = (answers as Record<string, string | undefined>)[view.key] ?? ''
  const pick = (v: string) => {
    setAnswers((a) => ({ ...a, [view.key]: v }))
    // Small delay so the selection is visible before moving on.
    window.setTimeout(() => (i === STEPS.length - 1 ? setDone(true) : setI(i + 1)), 180)
  }

  return (
    <div className="rounded-lg border border-(--cr-border) bg-(--cr-surface) p-5 sm:p-8">
      <div className="flex items-center justify-between gap-4 text-xs text-(--cr-text-muted)">
        <span className="font-mono">
          {i + 1} / {TOTAL_STEPS}
        </span>
        <span className={eyebrow}>{view.label}</span>
      </div>
      <div
        className="mt-3 h-1 rounded-full bg-(--cr-surface-2) overflow-hidden"
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={TOTAL_STEPS}
        aria-valuenow={i}
      >
        <div className="h-full bg-(--cr-accent) transition-[width] duration-300" style={{ width: `${(i / TOTAL_STEPS) * 100}%` }} />
      </div>

      <h2 ref={headingRef} tabIndex={-1} className="mt-8 font-outfit text-xl sm:text-2xl text-(--cr-text) outline-none">
        {view.prompt}
      </h2>
      {view.help && (
        <p className="mt-2 flex gap-2 text-sm text-(--cr-text-muted)">
          <CircleHelp aria-hidden className="size-4 shrink-0 mt-0.5" />
          {view.help}
        </p>
      )}

      <div role="radiogroup" aria-label={view.prompt} className="mt-6 grid gap-2">
        {view.options.map((o) => {
          const selected = value === o.value
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => pick(o.value)}
              className={cx(
                'flex min-h-12 w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-sm sm:text-base transition-colors',
                selected
                  ? 'border-(--cr-accent) bg-(--cr-accent-tint) text-(--cr-text)'
                  : 'border-(--cr-border-strong) text-(--cr-text-muted) hover:border-(--cr-text-dim) hover:text-(--cr-text)',
              )}
            >
              <span>{o.label}</span>
              {selected && <CheckCircle2 aria-hidden className="size-5 shrink-0 text-(--cr-accent)" />}
            </button>
          )
        })}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setI(Math.max(0, i - 1))}
          disabled={i === 0}
          className={cx(linkAccent, 'inline-flex min-h-11 items-center gap-1.5 text-sm disabled:opacity-0')}
        >
          <ArrowLeft aria-hidden className="size-4" /> Back
        </button>
        {value && (
          <button
            type="button"
            onClick={() => (i === STEPS.length - 1 ? setDone(true) : setI(i + 1))}
            className={cx(linkAccent, 'inline-flex min-h-11 items-center gap-1.5 text-sm')}
          >
            Next <ArrowRight aria-hidden className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}

function ScoreDial({ score }: { score: number }) {
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 120 120" className="size-36 shrink-0" role="img" aria-label={`PMF snapshot score ${score} out of 100`}>
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--cr-surface-2)" strokeWidth="10" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="var(--cr-accent)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${(score / 100) * c} ${c}`}
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="64" textAnchor="middle" className="font-mono" fontSize="30" fill="var(--cr-text)">
        {score}
      </text>
      <text x="60" y="84" textAnchor="middle" fontSize="10" fill="var(--cr-text-muted)">
        / 100
      </text>
    </svg>
  )
}

function Results({
  result: r,
  answers,
  headingRef,
  onRestart,
}: {
  result: SnapshotResult
  answers: Answers
  headingRef: React.RefObject<HTMLHeadingElement | null>
  onRestart: () => void
}) {
  const pkg = getPackage(r.recommended)!
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-(--cr-border) bg-(--cr-surface) p-5 sm:p-8" aria-labelledby="snapshot-result">
        <p className={eyebrow}>Your PMF snapshot</p>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-6">
          <ScoreDial score={r.score} />
          <div className="min-w-0">
            <h2 id="snapshot-result" ref={headingRef} tabIndex={-1} className="font-outfit text-2xl sm:text-3xl text-(--cr-text) outline-none">
              {r.bandLabel}
            </h2>
            <p className="mt-2 text-(--cr-text-muted) leading-relaxed">{r.bandSummary}</p>
            {r.unmeasuredCount > 0 && (
              <p className="mt-3 text-sm text-(--cr-warning)">
                {r.unmeasuredCount} of 7 dimensions aren&apos;t measured yet. They score zero here, and investors will
                ask about them.
              </p>
            )}
          </div>
        </div>

        <ul className="mt-8 space-y-3" aria-label="Score by dimension">
          {r.dimensions.map((d) => (
            <li key={d.id} className="grid grid-cols-[minmax(0,9rem)_1fr_2.5rem] items-center gap-3 text-sm">
              <span className="text-(--cr-text-muted) truncate">{d.dimension}</span>
              <span className="h-2 rounded-full bg-(--cr-surface-2) overflow-hidden" aria-hidden>
                <span
                  className={cx('block h-full rounded-full', d.points >= 70 ? 'bg-(--cr-accent)' : d.points >= 40 ? 'bg-(--cr-warning)' : 'bg-(--cr-danger)')}
                  style={{ width: `${Math.max(d.points, 2)}%` }}
                />
              </span>
              <span className="font-mono text-right text-(--cr-text)">{d.unmeasured ? '?' : d.points}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-(--cr-text-dim)">
          Weighted like the VeloDesk PMF Score (retention 25%, growth 20%, customer love 15%, engagement 15%, time to
          value 10%, expansion 10%, referrals 5%). This snapshot is self-reported; VeloDesk measures it from your real data.
        </p>
      </section>

      {r.gaps.length > 0 && (
        <section className="rounded-lg border border-(--cr-border) bg-(--cr-surface) p-5 sm:p-8" aria-labelledby="gaps">
          <h2 id="gaps" className="font-outfit text-xl text-(--cr-text)">
            Your biggest gaps
          </h2>
          <ol className="mt-4 space-y-4">
            {r.gaps.map((g, n) => (
              <li key={g.id} className="flex gap-4">
                <span className="font-mono text-sm text-(--cr-accent) mt-0.5">0{n + 1}</span>
                <div>
                  <p className="font-medium text-(--cr-text)">
                    {g.dimension}
                    <span className="ml-2 text-sm font-normal text-(--cr-text-muted)">{g.unmeasured ? 'not measured' : `${g.points}/100`}</span>
                  </p>
                  <p className="mt-1 text-sm text-(--cr-text-muted) leading-relaxed">{g.fix}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="rounded-lg border border-(--cr-accent) bg-(--cr-accent-tint) p-5 sm:p-8" aria-labelledby="next">
        <p className={eyebrow}>Suggested next step</p>
        <h2 id="next" className="mt-2 font-outfit text-xl sm:text-2xl text-(--cr-text)">
          {pkg.name}
        </h2>
        <p className="mt-2 text-(--cr-text-muted) leading-relaxed">{r.recommendationReason}</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a href="#review" className={cx(btnPrimary, 'w-full sm:w-auto')}>
            Get a free 20-minute review
          </a>
          <a href={VELODESK_SIGNUP} className={cx(btnSecondary, 'w-full sm:w-auto')}>
            Measure it in VeloDesk, free for 14 days
          </a>
        </div>
      </section>

      <SaveForm answers={answers} result={r} />

      <button type="button" onClick={onRestart} className={cx(linkAccent, 'inline-flex min-h-11 items-center gap-1.5 text-sm')}>
        <RotateCcw aria-hidden className="size-4" /> Start again
      </button>
    </div>
  )
}

type FormState = {
  founderName: string
  email: string
  companyName: string
  country: string
  teamSize: string
  heardFrom: string
  consent: boolean
  [HONEYPOT_FIELD]: string
}

function SaveForm({ answers, result }: { answers: Answers; result: SnapshotResult }) {
  const [f, setF] = useState<FormState>({
    founderName: '',
    email: '',
    companyName: '',
    country: 'Nigeria',
    teamSize: '',
    heardFrom: '',
    consent: false,
    [HONEYPOT_FIELD]: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((s) => ({ ...s, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const local: Record<string, string> = {}
    if (!f.founderName.trim()) local.founderName = 'Your name is required'
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) local.email = 'Enter a valid email address'
    if (!f.companyName.trim()) local.companyName = 'Company name is required'
    if (!f.country.trim()) local.country = 'Country is required'
    if (!f.teamSize) local.teamSize = 'Select your team size'
    if (!f.heardFrom) local.heardFrom = 'Tell us how you heard of us'
    if (!f.consent) local.consent = 'Please agree to be contacted so we can send your review'
    setErrors(local)
    if (Object.keys(local).length) {
      document.getElementById(`field-${Object.keys(local)[0]}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/foundry/pmf-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, answers }),
      })
      const data = (await res.json()) as PmfCheckSaveResponse
      if (data.ok) {
        setStatus('sent')
        return
      }
      if (data.error === 'validation') {
        setErrors(Object.fromEntries(Object.entries(data.fieldErrors).map(([k, v]) => [k, v[0]])))
        setStatus('idle')
        return
      }
      setStatus('error')
      setMessage(
        data.error === 'rate_limited'
          ? 'Too many attempts from this connection. Please try again in an hour.'
          : 'Something went wrong on our side. Please try again, or email foundry@crelligent.com.',
      )
    } catch {
      setStatus('error')
      setMessage('We could not reach the server. Check your connection and try again.')
    }
  }

  if (status === 'sent') {
    return (
      <section id="review" className="scroll-mt-28 rounded-lg border border-(--cr-accent) bg-(--cr-surface) p-5 sm:p-8" aria-live="polite">
        <div className="flex gap-3">
          <CheckCircle2 aria-hidden className="size-6 shrink-0 text-(--cr-success)" />
          <div>
            <h2 className="font-outfit text-xl text-(--cr-text)">Saved. We&apos;ll be in touch within one working day.</h2>
            <p className="mt-2 text-(--cr-text-muted) leading-relaxed">
              A Crelligent partner will review your {result.score}/100 snapshot and email you to book the 20-minute
              call. Want the measured version now?{' '}
              <a href={VELODESK_SIGNUP} className={linkAccent}>
                Start VeloDesk free
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="review" className="scroll-mt-28 rounded-lg border border-(--cr-border) bg-(--cr-surface) p-5 sm:p-8" aria-labelledby="review-title">
      <h2 id="review-title" className="font-outfit text-xl sm:text-2xl text-(--cr-text)">
        Get a free 20-minute review
      </h2>
      <p className="mt-2 text-(--cr-text-muted) leading-relaxed">
        We&apos;ll go through your snapshot with you and tell you what investors will ask about. No charge, no obligation.
      </p>
      <form onSubmit={submit} noValidate className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="hidden" aria-hidden>
          <label>
            Leave empty
            <input tabIndex={-1} autoComplete="off" value={f[HONEYPOT_FIELD]} onChange={(e) => set(HONEYPOT_FIELD, e.target.value)} />
          </label>
        </div>
        <Field name="founderName" label="Your name" error={errors.founderName}>
          <input id="field-founderName" autoComplete="name" className={inputClass(!!errors.founderName)} value={f.founderName} onChange={(e) => set('founderName', e.target.value)} aria-invalid={!!errors.founderName} />
        </Field>
        <Field name="email" label="Work email" error={errors.email}>
          <input id="field-email" type="email" autoComplete="email" className={inputClass(!!errors.email)} value={f.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} />
        </Field>
        <Field name="companyName" label="Company" error={errors.companyName}>
          <input id="field-companyName" autoComplete="organization" className={inputClass(!!errors.companyName)} value={f.companyName} onChange={(e) => set('companyName', e.target.value)} aria-invalid={!!errors.companyName} />
        </Field>
        <Field name="country" label="Country" error={errors.country}>
          <input id="field-country" autoComplete="country-name" className={inputClass(!!errors.country)} value={f.country} onChange={(e) => set('country', e.target.value)} aria-invalid={!!errors.country} />
        </Field>
        <div className="sm:col-span-2">
          <GroupField name="teamSize" label="Team size" error={errors.teamSize}>
            <ChoiceChips name="teamSize" options={TEAM_SIZE_OPTIONS} value={f.teamSize} onChange={(v) => set('teamSize', v)} invalid={!!errors.teamSize} />
          </GroupField>
        </div>
        <div className="sm:col-span-2">
          <Field name="heardFrom" label="How did you hear about us?" error={errors.heardFrom}>
            <select id="field-heardFrom" className={inputClass(!!errors.heardFrom)} value={f.heardFrom} onChange={(e) => set('heardFrom', e.target.value)} aria-invalid={!!errors.heardFrom}>
              <option value="">Select one</option>
              {HEARD_FROM_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-(--cr-text-muted)">
            <input id="field-consent" type="checkbox" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-0.5 size-5 accent-(--cr-accent)" aria-invalid={!!errors.consent} />
            <span>Crelligent may contact me about my snapshot. We never share your answers.</span>
          </label>
          {errors.consent && <p className="mt-1.5 text-sm text-(--cr-danger)">{errors.consent}</p>}
        </div>
        {status === 'error' && (
          <p role="alert" className="sm:col-span-2 text-sm text-(--cr-danger)">
            {message}
          </p>
        )}
        <div className="sm:col-span-2">
          <button type="submit" disabled={status === 'sending'} className={cx(btnPrimary, 'w-full sm:w-auto')}>
            {status === 'sending' ? (
              <>
                <Loader2 aria-hidden className="size-4 animate-spin" /> Saving
              </>
            ) : (
              'Book my free review'
            )}
          </button>
        </div>
      </form>
      <p className="mt-6 text-xs text-(--cr-text-dim)">
        Prefer to talk about a full engagement?{' '}
        <Link href={`/foundry/apply?package=${result.recommended}`} className={linkAccent}>
          Request a quote
        </Link>
        .
      </p>
    </section>
  )
}
