"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Quote, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CleanMasonryTestimonials({ locale, dict }: { locale: string; dict: any }) {
  const isRTL = locale === 'fa' || locale === 'ar';

  const localizedTestimonials = dict.testimonials.items || [];

  return (
    <section className={`py-32 bg-[#fafafa] relative overflow-hidden border-t border-[#f4f4f5] ${isRTL ? 'text-right' : 'text-left'}`}>
      
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
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 text-[#fed01b] fill-[#fed01b]" />
                ))}
              </div>
              <span className="text-[13px] font-bold text-[#0a0a0a] tracking-widest">5.0 / 5.0</span>
              <span className="text-[11px] text-[#71717a] uppercase tracking-[0.1em]">
                • {dict.testimonials.google_reviews}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0a0a0a] tracking-tight leading-[1.1] mb-6">
              {dict.testimonials.title}
            </h2>
            <p className="text-lg text-[#52525b] leading-relaxed">
              {dict.testimonials.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="https://www.google.com/maps/place/AZ+-+Europa+Service+GmbH"
              target="_blank"
              className={`group inline-flex items-center gap-3 text-[12px] font-black tracking-[0.1em] uppercase text-[#0a0a0a] border border-[#e4e4e7] bg-white shadow-sm px-8 py-4 rounded-full hover:bg-[#0a0a0a] hover:text-white transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {dict.testimonials.all_reviews || 'Alle Bewertungen'}
              <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </motion.div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {localizedTestimonials.map((t: any, i: number) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`${t.span} group bg-white border border-[#f4f4f5] rounded-3xl p-8 flex flex-col justify-between relative hover:border-[#0a0a0a] transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_80px_rgb(0,0,0,0.08)] hover:-translate-y-1`}
            >
              {/* Quote icon */}
              <Quote className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} w-12 h-12 text-[#f4f4f5] group-hover:text-[#fed01b]/20 transition-colors duration-500`} />

              <div>
                {/* Stars */}
                <div className={`flex gap-1 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-[#fed01b] fill-[#fed01b]" />
                  ))}
                </div>
                {/* Content */}
                <p className={`text-[#3f3f46] leading-[1.7] text-[15px] font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className={`mt-8 pt-6 border-t border-[#f4f4f5] flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-full bg-[#0a0a0a] flex items-center justify-center text-white text-sm font-black shadow-md">
                    {t.name.charAt(0)}
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h4 className="font-bold text-[#0a0a0a] text-base group-hover:text-[#fed01b] transition-colors">{t.name}</h4>
                    <p className="text-[11px] text-[#71717a] tracking-wider uppercase mt-1">{t.role} • {t.service}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 bg-[#fed01b]/10 text-[#0a0a0a] px-3 py-1.5 rounded-full text-[9px] font-black border border-[#fed01b]/30 tracking-[0.1em] uppercase shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0a0a0a]" />
                  {dict.testimonials.verified || 'Verified'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
