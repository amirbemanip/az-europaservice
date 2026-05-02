"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, ArrowRight, ArrowUpRight,
  CheckCircle, Star, ShieldCheck, Clock, Send, Award
} from 'lucide-react';

interface City { id: string; name: string; slug: string; isPrimaryHub?: boolean; location: { address: string; postalCode: string; city: string; phone: string; }; }
interface Service { id: string; title: string; slug: string; description: string; }

export function EnterpriseFooter({ cities, services, dict, locale }: { cities: City[]; services: Service[]; dict: any; locale: string }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const getLocalizedHref = (path: string) => {
    if (locale === 'de') return path;
    return `/${locale}${path === '/' ? '' : path}`;
  };

  const isRTL = locale === 'fa' || locale === 'ar';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className={`relative overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>

      {/* ── 1. PRE-FOOTER CTA STRIP ── */}
      <div className="bg-[#fed01b]">
        <div className={`max-w-screen-xl mx-auto px-6 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-[#0a0a0a] flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-[#fed01b]" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#0a0a0a]">{dict.footer.direct_contact}</p>
              <p className="text-[12px] text-[#0a0a0a]/60">{dict.footer.contact_hours}</p>
            </div>
          </div>
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <a href="tel:+4991316146235" className="flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] text-white text-[11px] font-bold tracking-[0.08em] uppercase rounded-[4px] hover:bg-[#1e293b] transition-colors">
              <Phone className="w-3.5 h-3.5" />
              09131 6146235
            </a>
            <Link href={getLocalizedHref('/kontakt')} className="flex items-center gap-2 px-6 py-3 bg-white/90 text-[#0a0a0a] text-[11px] font-bold tracking-[0.08em] uppercase rounded-[4px] hover:bg-white transition-colors border border-[#0a0a0a]/10">
              {dict.footer.online_request}
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 2. MAIN FOOTER ── */}
      <div className="bg-[#0a0a0a] relative">
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-16">

          <div className={`py-16 border-b border-white/[0.06] flex flex-col lg:flex-row items-start justify-between gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>

            {/* Brand */}
            <div className="max-w-sm">
              <div className={`flex items-center gap-3 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="relative h-10 w-12">
                  <Image src="/logo.png" alt="AZ-Europa Service GmbH" fill sizes="48px" className="object-contain object-left" />
                </div>
                <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                  <span className="text-[16px] font-black tracking-[-0.02em] text-white leading-none">AZ-EUROPA</span>
                  <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#565e74] leading-none mt-[3px]">{dict.footer.brand_tagline}</span>
                </div>
              </div>
              <p className="text-[14px] text-[#565e74] leading-relaxed mb-6">
                {dict.footer.brand_desc}
              </p>

              {/* Trust Badges */}
              <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {[
                  { icon: ShieldCheck, label: dict.footer.cert_tuv },
                  { icon: Award, label: dict.footer.cert_master },
                  { icon: CheckCircle, label: dict.footer.cert_iso },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className={`flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-[4px] ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Icon className="w-3 h-3 text-[#fed01b]" />
                    <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-[#7c839b]">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className={`w-full lg:w-auto lg:min-w-[400px] ${isRTL ? 'text-right' : ''}`}>
              <h4 className="text-[13px] font-bold text-white mb-1.5">
                {dict.footer.newsletter_title}
              </h4>
              <p className="text-[12px] text-[#565e74] mb-4">
                {dict.footer.newsletter_desc}
              </p>
              {subscribed ? (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`flex items-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-[4px] ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-[13px] font-semibold text-green-400">
                    {dict.footer.newsletter_success}
                  </span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={dict.footer.email_placeholder}
                    required
                    className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-[4px] text-[13px] text-white placeholder:text-[#565e74] focus:outline-none focus:border-[#fed01b]/50 focus:bg-white/[0.06] transition-all"
                  />
                  <button type="submit" className="px-5 py-3 bg-[#fed01b] text-[#0a0a0a] rounded-[4px] hover:bg-[#eec200] transition-colors flex items-center gap-1.5">
                    <Send className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    <span className="text-[11px] font-bold tracking-[0.06em] uppercase hidden sm:inline">
                      {dict.footer.subscribe}
                    </span>
                  </button>
                </form>
              )}
              <p className="text-[10px] text-[#565e74]/70 mt-2.5">
                {dict.footer.spam_note}
              </p>
            </div>
          </div>

          {/* ── 3. MAIN LINKS GRID ── */}
          <div className="py-12 border-b border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10">
            {/* Services */}
            <div>
              <h5 className={`text-[10px] font-bold tracking-[0.2em] uppercase text-[#7c839b] mb-5 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="w-4 h-px bg-[#fed01b]/40" />
                {dict.nav.services}
              </h5>
              <div className="flex flex-col gap-2.5">
                {services.map(s => (
                  <Link key={s.id} href={getLocalizedHref(`/leistungen/${s.slug}`)} className={`text-[13px] text-[#565e74] hover:text-white transition-colors duration-200 font-medium group flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {s.title}
                    <ArrowUpRight className={`w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div>
              <h5 className={`text-[10px] font-bold tracking-[0.2em] uppercase text-[#7c839b] mb-5 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="w-4 h-px bg-[#fed01b]/40" />
                {dict.nav.locations}
              </h5>
              <div className="flex flex-col gap-2.5">
                {cities.map(c => (
                  <Link key={c.id} href={getLocalizedHref(`/${c.slug}`)} className={`text-[13px] text-[#565e74] hover:text-white transition-colors duration-200 font-medium group flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {c.name}
                    {c.isPrimaryHub && <span className="text-[8px] font-bold tracking-wider uppercase text-[#fed01b]/60 ml-0.5">HQ</span>}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h5 className={`text-[10px] font-bold tracking-[0.2em] uppercase text-[#7c839b] mb-5 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="w-4 h-px bg-[#fed01b]/40" />
                {dict.footer.company}
              </h5>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: dict.nav.about, href: '/ueber-uns' },
                  { label: dict.footer.career, href: '/karriere' },
                  { label: dict.nav.contact, href: '/kontakt' },
                  { label: 'Blog', href: '/blog' },
                ].map(link => (
                  <Link key={link.href} href={getLocalizedHref(link.href)} className="text-[13px] text-[#565e74] hover:text-white transition-colors duration-200 font-medium">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h5 className={`text-[10px] font-bold tracking-[0.2em] uppercase text-[#7c839b] mb-5 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="w-4 h-px bg-[#fed01b]/40" />
                {dict.footer.legal}
              </h5>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Impressum', href: '/impressum' },
                  { label: 'Datenschutz', href: '/datenschutz' },
                  { label: 'AGB', href: '/agb' },
                ].map(link => (
                  <Link key={link.href} href={getLocalizedHref(link.href)} className="text-[13px] text-[#565e74] hover:text-white transition-colors duration-200 font-medium">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-1">
              <h5 className={`text-[10px] font-bold tracking-[0.2em] uppercase text-[#7c839b] mb-5 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="w-4 h-px bg-[#fed01b]/40" />
                {dict.nav.contact}
              </h5>
              <div className="space-y-4">
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="w-4 h-4 text-[#565e74] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[13px] text-[#7c839b] leading-relaxed">Apfelstraße 5</p>
                    <p className="text-[13px] text-[#7c839b]">91054 Erlangen</p>
                  </div>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone className="w-4 h-4 text-[#565e74] flex-shrink-0" />
                  <a href="tel:+4991316146235" className="text-[14px] font-bold text-white hover:text-[#fed01b] transition-colors">
                    09131 6146235
                  </a>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Mail className="w-4 h-4 text-[#565e74] flex-shrink-0" />
                  <a href="mailto:info@az-europaservice.de" className="text-[13px] text-[#7c839b] hover:text-white transition-colors font-medium">
                    info@az-europaservice.de
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. BOTTOM BAR ── */}
          <div className={`py-8 flex flex-col sm:flex-row items-center justify-between gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <p className="text-[11px] text-[#565e74] font-medium">
              © {new Date().getFullYear()} AZ-Europa Service GmbH · {dict.footer.all_rights}
            </p>
            <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-[11px] text-[#565e74]/60 font-medium">
                Erlangen · Nürnberg · Bamberg
              </span>
              <span className="text-[11px] text-[#565e74]/40">🇩🇪</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
