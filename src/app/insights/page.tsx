import Link from 'next/link';
import { insights } from '@/data/insights';
import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';

export const metadata = generateSeoMetadata({
  title: 'Insights & Systems Thinking | Crelligent',
  description: 'Authoritative research, frameworks, and consulting insights on enterprise operating models, technology architecture, and African business growth.',
  path: '/insights',
});

export default function InsightsHub() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto flex-1 w-full">
        <h1 className="text-4xl md:text-5xl font-light mb-4 text-[#22c55e]">Insights & Frameworks</h1>
        <p className="text-xl text-gray-400 mb-16 max-w-2xl">Proprietary knowledge on scaling complex enterprises. We write for systems thinkers, operators, and architects.</p>
        
        <div className="grid gap-8">
          {insights.map(article => (
            <Link key={article.slug} href={`/insights/${article.slug}`} className="block group">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.08] hover:border-[#22c55e]/50 transition duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-[#22c55e]/10 text-[#22c55e] text-xs font-mono rounded-full uppercase tracking-wider">{article.category}</span>
                  <span className="text-gray-500 text-sm">{article.publishedAt}</span>
                </div>
                <h2 className="text-3xl font-light mb-4 group-hover:text-[#22c55e] transition">{article.title}</h2>
                <p className="text-gray-400 text-lg leading-relaxed">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
