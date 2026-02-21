import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { Mail, MapPin, ArrowRight } from 'lucide-react'

export const metadata = {
    title: 'Contact | Crelligent',
    description: 'Start a conversation about how Crelligent can help engineer the systems your organization needs.',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="section-label mb-4">Get In Touch</div>

                    <h1 className="heading-xl mb-6">
                        Start a conversation
                    </h1>

                    <p className="text-lg text-gray-400 font-light max-w-xl mx-auto">
                        Whether you&apos;re a startup looking for foundations or an enterprise
                        rebuilding systems—let&apos;s talk.
                    </p>
                </div>
            </section>

            {/* Contact Options */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <div className="glass-card rounded-lg p-8">
                            <h2 className="text-xl font-light mb-6">Send us a message</h2>

                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm text-gray-500 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder-gray-600 focus:border-[#3b82f6] focus:outline-none transition"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm text-gray-500 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder-gray-600 focus:border-[#3b82f6] focus:outline-none transition"
                                        placeholder="you@company.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm text-gray-500 mb-2">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder-gray-600 focus:border-[#3b82f6] focus:outline-none transition"
                                        placeholder="Your company"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="interest" className="block text-sm text-gray-500 mb-2">
                                        I&apos;m interested in...
                                    </label>
                                    <select
                                        id="interest"
                                        name="interest"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white focus:border-[#3b82f6] focus:outline-none transition"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="foundry">Crelligent Foundry (Startups)</option>
                                        <option value="enterprise">Enterprise Engagement</option>
                                        <option value="platforms">Our Platforms</option>
                                        <option value="other">Something else</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm text-gray-500 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder-gray-600 focus:border-[#3b82f6] focus:outline-none transition resize-none"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full btn-primary justify-center"
                                >
                                    Send Message
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="glass-card rounded-lg p-8">
                                <h2 className="text-xl font-light mb-6">Contact Information</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center shrink-0">
                                            <Mail className="w-4 h-4 text-[#3b82f6]" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Email</div>
                                            <a
                                                href="mailto:hello@crelligent.com"
                                                className="text-white hover:text-[#3b82f6] transition"
                                            >
                                                hello@crelligent.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center shrink-0">
                                            <MapPin className="w-4 h-4 text-[#3b82f6]" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Location</div>
                                            <div className="text-white">Lagos, Nigeria</div>
                                            <div className="text-sm text-gray-500">Remote-first team</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card rounded-lg p-8">
                                <h3 className="text-lg font-light mb-4">What happens next?</h3>
                                <ol className="space-y-3 text-sm text-gray-400">
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs shrink-0">1</span>
                                        We&apos;ll respond within 24 hours
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs shrink-0">2</span>
                                        Schedule a discovery call
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs shrink-0">3</span>
                                        Receive a tailored proposal
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
