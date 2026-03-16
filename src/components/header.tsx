"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, FileText, Terminal } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const headerClasses = isMenuOpen
    ? "bg-[#050505] py-6 border-b border-white/10"
    : isScrolled
      ? "bg-[#050505]/95 backdrop-blur-md py-4 border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      : "bg-transparent py-6 border-b border-transparent";

  return (
    <>
      <header className={`print:hidden fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${headerClasses}`}>
        <div className="relative z-50 container mx-auto px-4 md:px-8 max-w-[1400px] flex items-center justify-between">


          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <span className="text-md font-black text-white block uppercase tracking-tighter">
                <span className="text-red-500">C</span>oma<span className="text-red-500">c</span>ks
              </span>
            </Link>


            <nav className="hidden xl:flex items-center gap-6 text-[10px] font-bold tracking-widest uppercase text-zinc-500">
              <NavLink href="/" label="Home" />
              <NavLink href="/diagnosis" label="Clinic Diagnosis" />

              <NavLink href="/systems" label="Systems" />

              <NavLink href="/case-studies" label="Case Studies" />
              <NavLink href="/research" label="Research" />
              <NavLink href="/about" label="About" />
              <NavLink href="/contact" label="Contact" />
            </nav>
          </div>

          <div className="flex items-center gap-3 md:gap-6 shrink-0">

            {/* Secondary CTA: Desktop Only */}
            <Link
              href="/report"
              className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              Sample Report
            </Link>

            {/* Primary CTA: Always Visible (Scales down on mobile) */}
            <Link
              href="/diagnosis"
              className="group relative px-4 md:px-6 py-2 md:py-2.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all duration-300 text-[9px] md:text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm shadow-[0_0_15px_rgba(239,68,68,0.15)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center gap-2 overflow-hidden"
            >
              {/* Icon - Pulses slightly on hover to simulate system activity */}
              <Terminal className="w-3 h-3 hidden md:block relative z-10 group-hover:animate-pulse" />

              {/* Text Layer */}
              <span className="relative z-10">Run Diagnosis</span>

              {/* Animated Hover Shimmer (Data Sweep) */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12 z-0 pointer-events-none"></div>
            </Link>

            {/* MOBILE TOGGLE BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden text-zinc-400 hover:text-white transition-colors p-2 active:scale-95 transform -mr-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE/TABLET MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 bg-[#050505] z-[90] xl:hidden transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-6 md:p-12 pt-32 pb-12 overflow-y-auto relative">

          {/* Background Glow */}
          <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-red-900/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

          <div className="flex flex-col gap-6 relative z-10">
            <MobileLink href="/" label="Home" delay="100ms" onClick={() => setIsMenuOpen(false)} />
            <MobileLink href="/diagnosis" label="Clinic Diagnosis" delay="150ms" onClick={() => setIsMenuOpen(false)} />

            <MobileLink href="/systems" label="Systems" delay="250ms" onClick={() => setIsMenuOpen(false)} />

            <MobileLink href="/case-studies" label="Case Studies" delay="350ms" onClick={() => setIsMenuOpen(false)} />
            <MobileLink href="/research" label="Research" delay="400ms" onClick={() => setIsMenuOpen(false)} />
            <MobileLink href="/about" label="About" delay="450ms" onClick={() => setIsMenuOpen(false)} />
          </div>

          <div className="mt-auto pt-10 border-t border-white/10 relative z-10 space-y-4">

            <Link
              href="/report"
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-200"
            >
              <FileText className="w-4 h-4" />
              View Sample Report
            </Link>

            <Link
              href="/diagnosis"
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-4 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <Terminal className="w-4 h-4" />
              Run Clinic Diagnosis
            </Link>

            <div className="flex items-center justify-center gap-2 mt-8 text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
              Comacks OS: Online
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`transition-colors duration-300 relative group py-2 ${isActive ? "text-white" : "hover:text-zinc-200"}`}
    >
      {label}
      {/* Brutalist Red Underline */}
      <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-red-500 transform scale-x-0 transition-transform duration-300 ${isActive ? "scale-x-100" : "group-hover:scale-x-100 origin-left"}`}></span>
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
      className={`text-xl md:text-2xl font-medium tracking-tight border-b border-white/5 pb-4 transition-all duration-300 flex items-center justify-between group ${isActive ? "text-white border-red-500/30" : "text-zinc-500 hover:text-white"}`}
    >
      <span className={`transition-transform duration-300 ${isActive ? "translate-x-2" : "group-hover:translate-x-2"}`}>
        {label}
      </span>
      <ArrowRight className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-red-500 opacity-100" : "text-zinc-700 opacity-0 group-hover:opacity-100"}`} />
    </Link>
  );
}