"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

export function AsymmetricHero() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center py-16 lg:py-24 bg-[#f7f9fb] overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* ── LEFT: Typography & Trust ── */}
          <div className="flex flex-col gap-6">

            {/* Badge */}
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-[#eceef0] border border-[#c6c6cd] px-4 py-2 rounded-full w-fit">
              <CheckCircle className="w-4 h-4 text-[#fed01b] fill-[#fed01b]" />
              <span className="text-xs font-semibold tracking-[0.08em] uppercase text-[#191c1e]">
                Ihr Zertifizierter Meisterbetrieb
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-5xl sm:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] text-[#0a0a0a]"
            >
              Strahlende<br />Sauberkeit.<br />
              <span className="relative">
                Für Ihr Objekt.
                <svg className="absolute w-full h-2 -bottom-1 left-0 text-[#fed01b]/40" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 4 Q 50 8 100 4 L 100 8 L 0 8 Z" fill="currentColor" />
                </svg>
              </span>
            </motion.h1>

            {/* Subline */}
            <motion.p {...fadeUp(0.2)} className="text-lg text-[#45464d] leading-relaxed max-w-lg">
              Wir sind Ihr professioneller Partner für Reinigung und Gebäudemanagement in Franken. Höchste Präzision, verlässliche Ausführung.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-2.5 bg-[#fed01b] text-[#0a0a0a] font-semibold text-sm tracking-[0.06em] uppercase px-8 py-4 rounded-sm hover:bg-[#eec200] transition-colors duration-200"
              >
                Unverbindliches Angebot
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/leistungen"
                className="inline-flex items-center gap-2.5 bg-transparent text-[#0a0a0a] font-semibold text-sm tracking-[0.06em] uppercase px-8 py-4 rounded-sm border border-[#0a0a0a] hover:bg-[#eceef0] transition-colors duration-200"
              >
                Unsere Leistungen
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-wrap items-center gap-6 pt-6 mt-2 border-t border-[#c6c6cd]/40"
            >
              {[
                'TÜV Geprüft',
                '10+ Jahre Erfahrung',
                '100% Zuverlässig',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#eec200] fill-[#eec200] flex-shrink-0" />
                  <span className="text-sm font-medium text-[#45464d]">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Image + Floating Cards ── */}
          <div className="relative hidden lg:block h-[580px]">

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-sm overflow-hidden border border-[#c6c6cd]/50"
            >
              <Image
                src="/hero-bg.png"
                alt="Professionelle Reinigung – AZ-Europa Service GmbH"
                fill
                quality={75}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Subtle overlay for cleaner look */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/20 to-transparent" />
            </motion.div>

            {/* Floating Card: 1.500+ Projekte */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 120 }}
              className="absolute bottom-8 right-8 bg-[#f7f9fb] border border-[#c6c6cd] p-6 rounded-sm shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm"
            >
              <div className="flex items-center gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-[#fed01b] fill-[#fed01b]" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-2xl font-black text-[#0a0a0a] tracking-tight">1.500+</p>
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#76777d] mt-0.5">Erfolgreiche Projekte</p>
            </motion.div>

            {/* Floating Card: Meisterbetrieb */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, type: 'spring', stiffness: 120 }}
              className="absolute top-8 -left-10 bg-[#f7f9fb] border border-[#c6c6cd] p-5 rounded-sm shadow-[0_10px_30px_rgba(15,23,42,0.05)] flex items-start gap-3"
            >
              <div className="bg-[#fed01b]/20 p-2.5 rounded-full flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#0a0a0a]" />
              </div>
              <div>
                <p className="font-bold text-[#0a0a0a] text-sm leading-none mb-1">Meisterbetrieb</p>
                <p className="text-xs text-[#76777d]">Zertifiziert nach DIN EN ISO 9001</p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ── STATS BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="mt-16 pt-10 border-t border-[#c6c6cd]/40 hidden lg:flex gap-16"
        >
          {[
            { value: '10+', label: 'Jahre Expertise' },
            { value: '1.5k', label: 'Erfolgreiche Projekte' },
            { value: '24/7', label: 'Notdienst verfügbar' },
            { value: 'ISO', label: 'Zertifiziert & TÜV geprüft' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-black text-[#0a0a0a] tracking-tight">{value}</p>
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#76777d] mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

