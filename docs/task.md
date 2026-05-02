# 📋 لیست وظایف توسعه سازمانی (Enterprise Agile Backlog)

این بک‌لاگ بر اساس استانداردهای اسپرینت‌های چابک (Agile Sprints) و با جزئیات مایکرو تنظیم شده است. تمام تسک‌ها باید با رعایت استانداردهای `Clean Code` و `SOLID Principles` انجام شوند.

## 🔴 Epic 1: ستاپ زیرساخت سازمانی (Enterprise Scaffold)
- [x] مقداردهی اولیه `create-next-app` (App Router, TS, Tailwind).
- [ ] نصب و کانفیگ ابزارهای سازمانی: `Zod`, `React-Hook-Form`, `Framer-Motion`, `Lucide-React`.
- [ ] راه‌اندازی فایل `tailwind.config.ts` با Design Tokens (تعریف Hex Code های پرمیوم، انیمیشن‌های سفارشی و Typography).
- [ ] تنظیم `next.config.mjs` برای فعال‌سازی بهینه‌سازی تصاویر (Remote Patterns) و هدرهای امنیتی (Security Headers).

## 🟠 Epic 2: لایه دیتا و تایپ‌ها (Data Layer & TypeScript Interfaces)
- [ ] ایجاد فایل `src/types/index.ts` برای تعریف اینترفیس‌های `City`, `Service`, `Testimonial`, `LocationData`.
- [ ] ایجاد دیتابیس لوکال موقت (Mock Data) در `src/data/db.ts` با اطلاعات دقیق و تفکیک‌شده برای ارلانگن، نورنبرگ و بامبرگ (شامل طول و عرض جغرافیایی برای نقشه).
- [ ] ایجاد ساختار دیتای سرویس‌ها (۶ سرویس اصلی) با محتوای متفاوت برای جلوگیری از Cannibalization.

## 🟡 Epic 3: کتابخانه کامپوننت‌های اتمیک (Atomic UI Library)
- [ ] ساخت کامپوننت `Button` (با Variant های Primary, Secondary, Outline, Ghost).
- [ ] ساخت کامپوننت `Input` و `Textarea` با پشتیبانی از Error State و Validation.
- [ ] ساخت کامپوننت `TrustBadge` (SVG آیکون‌های محلی و گواهینامه‌ها).
- [ ] ساخت کامپوننت `TestimonialCard` با آواتار و ستاره‌های ریتینگ.

## 🟢 Epic 4: فرم‌های هوشمند و تبدیل لید (Smart Lead Engine)
- [ ] ساخت اسکیما اعتبارسنجی با `Zod` (Zod Object) برای فرم تماس.
- [ ] پیاده‌سازی `SmartLeadForm` به صورت چند مرحله‌ای (Multi-Step Wizard) با مدیریت State (مثلاً Zustand یا React Context).
  - *گام ۱:* انتخاب شهر (رادیو باتن‌های گرافیکی).
  - *گام ۲:* انتخاب نوع خدمات.
  - *گام ۳:* دریافت اطلاعات تماس.
- [ ] ایجاد `Route Handler` در `app/api/lead/route.ts` برای دریافت امن اطلاعات و ارسال پاسخ وضعیت (200 OK).

## 🔵 Epic 5: چیدمان اصلی و روتینگ برنامه‌نویسی‌شده (Programmatic Routing)
- [ ] ساخت `RootLayout` (`app/layout.tsx`) با فونت‌های بهینه‌شده (Next Font) و کامپوننت‌های سراسری (Header, Footer).
- [ ] پیاده‌سازی هدر چسبنده (Sticky Header) با افکت Glassmorphism و منوی موبایل (Hamburger Menu).
- [ ] برنامه‌نویسی صفحه اصلی (`app/page.tsx`) به عنوان `Gateway` (هدایت کاربران به صفحات شهری).
- [ ] ایجاد صفحات هاب شهری `app/[city]/page.tsx` با استفاده از `generateStaticParams` برای SSG.
- [ ] ایجاد صفحات ماتریس سرویس `app/[city]/[service]/page.tsx` با لودینگ داینامیک محتوا.

## 🟣 Epic 6: موتور سئو تکنیکال (Technical SEO Engine)
- [ ] ایجاد تابع داینامیک `generateMetadata` در روت‌ها برای تولید خودکار `Title` و `Description` های محلی‌سازی‌شده (Localized).
- [ ] ایجاد کامپوننت `LocalBusinessSchema` (JSON-LD) و تزریق آن به فایل `layout.tsx` بر اساس شهر انتخابی.
- [ ] ایجاد اتوماتیک `sitemap.xml` و `robots.txt` در Next.js.
- [ ] بررسی و رفع خطاهای Accessibility (A11y) با افزودن ویژگی‌های `aria-label` به دکمه‌ها و منوها.

## ⚫ Epic 7: بهینه‌سازی و استقرار (Performance & Deployment)
- [ ] اجرای خروجی نسخه پروداکشن (`npm run build`) و بررسی حجم باندل جاوااسکریپت (Bundle Size).
- [ ] بررسی نمرات `Lighthouse` (Target: 95+ Mobile, 100 Desktop).
- [ ] استقرار (Deploy) نهایی روی سرویس‌دهنده Vercel و تنظیم متغیرهای محیطی (Environment Variables).
