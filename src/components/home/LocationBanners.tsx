"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowRight, Building2, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cities } from '@/data/db';

export function LocationBanners({ locale, dict }: { locale: string; dict: any }) {
  const isRTL = locale === 'fa' || locale === 'ar';
  
  // We only want the 3 main cities
  const mainCities = cities.filter(c => ['erlangen', 'nuernberg', 'bamberg'].includes(c.id));

  const getLocalizedHref = (path: string) => {
    if (locale === 'de') return path;
    return `/${locale}${path === '/' ? '' : path}`;
  };

  return (
    <section className="py-24 bg-[#f7f9fb] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        
        <div className="flex flex-col gap-24">
          {mainCities.map((city, idx) => {
            const isEven = idx % 2 === 0;
            const mapImage = `/photos/map_${city.id}.jpg`;
            
            return (
              <motion.div 
                key={city.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isEven ? '' : 'lg:flex-row-reverse'} ${isRTL ? 'rtl' : ''}`}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-8">
                  <div>
                    <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-12 h-px bg-[#fed01b]" />
                      <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#7c839b]">
                        {city.name} {dict.geo_map?.zentrale || 'Zentrale'}
                      </span>
                    </div>
                    <h2 className={`text-4xl md:text-5xl font-black text-[#0a0a0a] tracking-tight leading-tight ${isRTL ? 'text-right' : ''}`}>
                      {city.name}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className={`space-y-4 ${isRTL ? 'text-right' : ''}`}>
                      <div className={`flex items-center gap-3 text-[#0a0a0a] ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-[#e0e3e5]">
                          <MapPin className="w-4 h-4 text-[#fed01b]" />
                        </div>
                        <span className="font-bold text-[15px]">{city.location.address}</span>
                      </div>
                      <p className={`text-[14px] text-[#7c839b] font-medium ${isRTL ? 'pr-0 pl-11' : 'pl-11'}`}>
                        {city.location.postalCode} {city.name}
                      </p>
                    </div>

                    <div className={`space-y-4 ${isRTL ? 'text-right' : ''}`}>
                      <div className={`flex items-center gap-3 text-[#0a0a0a] ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-[#e0e3e5]">
                          <Phone className="w-4 h-4 text-[#fed01b]" />
                        </div>
                        <a href={`tel:${city.location.phone.replace(/\s+/g, '')}`} className="font-bold text-[15px] hover:text-[#fed01b] transition-colors">
                          {city.location.phone}
                        </a>
                      </div>
                      <p className={`text-[14px] text-[#7c839b] font-medium ${isRTL ? 'pr-0 pl-11' : 'pl-11'} uppercase tracking-wider`}>
                        {dict.service_page?.availability_days || '24/7 Erreichbar'}
                      </p>
                    </div>
                  </div>

                  <div className={`flex flex-wrap gap-4 pt-4 ${isRTL ? 'justify-end' : ''}`}>
                    <Link
                      href={getLocalizedHref(`/${city.slug}`)}
                      className={`inline-flex items-center gap-3 px-8 py-4 bg-[#0a0a0a] text-white rounded-full font-black text-[12px] tracking-[0.1em] uppercase hover:bg-[#fed01b] hover:text-[#0a0a0a] transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      {dict.header?.learn_more || 'Details ansehen'}
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                    
                    <a
                      href={city.location.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-3 px-8 py-4 bg-white border border-[#e0e3e5] text-[#0a0a0a] rounded-full font-bold text-[12px] tracking-[0.1em] uppercase hover:border-[#0a0a0a] transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <Globe className="w-4 h-4" />
                      {dict.header?.route_label || 'Route planen'}
                    </a>
                  </div>
                </div>

                {/* Map Imagery */}
                <div className="flex-1 relative w-full aspect-[4/3] lg:aspect-auto lg:h-[450px]">
                  <a 
                    href={city.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-[#0a0a0a] rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.12)] border border-[#e0e3e5] group/map"
                  >
                    <Image 
                      src={mapImage} 
                      alt={`Map of ${city.name}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/map:scale-110"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    
                    {/* Glass Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
                    
                    {/* Animated Pin Marker */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#fed01b] rounded-full animate-ping opacity-75 scale-150" />
                        <div className="relative w-8 h-8 bg-[#fed01b] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(254,208,27,0.5)]">
                          <MapPin className="w-4 h-4 text-[#0a0a0a]" />
                        </div>
                      </div>
                    </div>

                    {/* Floating Info Badge */}
                    <div className={`absolute bottom-8 ${isEven ? 'right-8' : 'left-8'} p-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hidden md:block`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#fed01b] flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-[#0a0a0a]" />
                        </div>
                        <div className={isRTL ? 'text-right' : ''}>
                          <p className="text-[10px] font-black tracking-widest text-[#fed01b] uppercase">{city.name} Office</p>
                          <p className="text-[13px] font-bold text-white leading-tight mt-0.5">{city.location.address}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
