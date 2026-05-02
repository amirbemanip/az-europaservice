"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wrench, PaintBucket, Trash2, TreePine, Package, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function TrueBentoGrid({ locale, dict }: { locale: string; dict: any }) {
  const isRTL = locale === 'fa' || locale === 'ar';

  const getLocalizedHref = (path: string) => {
    if (locale === 'de') return path;
    return `/${locale}${path}`;
  };

  const localizedServiceCards = [
    {
      icon: Sparkles,
      title: dict.services.reinigung.bento_title,
      desc: dict.services.reinigung.bento_desc,
      span: 'md:col-span-2 md:row-span-2',
      featured: true,
      href: '/leistungen/reinigung',
      stat: dict.services.home_stat,
    },
    {
      icon: Wrench,
      title: dict.services.hausmeisterservice.bento_title,
      desc: dict.services.hausmeisterservice.bento_desc,
      span: 'md:col-span-1 md:row-span-1',
      href: '/leistungen/hausmeisterservice',
    },
    {
      icon: PaintBucket,
      title: dict.services.renovierungen.bento_title,
      desc: dict.services.renovierungen.bento_desc,
      span: 'md:col-span-1 md:row-span-1',
      href: '/leistungen/renovierungen',
    },
    {
      icon: Trash2,
      title: dict.services.abbrucharbeiten.bento_title,
      desc: dict.services.abbrucharbeiten.bento_desc,
      span: 'md:col-span-1 md:row-span-1',
      href: '/leistungen/abbrucharbeiten',
    },
    {
      icon: TreePine,
      title: dict.services.gartenpflege.bento_title,
      desc: dict.services.gartenpflege.bento_desc,
      span: 'md:col-span-1 md:row-span-1',
      href: '/leistungen/gartenpflege',
    },
    {
      icon: Package,
      title: dict.services.entruempelung.bento_title,
      desc: dict.services.entruempelung.bento_desc,
      span: 'md:col-span-2 md:row-span-1',
      href: '/leistungen/entruempelung',
    },
  ];

  return (
    <section className={`py-32 bg-white relative overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `linear-gradient(#191c1e 1px, transparent 1px), linear-gradient(90deg, #191c1e 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">

        {/* Section Header */}
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#76777d] mb-4 block">
              {dict.services.home_badge}
            </span>
            <h2 className="text-4xl md:text-[48px] font-black text-[#0a0a0a] tracking-[-0.02em] leading-[1.1] mb-5">
              {dict.services.home_title}
            </h2>
            <p className="text-lg text-[#45464d] leading-relaxed">
              {dict.services.home_subtitle}
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
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0a0a0a] border border-[#0a0a0a] px-6 py-3 rounded-sm hover:bg-[#0a0a0a] hover:text-white transition-all duration-300"
            >
              {dict.common.all_services}
              <ArrowUpRight className={`w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${isRTL ? 'rotate-[-90deg]' : ''}`} />
            </Link>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {localizedServiceCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`${card.span} group relative bg-white border border-[#e0e3e5] rounded-sm overflow-hidden transition-all duration-500 hover:border-[#0a0a0a] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]`}
              >
                <Link href={getLocalizedHref(card.href) || '#'} className={`flex flex-col h-full p-7 relative z-10 ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
                  {/* Hover background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f7f9fb] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                  {/* Icon + Arrow */}
                  <div className={`flex justify-between items-start w-full relative z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-12 h-12 rounded-sm ${card.featured ? 'bg-[#fed01b]' : 'bg-[#f2f4f6]'} flex items-center justify-center group-hover:bg-[#fed01b] transition-colors duration-400`}>
                      <Icon className="w-5 h-5 text-[#0a0a0a]" />
                    </div>
                    <div className="w-9 h-9 rounded-full border border-[#e0e3e5] flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 bg-white">
                      <ArrowUpRight className={`w-4 h-4 text-[#0a0a0a] ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-auto relative z-10 w-full">
                    <h3 className={`font-bold text-[#0a0a0a] mb-2 ${card.featured ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
                      {card.title}
                    </h3>
                    <p className={`text-[#76777d] ${card.featured ? 'text-base' : 'text-sm'} leading-relaxed line-clamp-2`}>
                      {card.desc}
                    </p>
                    {card.stat && (
                      <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-[#fed01b]/10 border border-[#fed01b]/20 rounded-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#fed01b]" />
                        <span className="text-xs font-semibold text-[#0a0a0a]">{card.stat}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom border accent */}
                  <div className="absolute bottom-0 left-0 h-[3px] bg-[#fed01b] w-0 group-hover:w-full transition-all duration-600 ease-out" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
