"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle Scroll State
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Determine Header Classes based on state
  // FIX: We ensure padding (py-*) is ALWAYS present to prevent "shifting" or jumping.
  const headerClasses = isMenuOpen
    ? "bg-[#050505] py-6 border-b border-white/10" // Solid Black + Fixed Padding when Open
    : isScrolled
      ? "bg-[#050505]/90 backdrop-blur-md py-4 border-b border-white/5" // Compact + Blur when Scrolled
      : "bg-transparent py-6 border-b border-transparent"; // Transparent + Spacious at Top

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${headerClasses}`}
      >
        {/* CONTAINER: Relative z-50 ensures Logo/Button stays ABOVE the menu overlay */}
        <div className="relative z-50 container mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* --- LOGO AREA --- */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              {/* Decorative vertical line */}


              <span className="text-sm font-bold tracking-[0.2em] uppercase text-white block">
                <span className="text-red-500">C</span>oma<span className="text-red-500">c</span>ks
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-3 text-[11px] font-bold tracking-widest uppercase text-zinc-500">
              <NavLink href="/" label="Home" />
              <span className="text-zinc-800">,</span>
              <NavLink href="/#how-it-works" label="How It Works" />
              <span className="text-zinc-800">,</span>
              <NavLink href="/#diagnostics" label="Diagnostics" />
              <span className="text-zinc-800">,</span>
              <NavLink href="/#components" label="Components" />
              <span className="text-zinc-800">,</span>
              <NavLink href="/#case-studies" label="Case Studies" />
              <span className="text-zinc-800">,</span>
              <NavLink href="/about" label="About" />

            </nav>
          </div>

          {/* --- RIGHT CONTROLS --- */}
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="hidden md:block px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white text-white hover:text-black transition-all duration-300 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm"
            >
              Request Diagnosis
            </Link>

            {/* MOBILE TOGGLE BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-zinc-400 hover:text-white transition-colors p-2 active:scale-95 transform"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>


      <div
        className={`fixed inset-0 bg-[#050505] z-[90] md:hidden transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full p-8 pt-32 pb-12 overflow-y-auto">

          <div className="flex flex-col gap-8">
            <MobileLink href="/" label="Home" delay="100ms" onClick={() => setIsMenuOpen(false)} />
            <MobileLink href="/#how-it-works" label="How It Works" delay="150ms" onClick={() => setIsMenuOpen(false)} />
            <MobileLink href="/#diagnostics" label="Diagnostics" delay="200ms" onClick={() => setIsMenuOpen(false)} />
            <MobileLink href="/#components" label="Components" delay="250ms" onClick={() => setIsMenuOpen(false)} />
            <MobileLink href="/#case-studies" label="Case Studies" delay="275ms" onClick={() => setIsMenuOpen(false)} />
            <MobileLink href="/about" label="About" delay="300ms" onClick={() => setIsMenuOpen(false)} />
            <MobileLink href="/contact" label="Contact" delay="325ms" onClick={() => setIsMenuOpen(false)} />
          </div>

          <div className="mt-auto pt-10 border-t border-white/10">
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Request Diagnosis
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 mt-8 text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              System Status: Online
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// --- HELPER COMPONENTS ---

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`transition-colors duration-300 relative group ${isActive ? "text-white" : "hover:text-white"
        }`}
    >
      {label}
      <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-red-500 transform scale-x-0 transition-transform duration-300 ${isActive ? "scale-x-100" : "group-hover:scale-x-100"}`}></span>
    </Link>
  );
}

function MobileLink({
  href,
  label,
  onClick,
  delay
}: {
  href: string;
  label: string;
  onClick: () => void;
  delay: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      style={{ animationDelay: delay }}
      className={`text-2xl font-medium tracking-tight border-b border-white/5 pb-4 transition-colors ${isActive ? "text-white border-red-500/50 pl-2" : "text-zinc-500 hover:text-white hover:pl-2"
        }`}
    >
      {label}
    </Link>
  );
}