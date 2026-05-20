/**
 * MASTER ARABIC EXTRACTOR
 * Extracts Arabic content from ALL draft files and injects into ar.json
 * Uses the pattern: Meta Title: [Arabic] ... URL Slug: /ar/... as section delimiters
 */
const fs = require('fs');
const path = require('path');

const DRAFTS_DIR = path.join(__dirname, 'seo_content_drafts');
const AR_PATH = path.join(__dirname, 'src/locales/ar.json');

// Read current ar.json
const ar = JSON.parse(fs.readFileSync(AR_PATH, 'utf8'));

/**
 * Extract Arabic section from a draft file
 * Arabic section is identified by having an Arabic Meta Title
 */
function extractArabicSection(content) {
  const lines = content.split('\n').map(l => l.replace(/\r/g, ''));
  
  // Find all Meta Title markers
  const markers = [];
  lines.forEach((line, i) => {
    if (line.startsWith('Meta Title:')) {
      markers.push({ lineIndex: i, title: line.replace('Meta Title:', '').trim() });
    }
  });
  
  // Find the Arabic marker (has Arabic Unicode chars)
  const arabicMarker = markers.find(m => /[\u0600-\u06FF]/.test(m.title));
  if (!arabicMarker) return null;
  
  // Find the next marker after Arabic (to know where Arabic section ends)
  const markerIdx = markers.indexOf(arabicMarker);
  const nextMarker = markers[markerIdx + 1];
  
  const startLine = arabicMarker.lineIndex;
  const endLine = nextMarker ? nextMarker.lineIndex - 1 : lines.length - 1;
  
  const sectionLines = lines.slice(startLine, endLine + 1);
  
  // Extract components
  let title = '', description = '', slug = '';
  const paragraphs = [];
  
  sectionLines.forEach((line, idx) => {
    if (idx === 0 && line.startsWith('Meta Title:')) {
      title = line.replace('Meta Title:', '').trim();
    } else if (line.startsWith('Meta Description:')) {
      description = line.replace('Meta Description:', '').trim();
    } else if (line.startsWith('URL Slug:')) {
      slug = line.replace('URL Slug:', '').trim();
    } else if (line.trim() !== '' && !line.startsWith('Meta ') && !line.startsWith('URL Slug:')) {
      paragraphs.push(line.trim());
    }
  });
  
  return { title, description, slug, paragraphs };
}

// Process each draft file
const draftFiles = fs.readdirSync(DRAFTS_DIR).sort();
const results = {};

draftFiles.forEach(filename => {
  const content = fs.readFileSync(path.join(DRAFTS_DIR, filename), 'utf8');
  const extracted = extractArabicSection(content);
  if (extracted && extracted.title && /[\u0600-\u06FF]/.test(extracted.title)) {
    results[filename] = extracted;
    const paraCount = extracted.paragraphs.length;
    console.log(`✅ ${filename}: "${extracted.title.substring(0,50)}" (${paraCount} paragraphs)`);
  } else {
    console.log(`⚠️  ${filename}: No Arabic section found`);
  }
});

console.log(`\nExtracted ${Object.keys(results).length} Arabic sections`);
console.log('\nSaving extracted content...\n');

// Now map the extracted content to ar.json keys

// Cities
const cityMap = {
  '010_Erlangen_City_Hub.txt': 'erlangen',
  '011_Nuernberg_City_Hub.txt': 'nuernberg',
  '012_Bamberg_City_Hub.txt': 'bamberg'
};

