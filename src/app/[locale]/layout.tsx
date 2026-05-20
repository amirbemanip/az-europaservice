import type { Metadata } from 'next';
import '../globals.css';
import { cn } from '@/lib/utils';
import { cities, macroServices, microServices } from '@/data/db';
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
  
  const seo = dict.seo?.home || {
    title: 'AZ-Europa Service',
    description: 'Meisterbetrieb für Reinigung & Facility Management'
  };

  return {
    metadataBase: new URL('https://az-europaservice.de'),
    title: {
      default: seo.title,
      template: `%s | ${locale === 'fa' ? 'شرکت AZ-Europa Service' : 'AZ-Europa Service GmbH'}`
    },
    description: seo.description,
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
      index: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
      follow: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
      nocache: process.env.NEXT_PUBLIC_ALLOW_INDEXING !== 'true',
      googleBot: {
        index: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
        follow: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
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
      title: seo.title,
      description: seo.description,
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
          <EnterpriseHeader cities={cities} macroServices={macroServices} microServices={microServices} dict={dict} locale={locale} />
        </Suspense>
        <main id="main-content" className="flex-grow">
          {children}
        </main>

        <FloatingChatWidget locale={locale} dict={dict} />
        <EnterpriseFooter cities={cities} services={macroServices} dict={dict} locale={locale} />
        <CookieConsentBanner locale={locale} />
      </div>
    </>
  );
}
