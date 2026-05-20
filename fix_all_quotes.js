
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/locales/ar.json');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove all existing backslashes before quotes to start clean
content = content.replace(/\\"/g, '"');

// 2. Process line by line
let lines = content.split(/\r?\n/);
let fixedLines = lines.map(line => {
    let trimmed = line.trim();
    
    // Check if it's a content line (starts with " and ends with " or ",)
    // But we need to handle the case where it's MISSING the end quote
    if (trimmed.startsWith('"')) {
        let indent = line.match(/^\s*/)[0];
        let hasComma = trimmed.endsWith(',');
        let text = trimmed;
        if (hasComma) text = text.slice(0, -1);
        
        // Remove start and end quotes to get the inner text
        // If it's a key:value like "key": "value"
        if (text.includes('": "')) {
            let parts = text.split('": "');
            let key = parts[0].slice(1);
            let val = parts[1];
            if (val.endsWith('"')) val = val.slice(0, -1);
            
            return `${indent}"${key}": "${val.replace(/"/g, '\\"')}"${hasComma ? ',' : ''}`;
        }
        
        // If it's an array element "value"
        if (text.startsWith('"')) {
            let val = text.slice(1);
            if (val.endsWith('"')) val = val.slice(0, -1);
            return `${indent}"${val.replace(/"/g, '\\"')}"${hasComma ? ',' : ''}`;
        }
    }
    return line;
});

fs.writeFileSync(filePath, fixedLines.join('\n'), 'utf8');
console.log("Fixed internal quotes across ar.json");
