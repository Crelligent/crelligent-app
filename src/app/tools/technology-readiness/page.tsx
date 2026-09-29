import { generateSeoMetadata } from '@/lib/seo/metadata';
import TechnologyReadinessClient from '@/components/tools/TechnologyReadinessClient';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';

export const metadata = generateSeoMetadata({
  title: 'Technology Readiness Assessment | Crelligent',
  description: 'Audit your enterprise architecture, technical debt, and system integration capabilities.',
  path: '/tools/technology-readiness',
});

export default function TechnologyReadinessClientPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <div className="flex-1 pt-32 pb-20">
        <TechnologyReadinessClient />
      </div>
      <Footer />
    </main>
  );
}
