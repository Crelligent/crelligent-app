'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { INSTITUTION_TYPES, INTERESTS } from '@/data/aehi/edition'
import { TextLink } from '@/components/aehi/ui/Links'
import { track } from '@/components/aehi/ui/analytics'
import { Checkbox, Field, FormAlert, Honeypot, SelectInput, Spinner, SuccessPanel, TextArea, TextInput, postJson } from './fields'

const EMAIL_EMPTY = 'Enter your work email.'
const EMAIL_INVALID = 'Enter an email address like name@company.com.'
const MSG_NETWORK = 'We could not send your enquiry. Please try again, or email aehi@crelligent.com.'
const MSG_RATE = 'Too many attempts from this connection. Please wait a few minutes and try again.'
const MAX_MESSAGE = 1500

const schema = z.object({
  firstName: z.string().trim().min(1, { message: 'Enter your first name.' }).max(60, { message: 'Enter your first name.' }),
  lastName: z.string().trim().min(1, { message: 'Enter your last name.' }).max(60, { message: 'Enter your last name.' }),
  email: z
    .string()
    .trim()
    .min(1, { message: EMAIL_EMPTY })
    .max(254, { message: EMAIL_INVALID })
    .pipe(z.email({ message: EMAIL_INVALID })),
  institution: z
    .string()
    .trim()
    .min(2, { message: "Enter your institution's name." })
    .max(160, { message: "Enter your institution's name." }),
  institutionType: z.string().min(1, { message: 'Choose a type of institution.' }),
  interest: z.string().min(1, { message: 'Choose what you are interested in.' }),
  message: z.string().max(MAX_MESSAGE, { message: 'Keep your message under 1,500 characters.' }).optional(),
  consent: z.literal(true, { message: 'Tick this box so we can reply.' }),
  website: z.string().optional(),
})

type FormIn = z.input<typeof schema>
type FormOut = z.output<typeof schema>
const FIELDS = ['firstName', 'lastName', 'email', 'institution', 'institutionType', 'interest', 'message', 'consent'] as const

export function InstitutionalInquiry() {
  const [doneEmail, setDoneEmail] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormIn, unknown, FormOut>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      institution: '',
      institutionType: '',
      interest: '',
      message: '',
      website: '',
    },
    shouldFocusError: true,
  })
  const messageLength = (watch('message') ?? '').length

  useEffect(() => {
    if (doneEmail) headingRef.current?.focus()
  }, [doneEmail])

  const onSubmit = async (data: FormOut) => {
    setFormError(null)
    try {
      const { status, body } = await postJson('/api/aehi/institutional', { ...data, source: 'institutional' })
      if ((body && body.ok) || status === 409) {
        track('partner_enquiry_submit')
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
      <SuccessPanel title="Thank you. Your enquiry has been sent." headingRef={headingRef}>
        <p>A member of the Crelligent team will reply to {doneEmail} within two working days.</p>
        <TextLink href="/aehi#methodology">While you wait: read the methodology</TextLink>
      </SuccessPanel>
    )
  }

  const over = messageLength > MAX_MESSAGE

  return (
    <div className="panel">
      <h3 className="t-h3">Partner enquiry</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-5" aria-label="Partner enquiry">
        <Honeypot register={register('website')} />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Field id="inq-first" label="First name" error={errors.firstName?.message}>
            <TextInput id="inq-first" autoComplete="given-name" invalid={!!errors.firstName} {...register('firstName')} />
          </Field>
          <Field id="inq-last" label="Last name" error={errors.lastName?.message}>
            <TextInput id="inq-last" autoComplete="family-name" invalid={!!errors.lastName} {...register('lastName')} />
          </Field>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Field id="inq-email" label="Work email" error={errors.email?.message}>
            <TextInput id="inq-email" type="email" inputMode="email" autoComplete="email" invalid={!!errors.email} {...register('email')} />
          </Field>
          <Field id="inq-institution" label="Institution" error={errors.institution?.message}>
            <TextInput id="inq-institution" autoComplete="organization" invalid={!!errors.institution} {...register('institution')} />
          </Field>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Field id="inq-type" label="Type of institution" error={errors.institutionType?.message}>
            <SelectInput
              id="inq-type"
              placeholder="Choose one"
              options={INSTITUTION_TYPES}
              invalid={!!errors.institutionType}
              {...register('institutionType')}
            />
          </Field>
          <Field id="inq-interest" label="Interested in" error={errors.interest?.message}>
            <SelectInput
              id="inq-interest"
              placeholder="Choose one"
              options={INTERESTS}
              invalid={!!errors.interest}
              {...register('interest')}
            />
          </Field>
        </div>
        <Field
          id="inq-message"
          label="Message (optional)"
          helper="What would you like to explore? (Up to 1,500 characters.)"
          error={errors.message?.message}
          aside={
            <p className={`t-data flex-none text-xs ${over ? 'text-aehi-danger' : 'text-aehi-text-subtle'}`}>
              {messageLength.toLocaleString('en-GB')} / 1,500
            </p>
          }
        >
          <TextArea id="inq-message" rows={5} hasHelper invalid={!!errors.message} {...register('message')} />
        </Field>
        <Checkbox
          id="inq-consent"
          label="Crelligent may contact me about this enquiry."
          invalid={!!errors.consent}
          error={errors.consent?.message}
          {...register('consent')}
        />
        {formError && <FormAlert message={formError} />}
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={isSubmitting} aria-busy={isSubmitting || undefined}>
          {isSubmitting && <Spinner />}
          {isSubmitting ? 'Sending…' : 'Send enquiry'}
        </button>
      </form>
    </div>
  )
}
