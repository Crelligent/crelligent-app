import React from 'react'
import Link from 'next/link'
import { Lock } from 'lucide-react'

export function ClientPortalBanner() {
  return (
    <div className="w-full bg-[#050505] flex justify-center py-6 px-4">
      <div className="max-w-4xl w-full relative group">
        {/* Subtle glow effect behind the pill */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7B61FF] via-[#5B8DEF] to-[#38BDF8] opacity-20 blur-xl rounded-full group-hover:opacity-30 transition-opacity duration-500" />
        
        {/* The Pill itself */}
        <div className="relative flex flex-col sm:flex-row items-center justify-between bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-full px-8 py-4 overflow-hidden">
          
          {/* Subtle background icon for texture (similar to the lock in the plaid example) */}
          <Lock className="absolute -right-4 -bottom-8 w-32 h-32 text-white/[0.02] -rotate-12 pointer-events-none" />
          
          {/* Text Content */}
          <div className="relative z-10 flex-1 text-center sm:text-left mb-4 sm:mb-0">
            <p className="text-sm md:text-base font-light text-white/90">
              Active engagement or managed service? You are in control of your intelligence data.
            </p>
          </div>
          
          {/* CTA Link */}
          <div className="relative z-10">
            <Link 
              href="http://localhost:3003" 
              className="inline-flex items-center text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#38BDF8] hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              Manage your deployments with Client Portal »
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
