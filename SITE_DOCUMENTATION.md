# AZ-Europa Service Next — مستند جامع پروژه

این سند به عنوان منبع واحد مستندسازی برای تیم توسعه و عملیات است تا تمامی جنبه‌های پروژه را به صورت دقیق بشناسند و تغییرات را به طور منظم پیاده‌سازی کنند.

 آخرین به‌روزرسانی: 2026-05-05

## 0) فهرست سریع
- 1) Tech Stack و نسخه‌ها
- 2) معماری پروژه
- 3) نقشهٔ فایل‌ها (مختصر و کاربردی)
- 4) APIها
- 5) مدل‌های داده
- 6) ترجمه و locale
- 7) صفحات کلیدی با توضیح مختصر
- 8) امنیت و عملکرد
- 9) راه‌اندازی و کار با پروژه
- 10) تغییرات آینده

--------------------------------------------------------------------------------

## 1) Tech Stack و نسخه‌ها
- Next.js: 16.2.4
- React: 18.2.0
- TypeScript: >=4.x
- Tailwind CSS و ابزارهای وابسته
- zod: 4.x
- framer-motion, lucide-react
- سایر کتابخانه‌های استفاده‌شده در پروژه

--------------------------------------------------------------------------------

## 2) معماری پروژه
- src/app/: ساختار App Router با locale-based routing
- src/app/api/: API routes (lead, newsletter)
- src/middleware.ts: هدایت زبان و مسیرها
- src/data/db.ts: داده‌های نمونه (city, services, testimonials)
- src/locales/: فایل‌های ترجمه
- src/components/: کامپوننت‌های UI و خانه
- src/lib/: اعتبارسنجی و دیکشنری
- src/types/: تایپ‌های TypeScript
- src/app/sitemap.ts: نقشهٔ سایت
- src/data/blog.ts: نمونهٔ دادهٔ بلاگ برای sitemap
 - سورس‌های مرتبط با UI و صفحات قانونی

--------------------------------------------------------------------------------

## 3) نقشهٔ فایل‌ها (مختصر و کاربردی)
1. src/app/[locale]/layout.tsx — لایهٔ کل Locale با رندر header/footer و متادیتا
2. src/app/[locale]/page.tsx — صفحهٔ اصلی هر locale
3. src/app/[locale]/kontakt/page.tsx — صفحهٔ تماس
4. src/app/[locale]/[city]/page.tsx — هاب شهر
5. src/app/[locale]/[city]/[service]/page.tsx — ماتریس خدمت در شهر
6. src/app/[locale]/leistungen/page.tsx — خدمات کلی
7. src/app/[locale]/leistungen/[service]/page.tsx — جزئیات خدمت
8. src/app/[locale]/agb/page.tsx — شرایط استفاده
9. src/app/[locale]/datenschutz/page.tsx — سیاست حفظ حریم خصوصی
10. src/app/[locale]/impressum/page.tsx — اطلاعات قانونی
11. src/app/[locale]/karriere/page.tsx — فرصت‌های شغلی
12. src/app/api/lead/route.ts — Lead API
13. src/app/api/newsletter/route.ts — Newsletter API
14. src/middleware.ts — هدایت locale و lowercase URLs
15. src/data/db.ts — داده‌های نمونه
16. src/locales/ — ترجمه‌های locale
17. src/components/ — کامپوننت‌های UI

--------------------------------------------------------------------------------

## 4) APIها
- Lead API: POST /api/lead
- Newsletter API: POST /api/newsletter
- اعتبارسنجی با validations.ts: LeadFormData و NewsletterData
- نرخ‌ محدودسازی Lead: در حافظه (in-memory) با RATE_MAP
- سرویس ایمیل: Resend (ENV: RESEND_API_KEY، RESEND_FROM، RESEND_TO)
- پاسخ‌های متداول: 200 موفق، 400 ورودی نامعتبر، 429 محدودیت درخواستی، 502 در صورت خطای ایمیل

--------------------------------------------------------------------------------