Object.entries(cityMap).forEach(([file, city]) => {
  if (results[file]) {
    const d = results[file];
    if (!ar.cities) ar.cities = {};
    if (!ar.cities[city]) ar.cities[city] = {};
    ar.cities[city].hero_title_2 = d.paragraphs[0] || ar.cities[city].hero_title_2;
    ar.cities[city].hero_desc = d.paragraphs[1] || ar.cities[city].hero_desc;
    ar.cities[city].paragraphs = d.paragraphs.slice(1);
    ar.cities[city].hero_badge = `شريكك لإدارة المرافق في ${city === 'erlangen' ? 'إرلانجن' : city === 'nuernberg' ? 'نورنبرغ' : 'بامبرغ'}`;
    ar.cities[city].service_catalog = `كتالوج الخدمات في ${city === 'erlangen' ? 'إرلانجن' : city === 'nuernberg' ? 'نورنبرغ' : 'بامبرغ'}`;
    ar.cities[city].service_title = `خدمات مخصصة في ${city === 'erlangen' ? 'إرلانجن' : city === 'nuernberg' ? 'نورنبرغ' : 'بامبرغ'}`;
    ar.cities[city].service_desc = d.paragraphs[2] || '';
    ar.cities[city].trust_title = `لماذا نحن الخيار الأول في ${city === 'erlangen' ? 'إرلانجن' : city === 'nuernberg' ? 'نورنبرغ' : 'بامبرغ'}؟`;
    ar.cities[city].cta_subtitle = `فريقنا المحلي في ${city === 'erlangen' ? 'إرلانجن' : city === 'nuernberg' ? 'نورنبرغ' : 'بامبرغ'} جاهز لمساعدتك.`;
    ar.cities[city].features = ar.cities[city].features || [];
    ar.seo[city] = {
      title: d.title,
      description: d.description,
      slug: d.slug
    };
    console.log(`  ✅ cities.${city} updated with Arabic content`);
  }
});

// Matrix services per city
const matrixMap = {
  '013_Reinigung_Erlangen.txt': ['erlangen', 'reinigung'],
  '014_Hausmeisterservice_Erlangen.txt': ['erlangen', 'hausmeisterservice'],
  '015_Renovierungen_Erlangen.txt': ['erlangen', 'renovierungen'],
  '016_Abbrucharbeiten_Erlangen.txt': ['erlangen', 'abbrucharbeiten'],
  '017_Gartenpflege_Erlangen.txt': ['erlangen', 'gartenpflege'],
  '018_Entruempelung_Erlangen.txt': ['erlangen', 'entruempelung'],
  '019_Reinigung_Nuernberg.txt': ['nuernberg', 'reinigung'],
  '020_Hausmeisterservice_Nuernberg.txt': ['nuernberg', 'hausmeisterservice'],
  '021_Renovierungen_Nuernberg.txt': ['nuernberg', 'renovierungen'],
  '022_Abbrucharbeiten_Nuernberg.txt': ['nuernberg', 'abbrucharbeiten'],
  '023_Gartenpflege_Nuernberg.txt': ['nuernberg', 'gartenpflege'],
  '024_Entruempelung_Nuernberg.txt': ['nuernberg', 'entruempelung'],
  '025_Reinigung_Bamberg.txt': ['bamberg', 'reinigung'],
  '026_Hausmeisterservice_Bamberg.txt': ['bamberg', 'hausmeisterservice'],
  '027_Renovierungen_Bamberg.txt': ['bamberg', 'renovierungen'],
  '028_Abbrucharbeiten_Bamberg.txt': ['bamberg', 'abbrucharbeiten'],
  '029_Gartenpflege_Bamberg.txt': ['bamberg', 'gartenpflege'],
  '030_Entruempelung_Bamberg.txt': ['bamberg', 'entruempelung'],
};

Object.entries(matrixMap).forEach(([file, [city, service]]) => {
  if (results[file]) {
    const d = results[file];
    if (!ar.matrix) ar.matrix = {};
    if (!ar.matrix[city]) ar.matrix[city] = {};
    if (!ar.matrix[city][service]) ar.matrix[city][service] = {};
    ar.matrix[city][service].hero_title = d.paragraphs[0] || d.title;
    ar.matrix[city][service].hero_desc = d.paragraphs[1] || d.description;
    ar.matrix[city][service].paragraphs = d.paragraphs.slice(1);
    ar.matrix[city][service].features = ar.matrix[city][service].features || [];
    console.log(`  ✅ matrix.${city}.${service} updated`);
  }
});

