import { generateSeoMetadata } from '@/lib/seo/metadata'
import { HubCard, HubCta, HubShell } from '@/components/esre-os/HubShell'

export const metadata = generateSeoMetadata({
  title: 'ESRE OS Methodology: Diagnose, Design, Install, Maintain',
  description:
    'How Crelligent installs an enterprise operating system: a 4–6 week diagnostic, target design, layer-by-layer installation and ongoing monitoring of the OS Performance Score.',
  path: '/esre-os/methodology',
})

const PHASES = [
  {
    n: '01',
    title: 'Diagnostic',
    duration: '4–6 weeks',
    body: 'We scan every layer to find what is missing, misconfigured or degraded before proposing anything.',
    doing: ['Executive interviews', 'System mapping', 'Customer and operational signal review', 'Technology landscape assessment'],
    get: ['OS layer map', 'OS Performance Score and layer diagnostic', 'Risk and failure-modes brief', 'Clear problem framing'],
  },
  {
    n: '02',
    title: 'Architecture',
    duration: '6–10 weeks',
    body: 'We design the target configuration: what each layer must do, the order to install it in, and what each part connects to.',
    doing: ['Business system redesign', 'Experience and product alignment', 'Data and decision design', 'Governance and operating model definition'],
    get: ['Target OS blueprint', 'Layer-by-layer specifications (L1–L5)', 'Application runtime design'],
  },
  {
    n: '03',
    title: 'Installation',
    duration: '12–24 weeks',
    body: 'We install the OS layer by layer, in sequence, and hand over a working, scored and monitored system.',
    doing: ['Platform and product engineering', 'Data pipelines and analytics', 'CX implementation', 'Change enablement'],
    get: ['Installed L1–L5 core', 'OS Performance Score baseline', 'Teams trained on the new ways of working'],
  },
  {
    n: '04',
    title: 'Support and updates',
    duration: 'Ongoing',
    body: 'An operating system needs maintenance as the business grows and its environment changes.',
    doing: ['Monthly OS Performance Score reports', 'Drift alerts', 'Quarterly layer reviews', 'Continuous improvement cycles'],
    get: ['Annual benchmark', 'New modules as capabilities expand', 'Executive briefings'],
  },
]

export default function EsreOsMethodologyPage() {
  return (
    <HubShell
      eyebrow="Methodology"
      title="How an enterprise operating system is installed"
      intro={
        <p>
          ESRE OS is installed in four phases. We diagnose before we design, and design before we build, because most failed
          transformation and ERP projects start by buying technology for an operating model nobody has written down. Each phase has a
          fixed scope and a deliverable you keep.
        </p>
      }
    >
      <ol className="grid gap-4">
        {PHASES.map((p) => (
          <li key={p.n}>
            <HubCard label={`Phase ${p.n} · ${p.duration}`} title={p.title}>
              <p>{p.body}</p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-sm text-gray-300">What we do</h4>
                  <ul className="list-disc space-y-1 pl-5">
                    {p.doing.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 text-sm text-gray-300">What you receive</h4>
                  <ul className="list-disc space-y-1 pl-5">
                    {p.get.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </HubCard>
          </li>
        ))}
      </ol>

      <h2 className="mb-4 mt-16 text-2xl font-light">Why the order matters</h2>
      <p className="max-w-3xl leading-relaxed text-gray-400">
        Layers are installed from the bottom up. Software (L3) bought before the operating model (L2) is defined automates processes
        that are done differently by each team, so people work around it in spreadsheets. Reports (L4) built before that produce
        numbers nobody agrees on. Starting with the diagnostic shows which layer is the primary constraint, so the work starts where
        it changes the most.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-gray-400">
        Start with the <a href="/esre-os/layers" className="text-[#22c55e] hover:underline">five layers</a>, or see how they fit
        together in the <a href="/esre-os/architecture" className="text-[#22c55e] hover:underline">ESRE OS architecture</a>.
      </p>
      <HubCta />
    </HubShell>
  )
}
