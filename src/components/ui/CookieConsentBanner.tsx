"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

const copy: Record<string, { title: string; desc: string; accept: string; privacy: string }> = {
  de: {
    title: 'Wir verwenden Cookies',
    desc: 'Diese Website nutzt notwendige Cookies für die beste Funktionalität und anonyme Auswertung.',
    accept: 'Alle akzeptieren',
    privacy: 'Datenschutz',
  },
  en: {
    title: 'We use cookies',
    desc: 'This website uses cookies for essential functionality and anonymous analytics.',
    accept: 'Accept all',
    privacy: 'Privacy',
  },
  fa: {
    title: 'ما از کوکی استفاده می‌کنیم',
    desc: 'این وب‌سایت برای عملکرد اصلی و تحلیل‌های ناشناس از کوکی استفاده می‌کند.',
    accept: 'پذیرفتن همه',
    privacy: 'حریم خصوصی',
  },
  ar: {
    title: 'نستخدم الكوكيز',
    desc: 'يستخدم هذا الموقع الكوكيز للوظائف الأساسية والتحليلات المجهولة.',
    accept: 'قبول الكل',
    privacy: 'الخصوصية',
  },
  ru: {
    title: 'Мы используем файлы cookie',
    desc: 'Этот сайт использует cookie для основных функций и анонимной аналитики.',
    accept: 'Принять все',
    privacy: 'Политика конфиденциальности',
  },
  uk: {
    title: 'Ми використовуємо куки',
    desc: 'Цей сайт використовує куки для базової роботи та анонімної аналітики.',
    accept: 'Прийняти все',
    privacy: 'Політика конфіденційності',
  },
};

export function CookieConsentBanner({ locale }: { locale: string }) {
  const [accepted, setAccepted] = useState(false);
  const localeCopy = copy[locale] ?? copy.de;

  useEffect(() => {
    const value = typeof window !== 'undefined' ? localStorage.getItem('az_cookie_consent') : null;
    if (value === 'true') {
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('az_cookie_consent', 'true');
    setAccepted(true);
    try {
      window.dispatchEvent(new CustomEvent('az_cookie_consent_changed', { detail: true }));
    } catch (e) {
      // ignore
    }
  };

  if (accepted) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] bg-[#0a0a0a] text-white p-4 shadow-[0_-12px_60px_rgba(0,0,0,0.18)]">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2 text-sm text-[#e2e8f0]">
          <p className="font-bold text-white">{localeCopy.title}</p>
          <p>
            {localeCopy.desc}{' '}
            <Link href={locale === 'de' ? '/datenschutz' : `/${locale}/datenschutz`} className="underline text-white">
              {localeCopy.privacy}
            </Link>
            .
          </p>
        </div>
        <button
          onClick={handleAccept}
          className="inline-flex items-center justify-center rounded-[6px] bg-[#fed01b] px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#0a0a0a] hover:bg-[#eec200] transition-colors"
        >
          {localeCopy.accept}
        </button>
      </div>
    </div>
  );
}
