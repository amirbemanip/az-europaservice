/**
 * Fix structural parity issues in ar.json:
 * 1. cta_section.stats: missing 4th item
 * 2. form.cities: missing 5th city (Fürth)
 */
const fs = require('fs');
const ar = JSON.parse(fs.readFileSync('src/locales/ar.json', 'utf8'));
const de = JSON.parse(fs.readFileSync('src/locales/de.json', 'utf8'));

// Fix 1: Add 4th stat matching DE structure
// DE: { value: "120+", label: "Fachkräfte vor Ort" }
ar.cta_section.stats.push({
  value: "120+",
  label: "متخصص محلي"
});

// Fix 2: form.cities - DE has 5 cities, AR has 4
// DE cities: check what the 5th one is
console.log('DE form.cities:', de.form.cities);
console.log('AR form.cities before:', ar.form.cities);

// Add "Fürth" (فورت) as the 5th city
ar.form.cities.push("فورت");

console.log('AR form.cities after:', ar.form.cities);
console.log('AR cta_section.stats after:', ar.cta_section.stats);

// Write
fs.writeFileSync('src/locales/ar.json', JSON.stringify(ar, null, 2), 'utf8');

// Verify
const verify = JSON.parse(fs.readFileSync('src/locales/ar.json', 'utf8'));
console.log('\nVerification:');
console.log('stats count:', verify.cta_section.stats.length, '(expected 4)');
console.log('cities count:', verify.form.cities.length, '(expected 5)');
console.log('JSON valid: YES');
