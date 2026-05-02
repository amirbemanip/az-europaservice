# 🗺️ معماری سیستم و نقشه راه سازمانی (Enterprise System Architecture & Roadmap)
**معماری:** Jamstack / Headless / Edge-Rendered  
**سطح معماری:** 10/10 (Global Scale Infrastructure)  
**کد پروژه:** AZ-DOMINATION-2026

این سند نقشه راه فنی و بلوپرینت (Blueprint) دقیق برای تبدیل سایت فعلی به یک زیرساخت نرم‌افزاری عظیم است که قابلیت مقیاس‌پذیری (Scalability) به ۱۰۰ شهر آلمان را بدون افت سرعت داشته باشد.

---

## 🏛️ ۱. طراحی الگوهای توزیع محتوا (Content Delivery Patterns)
ما از معماری **Next.js 14 App Router** استفاده خواهیم کرد، اما نه به شکل ساده. ما از ترکیب استراتژی‌های رندرینگ پیشرفته استفاده می‌کنیم:

* **Static Site Generation (SSG) برای صفحات ماتریس (Matrix Pages):** تمام ۱۸ صفحه (۳ شهر × ۶ سرویس) در زمان Build (بیلد) سرور ساخته می‌شوند. خروجی نهایی صرفاً فایل‌های HTML و JSON خالص خواهد بود. زمان پاسخگویی (TTFB) در این حالت زیر ۵۰ میلی‌ثانیه خواهد بود.
* **Incremental Static Regeneration (ISR):** اگر نظرات جدیدی برای شهر ارلانگن در Sanity CMS اضافه شود، نیازی به بیلد کامل سایت نیست. Next.js به صورت هوشمند و در پس‌زمینه (Background Validation) فقط صفحه ارلانگن را دوباره می‌سازد و به کش Edge می‌فرستد.
* **Edge Caching:** سایت روی شبکه توزیع محتوا (CDN) جهانی مستقر می‌شود تا نزدیک‌ترین سرور به کاربر در آلمان (مثلاً دیتاسنتر فرانکفورت) داده‌ها را به او تحویل دهد.

---

## 💾 ۲. مدل‌سازی پایگاه داده (Headless CMS Data Modeling)
برای جلوگیری از محتوای تکراری، سیستم مدیریت محتوا (Sanity) را با اسکیماهای (Schemas) کاملاً رله‌شنال طراحی می‌کنیم.

### نمونه کد مدل‌سازی مفهومی (Conceptual Schema):
```typescript
// Schema: City (موجودیت شهر)
{
  name: 'city',
  type: 'document',
  fields: [
    { name: 'cityName', type: 'string' }, // e.g., "Nürnberg"
    { name: 'slug', type: 'slug' },
    { name: 'localPhone', type: 'string' },
    { name: 'localAddress', type: 'object' },
    { name: 'trustBadges', type: 'array', of: [{type: 'image'}] }, // نمادهای اعتماد لوکال
    { name: 'testimonials', type: 'array', of: [{type: 'reference', to: [{type: 'testimonial'}]}] }
  ]
}

// Schema: Service (موجودیت خدمات)
{
  name: 'service',
  type: 'document',
  fields: [
    { name: 'serviceName', type: 'string' }, // e.g., "Reinigung"
    { name: 'slug', type: 'slug' },
    { name: 'basePrice', type: 'number' },
    { name: 'globalDescription', type: 'text' }
  ]
}

// Schema: ServiceArea (موجودیت ماتریسی ترکیب شهر و سرویس)
{
  name: 'serviceArea',
  type: 'document',
  fields: [
    { name: 'city', type: 'reference', to: [{type: 'city'}] },
    { name: 'service', type: 'reference', to: [{type: 'service'}] },
    { name: 'uniqueLocalizedContent', type: 'portableText' }, // متن کاملاً یونیک برای جلوگیری از Cannibalization
    { name: 'seoMetadata', type: 'seoObject' } // متادیتای اختصاصی
  ]
}
```

