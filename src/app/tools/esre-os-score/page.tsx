import { generateSeoMetadata } from '@/lib/seo/metadata';
import EsreScoreClient from '@/components/tools/EsreScoreClient';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';

export const metadata = generateSeoMetadata({
  title: 'ESRE OS Score Assessment | Crelligent',
  description: 'Evaluate your enterprise operating system. Discover structural bottlenecks and measure your operational readiness across 5 critical layers.',
  path: '/tools/esre-os-score',
});

export default function EsreOsScorePage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <div className="flex-1 pt-32 pb-20">
        <EsreScoreClient />
      </div>
      <Footer />
    </main>
  );
}
