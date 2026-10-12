/** Foundry button, link, card and chip class strings (DESIGN.md 2.3, 2.4). */

const btnBase =
  'inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-md text-sm font-medium transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed'

export const btnPrimary = `${btnBase} bg-(--cr-accent) text-(--cr-on-accent) hover:bg-(--cr-accent-hover)`
export const btnSecondary = `${btnBase} border border-(--cr-border-strong) text-(--cr-text) hover:bg-(--cr-surface-2)`
export const linkAccent =
  'text-(--cr-accent-ink) underline underline-offset-4 decoration-1 hover:decoration-2'
export const linkAccentStandalone = `${linkAccent} min-h-11 inline-flex items-center gap-1.5`

export const card = 'rounded-lg border border-(--cr-border) bg-(--cr-surface) p-5 lg:p-6'
export const cardOnSurface = 'rounded-lg border border-(--cr-border) bg-(--cr-bg) p-5 lg:p-6'

export const chip =
  'inline-flex items-center gap-1.5 rounded-md border border-(--cr-border-strong) px-2.5 py-1 text-xs text-(--cr-text-muted)'
export const chipAccent =
  'inline-flex items-center gap-1.5 rounded-md border border-(--cr-accent)/40 px-2.5 py-1 text-xs text-(--cr-accent-ink) bg-(--cr-accent-tint)'

export const eyebrow = 'font-outfit text-xs font-medium uppercase tracking-[0.18em] text-(--cr-accent-ink)'
export const eyebrowMuted = 'font-outfit text-xs font-medium uppercase tracking-[0.18em] text-(--cr-text-muted)'

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}
