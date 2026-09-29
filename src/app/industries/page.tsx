import Link from 'next/link';
import { industries } from '@/data/industries';
import { generateSeoMetadata } from '@/lib/seo/metadata';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';

export const metadata = generateSeoMetadata({
  title: 'Industry Systems Architecture | Crelligent',
  description: 'Enterprise systems design, architecture, and operating models tailored for complex industries in Africa.',
  path: '/industries',
});

export default function IndustriesHub() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit text-white">
      <Navigation />
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full">
        <h1 className="text-4xl font-light mb-4 text-[#22c55e]">Industries</h1>
        <p className="text-xl text-gray-400 mb-12">We design and deploy operating systems for Africa's most complex industrial environments.</p>
        
        <div className="grid gap-6 md:grid-cols-2">
          {industries.map(ind => (
            <Link key={ind.slug} href={`/industries/${ind.slug}`} className="block bg-white/5 border border-white/10 p-6 rounded-lg hover:border-[#22c55e]/50 transition">
              <h2 className="text-2xl font-light mb-4">{ind.name}</h2>
              <p className="text-gray-400 text-sm">{ind.context}</p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
