'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import {
    ArrowRight,
    Sparkles,
    Layers,
    Target,
    Search,
    Shield,
    FileText,
    Download,
    Check,
    LayoutGrid,
    Workflow,
    Gauge,
    Users,
    Building2,
    X
} from 'lucide-react'

const categories = [
    { id: 'all', name: 'All Templates', icon: LayoutGrid, count: 16 },
    { id: 'architecture', name: 'System Architecture', icon: Layers, count: 4 },
    { id: 'strategy', name: 'Strategy & Planning', icon: Target, count: 3 },
    { id: 'operations', name: 'Operating Models', icon: Workflow, count: 3 },
    { id: 'assessment', name: 'Assessment & Audit', icon: Gauge, count: 3 },
    { id: 'governance', name: 'Governance', icon: Shield, count: 3 },
]

const templates = [
    // System Architecture
    {
        id: 'system-intent-canvas',
        name: 'System Intent Canvas',
        category: 'architecture',
        price: 5,
        description: 'Define what your system exists to accomplish before implementation. Maps purpose, boundaries, and success criteria.',
        format: 'PDF + Figma + Miro',
        pages: 4,
        popular: true,
        color: '#3b82f6',
    },
    {
        id: 'system-architecture-blueprint',
        name: 'System Architecture Blueprint',
        category: 'architecture',
        price: 5,
        description: 'Document your system structure, components, interfaces, and dependencies in a comprehensive blueprint.',
        format: 'PDF + Notion',
        pages: 12,
        popular: true,
        color: '#6366f1',
    },
    {
        id: 'dependency-mapping-template',
        name: 'Dependency Mapping Template',
        category: 'architecture',
        price: 5,
        description: 'Visualize how components interact, influence, and rely on each other across your system.',
        format: 'PDF + Miro + Figma',
        pages: 6,
        popular: false,
        color: '#8b5cf6',
    },
    {
        id: 'boundary-definition-framework',
        name: 'Boundary Definition Framework',
        category: 'architecture',
        price: 5,
        description: 'Define clear system boundaries, ownership, interfaces, and handoff points between teams.',
        format: 'PDF + Notion',
        pages: 8,
        popular: false,
        color: '#a855f7',
    },

    // Strategy & Planning
    {
        id: 'systems-thinking-workshop',
        name: 'Systems Thinking Workshop Kit',
        category: 'strategy',
        price: 5,
        description: 'Facilitate systems thinking sessions with your team. Includes exercises, prompts, and output templates.',
        format: 'PDF + Slides + Miro',
        pages: 24,
        popular: true,
        color: '#22c55e',
    },
    {
        id: 'pre-scale-readiness',
        name: 'Pre-Scale Readiness Assessment',
        category: 'strategy',
        price: 5,
        description: 'Evaluate if your systems are ready for the next growth stage. Identify gaps before they become problems.',
        format: 'PDF + Spreadsheet',
        pages: 10,
        popular: false,
        color: '#10b981',
    },
    {
        id: 'system-roadmap-template',
        name: 'System Evolution Roadmap',
        category: 'strategy',
        price: 5,
        description: 'Plan system changes over time with phased milestones, dependencies, and risk indicators.',
        format: 'PDF + Notion + Slides',
        pages: 8,
        popular: false,
        color: '#14b8a6',
    },

    // Operating Models
    {
        id: 'operating-model-canvas',
        name: 'Operating Model Canvas',
        category: 'operations',
        price: 5,
        description: 'Design how your organization operates as a system. Maps capabilities, processes, and governance.',
        format: 'PDF + Figma + Miro',
        pages: 6,
        popular: true,
        color: '#f59e0b',
    },
    {
        id: 'feedback-loop-designer',
        name: 'Feedback Loop Designer',
        category: 'operations',
        price: 5,
        description: 'Design and document organizational feedback loops—sensing, learning, and adaptation mechanisms.',
        format: 'PDF + Miro',
        pages: 5,
        popular: false,
        color: '#f97316',
    },
    {
        id: 'process-system-map',
        name: 'Process-to-System Map',
        category: 'operations',
        price: 5,
        description: 'Connect operational processes to the larger system. Identify gaps, redundancies, and misalignments.',
        format: 'PDF + Figma',
        pages: 8,
        popular: false,
        color: '#ef4444',
    },

    // Assessment & Audit
    {
        id: 'system-health-audit',
        name: 'System Health Audit Template',
        category: 'assessment',
        price: 5,
        description: 'Comprehensive audit framework to assess system resilience, alignment, and performance.',
        format: 'PDF + Spreadsheet',
        pages: 16,
        popular: true,
        color: '#ec4899',
    },
    {
        id: 'failure-mode-analysis',
        name: 'Failure Mode Analysis Template',
        category: 'assessment',
        price: 5,
        description: 'Identify potential failure points and design degradation pathways before problems occur.',
        format: 'PDF + Spreadsheet',
        pages: 10,
        popular: false,
        color: '#d946ef',
    },
    {
        id: 'system-alignment-scorecard',
        name: 'System Alignment Scorecard',
        category: 'assessment',
        price: 5,
        description: 'Measure how well your systems support organizational goals. Calculate your own System Alignment Index.',
        format: 'PDF + Spreadsheet',
        pages: 8,
        popular: false,
        color: '#c026d3',
    },

    // Governance
    {
        id: 'system-governance-framework',
        name: 'System Governance Framework',
        category: 'governance',
        price: 5,
        description: 'Establish decision rights, accountability, and change management for your systems.',
        format: 'PDF + Notion',
        pages: 14,
        popular: false,
        color: '#0ea5e9',
    },
    {
        id: 'change-impact-assessment',
        name: 'Change Impact Assessment',
        category: 'governance',
        price: 5,
        description: 'Evaluate the system-wide impact of proposed changes before implementation.',
        format: 'PDF + Spreadsheet',
        pages: 6,
        popular: false,
        color: '#06b6d4',
    },
    {
        id: 'stakeholder-system-map',
        name: 'Stakeholder System Map',
        category: 'governance',
        price: 5,
        description: 'Map stakeholder relationships, influence, and dependencies within your organizational system.',
        format: 'PDF + Miro',
        pages: 4,
        popular: false,
        color: '#0891b2',
    },
]

