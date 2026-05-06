"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wrench, ArrowRight, Building2, ClipboardCheck, Stethoscope, GlassWater } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function TrueBentoGrid({ locale, dict }: { locale: string; dict: any }) {
  const isRTL = locale === 'fa' || locale === 'ar';
  const serviceDict = dict.services || {};

  const getLocalizedHref = (path: string) => {
    return `/${locale}${path}`;
  };

  const localizedServiceCards = [
    {
      id: 'reinigung',
      icon: Sparkles,
      title: dict.services.reinigung?.title || 'Reinigung aller Art',
      desc: dict.services.reinigung?.description || 'Professionelle Reinigungsservices für ein strahlendes Umfeld.',
      span: 'md:col-span-2 md:row-span-2',
      featured: true,
      href: '/leistungen/reinigung',
      stat: dict.services.home_stat || '500+ Objekte',
      image: '/Reinigung aller Art.png',
    },
    {
      id: 'hausmeisterservice',
      icon: Wrench,
      title: dict.services.hausmeisterservice?.title || 'Hausmeisterservice',
      desc: dict.services.hausmeisterservice?.description || 'Rundum-Betreuung Ihrer Immobilie.',
      span: 'md:col-span-1 md:row-span-1',
      href: '/leistungen/hausmeisterservice',
      image: '/Hausmeisterservice.png',
    },
    {
      id: 'renovierungen',
      icon: Building2,
      title: dict.services.renovierungen?.title || 'Renovierungen',
      desc: dict.services.renovierungen?.description || 'Malerarbeiten und Bodenverlegung.',
      span: 'md:col-span-1 md:row-span-1',
      href: '/leistungen/renovierungen',
      image: '/Renovierungen.png',
    },
    {
      id: 'gartenpflege',
      icon: GlassWater,
      title: dict.services.gartenpflege?.title || 'Gartenpflege',
      desc: dict.services.gartenpflege?.description || 'Rasenmähen, Heckenschnitt und mehr.',
      span: 'md:col-span-1 md:row-span-1',
      href: '/leistungen/gartenpflege',
      image: '/Gartenpflege.png',
    },
    {
      id: 'abbrucharbeiten',
      icon: ClipboardCheck,
      title: dict.services.abbrucharbeiten?.title || 'Abbrucharbeiten',
      desc: dict.services.abbrucharbeiten?.description || 'Effizienter Rückbau und Planung.',
      span: 'md:col-span-1 md:row-span-1',
      href: '/leistungen/abbrucharbeiten',
      image: '/Abbrucharbeiten.png',
    },
    {
      id: 'entruempelungen',
      icon: Stethoscope,
      title: dict.services.entruempelungen?.title || 'Entrümpelung',
      desc: dict.services.entruempelungen?.description || 'Fachgerechte Entsorgung und besenreine Übergabe.',
      span: 'md:col-span-2 md:row-span-1',
      href: '/leistungen/entruempelungen',
      featured_sub: true,
      image: '/Entrümpelung.png',
    },
  ];

  return (
    <section className={`py-32 bg-[#fafafa] relative overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* Premium Apple-like Light Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#0a0a0a 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">

        {/* Section Header */}
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-px bg-[#fed01b]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#71717a]">
                {dict.services.home_badge || 'Kernkompetenzen'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0a0a0a] tracking-[-0.02em] leading-[1.1] mb-6">
              {dict.services.home_title || 'Exzellenz in jedem Bereich.'}
            </h2>
            <p className="text-lg text-[#52525b] leading-relaxed">
              {dict.services.home_subtitle || 'Als Full-Service Dienstleister bieten wir maßgeschneiderte Lösungen für höchste Ansprüche.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href={getLocalizedHref('/leistungen')}
              className={`group inline-flex items-center gap-3 text-[12px] font-black tracking-[0.1em] uppercase text-[#0a0a0a] border border-[#e4e4e7] bg-white px-8 py-4 rounded-full hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white transition-all duration-300 shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {dict.common.all_services || 'Alle Leistungen'}
              <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </motion.div>
        </div>

        {/* Premium Light Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[220px] md:auto-rows-[280px]">
          {localizedServiceCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
                className={`${card.span} group relative rounded-3xl overflow-hidden bg-white border border-[#f4f4f5] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_80px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500`}
              >
                <Link href={getLocalizedHref(card.href) || '#'} className="absolute inset-0 z-20" aria-label={card.title} />
                
                {/* Background Image for ALL Cards (Faint in light cards, darker in featured) */}
                {card.image && (
                  <div className={`absolute inset-0 z-0 transition-all duration-700 ${card.featured || card.featured_sub ? 'opacity-[0.85] group-hover:opacity-100 group-hover:scale-105' : 'opacity-[0.15] group-hover:opacity-[0.25] group-hover:scale-105 mix-blend-luminosity'}`}>
                    <Image 
                      src={card.image} 
                      alt={card.title} 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 768px) 100vw, 50vw" 
                    />

                    {/* Bottom gradient fade for text legibility */}
                    {card.featured || card.featured_sub ? (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#ffffff] via-[#ffffff]/60 to-[#ffffff]/10" />
                    )}
                  </div>
                )}

                <div className={`relative z-10 flex flex-col h-full p-8 ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
                  
                  {/* Top Header: Icon & Arrow */}
                  <div className={`flex justify-between items-start w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${card.featured || card.featured_sub ? 'bg-[#fed01b]' : 'bg-[#f4f4f5] group-hover:bg-[#fed01b]'}`}>
                      <Icon className={`w-5 h-5 transition-colors ${card.featured || card.featured_sub ? 'text-[#0a0a0a]' : 'text-[#52525b] group-hover:text-[#0a0a0a]'}`} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      <ArrowRight className={`w-4 h-4 text-[#0a0a0a] ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="mt-auto w-full">
                    <h3 className={`font-bold mb-3 transition-colors ${(card.featured || card.featured_sub) ? 'text-white' : 'text-[#0a0a0a] group-hover:text-[#fed01b]'} ${card.featured ? 'text-3xl lg:text-4xl' : 'text-xl'}`}>
                      {card.title}
                    </h3>
                    <p className={`leading-relaxed ${(card.featured || card.featured_sub) ? 'text-slate-300' : 'text-[#52525b]'} ${card.featured ? 'text-base max-w-sm' : 'text-sm'}`}>
                      {card.desc}
                    </p>
                    {card.stat && (
                      <div className={`mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/20 border border-white/20 rounded-full backdrop-blur-md ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fed01b] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fed01b]"></span>
                        </span>
                        <span className="text-[11px] font-black tracking-[0.1em] uppercase text-white">{card.stat}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Animated Bottom Line */}
                <div className="absolute bottom-0 left-0 h-1 bg-[#fed01b] w-0 group-hover:w-full transition-all duration-700 ease-out z-10" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
