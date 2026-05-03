import { notFound } from 'next/navigation';
import { cities, services, testimonials } from '@/data/db';
import dynamic from 'next/dynamic';
const SmartLeadForm = dynamic(() => import('@/components/SmartLeadForm').then(mod => mod.SmartLeadForm), { ssr: false });
import { CheckCircle2, Phone, MapPin, ArrowRight, ShieldCheck, Award, Zap, Star } from 'lucide-react';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';
import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';

export const revalidate = 3600; // ISR: Revalidate every hour

export async function generateStaticParams() {
  const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
  const params = [];
  for (const locale of locales) {
    for (const city of cities) {
      for (const service of services) {
        params.push({ locale, city: city.slug, service: service.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string, city: string, service: string }> }) {
  const { city: citySlug, service: serviceSlug, locale } = await params;
  const city = cities.find(c => c.slug === citySlug);
  const service = services.find(s => s.slug === serviceSlug);
  const dict = await getDictionary(locale);
  
  if (!city || !service) return { title: 'Nicht gefunden' };
  
  const localizedServiceTitle = service.title;
  const title = dict.service_page.content_title.replace('{service}', localizedServiceTitle).replace('{city}', city.name);

  return {
    title: `${title} | AZ-Europa Service`,
    description: dict.service_page.hero_desc.replace('{city}', city.name),
  };
}

export default async function ServiceMatrixPage({ params }: { params: Promise<{ locale: string, city: string, service: string }> }) {
  const { city: citySlug, service: serviceSlug, locale } = await params;
  const city = cities.find(c => c.slug === citySlug);
  const service = services.find(s => s.slug === serviceSlug);
  const dict = await getDictionary(locale);
  
  if (!city || !service) {
    notFound();
  }

  const isRTL = locale === 'fa' || locale === 'ar';
  const relatedTestimonials = testimonials.filter(t => t.serviceId === service.id && t.cityId === city.id);

  const localizedServiceTitle = service.title;
  const localizedServiceDesc = service.description;

  const t = (val: string, vars: { [key: string]: string }) => {
    let res = val;
    for (const [k, v] of Object.entries(vars)) {
      res = res.replace(`{${k}}`, v);
    }
    return res;
  };

  return (
    <div className={`flex flex-col min-h-screen bg-[#f7f9fb] overflow-x-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      <LocalBusinessSchema city={city} />
      
      {/* ── 1. CONVERSION HERO ── */}
      <section className="relative pt-24 pb-32 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fed01b]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#fed01b]/3 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <div className="space-y-8">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fed01b]/10 border border-[#fed01b]/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Zap className="w-3.5 h-3.5 text-[#fed01b]" />
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#fed01b]">
                  {t(dict.service_page.express_badge, { city: city.name })}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-[-0.03em] leading-[1.08]">
                {localizedServiceTitle} <br />
                <span className="text-[#fed01b]">
                  {t(dict.service_page.in_city, { city: city.name })}
                </span>
              </h1>
              
              <p className="text-lg text-[#7c839b] leading-relaxed max-w-xl">
                {localizedServiceDesc} {t(dict.service_page.hero_desc, { city: city.name })}
              </p>
              
              <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isRTL ? 'rtl' : 'ltr'}`}>
                {dict.service_page.feature_points.map((item: string, i: number) => (
                  <li key={i} className={`flex items-center gap-3 text-[14px] font-semibold text-[#bec6e0] ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle2 className="text-[#fed01b] w-4.5 h-4.5 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <div className={`flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 inline-flex ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <Phone className="text-[#fed01b] w-6 h-6" />
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#7c839b] mb-0.5">{dict.service_page.consultation_badge}</p>
                    <a href={`tel:${city.location.phone.replace(/\s+/g, '')}`} className="text-xl font-bold text-white hover:text-[#fed01b] transition-colors">
                      {city.location.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-1 rounded-[6px] shadow-[0_30px_100px_rgba(0,0,0,0.15)] overflow-hidden">
                <div className={`bg-[#f7f9fb] px-6 py-4 border-b border-[#e0e3e5] ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-sm font-bold text-[#0a0a0a]">
                    {t(dict.service_page.offer_card_title, { service: localizedServiceTitle })}
                  </h3>
                  <p className="text-[11px] text-[#76777d]">{dict.service_page.offer_card_subtitle}</p>
                </div>
                <SmartLeadForm locale={locale} dict={dict} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SEMANTIC CONTENT SECTION ── */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <div className={`grid lg:grid-cols-3 gap-16 ${isRTL ? 'rtl' : ''}`}>
            <div className={`lg:col-span-2 prose prose-slate max-w-none ${isRTL ? 'text-right' : 'text-left'}`}>
              <h2 className="text-3xl font-black text-[#0a0a0a] tracking-tight mb-8">
                {t(dict.service_page.content_title, { service: localizedServiceTitle, city: city.name })}: <br />
                {dict.service_page.content_subtitle}
              </h2>
              <p className="text-lg text-[#45464d] leading-relaxed mb-6">
                {t(dict.service_page.content_p1, { service: localizedServiceTitle, city: city.name })}
              </p>
              <h3 className="text-xl font-bold text-[#0a0a0a] mt-10 mb-4">{dict.service_page.why_us_title}</h3>
              <p className="text-[#45464d] leading-relaxed mb-6">
                {t(dict.service_page.why_us_p1, { city: city.name })}
              </p>
              
              <div className={`grid sm:grid-cols-2 gap-6 mt-12 not-prose ${isRTL ? 'rtl' : ''}`}>
                <div className={`p-6 border border-[#e0e3e5] rounded-[4px] bg-[#f7f9fb] ${isRTL ? 'text-right' : ''}`}>
                  <ShieldCheck className={`w-8 h-8 text-[#0a0a0a] mb-4 ${isRTL ? 'mr-0 ml-auto' : ''}`} />
                  <h4 className="font-bold text-[#0a0a0a] mb-2">{dict.service_page.gepruefte_qualitaet_title}</h4>
                  <p className="text-sm text-[#76777d]">{dict.service_page.gepruefte_qualitaet_desc}</p>
                </div>
                <div className={`p-6 border border-[#e0e3e5] rounded-[4px] bg-[#f7f9fb] ${isRTL ? 'text-right' : ''}`}>
                  <Award className={`w-8 h-8 text-[#0a0a0a] mb-4 ${isRTL ? 'mr-0 ml-auto' : ''}`} />
                  <h4 className="font-bold text-[#0a0a0a] mb-2">{dict.service_page.meisterbetrieb_title}</h4>
                  <p className="text-sm text-[#76777d]">{dict.service_page.meisterbetrieb_desc}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className={`p-8 bg-[#0a0a0a] text-white rounded-[4px] relative overflow-hidden ${isRTL ? 'text-right' : ''}`}>
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-4">{dict.service_page.local_presence_title}</h4>
                  <div className={`flex items-start gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MapPin className="w-5 h-5 text-[#fed01b] flex-shrink-0 mt-0.5" />
                    <div className={isRTL ? 'text-right' : ''}>
                      <p className="text-[14px] font-bold">{city.name} {dict.service_page.branch_label}</p>
                      <p className="text-[13px] text-[#7c839b]">{city.location.address}</p>
                      <p className="text-[13px] text-[#7c839b]">{city.location.postalCode} {city.name}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#7c839b] mb-1">{dict.service_page.availability_label}</p>
                    <p className="text-[13px] text-[#bec6e0]">{dict.service_page.availability_days}</p>
                    <p className="text-[13px] text-[#bec6e0]">{dict.service_page.notdienst_label}</p>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#fed01b]/5 rounded-full blur-[40px]" />
              </div>

              <div className={`p-8 border border-[#e0e3e5] rounded-[4px] ${isRTL ? 'text-right' : ''}`}>
                <h4 className="text-lg font-bold text-[#0a0a0a] mb-6">{dict.service_page.reviews_title}</h4>
                {relatedTestimonials.length > 0 ? (
                  relatedTestimonials.map(t => (
                    <div key={t.id} className="mb-6 last:mb-0">
                      <div className={`flex items-center gap-0.5 text-[#fed01b] mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#fed01b]" />)}
                      </div>
                      <p className="text-sm text-[#45464d] italic mb-2">"{t.content}"</p>
                      <p className="text-[11px] font-bold text-[#0a0a0a]">
                        {isRTL ? '— ' : '— '}{t.author}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#76777d]">
                    {t(dict.service_page.numerous_customers, { city: city.name })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. LOCATION STRIP ── */}
      <section className="py-12 bg-[#fed01b]">
        <div className={`max-w-screen-xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 rounded-full bg-[#0a0a0a] flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#fed01b]" />
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#0a0a0a]/60 leading-none mb-1">{dict.service_page.local_partner_label}</p>
              <p className="text-xl font-black text-[#0a0a0a] leading-none">{city.name} {dict.service_page.surroundings}</p>
            </div>
          </div>
          <div className="h-px w-20 bg-[#0a0a0a]/10 hidden lg:block" />
          <p className="text-[#0a0a0a]/70 font-bold text-center md:text-left">{dict.service_page.location_strip_text}</p>
          <Link href={locale === 'de' ? '/locations' : `/${locale}/locations`} className={`flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-[#0a0a0a] hover:underline ${isRTL ? 'flex-row-reverse' : ''}`}>
            {dict.service_page.all_locations_link}
            <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </section>
    </div>
  );
}
