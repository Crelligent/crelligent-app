import { generateSeoMetadata } from '@/lib/seo/metadata'
import { LAYERS } from '@/data/aehi/edition'
import { HubCard, HubCta, HubShell } from '@/components/esre-os/HubShell'

export const metadata = generateSeoMetadata({
  title: 'ESRE OS Architecture: Core Layers, Applications and Platforms',
  description:
    'How the ESRE OS fits together: five core layers, the applications that run on them, and the PRISM, CEM and VeloDesk platforms that sense and score how the business runs.',
  path: '/esre-os/architecture',
})

export default function EsreOsArchitecturePage() {
  return (
    <HubShell
      eyebrow="Architecture"
      title="ESRE OS architecture: how the pieces fit"
      intro={
        <p>
          ESRE OS treats a company the way an engineer treats a computer: a core that everything depends on, applications that run on
          top of it, and instruments that show whether it is working. The architecture has three tiers.
        </p>
      }
    >
      <h2 className="mb-6 text-2xl font-light">1. The OS core: five layers</h2>
      <div className="grid gap-3">
        {[...LAYERS].reverse().map((l) => (
          <div key={l.code} className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-4">
            <span className="w-8 shrink-0 font-mono text-sm text-[#22c55e]">{l.code}</span>
            <div>
              <p className="text-white">
                {l.name} <span className="font-mono text-xs text-gray-500">{l.weightLabel}</span>
              </p>
              <p className="mt-1 text-sm text-gray-400">{l.measures}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Read more on <a href="/esre-os/layers" className="text-[#22c55e] hover:underline">each layer and what breaks when it is weak</a>.
      </p>

      <h2 className="mb-6 mt-16 text-2xl font-light">2. The application runtime</h2>
      <p className="mb-6 max-w-3xl leading-relaxed text-gray-400">
        Product strategy, economics and value, CX and service design, and change and adoption run on top of the core. They are where
        customers and staff feel the system, and they only perform as well as the layers beneath them.
      </p>

      <h2 className="mb-6 mt-16 text-2xl font-light">3. The platforms that sense and score</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <HubCard label="L4 sensing" title="PRISM" href="/intelligent-systems">
          Operational intelligence: telemetry ingestion, anomaly detection and monitoring of physical operations.
        </HubCard>
        <HubCard label="Hardware" title="Crelligent Edge Module (CEM)" href="/intelligent-systems">
          IoT hardware that connects vehicles, generators, tanks and machines to PRISM over 4G/LTE and LoRa.
        </HubCard>
        <HubCard label="Startups" title="VeloDesk" href="/foundry">
          Product-market fit validation and scoring for founders, used in Crelligent Foundry.
        </HubCard>
      </div>

      <h2 className="mb-4 mt-16 text-2xl font-light">One score across the system</h2>
      <p className="max-w-3xl leading-relaxed text-gray-400">
        The ESRE OS Performance Score combines the five layers into one number from 0 to 100: (L1×1.0 + L2×1.4 + L3×1.0 + L4×1.0 +
        L5×0.6) ÷ 5 × 10. It is how a client tracks the system over time, and how the{' '}
        <a href="/aehi" className="text-[#22c55e] hover:underline">African Enterprise Health Index</a> benchmarks Nigerian mid-market
        enterprises. See how it is installed in the <a href="/esre-os/methodology" className="text-[#22c55e] hover:underline">methodology</a>.
      </p>
      <HubCta />
    </HubShell>
  )
}
