import { notFound } from 'next/navigation';
import { aehiReports } from '@/data/research';
import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import Link from 'next/link';

export async function generateStaticParams() {
  return aehiReports.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const report = aehiReports.find((r) => r.slug === params.slug);
  if (!report) return {};
  
  return generateSeoMetadata({
    title: `${report.title} | Crelligent`,
    description: report.description,
    path: `/research/aehi/${report.slug}`,
  });
}

export default function ReportPage({ params }: { params: { slug: string } }) {
  const report = aehiReports.find((r) => r.slug === params.slug);
  if (!report) notFound();

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full">
        <Link href="/research/aehi" className="text-[#22c55e] text-sm mb-8 block hover:underline">&larr; Back to Research Hub</Link>
        <h1 className="text-4xl font-light mb-4">{report.title}</h1>
        <p className="text-sm text-gray-500 mb-8">Published: {report.date}</p>
        <p className="text-xl text-gray-400 mb-8">{report.description}</p>
        
        <div className="prose prose-invert max-w-none">
            <h2>Executive Summary</h2>
            <p>Our research indicates that the primary growth bottleneck for African mid-market enterprises is not capital, but structural rigidity. Without a defined operating system (ESRE OS), scaling efforts lead to exponential complexity.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
