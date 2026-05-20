import React from 'react';
import { macroServices } from '@/data/db';
import { SmartLeadForm } from '@/components/SmartLeadForm';
import { ArrowRight, Sparkles, Wrench, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';

const serviceIcons: Record<string, React.ElementType> = {
  reinigung: Sparkles,
  unterhaltsreinigung: Sparkles,
  glasreinigung: Sparkles,
  treppenhausreinigung: Sparkles,
  baureinigung: Sparkles,
  praxisreinigung: Sparkles,
  hausmeisterservice: Wrench,
};

export async function generateStaticParams() {
  return ['de', 'en', 'fa', 'ar', 'ru', 'uk'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const seo = dict.seo?.services;
  
  return {
    title: seo?.title || `${dict.nav.services} | AZ-Europa Service GmbH`,
    description: seo?.description || dict.leistungen.hero_desc,
  };
}

export default async function LeistungenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRTL = locale === 'fa' || locale === 'ar';
  
  const getLocalizedHref = (path: string) => {
    if (locale === 'de') return `/leistungen${path}`;
    return `/${locale}/leistungen${path}`;
  };
  
  return (
    <div className={`flex flex-col min-h-screen bg-[#f7f9fb] overflow-x-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fed01b]/20 to-transparent" />

        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <div className={`max-w-3xl ${isRTL ? 'mr-auto ml-0' : ''}`}>
            <span className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#fed01b] mb-6 block ${isRTL ? 'flex-row-reverse' : ''}`}>
               {dict.leistungen.hero_badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-[-0.03em] leading-tight mb-8">
              {dict.leistungen.hero_title.split(' ').slice(0, 2).join(' ')} <br />
              <span className="text-[#fed01b]">{dict.leistungen.hero_title.split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="text-lg text-[#7c839b] leading-relaxed">
              {dict.leistungen.hero_desc}
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {macroServices.map((macro) => {
              const Icon = serviceIcons[macro.id] || Sparkles;
              const localizedService = dict.services?.[macro.id] || {
                title: macro.title,
                description: macro.description,
              };

              return (
                <div 
                  key={macro.id}
                  className={`bg-white border border-[#e0e3e5] rounded-[6px] overflow-hidden group hover:border-[#fed01b] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <div className="p-8">
                    <div className={`w-14 h-14 bg-[#f7f9fb] rounded-[4px] flex items-center justify-center mb-6 group-hover:bg-[#fed01b] transition-colors ${isRTL ? 'mr-auto ml-0' : ''}`}>
                      <Icon className="w-6 h-6 text-[#0a0a0a]" />
                    </div>
                    <h3 className="text-2xl font-black text-[#0a0a0a] mb-4">{localizedService.title}</h3>
                    <p className="text-[#76777d] text-sm leading-relaxed mb-8">
                      {localizedService.description}
                    </p>
                    <ul className="space-y-3 mb-10">
                      {dict.leistungen.service_points.map((point: string, i: number) => (
                        <li key={i} className={`flex items-center gap-2 text-[13px] font-semibold text-[#45464d] ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <CheckCircle className="w-4 h-4 text-[#fed01b]" /> {point}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      href={getLocalizedHref(`/${macro.slug}`)}
                      className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-[#0a0a0a] group-hover:gap-3 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      {dict.leistungen.more_details}
                      <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DETAILED CONTENT (New) ── */}
      {dict.leistungen.paragraphs && dict.leistungen.paragraphs.length > 0 && (
        <section className="py-24 bg-white border-y border-[#e0e3e5]">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {dict.leistungen.paragraphs.map((p: string, i: number) => {
                  const isHeading = p.startsWith('**') && p.endsWith('**');
                  if (isHeading) {
                    return (
                      <h3 key={i} className="text-2xl md:text-3xl font-black text-[#0a0a0a] tracking-tight pt-8 first:pt-0">
                        {p.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  return (
                    <p key={i} className="text-[17px] text-[#45464d] leading-[1.8]">
                      {p}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA WITH FORM ── */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <div className={`grid lg:grid-cols-2 gap-20 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-8">
                {dict.leistungen.cta_title}
              </h2>
              <p className="text-[#7c839b] text-lg leading-relaxed mb-10">
                {dict.leistungen.cta_desc}
              </p>
              <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#7c839b] mb-1">{dict.leistungen.call_us}</p>
                  <p className="text-xl font-bold text-white tracking-tighter">09131 6146235</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#7c839b] mb-1">{dict.leistungen.write_us}</p>
                  <p className="text-xl font-bold text-white tracking-tighter">info@az-europaservice.de</p>
                </div>
              </div>
            </div>
            <div className={`w-full max-w-lg ${isRTL ? 'mr-auto ml-0' : 'lg:ml-auto'}`}>
               <div className="bg-white p-1 rounded-[6px]">
                  <SmartLeadForm locale={locale} dict={dict} />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
