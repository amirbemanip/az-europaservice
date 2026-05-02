"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function CleanHeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Very subtle background gradient to break pure white */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 z-0 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        <div className="w-full lg:w-1/2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-brand-navy text-sm font-semibold tracking-wide"
          >
            <ShieldCheck className="w-4 h-4 text-brand-yellow" />
            Ihr Zertifizierter Meisterbetrieb
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold leading-[1.1] text-brand-navy tracking-tight"
          >
            Strahlende <br />
            <span className="text-brand-yellow relative">
              Sauberkeit
              <span className="absolute bottom-1 left-0 w-full h-3 bg-brand-yellow/20 -z-10 rounded-sm"></span>
            </span> <br />
            Für Ihr Objekt.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-xl leading-relaxed"
          >
            Wir sind Ihr professioneller und erfahrener Partner für Reinigung und Gebäudemanagement. Von der Büroreinigung bis zum kompletten Hausmeisterservice in Franken.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Link href="/kontakt" className="px-8 py-4 bg-brand-yellow text-brand-navy text-center rounded-xl font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              Unverbindliches Angebot
            </Link>
            <Link href="#leistungen" className="px-8 py-4 bg-white border border-slate-200 text-slate-700 text-center rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors">
              Unsere Leistungen
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-6 pt-6 text-sm text-slate-500 font-medium"
          >
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> TÜV Geprüft</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> 10+ Jahre Erfahrung</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> 100% Zuverlässig</span>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 relative"
        >
          {/* A clean, bright image container */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <Image 
              src="/hero-bg.png" 
              alt="AZ Europa Premium Reinigung" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          
          {/* Floating Trust Card */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">
                  U
                </div>
              ))}
            </div>
            <div>
              <p className="font-bold text-brand-navy">1.500+ Projekte</p>
              <div className="flex text-brand-yellow">
                {"★★★★★".split('').map((s,i) => <span key={i}>{s}</span>)}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
