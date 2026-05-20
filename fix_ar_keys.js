
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/locales/ar.json');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Unescape all keys and structural elements
content = content.replace(/\\":/g, '":');
content = content.replace(/"{/g, '{');
content = content.replace(/"\[/g, '[');
content = content.replace(/}"/g, '}');
content = content.replace(/\]"/g, ']');

// 2. Fix the specific "home\": {" issue
content = content.replace(/(\w+)\\":/g, '$1":');

// 3. Fix the array elements that were over-quoted
content = content.replace(/\{\s*"/g, '{"');
content = content.replace(/\[\s*"/g, '["');

// 4. Ensure no quotes are at the very beginning of lines where they shouldn't be
let lines = content.split(/\r?\n/);
let fixed = lines.map(line => {
    let t = line.trim();
    if (t.startsWith('"') && t.endsWith('"{')) return line.replace('"{', '{');
    if (t.startsWith('"') && t.endsWith('"{,')) return line.replace('"{,', '{,');
    return line;
});

fs.writeFileSync(filePath, fixed.join('\n'), 'utf8');
console.log("Cleaned ar.json keys and structure.");
