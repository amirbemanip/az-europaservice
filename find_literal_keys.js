const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/locales/ar.json', 'utf8'));

// The user saw: 'locations', 'title', 'slug' as text on /ar/karriere
// Also saw garbled Arabic like إدارة المرافق في إرلانجن... (which is the SEO title for locations)
// This means the karriere page is somehow rendering the seo.locations object

// Check the karriere page component to understand what it reads
// For now let's see what's in nav and all top-level string values that equal these keywords

const keysToFind = ['locations', 'title', 'slug', 'label'];

function searchForLiteralKeys(obj, path) {
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      if (typeof item === 'string' && keysToFind.includes(item)) {
        console.log('FOUND literal "' + item + '" at: ' + path + '[' + i + ']');
      }
      if (typeof item === 'object') searchForLiteralKeys(item, path + '[' + i + ']');
    });
  } else if (typeof obj === 'object' && obj !== null) {
    Object.entries(obj).forEach(([k, v]) => {
      if (typeof v === 'string' && keysToFind.includes(v)) {
        console.log('FOUND literal "' + v + '" as value at: ' + path + '.' + k);
      }
      if (typeof v === 'object') searchForLiteralKeys(v, path + '.' + k);
    });
  }
}

searchForLiteralKeys(data, 'ar');
console.log('Search complete.');

// Also print nav to check if the nav links are corrupted
console.log('\nnav.karriere:', data.nav && data.nav.karriere);
console.log('nav.locations:', data.nav && data.nav.locations);
