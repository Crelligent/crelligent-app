import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

export const metadata = {
  title: 'Terms of Service | Crelligent',
  description: 'Terms of Service for Crelligent, ESRE OS, VeloDesk, and PRISM.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navigation />
      
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto font-outfit">
        <h1 className="text-4xl md:text-5xl font-light mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-12">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-8 text-gray-300 leading-relaxed font-inter">
          <section>
            <h2 className="text-2xl font-outfit text-white mb-4">1. Introduction</h2>
            <p>Welcome to Crelligent. By accessing our website, using the ESRE OS framework, PRISM platform, VeloDesk, or engaging our Startup-as-a-Service (Foundry) or Enterprise services, you agree to be bound by these Terms of Service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit text-white mb-4">2. Services Rendered</h2>
            <p className="mb-4">Crelligent provides systems engineering, enterprise operating system installation (ESRE OS), and B2B SaaS solutions. Payments processed through our platform (e.g., via Paystack) are for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Foundry (Startup-as-a-Service):</strong> Milestone-based consulting and system building packages (Starter, Growth, Scale).</li>
              <li><strong>SaaS Subscriptions:</strong> Recurring access to PRISM (operational intelligence) and VeloDesk (PMF validation).</li>
              <li><strong>Enterprise Engagements:</strong> Custom L1-L5 OS architectural deployments and Edge hardware (CEM) installations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-outfit text-white mb-4">3. Payment & Billing</h2>
            <p>All payments for SaaS subscriptions are billed in advance on a recurring basis as selected during signup. Foundry and Enterprise engagements are billed according to specific Statements of Work (SOW) or milestone agreements. We use secure third-party payment processors (such as Paystack). You agree to provide current, complete, and accurate purchase and account information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit text-white mb-4">4. Refunds & Cancellations</h2>
            <p>For SaaS subscriptions (PRISM/VeloDesk), you may cancel at any time, but we do not issue prorated refunds for the current billing cycle. For Foundry and Enterprise service packages, refund eligibility is strictly governed by the specific terms outlined in your executed engagement contract.</p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit text-white mb-4">5. Intellectual Property</h2>
            <p>The ESRE OS framework, PRISM software, VeloDesk software, and Crelligent Edge Module (CEM) firmware remain the exclusive intellectual property of Crelligent. Client data ingested into these systems remains the property of the client.</p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit text-white mb-4">6. Contact Us</h2>
            <p>If you have any questions regarding these Terms, please contact our legal team at <strong>legal@crelligent.com</strong> or via our <a href="/contact" className="text-emerald-400 hover:underline">Contact page</a>.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
