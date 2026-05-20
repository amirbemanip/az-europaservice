"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight, Navigation, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cities } from '@/data/db';

export function InteractiveRegionMap({ locale, dict }: { locale: string; dict: any }) {
  const isRTL = locale === 'fa' || locale === 'ar';

  const getLocalizedHref = (path: string) => {
    if (locale === 'de') return path;
    return `/${locale}${path}`;
  };

  // Helper to replace {region} placeholder
  const localizedTitle = dict.region_map.title_template.replace(
    '{region}',
    `<span class="text-[#fed01b]">${dict.region_map.region_highlight}</span>`
  );

  return (
    <section className={`py-32 bg-[#fafafa] relative overflow-hidden z-20 border-t border-black/5 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Background Grid Pattern for Technical Feel */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(to right, #0a0a0a 1px, transparent 1px), linear-gradient(to bottom, #0a0a0a 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Map Glow */}
      <div className={`absolute top-1/2 ${isRTL ? 'left-0' : 'right-0'} w-[500px] h-[500px] bg-[#fed01b]/8 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none`} />
 
      <div className="container mx-auto px-6 relative z-10">
        <div className={`flex flex-col lg:flex-row gap-16 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fed01b]/10 border border-[#fed01b]/20 text-[#d97706] text-sm font-bold tracking-widest uppercase mb-6 shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              {dict.region_map.badge}
            </div>
            <h2 
              className="text-4xl md:text-5xl font-black text-[#0a0a0a] tracking-tight mb-6"
              dangerouslySetInnerHTML={{ __html: localizedTitle }}
            />
            <p className="text-slate-600 text-lg font-medium mb-8 leading-relaxed">
              {dict.region_map.desc}
            </p>
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-black/5 shadow-md">
                <Navigation className="w-6 h-6 text-[#fed01b]" />
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-[#0a0a0a] font-bold">{dict.region_map.teams_label}</p>
                <p className="text-slate-500 text-sm font-semibold">{dict.region_map.teams_sub}</p>
              </div>
            </div>
          </motion.div>
  
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city, i) => (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                >
                  <Link href={getLocalizedHref(`/${city.slug}`)} className="block group">
                    <div className="bg-white p-8 rounded-3xl h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-black/5 hover:border-[#fed01b]/50 group">
                      {/* Map Background Overlay */}
                      <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                        <Image 
                          src={`/photos/map_${city.id}.jpg`} 
                          alt=""
                          fill
                          className="object-cover mix-blend-multiply grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white/90" />
                      </div>
                      
                      <div className="relative z-10 flex flex-col h-full w-full">
                      
                      {/* Animated Ping Marker */}
                      <div className={`absolute top-8 ${isRTL ? 'left-8' : 'right-8'}`}>
                        <div className="relative flex h-4 w-4">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fed01b] opacity-40"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#fed01b]/80 border border-[#fed01b]"></span>
                        </div>
                      </div>
  
                      <div className={`w-12 h-12 bg-slate-50 border border-black/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#fed01b] group-hover:scale-110 transition-all duration-300 ${isRTL ? 'mr-auto' : ''}`}>
                        <MapPin className="w-6 h-6 text-[#fed01b] group-hover:text-[#0a0a0a] transition-colors" />
                      </div>
                      
                      <h3 className="text-3xl font-bold text-[#0a0a0a] mb-2">{city.name}</h3>
                      <p className={`text-slate-500 font-mono text-sm mb-6 flex-grow ${isRTL ? 'text-right' : 'text-left'}`}>{city.location.address}</p>
                      
                      <div className={`pt-6 border-t border-black/5 flex justify-between items-center mt-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                          <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">{dict.region_map.branch_label}</span>
                          <span className="text-[#d97706] text-sm font-semibold flex items-center gap-1 group-hover:text-[#0a0a0a] transition-colors">
                            {dict.region_map.open_page} <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                          </span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-black/5 flex items-center justify-center group-hover:bg-[#fed01b]/20 transition-colors">
                          <PhoneCall className="w-4 h-4 text-slate-700" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                </motion.div>
              ))}
            </div>
          </div>
  
        </div>
      </div>
    </section>
  );
}
