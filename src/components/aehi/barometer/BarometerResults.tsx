/**
 * Published Executive Barometer results. Rendered ONLY when getPublishedBarometer() returns
 * results (wave status 'published' and the eligible sample meets MIN_WAVE_SAMPLE). Every figure
 * comes from stored responses and is shown with its n.
 */
import { CONFIDENCE_ITEMS, CONSTRAINTS, INDEX_NAME, OUTLOOK_ITEMS, TRUST_ITEMS, WAVE } from '@/data/aehi/barometer'
import type { WaveResults } from '@/lib/aehi/barometer'
import { formatCount, formatDate } from '@/data/aehi/live'

const CONSTRAINT_LABEL = Object.fromEntries(CONSTRAINTS.map((c) => [c.id, c.label])) as Record<string, string>

function Bar({ label, value, emphasise = false, suffix = '%' }: { label: React.ReactNode; value: number; emphasise?: boolean; suffix?: string }) {
  return (
    <li>
      <div className="flex items-baseline justify-between gap-3">
        <span className="t-small text-aehi-text-muted">{label}</span>
        <span className="t-data text-sm tabular-nums text-aehi-text">
          {Math.round(value)}
          {suffix}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 rounded-full bg-aehi-surface-2" aria-hidden="true">
        <div className={`h-full rounded-full ${emphasise ? 'bg-aehi-accent' : 'bg-aehi-line-strong'}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </li>
  )
}

/** Net balance (-100..100) drawn from a centre line. */
function NetBar({ label, value }: { label: string; value: number }) {
  const w = Math.min(50, Math.abs(value) / 2)
  return (
    <li>
      <div className="flex items-baseline justify-between gap-3">
        <span className="t-small text-aehi-text-muted">{label}</span>
        <span className="t-data text-sm tabular-nums text-aehi-text">
          {value > 0 ? '+' : value < 0 ? '−' : ''}
          {Math.abs(Math.round(value))}
        </span>
      </div>
      <div className="relative mt-1.5 h-1.5 rounded-full bg-aehi-surface-2" aria-hidden="true">
        <div className="absolute inset-y-[-3px] left-1/2 w-px bg-aehi-text-subtle" />
        <div
          className={`absolute inset-y-0 rounded-full ${value >= 0 ? 'bg-aehi-accent' : 'bg-aehi-warn'}`}
          style={value >= 0 ? { left: '50%', width: `${w}%` } : { right: '50%', width: `${w}%` }}
        />
      </div>
    </li>
  )
}

export function BarometerResults({ r }: { r: WaveResults }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <p className="t-label text-aehi-text-subtle">{INDEX_NAME}</p>
          <p className="mt-2 font-mono text-7xl font-medium tabular-nums text-aehi-text">
            {Math.round(r.index)}
            <span className="text-2xl text-aehi-text-subtle">/100</span>
          </p>
          <dl className="mt-6 space-y-3 border-t border-aehi-line pt-5">
            <div className="flex justify-between gap-4">
              <dt className="t-small text-aehi-text-muted">Operating-model confidence</dt>
              <dd className="t-data tabular-nums text-aehi-text">{Math.round(r.confidence)}/100</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="t-small text-aehi-text-muted">Outlook</dt>
              <dd className="t-data tabular-nums text-aehi-text">{Math.round(r.outlook)}/100</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="t-small text-aehi-text-muted">Name a constraint inside their own business</dt>
              <dd className="t-data tabular-nums text-aehi-text">{Math.round(r.internalConstraintShare)}%</dd>
            </div>
          </dl>
          <p className="t-data mt-4 text-xs text-aehi-text-subtle">n = {formatCount(r.n)} senior leaders</p>
        </div>

        <div className="lg:col-span-4">
          <h3 className="t-h3">Confident in each layer</h3>
          <p className="t-small mt-1 text-aehi-text-subtle">Share answering &ldquo;very&rdquo; or &ldquo;completely&rdquo; confident.</p>
          <ul className="mt-5 space-y-3">
            {CONFIDENCE_ITEMS.map((i) => (
              <Bar
                key={i.id}
                emphasise={i.id === 'L2'}
                value={r.layerConfident[i.id]}
                label={
                  <>
                    <span className={`t-data ${i.id === 'L2' ? 'text-aehi-accent' : 'text-aehi-text-subtle'}`}>{i.id}</span> {i.label}
                  </>
                }
              />
            ))}
          </ul>
          <h3 className="t-h3 mt-10">Outlook, next 12 months</h3>
          <p className="t-small mt-1 text-aehi-text-subtle">Net balance: % expecting a rise minus % expecting a fall.</p>
          <ul className="mt-5 space-y-3">
            {OUTLOOK_ITEMS.map((i) => (
              <NetBar key={i.id} label={i.label} value={r.outlookNet[i.id]} />
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="t-h3">What holds businesses back</h3>
          <p className="t-small mt-1 text-aehi-text-subtle">Share naming each among their top three.</p>
          <ul className="mt-5 space-y-3">
            {r.constraints.slice(0, 6).map((c) => (
              <Bar key={c.id} value={c.share} label={CONSTRAINT_LABEL[c.id]} />
            ))}
          </ul>
          <h3 className="t-h3 mt-10">Trust</h3>
          <p className="t-small mt-1 text-aehi-text-subtle">Share trusting each &ldquo;a lot&rdquo; or &ldquo;completely&rdquo;.</p>
          <ul className="mt-5 space-y-3">
            {TRUST_ITEMS.map((i) => (
              <Bar key={i.id} value={r.trust[i.id]} label={i.label} />
            ))}
          </ul>
        </div>
      </div>

      {r.sectors.length > 0 && (
        <div className="mt-14">
          <h3 className="t-h3">By sector</h3>
          <p className="t-small mt-1 text-aehi-text-subtle">Only sectors with enough responses to report are shown.</p>
          <div className="mt-5 overflow-x-auto rounded-lg border border-aehi-line">
            <table className="w-full min-w-[420px] text-left">
              <thead className="bg-aehi-surface">
                <tr>
                  <th scope="col" className="t-label px-4 py-3 text-aehi-text-subtle">Sector</th>
                  <th scope="col" className="t-label px-4 py-3 text-right text-aehi-text-subtle">Index</th>
                  <th scope="col" className="t-label px-4 py-3 text-right text-aehi-text-subtle">n</th>
                </tr>
              </thead>
              <tbody>
                {r.sectors.map((s) => (
                  <tr key={s.sector} className="border-t border-aehi-line hover:bg-aehi-surface">
                    <td className="t-small px-4 py-3 text-aehi-text">{s.sector}</td>
                    <td className="t-data px-4 py-3 text-right tabular-nums text-aehi-text">{Math.round(s.index)}</td>
                    <td className="t-data px-4 py-3 text-right tabular-nums text-aehi-text-muted">{formatCount(s.n)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="t-small mt-10 text-aehi-text-subtle">
        Source: AEHI Executive Barometer, {WAVE.label}
        {WAVE.publishedAt ? `, published ${formatDate(WAVE.publishedAt)}` : ''}. Perception data from an online survey of senior leaders;
        not part of the AEHI scores.
      </p>
    </div>
  )
}
