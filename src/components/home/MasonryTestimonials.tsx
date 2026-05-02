"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export function MasonryTestimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sybille H.",
      service: "Büroreinigung in Erlangen",
      content: "Wir sind Neukunden. Sehr gründliche Reinigung, professionell und sehr freundlich. Wir sind sehr zufrieden.",
      rating: 5,
      colSpan: "md:col-span-1"
    },
    {
      id: 2,
      name: "Dostapix Fotografie",
      service: "Grundreinigung in Erlangen",
      content: "Sie sind alle superfreundlich, superschnell und professionell. Es ist alles blitzesauber. Es läuft offiziell mit Vertrag und MwSt. Das war mir wichtig. Preis Leistung ist top! Bin sehr zufrieden und glücklich. Ich kann sie von Herzen weiterempfehlen.",
      rating: 5,
      colSpan: "md:col-span-2"
    },
    {
      id: 3,
      name: "Sasan",
      service: "Treppenhausreinigung in Erlangen",
      content: "Hervorragender Reinigungsservice. Ich bin absolut zufrieden mit der Arbeit. Die Treppenhäuser und Flächen sind immer blitzsauber und gepflegt. Besonders beeindruckt mich die Sorgfalt und das Auge fürs Detail.",
      rating: 5,
      colSpan: "md:col-span-2"
    },
    {
      id: 4,
      name: "Andreas",
      service: "Gebäudereinigung in Erlangen",
      content: "Der beste Dienstleister für Gebäudereinigung in Erlangen.",
      rating: 5,
      colSpan: "md:col-span-1"
    },
    {
      id: 5,
      name: "Ya",
      service: "Grundreinigung in Nürnberg",
      content: "Ich bin sehr zufrieden mit AZ-Europa Service, ich habe eine Grundreinigung bei AZ bestellt, und jetzt glänzt meine Wohnung.",
      rating: 5,
      colSpan: "md:col-span-1"
    },
    {
      id: 6,
      name: "Leliana",
      service: "Grundreinigung in Erlangen",
      content: "Unser privater Haushalt wurde gründlich gereinigt. Hauptsächlich ging es um Polster, Parkettböden, Teppiche und Fenster. Die Qualität der Arbeit war hervorragend, und das zu einem fairen Preis.",
      rating: 5,
      colSpan: "md:col-span-2"
    }
  ];

  return (
    <section className="py-32 bg-brand-navy relative overflow-hidden z-20">
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-black rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-sm font-bold tracking-widest uppercase mb-6">
              Kundenstimmen
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
              Bewiesene <span className="text-brand-yellow">Qualität.</span>
            </h2>
            <p className="text-slate-400 text-lg font-light">
              Verifizierte Bewertungen unserer Kunden aus Erlangen, Nürnberg und Umgebung. Wahre Qualität spricht für sich selbst.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full bg-brand-slate border-2 border-brand-navy flex items-center justify-center text-xs font-bold text-slate-500">
                  User
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-brand-yellow mb-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-white font-bold text-sm">4.9/5 von 200+ Kunden</span>
            </div>
          </motion.div>
        </div>

        {/* Masonry-Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
              className={`glass-card p-8 rounded-3xl relative group flex flex-col justify-between ${testimonial.colSpan}`}
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-yellow/10 group-hover:text-brand-yellow/20 transition-colors duration-500" />
              
              <div>
                <div className="flex text-brand-yellow mb-6">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 text-lg leading-relaxed font-light italic relative z-10 mb-8">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-auto">
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-brand-yellow text-xs uppercase tracking-wider font-semibold mt-1">
                    {testimonial.service}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Verifiziert
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
