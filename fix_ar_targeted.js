/**
 * TARGETED FIX for all remaining corrupted fields in ar.json
 * After complete line-by-line audit
 */
const fs = require('fs');
const ar = JSON.parse(fs.readFileSync('src/locales/ar.json', 'utf8'));

// ==================== SECTION: about ====================
ar.about.hero_badge = "عن الشركة";
ar.about.quality_title = "جودة بشهادة رسمية";
ar.about.quality_desc = "نحن لا نعد فحسب بالجودة؛ بل نُثبتها بشهادات رسمية ومعتمدة.";
ar.about.stats_projects = "+500 مشروع";
ar.about.stats_experience = "+10 سنوات خبرة";
ar.about.values = [
  { title: "الدقة", desc: "نعمل وفق أعلى المعايير الألمانية في كل جانب من جوانب عملنا." },
  { title: "الموثوقية", desc: "الالتزامات ليست مجرد كلام - بل ضمانات مطلقة." },
  { title: "السرية", desc: "نعمل في بيئات حساسة بصمت ومهنية عالية." }
];
ar.about.cta_title = "هل أنت مستعد للشراكة مع شركة من الدرجة الأولى؟";
ar.about.cta_desc = "تواصل معنا اليوم للحصول على استشارة مجانية.";

// ==================== SECTION: kontakt ====================
ar.kontakt.hero_badge = "تواصل معنا";
ar.kontakt.hotline_label = "الهاتف";
ar.kontakt.email_label = "البريد الإلكتروني";
ar.kontakt.locations_title = "أين تحتاجنا؟";
ar.kontakt.form_title = "طلب عرض سعر";
ar.kontakt.form_desc = "سنرد عليك خلال ساعتين في أيام العمل.";

// ==================== SECTION: karriere ====================
ar.karriere.hero_badge = "العمل معنا";
ar.karriere.open_positions = "الوظائف الشاغرة";
ar.karriere.apply_now = "قدم طلبك الآن";
ar.karriere.benefits_title = "لماذا تنضم إلينا؟";
ar.karriere.benefits_subtitle = "مزايا العمل في AZ-Europa";
ar.karriere.benefits = [
  { title: "أجر عادل أعلى من الحد الأدنى", desc: "راتب يتجاوز المعايير القانونية مع دفع منتظم ومضمون." },
  { title: "عقد عمل دائم", desc: "بعد اجتياز فترة التجربة، نقدم عقوداً غير محددة المدة." },
  { title: "تدريب مستمر", desc: "نستثمر في تطوير مهاراتك ونساعدك على التقدم المهني." }
];
ar.karriere.jobs = [
  { title: "موظف تنظيف (ذكر/أنثى)", location: "إرلانجن / نورنبرغ / بامبرغ", type: "دوام كامل أو جزئي", desc: "للباحثين عن العمل في مجال تنظيف المباني وخدمات النظافة." },
  { title: "حارس مبنى (Hausmeister)", location: "إرلانجن / نورنبرغ / بامبرغ", type: "دوام كامل", desc: "للمهنيين ذوي الخبرة في الصيانة الفنية وإدارة المرافق." },
  { title: "مدير مشاريع", location: "منطقة فرانكونيا", type: "دوام كامل", desc: "للقادة المهنيين الراغبين في الانضمام إلى فريقنا الإداري." }
];

// ==================== SECTION: leistungen ====================
ar.leistungen.hero_badge = "دليل الخدمات الشامل";
ar.leistungen.service_points = [
  "تقييمات مثبتة من العملاء الراضين",
  "جميع التقييمات موثقة",
  "جودة معتمدة ومتحقق منها"
];
ar.leistungen.more_details = "تم التحقق";
ar.leistungen.cta_title = "هل أنت مستعد للارتقاء بعقارك؟";
ar.leistungen.cta_desc = "تواصل معنا مباشرة لإجراء تحليل منهجي لإعدادات إدارة المرافق الحالية لديك.";
ar.leistungen.call_us = "اتصل بنا";
ar.leistungen.write_us = "راسلنا";

// ==================== SECTION: faq ====================
ar.faq = {
  title: "الأسئلة الشائعة",
  subtitle: "إجابات على أهم استفساراتكم",
  items: [
    {
      question: "ما الذي يميز AZ-Europa Service GmbH عن شركات التنظيف الأخرى؟",
      answer: "نحن شركة معتمدة (Meisterbetrieb) في ألمانيا، مما يعني أننا نلتزم بأعلى المعايير المهنية. فريقنا مدرب بشكل مستمر، ونستخدم أحدث التجهيزات والمواد الصديقة للبيئة."
    },
    {
      question: "هل تخدمون جميع أنحاء منطقة نورنبرغ الكبرى؟",
      answer: "نعم، نحن نغطي إرلانجن، نورنبرغ، وبامبرغ بالكامل، بالإضافة إلى المناطق المحيطة في شمال بافاريا. فرقنا متمركزة محلياً لضمان أوقات استجابة سريعة."
    },
    {
      question: "ما هو ضمان الرد خلال ساعتين؟",
      answer: "نضمن الرد على جميع الاستفسارات والحالات الطارئة خلال ساعتين كحد أقصى خلال ساعات العمل الرسمية. بالنسبة لعملاء SLA، نوفر دعماً على مدار 24/7."
    },
    {
      question: "هل تقدمون عروض أسعار مجانية؟",
      answer: "نعم، نقدم استشارة أولية وتدقيق ميداني مجانياً تماماً وبدون أي التزام. سنزور عقارك ونقدم لك عرض سعر شفاف ومفصل."
    },
    {
      question: "هل تعملون مع العملاء الدوليين والشركات متعددة اللغات؟",
      answer: "بالتأكيد. فريقنا متعدد اللغات ويتحدث الألمانية والعربية والفارسية والروسية والإنجليزية. نحن نفخر بخدمة مجتمعات متنوعة في منطقة نورنبرغ."
    }
  ]
};

// ==================== Write and Verify ====================
fs.writeFileSync('src/locales/ar.json', JSON.stringify(ar, null, 2), 'utf8');
console.log('Targeted fixes applied successfully.');

// Final scan for garbled text (Ø patterns)
const content = fs.readFileSync('src/locales/ar.json', 'utf8');
const garbledMatches = content.match(/Ø[^\u0600-\u06FF"]/g);
const garbledCount = garbledMatches ? garbledMatches.length : 0;
console.log('Remaining garbled text patterns (Ø...):', garbledCount);

if (garbledCount > 0) {
  // Find the lines with garbled text
  const lines = content.split('\n');
  const garbledLines = [];
  lines.forEach((line, i) => {
    if (/Ø[^\u0600-\u06FF"]/.test(line)) {
      garbledLines.push((i+1) + ': ' + line.trim().substring(0,100));
    }
  });
  console.log('\nGarbled lines:');
  garbledLines.slice(0, 20).forEach(l => console.log(l));
}

// Literal keys scan
const keysToFind = ['\"name\"', '\"phone\"', '\"email\"', '\"cities\"', '\"slug\"', '\"common\"'];
let literalIssues = 0;
lines2 = content.split('\n');
lines2.forEach((line, i) => {
  keysToFind.forEach(k => {
    if (line.includes(': ' + k + ',') || line.includes(': ' + k)) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('"' + k.replace(/"/g,'') + '"')) {
        console.log('POSSIBLE LITERAL VALUE at line ' + (i+1) + ': ' + trimmed.substring(0,80));
        literalIssues++;
      }
    }
  });
});
console.log('Potential literal value issues found:', literalIssues);
