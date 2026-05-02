"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, ThumbsUp, Building2 } from 'lucide-react';

export function AuthorityMatrix({ locale, dict }: { locale: string; dict: any }) {
  const isRTL = locale === 'fa' || locale === 'ar';
  
  const stats = [
    { id: 1, name: dict.cta_section.stats[0].label, value: dict.cta_section.stats[0].value, icon: Building2 },
    { id: 2, name: dict.cta_section.stats[2].label, value: dict.cta_section.stats[2].value, icon: ThumbsUp },
    { id: 3, name: dict.cta_section.stats[1].label, value: dict.cta_section.stats[1].value, icon: Award },
    { id: 4, name: dict.cta_section.stats[3].label, value: dict.cta_section.stats[3].value, icon: Users },
  ];

  const partners = [
    "DATEV", "Siemens", "FAU Erlangen", "Adidas", "Puma", "Schaeffler", "Brose"
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden z-20">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#fed01b]/50 to-transparent" />
      
      <div className="container mx-auto px-6">
        
        {/* Animated Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col items-center text-center p-6 bg-white/5 border border-white/10 rounded-3xl"
            >
              <div className="w-14 h-14 bg-[#fed01b]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#fed01b]/20">
                <stat.icon className="w-7 h-7 text-[#fed01b]" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
                {stat.value}
              </div>
              <div className="text-slate-400 font-medium tracking-wide">
                {stat.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Infinite Logo Marquee */}
        <div className="text-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-10">
            {dict.trust.badge}
          </p>
          <div className="relative flex overflow-hidden w-full group mask-image-linear">
            {/* The infinite scroll container */}
            <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap group-hover:[animation-play-state:paused]">
              {[...partners, ...partners, ...partners].map((partner, i) => (
                <div key={i} className="mx-8 md:mx-16 flex items-center justify-center">
                  <span className="text-2xl md:text-4xl font-black text-slate-700/50 hover:text-white transition-colors duration-300">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
