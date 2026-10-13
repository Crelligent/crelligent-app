'use client'

import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react'
import type { UseFormRegisterReturn } from 'react-hook-form'

/** Shared form building blocks (DESIGN.md 2.7). */

export function describedBy(id: string, opts: { helper?: boolean; error?: boolean }) {
  const ids = [opts.helper ? `${id}-help` : null, opts.error ? `${id}-error` : null].filter(Boolean)
  return ids.length ? ids.join(' ') : undefined
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={`${id}-error`} className="t-small mt-1.5 flex items-start gap-1.5 text-aehi-danger">
      <AlertCircle className="mt-1 h-3.5 w-3.5 flex-none" aria-hidden="true" />
      <span>{message}</span>
    </p>
  )
}

export function Field({
  id,
  label,
  helper,
  error,
  children,
  aside,
}: {
  id: string
  label: string
  helper?: ReactNode
  error?: string
  children: ReactNode
  aside?: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label t-label">
        {label}
      </label>
      {children}
      {(helper || aside) && (
        <div className="mt-1.5 flex items-start justify-between gap-4">
          {helper ? (
            <p id={`${id}-help`} className="t-small text-aehi-text-subtle">
              {helper}
            </p>
          ) : (
            <span />
          )}
          {aside}
        </div>
      )}
      <FieldError id={id} message={error} />
    </div>
  )
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean; hasHelper?: boolean }

export const TextInput = forwardRef<HTMLInputElement, InputProps>(function TextInput({ id, invalid, hasHelper, ...rest }, ref) {
  return (
    <input
      ref={ref}
      id={id}
      className="field-input"
      aria-invalid={invalid ? true : undefined}
      aria-describedby={describedBy(id!, { helper: hasHelper, error: invalid })}
      {...rest}
    />
  )
})

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean; options: readonly string[]; placeholder: string }

export const SelectInput = forwardRef<HTMLSelectElement, SelectProps>(function SelectInput(
  { id, invalid, options, placeholder, ...rest },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        id={id}
        className="field-input"
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy(id!, { error: invalid })}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-[14px] top-1/2 h-4 w-4 -translate-y-1/2 text-aehi-text-muted" aria-hidden="true" />
    </div>
  )
})

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean; hasHelper?: boolean }

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(function TextArea({ id, invalid, hasHelper, ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      id={id}
      className="field-input"
      aria-invalid={invalid ? true : undefined}
      aria-describedby={describedBy(id!, { helper: hasHelper, error: invalid })}
      {...rest}
    />
  )
})

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean; label: string; error?: string }

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ id, invalid, label, error, ...rest }, ref) {
  return (
    <div>
      <div className="relative flex items-start gap-3">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={invalid ? true : undefined}
          aria-describedby={describedBy(id!, { error: invalid })}
          className="peer mt-[1px] h-5 w-5 flex-none cursor-pointer appearance-none rounded border border-aehi-line-strong bg-aehi-bg-deep transition-colors duration-150 checked:border-aehi-accent checked:bg-aehi-accent aria-[invalid=true]:border-aehi-danger"
          {...rest}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute mt-[1px] hidden h-5 w-5 stroke-aehi-on-accent peer-checked:block"
          fill="none"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 10.5 L8.5 14 L15 6.5" />
        </svg>
        <label htmlFor={id} className="t-small cursor-pointer text-aehi-text-muted">
          {label}
        </label>
      </div>
      <FieldError id={id!} message={error} />
    </div>
  )
})

export function Honeypot({ register }: { register: UseFormRegisterReturn }) {
  return (
    <div className="sr-only" aria-hidden="true">
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...register} />
      </label>
    </div>
  )
}

export function Spinner() {
  return (
    <svg className="h-4 w-4 flex-none motion-safe:animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function FormAlert({ message }: { message: string }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-md border border-aehi-danger/40 bg-aehi-danger-tint p-4">
      <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-aehi-danger" aria-hidden="true" />
      <p className="t-small text-aehi-text">{message}</p>
    </div>
  )
}

export function SuccessPanel({
  title,
  headingRef,
  children,
}: {
  title: string
  headingRef: React.Ref<HTMLHeadingElement>
  children: ReactNode
}) {
  return (
    <div role="status" className="rounded-lg border border-aehi-accent/40 bg-aehi-accent-tint p-6 lg:p-8">
      <CheckCircle2 className="h-6 w-6 text-aehi-accent" aria-hidden="true" />
      <h3 ref={headingRef} tabIndex={-1} className="t-h3 mt-4 focus:outline-none">
        {title}
      </h3>
      <div className="t-body mt-3 space-y-3">{children}</div>
    </div>
  )
}

export type ApiResult = { ok: true } | { ok: false; error?: string; message?: string; fieldErrors?: Record<string, string> }

/** Posts JSON and normalises the backend contract (BACKEND.md 1). */
export async function postJson(url: string, data: unknown): Promise<{ status: number; body: ApiResult | null }> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  let body: ApiResult | null = null
  try {
    body = (await res.json()) as ApiResult
  } catch {
    body = null
  }
  return { status: res.status, body }
}
