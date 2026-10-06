import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { CapabilityLayout } from '@/components/capabilities/CapabilityLayout';

export const metadata = generateSeoMetadata({
  title: 'Technology & Platform | Crelligent Capabilities',
  description: 'Enterprise technology architecture defines how digital infrastructure, applications, and integrations support the operating model. We design platforms...',
  path: '/capabilities/technology-platform',
});

export default function CapabilityPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col">
      <Navigation />
      <div className="flex-1">
        <CapabilityLayout 
          title="Technology & Platform"
          esreLayer="L3: Infrastructure"
          definition="Enterprise technology architecture defines how digital infrastructure, applications, and integrations support the operating model. We design platforms that are modular, scalable, and independent."
          businessProblems={["Crippling technical debt from legacy systems", "Endless manual data entry between SaaS tools", "Fragile point-to-point integrations (e.g. Zapier breaking)", "Inability to deploy new products quickly", "Security and compliance vulnerabilities"]}
          methodology={`<p>A fragmented technology stack forces your humans to act as the integration layer. We design <strong>event-driven architectures</strong> that automate data flow across the enterprise.</p><p>We do not just install software; we engineer an infrastructure layer that perfectly mirrors your operating model, allowing you to scale transaction volume exponentially without adding headcount. This includes migrating to scalable <strong>Cloud solutions</strong>, integrating <strong>5G networks</strong> for low-latency telemetry, and deploying localized <strong>Compute (AI-PC)</strong> to handle on-premise AI inference. We also prepare your L3 infrastructure for next-generation <strong>Quantum computing</strong> security and processing capabilities.</p>`}
          deliverables={["Enterprise Architecture Blueprint", "Integration & API Strategy", "Legacy Modernization Roadmap", "Build vs. Buy Technology Matrix", "Cloud Infrastructure Design"]}
          graphProps={{"relatedCapabilities": [{"name": "Data & Intelligence", "slug": "data-intelligence"}, {"name": "Operating Model", "slug": "operating-model"}], "relatedTemplates": [{"name": "System Architecture Blueprint", "slug": "system-architecture-blueprint"}, {"name": "Process-to-System Map", "slug": "process-to-system-map"}], "relatedDiagnostics": [{"name": "Technology Readiness", "slug": "technology-readiness"}], "relatedInsights": []}}
        />
      </div>
      <Footer />
    </main>
  );
}
