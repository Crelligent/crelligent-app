import { Metadata } from 'next'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ClientPortalBanner } from '@/components/ClientPortalBanner'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Crelligent',
  description: 'Common questions about the ESRE OS, enterprise operating systems in Africa, AEHI, and the Crelligent Foundry.',
}

export default function FAQPage() {
  const faqs = [
    {
      category: "Enterprise Operating Systems (ESRE OS)",
      questions: [
        {
          q: "What exactly is an enterprise operating system?",
          a: "Just as a computer cannot run applications without a foundational OS (like Windows or macOS), a growing enterprise cannot execute strategy reliably without an enterprise OS. It is the connective tissue between strategy, technology, operations, and data. Without it, companies rely on individual heroics rather than systemic processes."
        },
        {
          q: "Why do African mid-market companies specifically need ESRE OS?",
          a: "In African markets, companies often scale through sheer force of will by the founder or a few key executives. As complexity increases, the lack of an L2 (Operating Model / Scheduler) means these key individuals become the bottleneck. ESRE OS institutionalizes the processes, allowing the business to scale predictably, monitor its own health, and survive transitions."
        },
        {
          q: "What are the 5 layers of the ESRE OS Core?",
          a: "The OS Core consists of: L1 Business Design (The Kernel), L2 Operating Model (The Scheduler), L3 Technology & Platform (Infrastructure), L4 Data & Intelligence (Sensing Layer), and L5 Governance & Risk (Security Layer)."
        }
      ]
    },
    {
      category: "AEHI & Enterprise Health",
      questions: [
        {
          q: "What is the African Enterprise Health Index (AEHI)?",
          a: "The AEHI is the definitive benchmark for mid-market enterprises across Africa. We evaluate organizations against the 5-layer ESRE OS framework to generate an objective ESRE OS Performance Score (0-100), measuring operational resilience, technology posture, and process maturity."
        },
        {
          q: "How is the ESRE OS Performance Score calculated?",
          a: "It is a two-tier weighted score: 70% is weighted on the health and stability of your OS Core (Layers 1-5), and 30% is weighted on your Application Runtime (how well you execute Product Strategy, Economics, CX, and Change Adoption on top of that core)."
        }
      ]
    },
    {
      category: "Startups & Grassroots",
      questions: [
        {
          q: "Do you only work with large enterprises?",
          a: "No. Through Crelligent Foundry, we offer VeloDesk—an ESRE OS Lite installation calibrated specifically for early-stage startups preparing for institutional investment. For the informal and grassroots economy, we provide 'Crelligent Core', featuring WhatsApp-based AI bots (ESRE Vitals Bot) that allow market traders to manage inventory and sales via text."
        },
        {
          q: "What is the ESRE Vitals Bot?",
          a: "The Vitals Bot is a conversational AI embedded in WhatsApp. It allows informal traders and micro-businesses to record daily sales, track debtors, generate PDF receipts, and receive low-stock alerts without needing to learn complex software or maintain traditional ledgers."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#3b82f6]/30 selection:text-white flex flex-col">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <div className="inline-flex mb-6">
              <span className="text-[11px] font-[400] uppercase tracking-[0.2em] text-[#3b82f6] border border-[#3b82f6]/20 rounded-full px-4 py-1.5 bg-[#3b82f6]/5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Knowledge Base
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[300] text-white tracking-tight leading-tight mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Common questions about the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">Enterprise OS.</span>
            </h1>
            <p className="text-xl text-gray-400 font-[200] max-w-2xl leading-relaxed">
              Everything you need to know about installing, scoring, and scaling your organization&apos;s operating system.
            </p>
          </div>

          <div className="space-y-16">
            {faqs.map((group, idx) => (
              <div key={idx} className="space-y-8">
                <h2 className="text-2xl font-[300] text-white border-b border-white/10 pb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {group.category}
                </h2>
                <div className="space-y-6">
                  {group.questions.map((faq, fIdx) => (
                    <div key={fIdx} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white-[0.07] transition-colors">
                      <h3 className="text-lg font-[400] text-gray-200 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {faq.q}
                      </h3>
                      <p className="text-gray-400 font-[200] leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-[#3b82f6]/10 to-transparent border border-[#3b82f6]/20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-[300] text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Still have questions?</h3>
              <p className="text-gray-400 font-[200]">Our systems architects are ready to evaluate your current setup.</p>
            </div>
            <Link href="/contact" className="shrink-0 px-8 py-4 rounded-full bg-white text-black font-[400] tracking-widest uppercase hover:bg-gray-200 transition-colors flex items-center gap-3 text-sm">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <ClientPortalBanner />
      <Footer />
    </div>
  )
}