// Legal files
if (results['007_Legal_Impressum.txt']) {
  const d = results['007_Legal_Impressum.txt'];
  ar.legal.impressum_title = 'الإشعار القانوني والإفصاحات الإلزامية';
  ar.legal.impressum_desc = 'معلومات وفقاً للمادة 5 من قانون TMG لشركة AZ-Europa Service GmbH.';
  ar.legal.angaben_tmg = 'معلومات وفقاً للمادة § 5 TMG';
  ar.legal.vertretung = 'إدارة الشركة';
  ar.legal.vertreten_durch = 'يمثلها مجلس الإدارة:';
  ar.legal.kontakt = 'خيارات التواصل';
  ar.legal.telefon = 'المقر الرئيسي:';
  ar.legal.email = 'البريد الإلكتروني:';
  ar.legal.register = 'السجل التجاري';
  ar.legal.registergericht = 'محكمة التسجيل:';
  ar.legal.registernummer = 'رقم التسجيل:';
  ar.legal.ust_id = 'التعريف الضريبي';
  ar.legal.ust_id_desc = 'رقم التعريف الضريبي للقيمة المضافة وفقاً للمادة § 27 أ من قانون ضريبة القيمة المضافة الألماني:';
  ar.legal.streitschlichtung = 'تسوية النزاعات عبر الإنترنت';
  ar.legal.streitschlichtung_desc = 'توفر المفوضية الأوروبية منصة لتسوية النزاعات عبر الإنترنت (OS): https://ec.europa.eu/consumers/odr.';
  ar.legal.streitschlichtung_disclaimer = 'لسنا مستعدين ولا ملزمين قانونياً بالمشاركة في إجراءات تسوية النزاعات أمام هيئة تحكيم المستهلكين.';
  ar.legal.have_questions = 'هل لديك أسئلة قانونية؟';
  ar.legal.questions_desc = 'يرجى الاتصال بقسمنا القانوني مباشرة على: info@az-europaservice.de';
  ar.legal.send_email = 'إرسال استفسار';
  ar.legal.impressum = {
    title: 'الإشعار القانوني (Impressum)',
    desc: 'معلومات وفقاً للمادة § 5 من قانون وسائل الإعلام الألماني (TMG):',
    paragraphs: d.paragraphs.length > 0 ? d.paragraphs : ar.legal.impressum.paragraphs
  };
  console.log('  ✅ legal section updated with Arabic');
}

if (results['008_Legal_Datenschutz.txt']) {
  const d = results['008_Legal_Datenschutz.txt'];
  ar.legal.datenschutz = {
    title: 'سياسة الخصوصية',
    desc: 'بالنسبة لشركة AZ-Europa Service GmbH، لا تُعتبر حماية بياناتك الشخصية مجرد التزام قانوني، بل هي عنصر أساسي في التزامنا بالجودة والثقة الرقمية.',
    paragraphs: d.paragraphs.length > 0 ? d.paragraphs : (ar.legal.datenschutz ? ar.legal.datenschutz.paragraphs : [])
  };
  ar.privacy = {
    title: 'سياسة الخصوصية',
    subtitle: 'حماية خصوصيتك وفق معايير GDPR',
    section1_title: '1. حماية البيانات بنظرة عامة',
    section1_subtitle: 'الجوانب الأساسية',
    section1_desc: 'أمان بياناتك هو أولويتنا القصوى بصفتنا شركة معتمدة. نتعامل مع بياناتك الشخصية بسرية تامة ووفقاً للوائح GDPR الأوروبية الصارمة.',
    section2_title: '2. الاستضافة والبنية التحتية',
    section2_desc: 'نعتمد على خوادم آمنة داخل الاتحاد الأوروبي لضمان أقصى درجات سيادة البيانات.',
    section3_title: '3. حقوقك كمستخدم',
    section3_subtitle: 'الاطلاع، الحذف والحجب',
    section3_desc: 'يحق لك في أي وقت الحصول على معلومات مجانية حول بياناتك الشخصية المخزنة، وكذلك الحق في تصحيح أو حذف هذه البيانات.',
    section4_title: '4. جمع البيانات عبر النموذج',
    section4_subtitle: 'معيار الأمان',
    section4_desc: 'يتم إرسال استفساراتك عبر تشفير SSL. يتم تخزين البيانات حصراً لمعالجة طلبك ولمدة فترات الاحتفاظ القانونية المقررة.',
    section5_title: '5. التحليلات ومزودو الطرف الثالث',
    section5_subtitle: 'تكامل شفاف',
    section5_desc: 'نستخدم أدوات مثل Google Fonts للعرض الأمثل. يتم إرسال عناوين IP فقط بالقدر الضروري تقنياً.',
    status_label: 'حالة التحديث:',
    update_note: 'يتم تحديث هذه السياسة بانتظام وفقاً للأطر القانونية الجديدة.'
  };
  console.log('  ✅ privacy & legal.datenschutz updated with Arabic');
}

