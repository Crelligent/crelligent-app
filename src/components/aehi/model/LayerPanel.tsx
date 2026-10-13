import type { Layer } from '@/data/aehi/edition'
import { LAYERS } from '@/data/aehi/edition'
import { Chip } from '@/components/aehi/ui/Typography'

export type ExplorerMode = 'explore' | 'trace'

/** Visually hidden sentence the live region announces first (DESIGN.md 3.6). */
export function announcement(layer: Layer, mode: ExplorerMode): string {
  if (mode === 'explore') return `${layer.code} ${layer.spokenName} selected.`
  if (layer.code === 'L5') return 'L5 Governance marked weak. It is the top layer; nothing above it is affected.'
  const above = LAYERS.filter((l) => l.n > layer.n)
    .map((l) => `${l.code} ${l.spokenName}`)
    .join(', ')
  return `${layer.code} ${layer.spokenName} marked weak. Affected above it: ${above}.`
}

/** Detail panel content for one layer (DESIGN.md 3.5). */
export function LayerPanelContent({ layer, mode }: { layer: Layer; mode: ExplorerMode }) {
  const above = LAYERS.filter((l) => l.n > layer.n)
  return (
    <div>
      <p className="sr-only">{announcement(layer, mode)}</p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="t-label text-aehi-text-subtle">
          {layer.code} · {layer.name}
        </p>
        <Chip variant="weight">
          Weight {layer.weightLabel}
          {layer.code === 'L2' ? ' (highest)' : ''}
        </Chip>
      </div>
      <h3 className="t-h3 mt-4">{layer.question}</h3>

      <p className="t-label mt-6 text-aehi-text-subtle">What it covers</p>
      <p className="t-body mt-2">{layer.covers}</p>

      {mode === 'explore' ? (
        <>
          <p className="t-label mt-6 text-aehi-text-subtle">When it is weak</p>
          <p className="t-body mt-2">{layer.whenWeak}</p>
        </>
      ) : layer.topOfStack ? (
        <>
          <p className="t-label mt-6 text-aehi-text-subtle">What a weak {layer.code} does</p>
          <p className="t-body mt-2">{layer.topOfStack}</p>
        </>
      ) : (
        <>
          <p className="t-label mt-6 text-aehi-text-subtle">What a weak {layer.code} does to the layers above</p>
          <ul className="mt-2">
            {above.map((l) => (
              <li key={l.code} className="flex gap-3 border-t border-aehi-line py-3 first:border-t-0 first:pt-1">
                <span className="t-data w-6 flex-none pt-0.5 text-sm text-aehi-warn">{l.code}</span>
                <span className="t-body">{layer.upward[l.code]}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {layer.whyHighest && (
        <div className="mt-6 border-l-[3px] border-aehi-accent pl-4">
          <p className="t-label text-aehi-text-subtle">Why L2 carries the most weight</p>
          <p className="t-body mt-2">{layer.whyHighest}</p>
        </div>
      )}

      <p className="t-small mt-6 text-aehi-text-subtle">This is how the ESRE OS model reasons. It is not a result from the index.</p>
    </div>
  )
}
