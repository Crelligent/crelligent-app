import Link from 'next/link'

const stories = [
    {
        id: 1,
        category: "Future-shaping projects",
        title: "Diagnosing rare childhood diseases",
        description: "How AI and cloud technology could help speed up medical diagnoses",
        size: "large", // mapped to the large left column
        image: "/diagnosing-childhood-diseases.png",
    },
    {
        id: 2,
        category: "Environment",
        title: "Journey to sustainability",
        description: "A joined-up approach to reducing businesses' carbon footprints",
        size: "small", // mapped to top right
        image: "/industry-innovation.jpg", // placeholder
    },
    {
        id: 3,
        category: "Environment",
        title: "Sail into the future",
        description: "Reducing the carbon footprint of maritime transport",
        size: "small", // mapped to bottom right
        image: "/Reduced Inequalities.jpg", // placeholder
    }
]

export function InsideStories() {
    return (
        <section className="py-24 px-6 relative overflow-hidden bg-[#0a0a0a]" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="mb-12 flex items-center justify-between">
                    <h2 className="heading-lg">Inside Stories</h2>
                </div>

                {/* Asymmetric Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Large Left Column (Span 8) */}
                    <div className="lg:col-span-8 flex flex-col group cursor-pointer relative rounded-xl p-[1px] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] opacity-30 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

                        <div className="bg-[#050505] w-full h-full relative z-10 rounded-xl overflow-hidden p-6 flex flex-col">
                            <div className="relative w-full aspect-[16/10] overflow-hidden mb-6 rounded-lg bg-[#111]">
                                <img src={stories[0].image} alt={stories[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
                            </div>

                            <div className="text-[11px] uppercase tracking-[0.2em] text-[#8b5cf6] mb-4 flex items-center gap-3 font-semibold mt-auto">
                                <div className="w-4 h-[1px] bg-[#8b5cf6]" />
                                {stories[0].category}
                            </div>

                            <h3 className="text-2xl md:text-3xl font-[300] tracking-wide text-white leading-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors duration-300">
                                {stories[0].title}
                            </h3>

                            <p className="text-sm text-gray-400 font-[200]">
                                {stories[0].description}
                            </p>
                        </div>
                    </div>

                    {/* Small Right Column (Span 4) containing 2 stacked stories */}
                    <div className="lg:col-span-4 flex flex-col gap-8">

                        {/* Stack 1 */}
                        <div className="flex flex-col group cursor-pointer relative rounded-xl p-[1px] overflow-hidden h-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#22c55e] to-[#3b82f6] opacity-30 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

                            <div className="bg-[#050505] w-full h-full relative z-10 rounded-xl overflow-hidden p-6 flex flex-col">
                                <div className="relative w-full aspect-[16/9] overflow-hidden mb-6 rounded-lg bg-[#111]">
                                    <img src={stories[1].image} alt={stories[1].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
                                </div>

                                <div className="text-[11px] uppercase tracking-[0.2em] text-[#22c55e] mb-4 flex items-center gap-3 font-semibold mt-auto">
                                    <div className="w-4 h-[1px] bg-[#22c55e]" />
                                    {stories[1].category}
                                </div>

                                <h3 className="text-xl md:text-2xl font-[300] tracking-wide text-white leading-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors duration-300">
                                    {stories[1].title}
                                </h3>

                                <p className="text-sm text-gray-400 font-[200]">
                                    {stories[1].description}
                                </p>
                            </div>
                        </div>

                        {/* Stack 2 */}
                        <div className="flex flex-col group cursor-pointer relative rounded-xl p-[1px] overflow-hidden h-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] opacity-30 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

                            <div className="bg-[#050505] w-full h-full relative z-10 rounded-xl overflow-hidden p-6 flex flex-col">
                                <div className="relative w-full aspect-[16/9] overflow-hidden mb-6 rounded-lg bg-[#111]">
                                    <img src={stories[2].image} alt={stories[2].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
                                </div>

                                <div className="text-[11px] uppercase tracking-[0.2em] text-[#3b82f6] mb-4 flex items-center gap-3 font-semibold mt-auto">
                                    <div className="w-4 h-[1px] bg-[#3b82f6]" />
                                    {stories[2].category}
                                </div>

                                <h3 className="text-xl md:text-2xl font-[300] tracking-wide text-white leading-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors duration-300">
                                    {stories[2].title}
                                </h3>

                                <p className="text-sm text-gray-400 font-[200]">
                                    {stories[2].description}
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    )
}
