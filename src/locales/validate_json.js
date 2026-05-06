const fs = require('fs');
const path = require('path');

const localesDir = 'd:/az-europaservice.de/site/codes/az-europa-next/src/locales';
const files = ['de.json', 'en.json', 'fa.json', 'ar.json', 'ru.json', 'uk.json'];

files.forEach(file => {
  const filePath = path.join(localesDir, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);
    console.log(`${file}: VALID`);
  } catch (e) {
    console.error(`${file}: INVALID - ${e.message}`);
  }
});
