import { notFound } from 'next/navigation';
import { industries } from '@/data/industries';
import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) return {};
  
  return generateSeoMetadata({
    title: industry.seo.title,
    description: industry.seo.description,
    path: `/industries/${industry.slug}`,
  });
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) notFound();

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full">
        <Link href="/industries" className="text-[#22c55e] text-sm mb-8 block hover:underline">&larr; Back to Industries</Link>
        <h1 className="text-4xl md:text-5xl font-light mb-6">{industry.name}</h1>
        <p className="text-xl text-gray-400 mb-12 leading-relaxed">{industry.context}</p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-red-400 mb-4">Structural Problems</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    {industry.majorProblems.map((prob, i) => <li key={i}>{prob}</li>)}
                </ul>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-blue-400 mb-4">Data Opportunities</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    {industry.dataOpportunities.map((opp, i) => <li key={i}>{opp}</li>)}
                </ul>
            </div>
        </div>

        <div className="prose prose-invert max-w-none mb-12">
            <h2>Systems Architecture</h2>
            <p>{industry.systemsArchitecture}</p>
        </div>

        <div className="mt-12 pt-12 border-t border-white/10 text-center">
            <h2 className="text-2xl font-light mb-6">Ready to redesign your operating model?</h2>
            <Link href="/onboarding" className="inline-flex items-center gap-2 px-8 py-4 bg-[#22c55e] text-black font-medium rounded-lg hover:bg-[#22c55e]/90 transition">
                Start Diagnostic <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
