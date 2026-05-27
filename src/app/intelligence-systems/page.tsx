import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, Cpu, Radio, Zap, Shield, Cloud, CheckCircle, Brain, Battery, Lock, GitBranch, BarChart3, RefreshCw } from 'lucide-react'

export const metadata = {
    title: 'Crelligent Intelligence Systems | IoT & Embedded Systems',
    description: 'From silicon to insight—IoT, firmware, edge computing, and cloud analytics as one complete system.',
}

const stack = [
    {
        layer: 'Device',
        icon: Cpu,
        title: 'Hardware & Firmware',
        description: 'Sensors, microcontrollers, firmware development, and edge processing.',
    },
    {
        layer: 'Connect',
        icon: Radio,
        title: 'Connectivity & Edge',
        description: '5G, LPWAN, satellite, MQTT/CoAP protocols, and edge compute.',
    },
    {
        layer: 'Cloud',
        icon: Cloud,
        title: 'Cloud Integration',
        description: 'Data ingestion, storage, pipelines, and API connectivity.',
    },
    {
        layer: 'Insight',
        icon: BarChart3,
        title: 'Analytics & Reporting',
        description: 'Dashboards, ML/AI, anomaly detection, and decision intelligence.',
    },
]

const capabilities = [
    {
        icon: Brain,
        title: 'Edge AI / TinyML',
        description: 'On-device intelligence with real-time inference—without cloud dependency.',
    },
    {
        icon: Cpu,
        title: 'RISC-V & Custom SoCs',
        description: 'Open architecture for cost control, flexibility, and hardware sovereignty.',
    },
    {
        icon: Battery,
        title: 'Battery-Free Platforms',
        description: 'Energy harvesting systems. Devices that never need charging.',
    },
    {
        icon: Lock,
        title: 'Security-by-Design',
        description: 'Hardware-level zero-trust and post-quantum cryptography.',
    },
    {
        icon: GitBranch,
        title: 'Software-Defined Hardware',
        description: 'Firmware that orchestrates workloads across heterogeneous SoCs.',
    },
    {
        icon: RefreshCw,
        title: 'Fleet Management & OTA',
        description: 'Over-the-air updates, telemetry, and predictive maintenance at scale.',
    },
]

const systemsApproach = [
    {
        phase: 'Define',
        color: '#3b82f6',
        title: 'System Intent',
        description: 'What problem does this device solve? We define purpose, boundaries, and failure modes before firmware.',
    },
    {
        phase: 'Build',
        color: '#8b5cf6',
        title: 'Integrated Engineering',
        description: 'Hardware, firmware, connectivity, and cloud as one system—not isolated layers.',
    },
    {
        phase: 'Sustain',
        color: '#22c55e',
        title: 'Operational Intelligence',
        description: 'OTA updates, telemetry, predictive maintenance. Your device fleet as a living system.',
    },
]

const useCases = [
    'Industrial IoT — Predictive maintenance, asset tracking',
    'Healthcare — Remote patient monitoring, wearables',
    'Smart Buildings — Energy management, occupancy sensing',
    'Agriculture — Soil/climate monitoring, automated irrigation',
    'Logistics — Fleet tracking, cold chain monitoring',
]

export default function EdgePage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-full mb-8">
                        <Cpu className="w-4 h-4 text-[#3b82f6]" />
                        <span className="text-sm text-[#3b82f6]">Silicon to Insight</span>
                    </div>

                    <h1 className="heading-xl mb-6">
                        Crelligent Intelligence Systems
                    </h1>

                    <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-8">
                        We engineer the complete connected system—from device to cloud to dashboard.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="btn-primary">
                            Discuss Your Project
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Full Stack */}
            <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4">End-to-End</div>
                        <h2 className="heading-lg">The Complete IoT Stack</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            Most vendors do one layer. We deliver the whole system.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                        {stack.map((item, index) => (
                            <div key={item.layer} className="relative">
                                <div className="glass-card rounded-lg text-center">
                                    <div className="text-xs uppercase tracking-widest text-[#3b82f6] mb-3">{item.layer}</div>
                                    <item.icon className="w-8 h-8 text-[#3b82f6] mx-auto mb-3" />
                                    <h3 className="text-sm font-light mb-2">{item.title}</h3>
                                    <p className="text-xs text-gray-500">{item.description}</p>
                                </div>
                                {index < stack.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-600">→</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Systems Approach */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4">Our Approach</div>
                        <h2 className="heading-lg">Systems Thinking for IoT</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {systemsApproach.map((item) => (
                            <div key={item.phase} className="glass-card rounded-lg">
                                <div
                                    className="text-xs uppercase tracking-widest mb-4"
                                    style={{ color: item.color }}
                                >
                                    {item.phase}
                                </div>
                                <h3 className="text-lg font-light mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Capabilities */}
            <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4">Capabilities</div>
                        <h2 className="heading-lg">Cutting-Edge Technologies</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {capabilities.map((item) => (
                            <div key={item.title} className="glass-card rounded-lg">
                                <item.icon className="w-6 h-6 text-[#3b82f6] mb-4" />
                                <h3 className="text-lg font-light mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="section-label mb-4">Applications</div>
                        <h2 className="heading-lg">Where We Deploy</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {useCases.map((useCase) => (
                            <div
                                key={useCase}
                                className="flex items-center gap-3 p-5 border border-white/5 rounded-lg"
                            >
                                <CheckCircle className="w-5 h-5 text-[#3b82f6] shrink-0" />
                                <span className="text-gray-300">{useCase}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center bg-gradient-to-t from-[#3b82f6]/5 to-transparent">
                <div className="max-w-2xl mx-auto">
                    <h2 className="heading-lg mb-6">
                        Ready to build something connected?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Let&apos;s engineer your IoT system—from silicon to insight.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Start the Conversation
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
