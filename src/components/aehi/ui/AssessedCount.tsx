import { formatCount } from '@/data/aehi/live'

const CAPTION = 'Completed diagnostics counted toward the inaugural edition. Live count, not the final sample.'

/**
 * "Enterprises assessed so far" (DESIGN.md 5). The page passes the value from getAssessedCount();
 * when it is null (0, unknown, error or timeout) nothing at all is rendered.
 */
export function AssessedRecordRow({ count }: { count: number | null }) {
  if (count === null || count < 1) return null
  return (
    <div className="border-t border-aehi-line py-3">
      <dt className="t-label text-aehi-text-subtle">Enterprises assessed so far</dt>
      <dd className="mt-1">
        <span className="t-data text-[15px] text-aehi-text">{formatCount(count)}</span>
        <p className="t-small mt-1 text-aehi-text-subtle">{CAPTION}</p>
      </dd>
    </div>
  )
}

export function AssessedStatusLine({ count, className = '' }: { count: number | null; className?: string }) {
  if (count === null || count < 1) return null
  return (
    <div className={className}>
      <p className="t-small text-aehi-text-muted">
        Enterprises assessed so far: <strong className="t-data font-medium text-aehi-text">{formatCount(count)}</strong>
      </p>
      <p className="t-small mt-1 text-aehi-text-subtle">{CAPTION}</p>
    </div>
  )
}
