
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/locales/ar.json');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Clean baseline: remove BOM and over-escaped characters
if (content.startsWith('\uFEFF')) content = content.substring(1);
content = content.replace(/\\"/g, '"');

// 2. Fix the structural quotes around braces and brackets
// "key": {"  --> "key": {
content = content.replace(/"([^"]+)":\s*"{/g, '"$1": {');
// "key": "[  --> "key": [
content = content.replace(/"([^"]+)":\s*"\[/g, '"$1": [');
// {"         --> {
content = content.replace(/{\s*"/g, '{ "');
// ["         --> [
content = content.replace(/\[\s*"/g, '[ "');
// }"         --> }
content = content.replace(/}\s*"/g, '}');
// ]"         --> ]
content = content.replace(/\]\s*"/g, ']');

// 3. Fix the specific "{" at start of objects
content = content.replace(/:\s*{\s*"/g, ': {"');
content = content.replace(/:\s*\[\s*"/g, ': ["');

// 4. Final check: if a line is just "{ or "[ fix it
let lines = content.split(/\r?\n/);
let fixedLines = lines.map(line => {
    let t = line.trim();
    if (t === '"{' || t === '"{,') return line.replace('"{', '{');
    if (t === '"[' || t === '"[,') return line.replace('"[', '[');
    if (t === '}"' || t === '}",') return line.replace('}"', '}');
    if (t === ']"' || t === ']",') return line.replace(']"', ']');
    return line;
});

fs.writeFileSync(filePath, fixedLines.join('\n'), 'utf8');
console.log("Cleaned up ar.json structure.");
