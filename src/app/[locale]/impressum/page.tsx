import React from 'react';
import { getDictionary } from '@/lib/get-dictionary';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  return {
    title: `${dict.legal.impressum_title} | AZ-Europa Service GmbH`,
    description: dict.legal.impressum_desc,
  };
}

export default async function ImpressumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRTL = locale === 'fa' || locale === 'ar';

  return (
    <div className={`flex flex-col min-h-screen bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* ── SIMPLE DARK HERO ── */}
      <section className="relative pt-32 pb-16 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{dict.legal.impressum_title}</h1>
          <p className="text-[#7c839b] mt-4 text-lg">{dict.legal.impressum_desc}</p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <div className={`grid lg:grid-cols-3 gap-16 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <div className="lg:col-span-2 space-y-12 text-[#45464d] leading-relaxed">
              
              <div>
                <h2 className="text-2xl font-bold text-[#0a0a0a] mb-6">{dict.legal.angaben_tmg}</h2>
                <p className="font-bold text-[#0a0a0a]">AZ-Europa Service GmbH</p>
                <p>Apfelstraße 5</p>
                <p>91054 Erlangen</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0a0a0a] mb-6">{dict.legal.vertretung}</h2>
                <p className="font-bold text-[#0a0a0a]">{dict.legal.vertreten_durch}</p>
                <p>[Name des Geschäftsführers]</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0a0a0a] mb-6">{dict.legal.kontakt}</h2>
                <p>{dict.legal.telefon} 09131 6146235</p>
                <p>{dict.legal.email} info@az-europaservice.de</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0a0a0a] mb-6">{dict.legal.register}</h2>
                <p>Eintragung im Handelsregister.</p>
                <p>{dict.legal.registergericht} Amtsgericht Fürth</p>
                <p>{dict.legal.registernummer} [HRB Nummer]</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0a0a0a] mb-6">{dict.legal.ust_id}</h2>
                <p>{dict.legal.ust_id_desc}</p>
                <p>[Umsatzsteuer-ID]</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0a0a0a] mb-6">{dict.legal.streitschlichtung}</h2>
                <p>{dict.legal.streitschlichtung_desc}</p>
                <p className="mt-4">{dict.legal.streitschlichtung_disclaimer}</p>
              </div>

            </div>

            <div className="space-y-8">
              <div className={`p-8 bg-[#f7f9fb] border border-[#e0e3e5] rounded-[4px] ${isRTL ? 'text-right' : ''}`}>
                <h4 className="font-bold text-[#0a0a0a] mb-4 text-lg">{dict.legal.have_questions}</h4>
                <p className="text-sm text-[#76777d] mb-6">{dict.legal.questions_desc}</p>
                <a href="mailto:info@az-europaservice.de" className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.08em] uppercase text-[#0a0a0a] hover:text-[#fed01b] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {dict.legal.send_email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
