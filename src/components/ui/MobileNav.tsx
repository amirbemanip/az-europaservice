"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

interface City { id: string | number; name: string; slug: string; }

export function MobileNav({ cities }: { cities: City[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-sm border border-[#e0e3e5] text-[#45464d] hover:bg-[#f2f4f6] transition-colors"
        aria-label="Menü öffnen"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-[#0a0a0a]/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-[#e0e3e5]">
          <span className="font-black text-sm tracking-tighter text-[#0a0a0a] uppercase">AZ-Europa Service</span>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-sm border border-[#e0e3e5] text-[#45464d] hover:bg-[#f2f4f6] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col px-6 py-8 gap-1 flex-grow">
          <Link href="/" onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold text-[#0a0a0a] bg-[#f2f4f6] rounded-sm">
            Home
          </Link>
          <div className="px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase text-[#76777d] mt-4">Standorte</div>
          {cities.map(c => (
            <Link key={c.id} href={`/${c.slug}`} onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-medium text-[#45464d] hover:bg-[#f2f4f6] hover:text-[#0a0a0a] rounded-sm transition-colors">
              {c.name}
            </Link>
          ))}
          <Link href="/ueber-uns" onClick={() => setOpen(false)} className="px-4 py-3 mt-1 text-sm font-medium text-[#45464d] hover:bg-[#f2f4f6] hover:text-[#0a0a0a] rounded-sm transition-colors">
            Über uns
          </Link>
          <Link href="/kontakt" onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-medium text-[#45464d] hover:bg-[#f2f4f6] hover:text-[#0a0a0a] rounded-sm transition-colors">
            Kontakt
          </Link>
        </nav>

        {/* Sticky Bottom CTAs */}
        <div className="px-6 pb-8 flex flex-col gap-3 border-t border-[#e0e3e5] pt-6">
          <a
            href="tel:+4991316146235"
            className="flex items-center justify-center gap-2 w-full py-3.5 border border-[#0a0a0a] text-[#0a0a0a] text-xs font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-[#f2f4f6] transition-colors"
          >
            <Phone className="w-4 h-4" />
            09131 6146235
          </a>
          <Link
            href="/kontakt"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-full py-3.5 bg-[#fed01b] text-[#0a0a0a] text-xs font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-[#eec200] transition-colors"
          >
            Angebot anfordern
          </Link>
        </div>
      </div>
    </>
  );
}

