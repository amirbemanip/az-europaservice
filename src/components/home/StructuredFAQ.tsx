"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

export function StructuredFAQ({ locale, dict }: { locale: string; dict: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isRTL = locale === 'fa' || locale === 'ar';

  const localizedFaqs = dict.faq.items || [];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": localizedFaqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <section className={`py-32 relative bg-[#0a0a0a] z-20 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-white/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 mx-auto bg-[#fed01b]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#fed01b]/20 shadow-[0_0_30px_rgba(254,208,27,0.15)]">
              <MessageCircleQuestion className="w-8 h-8 text-[#fed01b]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              {dict.faq.title}
            </h2>
            <p className="text-slate-400 text-lg font-light">
              {dict.faq.subtitle}
            </p>
          </motion.div>

          <div className="space-y-4">
            {localizedFaqs.map((faq: any, index: number) => {
              const isOpen = openIndex === index;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white/5 border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#fed01b]/40 bg-white/10 shadow-[0_10px_30px_rgba(254,208,27,0.05)]' : 'border-white/5'}`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={`w-full px-6 py-5 flex items-center justify-between focus:outline-none ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                  >
                    <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-[#fed01b]' : 'text-slate-200'}`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#fed01b] text-[#0a0a0a] rotate-180' : 'bg-white/5 text-slate-400'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className={`px-6 pb-6 pt-2 text-slate-400 font-light leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                          <div className={`w-12 h-[1px] bg-[#fed01b]/30 mb-4 ${isRTL ? 'mr-auto' : ''}`} />
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
    </>
  );
}
