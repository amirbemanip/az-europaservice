import dynamic from 'next/dynamic';
import { CinematicHeroParallax } from '@/components/ui/CinematicHeroParallax';
import { TrustMarquee } from '@/components/home/TrustMarquee';
import { AuthorityMatrix } from '@/components/home/AuthorityMatrix';
import { TrueBentoGrid } from '@/components/home/TrueBentoGrid';
import { SmartLeadForm } from '@/components/SmartLeadForm';
import { getDictionary } from '@/lib/get-dictionary';

// Lazy loaded below-the-fold components
const InteractiveRegionMap = dynamic(() => import('@/components/home/InteractiveRegionMap').then(mod => mod.InteractiveRegionMap), { ssr: true });
const LocationBanners = dynamic(() => import('@/components/home/LocationBanners').then(mod => mod.LocationBanners), { ssr: true });
const StructuredFAQ = dynamic(() => import('@/components/ui/StructuredFAQ').then(mod => mod.StructuredFAQ), { ssr: true });
const CleanMasonryTestimonials = dynamic(() => import('@/components/home/CleanMasonryTestimonials').then(mod => mod.CleanMasonryTestimonials), { ssr: true });

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRTL = locale === 'fa' || locale === 'ar';

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      
      {/* Layer 1: Cinematic Parallax Hero */}
      <CinematicHeroParallax 
        locale={locale} 
        isRTL={isRTL}
        badge={dict.hero.badge}
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        description={dict.hero.desc}
        backgroundImage="/hero-bg.png"
        ctaPrimary={{ label: dict.hero.cta_primary, href: '/kontakt' }}
        ctaSecondary={{ label: dict.hero.cta_secondary, href: '/leistungen' }}
      />

      {/* Layer 2: Social Proof Strip */}
      <TrustMarquee dict={dict} />

      {/* Layer 3: Authority Stats & Logos */}
      <AuthorityMatrix locale={locale} dict={dict} />

      {/* Layer 4: Services Bento Grid */}
      <TrueBentoGrid locale={locale} dict={dict} />

      {/* Layer 5: Interactive Region Map (Premium) */}
      <InteractiveRegionMap locale={locale} dict={dict} />

      {/* Layer 5.5: Detailed Semantic Content (Premium) */}
      {dict.hero.paragraphs && dict.hero.paragraphs.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-10">
                {dict.hero.paragraphs.map((p: string, i: number) => {
                  const isHeading = p.startsWith('**') && p.endsWith('**');
                  if (isHeading) {
                    return (
                      <h3 key={i} className="text-2xl md:text-3xl font-black text-[#0a0a0a] tracking-tight pt-10 first:pt-0">
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

      {/* Layer 6: Stylized Location Banners (Premium) */}
      <LocationBanners locale={locale} dict={dict} />

      {/* Layer 7: Structured FAQ */}
      <StructuredFAQ 
        locale={locale} 
        isRTL={isRTL}
        title={dict.faq.title}
        subtitle={dict.faq.subtitle}
        items={dict.faq.items}
      />

      {/* Layer 8: Testimonials */}
      <CleanMasonryTestimonials locale={locale} dict={dict} />

      {/* Layer 9: Lead Generation CTA */}
      <section className="py-32 relative bg-[#0a0a0a] overflow-hidden">
        {/* Architectural grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#fed01b]/5 rounded-full blur-[150px] pointer-events-none" />
        {/* Right glow */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#fed01b]/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start ${isRTL ? 'lg:flex-row-reverse' : ''}`}>

            {/* Left: CTA Copy */}
            <div className={`lg:sticky lg:top-32 ${isRTL ? 'text-right' : 'text-left'}`}>
              <span className={`inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#fed01b] mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="w-8 h-px bg-[#fed01b]" />
                {dict.cta_section.badge}
              </span>

              <h2 className="text-4xl md:text-[52px] font-black text-white tracking-[-0.02em] leading-[1.06] mb-6">
                {dict.cta_section.title}
              </h2>

              <p className="text-[17px] text-[#7c839b] leading-relaxed mb-10 max-w-md">
                {dict.cta_section.desc}
              </p>

              {/* Trust Points */}
              <div className="space-y-4 mb-10">
                {dict.cta_section.points.map((point: any) => (
                  <div key={point.label} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-5 h-5 rounded-full bg-[#fed01b]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#fed01b]" />
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <p className="text-[14px] font-semibold text-[#bec6e0]">{point.label}</p>
                      <p className="text-[12px] text-[#7c839b]">{point.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini Stats */}
              <div className={`grid grid-cols-3 gap-4 pt-8 border-t border-white/5 ${isRTL ? 'rtl' : 'ltr'}`}>
                {dict.cta_section.stats.map((stat: any) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-black text-white tracking-tight">{stat.value}</p>
                    <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#7c839b] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="w-full">
              <SmartLeadForm locale={locale} dict={dict} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
