"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowUpRight, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { cities } from '@/data/db';

export function CleanGeoMap({ locale, dict }: { locale: string; dict: any }) {
  const isRTL = locale === 'fa' || locale === 'ar';

  const getLocalizedHref = (path: string) => {
    if (locale === 'de') return path;
    return `/${locale}${path}`;
  };

  return (
    <section className={`py-32 bg-[#f7f9fb] relative overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(#c6c6cd 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
        <div className={`flex flex-col lg:flex-row gap-16 items-start ${isRTL ? 'lg:flex-row-reverse' : ''}`}>

          {/* Left: Title */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`w-full lg:w-[35%] lg:sticky lg:top-32 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#76777d] mb-4 block">
              {dict.geo_map.badge}
            </span>
            <h2 className="text-4xl md:text-[48px] font-black text-[#0a0a0a] tracking-[-0.02em] leading-[1.1] mb-6">
              {dict.geo_map.title}
            </h2>
            <p className="text-lg text-[#45464d] leading-relaxed mb-8">
              {dict.geo_map.desc}
            </p>

            {/* Live indicator */}
            <div className={`flex items-center gap-3 px-4 py-3 bg-white border border-[#e0e3e5] rounded-sm w-fit ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </div>
              <span className="text-sm font-semibold text-[#0a0a0a]">
                {dict.geo_map.emergency_active}
              </span>
            </div>

            {/* Trust metrics */}
            <div className={`grid grid-cols-2 gap-4 mt-8 ${isRTL ? 'rtl' : 'ltr'}`}>
              {[
                { value: dict.geo_map.reaktionszeit_value, label: dict.geo_map.reaktionszeit_label },
                { value: '100%', label: dict.geo_map.lokale_teams_label },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white border border-[#e0e3e5] rounded-sm p-4">
                  <p className="text-2xl font-black text-[#0a0a0a] tracking-tight">{value}</p>
                  <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#76777d] mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: City Cards */}
          <div className="w-full lg:w-[65%]">
            <div className="grid grid-cols-1 gap-5">
              {cities.map((city, i) => (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                >
                  <Link href={getLocalizedHref(`/${city.slug}`)} className="block group">
                    <div className={`bg-white border border-[#e0e3e5] rounded-sm p-8 flex flex-col sm:flex-row sm:items-center gap-6 transition-all duration-500 hover:border-[#0a0a0a] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] ${isRTL ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>

                      {/* City Marker */}
                      <div className={`flex items-center gap-5 flex-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="relative">
                          <div className="w-14 h-14 bg-[#f2f4f6] rounded-sm flex items-center justify-center group-hover:bg-[#fed01b] transition-colors duration-300">
                            <MapPin className="w-6 h-6 text-[#0a0a0a]" />
                          </div>
                          {city.isPrimaryHub && (
                            <span className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-5 h-5 bg-[#fed01b] rounded-full flex items-center justify-center`}>
                              <CheckCircle className="w-3 h-3 text-[#0a0a0a]" />
                            </span>
                          )}
                        </div>
                        <div>
                          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <h3 className="text-xl font-bold text-[#0a0a0a]">{city.name}</h3>
                            {city.isPrimaryHub && (
                              <span className="text-[10px] font-semibold tracking-[0.1em] uppercase bg-[#fed01b]/10 text-[#0a0a0a] px-2 py-0.5 rounded-full border border-[#fed01b]/20">
                                {dict.geo_map.zentrale}
                              </span>
                            )}
                          </div>
                          <p className={`text-sm text-[#76777d] mt-0.5 font-mono ${isRTL ? 'text-right' : 'text-left'}`}>
                            {city.location.address}, {city.location.postalCode} {city.location.city}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `tel:${city.location.phone}`; }} className="w-10 h-10 rounded-sm bg-[#f2f4f6] flex items-center justify-center group-hover:bg-[#0a0a0a] transition-colors duration-300">
                          <Phone className="w-4 h-4 text-[#76777d] group-hover:text-white transition-colors" />
                        </button>
                        <div className="w-10 h-10 rounded-sm border border-[#e0e3e5] flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 bg-white">
                          <ArrowUpRight className={`w-4 h-4 text-[#0a0a0a] ${isRTL ? 'rotate-[-90deg]' : ''}`} />
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
