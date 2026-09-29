import Link from 'next/link';
import { problems } from '@/data/problems';
import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';

export const metadata = generateSeoMetadata({
  title: 'Enterprise Problems & Structural Bottlenecks | Crelligent',
  description: 'Diagnose the root causes of scaling failure, data silos, and operational inefficiency.',
  path: '/problems',
});

export default function ProblemsHub() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full">
        <h1 className="text-4xl font-light mb-4 text-red-400">Structural Bottlenecks</h1>
        <p className="text-xl text-gray-400 mb-12">Enterprises don't fail overnight; they degrade structurally. Identify your failure modes below.</p>
        
        <div className="grid gap-6">
          {problems.map(p => (
            <Link key={p.slug} href={`/problems/${p.slug}`} className="block bg-white/5 border border-white/10 p-6 rounded-lg hover:border-red-400/50 transition">
              <h2 className="text-2xl font-light mb-2">{p.name}</h2>
              <p className="text-gray-400 mb-4">{p.symptoms}</p>
              <div className="inline-block px-3 py-1 bg-[#22c55e]/10 text-[#22c55e] text-xs rounded-full">OS Fix: {p.layer}</div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
