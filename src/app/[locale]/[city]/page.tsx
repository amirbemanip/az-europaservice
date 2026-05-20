import { notFound } from 'next/navigation';
import { cities, macroServices, testimonials } from '@/data/db';
import { SmartLeadForm } from '@/components/SmartLeadForm';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { MapPin, ArrowRight, ShieldCheck, Award, CheckCircle, Clock, Star } from 'lucide-react';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';
import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';

// Static generation of all city paths
export const revalidate = 3600; // ISR: Revalidate every hour

export async function generateStaticParams() {
  const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
  const params = [];
  for (const locale of locales) {
    for (const city of cities) {
      params.push({ locale, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string, city: string }> }) {
  const { city: citySlug, locale } = await params;
  const city = cities.find(c => c.slug === citySlug);
  const dict = await getDictionary(locale);
  if (!city) return { title: 'Nicht gefunden' };
  
  const seo = dict.seo?.[city.id];
  
  // Helper to get city-specific content for metadata
  const getCityContent = (key: string, fallback: string) => {
    const override = dict.cities?.[city.id]?.[key];
    if (override) return override;
    return fallback.replace(/{city}/g, city.name);
  };

  const title = seo?.title || getCityContent('hero_title_2', dict.city_page.hero_title_2);
  const description = seo?.description || getCityContent('hero_desc', dict.city_page.hero_desc);
  
  return {
    title: title,
    description: description,
  };
}

export default async function CityHubPage({ params }: { params: Promise<{ locale: string, city: string }> }) {
  const { city: citySlug, locale } = await params;
  const city = cities.find(c => c.slug === citySlug);
  const dict = await getDictionary(locale);
  
  if (!city) {
    notFound();
  }

  const isRTL = locale === 'fa' || locale === 'ar';
  const cityTestimonials = testimonials.filter(t => t.cityId === city.id);

  // Helper for translated content with city-specific override support
  const getCityContent = (key: string, fallback: string) => {
    // Look for override in dict.cities[city.id][key]
    const override = dict.cities?.[city.id]?.[key];
    if (override) return override;
    
    // Fallback to generic template
    return fallback.replace(/{city}/g, city.name);
  };

  const getServiceLocale = (serviceId: string, fallbackTitle: string, fallbackDescription: string) => {
    const localized = dict.services?.[serviceId];
    return {
      title: localized?.title || fallbackTitle,
      description: localized?.description || fallbackDescription,
    };
  };

  const cityParagraphs = dict.cities?.[city.id]?.paragraphs || [];
  const cityFeatures = dict.cities?.[city.id]?.features || [];
  const cityContentTitle = getCityContent('hero_title_2', dict.city_page.expertise_label);

  return (
    <div className={`flex flex-col min-h-screen bg-[#f7f9fb] overflow-x-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      <LocalBusinessSchema city={city} />
      
      {/* ── 1. LOCAL HERO SECTION ── */}
      <section className="relative pt-24 pb-32 bg-[#0a0a0a] overflow-hidden">
        {/* Architectural grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        
        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#fed01b]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#fed01b]/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <div className="space-y-8">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fed01b]/10 border border-[#fed01b]/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-4 h-4 text-[#fed01b]" />
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#fed01b]">{getCityContent('hero_badge', dict.city_page.hero_badge)}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-[-0.03em] leading-[1.05]">
                {dict.city_page.hero_title_1} <br />
                <span className="text-[#fed01b]">{getCityContent('hero_title_2', dict.city_page.hero_title_2)}</span>
              </h1>
              
              <p className="text-lg text-[#7c839b] leading-relaxed max-w-xl">
                {getCityContent('hero_desc', dict.city_page.hero_desc)}
              </p>
              
              <div className={`flex flex-wrap gap-4 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {[
                  { icon: ShieldCheck, label: dict.common.tuev_geprueft },
                  { icon: Award, label: dict.common.meisterbetrieb },
                  { icon: Clock, label: dict.common.answer_2h },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className={`flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Icon className="w-4 h-4 text-[#fed01b]" />
                    <span className="text-[11px] font-bold tracking-[0.05em] uppercase text-[#bec6e0]">{label}</span>
                  </div>
                ))}
              </div>

              <div className={`flex items-center gap-6 pt-6 border-t border-white/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                   <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#7c839b] mb-1">
                    {dict.city_page.local_hotline}
                   </span>
                  <a href={`tel:${city.location.phone.replace(/\s+/g, '')}`} className="text-2xl font-black text-white hover:text-[#fed01b] transition-colors">
                    {city.location.phone}
                  </a>
                </div>
                <div className={`hidden sm:flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#7c839b] mb-1">
                    {dict.city_page.central_location}
                  </span>
                  <p className="text-[13px] font-semibold text-[#bec6e0]">{city.location.address}, {city.name}</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Floating Form Card */}
              <div className={`w-full max-w-lg ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
                <SmartLeadForm locale={locale} dict={dict} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SERVICES BENTO GRID ── */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#fed01b] mb-4 block">{getCityContent('service_catalog', dict.city_page.service_catalog)}</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0a0a0a] tracking-[-0.02em]">
                {getCityContent('service_title', dict.city_page.service_title).split(' ').slice(0, 2).join(' ')} <br />{getCityContent('service_title', dict.city_page.service_title).split(' ').slice(2).join(' ')}
              </h2>
            </div>
            <p className={`text-[#76777d] max-w-sm text-sm leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {getCityContent('service_desc', dict.city_page.service_desc)}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {macroServices.map((macro) => {
              const serviceLocale = getServiceLocale(macro.id, macro.title, macro.description);
              return (
                <Link
                key={macro.id} 
                href={locale === 'de' ? `/${city.slug}/${macro.slug}` : `/${locale}/${city.slug}/${macro.slug}`}
                className={`group relative flex flex-col p-8 bg-[#f7f9fb] border border-[#e0e3e5] rounded-[6px] hover:bg-white hover:border-[#fed01b] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <div className={`absolute top-6 ${isRTL ? 'left-8' : 'right-8'} text-[10px] font-black tracking-widest text-[#e0e3e5] group-hover:text-[#fed01b]/20 transition-colors uppercase`}>
                  {city.name}
                </div>
                <h3 className={`text-xl font-bold text-[#0a0a0a] mb-4 ${isRTL ? 'pl-8' : 'pr-8'}`}>
                  {serviceLocale.title}
                </h3>
                <p className="text-[13px] text-[#76777d] leading-relaxed mb-8 flex-grow">
                  {serviceLocale.description}
                </p>
                <div className={`flex items-center gap-2 text-[11px] font-bold tracking-[0.08em] uppercase text-[#0a0a0a] group-hover:text-[#fed01b] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {dict.common.details_prices}
                  <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* ── 2.5 SEMANTIC CITY CONTENT ── */}
      {cityParagraphs.length > 0 && (
        <section className="py-24 bg-[#f7f9fb] border-t border-[#e0e3e5]">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
            <div className={`grid lg:grid-cols-3 gap-16 ${isRTL ? 'rtl' : ''}`}>
              <div className={`lg:col-span-2 prose prose-slate max-w-none ${isRTL ? 'text-right' : 'text-left'}`}>
                <h2 className="text-3xl font-black text-[#0a0a0a] tracking-tight mb-8">
                  {cityContentTitle}
                </h2>
                <div className="space-y-8">
                  {cityParagraphs.map((p: string, i: number) => {
                    const isHeading = p.startsWith('**') && p.endsWith('**');
                    if (isHeading) {
                      return (
                        <h3 key={i} className="text-2xl font-black text-[#0a0a0a] tracking-tight pt-6 first:pt-0">
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
              
              {cityFeatures.length > 0 && (
                <div className="space-y-8">
                  <div className={`p-8 bg-white border border-[#e0e3e5] rounded-[4px] ${isRTL ? 'text-right' : ''}`}>
                    <h4 className="text-lg font-bold text-[#0a0a0a] mb-6">{dict.service_page.expertise_label}</h4>
                    <ul className="space-y-4">
                      {cityFeatures.map((f: string, i: number) => (
                        <li key={i} className={`flex items-start gap-3 text-sm text-[#45464d] font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <CheckCircle className="w-5 h-5 text-[#fed01b] flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. LOCAL TRUST & SOCIAL PROOF ── */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <div className={`grid lg:grid-cols-2 gap-20 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-[-0.02em] leading-tight mb-8">
                {getCityContent('trust_title', dict.city_page.trust_title).split(' ').slice(0, 3).join(' ')} <br />{getCityContent('trust_title', dict.city_page.trust_title).split(' ').slice(3).join(' ')}
              </h2>
              <div className="space-y-6">
                {dict.city_page.trust_points.map((item: { title: string; desc: string }, i: number) => (
                  <div key={i} className={`flex gap-4 p-6 bg-white/[0.03] border border-white/5 rounded-[4px] hover:bg-white/[0.05] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-6 h-6 rounded-full bg-[#fed01b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#0a0a0a]" />
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-[14px] text-[#7c839b] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {cityTestimonials.length > 0 ? (
                cityTestimonials.map(t => (
                  <div key={t.id} className={`p-8 bg-white rounded-[4px] border border-[#e0e3e5] relative ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-center gap-1 text-[#fed01b] mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#fed01b]" />)}
                    </div>
                    <p className="text-[#45464d] text-[15px] italic leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-[13px] font-bold text-[#0a0a0a]">{t.author}</span>
                      <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#76777d]">{city.name}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 bg-white rounded-[4px] border border-[#e0e3e5] text-center">
                  <p className="text-[#76777d] text-sm">
                    {dict.city_page.satisfied_customers}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FINAL CTA ── */}
      <section className="py-20 bg-[#fed01b]">
        <div className={`max-w-screen-xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a0a0a] tracking-tight">{dict.city_page.cta_title}</h2>
            <p className="text-[#0a0a0a]/70 font-medium">{getCityContent('cta_subtitle', dict.city_page.cta_subtitle)}</p>
          </div>
          <Link href={locale === 'de' ? '/kontakt' : `/${locale}/kontakt`} className={`px-10 py-4 bg-[#0a0a0a] text-white text-[12px] font-bold tracking-[0.1em] uppercase rounded-[4px] hover:bg-[#1e1e1e] transition-colors flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {dict.city_page.cta_button}
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </section>
    </div>
  );
}
