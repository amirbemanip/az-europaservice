"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Clock, MapPin, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CinematicHeroProps {
  locale: string;
  badge?: string;
  title: string;
  subtitle?: string;
  description: string;
  backgroundImage: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  trustItems?: { icon: any; text: string }[];
  isRTL?: boolean;
  breadcrumbs?: React.ReactNode;
  align?: 'center' | 'start';
}

export function CinematicHeroParallax({
  locale,
  badge,
  title,
  subtitle,
  description,
  backgroundImage,
  ctaPrimary,
  ctaSecondary,
  trustItems,
  isRTL = false,
  breadcrumbs,
  align = 'center'
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const defaultTrustItems = [
    { icon: Shield, text: "TÜV Geprüft" },
    { icon: Clock, text: "Express Service" },
    { icon: MapPin, text: "Lokale Teams" }
  ];

  const itemsToDisplay = trustItems || defaultTrustItems;

  const getLocalizedHref = (path: string) => {
    if (locale === 'de') return path;
    return `/${locale}${path === '/' ? '' : path}`;
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[75vh] md:min-h-[85vh] flex flex-col items-center justify-start overflow-hidden bg-[#f7f9fb]"
    >
      {/* ── BACKGROUND LAYER (CINEMATIC LIGHT) ── */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0 w-full h-[120%]"
      >
        <Image 
          src={backgroundImage} 
          alt={title} 
          fill 
          priority
          quality={90}
          className="object-cover opacity-25 object-center mix-blend-multiply"
          sizes="100vw"
        />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#0a0a0a 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        
        {/* Deep shadows and gradients for light mode */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f9fb]/90 via-transparent to-[#fafafa]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f9fb]/50 via-transparent to-[#f7f9fb]/50" />
        
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#fed01b]/10 rounded-full blur-[150px] pointer-events-none" />
      </motion.div>

      {/* ── CONTENT LAYER ── */}
      <motion.div 
        style={{ opacity: opacityText, y: yText }}
        className={`container mx-auto px-6 relative z-10 pt-36 pb-24 flex flex-col ${align === 'start' ? 'items-start text-left' : 'items-center text-center'}`}
      >
        <div className={`max-w-[1000px] w-full flex flex-col ${align === 'start' ? 'items-start' : 'items-center'} ${isRTL ? 'rtl' : 'ltr'}`}>
          
          {/* Breadcrumbs (Optional) */}
          {breadcrumbs && (
            <div className="mb-6 opacity-80 hover:opacity-100 transition-opacity">
              {breadcrumbs}
            </div>
          )}
          
          {/* Top Badge (Liquid Glass Light) */}
          {badge && (
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-black/5 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 fill-[#fed01b] text-[#fed01b]" />
                ))}
              </div>
              <span className="w-px h-3 bg-black/10" />
              <span className="text-slate-600 text-[11px] font-bold tracking-[0.15em] uppercase">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Epic Typography (High-Contrast Charcoal) */}
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-[76px] font-black leading-[1.08] tracking-tight text-[#0a0a0a] mb-8"
          >
            {title} {subtitle && <br className="hidden md:block"/>}
            {subtitle && (
              <span className="relative inline-block mt-2">
                <span className="absolute inset-0 bg-gradient-to-r from-[#fed01b] to-[#f59e0b] blur-2xl opacity-20" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#0a0a0a] via-[#f59e0b] to-[#fed01b]">
                  {subtitle}
                </span>
              </span>
            )}
          </motion.h1>

          {/* Description (Readability Focus) */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`text-base md:text-xl text-[#4a5568] max-w-3xl leading-[1.65] font-medium ${align === 'start' ? (isRTL ? 'text-right' : 'text-left') : 'mx-auto text-center'}`}
          >
            {description}
          </motion.p>

          {/* Buttons & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col sm:flex-row items-center ${align === 'start' ? 'justify-start' : 'justify-center'} gap-4 mt-12 w-full ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          >
            {ctaPrimary && (
              <Link 
                href={ctaPrimary.href} 
                className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#fed01b] text-[#0a0a0a] rounded-full font-black text-[13px] tracking-[0.1em] uppercase overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(254,208,27,0.35)] hover:shadow-[0_15px_40px_rgba(254,208,27,0.5)] ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                {ctaPrimary.label}
                <ChevronRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            )}

            {ctaSecondary && (
              <Link 
                href={ctaSecondary.href} 
                className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 border border-black/10 text-[#0a0a0a] rounded-full font-bold text-[13px] tracking-[0.1em] uppercase backdrop-blur-xl hover:bg-white hover:border-black/20 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {ctaSecondary.label}
                <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                  <ChevronRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </Link>
            )}
          </motion.div>

          {/* Minimal Trust Indicators (Clean Slate Borders) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className={`flex flex-wrap items-center ${align === 'start' ? 'justify-start' : 'justify-center'} gap-8 mt-16 pt-8 border-t border-black/5 w-full max-w-4xl ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {itemsToDisplay.map((item, idx) => (
              <div key={idx} className={`flex items-center gap-3 text-slate-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <item.icon className="w-4 h-4 text-[#fed01b]" />
                <span className="text-[13px] font-bold uppercase tracking-wider">{item.text}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </motion.div>

      {/* ── BOTTOM FADE OUT ── */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fafafa] to-transparent z-10" />
    </section>
  );
}
