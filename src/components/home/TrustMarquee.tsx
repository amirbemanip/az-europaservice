"use client";

import React from 'react';
import { motion } from 'framer-motion';

const clients = ['DATEV', 'Siemens', 'FAU Erlangen', 'adidas', 'PUMA', 'Schaeffler', 'IHK', 'Klinikum'];

export function TrustMarquee({ dict }: { dict: any }) {
  return (
    <section className="border-y border-white/5 bg-[#0a0a0a] py-10 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#71717a] text-center mb-8">
          {dict.trust.badge}
        </p>
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
            className="flex items-center gap-16 whitespace-nowrap"
          >
            {[...clients, ...clients].map((name, i) => (
              <span
                key={i}
                className="text-xl font-black tracking-tight text-white opacity-20 hover:opacity-50 transition-opacity duration-300 flex-shrink-0"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
