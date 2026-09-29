import Link from 'next/link';
import { aehiReports } from '@/data/research';
import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';

export const metadata = generateSeoMetadata({
  title: 'African Enterprise Health Index (AEHI) | Crelligent Research',
  description: 'Research and insights into the operational resilience of African enterprises.',
  path: '/research/aehi',
});

export default function AEHIHub() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full">
        <h1 className="text-4xl font-light mb-4 text-[#22c55e]">African Enterprise Health Index</h1>
        <p className="text-xl text-gray-400 mb-12">Proprietary research on systems design, scalability, and structural bottlenecks in the African mid-market.</p>
        
        <div className="grid gap-6">
          {aehiReports.map(report => (
            <Link key={report.slug} href={`/research/aehi/${report.slug}`} className="block bg-white/5 border border-white/10 p-6 rounded-lg hover:border-[#22c55e]/50 transition">
              <h2 className="text-2xl font-light mb-2">{report.title}</h2>
              <p className="text-gray-400 text-sm mb-4">{report.date}</p>
              <p className="text-gray-300">{report.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
