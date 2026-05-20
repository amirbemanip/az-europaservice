
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/locales/ar.json');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the mess made by fix_quotes_aggressive
content = content.replace(/": "{/g, '": {');
content = content.replace(/": "\[/g, '": [');
content = content.replace(/{"/g, '{');
content = content.replace(/"}/g, '}');
content = content.replace(/"\]/g, ']');
content = content.replace(/\]"/g, ']');
content = content.replace(/\\"/g, '"'); // Unescape everything first to be sure
content = content.replace(/"([^:\s\[\]\{\},]+)"/g, (m, p1) => {
    // Escape quotes inside strings
    // This is hard to do with regex alone.
    return m;
});

// Actually, let's just do a clean escape of all internal quotes
// A internal quote is a " that is NOT:
// 1. At the start of a key: /^\s*"/
// 2. At the end of a key: /":/
// 3. At the start of a value: /: "/
// 4. At the end of a value: /",?$/
// 5. At the start of an array element: /^\s*"/
// 6. At the end of an array element: /",?$/

let lines = content.split(/\r?\n/);
let newLines = lines.map(line => {
    let trimmed = line.trim();
    if (trimmed.startsWith('"') && (trimmed.endsWith('",') || trimmed.endsWith('"') || trimmed.endsWith('{') || trimmed.endsWith('['))) {
        // ...
    }
    // I'll just manually fix the known problematic lines.
    return line;
});

fs.writeFileSync(filePath, content, 'utf8');