## 5) مدل‌های داده
- Location: آدرس، کد پستی، شهر، تلفن، googleMapsUrl، coordinates
- CityData: id, name, slug, location, isPrimaryHub
- ServiceData: id, title, slug, description, icon
- Testimonial: id, author, cityId, serviceId, content, rating

نمونهٔ کوتاه از داده‌های db.ts در زیر آمده است (مختصر):
```ts
export const cities: CityData[] = [
  { id: 'erlangen', name: 'Erlangen', slug: 'erlangen', isPrimaryHub: true, location: { address: 'Apfelstraße 5', postalCode: '91054', city: 'Erlangen', phone: '+49 9131 6146235' } },
  // ... سایر شهرها
];
```

--------------------------------------------------------------------------------

## 6) ترجمه و locale
- localeها: de, en, fa, ar, ru, uk
- getDictionary(locale): lazy-load مترجمه‌ها
- RTL/LTR: fa/ar راست‌چین، سایر locales چپ‌چین

--------------------------------------------------------------------------------

## 7) صفحات کلیدی با توضیح مختصر
- /[locale]/page.tsx: صفحهٔ اصلی locale
- /[locale]/kontakt/page.tsx: تماس
- /[locale]/[city]/page.tsx: City hub
- /[locale]/[city]/[service]/page.tsx: Service matrix
- /[locale]/leistungen/page.tsx: Service overview
- /[locale]/leistungen/[service]/page.tsx: Service detail
- /[locale]/agb, /[locale]/datenschutz, /[locale]/impressum, /[locale]/karriere: صفحات قانونی
- sitemap.ts: نقشهٔ سایت
- api/lead، api/newsletter: APIهای کلیدی

--------------------------------------------------------------------------------

## 8) امنیت و عملکرد
- پنهان‌سازی داده‌های حساس در لاگ‌ها
- نرخ‌ محدودسازی Lead برای محیط‌های توزیع‌شده: Redis پیشنهاد می‌شود
- env vars حساس: RESEND_API_KEY، RESEND_FROM، RESEND_TO
- پیشنهاد: اضافه کردن تست‌های واحد و ادغام

--------------------------------------------------------------------------------

## 9) راه‌اندازی و کار با پروژه
- دستورها:
  - npm install
  - npm run dev
  - npm run build
  - npm run start
- برای گیت‌ها: patch/commit و PR
- ENV: RESEND_API_KEY، RESEND_FROM، RESEND_TO و NEXT_PUBLIC_GTM_ID

--------------------------------------------------------------------------------

## 10) تغییرات آینده
- تست RTL برای UI
- rate limiting distributed
- SEO بهینه‌تر با تصاویر و meta-tagهای بیشتر
 - مستندسازی دقیق هر patch/PR

--------------------------------------------------------------------------------

 اگر لازم است نسخهٔ انگلیسی هم اضافه شود، خبر بده تا به صورت جداگانه اضافه کنم.

## 11) API Payload Specifications
- Lead payload fields (POST /api/lead):
  - city (string, required): نام شهر یا slug شهر انتخابی
  - service (string, required): slug خدمت
  - email (string, required): ایمیل معتبر
  - name (string, required): نام کاربر
  - phone (string, optional): شماره تلفن
  - message (string, optional): پیام کاربر
  - نمونهٔ JSON:
    ```json
    {
      "city": "erlangen",
      "service": "reinigung",
      "email": "alice@example.com",
      "name": "Alice",
      "phone": "+49 123 456",
      "message": "متنی توضیحی"
    }
    ```
- Newsletter payload (POST /api/newsletter):
  - email (string, required): ایمیل معتبر
  - نمونه:
    ```json
    {
      "email": "subscriber@example.com"
    }
    ```
- Error mapping:
  - 400: invalid payload / validation errors
  - 429: rate-limit exceeded (per-IP in current impl)
  - 502: email service failed

--------------------------------------------------------------------------------

## 12) Data Dictionary (Detailed)
- CityData:
  - id: string
  - name: string
  - slug: string
  - location: Location
  - isPrimaryHub?: boolean
- ServiceData:
  - id: string
  - title: string
  - slug: string
  - description: string
