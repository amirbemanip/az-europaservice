import { notFound } from 'next/navigation';
import { macroServices, cities } from '@/data/db';
import { SmartLeadForm } from '@/components/SmartLeadForm';
import { CheckCircle2, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/lib/get-dictionary';
import { BreadcrumbSchema } from '@/components/ui/BreadcrumbSchema';

export const revalidate = 3600; // ISR: Revalidate every hour

export async function generateStaticParams() {
  const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
  const params = [];
  for (const locale of locales) {
    for (const macro of macroServices) {
      params.push({ locale, macro: macro.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string, macro: string }> }) {
  const { macro: macroSlug, locale } = await params;
  const dict = await getDictionary(locale);
  const macroData = macroServices.find((item) => item.slug === macroSlug);
  const macro = macroData
    ? dict.services?.[macroData.id] || {
        title: macroData.title,
        description: macroData.description,
      }
    : undefined;
  
  if (!macro) return { title: 'Dienstleistung nicht gefunden' };
  
  return {
    title: `${macro.title} | AZ-Europa Service GmbH`,
    description: macro.description,
  };
}

export default async function ServiceOverviewPage({ params }: { params: Promise<{ locale: string, macro: string }> }) {
  const { macro: macroSlug, locale } = await params;
  const dict = await getDictionary(locale);
  const macroData = macroServices.find((item) => item.slug === macroSlug);
  const macro = macroData
    ? dict.services?.[macroData.id] || {
        title: macroData.title,
        description: macroData.description,
      }
    : undefined;
  const isRTL = locale === 'fa' || locale === 'ar';
  
  if (!macroData || !macro) {
    notFound();
  }

  const getLocalizedHref = (path: string) => {
    if (locale === 'de') return path;
    return `/${locale}${path === '/' ? '' : path}`;
  };

  const macroImageMap: Record<string, string> = {
    'reinigung': '/Reinigung aller Art.png',
    'hausmeisterservice': '/Hausmeisterservice.png',
    'renovierungen': '/Renovierungen.png',
    'abbrucharbeiten': '/Abbrucharbeiten.png',
    'gartenpflege': '/Gartenpflege.png',
    'entruempelungen': '/Entrümpelung.png',
  };
  const bgImage = macroImageMap[macroSlug];
  // Using object-cover ensures the image fills the screen with NO internal edges, eliminating any visible cut lines.
  const imgClass = 'object-cover object-right';

  return (
    <div className={`flex flex-col min-h-screen bg-[#f7f9fb] overflow-x-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 bg-[#0a0a0a] overflow-hidden">
        {bgImage && (
          <div className="absolute inset-0 z-0">
            {/* Image Container - Full width to avoid any container boundaries (no sharp cuts) */}
            <div className="absolute inset-0 opacity-[0.85]">
              <Image src={bgImage} alt={macro.title} fill className={`${imgClass} mix-blend-luminosity filter blur-[1px]`} sizes="100vw" />
            </div>

            {/* Global Hero Masks over the entire section to guarantee flawless blending */}
            {/* 1. Vertical Fade (Top and Bottom) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-90 pointer-events-none" />
            
            {/* 2. Flawless Custom Horizontal Fade */}
            {/* It stays solid black where the text is, and slowly fades to transparent where the image is pinned */}
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ 
                background: isRTL 
                  ? 'linear-gradient(to left, #0a0a0a 0%, #0a0a0a 30%, transparent 80%, transparent 100%)' 
                  : 'linear-gradient(to right, #0a0a0a 0%, #0a0a0a 30%, transparent 80%, transparent 100%)' 
              }} 
            />
          </div>
        )}
        <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fed01b]/5 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          {/* Breadcrumbs */}
          <BreadcrumbSchema 
            locale={locale} 
            items={[
              { label: dict.nav.services, href: getLocalizedHref('/leistungen') },
              { label: macro.title, href: getLocalizedHref(`/leistungen/${macroSlug}`) }
            ]} 
          />

          <div className={`max-w-3xl ${isRTL ? 'mr-0 ml-auto' : ''}`}>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#fed01b] mb-6 block">{dict.service_page.expertise_label}</span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-[-0.03em] leading-tight mb-8">
              {macro.title} <br />
              <span className="text-[#fed01b]">{dict.service_page.tailored}</span>
            </h1>
            <p className="text-lg text-[#7c839b] leading-relaxed">
              {macro.description} {dict.service_page.desc_suffix}
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
                  {dict.service_page.offer_desc_template.replace('{service}', macro.title)}
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
                      href={getLocalizedHref(`/${city.slug}/${macroSlug}`)}
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
                  <p className="text-[11px] text-[#76777d]">{dict.service_page.request_desc_template.replace('{service}', macro.title)}</p>
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
