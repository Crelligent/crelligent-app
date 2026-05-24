import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
    capabilities: [
        { name: 'Business Design', href: '/capabilities/business-design' },
        { name: 'Product Strategy', href: '/capabilities/product-strategy' },
        { name: 'Economics & Value', href: '/capabilities/economics-value' },
        { name: 'CX/Service Design', href: '/capabilities/cx-design' },
        { name: 'Operating Model', href: '/capabilities/operating-model' },
        { name: 'Technology & Platforms', href: '/capabilities/technology-platforms' },
        { name: 'Data & Intelligence', href: '/capabilities/data-intelligence' },
        { name: 'Governance & Risk', href: '/capabilities/governance-risk' },
        { name: 'Change & Behavior', href: '/capabilities/change-behavior' },
    ],
    platforms: [
        { name: 'VeloDesk', href: '/platforms/velodesk' },
        { name: 'PRISM', href: '/platforms/prism' },
    ],
    company: [
        { name: 'About', href: '/about' },
        { name: 'Templates', href: '/templates' },
        { name: 'Foundry', href: '/foundry' },
        { name: 'Enterprise', href: '/enterprise' },
        { name: 'Contact', href: '/contact' },
    ],
}

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="Crelligent"
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <span className="text-xl font-light tracking-tight font-outfit">
                                Crelligent
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-gray-500 max-w-xs leading-relaxed">
                            We design the systems companies rely on before scale and complexity expose their weaknesses.
                        </p>
                    </div>

                    {/* Capabilities */}
                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                            Capabilities
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.capabilities.map(link => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-white transition"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Platforms */}
                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                            Platforms
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.platforms.map(link => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-white transition"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map(link => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-white transition"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-600">
                        © {new Date().getFullYear()} Crelligent & Co. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-sm text-gray-600">
                        <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition">Terms</Link>
                        <Link href="/workplace-policy" className="hover:text-white transition">Workplace Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
