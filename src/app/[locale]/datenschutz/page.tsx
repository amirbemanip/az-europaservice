import React from 'react';
import { getDictionary } from '@/lib/get-dictionary';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  return {
    title: `${dict.privacy.title} | AZ-Europa Service GmbH`,
    description: dict.privacy.subtitle,
  };
}

export default async function DatenschutzPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRTL = locale === 'fa' || locale === 'ar';

  return (
    <div className={`flex flex-col min-h-screen bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* ── SIMPLE DARK HERO ── */}
      <section className="relative pt-32 pb-16 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{dict.privacy.title}</h1>
          <p className="text-[#7c839b] mt-4 text-lg">{dict.privacy.subtitle}</p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <div className={`prose prose-slate max-w-3xl mx-auto text-[#45464d] ${isRTL ? 'rtl' : ''}`}>
            <h2 className="text-2xl font-bold text-[#0a0a0a]">{dict.privacy.section1_title}</h2>
            <h3 className="text-xl font-bold text-[#0a0a0a] mt-8">{dict.privacy.section1_subtitle}</h3>
            <p>{dict.privacy.section1_desc}</p>

            <h2 className="text-2xl font-bold text-[#0a0a0a] mt-12">{dict.privacy.section2_title}</h2>
            <p>{dict.privacy.section2_desc}</p>

            <h2 className="text-2xl font-bold text-[#0a0a0a] mt-12">{dict.privacy.section3_title}</h2>
            <h3 className="text-xl font-bold text-[#0a0a0a] mt-8">{dict.privacy.title}</h3>
            <p>{dict.privacy.section3_desc}</p>

            <h2 className="text-2xl font-bold text-[#0a0a0a] mt-12">{dict.privacy.section4_title}</h2>
            <h3 className="text-xl font-bold text-[#0a0a0a] mt-8">{dict.privacy.section4_subtitle}</h3>
            <p>{dict.privacy.section4_desc}</p>

            <h2 className="text-2xl font-bold text-[#0a0a0a] mt-12">{dict.privacy.section5_title}</h2>
            <h3 className="text-xl font-bold text-[#0a0a0a] mt-8">{dict.privacy.section5_subtitle}</h3>
            <p>{dict.privacy.section5_desc}</p>
            
            <div className={`mt-16 p-8 bg-[#f7f9fb] border border-[#e0e3e5] rounded-[4px] not-prose ${isRTL ? 'text-right' : ''}`}>
              <p className="text-sm font-bold text-[#0a0a0a]">
                {dict.privacy.status_label} {new Date().toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US')}
              </p>
              <p className="text-xs text-[#76777d] mt-2">{dict.privacy.update_note}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
