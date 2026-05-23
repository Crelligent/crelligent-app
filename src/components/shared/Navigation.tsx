'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'

interface NavItem {
    name: string;
    href: string;
    desc?: string;
    primary?: boolean;
    content?: React.ReactNode;
}

interface NavItem {
    name: string;
    href: string;
    desc?: string;
    primary?: boolean;
    content?: React.ReactNode;
    ctaText?: string;
    ctaHref?: string;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

interface NavFeatured {
    tag?: string;
    title: string;
    description: string;
    linkText: string;
    href: string;
}

interface NavMenuData {
    id: string;
    label: string;
    contentLayout?: 'grid' | 'dynamic' | 'magazine';
    featured?: NavFeatured;
    sections: NavSection[];
}

const navData: NavMenuData[] = [
    {
        id: 'what-we-do',
        label: 'What We Do',
        featured: {
            title: 'We engineer businesses to evolve.',
            description: 'We design the systems companies rely on before scale and complexity expose their weaknesses. Systems architecture, product engineering, and intelligence systems for modern organizations.',
            linkText: 'Read our philosophy',
            href: '/focus'
        },
        sections: [
            {
                title: 'Capabilities',
                items: [
                    { name: 'Business Design', href: '/capabilities/business-design' },
                    { name: 'Product Strategy', href: '/capabilities/product-strategy' },
                    { name: 'Economics & Value', href: '/capabilities/economics-value' },
                    { name: 'CX/Service Design', href: '/capabilities/cx-design' },
                    { name: 'Operating Model', href: '/capabilities/operating-model' },
                    { name: 'Technology & Platforms', href: '/capabilities/technology-platforms' },
                    { name: 'Data & Intelligence', href: '/capabilities/data-intelligence' },
                    { name: 'Governance & Risk', href: '/capabilities/governance-risk' },
                    { name: 'Change & Behavior', href: '/capabilities/change-behavior' },
                ]
            },
            {
                title: 'Platforms',
                items: [
                    { name: 'VeloDesk', desc: 'Early-stage system sensing', href: '/platforms/velodesk' },
                    { name: 'PRISM', desc: 'Operational intelligence', href: '/platforms/prism' },
                ]
            },
            {
                title: 'Specialized Units',
                items: [
                    { name: 'Foundry', desc: 'Startup-as-a-Service', href: '/foundry' },
                    { name: 'Edge', desc: 'Mission-critical hardware', href: '/edge' },
                    { name: 'Enterprise', desc: 'Scale transformations', href: '/enterprise' },
                ]
            }
        ]
    },
    {
        id: 'who-we-are',
        label: 'Who We Are',
        contentLayout: 'dynamic',
        featured: {
            title: 'Engineers of Complexity',
            description: 'We are a collective of systems architects, business designers, and technologists building the next generation of enterprise infrastructure.',
            linkText: 'Meet our team',
            href: '/about/leadership'
        },
        sections: [
            {
                title: 'About Crelligent',
                items: [
                    {
                        name: 'Our Story', href: '/about/story',
                        ctaText: 'Read Our Story',
                        ctaHref: '/about/story',
                        content: (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h4 className="text-xl font-light text-white font-outfit">The Crelligent Story</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Crelligent was built to address a single, pervasive truth: the systems that power modern enterprises are too rigid for an adaptive world. We exist to re-engineer organizations so they can evolve perpetually alongside their markets.
                                </p>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    From bleeding-edge digital platforms to specialized organizational configurations, our mission is to build the architecture of tomorrow, today.
                                </p>
                            </div>
                        )
                    },
                    {
                        name: 'Leadership', href: '/about/leadership',
                        ctaText: 'Meet our team',
                        ctaHref: '/about/leadership',
                        content: <div className="animate-in fade-in duration-500"></div>
                    },
                    {
                        name: 'Partnerships', href: '/about/partners',
                        ctaText: 'View our partners',
                        ctaHref: '/about/partners',
                        content: (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h4 className="text-xl font-light text-white font-outfit">VeloDesk API Integrations</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Our platforms like VeloDesk are tightly integrated with best-in-class strategic partners to deliver robust, intelligent sensing at scale.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                        <div className="text-sm font-semibold text-white">OnAfriq</div>
                                        <div className="text-xs text-gray-400 mt-1">Cross-border financial messaging and fleet transaction card ingestion.</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                        <div className="text-sm font-semibold text-white">Stripe</div>
                                        <div className="text-xs text-gray-400 mt-1">Orchestrating global financial operations and complex B2B billing flows.</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                        <div className="text-sm font-semibold text-white">Supabase</div>
                                        <div className="text-xs text-gray-400 mt-1">Providing secure Postgres databases and real-time backend intelligence.</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                        <div className="text-sm font-semibold text-white">OpenAI</div>
                                        <div className="text-xs text-gray-400 mt-1">Powering agentic workflows, unstructured data parsing, and AI-driven BI insights.</div>
                                    </div>
                                </div>
                            </div>
                        )
                    },
                ]
            }
        ]
    },
    {
        id: 'how-we-think',
        label: 'How We Think',
        contentLayout: 'dynamic',
        featured: {
            title: 'Systems Over Symptoms',
            description: 'We believe that isolated fixes fail. Real transformation requires redesigning the underlying system to be inherently adaptive.',
            linkText: 'Explore our mindset',
            href: '/philosophy'
        },
        sections: [
            {
                title: 'Methodologies',
                items: [
                    {
                        name: 'Structural Intelligence',
                        href: '/methodology/structural-intelligence',
                        ctaText: 'Explore the methodology',
                        ctaHref: '/methodology/structural-intelligence',
                        content: (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h4 className="text-xl font-light text-white font-outfit">The Structural Intelligence Method</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Structural Intelligence is not about predicting the future; it&apos;s about building an organization that can survive it. We analyze the hidden dependencies, structural bottlenecks, and feedback loops that dictate how your enterprise truly behaves.
                                </p>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    By mapping the reality of your current systems, we engineer paths to deliberate evolution.
                                </p>
                            </div>
                        )
                    },
                    {
                        name: 'Value Engineering',
                        href: '/methodology/value-engineering',
                        ctaText: 'Read our engineering approach',
                        ctaHref: '/methodology/value-engineering',
                        content: (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h4 className="text-xl font-light text-white font-outfit">Engineering for Outsized Value</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    We dismantle assumptions about where value is created. By stripping away legacy processes and redesigning core product flows from first principles, we engineer systems that do exponentially more with significantly less.
                                </p>
                                <div className="p-4 rounded-lg bg-[#22c55e]/5 border border-[#22c55e]/10 mt-6">
                                    <h5 className="text-sm font-semibold text-[#22c55e]">Case Study: Legacy Decoupling</h5>
                                    <p className="text-xs text-gray-400 mt-1">How we stripped 40% of operational overhead from a $2B logistics firm by re-engineering their core scheduling engine.</p>
                                </div>
                            </div>
                        )
                    },
                    {
                        name: 'Failure Mode Analysis',
                        href: '/methodology/fma',
                        ctaText: 'Learn how we stress-test',
                        ctaHref: '/methodology/fma',
                        content: (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h4 className="text-xl font-light text-white font-outfit">Anticipating Systemic Collapse</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Before we build, we break. Our FMA framework pressure-tests your organizational and technical architecture against extreme edge cases, ensuring mission-critical systems remain robust when it matters most.
                                </p>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    We model cascading failures, security breaches, and rapid market shifts to build in true technical resilience.
                                </p>
                            </div>
                        )
                    },
                ]
            }
        ]
    },
    {
        id: 'insights',
        label: 'Insights',
        sections: [
            {
                title: 'Research & Analysis',
                items: [
                    { name: 'Industry Reports', href: '/insights/reports' },
                    { name: 'Whitepapers', href: '/insights/whitepapers' },
                    { name: 'Case Studies', href: '/insights/case-studies' },
                ]
            }
        ]
    },
    {
        id: 'templates',
        label: 'Templates',
        sections: [
            {
                title: 'Resources',
                items: [
                    { name: 'Architecture Blueprints', href: '/templates/blueprints' },
                    { name: 'Operating Models', href: '/templates/operating-models' },
                    { name: 'Governance Frameworks', href: '/templates/governance' },
                ]
            }
        ]
    },
    {
        id: 'focus',
        label: 'Focus',
        contentLayout: 'dynamic',
        featured: {
            title: 'Three Layers. One Integrated System.',
            description: 'We operate across three interconnected system domains. Most firms pick one. We engineer across all three—because that\'s where real leverage lives.',
            linkText: 'Explore our focus areas',
            href: '/focus'
        },
        sections: [
            {
                title: 'Key Areas',
                items: [
                    {
                        name: 'Software Systems',
                        href: '/focus#software',
                        ctaText: 'Learn about Software Systems',
                        ctaHref: '/focus#software',
                        content: (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h4 className="text-xl font-light text-[#3b82f6] font-outfit">Software Systems</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Systems where code is the primary medium and logic is explicit.
                                </p>
                                <ul className="space-y-2 mt-4">
                                    <li className="text-sm text-gray-300 flex items-start gap-2"><div className="mt-1.5 w-1 h-1 rounded-full bg-[#3b82f6] shrink-0" />Applications (web, mobile, desktop)</li>
                                    <li className="text-sm text-gray-300 flex items-start gap-2"><div className="mt-1.5 w-1 h-1 rounded-full bg-[#3b82f6] shrink-0" />Platforms & APIs</li>
                                    <li className="text-sm text-gray-300 flex items-start gap-2"><div className="mt-1.5 w-1 h-1 rounded-full bg-[#3b82f6] shrink-0" />Data systems & pipelines</li>
                                    <li className="text-sm text-gray-300 flex items-start gap-2"><div className="mt-1.5 w-1 h-1 rounded-full bg-[#3b82f6] shrink-0" />AI/ML systems</li>
                                </ul>
                            </div>
                        )
                    },
                    {
                        name: 'IT / Enterprise Systems',
                        href: '/focus#enterprise',
                        ctaText: 'Learn about Enterprise Systems',
                        ctaHref: '/focus#enterprise',
                        content: (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h4 className="text-xl font-light text-[#8b5cf6] font-outfit">IT / Enterprise Systems</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Systems that run and govern the organization rather than deliver the product directly.
                                </p>
                                <ul className="space-y-2 mt-4">
                                    <li className="text-sm text-gray-300 flex items-start gap-2"><div className="mt-1.5 w-1 h-1 rounded-full bg-[#8b5cf6] shrink-0" />ERP & CRM deployments</li>
                                    <li className="text-sm text-gray-300 flex items-start gap-2"><div className="mt-1.5 w-1 h-1 rounded-full bg-[#8b5cf6] shrink-0" />Identity & access management</li>
                                    <li className="text-sm text-gray-300 flex items-start gap-2"><div className="mt-1.5 w-1 h-1 rounded-full bg-[#8b5cf6] shrink-0" />Infrastructure & cloud platforms</li>
                                    <li className="text-sm text-gray-300 flex items-start gap-2"><div className="mt-1.5 w-1 h-1 rounded-full bg-[#8b5cf6] shrink-0" />Security & compliance systems</li>
                                </ul>
                            </div>
                        )
                    },
                    {
                        name: 'Business Systems',
                        href: '/focus#business',
                        ctaText: 'Learn about Business Systems',
                        ctaHref: '/focus#business',
                        content: (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h4 className="text-xl font-light text-[#22c55e] font-outfit">Business Systems</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    The human, economic, and organizational systems that determine outcomes.
                                </p>
                                <ul className="space-y-2 mt-4">
                                    <li className="text-sm text-gray-300 flex items-start gap-2"><div className="mt-1.5 w-1 h-1 rounded-full bg-[#22c55e] shrink-0" />Business & Operating models</li>
                                    <li className="text-sm text-gray-300 flex items-start gap-2"><div className="mt-1.5 w-1 h-1 rounded-full bg-[#22c55e] shrink-0" />Incentive & compensation systems</li>
                                    <li className="text-sm text-gray-300 flex items-start gap-2"><div className="mt-1.5 w-1 h-1 rounded-full bg-[#22c55e] shrink-0" />Governance & decision systems</li>
                                    <li className="text-sm text-gray-300 flex items-start gap-2"><div className="mt-1.5 w-1 h-1 rounded-full bg-[#22c55e] shrink-0" />Partner & ecosystem models</li>
                                </ul>
                            </div>
                        )
                    },
                ]
            }
        ]
    },
    {
        id: 'publications',
        label: 'Publications',
        contentLayout: 'magazine',
        featured: {
            title: 'Crelligent Review',
            description: 'Our premier publication covering the intersection of global systems, technology, and economic policy.',
            linkText: 'Read the latest issue',
            href: '/publications/review'
        },
        sections: [
            {
                title: 'Featured Issue',
                items: [
                    {
                        name: 'The Adaptation Deficit',
                        desc: 'Why trillion-dollar enterprises are losing the battle against systemic complexity—and the engineering required to survive it.',
                        href: '/publications/review/latest'
                    },
                    {
                        name: 'The End of Software as a Service',
                        desc: 'The shift from renting software to orchestrating agentic ecosystems.',
                        href: '/publications/review/latest#saas'
                    },
                    {
                        name: 'Pricing Chaos',
                        desc: 'How dynamic billing models are exposing the fragility of legacy financial infrastructure.',
                        href: '/publications/review/latest#pricing'
                    },
                ]
            }
        ]
    },
    {
        id: 'careers',
        label: 'Careers',
        sections: [
            {
                title: 'Join Us',
                items: [
                    { name: 'Open Roles', href: '/careers/roles' },
                    { name: 'Life at Crelligent', href: '/careers/life' },
                    { name: 'The Guild', href: '/careers/guild' },
                ]
            }
        ]
    },
    {
        id: 'newsroom',
        label: 'Newsroom',
        sections: [
            {
                title: 'Press & Media',
                items: [
                    { name: 'Press Releases', href: '/newsroom/press' },
                    { name: 'Media Assets', href: '/newsroom/assets' },
                    { name: 'In the News', href: '/newsroom/coverage' },
                ]
            }
        ]
    }
]

export function Navigation() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [activeSubItem, setActiveSubItem] = useState<string>('Our Story')
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleMouseEnter = (id: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setActiveMenu(id)
        // Reset subitem to default when opening who-we-are
        if (id === 'who-we-are') setActiveSubItem('Our Story')
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null)
        }, 300)
    }

    const handlePaneMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [])

    const activeMenuData = navData.find(m => m.id === activeMenu)

    // Helper to find the currently active sub item node
    const getActiveSubItemData = () => {
        if (!activeMenuData || activeMenuData.contentLayout !== 'dynamic') return null;
        for (const section of activeMenuData.sections) {
            const item = section.items.find(i => i.name === activeSubItem)
            if (item) return item
        }
        return null;
    }

    const currentSubItem = getActiveSubItemData();

    // Helper to find the currently active sub item content
    const getActiveSubItemContent = () => {
        const item = getActiveSubItemData();
        return item?.content || null;
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 transition-all w-full leading-normal">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between">
                {/* Logo (Left Aligned) */}
                <div className="w-48 flex-shrink-0">
                    <Link href="/" className="flex items-center gap-2 z-50">
                        <Image
                            src="/logo.png"
                            alt="Crelligent"
                            width={36}
                            height={36}
                            className="w-9 h-9"
                        />
                        <span className="text-xl font-light tracking-tight font-outfit hidden sm:block">
                            Crelligent
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation (Center Aligned) */}
                <div className="hidden xl:flex items-center justify-center gap-6 z-50 relative h-full py-2 flex-grow">
                    {navData.map((menu) => (
                        <div
                            key={menu.id}
                            className="h-full flex items-center cursor-pointer"
                            onMouseEnter={() => handleMouseEnter(menu.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button className="flex items-center gap-1 text-[13px] font-medium text-gray-300 hover:text-white transition group py-2 whitespace-nowrap">
                                {menu.label}
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === menu.id ? 'rotate-180 text-white' : 'text-gray-600 group-hover:text-gray-400'}`} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Right Placeholder (to perfectly center the middle items) */}
                <div className="hidden xl:flex w-48 justify-end items-center flex-shrink-0">
                    <Link href="/contact" className="text-[13px] font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
                        Contact Us
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="xl:hidden p-2 text-gray-400 hover:text-white z-50"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Desktop Full-Width Mega Menu Dropdown */}
            <div
                className={`hidden xl:block absolute top-[72px] left-0 right-0 w-full bg-[#0a0a0a] border-b border-white/10 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out origin-top z-40 ${activeMenu ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'
                    }`}
                onMouseEnter={handlePaneMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {activeMenuData && (
                    <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-8 flex border-x border-[#1a1a1a]/50 min-h-[400px]">
                        {/* Featured Left Pane (Optional) */}
                        {activeMenuData.featured && activeMenuData.contentLayout !== 'magazine' && (
                            <div className="w-[30%] pr-10 border-r border-white/5 flex flex-col justify-between py-10">
                                <div>
                                    {activeMenuData.featured.tag && (
                                        <div className="inline-block px-3 py-1 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full text-xs text-[#22c55e] mb-6">
                                            {activeMenuData.featured.tag}
                                        </div>
                                    )}
                                    <h2 className="text-2xl font-light font-outfit mb-4">
                                        {activeMenuData.featured.title}
                                    </h2>
                                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                        {activeMenuData.featured.description}
                                    </p>
                                </div>
                                <Link
                                    href={currentSubItem?.ctaHref || activeMenuData.featured.href}
                                    className="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-[#22c55e] transition group w-max"
                                >
                                    {currentSubItem?.ctaText || activeMenuData.featured.linkText}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        )}

                        {/* Right Pane Routing Logic */}
                        {activeMenuData.contentLayout === 'dynamic' ? (
                            <div className="flex-1 flex py-10">
                                {/* Links List Pane */}
                                <div className="w-[35%] pl-10 pr-10 border-r border-white/5">
                                    {activeMenuData.sections.map((section, idx) => (
                                        <div key={idx}>
                                            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#22c55e] mb-6 border-b border-white/10 pb-3">
                                                {section.title}
                                            </h3>
                                            <ul className="space-y-4">
                                                {section.items.map(item => (
                                                    <li key={item.name}>
                                                        <div
                                                            className={`flex flex-col group transition-all cursor-pointer border-l-2 pl-3 py-1 ${activeSubItem === item.name ? 'border-[#22c55e] bg-white/5' : 'border-transparent hover:border-white/20'}`}
                                                            onMouseEnter={() => setActiveSubItem(item.name)}
                                                        >
                                                            <Link href={item.href} className={`text-sm ${activeSubItem === item.name ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'} transition-colors leading-snug block w-full h-full`}>
                                                                {item.name}
                                                            </Link>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                {/* Dynamic Content Display Pane */}
                                <div className="w-[65%] pl-10">
                                    {getActiveSubItemContent()}
                                </div>
                            </div>
                        ) : activeMenuData.contentLayout === 'magazine' ? (
                            <div className="flex-1 flex py-10 items-stretch h-full">
                                {/* Magazine Cover Placeholder */}
                                <div className="w-[40%] pr-10 border-r border-white/5 flex flex-col relative items-center justify-center">
                                    <Link href="/publications/review" className="block w-full max-w-[240px] aspect-[8.5/11] bg-black/40 border border-white/5 rounded-sm relative overflow-hidden group shadow-2xl">
                                        <Image
                                            src="/Group 3.png"
                                            alt="Crelligent Review Cover"
                                            fill
                                            className="object-contain transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Hover overlay hint */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                            <span className="text-white text-sm font-medium border border-white/20 rounded-full px-4 py-2 backdrop-blur-md">View Issue</span>
                                        </div>
                                    </Link>
                                </div>

                                {/* Content Highlights Pane */}
                                <div className="w-[60%] pl-10 flex flex-col justify-between h-full">
                                    <div>
                                        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#3b82f6] mb-6 border-b border-white/10 pb-3">
                                            Current Issue
                                        </h3>

                                        <div className="mb-10">
                                            <h2 className="text-2xl font-light font-outfit mb-4 text-white">
                                                {activeMenuData.featured?.description}
                                            </h2>
                                        </div>

                                        <div className="space-y-6">
                                            {activeMenuData.sections[0].items.map((item, idx) => (
                                                <div key={idx} className="group">
                                                    <Link href={item.href} className="block group-hover:pl-2 transition-all">
                                                        <h4 className="text-base text-gray-200 group-hover:text-white transition-colors font-medium mb-1">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed">
                                                            {item.desc}
                                                        </p>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action link at the bottom right */}
                                    <div className="pt-8 mt-auto">
                                        <Link
                                            href={activeMenuData.featured?.href || '/publications'}
                                            className="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-[#3b82f6] transition group w-max"
                                        >
                                            {activeMenuData.featured?.linkText}
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Standard Multi-Column Grid Pane */
                            <div className={`flex-1 pl-10 grid gap-8 py-10 ${activeMenuData.featured ? 'grid-cols-3' : 'grid-cols-4'}`}>
                                {activeMenuData.sections.map((section, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#22c55e] mb-6 border-b border-white/10 pb-3">
                                            {section.title}
                                        </h3>
                                        <ul className="space-y-4">
                                            {section.items.map(item => (
                                                <li key={item.name}>
                                                    <Link href={item.href} className="flex flex-col group hover:pl-2 transition-all">
                                                        <span className={`text-sm ${item.primary ? 'text-gray-200' : 'text-gray-400'} group-hover:text-white transition-colors leading-snug`}>
                                                            {item.name}
                                                        </span>
                                                        {item.desc && (
                                                            <span className="text-xs text-gray-500 mt-1 transition-colors leading-snug">
                                                                {item.desc}
                                                            </span>
                                                        )}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="xl:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-x border-white/10 m-4 rounded-xl p-6 shadow-2xl h-[calc(100vh-6rem)] overflow-y-auto">
                    <div className="space-y-8">
                        {navData.map(menu => (
                            <div key={menu.id}>
                                <div className="text-sm font-semibold uppercase tracking-widest text-[#22c55e] mb-4">{menu.label}</div>
                                <div className="space-y-6 pl-2 border-l border-white/10">
                                    {menu.sections.map((sec, i) => (
                                        <div key={i}>
                                            <div className="text-xs text-gray-500 mb-2 uppercase">{sec.title}</div>
                                            <div className="space-y-3">
                                                {sec.items.map(item => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="block text-sm text-gray-300 hover:text-white"
                                                        onClick={() => setMobileOpen(false)}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}
