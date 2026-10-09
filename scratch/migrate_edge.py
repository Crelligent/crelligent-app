import re
import os

# 1. Read edge/page.tsx
edge_path = "src/app/edge/page.tsx"
with open(edge_path, "r", encoding="utf-8") as f:
    edge_content = f.read()

# 2. Read intelligent-systems/page.tsx
is_path = "src/app/intelligent-systems/page.tsx"
with open(is_path, "r", encoding="utf-8") as f:
    is_content = f.read()

# Extract the verticals array and the rendering block for verticals
# Verticals array
verticals_match = re.search(r'(const verticals:.*?\])', is_content, re.DOTALL)
verticals_array = verticals_match.group(1)

# Update slugs in verticals_array
slug_map = {
    'its': 'transport',
    'ies': 'energy',
    'ils': 'logistics',
    'iis': 'industrial',
    'ibs': 'buildings',
    'ifis': 'finance',
    'irs': 'retail',
    'ihs': 'healthcare',
    'iss': 'security',
    'ias': 'agriculture'
}
for old, new in slug_map.items():
    verticals_array = re.sub(rf"slug:\s*'{old}'", f"slug: '{new}'", verticals_array)

# Add imports for icons
icons = ["Truck", "Zap", "Warehouse", "Factory", "Building2", "LineChart", "Store", "Stethoscope", "ShieldAlert", "Leaf"]
edge_content = edge_content.replace("import { ArrowRight, Cpu, Radio, Zap, Shield, Microchip, Wifi } from 'lucide-react'", "import { ArrowRight, Cpu, Radio, Zap, Shield, Microchip, Wifi, Truck, Warehouse, Factory, Building2, LineChart, Store, Stethoscope, ShieldAlert, Leaf } from 'lucide-react'")

# Extract the StatusType stuff
status_type = """
type StatusType = 'ACTIVE' | '2025-2026' | 'ROADMAP'

const statusStyles: Record<StatusType, string> = {
  ACTIVE: 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]',
  '2025-2026': 'bg-[#f59e0b]/10 border-[#f59e0b]/30 text-[#f59e0b]',
  ROADMAP: 'bg-white/5 border-white/10 text-gray-400',
}
"""

# Extract the rendering block
render_block = """
        {/* Industry Solutions Grid */}
        <section className="px-6 mb-32 max-w-7xl mx-auto">
            <h2 className="text-3xl font-[300] tracking-tight text-center mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Edge Industry Solutions
            </h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                10 domain-specific intelligence systems built on top of the Crelligent Edge Module (CEM).
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verticals.map((v) => (
                <div
                  key={v.slug}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col relative group hover:border-white/20 transition-colors"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                      {v.icon}
                    </div>
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full border ${statusStyles[v.status]}`}
                    >
                      {v.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{v.name}</h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-grow">
                    {v.desc}
                  </p>

                  <Link
                    href={`/edge/${v.slug}`}
                    className="inline-flex items-center justify-center w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors gap-2 group-hover:bg-[#f59e0b] group-hover:text-black mt-auto"
                  >
                    View Architecture
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
        </section>
"""

# Insert array and types before the component
edge_content = edge_content.replace("export default function CrelligentEdgePage() {", status_type + "\n" + verticals_array + "\n\nexport default function CrelligentEdgePage() {")

# Insert render block before ESRE OS Context
edge_content = edge_content.replace("{/* ESRE OS Context */}", render_block + "\n        {/* ESRE OS Context */}")

with open(edge_path, "w", encoding="utf-8") as f:
    f.write(edge_content)
