const fs = require('fs');
const ar = JSON.parse(fs.readFileSync('src/locales/ar.json', 'utf8'));

// Fix 1: kontakt.direct_channels
ar.kontakt.direct_channels = "قنوات التواصل المباشر";

// Fix 2: matrix paragraphs - replace literal "title" with empty string or remove
function fixTitleInParagraphs(arr) {
  return arr.map(item => {
    if (item === 'title') return null; // will filter out
    return item;
  }).filter(item => item !== null);
}

if (ar.matrix && ar.matrix.erlangen) {
  if (ar.matrix.erlangen.hausmeisterservice && ar.matrix.erlangen.hausmeisterservice.paragraphs) {
    ar.matrix.erlangen.hausmeisterservice.paragraphs = fixTitleInParagraphs(ar.matrix.erlangen.hausmeisterservice.paragraphs);
  }
  if (ar.matrix.erlangen.reinigung && ar.matrix.erlangen.reinigung.paragraphs) {
    ar.matrix.erlangen.reinigung.paragraphs = fixTitleInParagraphs(ar.matrix.erlangen.reinigung.paragraphs);
  }
  if (ar.matrix.erlangen.renovierungen && ar.matrix.erlangen.renovierungen.paragraphs) {
    ar.matrix.erlangen.renovierungen.paragraphs = fixTitleInParagraphs(ar.matrix.erlangen.renovierungen.paragraphs);
  }
  if (ar.matrix.erlangen.abbrucharbeiten && ar.matrix.erlangen.abbrucharbeiten.paragraphs) {
    ar.matrix.erlangen.abbrucharbeiten.paragraphs = fixTitleInParagraphs(ar.matrix.erlangen.abbrucharbeiten.paragraphs);
  }
  if (ar.matrix.erlangen.gartenpflege && ar.matrix.erlangen.gartenpflege.paragraphs) {
    ar.matrix.erlangen.gartenpflege.paragraphs = fixTitleInParagraphs(ar.matrix.erlangen.gartenpflege.paragraphs);
  }
}

fs.writeFileSync('src/locales/ar.json', JSON.stringify(ar, null, 2), 'utf8');
console.log('Final fixes applied. Verifying...');

// Final check
const verifyData = JSON.parse(fs.readFileSync('src/locales/ar.json', 'utf8'));
const keysToFind = ['title', 'slug', 'label', 'locations'];
let found = 0;
function check(obj, path) {
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      if (typeof item === 'string' && keysToFind.includes(item)) { console.log('BAD: ' + path + '['+i+'] = ' + item); found++; }
      if (typeof item === 'object') check(item, path+'['+i+']');
    });
  } else if (typeof obj === 'object' && obj !== null) {
    Object.entries(obj).forEach(([k,v]) => {
      if (typeof v === 'string' && keysToFind.includes(v)) { console.log('BAD: ' + path+'.'+k+' = ' + v); found++; }
      if (typeof v === 'object') check(v, path+'.'+k);
    });
  }
}
check(verifyData, 'ar');
console.log('Remaining issues:', found);
console.log('nav.contact is now:', verifyData.nav.contact);
console.log('kontakt.direct_channels is now:', verifyData.kontakt.direct_channels);
