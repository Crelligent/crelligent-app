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

const socialLinks = [
    {
        name: 'X / Twitter',
        href: 'https://x.com/crelligent',
        icon: (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.254 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        href: 'https://linkedin.com/company/crelligent',
        icon: (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        href: 'https://instagram.com/crelligent',
        icon: (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
            </svg>
        ),
    },
    {
        name: 'Uche Igboanugo Systems Lab',
        href: 'https://youtube.com/@UcheIgboanugo',
        icon: (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
            </svg>
        ),
    },
]

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
                        {/* Social Links */}
                        <div className="mt-6 flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    title={social.name}
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white transition-all duration-200"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                        <p className="mt-3 text-xs text-gray-600">
                            <a
                                href="https://youtube.com/@UcheIgboanugo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-400 transition"
                            >
                                Uche Igboanugo Systems Lab ↗
                            </a>
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
