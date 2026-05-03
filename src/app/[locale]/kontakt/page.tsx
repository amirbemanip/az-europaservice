import dynamic from 'next/dynamic';
const SmartLeadForm = dynamic(() => import('@/components/SmartLeadForm').then(mod => mod.SmartLeadForm), { ssr: false });
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare } from 'lucide-react';
import { cities } from '@/data/db';
import { getDictionary } from '@/lib/get-dictionary';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  return {
    title: `${dict.nav.contact} | AZ-Europa Service GmbH`,
    description: dict.kontakt.hero_desc,
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRTL = locale === 'fa' || locale === 'ar';

  return (
    <div className={`flex flex-col min-h-screen bg-[#f7f9fb] overflow-x-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* ── 1. CONTACT HERO ── */}
      <section className="relative pt-32 pb-20 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fed01b]/20 to-transparent" />

        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10 text-center">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#fed01b] mb-6 block">{dict.kontakt.hero_badge}</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-[-0.03em] leading-tight mb-6">
            {dict.kontakt.hero_title.split(' ').slice(0, 2).join(' ')} <br />
            <span className="text-[#fed01b]">{dict.kontakt.hero_title.split(' ').slice(2).join(' ')}</span>
          </h1>
          <p className="text-lg text-[#7c839b] max-w-2xl mx-auto">
            {dict.kontakt.hero_desc}
          </p>
        </div>
      </section>

      {/* ── 2. MAIN CONTACT GRID ── */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <div className={`grid lg:grid-cols-5 gap-12 lg:gap-20 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Left: Info & Locations */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h3 className="text-2xl font-black text-[#0a0a0a] mb-8">{dict.kontakt.direct_channels}</h3>
                <div className="space-y-6">
                  <a href="tel:+4991316146235" className={`flex items-center gap-4 p-6 bg-white border border-[#e0e3e5] rounded-[4px] hover:border-[#fed01b] transition-all group ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 rounded-full bg-[#f7f9fb] flex items-center justify-center group-hover:bg-[#fed01b]/10 transition-colors">
                      <Phone className="w-5 h-5 text-[#0a0a0a]" />
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#76777d] mb-0.5">{dict.kontakt.hotline_label}</p>
                      <p className="text-lg font-bold text-[#0a0a0a]">09131 6146235</p>
                    </div>
                  </a>
                  <a href="mailto:info@az-europaservice.de" className={`flex items-center gap-4 p-6 bg-white border border-[#e0e3e5] rounded-[4px] hover:border-[#fed01b] transition-all group ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 rounded-full bg-[#f7f9fb] flex items-center justify-center group-hover:bg-[#fed01b]/10 transition-colors">
                      <Mail className="w-5 h-5 text-[#0a0a0a]" />
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#76777d] mb-0.5">{dict.kontakt.email_label}</p>
                      <p className="text-lg font-bold text-[#0a0a0a]">info@az-europaservice.de</p>
                    </div>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-[#0a0a0a] mb-6">{dict.kontakt.locations_title}</h3>
                <div className="grid gap-4">
                  {cities.map(city => (
                    <div key={city.id} className={`p-6 bg-white border border-[#e0e3e5] rounded-[4px] ${isRTL ? 'text-right' : ''}`}>
                      <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <h4 className="font-bold text-[#0a0a0a]">{city.name}</h4>
                        <MapPin className="w-4 h-4 text-[#fed01b]" />
                      </div>
                      <p className="text-sm text-[#76777d] leading-relaxed">
                        {city.location.address} <br />
                        {city.location.postalCode} {city.name}
                      </p>
                      <p className="text-sm font-bold text-[#0a0a0a] mt-3 tracking-tighter">{city.location.phone}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-6 bg-white border border-[#e0e3e5] rounded-[4px]">
                  <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#76777d]">{dict.kontakt.locations_title}</p>
                      <h4 className="text-lg font-bold text-[#0a0a0a] mt-2">{cities[0].name}</h4>
                    </div>
                    <a
                      href={cities[0].location.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0a0a0a] hover:text-[#fed01b]"
                    >
                      {dict.common?.open_details || 'Open in Google Maps'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="overflow-hidden rounded-[10px] border border-[#d1d5db] bg-slate-100">
                    <iframe
                      title="AZ-Europa Service Google Map"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(`${cities[0].location.address}, ${cities[0].location.postalCode} ${cities[0].location.city}`)}&output=embed`}
                      width="100%"
                      height="220"
                      loading="lazy"
                      className="border-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Lead Form */}
            <div className="lg:col-span-3">
              <div className="bg-white p-1 rounded-[6px] shadow-[0_30px_100px_rgba(0,0,0,0.08)]">
                <div className={`bg-[#f7f9fb] px-8 py-6 border-b border-[#e0e3e5] ${isRTL ? 'text-right' : ''}`}>
                  <h3 className="text-xl font-black text-[#0a0a0a]">{dict.kontakt.form_title}</h3>
                  <p className="text-sm text-[#76777d]">{dict.kontakt.form_desc}</p>
                </div>
                <div className="p-2">
                  <SmartLeadForm locale={locale} dict={dict} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