const bundles = [
    {
        name: 'Starter Kit',
        templates: 3,
        price: 12,
        description: 'Pick any 3 templates',
        icon: FileText,
    },
    {
        name: 'Architecture Pack',
        templates: 4,
        price: 15,
        description: 'All System Architecture templates',
        icon: Layers,
    },
    {
        name: 'Complete Library',
        templates: 'All 16',
        price: 49,
        description: 'Every template + future additions',
        icon: LayoutGrid,
        highlight: true,
    },
]

export default function TemplatesPage() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    // Filter templates
    const filteredTemplates = templates.filter(template => {
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
        const matchesSearch = searchQuery === '' ||
            template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navigation />

            {/* Hero with Search */}
            <section className="pt-32 pb-12 px-6 border-b border-white/5">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="heading-xl mb-6">
                        Systems Design
                        <br />
                        <span className="text-gray-500">Templates & Frameworks</span>
                    </h1>

                    <p className="text-lg text-gray-400 font-light max-w-xl mx-auto mb-10">
                        Professional frameworks for systems thinking, architecture, and governance.
                        The same tools we use with enterprise clients.
                    </p>

                    {/* Premium Search Bar */}
                    <div className="relative max-w-xl mx-auto">
                        <div className="absolute inset-0 bg-[#3b82f6]/20 blur-xl rounded-full opacity-50" />
                        <div className="relative flex items-center bg-[#0a0a0a] border border-white/10 rounded-full overflow-hidden focus-within:border-[#3b82f6]/50 transition">
                            <Search className="w-5 h-5 text-gray-500 ml-5" />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent px-4 py-4 text-white placeholder-gray-500 focus:outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="p-2 mr-2 text-gray-500 hover:text-white transition"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                            <button className="bg-[#3b82f6] text-white px-6 py-4 hover:bg-[#2563eb] transition">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content with Sidebar */}
            <div className="flex min-h-screen">

                {/* Sidebar */}
                <aside className="hidden lg:block w-72 border-r border-white/5 bg-[#0a0a0a]">
                    <div className="sticky top-0 h-screen overflow-y-auto pt-6 pb-8 px-4">
                        {/* Categories */}
                        <div className="mb-8">
                            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 px-3">
                                Categories
                            </h3>
                            <nav className="space-y-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm transition ${selectedCategory === cat.id
                                                ? 'bg-[#3b82f6]/10 text-[#3b82f6]'
                                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <cat.icon className="w-5 h-5" />
                                            {cat.name}
                                        </span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === cat.id
                                                ? 'bg-[#3b82f6]/20 text-[#3b82f6]'
                                                : 'bg-white/5 text-gray-600'
                                            }`}>
                                            {cat.count}
                                        </span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-white/5 my-6" />

                        {/* Bundles Section */}
                        <div className="mb-8">
                            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 px-3">
                                Save More
                            </h3>
                            <div className="space-y-3">
                                {bundles.map((bundle) => (
                                    <Link
                                        key={bundle.name}
                                        href="#bundles"
                                        className={`block p-4 rounded-lg transition ${bundle.highlight
                                                ? 'bg-[#3b82f6]/10 border border-[#3b82f6]/20 hover:bg-[#3b82f6]/20'
                                                : 'bg-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <bundle.icon className={`w-5 h-5 ${bundle.highlight ? 'text-[#3b82f6]' : 'text-gray-500'}`} />
                                            <span className={`text-sm font-medium ${bundle.highlight ? 'text-[#3b82f6]' : 'text-white'}`}>
                                                {bundle.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{bundle.description}</span>
                                            <span className={`text-sm font-medium ${bundle.highlight ? 'text-[#3b82f6]' : 'text-gray-300'}`}>
                                                ${bundle.price}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-white/5 my-6" />

                        {/* Quick Stats */}
                        <div className="px-3">
                            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                                Quick Stats
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Total Templates</span>
                                    <span className="text-white">16</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Price Each</span>
                                    <span className="text-[#3b82f6]">$5</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Formats</span>
                                    <span className="text-white">PDF, Figma, Miro</span>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-white/5 my-6" />

                        {/* Need Help */}
                        <div className="px-3">
                            <div className="p-4 bg-white/5 rounded-lg">
                                <h4 className="text-sm font-medium mb-2">Need custom work?</h4>
                                <p className="text-xs text-gray-500 mb-3">
                                    We can create custom frameworks tailored to your organization.
                                </p>
                                <Link
                                    href="/contact"
                                    className="text-xs text-[#3b82f6] hover:underline flex items-center gap-1"
                                >
                                    Contact us <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {/* Mobile Category Pills */}
                    <div className="lg:hidden px-6 py-4 border-b border-white/5 overflow-x-auto">
                        <div className="flex gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${selectedCategory === cat.id
                                            ? 'bg-[#3b82f6] text-white'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    <cat.icon className="w-4 h-4" />
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results Header */}
                    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
                            {searchQuery && <span> for &quot;{searchQuery}&quot;</span>}
                        </div>
                        <div className="text-sm text-gray-500">
                            {selectedCategory !== 'all' && (
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className="text-[#3b82f6] hover:underline"
                                >
                                    Clear filter
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Templates Grid */}
                    <div className="p-6">
                        {filteredTemplates.length > 0 ? (
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredTemplates.map((template) => (
                                    <div
                                        key={template.id}
                                        className="group glass-card rounded-xl overflow-hidden hover:border-[#3b82f6]/30 transition"
                                    >
                                        {/* Image Placeholder */}
                                        <div
                                            className="aspect-[16/10] relative overflow-hidden"
                                            style={{
                                                background: `linear-gradient(135deg, ${template.color}15 0%, ${template.color}05 100%)`
                                            }}
                                        >
                                            {/* Decorative Elements */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div
                                                    className="w-24 h-24 rounded-2xl border-2 opacity-30 rotate-12"
                                                    style={{ borderColor: template.color }}
                                                />
                                                <div
                                                    className="absolute w-16 h-16 rounded-xl border-2 opacity-20 -rotate-6"
                                                    style={{ borderColor: template.color }}
                                                />
                                                <FileText
                                                    className="absolute w-10 h-10 opacity-40"
                                                    style={{ color: template.color }}
                                                />
                                            </div>

                                            {/* Format Pills */}
                                            <div className="absolute bottom-3 left-3 flex gap-1.5">
                                                {template.format.split(' + ').slice(0, 2).map((fmt) => (
                                                    <span
                                                        key={fmt}
                                                        className="px-2 py-1 bg-black/50 backdrop-blur-sm text-xs text-white/80 rounded"
                                                    >
                                                        {fmt}
                                                    </span>
                                                ))}
                                                {template.format.split(' + ').length > 2 && (
                                                    <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-xs text-white/80 rounded">
                                                        +{template.format.split(' + ').length - 2}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Popular Badge */}
                                            {template.popular && (
                                                <div
                                                    className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-full"
                                                    style={{ backgroundColor: template.color, color: 'white' }}
                                                >
                                                    Popular
                                                </div>
                                            )}

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                                <button
                                                    className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition flex items-center gap-2"
                                                >
                                                    Preview Template
                                                </button>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-lg font-light leading-snug">{template.name}</h3>
                                                <div
                                                    className="text-lg font-medium shrink-0 ml-3"
                                                    style={{ color: template.color }}
                                                >
                                                    ${template.price}
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                                                {template.description}
                                            </p>

                                            <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                                                <span>{template.pages} pages</span>
                                                <span className="capitalize">{template.category}</span>
                                            </div>

                                            <button
                                                className="w-full py-2.5 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                                                style={{
                                                    backgroundColor: `${template.color}15`,
                                                    color: template.color,
                                                    border: `1px solid ${template.color}30`
                                                }}
                                            >
                                                <Download className="w-4 h-4" />
                                                Purchase Template
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <Search className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                                <h3 className="text-lg font-light mb-2">No templates found</h3>
                                <p className="text-sm text-gray-500 mb-4">Try adjusting your search or category filter</p>
                                <button
                                    onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                                    className="text-sm text-[#3b82f6] hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* What's Included - Inline */}
                    <section className="px-6 py-12 border-t border-white/5">
                        <h2 className="text-xl font-light mb-6">Every template includes</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                'PDF with instructions',
                                'Editable design files',
                                'Commercial license',
                                'Lifetime updates',
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                                >
                                    <Check className="w-4 h-4 text-[#3b82f6]" />
                                    <span className="text-sm text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Use Cases */}
                    <section className="px-6 py-12 border-t border-white/5 bg-[#0a0a0a]">
                        <h2 className="text-xl font-light mb-6">Built for systems thinkers</h2>
                        <div className="grid sm:grid-cols-3 gap-6">
                            <div className="flex items-start gap-4">
                                <Users className="w-6 h-6 text-[#3b82f6] shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-sm font-medium mb-1">Consultants</h3>
                                    <p className="text-xs text-gray-500">Use with your own clients. Commercial license included.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Building2 className="w-6 h-6 text-[#3b82f6] shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-sm font-medium mb-1">In-House Teams</h3>
                                    <p className="text-xs text-gray-500">Strategy, ops, and architecture teams.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Sparkles className="w-6 h-6 text-[#3b82f6] shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-sm font-medium mb-1">Founders</h3>
                                    <p className="text-xs text-gray-500">Design foundational systems before scale.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <Footer />
        </div>
    )
}
