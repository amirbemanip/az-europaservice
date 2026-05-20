import React from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const seo = dict.seo?.karriere;
  
  return {
    title: seo?.title || `${dict.nav.karriere || dict.nav.career} | AZ-Europa Service GmbH`,
    description: seo?.description || dict.karriere.hero_desc,
  };
}

export default async function KarrierePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRTL = locale === 'fa' || locale === 'ar';

  return (
    <div className={`flex flex-col min-h-screen bg-white overflow-x-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fed01b]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <div className={`max-w-3xl ${isRTL ? 'mr-auto ml-0' : ''}`}>
            <span className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#fed01b] mb-6 block ${isRTL ? 'flex-row-reverse' : ''}`}>
              {dict.karriere.hero_badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-8">
              {dict.karriere.hero_title.split(' ').slice(0, 2).join(' ')} <br />
              <span className="text-[#fed01b]">{dict.karriere.hero_title.split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="text-lg text-[#7c839b] leading-relaxed">
              {dict.karriere.hero_desc}
            </p>
          </div>
        </div>
      </section>

      {/* ── JOBS LIST ── */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <h2 className="text-3xl font-black text-[#0a0a0a] mb-12">{dict.karriere.open_positions}</h2>
          
          <div className="grid gap-6">
            {dict.karriere.jobs.map((job: any, i: number) => (
              <div key={i} className={`p-8 bg-[#f7f9fb] border border-[#e0e3e5] rounded-[4px] hover:border-[#fed01b] transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#0a0a0a] group-hover:text-[#fed01b] transition-colors">{job.title}</h3>
                  <div className={`flex flex-wrap gap-4 text-[13px] text-[#76777d] ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <MapPin className="w-3.5 h-3.5" /> {job.location}
                    </div>
                    <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Clock className="w-3.5 h-3.5" /> {job.type}
                    </div>
                  </div>
                  <p className="text-sm text-[#45464d] max-w-xl">{job.desc}</p>
                </div>
                <Link href={locale === 'de' ? '/kontakt' : `/${locale}/kontakt`} className={`inline-flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] text-white text-[11px] font-bold tracking-[0.1em] uppercase rounded-[4px] hover:bg-[#fed01b] hover:text-[#0a0a0a] transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {dict.karriere.apply_now}
                  <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETAILED CONTENT (New) ── */}
      {dict.karriere.paragraphs && dict.karriere.paragraphs.length > 0 && (
        <section className="py-24 bg-[#f8f9fa] border-y border-[#eee]">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {dict.karriere.paragraphs.map((p: string, i: number) => {
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

      {/* ── BENEFITS ── */}
      <section className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{dict.karriere.benefits_title}</h2>
            <p className="text-[#7c839b]">{dict.karriere.benefits_subtitle}</p>
          </div>

          <div className={`grid md:grid-cols-3 gap-8 ${isRTL ? 'rtl' : ''}`}>
            {dict.karriere.benefits.map((benefit: any, i: number) => (
              <div key={i} className="p-8 bg-white/[0.03] border border-white/[0.06] rounded-[4px] text-center">
                <Star className="w-8 h-8 text-[#fed01b] mx-auto mb-4" />
                <h4 className="font-bold mb-2">{benefit.title}</h4>
                <p className="text-sm text-[#7c839b]">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
