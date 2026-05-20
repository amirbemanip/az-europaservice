/**
 * FULL REBUILD of ar.json
 * Strategy: 
 * 1. Start with EN json as the structural template (it's correct)
 * 2. Keep all Arabic text that is ALREADY correctly encoded (not garbled, not literal keys)
 * 3. For corrupted sections, replace with correct Arabic from the draft files
 * 4. For sections not in drafts, restore correct Arabic manually from the known correct values
 */

const fs = require('fs');
const path = require('path');

const enData = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
const arData = JSON.parse(fs.readFileSync('src/locales/ar.json', 'utf8'));

// Deep clone EN as our base structure
const newAr = JSON.parse(JSON.stringify(enData));

// ===== SECTION 1: NAV =====
newAr.nav = {
  home: "الرئيسية",
  services: "الخدمات",
  locations: "المواقع",
  about: "عن الشركة",
  contact: "اتصل بنا",
  cta: "طلب عرض سعر"
};

// ===== SECTION 2: SEO (from ar.json - the seo keys appear mostly correct) =====
// Keep the known good Arabic SEO data that was successfully integrated
newAr.seo = {
  home: {
    title: "شركة AZ-Europa لإدارة المرافق والتنظيف في فرانكونيا | معتمدة بمستوى Meister",
    description: "خدمات التنظيف الصناعي، إدارة المرافق، والصيانة في إرلانجن، نورنبرغ وبامبرغ. جودة ألمانية معتمدة. استجابة مضمونة خلال ساعتين.",
    slug: "/"
  },
  about: {
    title: "معلومات عنا | AZ-Europa Service GmbH - Meisterbetrieb في فرانكونيا",
    description: "تعرف على قصة AZ-Europa Service GmbH. أكثر من 10 سنوات من الخبرة في إدارة المرافق والتنظيف الاحترافي في منطقة نورنبرغ.",
    slug: "/ar/ueber-uns"
  },
  contact: {
    title: "اتصل بنا والاستشارة | إدارة المرافق AZ-Europa في فرانكونيا",
    description: "اطلب عرض سعر مجاني وغير ملزم لخدمات إدارة المرافق والتنظيف التجاري الممتاز في منطقة نورنبرغ. ضمان الرد خلال ساعتين.",
    slug: "/ar/contact"
  },
  karriere: {
    title: "وظائف وإدارة مرافق | العمل في التنظيف في نورنبرغ",
    description: "انضم إلى شركة AZ-Europa. نحن نقدم وظائف برواتب عادلة أعلى من الحد الأدنى، أمان وظيفي كامل في ألمانيا، ومعدات حديثة. قدم طلبك الآن!",
    slug: "/ar/careers"
  },
  locations: {
    title: "إدارة المرافق في إرلانجن، نورنبرغ، بامبرغ | التواجد الإقليمي",
    description: "شريكك المحلي للتنظيف التجاري وإدارة المرافق في منطقة نورنبرغ الكبرى. أوقات استجابة سريعة جداً بفضل شبكتنا اللوجستية في فرانكونيا.",
    slug: "/ar/locations"
  },
  services: {
    title: "إدارة المرافق والخدمات ذات المستوى المعتمد في منطقة فرانكونيا",
    description: "كتالوج خدمات AZ-Europa Service GmbH. تنظيف الصيانة، خدمات الحارس، العناية بالحديقة وخدمات البناء من مصدر واحد في منطقة نورنبرغ الكبرى.",
    slug: "/ar/leistungen"
  },
  erlangen: {
    title: "تنظيف المباني وخدمات الحارس في إرلانجن | Meisterbetrieb",
    description: "شريكك في إدارة المرافق والتنظيف الطبي وخدمات الحارس في إرلانجن. تركيز على Medical Valley وجامعة FAU.",
    slug: "/ar/standorte/erlangen"
  },
  nuernberg: {
    title: "تنظيف المباني وخدمات الحارس في نورنبرغ | Meisterbetrieb",
    description: "شريكك المعتمد في إدارة المرافق والتنظيف الصناعي وخدمات الحارس في نورنبرغ. تركيز على المعرض والميناء والمنطقة الحضرية.",
    slug: "/ar/standorte/nuernberg"
  },
  bamberg: {
    title: "تنظيف المباني وخدمات الحارس في بامبرغ | رعاية التراث العالمي لليونسكو",
    description: "شركتك المتخصصة في إدارة المرافق وخدمات الحارس وتنظيف المباني في بامبرغ. متخصصون في المباني التاريخية والعقارات الحديثة.",
    slug: "/ar/standorte/bamberg"
  },
  impressum: {
    title: "بيانات الشركة القانونية | AZ-Europa Service GmbH",
    description: "الملاحظات القانونية والبيانات الإلزامية لشركة AZ-Europa Service GmbH.",
    slug: "/ar/impressum"
  },
  datenschutz: {
    title: "سياسة الخصوصية | AZ-Europa Service GmbH",
    description: "معلومات حول حماية بياناتك الشخصية في AZ-Europa Service GmbH وفقاً للائحة GDPR.",
    slug: "/ar/datenschutz"
  },
  agb: {
    title: "الشروط والأحكام العامة | AZ-Europa Service GmbH",
    description: "الشروط والأحكام العامة لشركة AZ-Europa Service GmbH.",
    slug: "/ar/agb"
  }
};

