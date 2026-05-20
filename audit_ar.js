const fs = require('fs');
const ar = JSON.parse(fs.readFileSync('src/locales/ar.json', 'utf8'));
const de = JSON.parse(fs.readFileSync('src/locales/de.json', 'utf8'));

function isGarbled(text) {
  return typeof text === 'string' && /\u00d8/.test(text);
}

function isLiteralKey(text) {
  const keys = ['name','phone','email','slug','title','label','cities','common',
    'subtitle','desc','form','services','all_reviews','verified','paragraphs',
    'message','message_placeholder','email_placeholder','phone_placeholder',
    'open_details','contact_us','all_services','request_quote','learn_more'];
  return typeof text === 'string' && keys.includes(text.trim());
}

function isNonArabic(text) {
  if (!text || typeof text !== 'string' || text.length < 10) return false;
  // Check if known Arabic/acceptable
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length;
  // If no Arabic chars and text is longer than 10 latin chars, it's not Arabic
  const latinWords = text.match(/[a-zA-Z]{4,}/g) || [];
  if (arabicChars === 0 && latinWords.length >= 3) return true;
  return false;
}

let garbled = [];
let literal = [];
let nonArabic = [];

function scan(obj, path) {
  if (typeof obj === 'string') {
    if (isGarbled(obj)) garbled.push(path + ' => ' + obj.substring(0, 50));
    else if (isLiteralKey(obj)) literal.push(path + ' => ' + obj);
    else if (isNonArabic(obj)) nonArabic.push(path + ' => ' + obj.substring(0, 70));
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => scan(item, path + '[' + i + ']'));
  } else if (typeof obj === 'object' && obj !== null) {
    Object.entries(obj).forEach(([k, v]) => scan(v, path + '.' + k));
  }
}

scan(ar, 'ar');

fs.writeFileSync('audit_report.txt',
  '=== AUDIT REPORT ar.json ===\n\n' +
  'GARBLED (' + garbled.length + '):\n' + garbled.join('\n') + '\n\n' +
  'LITERAL KEYS (' + literal.length + '):\n' + literal.join('\n') + '\n\n' +
  'NON-ARABIC TEXT (' + nonArabic.length + '):\n' + nonArabic.join('\n') + '\n',
  'utf8'
);

console.log('GARBLED: ' + garbled.length);
console.log('LITERAL KEYS: ' + literal.length);
console.log('NON-ARABIC: ' + nonArabic.length);
console.log('TOTAL ISSUES: ' + (garbled.length + literal.length + nonArabic.length));
console.log('');
console.log('--- LITERAL KEYS ---');
literal.forEach(l => console.log(l));
console.log('');
console.log('--- FIRST 20 NON-ARABIC ---');
nonArabic.slice(0, 20).forEach(l => console.log(l));
console.log('');
console.log('Full report saved to audit_report.txt');
