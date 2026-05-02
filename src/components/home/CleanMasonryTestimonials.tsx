"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Quote, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CleanMasonryTestimonials({ locale, dict }: { locale: string; dict: any }) {
  const isRTL = locale === 'fa' || locale === 'ar';

  const localizedTestimonials = dict.testimonials.items || [];

  return (
    <section className={`py-32 bg-white relative overflow-hidden border-t border-[#e0e3e5] ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">

        {/* Section Header */}
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <div className={`flex items-center gap-3 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 text-[#fed01b] fill-[#fed01b]" />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#0a0a0a]">5.0 / 5.0</span>
              <span className="text-sm text-[#76777d]">
                • {dict.testimonials.google_reviews}
              </span>
            </div>
            <h2 className="text-4xl md:text-[48px] font-black text-[#0a0a0a] tracking-[-0.02em] leading-[1.1] mb-5">
              {dict.testimonials.title}
            </h2>
            <p className="text-lg text-[#45464d] leading-relaxed">
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
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0a0a0a] border border-[#0a0a0a] px-6 py-3 rounded-sm hover:bg-[#0a0a0a] hover:text-white transition-all duration-300"
            >
              {dict.testimonials.all_reviews}
              <ArrowRight className={`w-4 h-4 group-hover:translate-x-0.5 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </motion.div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {localizedTestimonials.map((t: any, i: number) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`${t.span} bg-white border border-[#e0e3e5] rounded-sm p-7 flex flex-col justify-between relative group hover:border-[#0a0a0a] transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.05)]`}
            >
              {/* Quote icon */}
              <Quote className={`absolute top-5 ${isRTL ? 'left-5' : 'right-5'} w-10 h-10 text-[#f2f4f6] group-hover:text-[#fed01b]/10 transition-colors duration-500`} />

              <div>
                {/* Stars */}
                <div className={`flex gap-0.5 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-[#fed01b] fill-[#fed01b]" />
                  ))}
                </div>
                {/* Content */}
                <p className={`text-[#45464d] leading-relaxed text-[15px] ${isRTL ? 'text-right' : 'text-left'}`}>
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className={`mt-6 pt-5 border-t border-[#e0e3e5] flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-[#0a0a0a] flex items-center justify-center text-white text-xs font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h4 className="font-bold text-[#0a0a0a] text-sm">{t.name}</h4>
                    <p className="text-xs text-[#76777d]">{t.role} • {t.service}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-[10px] font-bold border border-green-100 tracking-wide uppercase ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <ShieldCheck className="w-3 h-3" />
                  {dict.testimonials.verified}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
