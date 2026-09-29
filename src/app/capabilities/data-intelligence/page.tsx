import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { CapabilityLayout } from '@/components/capabilities/CapabilityLayout';

export const metadata = generateSeoMetadata({
  title: 'Data & Intelligence | Crelligent Capabilities',
  description: 'Enterprise data architecture ensures that information flows seamlessly from operations to leadership. It transforms raw fragmented data into real-time...',
  path: '/capabilities/data-intelligence',
});

export default function CapabilityPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col">
      <Navigation />
      <div className="flex-1">
        <CapabilityLayout 
          title="Data & Intelligence"
          esreLayer="L4: The Sensor"
          definition="Enterprise data architecture ensures that information flows seamlessly from operations to leadership. It transforms raw fragmented data into real-time operational intelligence."
          businessProblems={["Reporting takes weeks to compile manually", "Different departments have conflicting numbers", "Inability to track leading indicators", "Lack of clean data pipelines for AI adoption", "Poor data privacy and governance controls"]}
          methodology={`<p>If you cannot sense the state of your enterprise, you cannot manage it. Crelligent designs the <strong>Sensing Layer</strong> of your operating system.</p><p>We build centralized data warehouses, automated ETL pipelines, and real-time dashboards that give leadership an immediate, accurate view of enterprise health, paving the way for predictive AI integration.</p>`}
          deliverables={["Enterprise Data Strategy", "Data Warehouse Architecture", "Real-time Intelligence Dashboards", "AI Readiness Assessment", "Data Governance Framework"]}
          graphProps={{"relatedCapabilities": [{"name": "Technology & Platform", "slug": "technology-platform"}, {"name": "Governance", "slug": "governance"}], "relatedTemplates": [{"name": "System Health Audit", "slug": "system-health-audit"}], "relatedDiagnostics": [{"name": "AI Readiness Assessment", "slug": "ai-readiness"}], "relatedInsights": []}}
        />
      </div>
      <Footer />
    </main>
  );
}
