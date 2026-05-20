/**
 * FINAL COMPLETE FIX: Replace entire 'matrix' section in ar.json with English
 * The matrix section has 32,000+ garbled chars - it needs full replacement
 * Also fix remaining garbled fields in other sections
 */
const fs = require('fs');
const ar = JSON.parse(fs.readFileSync('src/locales/ar.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));

// The 'matrix' section is completely garbled - replace with EN version
// (will be translated to Arabic in a future step, but EN is better than garbled)
ar.matrix = en.matrix;

// Also check and fix 'blog' if garbled
const blogStr = ar.blog ? JSON.stringify(ar.blog) : '';
if (blogStr.includes('Ø')) {
  console.log('Blog is garbled, replacing with EN version');
  ar.blog = en.blog;
}

// Write
fs.writeFileSync('src/locales/ar.json', JSON.stringify(ar, null, 2), 'utf8');

// Final verification
const content = fs.readFileSync('src/locales/ar.json', 'utf8');
const garbledMatches = content.match(/Ø[^\u0600-\u06FF"]/g);
const garbledCount = garbledMatches ? garbledMatches.length : 0;
console.log('Remaining garbled text (Ø...) after matrix fix:', garbledCount);

// Find which sections still have garbled text
if (garbledCount > 0) {
  const data = JSON.parse(content);
  const topKeys = Object.keys(data);
  topKeys.forEach(k => {
    const sectionStr = JSON.stringify(data[k]);
    const count = (sectionStr.match(/Ø[^\u0600-\u06FF"]/g) || []).length;
    if (count > 0) {
      console.log('  GARBLED in section "' + k + '": ' + count + ' patterns');
    }
  });
}

// Validate JSON
try {
  JSON.parse(content);
  console.log('\nJSON VALID: YES');
} catch(e) {
  console.log('\nJSON VALID: NO -', e.message);
}
