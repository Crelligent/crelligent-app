import Link from 'next/link'
import Image from 'next/image'
import { Twitter, Linkedin, Github } from 'lucide-react'

export function CoreFooter() {
  return (
    <footer className="bg-[#050505] text-white pt-20 pb-8 border-t border-white/10 font-sans" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Desc */}
          <div className="space-y-6">
            <Link href="/core" className="flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="Crelligent Core"
                width={36}
                height={36}
                className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="flex flex-col">
                <span className="text-white text-xl font-[300] tracking-tight leading-none">
                  Crelligent
                </span>
                <span className="text-[#3b82f6] text-[10px] font-bold tracking-widest uppercase mt-0.5">
                  Core
                </span>
              </div>
            </Link>
            <div>
              <p className="text-gray-300 text-sm font-[300] leading-relaxed mb-2">
                Survival intelligence for the grassroots economy.
              </p>
              <p className="text-gray-500 text-xs font-[200] leading-relaxed">
                A business unit of Crelligent Limited, <br/> a Chavion Holdings company.
              </p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-white font-[400] tracking-wide mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-[200]">
              <li><Link href="#how-it-works" className="hover:text-[#3b82f6] transition-colors">How It Works</Link></li>
              <li><Link href="#traders" className="hover:text-[#3b82f6] transition-colors">For Traders</Link></li>
              <li><Link href="#partners" className="hover:text-[#3b82f6] transition-colors">For Institutions</Link></li>
              <li><Link href="#data" className="hover:text-[#3b82f6] transition-colors">The Data Layer</Link></li>
              <li><Link href="#agent-programme" className="hover:text-[#3b82f6] transition-colors">Field Agent Programme</Link></li>
              <li><Link href="#careers" className="hover:text-[#3b82f6] transition-colors">Careers at Core</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-white font-[400] tracking-wide mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-[200]">
              <li><a href="mailto:core@crelligent.com" className="hover:text-[#3b82f6] transition-colors">core@crelligent.com</a></li>
              <li><Link href="/core" className="hover:text-[#3b82f6] transition-colors">www.crelligent.com/core</Link></li>
              <li className="pt-2">Lagos, Nigeria</li>
            </ul>
          </div>

          {/* Column 4: Legal & Trust */}
          <div>
            <h4 className="text-white font-[400] tracking-wide mb-6">Legal & Trust</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-[200]">
              <li><Link href="#privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#data-governance" className="hover:text-white transition-colors">Data Governance</Link></li>
              <li><Link href="#ndpr" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2">NDPR Compliance <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span></Link></li>
              <li><Link href="#charter" className="hover:text-white transition-colors">Trader Data Charter</Link></li>
              <li><Link href="#terms" className="hover:text-white transition-colors">Terms of Partnership</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-[200]">
          <p>© 2026 Crelligent Core · A business unit of Crelligent Limited · All rights reserved</p>
          <p className="text-center lg:text-right">
            Crelligent Core is committed to the ethical collection, anonymisation, and use of informal sector economic data.
          </p>
        </div>

      </div>
    </footer>
  )
}
