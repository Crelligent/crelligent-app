import { generateSeoMetadata } from '@/lib/seo/metadata';
import AiReadinessClient from '@/components/tools/AiReadinessClient';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';

export const metadata = generateSeoMetadata({
  title: 'AI Readiness Assessment | Crelligent',
  description: 'Evaluate your enterprise data infrastructure, governance, and operating model for AI adoption.',
  path: '/tools/ai-readiness',
});

export default function AiReadinessClientPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <div className="flex-1 pt-32 pb-20">
        <AiReadinessClient />
      </div>
      <Footer />
    </main>
  );
}
