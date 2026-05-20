import { ShieldCheck, Award, Users, CheckCircle, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const seo = dict.seo?.about;
  
  return {
    title: seo?.title || `${dict.nav.about} | AZ-Europa Service GmbH`,
    description: seo?.description || dict.about.hero_desc,
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRTL = locale === 'fa' || locale === 'ar';

  return (
    <div className={`flex flex-col min-h-screen bg-white overflow-x-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* ── 1. PREMIUM HERO ── */}
      <section className="relative pt-32 pb-24 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fed01b]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <div className={`max-w-3xl ${isRTL ? 'mr-auto ml-0' : ''}`}>
            <span className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#fed01b] mb-6 block ${isRTL ? 'flex-row-reverse' : ''}`}>
              {dict.about.hero_badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-[-0.03em] leading-tight mb-8">
              {dict.about.hero_title.split(' ').slice(0, 2).join(' ')} <br />
              <span className="text-[#fed01b]">{dict.about.hero_title.split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="text-lg text-[#7c839b] leading-relaxed">
              {dict.about.hero_desc}
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. VALUES & STATS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <div className={`grid lg:grid-cols-2 gap-20 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-[#0a0a0a] tracking-tight">
                {dict.about.quality_title}
              </h2>
              <p className="text-[#45464d] leading-relaxed">
                {dict.about.quality_desc}
              </p>
              
              <div className={`grid grid-cols-2 gap-8 pt-6 ${isRTL ? 'rtl' : 'ltr'}`}>
                <div>
                  <p className="text-4xl font-black text-[#0a0a0a]">1.500+</p>
                  <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#76777d] mt-1">{dict.about.stats_projects}</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-[#0a0a0a]">10+</p>
                  <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#76777d] mt-1">{dict.about.stats_experience}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {dict.about.values.map((val: any, i: number) => {
                const icons = [ShieldCheck, Award, Users];
                const Icon = icons[i] || ShieldCheck;
                return (
                  <div key={i} className={`p-8 bg-[#f7f9fb] border border-[#e0e3e5] rounded-[4px] hover:border-[#fed01b] transition-colors group ${isRTL ? 'text-right' : ''}`}>
                    <Icon className={`w-8 h-8 text-[#0a0a0a] group-hover:text-[#fed01b] transition-colors mb-4 ${isRTL ? 'mr-auto ml-0' : ''}`} />
                    <h4 className="font-bold text-[#0a0a0a] text-lg mb-2">{val.title}</h4>
                    <p className="text-sm text-[#76777d] leading-relaxed">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2.5 DETAILED CONTENT (New) ── */}
      {dict.about.paragraphs && dict.about.paragraphs.length > 0 && (
        <section className="py-24 bg-[#f8f9fa] border-y border-[#eee]">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {dict.about.paragraphs.map((p: string, i: number) => {
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

      {/* ── 3. TEAM / PHILOSOPHY ── */}
      <section className="py-24 bg-[#0a0a0a] text-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">{dict.about.cta_title}</h2>
          <p className="text-[#7c839b] max-w-2xl mx-auto mb-12">
            {dict.about.cta_desc}
          </p>
          <div className={`flex flex-wrap justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href={locale === 'de' ? '/kontakt' : `/${locale}/kontakt`} className={`px-10 py-4 bg-[#fed01b] text-[#0a0a0a] text-[12px] font-bold tracking-[0.1em] uppercase rounded-[4px] hover:bg-[#eec200] transition-colors flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {dict.nav.cta}
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
            <Link href={locale === 'de' ? '/leistungen' : `/${locale}/leistungen`} className="px-10 py-4 border border-white/20 text-white text-[12px] font-bold tracking-[0.1em] uppercase rounded-[4px] hover:bg-white/10 transition-colors">
              {dict.nav.services}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
