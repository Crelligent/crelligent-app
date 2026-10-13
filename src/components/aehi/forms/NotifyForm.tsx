'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { EDITION } from '@/data/aehi/edition'
import { DiagnosticLink } from '@/components/aehi/ui/DiagnosticLink'
import { track } from '@/components/aehi/ui/analytics'
import { Checkbox, Field, FormAlert, Honeypot, Spinner, SuccessPanel, TextInput, postJson } from './fields'

const EMAIL_EMPTY = 'Enter your work email.'
const EMAIL_INVALID = 'Enter an email address like name@company.com.'
const MSG_NETWORK = 'We could not save your details. Please try again, or email aehi@crelligent.com.'
const MSG_RATE = 'Too many attempts from this connection. Please wait a few minutes and try again.'

const schema = z.object({
  name: z.string().trim().min(2, { message: 'Enter your name.' }).max(120, { message: 'Enter your name.' }),
  email: z
    .string()
    .trim()
    .min(1, { message: EMAIL_EMPTY })
    .max(254, { message: EMAIL_INVALID })
    .pipe(z.email({ message: EMAIL_INVALID })),
  organisation: z.string().trim().min(2, { message: 'Enter your organisation.' }).max(160, { message: 'Enter your organisation.' }),
  role: z.string().trim().max(120).optional(),
  country: z.string().trim().min(2, { message: 'Enter your country.' }).max(80, { message: 'Enter your country.' }),
  consent: z.literal(true, { message: 'Tick this box so we can email you the report.' }),
  website: z.string().optional(),
})

type FormIn = z.input<typeof schema>
type FormOut = z.output<typeof schema>
const FIELDS = ['name', 'email', 'organisation', 'role', 'country', 'consent'] as const

export function NotifyForm({
  title = 'Get the report when it publishes',
  intro = `One email when the ${EDITION.label} edition is out. Nothing else unless you ask.`,
  successText = `We'll email {email} when the ${EDITION.label} edition publishes.`,
  source = 'report',
}: {
  title?: string
  intro?: string
  /** "{email}" is replaced with the address the person entered. */
  successText?: string
  source?: string
}) {
  const [doneEmail, setDoneEmail] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<FormIn, unknown, FormOut>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', organisation: '', role: '', country: 'Nigeria', website: '' },
    shouldFocusError: true,
  })

  useEffect(() => {
    if (doneEmail) headingRef.current?.focus()
  }, [doneEmail])

  const onSubmit = async (data: FormOut) => {
    setFormError(null)
    try {
      const { status, body } = await postJson('/api/aehi/notify', { ...data, source })
      if ((body && body.ok) || status === 409) {
        track('notify_submit', { source })
        setDoneEmail(data.email)
        return
      }
      if (status === 429) return setFormError(MSG_RATE)
      const fe = body && !body.ok ? body.fieldErrors : undefined
      const known = fe ? FIELDS.filter((f) => fe[f]) : []
      if (known.length) {
        known.forEach((f) => setError(f, { type: 'server', message: fe![f] }))
        setFocus(known[0])
        return
      }
      setFormError(MSG_NETWORK)
    } catch {
      setFormError(MSG_NETWORK)
    }
  }

  if (doneEmail) {
    return (
      <SuccessPanel title="You're on the list." headingRef={headingRef}>
        <p>{successText.replace('{email}', doneEmail)}</p>
        <p>
          Want your own score now? <DiagnosticLink location="notify-success" variant="inline">Take the diagnostic</DiagnosticLink>.
        </p>
      </SuccessPanel>
    )
  }

  return (
    <div className="panel">
      <h3 className="t-h3">{title}</h3>
      <p className="t-small mt-2 text-aehi-text-muted">{intro}</p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-5" aria-label={title}>
        <Honeypot register={register('website')} />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Field id="notify-name" label="Name" error={errors.name?.message}>
            <TextInput id="notify-name" autoComplete="name" invalid={!!errors.name} {...register('name')} />
          </Field>
          <Field id="notify-email" label="Work email" error={errors.email?.message}>
            <TextInput id="notify-email" type="email" inputMode="email" autoComplete="email" invalid={!!errors.email} {...register('email')} />
          </Field>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Field id="notify-org" label="Organisation" error={errors.organisation?.message}>
            <TextInput id="notify-org" autoComplete="organization" invalid={!!errors.organisation} {...register('organisation')} />
          </Field>
          <Field
            id="notify-role"
            label="Role (optional)"
            helper="For example: CEO, Head of Research, Investment Associate."
            error={errors.role?.message}
          >
            <TextInput id="notify-role" autoComplete="organization-title" hasHelper invalid={!!errors.role} {...register('role')} />
          </Field>
        </div>
        <Field id="notify-country" label="Country" error={errors.country?.message}>
          <TextInput id="notify-country" autoComplete="country-name" invalid={!!errors.country} {...register('country')} />
        </Field>
        <Checkbox
          id="notify-consent"
          label="Crelligent may email me about the AEHI. I can unsubscribe at any time."
          invalid={!!errors.consent}
          error={errors.consent?.message}
          {...register('consent')}
        />
        {formError && <FormAlert message={formError} />}
        <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting} aria-busy={isSubmitting || undefined}>
          {isSubmitting && <Spinner />}
          {isSubmitting ? 'Saving…' : 'Notify me'}
        </button>
      </form>
    </div>
  )
}
