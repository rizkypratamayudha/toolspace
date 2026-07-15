"use client";

import { Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#62CDFF] to-[#D6A2FF] text-white shadow-[0_8px_20px_rgba(98,205,255,0.4),inset_0_-4px_8px_rgba(50,150,200,0.3),inset_0_4px_8px_rgba(255,255,255,0.4)]">
            <Zap className="h-6 w-6" />
          </div>
          <span className="text-2xl font-extrabold text-gradient">ToolSpace</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <Link href="/tools" className="clay-sm px-5 py-2.5 text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF] hover:scale-105 transition-transform">
            All Tools
          </Link>
          <Link href="/tools#pdf" className="clay-sm px-5 py-2.5 text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF] hover:scale-105 transition-transform">
            PDF
          </Link>
          <Link href="/tools#image" className="clay-sm px-5 py-2.5 text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF] hover:scale-105 transition-transform">
            Image
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="clay-sm flex h-10 w-10 items-center justify-center text-[#2D3557] dark:text-[#F0F4FF]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/tools" className="clay-sm block px-5 py-3 text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF]" onClick={() => setMobileOpen(false)}>
            All Tools
          </Link>
          <Link href="/tools#pdf" className="clay-sm block px-5 py-3 text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF]" onClick={() => setMobileOpen(false)}>
            PDF Tools
          </Link>
          <Link href="/tools#image" className="clay-sm block px-5 py-3 text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF]" onClick={() => setMobileOpen(false)}>
            Image Tools
          </Link>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="clay-sm flex flex-col items-center justify-between gap-6 p-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#62CDFF] to-[#D6A2FF] text-white shadow-[0_6px_16px_rgba(98,205,255,0.35),inset_0_-3px_6px_rgba(50,150,200,0.3),inset_0_3px_6px_rgba(255,255,255,0.4)]">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold text-gradient">ToolSpace</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#62CDFF] dark:hover:text-[#62CDFF] transition-colors">
              Privacy Policy
            </Link>
            <p className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">
              © {new Date().getFullYear()} ToolSpace. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
