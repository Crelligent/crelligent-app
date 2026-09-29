import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { CapabilityLayout } from '@/components/capabilities/CapabilityLayout';

export const metadata = generateSeoMetadata({
  title: 'Product Strategy | Crelligent Capabilities',
  description: 'Product Strategy defines the structural approach to solving complex enterprise challenges in this domain....',
  path: '/capabilities/product-strategy',
});

export default function CapabilityPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col">
      <Navigation />
      <div className="flex-1">
        <CapabilityLayout 
          title="Product Strategy"
          esreLayer="L1-L5: Systems Engineering"
          definition="Product Strategy defines the structural approach to solving complex enterprise challenges in this domain."
          businessProblems={["Lack of structural alignment", "Friction at scale", "Disconnected workflows"]}
          methodology={`<p>Crelligent applies strict systems thinking to <strong>Product Strategy</strong>. By treating the enterprise as a complex system of interacting parts, we resolve root causes rather than treating symptoms.</p>`}
          deliverables={["Product Strategy Blueprint", "Systems Map", "Implementation Roadmap"]}
          graphProps={{"relatedCapabilities": [{"name": "Operating Model Design", "slug": "operating-model"}], "relatedTemplates": [{"name": "System Intent Canvas", "slug": "system-intent-canvas"}], "relatedDiagnostics": [{"name": "ESRE OS Score", "slug": "esre-os-score"}], "relatedInsights": []}}
        />
      </div>
      <Footer />
    </main>
  );
}
