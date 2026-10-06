import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { CapabilityLayout } from '@/components/capabilities/CapabilityLayout';

export const metadata = generateSeoMetadata({
  title: 'Change Adoption | Crelligent Capabilities',
  description: 'Change Adoption defines the structural approach to solving complex enterprise challenges in this domain....',
  path: '/capabilities/change-adoption',
});

export default function CapabilityPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col">
      <Navigation />
      <div className="flex-1">
        <CapabilityLayout 
          title="Change Adoption"
          esreLayer="L1-L5: Systems Engineering"
          definition="Change Adoption defines the structural approach to solving complex enterprise challenges in this domain."
          businessProblems={["Lack of structural alignment", "Friction at scale", "Disconnected workflows"]}
          methodology={`<p>Crelligent applies strict systems thinking to <strong>Change Adoption</strong>. By treating the enterprise as a complex system of interacting parts, we resolve root causes rather than treating symptoms.</p><p>You do not adopt an OS; you adopt the applications running on it. We leverage immersive <strong>Extended Reality (XR)</strong> environments to conduct spatial training for your staff, drastically reducing the friction of adopting new L2 Operating Model physical workflows.</p>`}
          deliverables={["Change Adoption Blueprint", "Systems Map", "Implementation Roadmap"]}
          graphProps={{"relatedCapabilities": [{"name": "Operating Model Design", "slug": "operating-model"}], "relatedTemplates": [{"name": "System Intent Canvas", "slug": "system-intent-canvas"}], "relatedDiagnostics": [{"name": "ESRE OS Score", "slug": "esre-os-score"}], "relatedInsights": []}}
        />
      </div>
      <Footer />
    </main>
  );
}
