"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface LocationMapSectionProps {
  city: any;
  dict: any;
  locale: string;
  isRTL?: boolean;
}

export function LocationMapSection({ city, dict, locale, isRTL = false }: LocationMapSectionProps) {
  const mapImage = `/photos/map_${city.slug}.jpg`;
  const mapsUrl = city.location.googleMapsUrl;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={isRTL ? 'text-right' : ''}
          >
            <span className="text-[#fed01b] text-[11px] font-bold tracking-[0.2em] uppercase mb-4 block">
              {dict.service_page.local_presence_title}
            </span>
            <h2 className="text-4xl font-black text-[#0a0a0a] tracking-tight mb-6">
              {dict.service_page.availability_title} {city.name}
            </h2>
            <p className="text-lg text-[#45464d] leading-relaxed mb-8">
              {dict.service_page.availability_desc}
            </p>
            
            <div className="space-y-6">
              <div className={`flex items-start gap-4 p-4 rounded-xl border border-[#e0e3e5] hover:border-[#fed01b]/50 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-[#fed01b]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#fed01b]" />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="font-bold text-[#0a0a0a]">{city.name} {dict.service_page.branch_label}</p>
                  <p className="text-sm text-[#76777d]">{city.location.address}, {city.location.postalCode} {city.name}</p>
                </div>
              </div>

              <div className={`flex items-start gap-4 p-4 rounded-xl border border-[#e0e3e5] hover:border-[#fed01b]/50 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-[#fed01b]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#fed01b]" />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="font-bold text-[#0a0a0a]">{dict.service_page.consultation_badge}</p>
                  <a href={`tel:${city.location.phone.replace(/\s+/g, '')}`} className="text-sm text-[#76777d] hover:text-[#fed01b] transition-colors">
                    {city.location.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className={`mt-10 ${isRTL ? 'text-right' : ''}`}>
              <a 
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-3 px-8 py-4 bg-[#0a0a0a] text-white rounded-full font-bold text-[13px] tracking-[0.1em] uppercase hover:bg-[#fed01b] hover:text-[#0a0a0a] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)] group ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {dict.common.open_details || 'Auf Google Maps öffnen'}
                <ExternalLink className={`w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform`} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative h-[450px] rounded-2xl overflow-hidden border border-[#e0e3e5] shadow-2xl">
              <Image 
                src={mapImage} 
                alt={`Karte von ${city.name}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 border-[12px] border-white/10 rounded-2xl pointer-events-none" />
              
              {/* Link overlay */}
              <a 
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0a0a0a]/40 backdrop-blur-[2px]"
              >
                <div className="bg-white text-[#0a0a0a] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Route planen
                </div>
              </a>
            </div>

            {/* Decorative dots */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#fed01b]/5 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#fed01b]/5 rounded-full blur-2xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