// ===== SECTION 3: HERO =====
newAr.hero = {
  badge: "Meisterbetrieb · شركة معتمدة",
  title_1: "إدارة المرافق",
  title_2: "بمعايير ألمانية",
  title_3: "في فرانكونيا",
  desc: "خدمات احترافية لتنظيف المباني، إدارة المرافق، والصيانة في إرلانجن، نورنبرغ وبامبرغ. جودة شركة Meisterbetrieb المعتمدة مع ضمان الرد خلال ساعتين.",
  cta_primary: "طلب عرض سعر مجاناً",
  cta_secondary: "استكشاف خدماتنا",
  subtitle: "شريكك الموثوق في شمال بافاريا",
  trust: {
    certified: "Meisterbetrieb",
    local: "محلي بنسبة 100%",
    response: "ضمان الرد في ساعتين"
  }
};

// ===== SECTION 4: CTA SECTION =====
newAr.cta_section = enData.cta_section; // Use EN as placeholder - will be overwritten below
newAr.cta_section = {
  badge: "استشارة مجانية",
  title: "مستعد لتحسين مرافقك؟",
  desc: "تواصل معنا اليوم للحصول على تقييم مجاني وعرض سعر غير ملزم.",
  cta_primary: "احصل على عرض سعر الآن",
  cta_secondary: "اعرف المزيد عنا",
  stats: [
    { value: "500+", label: "عميل راضٍ" },
    { value: "10+", label: "سنوات خبرة" },
    { value: "<2h", label: "وقت الاستجابة" }
  ],
  points: [
    { label: "تدقيق ميداني مجاني", icon: "check" },
    { label: "عرض سعر شفاف", icon: "check" },
    { label: "بدون التزام", icon: "check" }
  ]
};

// ===== SECTION 5: TRUST =====
newAr.trust = {
  title: "لماذا يثق بنا العملاء؟",
  meisterbetrieb: "شركة معتمدة (Meisterbetrieb)",
  tuev: "فحوصات TÜV",
  answer_2h: "ضمان الرد خلال ساعتين",
  local: "فرق عمل محلية",
  items: [
    { title: "جودة معتمدة", desc: "نعمل وفق أعلى المعايير الألمانية المعتمدة." },
    { title: "تواجد محلي", desc: "فرق عمل متمركزة في إرلانجن ونورنبرغ وبامبرغ." },
    { title: "استجابة سريعة", desc: "نضمن الرد على استفساراتك خلال ساعتين." }
  ]
};

// ===== SECTION 6: SERVICES =====
// Keep Arabic from existing ar.json where it looks correct
// The leistungen section might be OK from previous integration
newAr.services = arData.services && arData.services.title ? arData.services : {
  title: "خدماتنا",
  desc: "حلول شاملة لإدارة المرافق",
  all: "جميع الخدمات"
};

// ===== SECTION 7: FAQ =====
newAr.faq = arData.faq && arData.faq.title ? arData.faq : {
  title: "الأسئلة الشائعة",
  items: []
};

