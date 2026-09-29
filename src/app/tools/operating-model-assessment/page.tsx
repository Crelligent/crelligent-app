import { generateSeoMetadata } from '@/lib/seo/metadata';
import OperatingModelClient from '@/components/tools/OperatingModelClient';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';

export const metadata = generateSeoMetadata({
  title: 'Operating Model Assessment | Crelligent',
  description: 'Diagnose the flow of work, decision rights, and structural bottlenecks in your organization.',
  path: '/tools/operating-model-assessment',
});

export default function OperatingModelClientPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <div className="flex-1 pt-32 pb-20">
        <OperatingModelClient />
      </div>
      <Footer />
    </main>
  );
}
