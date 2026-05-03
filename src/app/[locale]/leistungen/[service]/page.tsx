import { notFound } from 'next/navigation';
import { services, cities } from '@/data/db';
import dynamic from 'next/dynamic';
const SmartLeadForm = dynamic(() => import('@/components/SmartLeadForm').then(mod => mod.SmartLeadForm), { ssr: false });
import { CheckCircle2, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';

export const revalidate = 3600; // ISR: Revalidate every hour

export async function generateStaticParams() {
  const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
  const params = [];
  for (const locale of locales) {
    for (const service of services) {
      params.push({ locale, service: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string, service: string }> }) {
  const { service: serviceSlug, locale } = await params;
  const dict = await getDictionary(locale);
  const service = dict.services[serviceSlug];
  
  if (!service) return { title: 'Dienstleistung nicht gefunden' };
  
  return {
    title: `${service.title} | AZ-Europa Service GmbH`,
    description: service.description,
  };
}

export default async function ServiceOverviewPage({ params }: { params: Promise<{ locale: string, service: string }> }) {
  const { service: serviceSlug, locale } = await params;
  const dict = await getDictionary(locale);
  const service = dict.services[serviceSlug];
  const isRTL = locale === 'fa' || locale === 'ar';
  
  if (!service) {
    notFound();
  }

  const getLocalizedHref = (path: string) => {
    if (locale === 'de') return path;
    return `/${locale}${path === '/' ? '' : path}`;
  };

  return (
    <div className={`flex flex-col min-h-screen bg-[#f7f9fb] overflow-x-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fed01b]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <div className={`max-w-3xl ${isRTL ? 'mr-0 ml-auto' : ''}`}>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#fed01b] mb-6 block">{dict.service_page.expertise_label}</span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-[-0.03em] leading-tight mb-8">
              {service.title} <br />
              <span className="text-[#fed01b]">{dict.service_page.tailored}</span>
            </h1>
            <p className="text-lg text-[#7c839b] leading-relaxed">
              {service.description} {dict.service_page.desc_suffix}
            </p>
          </div>
        </div>
      </section>

      {/* ── DETAILS & CITIES ── */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <div className={`grid lg:grid-cols-3 gap-16 ${isRTL ? 'rtl' : ''}`}>
            
            {/* Left: Content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-black text-[#0a0a0a] mb-6">{dict.service_page.offer_title}</h2>
                <p className="text-[#45464d] leading-relaxed mb-8">
                  {dict.service_page.offer_desc_template.replace('{service}', service.title)}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    dict.service_page.benefit1,
                    dict.service_page.benefit2,
                    dict.service_page.benefit3,
                    dict.service_page.benefit4,
                    dict.service_page.benefit5,
                    dict.service_page.benefit6
                  ].map((point, i) => (
                    <div key={i} className={`flex items-center gap-3 p-4 bg-white border border-[#e0e3e5] rounded-[4px] ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle2 className="w-5 h-5 text-[#fed01b]" />
                      <span className="text-[14px] font-semibold text-[#0a0a0a]">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-black text-[#0a0a0a] mb-6">{dict.service_page.availability_title}</h2>
                <p className="text-[#45464d] mb-8">{dict.service_page.availability_desc}</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {cities.map(city => (
                    <Link 
                      key={city.id}
                      href={getLocalizedHref(`/${city.slug}/${serviceSlug}`)}
                      className={`p-6 bg-white border border-[#e0e3e5] rounded-[4px] hover:border-[#fed01b] hover:shadow-lg transition-all group ${isRTL ? 'text-right' : ''}`}
                    >
                      <MapPin className={`w-6 h-6 text-[#fed01b] mb-4 ${isRTL ? 'mr-0 ml-auto' : ''}`} />
                      <h4 className="font-bold text-[#0a0a0a] mb-1">{city.name}</h4>
                      <p className="text-[11px] text-[#76777d] uppercase tracking-wider font-bold">
                        {dict.service_page.open_details} {isRTL ? '←' : '→'}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sidebar / Form */}
            <div className="space-y-8">
              <div className="bg-white p-1 rounded-[6px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[#e0e3e5]">
                <div className={`bg-[#f7f9fb] px-6 py-4 border-b border-[#e0e3e5] ${isRTL ? 'text-right' : ''}`}>
                  <h3 className="text-sm font-bold text-[#0a0a0a]">{dict.service_page.request_now}</h3>
                  <p className="text-[11px] text-[#76777d]">{dict.service_page.request_desc_template.replace('{service}', service.title)}</p>
                </div>
                <SmartLeadForm locale={locale} dict={dict} />
              </div>

              <div className={`p-8 bg-[#0a0a0a] text-white rounded-[4px] ${isRTL ? 'text-right' : ''}`}>
                <ShieldCheck className={`w-10 h-10 text-[#fed01b] mb-6 ${isRTL ? 'mr-0 ml-auto' : ''}`} />
                <h4 className="text-xl font-bold mb-4">{dict.service_page.master_quality}</h4>
                <p className="text-sm text-[#7c839b] leading-relaxed">
                  {dict.service_page.master_desc}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
