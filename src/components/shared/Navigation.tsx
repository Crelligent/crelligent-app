'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const capabilities = [
    { name: 'Business Design', href: '/capabilities/business-design', primary: true },
    { name: 'Product Strategy', href: '/capabilities/product-strategy', primary: true },
    { name: 'CX/Design', href: '/capabilities/cx-design', primary: true },
    { name: 'Data & Intelligence', href: '/capabilities/data-intelligence', primary: false },
    { name: 'Technology Outsourcing', href: '/capabilities/technology-outsourcing', primary: false },
    { name: 'Embedded Systems', href: '/capabilities/embedded-systems', primary: false },
]

const platforms = [
    { name: 'VeloDesk', desc: 'Early-stage system sensing', href: '/platforms/velodesk' },
    { name: 'BI Suite', desc: 'Organizational intelligence', href: '/platforms/bisuite' },
    { name: 'MarketPulse', desc: 'Market feedback loops', href: '/platforms/marketpulse' },
]

export function Navigation() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-8 py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto flex items-center relative">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="Crelligent"
                        width={36}
                        height={36}
                        className="w-9 h-9"
                    />
                    <span className="text-xl font-light tracking-tight font-outfit">
                        Crelligent
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -ml-12">
                    {/* Capabilities Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setActiveDropdown('capabilities')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition">
                            Capabilities
                            <ChevronDown className="w-3 h-3" />
                        </button>

                        {activeDropdown === 'capabilities' && (
                            <div className="absolute top-full left-0 pt-2 w-72">
                                <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-2 shadow-2xl">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 px-3 py-2">
                                        Primary
                                    </div>
                                    {capabilities.filter(c => c.primary).map(cap => (
                                        <Link
                                            key={cap.href}
                                            href={cap.href}
                                            className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition"
                                        >
                                            {cap.name}
                                        </Link>
                                    ))}
                                    <div className="border-t border-white/5 my-2" />
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 px-3 py-2">
                                        Supporting
                                    </div>
                                    {capabilities.filter(c => !c.primary).map(cap => (
                                        <Link
                                            key={cap.href}
                                            href={cap.href}
                                            className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded transition"
                                        >
                                            {cap.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Platforms Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setActiveDropdown('platforms')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition">
                            Platforms
                            <ChevronDown className="w-3 h-3" />
                        </button>

                        {activeDropdown === 'platforms' && (
                            <div className="absolute top-full left-0 pt-2 w-64">
                                <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-2 shadow-2xl">
                                    {platforms.map(platform => (
                                        <Link
                                            key={platform.href}
                                            href={platform.href}
                                            className="block px-3 py-3 hover:bg-white/5 rounded transition"
                                        >
                                            <div className="text-sm text-white">{platform.name}</div>
                                            <div className="text-xs text-gray-500">{platform.desc}</div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/templates" className="text-sm text-gray-400 hover:text-white transition">
                        Templates
                    </Link>

                    <Link href="/focus" className="text-sm text-gray-400 hover:text-white transition">
                        Focus
                    </Link>

                    <Link href="/foundry" className="text-sm text-gray-400 hover:text-white transition">
                        Foundry
                    </Link>

                    <Link href="/edge" className="text-sm text-gray-400 hover:text-white transition">
                        Edge
                    </Link>

                    <Link href="/enterprise" className="text-sm text-gray-400 hover:text-white transition">
                        Enterprise
                    </Link>

                    <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition">
                        Contact
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden ml-auto p-2 text-gray-400 hover:text-white"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-white/10 p-6">
                    <div className="space-y-4">
                        <div>
                            <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Capabilities</div>
                            {capabilities.map(cap => (
                                <Link
                                    key={cap.href}
                                    href={cap.href}
                                    className="block py-2 text-sm text-gray-300 hover:text-white"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {cap.name}
                                </Link>
                            ))}
                        </div>
                        <div className="border-t border-white/10 pt-4">
                            <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Platforms</div>
                            {platforms.map(platform => (
                                <Link
                                    key={platform.href}
                                    href={platform.href}
                                    className="block py-2 text-sm text-gray-300 hover:text-white"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {platform.name}
                                </Link>
                            ))}
                        </div>
                        <div className="border-t border-white/10 pt-4 space-y-2">
                            <Link href="/templates" className="block py-2 text-sm text-gray-300 hover:text-white">Templates</Link>
                            <Link href="/focus" className="block py-2 text-sm text-gray-300 hover:text-white">Focus</Link>
                            <Link href="/foundry" className="block py-2 text-sm text-gray-300 hover:text-white">Foundry</Link>
                            <Link href="/edge" className="block py-2 text-sm text-gray-300 hover:text-white">Edge</Link>
                            <Link href="/enterprise" className="block py-2 text-sm text-gray-300 hover:text-white">Enterprise</Link>
                            <Link href="/contact" className="block py-2 text-sm text-gray-300 hover:text-white">Contact</Link>
                        </div>

                    </div>
                </div>
            )}
        </nav>
    )
}
