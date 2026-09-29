import { notFound } from 'next/navigation';
import { templates } from '@/data/templates';
import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import Link from 'next/link';

export async function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const template = templates.find((t) => t.slug === params.slug);
  if (!template) return {};
  
  return generateSeoMetadata({
    title: `${template.name} - Systems Design Template | Crelligent`,
    description: template.description,
    path: `/templates/${template.slug}`,
  });
}

export default function TemplatePage({ params }: { params: { slug: string } }) {
  const template = templates.find((t) => t.slug === params.slug);
  if (!template) notFound();

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full">
        <Link href="/templates" className="text-[#22c55e] text-sm mb-8 block hover:underline">&larr; Back to Templates</Link>
        <h1 className="text-4xl font-light mb-4">{template.name}</h1>
        <p className="text-xl text-gray-400 mb-8">{template.description}</p>
        
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-medium text-[#22c55e] mb-2">Category: {template.category}</h3>
            <p className="text-gray-300">Price: {template.price}</p>
        </div>

        <div className="prose prose-invert max-w-none">
            <h2>What it is</h2>
            <p>The {template.name} is a structural framework designed to help African enterprises document, analyze, and optimize their operations.</p>
            
            <h2>When to use it</h2>
            <p>Use this template when you are experiencing structural drag, preparing for scale, or redesigning your operating model.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
