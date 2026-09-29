import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/case-studies';
import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import Link from 'next/link';

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) return {};
  
  return generateSeoMetadata({
    title: cs.seo.title,
    description: cs.seo.description,
    path: `/case-studies/${cs.slug}`,
  });
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) notFound();

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <section className="pt-40 pb-20 px-6 max-w-3xl mx-auto flex-1 w-full">
        <Link href="/case-studies" className="text-[#22c55e] text-sm mb-8 block hover:underline">&larr; Back to Case Studies</Link>
        <h1 className="text-4xl md:text-5xl font-light mb-6 leading-tight">{cs.title}</h1>
        
        <div className="prose prose-invert max-w-none mt-12">
            <h3>Client Context</h3>
            <p>{cs.clientContext}</p>

            <h3>The Challenge</h3>
            <p>{cs.challenge}</p>

            <h3>System Diagnosis</h3>
            <p>{cs.systemDiagnosis}</p>

            <h3>Intervention</h3>
            <p>{cs.intervention}</p>

            <h3>Architecture Design</h3>
            <p>{cs.architectureDesign}</p>

            <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 p-6 rounded-lg my-8 not-prose">
                <h3 className="text-xl font-medium text-[#22c55e] mb-2">Results</h3>
                <p className="text-gray-200">{cs.results}</p>
            </div>

            <h3>Lessons Learned</h3>
            <p>{cs.lessons}</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