if (results['009_Legal_AGB.txt']) {
  ar.agb = {
    title: 'الشروط والأحكام العامة',
    subtitle: 'الشروط والأحكام العامة لشركة AZ-Europa Service GmbH',
    section1_title: '§ 1 النطاق التطبيقي',
    section1_desc: 'تنطبق هذه الشروط والأحكام العامة على جميع العقود والتسليمات والخدمات الأخرى التي تقدمها AZ-Europa Service GmbH لعملائها التجاريين (B2B).',
    section2_title: '§ 2 تقديم الخدمات',
    section2_desc: 'يؤدي المقاول خدماته وفقاً للقواعد المعترف بها في المهنة واللوائح القانونية المعمول بها.',
    section3_title: '§ 3 شروط الدفع',
    section3_desc: 'تستحق الفواتير السداد خلال 14 يوماً من تاريخ الفاتورة دون أي خصم، ما لم يُتفق على خلاف ذلك.',
    section4_title: '§ 4 المسؤولية والعيوب',
    section4_desc: 'في حالات الإهمال البسيط، يكون المقاول مسؤولاً فقط عن الأضرار الناجمة عن الإصابة بالحياة أو الجسد أو الصحة.',
    section5_title: '§ 5 مدة العقد',
    section5_desc: 'تُبرم عقود الخدمات المستمرة لأجل غير محدد ويمكن إنهاؤها بإشعار مسبق مدته ثلاثة أشهر.',
    status_label: 'الوضع: مايو 2026'
  };
  console.log('  ✅ agb updated with Arabic');
}

// Save ar.json
fs.writeFileSync(AR_PATH, JSON.stringify(ar, null, 2), 'utf8');
console.log('\n✅ ar.json saved successfully!');

// Final verification
const finalAr = JSON.parse(fs.readFileSync(AR_PATH, 'utf8'));

// Re-run the audit
function isNonArabic(text) {
  if (!text || typeof text !== 'string' || text.length < 10) return false;
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const latinWords = text.match(/[a-zA-Z]{4,}/g) || [];
  if (arabicChars === 0 && latinWords.length >= 3) return true;
  return false;
}

let nonArabicCount = 0;
function scan(obj, path) {
  if (typeof obj === 'string') { if (isNonArabic(obj)) nonArabicCount++; }
  else if (Array.isArray(obj)) { obj.forEach((item, i) => scan(item, path + '[' + i + ']')); }
  else if (typeof obj === 'object' && obj !== null) { Object.entries(obj).forEach(([k, v]) => scan(v, path + '.' + k)); }
}
scan(finalAr, 'ar');

console.log('\n=== FINAL AUDIT ===');
console.log('Non-Arabic text remaining: ' + nonArabicCount + ' (was 850)');
console.log('JSON valid: YES');
