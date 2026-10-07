import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

export const metadata = {
  title: 'Privacy Policy | Crelligent',
  description: 'Privacy Policy for Crelligent, ESRE OS, VeloDesk, and PRISM.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navigation />
      
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto font-outfit">
        <h1 className="text-4xl md:text-5xl font-light mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-12">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-8 text-gray-300 leading-relaxed font-inter">
          <section>
            <h2 className="text-2xl font-outfit text-white mb-4">1. Data Collection</h2>
            <p>Crelligent collects information necessary to provide our systems engineering services and SaaS platforms (PRISM, VeloDesk). This includes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Account Information:</strong> Name, email address, company details, and billing information for payment processing.</li>
              <li><strong>Telemetry Data:</strong> For clients using the Crelligent Edge Module (CEM) or PRISM, we collect operational telemetry data strictly for the purpose of powering your dashboards and the ESRE AI Engine.</li>
              <li><strong>Usage Data:</strong> We monitor how our digital platforms are used to improve performance and user experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-outfit text-white mb-4">2. How We Use Your Data</h2>
            <p>We use your data solely to deliver the services you have subscribed to or engaged us for. Specifically, telemetry data collected via CEM or PRISM is processed by the ESRE AI Engine to provide you with predictive drift detection, anomaly alerts, and AEHI scoring. We do not sell your operational data to third-party brokers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit text-white mb-4">3. Data Security & Storage</h2>
            <p>We implement enterprise-grade security protocols (L5 Governance standards) to protect your data. All sensitive payment information is processed directly by our secure payment partners (e.g., Paystack) and is never stored on Crelligent servers. Your operational data is encrypted in transit and at rest.</p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit text-white mb-4">4. Third-Party Services</h2>
            <p>We may share necessary information with trusted third-party service providers (like cloud hosting and payment gateways) strictly for the purpose of operating our business. They are bound by confidentiality agreements and cannot use your data for independent purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit text-white mb-4">5. Contact Us</h2>
            <p>For questions or concerns regarding this Privacy Policy, or to request the deletion of your data, please contact us at <strong>privacy@crelligent.com</strong>.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
