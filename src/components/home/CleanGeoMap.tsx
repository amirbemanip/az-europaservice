"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { cities } from '@/data/db';

export function CleanGeoMap({ locale, dict }: { locale: string; dict: any }) {
  const isRTL = locale === 'fa' || locale === 'ar';

  const getLocalizedHref = (path: string) => {
    if (locale === 'de') return path;
    return `/${locale}${path}`;
  };

  return (
    <section className={`py-32 bg-white relative overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Light Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #e4e4e7 1px, transparent 0)`, backgroundSize: '48px 48px' }} />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
        <div className={`flex flex-col lg:flex-row gap-16 items-start ${isRTL ? 'lg:flex-row-reverse' : ''}`}>

          {/* Left: Title */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`w-full lg:w-[40%] lg:sticky lg:top-32 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-px bg-[#0a0a0a]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#71717a]">
                {dict.geo_map.badge}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0a0a0a] tracking-tight leading-[1.1] mb-6">
              {dict.geo_map.title}
            </h2>
            <p className="text-lg text-[#52525b] leading-relaxed mb-10">
              {dict.geo_map.desc}
            </p>

            {/* Live indicator */}
            <div className={`inline-flex items-center gap-3 px-5 py-3 bg-white border border-[#e4e4e7] rounded-full shadow-sm mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </div>
              <span className="text-[13px] font-bold text-[#0a0a0a] tracking-widest uppercase">
                {dict.geo_map.emergency_active}
              </span>
            </div>

            {/* Trust metrics */}
            <div className={`grid grid-cols-2 gap-4 ${isRTL ? 'rtl' : 'ltr'}`}>
              {[
                { value: dict.geo_map.reaktionszeit_value, label: dict.geo_map.reaktionszeit_label },
                { value: '100%', label: dict.geo_map.lokale_teams_label },
              ].map(({ value, label }) => (
                <div key={label} className="bg-[#fafafa] border border-[#e4e4e7] rounded-2xl p-6">
                  <p className="text-3xl font-black text-[#0a0a0a] tracking-tight mb-2">{value}</p>
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#71717a]">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: City Cards */}
          <div className="w-full lg:w-[60%]">
            <div className="grid grid-cols-1 gap-4">
              {cities.map((city, i) => (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link href={getLocalizedHref(`/${city.slug}`)} className="block group">
                    <div className={`bg-white border border-[#f4f4f5] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-6 transition-all duration-500 hover:border-[#0a0a0a] relative overflow-hidden ${isRTL ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
                      {/* Map Background Overlay */}
                      <div className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none">
                        <Image 
                          src={`/photos/map_${city.id}.jpg`} 
                          alt=""
                          fill
                          className="object-cover mix-blend-luminosity grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white/80" />
                      </div>

                      {/* City Marker */}
                      <div className={`flex items-center gap-5 flex-1 relative z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="relative flex-shrink-0">
                          <div className="w-14 h-14 bg-[#f4f4f5] rounded-2xl flex items-center justify-center group-hover:bg-[#fed01b] transition-all duration-500">
                            <MapPin className="w-6 h-6 text-[#0a0a0a]" />
                          </div>
                          {city.isPrimaryHub && (
                            <span className={`absolute -top-2 ${isRTL ? '-left-2' : '-right-2'} w-6 h-6 bg-white border-2 border-[#fed01b] rounded-full flex items-center justify-center shadow-sm`}>
                              <CheckCircle className="w-3.5 h-3.5 text-[#fed01b]" />
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className={`flex items-center gap-3 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <h3 className="text-xl md:text-2xl font-bold text-[#0a0a0a] transition-colors truncate">{city.name}</h3>
                            {city.isPrimaryHub && (
                              <span className="text-[9px] font-black tracking-[0.15em] uppercase bg-[#fed01b]/20 text-[#0a0a0a] px-2 py-1 rounded-full whitespace-nowrap">
                                {dict.geo_map.zentrale || 'Headquarters'}
                              </span>
                            )}
                          </div>
                          <p className={`text-[13px] text-[#71717a] font-mono truncate ${isRTL ? 'text-right' : 'text-left'}`}>
                            {city.location.address}, {city.location.postalCode}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className={`flex items-center gap-3 mt-4 sm:mt-0 relative z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `tel:${city.location.phone}`; }} className="w-12 h-12 rounded-full bg-[#f4f4f5] flex items-center justify-center group-hover:bg-[#0a0a0a] transition-colors duration-500">
                          <Phone className="w-5 h-5 text-[#52525b] group-hover:text-white transition-colors" />
                        </button>
                        <div className="w-12 h-12 rounded-full border border-[#e4e4e7] bg-white flex items-center justify-center shadow-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                          <ArrowRight className={`w-5 h-5 text-[#0a0a0a] ${isRTL ? 'rotate-180' : ''}`} />
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
