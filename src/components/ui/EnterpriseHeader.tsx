"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, Clock, MapPin, ChevronDown, ArrowRight,
  Menu, X, Sparkles, Wrench, Leaf, Trash2, Paintbrush,
  ShieldCheck, Award, CheckCircle, Globe
} from 'lucide-react';
import { CityData, MacroService, MicroService } from '@/types';

const serviceIcons: Record<string, React.ElementType> = {
  reinigung: Sparkles,
  hausmeisterservice: Wrench,
  renovierungen: Paintbrush,
  abbrucharbeiten: Trash2,
  gartenpflege: Leaf,
  entruempelungen: Trash2,
};

interface HeaderProps {
  cities: CityData[];
  macroServices: MacroService[];
  microServices: MicroService[];
  dict: any;
  locale: string;
}

export function EnterpriseHeader({ cities, macroServices, microServices, dict, locale }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [hoveredMacroSlug, setHoveredMacroSlug] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const searchString = searchParams?.toString();

  const languageOptions = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
    { code: 'ar', label: 'العربية', flag: 'AR' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  ];

  const currentLanguage = languageOptions.find((lang) => lang.code === locale) ?? languageOptions[0];
  const isRTL = locale === 'fa' || locale === 'ar';

  const getLocalizedHref = useCallback(
    (path: string) => {
      const localizedPath = path === '/' ? '' : path;
      const href = `/${locale}${localizedPath}`;
      return searchString ? `${href}?${searchString}` : href;
    },
    [locale, searchString]
  );

  const getLanguageHref = useCallback(
    (lang: string) => {
      const strippedPath = pathname.startsWith(`/${locale}/`)
        ? pathname.slice(locale.length + 1)
        : pathname === `/${locale}`
          ? '/'
          : pathname;

      const normalizedPath = strippedPath === '' ? '/' : strippedPath;
      const pathWithoutLocale = `/${lang}${normalizedPath === '/' ? '' : normalizedPath}`;
      return searchString ? `${pathWithoutLocale}?${searchString}` : pathWithoutLocale;
    },
    [locale, pathname, searchString]
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    };
    if (languageOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [languageOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setLanguageOpen(false);
    setActiveMega(null);
  }, [pathname, searchString]);

  const closeMega = useCallback(() => {
    setActiveMega(null);
    setHoveredMacroSlug(null);
  }, []);

  const macroImageMap: Record<string, string> = {
    'reinigung': '/Reinigung aller Art.png',
    'hausmeisterservice': '/Hausmeisterservice.png',
    'renovierungen': '/Renovierungen.png',
    'abbrucharbeiten': '/Abbrucharbeiten.png',
    'gartenpflege': '/Gartenpflege.png',
    'entruempelungen': '/Entrümpelung.png',
  };

  return (
    <>
      {/* ═══════════════ TOP UTILITY BAR (DARK) ═══════════════ */}
      <div className={`fixed top-0 w-full z-[52] transition-all duration-500 ${scrolled ? 'h-0 opacity-0 pointer-events-none' : 'h-10 opacity-100'}`}>
        <div className="h-full bg-[#050505] flex items-center border-b border-white/5">
          <div className="max-w-screen-xl mx-auto w-full px-6 lg:px-16 flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-6">
              <a href="tel:+4991316146235" className="flex items-center gap-2 text-[#a1a1aa] hover:text-[#fed01b] text-[11px] font-bold uppercase tracking-widest transition-colors">
                <Phone className="w-3 h-3 text-[#fed01b]" />
                09131 6146235
              </a>
              <span className="w-px h-3 bg-white/10" />
              <a href="mailto:info@az-europaservice.de" className="flex items-center gap-2 text-[#a1a1aa] hover:text-[#fed01b] text-[11px] font-bold uppercase tracking-widest transition-colors">
                <Mail className="w-3 h-3 text-[#fed01b]" />
                info@az-europaservice.de
              </a>
            </div>
            <div className={`flex items-center gap-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-1.5 text-[#a1a1aa] text-[11px] font-bold uppercase tracking-widest ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-3 h-3 text-[#fed01b]" />
                <span>{dict.header.opening_hours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ MAIN HEADER (LIQUID GLASS / CINEMATIC DARK) ═══════════════ */}
      <header
        className={`fixed w-full z-[51] transition-all duration-500 ${scrolled
            ? 'top-0 bg-[rgba(255,255,255,0.7)] backdrop-blur-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-[#fed01b]'
            : 'top-10 bg-[#050505]/75 backdrop-blur-xl border-b border-white/5'
          }`}
        onMouseLeave={closeMega}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent pointer-events-none" />

        <div className="max-w-screen-xl mx-auto w-full px-6 lg:px-16 relative z-10">
          <div className="flex items-center justify-between h-[72px] gap-2 lg:gap-8">
            {/* ── LOGO (YELLOW) ── */}
            <div className="flex-1 min-w-0 relative h-[72px]">
              <Link href={getLocalizedHref('/')} className="absolute inset-y-0 left-0 flex items-center group z-[60] w-[200px]" onClick={closeMega}>
                <div className="relative h-[80px] w-[280px] lg:h-[104px] lg:w-[736px] transition-transform duration-300 group-hover:scale-105 mt-2 -ml-2 lg:mt-3 lg:-ml-4 pointer-events-none">
                  <Image
                    src="/logo_new2.png"
                    alt="AZ-Europa Service GmbH"
                    fill
                    sizes="(max-width: 1024px) 600px, 1000px"
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* ── DESKTOP NAV ── */}
            <nav className={`hidden lg:flex items-center h-full ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Leistungen — Mega Menu Trigger */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMega('services')}
              >
                <button
                  className={`flex items-center gap-1.5 px-6 h-full text-[13px] font-bold tracking-[0.05em] uppercase transition-colors duration-200 ${activeMega === 'services' ? 'text-[#fed01b]' : 'text-white/80 hover:text-white'
                    }`}
                >
                  {dict.nav.services}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMega === 'services' ? 'rotate-180 text-[#fed01b]' : ''}`} />
                </button>
                <div className={`absolute bottom-0 left-6 right-6 h-[2px] bg-[#fed01b] transition-all duration-300 ${activeMega === 'services' ? 'opacity-100' : 'opacity-0'}`} style={{ boxShadow: '0 -2px 10px rgba(254,208,27,0.5)' }} />
              </div>

              {/* Standorte — Mega Menu Trigger */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMega('locations')}
              >
                <button
                  className={`flex items-center gap-1.5 px-6 h-full text-[13px] font-bold tracking-[0.05em] uppercase transition-colors duration-200 ${activeMega === 'locations' ? 'text-[#fed01b]' : 'text-white/80 hover:text-white'
                    }`}
                >
                  {dict.nav.locations}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMega === 'locations' ? 'rotate-180 text-[#fed01b]' : ''}`} />
                </button>
                <div className={`absolute bottom-0 left-6 right-6 h-[2px] bg-[#fed01b] transition-all duration-300 ${activeMega === 'locations' ? 'opacity-100' : 'opacity-0'}`} style={{ boxShadow: '0 -2px 10px rgba(254,208,27,0.5)' }} />
              </div>

              {/* Static Links */}
              {[
                { label: dict.nav.about, href: '/ueber-uns' },
                { label: dict.nav.contact, href: '/kontakt' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={getLocalizedHref(link.href)}
                  onMouseEnter={closeMega}
                  className="relative h-full flex items-center px-6 text-[13px] font-bold tracking-[0.05em] uppercase text-white/80 hover:text-white transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-6 right-6 h-[2px] bg-[#fed01b] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ boxShadow: '0 -2px 10px rgba(254,208,27,0.5)' }} />
                </Link>
              ))}
            </nav>

            {/* ── RIGHT ACTIONS ── */}
            <div className={`flex items-center gap-2 sm:gap-4 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Language Switcher */}
              <div ref={languageMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setLanguageOpen((open) => !open)}
                  className="flex items-center gap-2.5 px-4 py-2 text-[12px] font-bold uppercase border border-white/20 text-white rounded-full hover:bg-white/10 hover:border-[#fed01b]/50 transition-all backdrop-blur-md group/lang"
                  aria-expanded={languageOpen}
                >
                  <Globe className={`w-3.5 h-3.5 transition-colors ${languageOpen ? 'text-[#fed01b]' : 'text-[#fed01b]/70 group-hover/lang:text-[#fed01b]'}`} />
                  <span>{currentLanguage.code}</span>
                </button>
                <div className={`absolute top-full right-0 mt-2 bg-[#121212]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-xl transition-all py-2 min-w-[140px] z-50 overflow-hidden ${languageOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}`} style={{ transformOrigin: 'top right' }}>
                    {languageOptions.map((lang) => (
                      <Link
                        key={lang.code}
                        href={getLanguageHref(lang.code)}
                        className={`flex items-center px-4 py-2.5 text-[11px] font-bold hover:bg-white/5 uppercase transition-colors ${locale === lang.code ? 'text-[#fed01b]' : 'text-white'}`}
                        onClick={() => setLanguageOpen(false)}
                      >
                        <span className="inline-flex items-center justify-center w-7 h-5 mr-3 text-[10px] font-black bg-white/10 rounded-sm shrink-0 uppercase tracking-tighter">
                          {lang.flag}
                        </span>
                        <span className="flex-grow">{lang.label}</span>
                      </Link>
                    ))}
                </div>
              </div>

              {/* CTA — Desktop */}
              <Link
                href={getLocalizedHref('/kontakt')}
                className="hidden lg:flex items-center gap-3 px-8 py-3 bg-[#fed01b] text-[#0a0a0a] text-[13px] font-black tracking-[0.1em] uppercase rounded-full hover:bg-white hover:shadow-[0_0_40px_rgba(254,208,27,0.6)] pulse-glow hover:scale-105 active:scale-95 transition-all duration-300 group shadow-[0_0_20px_rgba(254,208,27,0.2)]"
              >
                {dict.nav.cta}
                <ArrowRight className={`w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors backdrop-blur-md"
                aria-label={dict.header.menu_aria}
              >
                {mobileOpen ? <X className="w-5 h-5 text-[#fed01b]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ═══════════════ BACKDROP DIMMER ═══════════════ */}
        <AnimatePresence>
          {activeMega && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] pointer-events-none"
              onClick={closeMega}
            />
          )}
        </AnimatePresence>

        {/* ═══════════════ DESKTOP MEGA MENUS (LIQUID GLASS) ═══════════════ */}
        <AnimatePresence>
          {activeMega && (
            <motion.div
              initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="absolute top-full left-0 w-full bg-[#2a2a2a]/95 backdrop-blur-3xl border-b border-white/10 shadow-[0_100px_200px_rgba(0,0,0,0.9)] overflow-hidden z-50"
              onMouseLeave={closeMega}
            >
              {/* --- Premium Cinematic Background Layering --- */}
              {/* 1. Grain/Noise Texture */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

              {/* 2. Sophisticated Mesh Gradient */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#fed01b]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#fed01b]/5 rounded-full blur-[120px]" />
              </div>

              {/* 3. Top Accent Line (Gold Glow) */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#fed01b] to-transparent z-10 opacity-50" />

              {/* 4. Subtle grid pattern */}
              <div className="absolute inset-0 opacity-[0.02] z-0" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

              {/* Dynamic Service Background Image */}
              <AnimatePresence>
                {activeMega === 'services' && hoveredMacroSlug && macroImageMap[hoveredMacroSlug] && (
                  <motion.div
                    key={hoveredMacroSlug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-0 pointer-events-none"
                  >
                    <Image
                      src={macroImageMap[hoveredMacroSlug]}
                      alt={hoveredMacroSlug}
                      fill
                      className="object-cover object-center mix-blend-luminosity filter blur-sm"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-8 relative z-10">

                {/* ── SERVICES MEGA ── */}
                {activeMega === 'services' && (
                  <div className={`${isRTL ? 'rtl' : ''}`}>
                    {/* Services Grid */}
                    <div className="w-full">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-8 h-px bg-white/20" />
                        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#fed01b]">{dict.header.our_services}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
                        {macroServices.map(macro => {
                          const Icon = serviceIcons[macro.slug] || Sparkles;
                          const relatedMicros = microServices.filter(m => m.macro_id === macro.id).slice(0, 3);

                          return (
                            <div
                              key={macro.id}
                              className="group"
                              onMouseEnter={() => setHoveredMacroSlug(macro.slug)}
                            >
                              <Link
                                href={getLocalizedHref(`/leistungen/${macro.slug}`)}
                                onClick={closeMega}
                                className={`flex items-start gap-3 mb-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                              >
                                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#fed01b] group-hover:border-[#fed01b] transition-all duration-300">
                                  <Icon className="w-4 h-4 text-white group-hover:text-[#0a0a0a]" />
                                </div>
                                <div className="min-w-0 pt-0.5">
                                  <h4 className="text-[13px] font-bold text-white group-hover:text-[#fed01b] transition-colors flex items-center gap-2">
                                    {macro.title}
                                  </h4>
                                  {/* <p className="text-[10px] text-[#a1a1aa] leading-relaxed mt-0.5 line-clamp-1">{macro.description}</p> */}
                                </div>
                              </Link>

                              {/* Micro Services Links */}
                              {relatedMicros.length > 0 && (
                                <ul className={`space-y-1.5 mt-2 border-l border-white/10 ${isRTL ? 'border-l-0 border-r pr-3 pl-0' : 'pl-3 ml-4'}`}>
                                  {relatedMicros.map(micro => (
                                    <li key={micro.id}>
                                      <Link
                                        href={getLocalizedHref(`/leistungen/${macro.slug}/${micro.slug}`)}
                                        onClick={closeMega}
                                        className={`text-[11px] font-medium text-[#71717a] hover:text-white transition-colors flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-start' : ''}`}
                                      >
                                        <span className="w-1 h-1 rounded-full bg-[#fed01b] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {micro.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── LOCATIONS MEGA ── */}
                {activeMega === 'locations' && (
                  <div className={`grid grid-cols-12 gap-12 ${isRTL ? 'rtl' : ''}`}>
                    <div className="col-span-9">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-px bg-white/20" />
                        <p className={`text-[10px] font-bold tracking-[0.25em] uppercase text-[#fed01b] ${isRTL ? 'text-right' : ''}`}>
                          {dict.header.locations_region}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-6">
                        {cities.map(city => (
                          <Link
                            key={city.id}
                            href={getLocalizedHref(`/${city.slug}`)}
                            onClick={closeMega}
                            className={`group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#fed01b]/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden ${isRTL ? 'text-right' : ''}`}
                          >
                            {/* Map Background Overlay */}
                            <div className="absolute inset-0 opacity-[0.3] group-hover:opacity-[0.5] transition-opacity duration-500 pointer-events-none">
                              <Image
                                src={`/photos/map_${city.id}.jpg`}
                                alt=""
                                fill
                                className="object-cover mix-blend-luminosity"
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-transparent to-[#0a0a0a]/80" />
                            </div>

                            <div className="relative z-10">
                              <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-white/10 group-hover:border-[#fed01b] group-hover:bg-[#fed01b]/10 transition-all">
                                  <MapPin className="w-5 h-5 text-[#fed01b]" />
                                </div>
                                {city.isPrimaryHub && (
                                  <span className="text-[9px] font-black tracking-[0.15em] uppercase bg-[#fed01b] text-[#0a0a0a] px-2 py-1 rounded-full">Headquarters</span>
                                )}
                              </div>
                              <h4 className="text-[18px] font-bold text-white mb-2 group-hover:text-[#fed01b] transition-colors">
                                {city.name}
                              </h4>
                              <p className="text-[12px] text-[#a1a1aa] mb-4 line-clamp-2">{city.location.address}, {city.location.postalCode}</p>
                              <div className={`flex items-center gap-2 text-[#fed01b] ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <span className="text-[11px] font-bold uppercase tracking-wider">
                                  {dict.header.learn_more}
                                </span>
                                <ArrowRight className={`w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${isRTL ? 'rotate-180' : ''}`} />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Trust Card */}
                    <div className="col-span-3">
                      <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 h-full">
                        <div className={`flex items-center gap-3 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <ShieldCheck className="w-6 h-6 text-[#fed01b]" />
                          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-white">{dict.header.certified}</span>
                        </div>
                        <div className="space-y-5">
                          {[dict.header.cert_tuv, dict.header.cert_iso, dict.header.cert_master, dict.header.cert_insured].map(item => (
                            <div key={item} className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <CheckCircle className="w-5 h-5 text-[#fed01b] flex-shrink-0" />
                              <span className={`text-[13px] font-semibold text-[#a1a1aa] ${isRTL ? 'text-right' : ''}`}>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══════════════ FULL-SCREEN MOBILE NAV (CINEMATIC DARK) ═══════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[50] bg-[#0a0a0a]/95 flex flex-col"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 h-[90px] border-b border-white/10 flex-shrink-0" style={{ marginTop: scrolled ? 0 : 40 }}>
              <Link href={getLocalizedHref('/')} onClick={() => setMobileOpen(false)} className="flex items-center">
                <div className="relative h-14 w-48">
                  <Image src="/logo_new2.png" alt="AZ-Europa Service GmbH" fill sizes="192px" className="object-contain object-left" />
                </div>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Content */}
            <div className="flex-1 overflow-x-hidden overflow-y-auto px-6 py-8">
              <nav className={`space-y-2 ${isRTL ? 'text-right' : ''}`}>
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                  <Link href={getLocalizedHref('/')} onClick={() => setMobileOpen(false)} className={`flex items-center justify-between px-5 py-5 text-[16px] font-bold text-white hover:bg-white/5 rounded-2xl transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {dict.nav.home}
                  </Link>
                </motion.div>

                {/* Leistungen Accordion */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === 'services' ? null : 'services')}
                    className={`flex items-center justify-between w-full px-5 py-5 text-[16px] font-bold text-white hover:bg-white/5 rounded-2xl transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {dict.nav.services}
                    <ChevronDown className={`w-5 h-5 text-[#fed01b] transition-transform duration-300 ${mobileExpanded === 'services' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'services' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className={`py-4 space-y-2 ${isRTL ? 'pr-5' : 'pl-5'}`}>
                          {macroServices.map(macro => {
                            const Icon = serviceIcons[macro.slug] || Sparkles;
                            return (
                              <Link
                                key={macro.id}
                                href={getLocalizedHref(`/leistungen/${macro.slug}`)}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                              >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                                  <Icon className="w-4.5 h-4.5 text-[#fed01b]" />
                                </div>
                                <span className="text-[15px] font-medium text-[#a1a1aa]">{macro.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Standorte Accordion */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === 'locations' ? null : 'locations')}
                    className={`flex items-center justify-between w-full px-5 py-5 text-[16px] font-bold text-white hover:bg-white/5 rounded-2xl transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {dict.nav.locations}
                    <ChevronDown className={`w-5 h-5 text-[#fed01b] transition-transform duration-300 ${mobileExpanded === 'locations' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'locations' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className={`py-4 space-y-2 ${isRTL ? 'pr-5' : 'pl-5'}`}>
                          {cities.map(city => (
                            <Link
                              key={city.id}
                              href={getLocalizedHref(`/${city.slug}`)}
                              onClick={() => setMobileOpen(false)}
                              className={`flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                                <MapPin className="w-4.5 h-4.5 text-[#fed01b]" />
                              </div>
                              <span className="text-[15px] font-medium text-[#a1a1aa]">{city.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
                  <Link href={getLocalizedHref('/ueber-uns')} onClick={() => setMobileOpen(false)} className={`flex items-center justify-between px-5 py-5 text-[16px] font-bold text-white hover:bg-white/5 rounded-2xl transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {dict.nav.about}
                  </Link>
                </motion.div>
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                  <Link href={getLocalizedHref('/kontakt')} onClick={() => setMobileOpen(false)} className={`flex items-center justify-between px-5 py-5 text-[16px] font-bold text-white hover:bg-white/5 rounded-2xl transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {dict.nav.contact}
                  </Link>
                </motion.div>
              </nav>
            </div>

            {/* Mobile Bottom CTAs */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className={`flex-shrink-0 px-6 pb-10 pt-6 border-t border-white/10 space-y-4 bg-[#050505] ${isRTL ? 'flex-row-reverse' : ''}`}>
              <a
                href="tel:+4991316146235"
                className="flex items-center justify-center gap-3 w-full py-5 border border-white/20 text-white text-[13px] font-black tracking-[0.1em] uppercase rounded-xl hover:bg-white/5 transition-colors"
              >
                <Phone className="w-5 h-5 text-[#fed01b]" />
                09131 6146235
              </a>
              <Link
                href={getLocalizedHref('/kontakt')}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-5 bg-[#fed01b] text-[#0a0a0a] text-[13px] font-black tracking-[0.1em] uppercase rounded-xl hover:bg-[#eec200] transition-colors"
              >
                {dict.nav.cta}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