---

## 🤖 ۳. موتور تولید لید و اتوماسیون (Lead Engine & Webhooks)
ما دیگر از افزونه‌های فرم‌ساز سنگین استفاده نمی‌کنیم. 
* **Smart Lead Form:** یک فرم React که به وسیله `React Hook Form` و `Zod` (برای اعتبارسنجی دقیق داده‌ها سمت کاربر) ساخته می‌شود.
* **API Route & Webhooks:** به جای ارسال ایمیل ساده، داده‌های فرم به پوشه `app/api/leads/route.ts` ارسال می‌شود.
* **اتصال به CRM (اختیاری در فازهای بعدی):** این API می‌تواند از طریق Webhook داده‌ها را مستقیماً به ابزارهایی مانند Zapier یا n8n بفرستد تا یک پیامک اتوماتیک برای مدیریت در واتس‌اپ یا ایمیل ارسال شود.

---

## 🎨 ۴. مهندسی دیزاین سیستم (Design System Engineering)
کدهای CSS در شرکت‌های 10/10 به صورت دلخواه و بی‌قاعده نوشته نمی‌شوند.
* **Design Tokens (Tailwind Config):** تمام متغیرهای رنگی، فواصل (Spacing)، و تایپوگرافی در فایل `tailwind.config.ts` به عنوان **Single Source of Truth** تعریف می‌شوند.
* **کامپوننت‌های اتمیک (Atomic Design):** دکمه‌ها، فرم‌ها، و کارت‌ها در پوشه `components/ui/` قرار می‌گیرند (مشابه معماری shadcn/ui) تا در تمام صفحات با ظاهر کاملاً یکدست رندر شوند.

---

## 🚀 ۵. пайپ‌لاین توسعه و دیپلوی (CI/CD Pipeline)
1. **Linting & Formatting:** استفاده از `ESLint` و `Prettier` در قالب `Husky Pre-commit Hooks` تا هیچ کد غیر استانداردی کامیت نشود.
2. **Type Checking:** تضمین اینکه `TypeScript` هیچ خطای Type-Mismatch نداشته باشد.
3. **Automated Testing:** استفاده از `Playwright` برای انجام تست‌های E2E (تست فرم تماس و اطمینان از باز شدن صفحات بدون خطای جاوااسکریپت).
4. **Automated Deployment:** با هر پوش (Push) روی گیت‌هاب، سرویس‌دهنده (Vercel) کد را بیلد کرده و به صورت اتوماتیک در Edge Network مستقر می‌کند.

---

## 📅 فازبندی اجرا (Agile Sprints)

### Sprint 1: Foundation & Data Modeling (هفته ۱)
* ستاپ اولیه پروژه، نصب وابستگی‌های سازمانی (Husky, Zod, React-Hook-Form, Framer-Motion).
* طراحی مدل‌های دیتابیس در Sanity (یا پیاده‌سازی فایل‌های TypeScript محلی به عنوان دیتابیس اولیه).
* پیاده‌سازی `tailwind.config.ts` با Design Tokens پرمیوم.

### Sprint 2: Core Components & Layouts (هفته ۲)
* ساخت هدر و فوتر داینامیک.
* ساخت کامپوننت عظیم `SmartLeadForm` با منطق چندمرحله‌ای.
* ساخت کامپوننت‌های `Hero`, `ServiceCard`, `TestimonialCarousel`.

### Sprint 3: Programmatic Routing & Pages (هفته ۳)
* اتصال دیتا به لایه UI.
* برنامه‌نویسی روت‌های `/[city]` و `/[city]/[service]`.
* پیاده‌سازی توابع `generateStaticParams` برای تولید ۱۸ صفحه ماتریسی.

### Sprint 4: SEO, Analytics & Polish (هفته ۴)
* تزریق متادیتاها و JSON-LD Schema.
* تست‌های Lighthouse و بهینه‌سازی LCP.
* تنظیم Cookie Consent و پیاده‌سازی GDPR.
