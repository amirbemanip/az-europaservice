"use client";

import React from 'react';
import { motion } from 'framer-motion';

const clients = ['DATEV', 'Siemens', 'FAU Erlangen', 'adidas', 'PUMA', 'Schaeffler', 'IHK', 'Klinikum'];

export function TrustMarquee({ dict }: { dict: any }) {
  return (
    <section className="border-y border-[#c6c6cd]/60 bg-[#eceef0] py-10 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#76777d] text-center mb-8">
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
                className="text-xl font-black tracking-tight text-[#191c1e] opacity-20 hover:opacity-40 transition-opacity duration-300 flex-shrink-0"
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
