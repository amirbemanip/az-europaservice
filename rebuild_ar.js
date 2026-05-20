
const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'src/locales/de.json');
const arPath = path.join(__dirname, 'src/locales/ar.json');

const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));
let arRaw = fs.readFileSync(arPath, 'utf8');

// 1. Clean arRaw: remove all backslashes and joined braces
arRaw = arRaw.replace(/\\"/g, '"');
arRaw = arRaw.replace(/\{"/g, '{ "');
arRaw = arRaw.replace(/"\}/g, '" }');

// 2. Extract all Arabic strings (content between quotes)
// We look for strings that are likely Arabic content
const arabicStrings = arRaw.match(/"([^"]{3,})"/g) || [];
let stringIdx = 0;

console.log(`Found ${arabicStrings.length} potential Arabic strings.`);

// 3. Deep clone and replace values in DE structure
function translate(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            // If it's a slug or path, keep it or find Arabic equivalent
            if (obj[key].startsWith('/') || key === 'slug' || key === 'locale') {
                if (key === 'slug' && obj[key] === '/de') obj[key] = '/ar';
                if (key === 'locale') obj[key] = 'ar';
                continue;
            }
            
            // Try to find a matching Arabic string
            if (stringIdx < arabicStrings.length) {
                let val = arabicStrings[stringIdx].slice(1, -1);
                // Simple heuristic: if it contains Arabic characters or is long
                obj[key] = val;
                stringIdx++;
            }
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            translate(obj[key]);
        }
    }
}

translate(de);

fs.writeFileSync(arPath, JSON.stringify(de, null, 2), 'utf8');
console.log("Re-generated ar.json using de.json structure.");
