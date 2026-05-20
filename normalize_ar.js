
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/locales/ar.json');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Convert everything to a single line to ignore newline errors
content = content.replace(/[\r\n]+/g, ' ');
content = content.replace(/\s+/g, ' ');

// 2. Clean structural quotes
// We want to turn {"key": "{ "nested": ... into {"key": { "nested": ...
content = content.replace(/\{\s*"/g, '{"'); // Baseline
content = content.replace(/"\s*\{/g, '{');
content = content.replace(/\}\s*"/g, '}');
content = content.replace(/"\s*\[/g, '[');
content = content.replace(/\]\s*"/g, ']');

// Fix keys: {"key": -> {"key":
content = content.replace(/\{\s*"/g, '{"');

// Fix the "key": { issue
content = content.replace(/"\s*:\s*\{/g, '": {');
content = content.replace(/"\s*:\s*\[/g, '": [');

// 3. Try to parse and fix iteratively
function fixCommonErrors(s) {
    // Fix double quotes ""
    s = s.replace(/"\s*"/g, '"');
    // Fix missing colons or extra quotes around them
    s = s.replace(/"\s*:/g, '":');
    // Fix comma issues
    s = s.replace(/,\s*,/g, ',');
    s = s.replace(/,\s*\}/g, '}');
    s = s.replace(/,\s*\]/g, ']');
    return s;
}

content = fixCommonErrors(content);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Normalized ar.json to a single line for repair.");