// ===== SECTION 8: TESTIMONIALS =====
newAr.testimonials = {
  title: "ماذا يقول عملاؤنا",
  badge: "آراء العملاء",
  items: [
    {
      name: "Michael K.",
      company: "شركة لوجستية، نورنبرغ",
      service: "تنظيف الصيانة",
      text: "نعمل مع AZ-Europa منذ سنوات. الفريق موثوق ومحترف دائماً."
    },
    {
      name: "Dr. Sarah M.",
      company: "مجمع طبي، إرلانجن",
      service: "تنظيف طبي",
      text: "في بيئتنا الطبية، الدقة ضرورية. AZ-Europa يلتزم دائماً بأعلى معايير النظافة."
    },
    {
      name: "Thomas B.",
      company: "مجمع مكتبي، بامبرغ",
      service: "إدارة مرافق شاملة",
      text: "الفريق محلي ويتواصل بسرعة. نوصي بهم بشدة."
    }
  ]
};

// ===== SECTION 9: FORM =====
newAr.form = {
  title: "طلب عرض سعر",
  desc: "سنرد عليك خلال ساعتين",
  steps: {
    location: {
      title: "الموقع",
      subtitle: "أين تحتاجنا؟",
      desc: "اختر موقعك في ألمانيا."
    },
    service: {
      title: "الخدمة",
      subtitle: "أي خدمة تحتاج؟",
      desc: "اختر الخدمة المطلوبة."
    },
    contact: {
      title: "الاتصال",
      subtitle: "كيف نتواصل معك؟",
      desc: "ستُعالج بياناتك بسرية تامة."
    }
  },
  fields: {
    name: "الاسم / الشركة *",
    name_placeholder: "اسمك أو اسم الشركة",
    phone: "الهاتف",
    phone_placeholder: "+49 ...",
    email: "البريد الإلكتروني *",
    email_placeholder: "example@domain.com",
    message: "الرسالة (اختياري)",
    message_placeholder: "صف طلبك باختصار..."
  },
  buttons: {
    next: "التالي",
    prev: "السابق",
    submit: "طلب عرض سعر",
    submitting: "جارٍ الإرسال..."
  },
  trust: {
    ssl: "تشفير SSL",
    gdpr: "متوافق مع GDPR",
    response: "الرد في ساعتين"
  },
  success: {
    title: "تم الإرسال بنجاح!",
    desc: "شكراً لطلبك. سيتصل بك أحد خبرائنا في غضون ساعتين."
  },
  validation: {
    city: "يرجى اختيار الموقع",
    service: "يرجى اختيار الخدمة"
  },
  cities: ["إرلانجن", "نورنبرغ", "بامبرغ", "منطقة أخرى"],
  services: ["تنظيف المباني", "إدارة المرافق", "خدمات الحارس", "العناية بالحديقة", "خدمات البناء", "تنظيف طارئ"]
};

// ===== SECTION 10: COMMON =====
newAr.common = {
  meisterbetrieb: "شركة معتمدة",
  answer_2h: "ضمان الرد في ساعتين",
  open_details: "عرض التفاصيل",
  learn_more: "معرفة المزيد",
  contact_us: "اتصل بنا",
  all_services: "جميع الخدمات",
  request_quote: "طلب عرض سعر",
  free_consultation: "استشارة مجانية"
};

// ===== SECTION 11: CITY PAGE =====
newAr.city_page = {
  hero_badge: "متواجدون في {city}، شريكك من أجل",
  hero_title_1: "الجودة في {city}، ",
  hero_title_2: "بصفتنا شركة متخصصة معتمدة، نقدم خدمات تنظيف المباني، والصيانة، والتجديد في {city} والمناطق المحيطة بها. الدقة والنظام الألماني.",
  service_catalog: "كتالوج خدمات {city}، خدمات شاملة لعقارك",
  service_desc: "من التنظيف الدوري إلى التجديدات المعقدة - نحن نغطي كامل نطاق إدارة المباني في {city}.",
  trust_title: "لماذا يثق العملاء بنا في {city}؟",
  trust_points: [
    { title: "شركة معتمدة (Meisterbetrieb)", desc: "شهادات ألمانية رسمية." },
    { title: "فريق محلي", desc: "موظفون يعملون في {city} ويعرفون المنطقة." }
  ],
  satisfied_customers: "عملاء راضون في {city}",
  cta_title: "جاهز للبدء في {city}؟",
  cta_desc: "تواصل معنا للحصول على استشارة مجانية.",
  cta_primary: "اطلب عرض سعر مجاناً"
};

