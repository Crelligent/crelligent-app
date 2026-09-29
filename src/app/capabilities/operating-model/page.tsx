import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { CapabilityLayout } from '@/components/capabilities/CapabilityLayout';

export const metadata = generateSeoMetadata({
  title: 'Operating Model Design | Crelligent Capabilities',
  description: 'An enterprise operating model defines how an organization structures people, processes, technology, data, and decision-making to execute its strategy....',
  path: '/capabilities/operating-model',
});

export default function CapabilityPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col">
      <Navigation />
      <div className="flex-1">
        <CapabilityLayout 
          title="Operating Model Design"
          esreLayer="L2: The Scheduler"
          definition="An enterprise operating model defines how an organization structures people, processes, technology, data, and decision-making to execute its strategy. Crelligent's ESRE OS provides a systems architecture for designing and improving that operating model."
          businessProblems={["Duplicated processes across departments", "Unclear ownership and accountability", "Slow, centralized decision-making", "Disconnected systems and manual workflows", "Data silos preventing a single source of truth", "Founder dependency choking scale"]}
          methodology={`<p>When growth stalls, it is rarely a strategy problem; it is an execution problem caused by structural drag. Crelligent engineers operating models that act as <strong>intelligent schedulers</strong>.</p><p>Using the ESRE OS framework, we map your current dependencies, identify feedback loops, and redesign the flow of work to minimize handoffs and maximize throughput.</p>`}
          deliverables={["Operating Model Blueprint", "Cross-functional Process Architecture", "Systems & Dependency Map", "Governance & Decision Rights Model", "Implementation Roadmap"]}
          graphProps={{"relatedCapabilities": [{"name": "Technology & Platform", "slug": "technology-platform"}, {"name": "Change & Behavior", "slug": "change-adoption"}], "relatedTemplates": [{"name": "Operating Model Canvas", "slug": "operating-model-canvas"}, {"name": "Dependency Mapping", "slug": "dependency-mapping"}], "relatedDiagnostics": [{"name": "Operating Model Assessment", "slug": "operating-model-assessment"}, {"name": "ESRE OS Score", "slug": "esre-os-score"}], "relatedInsights": []}}
        />
      </div>
      <Footer />
    </main>
  );
}
