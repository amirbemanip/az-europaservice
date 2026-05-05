import type { Metadata } from 'next';
import '../globals.css';
import { cn } from '@/lib/utils';
import { cities, services } from '@/data/db';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { EnterpriseHeader } from '@/components/ui/EnterpriseHeader';
import { EnterpriseFooter } from '@/components/ui/EnterpriseFooter';
import dynamic from 'next/dynamic';
// FloatingChatWidget is a client-side widget; import after dynamic is available
import { FloatingChatWidget } from '@/components/ui/FloatingChatWidget';
import { CookieConsentBanner } from '@/components/ui/CookieConsentBanner';
import { getDictionary } from '@/lib/get-dictionary';
// GTM is loaded on consent by the client-side GtmLoader
import GtmLoader from '@/components/ui/GtmLoader';
import { Suspense } from 'react';

export async function generateStaticParams() {
  return ['de', 'en', 'fa', 'ar', 'ru', 'uk'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  const titles: Record<string, string> = {
    de: 'AZ-Europa Service | Profi Reinigung & Hausmeisterservice Franken',
    en: 'AZ-Europa Service | Professional Cleaning & Facility Management Franconia',
    fa: 'AZ-Europa Service | خدمات نظافت حرفه‌ای و مدیریت ساختمان در آلمان',
    ar: 'AZ-Europa Service | خدمات التنظيف المهنية وإدارة المرافق في ألمانيا',
    ru: 'AZ-Europa Service | Профессиональная уборка и обслуживание зданий в Германии',
    uk: 'AZ-Europa Service | Професійне прибирання та обслуговування будівель у Німеччині',
  };

  const descriptions: Record<string, string> = {
    de: 'Ihr zuverlässiger Meisterbetrieb für Reinigung, Renovierung und Hausmeisterservice in Nürnberg, Erlangen und Bamberg. TÜV geprüft. 24h Service.',
    en: 'Your reliable master business for cleaning, renovation, and facility management in Nuremberg, Erlangen, and Bamberg. TÜV certified. 24h service.',
    fa: 'شرکت متخصص و تایید شده شما برای خدمات نظافت، نوسازی و مدیریت ساختمان در نورنبرگ، ارلانگن و بامبرگ. دارای تاییدیه TÜV و خدمات ۲۴ ساعته.',
    ar: 'شركتك المتخصصة والمعتمدة لخدمات التنظيف والتجديد وإدارة المرافق في نورمبرغ وإرلنغن وبامبرغ. معتمدة من TÜV وخدمة على مدار 24 ساعة.',
    ru: 'Ваше надежное сертифицированное предприятие по уборке, ремонту и обслуживанию зданий в Нюрнберге, Эрлангене и Бамберге. Сертификация TÜV. 24-часовой сервис.',
    uk: 'Ваше надійне сертифіковане підприємство з прибирання, ремонту та обслуговування будівель у Нюрнберзі, Ерлангені та Бамберзі. Сертифікація TÜV. 24-годинний сервіс.',
  };

  return {
    metadataBase: new URL('https://az-europaservice.de'),
    title: {
      default: titles[locale] || titles.de,
      template: `%s | ${locale === 'fa' ? 'شرکت AZ-Europa Service' : 'AZ-Europa Service GmbH'}`
    },
    description: descriptions[locale] || descriptions.de,
    alternates: {
      canonical: locale === 'de' ? '/' : `/${locale}`,
      languages: {
        'de-DE': '/',
        'en-GB': '/en',
        'fa-IR': '/fa',
        'ar-SA': '/ar',
        'ru-RU': '/ru',
        'uk-UA': '/uk',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: titles[locale] || titles.de,
      description: descriptions[locale] || descriptions.de,
      type: 'website',
      locale: locale === 'de' ? 'de_DE' : locale === 'en' ? 'en_GB' : locale === 'fa' ? 'fa_IR' : locale === 'ar' ? 'ar-SA' : locale === 'ru' ? 'ru-RU' : 'uk-UA',
      images: [
        {
          url: '/logo.png',
          width: 1200,
          height: 630,
          alt: 'AZ-Europa Service GmbH',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.de,
      description: descriptions[locale] || descriptions.de,
      images: ['/logo.png'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRTL = locale === 'fa' || locale === 'ar';
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-XXXXXXX';

  return (
    <>
      <div lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className="scroll-smooth">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#fed01b] focus:text-[#0a0a0a] focus:shadow-lg">
          {dict.common.skip_to_content || 'Skip to content'}
        </a>
        <LocalBusinessSchema city={cities[0]} />
        <BreadcrumbSchema locale={locale} />
        <GtmLoader gtmId={gtmId} />
        <Suspense fallback={null}>
          <EnterpriseHeader cities={cities} services={services} dict={dict} locale={locale} />
        </Suspense>
        <main id="main-content" className="flex-grow pt-[112px]">
          {children}
        </main>

        <FloatingChatWidget locale={locale} dict={dict} />
        <EnterpriseFooter cities={cities} services={services} dict={dict} locale={locale} />
        <CookieConsentBanner locale={locale} />
      </div>
    </>
  );
}
