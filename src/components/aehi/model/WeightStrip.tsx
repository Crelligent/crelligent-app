import { LAYERS, SCORE_FORMULA } from '@/data/aehi/edition'

/** "How the 100 points are made up" (DESIGN.md 3.8). Methodology facts only: shares follow from the weights. */
export function WeightStrip({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <p className="t-label text-aehi-text-subtle">How the 100 points are made up</p>

      <div className="mt-4 flex h-3 w-full gap-[2px] overflow-hidden rounded-[2px] bg-aehi-bg" aria-hidden="true">
        {LAYERS.map((l) => (
          <div key={l.code} className={l.code === 'L2' ? 'bg-aehi-accent' : 'bg-aehi-line-strong'} style={{ width: `${l.points}%` }} />
        ))}
      </div>

      {/* Desktop: labels under each segment */}
      <div className="mt-2 hidden w-full gap-[2px] sm:flex" aria-hidden="true">
        {LAYERS.map((l) => (
          <div key={l.code} className="t-data text-center text-xs" style={{ width: `${l.points}%` }}>
            <span className={l.code === 'L2' ? 'text-aehi-accent' : 'text-aehi-text-muted'}>{l.code}</span>{' '}
            <span className="text-aehi-text-subtle">{l.points} pts</span>
          </div>
        ))}
      </div>

      {/* Text equivalent; the visible list on mobile */}
      <ul className="mt-4 sm:sr-only">
        {LAYERS.map((l) => (
          <li
            key={l.code}
            className={`t-small flex gap-3 border-t border-aehi-line py-3 ${l.code === 'L2' ? 'text-aehi-text' : 'text-aehi-text-muted'}`}
          >
            <span className={`t-data w-6 flex-none ${l.code === 'L2' ? 'text-aehi-accent' : 'text-aehi-text-subtle'}`}>{l.code}</span>
            <span>
              {l.name} · {l.weightLabel} · {l.points} of 100 points
            </span>
          </li>
        ))}
      </ul>

      <pre className="mt-6 whitespace-pre-wrap break-words rounded-md border border-aehi-line bg-aehi-bg-deep p-4 font-mono text-sm text-aehi-text">
        <code>{SCORE_FORMULA}</code>
      </pre>
      <p className="t-small mt-3 text-aehi-text-muted">
        Each layer is scored from 0 to 10. An enterprise scoring 10 on every layer scores 100.
      </p>
    </div>
  )
}