- LeadFormData (Lead):
  - city: string
  - service: string
  - email: string
  - name: string
  - phone?: string
  - message?: string
- NewsletterData:
  - email: string
- Location:
  - address: string
  - postalCode: string
  - city: string
  - phone: string
  - googleMapsUrl?: string
  - coordinates?: { latitude: number; longitude: number }
- Sample data (from src/data/db.ts) covers 3 cities and 6 services with a couple of testimonials.

--------------------------------------------------------------------------------

## 13) Data Flow (Narrative)
- Lead form submission path:
  1) User fills lead form on any locale/page
  2) Client-side validation (zod) is performed on server-side API
  3) Lead data is logged on server (with caution for PII)
  4) Rate limiter checks IP; if allowed, data is persisted in memory and email notification sent via Resend (if configured)
  5) API returns 200 on success, or error code on failure
- Newsletter path:
  1) User submits email on newsletter form
  2) Server validates and sends notification email via Resend
  3) Return 200/502 depending on outcome
- Page rendering flow:
  - Locale selected → getDictionary loads translations → metadata generated → header/footer and content rendered
- All flows respect RTL/LTR decisions based on locale (fa/ar RTL)

--------------------------------------------------------------------------------

## 14) Testing Strategy (High-Level)
- Unit tests:
  - Validations (leadFormSchema, newsletterSchema)
  - Locale dictionary loading
- Integration tests:
  - Lead API happy path and failure paths
  - Newsletter API happy path and failure paths
- End-to-end tests (optional):
  - User visits a locale, navigates to lead form, submits and receives a response
  - Email sending is mocked or integrated with a test harness

--------------------------------------------------------------------------------

## 15) Deployment & Environment
- Required env vars:
  - RESEND_API_KEY
  - RESEND_FROM (default: no-reply@az-europaservice.de)
  - RESEND_TO (default: info@az-europaservice.de)
  - NEXT_PUBLIC_GTM_ID (optional)
- Instructions:
  - Configure environment in hosting provider or container
  - Ensure secrets are stored securely
  - Run npm install, build, then deploy

--------------------------------------------------------------------------------

## 16) Security & Privacy
- Avoid logging PII; mask or redact in logs
- Rate limiting should be distributed (consider Redis or similar)
- Validate input thoroughly; guard against injection and XSS in emails
- Data retention policy: log only essentials; consider deletion after a period

--------------------------------------------------------------------------------

## 17) Performance & Scaling Considerations
- Use ISR/SSG appropriately; caching of static pages per locale
- Lazy-load heavy components and optimize images
- Consider CDN edge caching for static assets
- Move in-memory rate limiter to shared store in multi-instance envs

--------------------------------------------------------------------------------

## 18) Localization & Accessibility (A11y)
- RTL/LTR handling for all UI elements and forms
- Semantic HTML, aria labels on interactive elements
- Keyboard navigation and focus management in modal widgets (chat, lead forms)

--------------------------------------------------------------------------------

## 19) Change Management & Release Process
- Semantic versioning and changelog per release
- PR reviews, pre-commit hooks, linting and tests
- Backward-compatibility: avoid breaking API without clear migration plan

--------------------------------------------------------------------------------

## 20) Onboarding & Maintenance
- Quickstart for new developers
- List of critical files to review first
- How to run local tests and verify builds

--------------------------------------------------------------------------------

## 21) Glossary
- locale: زبان یا منطقهٔ زبانی
- RTL/LTR: راست‌چین/چپ‌چین
- CSR: Client-Side Rendering (برای برخی بخش‌ها)
- ISR: Incremental Static Regeneration
- Resend: سرویس ارسال ایمیل

--------------------------------------------------------------------------------

## 22) References
- src/lib/validations.ts
- src/lib/get-dictionary.ts
- src/app/sitemap.ts
- src/middleware.ts
- src/data/db.ts
- locales/*.json

--------------------------------------------------------------------------------

اگر باز هم نیاز داری بخش‌های بیشتری افزوده شود یا ساختار را تغییر دهم، بگو تا مطابق خواسته‌ات پیش بریم.