// ===== SECTION 12: SERVICE PAGE =====
newAr.service_page = {
  hero_badge: "خدماتنا",
  hero_desc: "حلول شاملة لإدارة مرافقك",
  offer_card_title: "طلب عرض سعر",
  offer_card_subtitle: "مجاناً وبدون التزام",
  offer_card_desc: "احصل على عرض سعر مفصل لخدماتنا.",
  offer_card_cta: "اطلب الآن",
  meisterbetrieb_title: "معتمدون كـ Meisterbetrieb",
  meisterbetrieb_desc: "جميع خدماتنا تُنفَّذ وفق أعلى المعايير الألمانية.",
  all_locations_link: "جميع المواقع",
  availability_title: "متاحون 24/7 لحالات الطوارئ"
};

// ===== SECTION 13: REGION MAP & GEO MAP =====
newAr.region_map = {
  badge: "تواجد إقليمي",
  title_template: "خبرتنا في {region}.",
  region_highlight: "فرانكونيا",
  desc: "نحن أكثر من مجرد مزود خدمة — نحن شريكك المحلي. مع فرق مخصصة نضمن أقصى قدر من القرب من العملاء والحفاظ على قيمة العقارات في جميع أنحاء فرانكونيا.",
  teams_label: "فرق محلية 100%",
  teams_sub: "لا مسافات طويلة",
  branch_label: "فرع",
  open_page: "عرض التفاصيل"
};

newAr.geo_map = {
  badge: "تواجد إقليمي",
  title: "متواجدون في كل أنحاء فرانكونيا.",
  desc: "مع مواقعنا في إرلانجن، نورنبرغ وبامبرغ، نضمن أوقات استجابة سريعة وجودة عالية مباشرة على عتبة بابك.",
  emergency_active: "خدمة طوارئ 24/7 نشطة",
  reaktionszeit_value: "<30 دقيقة",
  reaktionszeit_label: "وقت الاستجابة",
  lokale_teams_label: "100% إقليمي",
  zentrale: "المقر الرئيسي"
};

// ===== SECTION 14: ABOUT - from successfully integrated data =====
newAr.about = arData.about && arData.about.hero_title && !arData.about.hero_title.includes('name') ? arData.about : {
  hero_badge: "عن الشركة",
  hero_title: "قصة AZ-Europa: إرث من التميز والخبرة المعتمدة",
  hero_desc: "لقد أسس AZ-Europa Service GmbH على أسس بسيطة وواضحة: تقديم خدمات الحرفيين المحترفين، المدعومة بشهادة Meisterbetrieb الألمانية الصارمة، لعملاء يرفضون المساومة على الجودة.",
  quality_title: "جودة بشهادة رسمية",
  quality_desc: "نحن لا نعد فحسب بالجودة؛ بل نُثبتها بشهادات رسمية ومعتمدة.",
  stats_projects: "+500 مشروع",
  stats_experience: "+10 سنوات خبرة",
  values: [
    { title: "الجودة", desc: "معايير ألمانية في كل جانب من جوانب عملنا." },
    { title: "الموثوقية", desc: "الالتزامات ليست مجرد كلام - بل ضمانات مطلقة." },
    { title: "الاستدامة", desc: "مواد صديقة للبيئة وعمليات مسؤولة." }
  ],
  cta_title: "هل أنت مستعد للشراكة مع شركة من الدرجة الأولى؟",
  cta_desc: "تواصل معنا اليوم للحصول على استشارة مجانية.",
  paragraphs: arData.about && Array.isArray(arData.about.paragraphs) ? arData.about.paragraphs : []
};

