'use client'

import type { ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Gauge, Rocket } from 'lucide-react'
import { FOUNDRY_PACKAGES, type FoundryPath } from '@/lib/foundry/packages'
import { PACKAGE_INTEREST_OPTIONS, PATH_OPTIONS } from '@/lib/foundry/schema'
import { cx } from '../ui'

export const inputClass = (invalid: boolean) =>
  cx(
    'w-full min-h-11 rounded-md border bg-(--cr-surface) px-3.5 py-2.5 text-base text-(--cr-text) placeholder:text-(--cr-text-dim) focus-visible:border-(--cr-accent) read-only:opacity-80',
    invalid ? 'border-(--cr-danger)' : 'border-(--cr-border-strong)',
  )

export function FieldError({ name, message }: { name: string; message?: string }) {
  if (!message) return null
  return (
    <p id={`${name}-error`} className="mt-1.5 flex gap-1.5 text-sm text-(--cr-danger)">
      <AlertCircle aria-hidden className="size-4 shrink-0 mt-0.5" />
      <span>{message}</span>
    </p>
  )
}

export function describedBy(name: string, hasHelp: boolean, hasError: boolean) {
  const ids = [hasHelp && `${name}-help`, hasError && `${name}-error`].filter(Boolean)
  return ids.length ? ids.join(' ') : undefined
}

/** Label above, control, help, error. */
export function Field({
  name,
  label,
  optional,
  help,
  error,
  children,
  helpRight,
}: {
  name: string
  label: string
  optional?: boolean
  help?: string
  error?: string
  children: ReactNode
  helpRight?: ReactNode
}) {
  return (
    <div>
      <label htmlFor={`field-${name}`} className="block mb-2 text-sm font-medium text-(--cr-text)">
        {label}
        {optional && <span className="font-normal text-(--cr-text-muted)"> (optional)</span>}
      </label>
      {children}
      {(help || helpRight) && (
        <div className="mt-1.5 flex items-start justify-between gap-4">
          {help ? (
            <p id={`${name}-help`} className="text-xs text-(--cr-text-muted)">
              {help}
            </p>
          ) : (
            <span />
          )}
          {helpRight}
        </div>
      )}
      <FieldError name={name} message={error} />
    </div>
  )
}

/** Radio group label + error wrapper (fieldset-like, uses role=radiogroup). */
export function GroupField({
  name,
  label,
  help,
  error,
  children,
}: {
  name: string
  label: string
  help?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div
      id={`field-${name}`}
      role="radiogroup"
      tabIndex={-1}
      aria-labelledby={`${name}-label`}
      aria-describedby={describedBy(name, !!help, !!error)}
      aria-invalid={error ? true : undefined}
      aria-required="true"
      className="scroll-mt-28 outline-none"
    >
      <p id={`${name}-label`} className="mb-2 text-sm font-medium text-(--cr-text)">
        {label}
      </p>
      {children}
      {help && (
        <p id={`${name}-help`} className="mt-1.5 text-xs text-(--cr-text-muted)">
          {help}
        </p>
      )}
      <FieldError name={name} message={error} />
    </div>
  )
}

export function ChoiceChips<V extends string>({
  name,
  options,
  value,
  onChange,
  onBlur,
  readOnly,
  invalid,
}: {
  name: string
  options: readonly { value: V; label: string }[]
  value: string
  onChange: (v: V) => void
  onBlur?: () => void
  readOnly?: boolean
  invalid?: boolean
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label key={o.value} className="relative cursor-pointer">
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => !readOnly && onChange(o.value)}
            onBlur={onBlur}
            className="sr-only peer"
          />
          <span
            className={cx(
              'inline-flex items-center min-h-11 px-4 rounded-md border text-sm text-(--cr-text-muted) transition-colors hover:border-(--cr-text-dim) peer-checked:border-(--cr-accent) peer-checked:bg-(--cr-accent-tint) peer-checked:text-(--cr-text) peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--cr-accent)',
              invalid ? 'border-(--cr-danger)' : 'border-(--cr-border-strong)',
            )}
          >
            {o.label}
          </span>
        </label>
      ))}
    </div>
  )
}

