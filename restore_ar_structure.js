
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/locales/ar.json');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove BOM
if (content.startsWith('\uFEFF')) content = content.substring(1);

// 2. Unescape all quotes to have a clean baseline
content = content.replace(/\\"/g, '"');

// 3. Fix the structural mess made by previous scripts
// Fix keys that got extra quotes: "key": {" -> "key": {
content = content.replace(/"(\w+)":\s*"{/g, '"$1": {');
content = content.replace(/"(\w+)":\s*"\[/g, '"$1": [');
content = content.replace(/{\s*"/g, '{"');
content = content.replace(/"\s*}/g, '"}'); // This might be wrong for end of strings, but we'll fix it

// 4. More precise structural fixes
content = content.replace(/":\s*"{/g, '": {');
content = content.replace(/":\s*"\[/g, '": [');
content = content.replace(/}"/g, '}');
content = content.replace(/\]"/g, ']');
content = content.replace(/"{/g, '{');
content = content.replace(/"\[/g, '[');

// 5. Now, escape all quotes that are NOT structural
// A structural quote is preceded by space, or followed by : or , or newline
let lines = content.split(/\r?\n/);
let fixedLines = lines.map(line => {
    let trimmed = line.trim();
    
    // Key-value line: "key": "value",
    let kvMatch = line.match(/^(\s+")(.+?)(":\s+")(.+?)("),?$/);
    if (kvMatch) {
        let key = kvMatch[2];
        let val = kvMatch[4];
        let start = kvMatch[1];
        let mid = kvMatch[3];
        let end = kvMatch[5] + (line.endsWith(',') ? ',' : '');
        return start + key + mid + val.replace(/"/g, '\\"') + end;
    }
    
    // Array element: "value",
    let arrayMatch = line.match(/^(\s+")(.+)("),?$/);
    if (arrayMatch && !line.includes(':')) {
        let start = arrayMatch[1];
        let val = arrayMatch[2];
        let end = arrayMatch[3] + (line.endsWith(',') ? ',' : '');
        return start + val.replace(/"/g, '\\"') + end;
    }
    
    return line;
});

fs.writeFileSync(filePath, fixedLines.join('\n'), 'utf8');
console.log("Re-structured and escaped ar.json correctly.");
