import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
  title: 'ESRE OS Architecture | ESRE OS | Crelligent',
  description: 'The structural blueprint connecting your strategy, processes, technology, and data.',
  path: '/esre-os/architecture',
});

export default function EsreOsArchitecturePage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full text-center">
        <Link href="/esre-os" className="text-[#22c55e] text-sm mb-8 block hover:underline">&larr; Back to ESRE OS</Link>
        <h1 className="text-4xl md:text-5xl font-light mb-6">ESRE OS Architecture</h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">The structural blueprint connecting your strategy, processes, technology, and data.</p>
        
        <div className="bg-white/5 border border-white/10 p-12 rounded-xl">
            <h2 className="text-2xl font-light mb-4">Content Cluster Framework</h2>
            <p className="text-gray-400">This hub page is designed to anchor the architecture topic cluster for search engines, passing link equity down to individual articles and up to the main ESRE OS page.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
