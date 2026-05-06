"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Hammer, Trash2, Leaf, Home, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { macroServices } from '@/data/db';

const icons = [Sparkles, Home, Hammer, Trash2, Leaf, ShieldCheck];

export function AdvancedBentoGrid() {
  return (
    <section className="py-32 relative bg-brand-black z-20 overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-navy/80 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-yellow text-sm font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(250,204,21,0.1)]">
            Unsere Kernkompetenzen
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
            Exzellenz in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">jedem Detail.</span>
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-xl font-light">
            Als Full-Service Dienstleister in Franken übernehmen wir nicht nur die Reinigung, sondern die komplette Pflege und den Erhalt Ihrer Immobilie.
          </p>
        </motion.div>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          {macroServices.slice(0, 6).map((macro, index) => {
            const Icon = icons[index % icons.length] || Zap;
            // Determine bento sizing rules to create an asymmetric, modern look
            let spanClass = "md:col-span-1 md:row-span-1";
            if (index === 0) spanClass = "md:col-span-2 md:row-span-2"; // Featured 1
            else if (index === 1) spanClass = "md:col-span-2 md:row-span-1"; // Featured 2
            
            return (
              <motion.div 
                key={macro.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                className={`${spanClass} group relative overflow-hidden rounded-3xl glass-card flex flex-col p-8 md:p-10`}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-all duration-500 shadow-lg">
                      <Icon className="w-7 h-7 text-brand-yellow group-hover:text-brand-black transition-colors" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                      {macro.title}
                    </h3>
                  </div>
                  
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <p className={`text-slate-400 font-light ${index === 0 ? 'text-lg line-clamp-4' : 'text-sm line-clamp-2'}`}>
                      {macro.description}
                    </p>
                    <Link href={`/de/leistungen/${macro.slug}`} className="mt-6 flex items-center text-brand-yellow text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Mehr erfahren <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                    </Link>
                  </div>
                </div>

                {/* Decorative border line that animates on hover */}
                <div className="absolute bottom-0 left-0 h-1 bg-brand-yellow w-0 group-hover:w-full transition-all duration-700 ease-out" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
