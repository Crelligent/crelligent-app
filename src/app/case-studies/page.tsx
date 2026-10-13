import Link from 'next/link';
import { publishedCaseStudies as caseStudies } from '@/data/case-studies';
import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';

export const metadata = generateSeoMetadata({
  title: 'Client Case Studies & Results | Crelligent',
  description: 'Read how Crelligent designs, builds, and maintains operating systems for enterprise clients.',
  path: '/case-studies',
});

export default function CaseStudiesHub() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full">
        <h1 className="text-4xl font-light mb-4 text-[#22c55e]">Case Studies</h1>
        <p className="text-xl text-gray-400 mb-12">Client engagements, with results confirmed by the client before publication.</p>
        
        {caseStudies.length === 0 && (
          <p className="text-gray-400 border border-white/10 rounded-lg p-8">
            Case studies are published once each engagement&apos;s results are confirmed with the client. The first is in progress.
            In the meantime, see <Link href="/esre-os/methodology" className="text-[#22c55e] hover:underline">how we work</Link> or{' '}
            <Link href="/diagnostic" className="text-[#22c55e] hover:underline">take the free diagnostic</Link>.
          </p>
        )}
        <div className="grid gap-6">
          {caseStudies.map(cs => (
            <Link key={cs.slug} href={`/case-studies/${cs.slug}`} className="block bg-white/5 border border-white/10 p-8 rounded-lg hover:border-[#22c55e]/50 transition group">
              <h2 className="text-2xl font-light mb-4 group-hover:text-[#22c55e] transition">{cs.title}</h2>
              <p className="text-gray-400 mb-6">{cs.challenge}</p>
              <div className="flex gap-2 flex-wrap">
                  {cs.relatedCapabilities.map(cap => (
                      <span key={cap} className="px-3 py-1 bg-white/5 text-xs text-gray-300 rounded-full">{cap}</span>
                  ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
