/**
 * COMPREHENSIVE ARABIC COMPLETION SCRIPT
 * Adds all missing Arabic translations for keys that exist in de.json but not ar.json
 * Prevents German fallback via deepMerge in getDictionary
 */
const fs = require('fs');
const ar = JSON.parse(fs.readFileSync('src/locales/ar.json', 'utf8'));
const de = JSON.parse(fs.readFileSync('src/locales/de.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));

// ======================== BLOG ========================
ar.blog = {
  title: "المدونة والأخبار",
  subtitle: "نصائح احترافية وأخبار شركة AZ-Europa Service",
  all_posts: "جميع المقالات",
  read_more: "قراءة المزيد",
  back_to_blog: "العودة إلى المدونة",
  published: "تاريخ النشر",
  author: "الكاتب",
  related_posts: "مقالات ذات صلة"
};

// ======================== SEO.faq ========================
ar.seo.faq = {
  title: "الأسئلة الشائعة | إدارة المرافق AZ-Europa في فرانكونيا",
  description: "أجوبة على أبرز الأسئلة حول خدمات التنظيف وإدارة المرافق وخدمات الحارس في إرلانجن ونورنبرغ وبامبرغ."
};

// ======================== HERO ========================
ar.hero.title = "إدارة مرافق بمستوى Meister في فرانكونيا";
ar.hero.paragraphs = [
  "خبرة ألمانية معتمدة في تنظيف المباني وإدارة المرافق والصيانة.",
  "إرلانجن · نورنبرغ · بامبرغ · فرانكونيا"
];

// ======================== TRUST ========================
ar.trust.badge = "شركة معتمدة بمستوى Meister";
ar.trust.stats = [
  { value: "500+", label: "عميل راضٍ" },
  { value: "10+", label: "سنوات الخبرة" },
  { value: "<2h", label: "وقت الاستجابة" },
  { value: "120+", label: "متخصص محلي" }
];

// ======================== SERVICES ========================
ar.services = {
  ...ar.services,
  home_title: "خدماتنا الشاملة",
  home_subtitle: "حلول متكاملة لإدارة مرافقك من مصدر واحد",
  home_badge: "360° خدمات شاملة",
  home_stat: "500+ عميل راضٍ",
  reinigung: {
    title: "تنظيف المباني",
    desc: "تنظيف احترافي للمكاتب والمرافق التجارية وفق أعلى المعايير الألمانية.",
    slug: "reinigung"
  },
  hausmeisterservice: {
    title: "خدمات الحارس",
    desc: "إدارة فنية شاملة لمبانيك مع استجابة سريعة في الطوارئ.",
    slug: "hausmeisterservice"
  },
  renovierungen: {
    title: "التجديد والترميم",
    desc: "تجديد احترافي للمساحات التجارية والتاريخية بمعايير ألمانية.",
    slug: "renovierungen"
  },
  abbrucharbeiten: {
    title: "أعمال الهدم",
    desc: "هدم آمن ومهني مع إدارة النفايات وفق اللوائح البيئية الألمانية.",
    slug: "abbrucharbeiten"
  },
  gartenpflege: {
    title: "العناية بالحديقة",
    desc: "رعاية المساحات الخضراء طوال العام بدءاً من قص العشب وصولاً للخدمات الشتوية.",
    slug: "gartenpflege"
  },
  entruempelung: {
    title: "تفريغ وإخلاء",
    desc: "إخلاء احترافي وسريع للمباني والشقق والمستودعات.",
    slug: "entruempelung"
  }
};

// ======================== TESTIMONIALS ========================
ar.testimonials = {
  ...ar.testimonials,
  subtitle: "ماذا يقول عملاؤنا عنا",
  google_reviews: "تقييمات جوجل",
  all_reviews: "جميع التقييمات",
  verified: "تم التحقق"
};

// ======================== COMMON ========================
ar.common = {
  ...ar.common,
  send: "إرسال",
  more: "المزيد",
  details_prices: "التفاصيل والأسعار",
  verified: "معتمد",
  tuev_geprueft: "فحص TÜV"
};

// ======================== CITY_PAGE ========================
ar.city_page = {
  ...ar.city_page,
  hero_desc: "بصفتنا شركة ألمانية معتمدة (Meisterbetrieb)، نقدم خدمات تنظيف المباني والصيانة والتجديد في {city}.",
  service_title: "خدمات مصممة خصيصاً لـ {city}",
  cta_subtitle: "فريقنا المحلي في {city} في خدمتك.",
  cta_button: "اطلب عرض سعر مجاناً",
  local_hotline: "الخط الساخن المحلي",
  central_location: "موقع مركزي"
};

// ======================== SERVICE_PAGE ========================
ar.service_page = {
  ...ar.service_page,
  express_badge: "خدمة سريعة",
  feature_points: ["جودة معتمدة", "فريق محلي", "ضمان الاستجابة في ساعتين"],
  consultation_badge: "استشارة مجانية",
  content_title: "خدماتنا في التفاصيل",
  content_subtitle: "الجودة المعتمدة بمستوى Meister",
  content_p1: "بصفتنا شركة ألمانية معتمدة (Meisterbetrieb)، نقدم حلولاً شاملة ومخصصة لكل عميل.",
  why_us_title: "لماذا AZ-Europa Service؟",
  why_us_p1: "خبرة موثوقة ومعتمدة في خدمة مئات العملاء في فرانكونيا.",
  gepruefte_qualitaet_title: "جودة مختبرة",
  gepruefte_qualitaet_desc: "كل خدماتنا تُنفَّذ وفق أعلى المعايير الألمانية.",
  local_presence_title: "حضور محلي",
  branch_label: "فرع",
  availability_label: "متاحون",
  availability_days: "السبت - الأحد",
  notdienst_label: "خدمة طوارئ 24/7",
  reviews_title: "آراء العملاء",
  local_partner_label: "شريك محلي",
  location_strip_text: "نخدمكم في {city} والمناطق المحيطة بها",
  in_city: "في {city}",
  numerous_customers: "عملاء راضون",
  surroundings: "والمناطق المحيطة",
  expertise_label: "خبرة متخصصة",
  tailored: "حلول مخصصة",
  desc_suffix: "في فرانكونيا",
  offer_title: "احصل على عرض سعر",
  offer_desc_template: "عرض سعر مجاني لـ {service} في {city}",
  availability_desc: "متاحون لحالات الطوارئ على مدار 24/7",
  open_details: "عرض التفاصيل",
  request_now: "اطلب الآن",
  request_desc_template: "طلب {service} في {city}",
  master_quality: "جودة Meisterbetrieb",
  master_desc: "شهادة حرفية رسمية ومعتمدة من الدولة الألمانية.",
  benefit1: "جودة عالية ومضمونة",
  benefit2: "فريق محلي ومتمركز",
  benefit3: "ضمان الاستجابة في ساعتين",
  benefit4: "مواد صديقة للبيئة",
  benefit5: "عقود مرنة",
  benefit6: "خدمة طوارئ 24/7"
};

// ======================== HEADER ========================
ar.header = {
  announcement: "ضمان الرد خلال ساعتين · إرلانجن · نورنبرغ · بامبرغ",
  opening_hours: "الإثنين - الجمعة: 08:00 – 17:00",
  locations_summary: "إرلانجن · نورنبرغ · بامبرغ",
  menu_aria: "قائمة التنقل",
  our_services: "خدماتنا",
  master_business: "شركة معتمدة",
  free_cleaning_title: "تنظيف تجريبي مجاني",
  free_cleaning_desc: "جرب جودتنا بدون أي تكلفة أو التزام.",
  test_now: "جرب الآن",
  locations_region: "فرانكونيا",
  learn_more: "معرفة المزيد",
  certified: "معتمد",
  cert_tuv: "TÜV معتمد",
  cert_iso: "ISO معتمد",
  cert_master: "Meisterbetrieb",
  cert_insured: "مؤمَّن بالكامل",
  headquarters: "المقر الرئيسي"
};

// ======================== FOOTER ========================
ar.footer = {
  ...ar.footer,
  direct_contact: "تواصل مباشر",
  contact_hours: "الإثنين - الجمعة: 08:00 – 17:00",
  online_request: "طلب إلكتروني",
  brand_tagline: "جودة. بشهادة رسمية.",
  brand_desc: "شركتك الموثوقة لإدارة المرافق في منطقة فرانكونيا.",
  cert_tuv: "TÜV",
  cert_master: "Meisterbetrieb",
  cert_iso: "ISO",
  newsletter_title: "اشترك في نشرتنا الإخبارية",
  newsletter_desc: "نصائح ومستجدات إدارة المرافق مباشرة إلى بريدك الإلكتروني.",
  newsletter_success: "شكراً على اشتراكك!",
  email_placeholder: "بريدك الإلكتروني",
  subscribe: "اشترك",
  spam_note: "لن نرسل لك رسائل غير مرغوب فيها.",
  company: "الشركة",
  career: "العمل معنا",
  legal: "قانوني",
  all_rights: "© 2024 AZ-Europa Service GmbH. جميع الحقوق محفوظة."
};

// ======================== CHAT ========================
ar.chat = {
  ...ar.chat,
  online_status: "متصل الآن",
  welcome: "مرحباً! كيف يمكنني مساعدتك؟",
  phone_label: "اتصل بنا",
  email_label: "راسلنا",
  faq_tab: "الأسئلة الشائعة",
  direct_msg_tab: "رسالة مباشرة",
  back: "رجوع",
  sent_success: "تم الإرسال بنجاح!",
  sent_desc: "سنتواصل معك خلال ساعتين.",
  name_placeholder: "اسمك",
  email_placeholder: "بريدك الإلكتروني",
  msg_placeholder: "رسالتك...",
  send_btn: "إرسال",
  legal_note: "بإرسال الرسالة، تقبل سياسة الخصوصية.",
  faqs: [
    { q: "ما هي مناطق خدمتكم؟", a: "نخدم إرلانجن ونورنبرغ وبامبرغ وفورت وجميع مناطق فرانكونيا." },
    { q: "هل تقدمون عروض أسعار مجانية؟", a: "نعم، الاستشارة والتقييم الميداني مجاني تماماً وبدون التزام." },
    { q: "ما هو وقت الاستجابة لحالات الطوارئ؟", a: "نضمن الاستجابة خلال ساعتين لعملائنا خلال ساعات العمل، و24/7 لعملاء SLA." }
  ]
};

// ======================== Save & Verify ========================
fs.writeFileSync('src/locales/ar.json', JSON.stringify(ar, null, 2), 'utf8');
console.log('Comprehensive AR completion done!');

// Check how many missing keys remain vs DE
const arNew = JSON.parse(fs.readFileSync('src/locales/ar.json', 'utf8'));
const deKeys = Object.keys(de);
let missing = 0;
deKeys.forEach(k => {
  if (!arNew[k]) { console.log('Still MISSING top-level: ' + k); missing++; }
});

// Count partial matches
let partial = 0;
deKeys.forEach(k => {
  if (arNew[k] && typeof de[k] === 'object' && !Array.isArray(de[k])) {
    const deSubKeys = Object.keys(de[k]);
    const missingSubKeys = deSubKeys.filter(sk => !arNew[k][sk]);
    if (missingSubKeys.length > 0) {
      partial++;
    }
  }
});

console.log('\nTop-level keys still missing:', missing);
console.log('Sections with partial coverage:', partial);
console.log('\nJSON valid:', (() => { try { JSON.parse(JSON.stringify(arNew)); return 'YES'; } catch(e) { return 'NO: ' + e.message; }})());
