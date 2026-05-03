import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';

const messages: Record<string, { title: string; description: string; action: string }> = {
  de: {
    title: 'Seite nicht gefunden',
    description: 'Die angeforderte Seite wurde nicht gefunden oder ist nicht mehr verfügbar.',
    action: 'Zur Startseite',
  },
  en: {
    title: 'Page not found',
    description: 'The requested page could not be found or may have been removed.',
    action: 'Go to homepage',
  },
  fa: {
    title: 'صفحه پیدا نشد',
    description: 'صفحه‌ای که درخواست کرده‌اید پیدا نشد یا دیگر موجود نیست.',
    action: 'بازگشت به صفحه اصلی',
  },
  ar: {
    title: 'الصفحة غير موجودة',
    description: 'الصفحة المطلوبة غير موجودة أو ربما تمت إزالتها.',
    action: 'العودة إلى الصفحة الرئيسية',
  },
  ru: {
    title: 'Страница не найдена',
    description: 'Запрошенная страница не найдена или могла быть удалена.',
    action: 'Перейти на главную',
  },
  uk: {
    title: 'Сторінку не знайдено',
    description: 'Запитувана сторінка не знайдена або могла бути видалена.',
    action: 'На головну сторінку',
  },
};

export default async function NotFound({ params }: { params?: { locale: string } }) {
  const locale = params?.locale || 'de';
  const dict = await getDictionary(locale);
  const text = messages[locale] || messages.de;
  const homeHref = locale === 'de' ? '/' : `/${locale}`;

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7f9fb] px-6 py-20 text-[#191c1e]">
      <div className="max-w-2xl w-full rounded-3xl border border-slate-200 bg-white p-12 shadow-xl">
        <div className="text-center space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#fed01b]">404</p>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            {dict?.common?.not_found_title || text.title}
          </h1>
          <p className="text-base leading-7 text-slate-600">
            {dict?.common?.not_found_description || text.description}
          </p>
          <div className="pt-6">
            <Link
              href={homeHref}
              className="inline-flex items-center justify-center rounded-2xl bg-[#fed01b] px-8 py-4 text-sm font-bold uppercase tracking-[0.13em] text-[#0a0a0a] hover:bg-[#eec200] transition-colors"
            >
              {dict?.common?.not_found_action || text.action}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
