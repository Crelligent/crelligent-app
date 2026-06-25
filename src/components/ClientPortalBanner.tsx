import React from 'react'
import Link from 'next/link'

export function ClientPortalBanner() {
  return (
    <div className="w-full bg-[#050505] flex justify-center py-10 px-6">
      <div className="max-w-5xl w-full relative group">
        
        {/* The Pill itself */}
        <div className="relative flex flex-col sm:flex-row items-center justify-between bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-full px-12 py-6 overflow-hidden">
          
          {/* Subtle background icon for texture (Crelligent Logo) */}
          <img src="/logo.png" alt="" className="absolute -right-8 -bottom-12 w-48 h-48 opacity-[0.15] -rotate-12 pointer-events-none object-contain" />
          
          {/* Text Content */}
          <div className="relative z-10 flex-1 text-center sm:text-left mb-4 sm:mb-0">
            <p className="text-base md:text-lg font-light text-white/90">
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
