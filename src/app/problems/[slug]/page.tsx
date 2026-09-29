import { notFound } from 'next/navigation';
import { problems } from '@/data/problems';
import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import Link from 'next/link';

export async function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const problem = problems.find((p) => p.slug === params.slug);
  if (!problem) return {};
  
  return generateSeoMetadata({
    title: `Solving ${problem.name} | Crelligent Systems Design`,
    description: `Identify the symptoms and structural causes of ${problem.name.toLowerCase()}.`,
    path: `/problems/${problem.slug}`,
  });
}

export default function ProblemPage({ params }: { params: { slug: string } }) {
  const problem = problems.find((p) => p.slug === params.slug);
  if (!problem) notFound();

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full">
        <Link href="/problems" className="text-gray-500 text-sm mb-8 block hover:text-white">&larr; Back to Structural Bottlenecks</Link>
        <h1 className="text-4xl font-light mb-4">{problem.name}</h1>
        
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg mb-12">
            <h3 className="text-lg font-medium text-red-400 mb-2">Symptoms</h3>
            <p className="text-gray-300">{problem.symptoms}</p>
        </div>

        <div className="prose prose-invert max-w-none">
            <h2>The Structural Cause</h2>
            <p>This is not a people problem; it is a systems problem. When {problem.name.toLowerCase()} occurs, it is typically a failure in the underlying architecture of the enterprise.</p>
            
            <h2>The ESRE OS Solution</h2>
            <p>To resolve this, Crelligent implements an architectural overhaul focused on <strong>{problem.layer}</strong>. By redesigning the system, the symptoms disappear naturally.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
