import React from 'react';

const titles: Record<string, string> = {
  de: 'Startseite',
  en: 'Home',
  fa: 'خانه',
  ar: 'الرئيسية',
  ru: 'Главная',
  uk: 'Головна',
};

export function BreadcrumbSchema({ locale }: { locale: string }) {
  const baseUrl = 'https://az-europaservice.de';
  const homeUrl = locale === 'de' ? `${baseUrl}` : `${baseUrl}/${locale}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': titles[locale] || titles.de,
        'item': homeUrl,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': locale === 'de' ? 'Leistungen' : 'Services',
        'item': `${homeUrl}/leistungen`,
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': locale === 'de' ? 'Kontakt' : 'Contact',
        'item': `${homeUrl}/kontakt`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
