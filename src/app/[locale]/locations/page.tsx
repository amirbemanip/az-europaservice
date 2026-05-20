import React from 'react';
import { cities } from '@/data/db';
import { MapPin, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const seo = dict.seo?.locations;
  
  return {
    title: seo?.title || `${dict.nav.locations} | AZ-Europa Service GmbH`,
    description: seo?.description || dict.hero.desc,
  };
}

export default async function LocationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRTL = locale === 'fa' || locale === 'ar';

  return (
    <div className={`flex flex-col min-h-screen bg-[#f7f9fb] overflow-x-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* ── 1. REGIONAL HERO ── */}
      <section className="relative pt-32 pb-24 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fed01b]/20 to-transparent" />

        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10 text-center">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#fed01b] mb-6 block">
            {dict.geo_map.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-[-0.03em] leading-tight mb-8">
            {dict.geo_map.title.split(' ').slice(0, 2).join(' ')} <br />
            <span className="text-[#fed01b]">{dict.geo_map.title.split(' ').slice(2).join(' ')}</span>
          </h1>
          <p className="text-lg text-[#7c839b] max-w-2xl mx-auto leading-relaxed">
            {dict.geo_map.desc}
          </p>
        </div>
      </section>

      {/* ── 2. BRANCH GRID ── */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city) => (
              <div 
                key={city.id}
                className={`bg-white border border-[#e0e3e5] rounded-[6px] overflow-hidden group hover:border-[#fed01b] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {/* Visual Header */}
                <div className="h-48 relative overflow-hidden bg-slate-900">
                   <div className="absolute inset-0 opacity-40">
                      <Image 
                        src={`/photos/map_${city.id}.jpg`} 
                        alt={city.name} 
                        fill 
                        className="object-cover mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      />
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                   <div className={`absolute bottom-6 left-8 right-8 flex items-end justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-[#fed01b]/20">
                         <MapPin className="w-5 h-5 text-[#fed01b]" />
                      </div>
                      {city.isPrimaryHub && (
                        <span className="text-[9px] font-black tracking-widest uppercase bg-[#fed01b] text-[#0a0a0a] px-3 py-1.5 rounded-full shadow-sm">
                           {dict.geo_map.zentrale}
                        </span>
                      )}
                   </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-black text-[#0a0a0a] mb-2">{city.name}</h3>
                  <p className="text-sm font-medium text-[#76777d] mb-6">{city.location.address}, {city.location.postalCode} {city.name}</p>
                  
                  <div className={`space-y-4 pt-6 border-t border-[#f0f0f0] mb-8 ${isRTL ? 'rtl' : ''}`}>
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <ShieldCheck className="w-4.5 h-4.5 text-[#fed01b]" />
                      <span className="text-[13px] font-semibold text-[#45464d]">{dict.common.meisterbetrieb}</span>
                    </div>
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle className="w-4.5 h-4.5 text-[#fed01b]" />
                      <span className="text-[13px] font-semibold text-[#45464d]">{dict.common.answer_2h}</span>
                    </div>
                  </div>

                  <Link 
                    href={locale === 'de' ? `/${city.slug}` : `/${locale}/${city.slug}`}
                    className={`inline-flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] text-white text-[11px] font-bold tracking-[0.1em] uppercase rounded-[4px] hover:bg-[#fed01b] hover:text-[#0a0a0a] transition-all w-full justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {dict.common.open_details}
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. TRUST BANNER ── */}
      <section className="py-20 bg-white border-t border-[#e0e3e5]">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className="max-w-md">
              <h2 className="text-3xl font-black text-[#0a0a0a] mb-4">{dict.region_map.title_template.replace('{region}', dict.region_map.region_highlight)}</h2>
              <p className="text-[#76777d]">{dict.region_map.desc}</p>
            </div>
            <div className={`grid grid-cols-2 gap-8 ${isRTL ? 'rtl' : ''}`}>
              <div className="text-center">
                <p className="text-4xl font-black text-[#0a0a0a]">100%</p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#76777d] mt-1">{dict.region_map.teams_label}</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-[#0a0a0a]">&lt;30</p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#76777d] mt-1">{dict.geo_map.reaktionszeit_label}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
