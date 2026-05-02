import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { cn } from '@/lib/utils';
import { cities, services } from '@/data/db';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';
import { EnterpriseHeader } from '@/components/ui/EnterpriseHeader';
import { EnterpriseFooter } from '@/components/ui/EnterpriseFooter';
import { FloatingChatWidget } from '@/components/ui/FloatingChatWidget';
import { getDictionary } from '@/lib/get-dictionary';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className="scroll-smooth">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');`,
          }}
        />
      </head>
      <body className={cn(inter.variable, 'font-sans antialiased min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e]')}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <LocalBusinessSchema city={cities[0]} />
        
        <EnterpriseHeader cities={cities} services={services} dict={dict} locale={locale} />
        
        <main className="flex-grow pt-[112px]">
          {children}
        </main>

        <FloatingChatWidget locale={locale} dict={dict} />
        <EnterpriseFooter cities={cities} services={services} dict={dict} locale={locale} />
      </body>
    </html>
  );
}
