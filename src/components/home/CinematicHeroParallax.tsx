"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CinematicHeroParallax({ locale, dict }: { locale: string, dict: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const isRTL = locale === 'fa' || locale === 'ar';

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const trustItems = [
    { icon: Shield, text: dict.hero.trust.tuv },
    { icon: Clock, text: dict.hero.trust.fast },
    { icon: CheckCircle2, text: dict.hero.trust.custom },
    { icon: MapPin, text: dict.hero.trust.local }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0 w-full h-[120%]"
      >
        <Image 
          src="/hero-bg.png" 
          alt="AZ Europa Premium Service" 
          fill 
          priority
          quality={100}
          className="object-cover opacity-40 object-center"
        />
        {/* Complex Gradient Overlays for Cinematic Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a0a0a_100%)]" />
      </motion.div>

      {/* Floating Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#fed01b]/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#fed01b]/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Main Content */}
      <motion.div 
        style={{ opacity: opacityText, y: yText }}
        className="container mx-auto px-6 relative z-10 pt-20"
      >
        <div className={`max-w-5xl mx-auto text-center space-y-10 ${isRTL ? 'rtl' : 'ltr'}`}>
          
          {/* Micro-Interaction Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.05)] ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fed01b] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fed01b]"></span>
            </div>
            <span className="text-white text-sm font-semibold tracking-widest uppercase">
              {dict.hero.badge}
            </span>
          </motion.div>

          {/* Epic Typography */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[100px] font-extrabold leading-[1.05] tracking-tight text-white"
          >
            {dict.hero.title} <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fed01b] to-yellow-600 text-glow inline-block mt-2">
              {dict.hero.subtitle}
            </span>
          </motion.h1>

          {/* Original Site SEO Text - Enhanced */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            {dict.hero.desc}
          </motion.p>

          {/* High-End Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-wrap items-center justify-center gap-6 pt-6 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {trustItems.map((item, idx) => (
              <div key={idx} className={`flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5 hover:border-[#fed01b]/30 hover:bg-white/10 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <item.icon className="w-5 h-5 text-[#fed01b]" />
                <span className="text-sm font-medium text-slate-200">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pt-8"
          >
            <Link href={locale === 'de' ? '/kontakt' : `/${locale}/kontakt`} className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#fed01b] text-[#0a0a0a] rounded-2xl font-bold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(254,208,27,0.3)]">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              {dict.hero.cta_primary}
              <span className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`}>→</span>
            </Link>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
