import { notFound } from 'next/navigation';
import { insights } from '@/data/insights';
import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { InternalAuthorityGraph } from '@/components/shared/InternalAuthorityGraph';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = insights.find((a) => a.slug === params.slug);
  if (!article) return {};
  
  return generateSeoMetadata({
    title: article.seo.title,
    description: article.seo.description,
    path: `/insights/${article.slug}`,
  });
}

export default function InsightPage({ params }: { params: { slug: string } }) {
  const article = insights.find((a) => a.slug === params.slug);
  if (!article) notFound();

  // Map slugs to objects for the graph
  const relatedCaps = article.relatedCapabilities.map(slug => ({
      name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      slug
  }));
  const relatedTemps = article.relatedTemplates.map(slug => ({
      name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      slug
  }));

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <article className="pt-40 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full">
        <Link href="/insights" className="text-[#22c55e] text-sm mb-12 block hover:underline">&larr; Back to Insights</Link>
        
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/10 text-white text-xs font-mono rounded-full uppercase tracking-wider">{article.category}</span>
            <time className="text-gray-500 text-sm">{article.publishedAt}</time>
          </div>
          <h1 className="text-4xl md:text-6xl font-light leading-tight mb-8">{article.title}</h1>
          <p className="text-2xl text-gray-400 border-l-2 border-[#22c55e] pl-6 leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none text-gray-300 mb-20">
          <div dangerouslySetInnerHTML={{ __html: article.body }} />
        </div>

        {/* Internal Authority Graph */}
        <InternalAuthorityGraph 
          relatedCapabilities={relatedCaps}
          relatedTemplates={relatedTemps}
          relatedDiagnostics={[{name: "ESRE OS Score", slug: "esre-os-score"}]}
        />

        {/* Consulting CTA */}
        <div className="mt-20 text-center bg-white/[0.02] border border-white/5 rounded-2xl p-12">
          <h2 className="text-3xl font-light text-white mb-6">Apply this to your enterprise</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Book an L1 Kernel Review to discuss how these systems engineering principles apply directly to your organization.
          </p>
          <Link href="/onboarding" className="inline-flex items-center gap-2 px-8 py-4 bg-[#22c55e] text-black font-medium rounded-lg hover:bg-[#22c55e]/90 transition">
            Book Diagnostic <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </article>
      <Footer />
    </main>
  );
}
