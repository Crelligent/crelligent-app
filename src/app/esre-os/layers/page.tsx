import { generateSeoMetadata } from '@/lib/seo/metadata'
import { LAYERS } from '@/data/aehi/edition'
import { HubCard, HubCta, HubShell } from '@/components/esre-os/HubShell'

export const metadata = generateSeoMetadata({
  title: 'The 5 Layers of an Enterprise Operating System | ESRE OS',
  description:
    'Business design, operating model, technology, data and governance: the five layers every mid-market company runs on, what each covers, and what breaks when one is weak.',
  path: '/esre-os/layers',
})

const CAPABILITY: Record<string, string> = {
  L1: '/capabilities/business-design',
  L2: '/capabilities/operating-model',
  L3: '/capabilities/technology-platform',
  L4: '/capabilities/data-intelligence',
  L5: '/capabilities/governance',
}

export default function EsreOsLayersPage() {
  return (
    <HubShell
      eyebrow="The five layers"
      title="The five layers of an enterprise operating system"
      intro={
        <p>
          Every company runs on an operating system, whether it was designed or not. ESRE OS describes it in five layers, from the
          commercial logic at the bottom to governance at the top. Each layer depends on the ones below it, so a weakness low in the
          stack shows up everywhere above it. This is why fixing technology or reporting rarely works when the operating model
          underneath is broken.
        </p>
      }
    >
      <h2 className="mb-6 text-2xl font-light">The OS core, layer by layer</h2>
      <div className="grid gap-4">
        {[...LAYERS].map((l) => (
          <HubCard key={l.code} label={`${l.code} · weight ${l.weightLabel}`} title={l.name} href={CAPABILITY[l.code]}>
            <p>{l.covers}</p>
            <p className="mt-3">
              <span className="text-gray-300">When it is weak: </span>
              {l.whenWeak}
            </p>
          </HubCard>
        ))}
      </div>

      <h2 className="mb-4 mt-16 text-2xl font-light">Why the operating model (L2) carries the most weight</h2>
      <p className="max-w-3xl leading-relaxed text-gray-400">
        In the ESRE OS Performance Score, the five layers are weighted 1.0, 1.4, 1.0, 1.0 and 0.6. The operating model (L2) carries
        the highest weight because technology automates it, data records it and governance controls it: a weakness in how work gets
        done shows up in all three. In Crelligent&apos;s diagnostic work it is also the layer that most often holds mid-market
        companies back, which the African Enterprise Health Index is now testing across Nigerian enterprises.
      </p>

      <h2 className="mb-6 mt-16 text-2xl font-light">What runs on top of the core</h2>
      <p className="mb-6 max-w-3xl leading-relaxed text-gray-400">
        Four application capabilities run on the five layers. They only work as well as the layers underneath them.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <HubCard title="Product strategy" href="/capabilities/product-strategy">
          What to build and sell next, and in what order.
        </HubCard>
        <HubCard title="Economics and value" href="/capabilities/economics">
          Pricing, unit economics and where margin is made or lost.
        </HubCard>
        <HubCard title="CX and service design" href="/capabilities/cx-design">
          How the operating model shows up at every customer touchpoint.
        </HubCard>
        <HubCard title="Change and adoption" href="/capabilities/change-adoption">
          Making sure people actually use what is installed.
        </HubCard>
      </div>
      <HubCta />
    </HubShell>
  )
}
