'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'For Traders', href: '#traders' },
  { name: 'For Partners', href: '#partners' },
  { name: 'The Data', href: '#data' },
  { name: 'Contact', href: '#contact' }
];

export function CoreNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Simple scroll spy logic
      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${scrolled ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Crelligent Core Logo */}
        <Link href="/core" className="flex items-center gap-2 group z-50">
          <Image
            src="/logo.png"
            alt="Crelligent Core"
            width={36}
            height={36}
            className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-sm"
          />
          <div className="flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <span className="text-white text-xl font-[300] tracking-tight leading-none">
              Crelligent
            </span>
            <span className="text-[#3b82f6] text-[10px] font-bold tracking-widest uppercase mt-0.5">
              Core
            </span>
          </div>
        </Link>

        {/* Center/Right: Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-[15px] font-[300] transition-colors relative group ${
                activeSection === link.href.substring(1) ? 'text-[#3b82f6]' : 'text-gray-300 hover:text-white'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#3b82f6] transition-all duration-300 ${
                activeSection === link.href.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>

        {/* Right: Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <Link href="#contact" className="px-5 py-2.5 rounded-full border border-white/10 text-white text-[15px] font-[300] tracking-wide hover:bg-white/10 transition-all">
            Partner With Us
          </Link>
          <Link href="#traders" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white text-[15px] font-[300] tracking-wide hover:opacity-90 transition-opacity shadow-sm">
            Get the Vitals Bot
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-white z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#050505] border-b border-white/10 shadow-xl py-6 px-6 flex flex-col gap-6">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white text-lg font-[300]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <Link 
              href="#contact" 
              className="w-full text-center px-5 py-3 rounded-full border border-white/10 text-white font-[300]"
              onClick={() => setMobileOpen(false)}
            >
              Partner With Us
            </Link>
            <Link 
              href="#traders" 
              className="w-full text-center px-5 py-3 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white font-[300]"
              onClick={() => setMobileOpen(false)}
            >
              Get the Vitals Bot
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