// ===== SECTION 15: KONTAKT - from successfully integrated data =====
newAr.kontakt = arData.kontakt && arData.kontakt.hero_title && !arData.kontakt.hero_title.includes('form') ? arData.kontakt : {
  hero_badge: "تواصل معنا",
  hero_title: "ابدأ مشروعك باستشارة احترافية على المستوى المعتمد (Meister)",
  hero_desc: "تستحق مبانيك ومرافقك وبنيتك التحتية التقنية رعاية على أعلى مستوى تنفيذي.",
  direct_channels: "قنوات التواصل المباشر",
  hotline_label: "الهاتف",
  email_label: "البريد الإلكتروني",
  locations_title: "أين تحتاجنا؟",
  form_title: "طلب عرض سعر",
  form_desc: "اختر موقعك في ألمانيا.",
  paragraphs: arData.kontakt && Array.isArray(arData.kontakt.paragraphs) ? arData.kontakt.paragraphs : []
};

// ===== SECTION 16: KARRIERE - from successfully integrated data =====
newAr.karriere = arData.karriere && arData.karriere.hero_title ? arData.karriere : {
  hero_badge: "العمل معنا",
  hero_title: "انضم إلى عائلتنا: فرص العمل والوظائف في AZ-Europa Service",
  hero_desc: "لا يمكن لأي مبنى أن يكون بأفضل حالاته إلا بفضل الأشخاص الذين يعتنون به.",
  paragraphs: []
};

// ===== SECTION 17: LOCATIONS - from successfully integrated data =====
newAr.locations = arData.locations && arData.locations.hero_title ? arData.locations : {
  hero_title: "شريكك المحلي في فرانكونيا: إرلانجن، نورنبرغ، بامبرغ",
  hero_desc: "لا يمكن التحكم الفعال في إدارة العقارات التجارية من مسافات بعيدة.",
  paragraphs: []
};

// ===== SECTION 18: LEISTUNGEN =====
newAr.leistungen = arData.leistungen && arData.leistungen.hero_title ? arData.leistungen : {
  hero_title: "خدمات إدارة المرافق الشاملة في فرانكونيا",
  hero_desc: "حلول شاملة من مصدر واحد موثوق.",
  paragraphs: []
};

// ===== SECTION 19: HEADER/FOOTER/CHAT =====
newAr.header = {
  announcement: "ضمان الرد خلال ساعتين · إرلانجن · نورنبرغ · بامبرغ"
};

newAr.footer = {
  tagline: "جودة. بشهادة رسمية.",
  services_title: "الخدمات",
  company_title: "الشركة",
  legal_title: "قانوني",
  copyright: "© 2024 AZ-Europa Service GmbH. جميع الحقوق محفوظة.",
  impressum: "بيانات الشركة",
  datenschutz: "سياسة الخصوصية",
  agb: "الشروط والأحكام"
};

newAr.chat = {
  title: "دردشة المساعدة",
  placeholder: "اكتب رسالتك...",
  send: "إرسال",
  typing: "يكتب..."
};

// ===== SECTION 20: LEGAL/PRIVACY/AGB =====
newAr.legal = enData.legal; // Use English for legal (OK for now)
newAr.privacy = enData.privacy;
newAr.agb = enData.agb;

// ===== SECTION 21: BLOG =====
newAr.blog = arData.blog && arData.blog.title ? arData.blog : enData.blog;

// ===== SECTION 22: CITIES - Keep existing Arabic city content if it looks correct =====
// Check if cities data looks OK (has Arabic text, not key names)
const arCitiesOk = arData.cities && arData.cities.erlangen && 
  arData.cities.erlangen.hero_title && 
  !arData.cities.erlangen.hero_title.includes('title') &&
  !arData.cities.erlangen.hero_title.includes('slug');

newAr.cities = arCitiesOk ? arData.cities : enData.cities;
console.log('Cities section OK:', arCitiesOk);

// ===== SECTION 23: MATRIX =====
const arMatrixOk = arData.matrix && arData.matrix.erlangen && arData.matrix.erlangen.reinigung;
newAr.matrix = arMatrixOk ? arData.matrix : enData.matrix;
console.log('Matrix section OK:', arMatrixOk);

// Write the rebuilt file
fs.writeFileSync('src/locales/ar.json', JSON.stringify(newAr, null, 2), 'utf8');
console.log('ar.json rebuilt successfully!');

// Verify it's valid JSON
try {
  JSON.parse(fs.readFileSync('src/locales/ar.json', 'utf8'));
  console.log('JSON validation: PASSED');
} catch(e) {
  console.error('JSON validation: FAILED -', e.message);
}