const PATH_COPY: Record<FoundryPath, { forWho: string; line: string; icon: typeof Gauge }> = {
  validate: {
    forWho: 'Early-stage founders, pre-seed to Series A.',
    line: 'Prove product-market fit. Install the operating system that lets you scale.',
    icon: Gauge,
  },
  venture: { forWho: 'Growing startups and their founders.', line: 'Co-build your next venture with us.', icon: Rocket },
}

export function PathCards({
  value,
  onChange,
  onBlur,
  readOnly,
  invalid,
}: {
  value: string
  onChange: (v: FoundryPath) => void
  onBlur?: () => void
  readOnly?: boolean
  invalid?: boolean
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {PATH_OPTIONS.map((o) => {
        const c = PATH_COPY[o.value]
        const Icon = c.icon
        const checked = value === o.value
        return (
          <label key={o.value} className="relative block cursor-pointer">
            <input
              type="radio"
              name="path"
              value={o.value}
              checked={checked}
              onChange={() => !readOnly && onChange(o.value)}
              onBlur={onBlur}
              className="sr-only peer"
            />
            <span
              className={cx(
                'block h-full rounded-lg border p-4 min-h-24 transition-colors hover:border-(--cr-text-dim) peer-checked:border-(--cr-accent) peer-checked:bg-(--cr-accent-tint) peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--cr-accent)',
                invalid ? 'border-(--cr-danger)' : 'border-(--cr-border-strong)',
              )}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <Icon aria-hidden className="size-5 text-(--cr-accent-ink)" />
                  <span className="font-medium text-(--cr-text)">{o.label}</span>
                </span>
                <CheckCircle2
                  aria-hidden
                  className={cx('size-5 shrink-0 text-(--cr-accent-ink)', checked ? 'visible' : 'invisible')}
                />
              </span>
              <span className="mt-2 block text-sm text-(--cr-text)">{c.forWho}</span>
              <span className="mt-1 block text-sm text-(--cr-text-muted)">{c.line}</span>
            </span>
          </label>
        )
      })}
    </div>
  )
}

/** Package ids allowed on each path, in display order. */
export const PACKAGES_BY_PATH: Record<FoundryPath, string[]> = {
  validate: ['sprint', 'blueprint', 'build', 'partner', 'raise', 'not-sure'],
  venture: ['venture', 'not-sure'],
}

export function PackageOptions({
  path,
  value,
  onChange,
  onBlur,
  readOnly,
  invalid,
}: {
  path: string
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  readOnly?: boolean
  invalid?: boolean
}) {
  const ids = path === 'validate' || path === 'venture' ? PACKAGES_BY_PATH[path] : null
  return (
    <div aria-live="polite">
      {!ids ? (
        <p className="text-sm text-(--cr-text-muted)">Choose a path to see its packages.</p>
      ) : (
        <div className="space-y-2">
          {ids.map((id) => {
            const opt = PACKAGE_INTEREST_OPTIONS.find((o) => o.value === id)!
            const pkg = FOUNDRY_PACKAGES.find((p) => p.id === id)
            return (
              <label key={id} className="relative block cursor-pointer">
                <input
                  type="radio"
                  name="packageInterest"
                  value={id}
                  checked={value === id}
                  onChange={() => !readOnly && onChange(id)}
                  onBlur={onBlur}
                  className="sr-only peer"
                />
                <span
                  className={cx(
                    'min-h-14 rounded-md border px-4 py-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3 transition-colors hover:border-(--cr-text-dim) peer-checked:border-(--cr-accent) peer-checked:bg-(--cr-accent-tint) peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--cr-accent)',
                    invalid ? 'border-(--cr-danger)' : 'border-(--cr-border-strong)',
                  )}
                >
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-(--cr-text)">{opt.label}</span>
                      {pkg?.featured && (
                        <span className="rounded-md bg-(--cr-accent) text-(--cr-on-accent) text-[0.7rem] font-medium px-1.5 py-0.5">
                          Recommended start
                        </span>
                      )}
                    </span>
                    {pkg && <span className="block text-xs text-(--cr-text-muted)">{pkg.forWho}</span>}
                  </span>
                  <span className="text-xs text-(--cr-text-muted) sm:text-right sm:shrink-0">
                    {pkg ? (
                      <>
                        <span className="block">{pkg.timeline}</span>
                      </>
                    ) : (
                      "We'll recommend one on the discovery call."
                    )}
                  </span>
                </span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}
