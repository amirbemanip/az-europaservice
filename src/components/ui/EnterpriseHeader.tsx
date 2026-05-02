"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, Clock, MapPin, ChevronDown, ArrowRight,
  Menu, X, Sparkles, Wrench, PaintBucket, Trash2, TreePine, Package,
  ShieldCheck, Award, CheckCircle
} from 'lucide-react';

interface City { id: string; name: string; slug: string; isPrimaryHub?: boolean; location: { address: string; postalCode: string; city: string; phone: string; }; }
interface Service { id: string; title: string; slug: string; description: string; }

const serviceIcons: Record<string, React.ElementType> = {
  reinigung: Sparkles,
  hausmeisterservice: Wrench,
  renovierungen: PaintBucket,
  abbrucharbeiten: Trash2,
  gartenpflege: TreePine,
  entruempelung: Package,
};

export function EnterpriseHeader({ cities, services, dict, locale }: { cities: City[]; services: Service[]; dict: any; locale: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const getLocalizedHref = (path: string) => {
    if (locale === 'de') return path;
    return `/${locale}${path === '/' ? '' : path}`;
  };

  const isRTL = locale === 'fa' || locale === 'ar';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMega = useCallback(() => setActiveMega(null), []);

  return (
    <>
      {/* ═══════════════ TOP UTILITY BAR ═══════════════ */}
      <div className={`fixed top-0 w-full z-[52] transition-all duration-500 ${scrolled ? 'h-0 opacity-0 pointer-events-none' : 'h-10 opacity-100'}`}>
        <div className="h-full bg-[#0a0a0a] flex items-center">
          <div className="max-w-screen-xl mx-auto w-full px-6 lg:px-16 flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-6">
              <a href="tel:+4991316146235" className="flex items-center gap-2 text-[#bec6e0] hover:text-white text-xs font-medium tracking-wide transition-colors">
                <Phone className="w-3 h-3" />
                09131 6146235
              </a>
              <span className="w-px h-3 bg-white/15" />
              <a href="mailto:info@az-europaservice.de" className="flex items-center gap-2 text-[#bec6e0] hover:text-white text-xs font-medium tracking-wide transition-colors">
                <Mail className="w-3 h-3" />
                info@az-europaservice.de
              </a>
            </div>
            <div className={`flex items-center gap-5 ${locale === 'fa' || locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-1.5 text-[#bec6e0] text-xs font-medium ${locale === 'fa' || locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-3 h-3" />
                <span>{dict.header.opening_hours}</span>
              </div>
              <span className="w-px h-3 bg-white/15 hidden sm:block" />
              <div className={`hidden sm:flex items-center gap-1.5 text-[#bec6e0] text-xs font-medium ${locale === 'fa' || locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-3 h-3" />
                <span>{dict.header.locations_summary}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ MAIN HEADER ═══════════════ */}
      <header
        className={`fixed w-full z-[51] transition-all duration-500 ${
          scrolled
            ? 'top-0 bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-[#e0e3e5]/60'
            : 'top-10 bg-white/80 backdrop-blur-md border-b border-transparent'
        }`}
        onMouseLeave={closeMega}
      >
        <div className="max-w-screen-xl mx-auto w-full px-6 lg:px-16">
          <div className="flex items-center justify-between h-[72px]">

            {/* ── LOGO ── */}
            <Link href={getLocalizedHref('/')} className="flex items-center flex-shrink-0 group" onClick={closeMega}>
              <div className="relative h-12 w-48">
                <Image
                  src="/logo.png"
                  alt="AZ-Europa Service GmbH"
                  fill
                  sizes="192px"
                  className="object-contain object-left"
                  priority
                  style={{ filter: 'brightness(0) saturate(100%) invert(8%) sepia(30%) saturate(2000%) hue-rotate(190deg) brightness(95%)' }}
                />
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav className={`hidden lg:flex items-center h-full ${locale === 'fa' || locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              {/* Leistungen — Mega Menu Trigger */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMega('services')}
              >
                <button
                  className={`flex items-center gap-1.5 px-5 h-full text-[13px] font-semibold tracking-[0.01em] transition-colors duration-200 ${
                    activeMega === 'services' ? 'text-[#0a0a0a]' : 'text-[#45464d] hover:text-[#0a0a0a]'
                  }`}
                >
                  {dict.nav.services}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMega === 'services' ? 'rotate-180' : ''}`} />
                </button>
                {/* Active indicator */}
                <div className={`absolute bottom-0 left-5 right-5 h-[2px] bg-[#fed01b] transition-all duration-300 ${activeMega === 'services' ? 'opacity-100' : 'opacity-0'}`} />
              </div>

              {/* Standorte — Mega Menu Trigger */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMega('locations')}
              >
                <button
                  className={`flex items-center gap-1.5 px-5 h-full text-[13px] font-semibold tracking-[0.01em] transition-colors duration-200 ${
                    activeMega === 'locations' ? 'text-[#0a0a0a]' : 'text-[#45464d] hover:text-[#0a0a0a]'
                  }`}
                >
                  {dict.nav.locations}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMega === 'locations' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute bottom-0 left-5 right-5 h-[2px] bg-[#fed01b] transition-all duration-300 ${activeMega === 'locations' ? 'opacity-100' : 'opacity-0'}`} />
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
                  className="relative h-full flex items-center px-5 text-[13px] font-semibold tracking-[0.01em] text-[#45464d] hover:text-[#0a0a0a] transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-[#fed01b] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </nav>

            {/* ── RIGHT ACTIONS ── */}
            <div className={`flex items-center gap-3 ${locale === 'fa' || locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              {/* Language Switcher */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-[11px] font-bold uppercase border border-[#e0e3e5] rounded-[4px] hover:bg-[#f7f9fb] transition-colors">
                  {locale}
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute top-full right-0 mt-1 bg-white border border-[#e0e3e5] shadow-xl rounded-[4px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all py-2 min-w-[80px]">
                  {['de', 'en', 'fa', 'ar', 'ru', 'uk'].map(l => (
                    <Link key={l} href={l === 'de' ? '/' : `/${l}`} className="block px-4 py-2 text-[11px] font-bold hover:bg-[#fed01b]/10 hover:text-[#0a0a0a] uppercase">
                      {l}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Phone — Desktop */}
              <a
                href="tel:+4991316146235"
                className="hidden lg:flex items-center gap-2 px-4 py-2.5 text-[11px] font-bold tracking-[0.08em] uppercase text-[#45464d] hover:text-[#0a0a0a] border border-[#e0e3e5] hover:border-[#0a0a0a] rounded-[4px] transition-all duration-200"
              >
                <Phone className="w-3.5 h-3.5" />
                {dict.nav.contact}
              </a>

              {/* CTA — Desktop */}
              <Link
                href={getLocalizedHref('/kontakt')}
                className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-[#fed01b] text-[#0a0a0a] text-[11px] font-bold tracking-[0.08em] uppercase rounded-[4px] hover:bg-[#eec200] transition-all duration-200 group shadow-[0_1px_2px_rgba(254,208,27,0.3)]"
              >
                {dict.nav.cta}
                <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform ${locale === 'fa' || locale === 'ar' ? 'rotate-180' : ''}`} />
              </Link>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-[4px] border border-[#e0e3e5] text-[#0a0a0a] hover:bg-[#f2f4f6] transition-colors"
                aria-label={dict.header.menu_aria}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ═══════════════ MEGA MENUS ═══════════════ */}
        <AnimatePresence>
          {activeMega && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-full left-0 w-full bg-white border-b border-[#e0e3e5] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              onMouseLeave={closeMega}
            >
              <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-10">

                {/* ── SERVICES MEGA ── */}
                {activeMega === 'services' && (
                  <div className={`grid grid-cols-12 gap-8 ${isRTL ? 'rtl' : ''}`}>
                    {/* Services Grid */}
                    <div className="col-span-9">
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#76777d] mb-5">{dict.header.our_services}</p>
                      <div className="grid grid-cols-3 gap-3">
                        {services.map(service => {
                          const Icon = serviceIcons[service.id] || Sparkles;
                          return (
                            <Link
                              key={service.id}
                              href={getLocalizedHref(`/leistungen/${service.slug}`)}
                              onClick={closeMega}
                              className={`group flex items-start gap-4 p-4 rounded-[6px] hover:bg-[#f7f9fb] transition-all duration-200 border border-transparent hover:border-[#e0e3e5] ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                            >
                              <div className="w-10 h-10 rounded-[4px] bg-[#f2f4f6] flex items-center justify-center flex-shrink-0 group-hover:bg-[#fed01b]/15 transition-colors">
                                <Icon className="w-4.5 h-4.5 text-[#0a0a0a]" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-[13px] font-bold text-[#0a0a0a] group-hover:text-[#0a0a0a] mb-0.5 flex items-center gap-1.5">
                                  {service.title}
                                  <ArrowRight className={`w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#fed01b] ${locale === 'fa' || locale === 'ar' ? 'rotate-180' : ''}`} />
                                </h4>
                                <p className="text-[12px] text-[#76777d] leading-relaxed line-clamp-2">{service.description}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Promo Card */}
                    <div className="col-span-3">
                      <div className="bg-[#0a0a0a] rounded-[6px] p-6 h-full flex flex-col justify-between">
                        <div>
                          <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Award className="w-4 h-4 text-[#fed01b]" />
                            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#fed01b]">{dict.header.master_business}</span>
                          </div>
                          <h4 className={`text-white font-bold text-[15px] leading-snug mb-2 ${isRTL ? 'text-right' : ''}`}>
                            {dict.header.free_cleaning_title}
                          </h4>
                          <p className={`text-[#7c839b] text-[12px] leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                            {dict.header.free_cleaning_desc}
                          </p>
                        </div>
                        <Link
                          href={getLocalizedHref('/kontakt')}
                          onClick={closeMega}
                          className={`mt-5 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.08em] uppercase text-[#fed01b] hover:text-white transition-colors group ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                          {dict.header.test_now}
                          <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform ${locale === 'fa' || locale === 'ar' ? 'rotate-180' : ''}`} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── LOCATIONS MEGA ── */}
                {activeMega === 'locations' && (
                  <div className={`grid grid-cols-12 gap-8 ${isRTL ? 'rtl' : ''}`}>
                    <div className="col-span-9">
                      <p className={`text-[10px] font-bold tracking-[0.2em] uppercase text-[#76777d] mb-5 ${isRTL ? 'text-right' : ''}`}>
                        {dict.header.locations_region}
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        {cities.map(city => (
                          <Link
                            key={city.id}
                            href={getLocalizedHref(`/${city.slug}`)}
                            onClick={closeMega}
                            className={`group p-5 rounded-[6px] border border-[#e0e3e5] hover:border-[#0a0a0a] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 ${locale === 'fa' || locale === 'ar' ? 'text-right' : ''}`}
                          >
                            <div className={`flex items-center gap-3 mb-3 ${locale === 'fa' || locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                              <div className="w-9 h-9 rounded-[4px] bg-[#f2f4f6] flex items-center justify-center group-hover:bg-[#fed01b] transition-colors">
                                <MapPin className="w-4 h-4 text-[#0a0a0a]" />
                              </div>
                              <div>
                                <h4 className="text-[14px] font-bold text-[#0a0a0a] flex items-center gap-2">
                                  {city.name}
                                  {city.isPrimaryHub && (
                                    <span className="text-[8px] font-bold tracking-[0.12em] uppercase bg-[#fed01b]/10 text-[#0a0a0a] px-1.5 py-0.5 rounded-full border border-[#fed01b]/20">HQ</span>
                                  )}
                                </h4>
                              </div>
                            </div>
                            <p className="text-[11px] text-[#76777d] font-mono mb-3">{city.location.address}, {city.location.postalCode}</p>
                            <div className={`flex items-center gap-1.5 text-[#0a0a0a] ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <span className="text-[11px] font-semibold group-hover:text-[#0a0a0a] transition-colors">
                                {dict.header.learn_more}
                              </span>
                              <ArrowRight className={`w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${locale === 'fa' || locale === 'ar' ? 'rotate-180' : ''}`} />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Trust Card */}
                    <div className="col-span-3">
                      <div className="bg-[#f7f9fb] border border-[#e0e3e5] rounded-[6px] p-6 h-full">
                        <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <ShieldCheck className="w-4 h-4 text-[#0a0a0a]" />
                          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#76777d]">{dict.header.certified}</span>
                        </div>
                        <div className="space-y-3">
                          {[dict.header.cert_tuv, dict.header.cert_iso, dict.header.cert_master, dict.header.cert_insured].map(item => (
                            <div key={item} className={`flex items-center gap-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <CheckCircle className="w-3.5 h-3.5 text-[#fed01b] fill-[#fed01b] flex-shrink-0" />
                              <span className={`text-[12px] font-medium text-[#45464d] ${isRTL ? 'text-right' : ''}`}>{item}</span>
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

      {/* ═══════════════ FULL-SCREEN MOBILE NAV ═══════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[50] bg-white flex flex-col"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-[#e0e3e5] flex-shrink-0" style={{ marginTop: scrolled ? 0 : 40 }}>
              <Link href={getLocalizedHref('/')} onClick={() => setMobileOpen(false)} className="flex items-center">
                <div className="relative h-10 w-40">
                  <Image src="/logo.png" alt="AZ-Europa" fill sizes="160px" className="object-contain object-left" style={{ filter: 'brightness(0) saturate(100%) invert(8%) sepia(30%) saturate(2000%) hue-rotate(190deg) brightness(95%)' }} />
                </div>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="w-10 h-10 rounded-[4px] border border-[#e0e3e5] flex items-center justify-center">
                <X className="w-5 h-5 text-[#0a0a0a]" />
              </button>
            </div>

            {/* Mobile Nav Content */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              {/* Main Links */}
              <nav className={`space-y-1 ${locale === 'fa' || locale === 'ar' ? 'text-right' : ''}`}>
                <Link href={getLocalizedHref('/')} onClick={() => setMobileOpen(false)} className={`flex items-center justify-between px-4 py-4 text-[15px] font-bold text-[#0a0a0a] hover:bg-[#f7f9fb] rounded-[6px] transition-colors ${locale === 'fa' || locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                  {dict.nav.home}
                </Link>

                {/* Leistungen Accordion */}
                <div>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === 'services' ? null : 'services')}
                    className={`flex items-center justify-between w-full px-4 py-4 text-[15px] font-bold text-[#0a0a0a] hover:bg-[#f7f9fb] rounded-[6px] transition-colors ${locale === 'fa' || locale === 'ar' ? 'flex-row-reverse' : ''}`}
                  >
                    {dict.nav.services}
                    <ChevronDown className={`w-4 h-4 text-[#76777d] transition-transform duration-300 ${mobileExpanded === 'services' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'services' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className={`pb-2 space-y-0.5 ${locale === 'fa' || locale === 'ar' ? 'pr-4' : 'pl-4'}`}>
                          {services.map(s => {
                            const Icon = serviceIcons[s.id] || Sparkles;
                            return (
                              <Link
                                key={s.id}
                                href={getLocalizedHref(`/leistungen/${s.slug}`)}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-[6px] hover:bg-[#f7f9fb] transition-colors ${locale === 'fa' || locale === 'ar' ? 'flex-row-reverse' : ''}`}
                              >
                                <div className="w-8 h-8 rounded-[4px] bg-[#f2f4f6] flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-4 h-4 text-[#0a0a0a]" />
                                </div>
                                <span className="text-[14px] font-medium text-[#45464d]">{s.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Standorte Accordion */}
                <div>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === 'locations' ? null : 'locations')}
                    className={`flex items-center justify-between w-full px-4 py-4 text-[15px] font-bold text-[#0a0a0a] hover:bg-[#f7f9fb] rounded-[6px] transition-colors ${locale === 'fa' || locale === 'ar' ? 'flex-row-reverse' : ''}`}
                  >
                    {dict.nav.locations}
                    <ChevronDown className={`w-4 h-4 text-[#76777d] transition-transform duration-300 ${mobileExpanded === 'locations' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'locations' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className={`pb-2 space-y-0.5 ${locale === 'fa' || locale === 'ar' ? 'pr-4' : 'pl-4'}`}>
                          {cities.map(c => (
                            <Link
                              key={c.id}
                              href={getLocalizedHref(`/${c.slug}`)}
                              onClick={() => setMobileOpen(false)}
                              className={`flex items-center gap-3 px-4 py-3 rounded-[6px] hover:bg-[#f7f9fb] transition-colors ${locale === 'fa' || locale === 'ar' ? 'flex-row-reverse' : ''}`}
                            >
                              <div className="w-8 h-8 rounded-[4px] bg-[#f2f4f6] flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-4 h-4 text-[#0a0a0a]" />
                              </div>
                              <div>
                                <span className="text-[14px] font-medium text-[#45464d]">{c.name}</span>
                                {c.isPrimaryHub && <span className={`ml-2 text-[9px] font-bold tracking-wider uppercase text-[#fed01b] ${locale === 'fa' || locale === 'ar' ? 'mr-2 ml-0' : ''}`}>{dict.header.headquarters}</span>}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href={getLocalizedHref('/ueber-uns')} onClick={() => setMobileOpen(false)} className={`flex items-center justify-between px-4 py-4 text-[15px] font-bold text-[#0a0a0a] hover:bg-[#f7f9fb] rounded-[6px] transition-colors ${locale === 'fa' || locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                  {dict.nav.about}
                </Link>
                <Link href={getLocalizedHref('/kontakt')} onClick={() => setMobileOpen(false)} className={`flex items-center justify-between px-4 py-4 text-[15px] font-bold text-[#0a0a0a] hover:bg-[#f7f9fb] rounded-[6px] transition-colors ${locale === 'fa' || locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                  {dict.nav.contact}
                </Link>
              </nav>
            </div>

            {/* Mobile Bottom CTAs */}
            <div className={`flex-shrink-0 px-6 pb-8 pt-4 border-t border-[#e0e3e5] space-y-3 bg-white ${locale === 'fa' || locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <a
                href="tel:+4991316146235"
                className="flex items-center justify-center gap-2.5 w-full py-4 border border-[#0a0a0a] text-[#0a0a0a] text-[12px] font-bold tracking-[0.08em] uppercase rounded-[4px] hover:bg-[#f7f9fb] transition-colors"
              >
                <Phone className="w-4 h-4" />
                09131 6146235
              </a>
              <Link
                href={getLocalizedHref('/kontakt')}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full py-4 bg-[#fed01b] text-[#0a0a0a] text-[12px] font-bold tracking-[0.08em] uppercase rounded-[4px] hover:bg-[#eec200] transition-colors"
              >
                {dict.nav.cta}
                <ArrowRight className={`w-4 h-4 ${locale === 'fa' || locale === 'ar' ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

