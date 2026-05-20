
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/locales/ar.json');
let content = fs.readFileSync(filePath, 'utf8');
let lines = content.split(/\r?\n/);

let newLines = lines.map(line => {
    let trimmed = line.trim();
    // Match array elements: "text", or "text"
    // Also match key-value pairs: "key": "value",
    
    // Case 1: Array element "text", or "text"
    let arrayMatch = line.match(/^(\s+")(.+)("),?$/);
    if (arrayMatch && !line.includes(': "')) {
        let start = arrayMatch[1];
        let text = arrayMatch[2];
        let suffix = (line.endsWith(',') ? '",' : '"');
        let fixedText = text.replace(/(?<!\\)"/g, '\\"');
        return start + fixedText + suffix;
    }
    
    // Case 2: Key-value pair "key": "value",
    let kvMatch = line.match(/^(\s+".+":\s+")(.+)("),?$/);
    if (kvMatch) {
        let start = kvMatch[1];
        let text = kvMatch[2];
        let suffix = (line.endsWith(',') ? '",' : '"');
        let fixedText = text.replace(/(?<!\\)"/g, '\\"');
        return start + fixedText + suffix;
    }
    
    return line;
});

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log("Fixed unescaped quotes in ar.json");
