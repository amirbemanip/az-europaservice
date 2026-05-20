
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/locales/ar.json');
let content = fs.readFileSync(filePath, 'utf8');
let lines = content.split(/\r?\n/);

let newLines = lines.map(line => {
    let trimmed = line.trim();
    let indent = line.match(/^\s*/)[0];
    
    // Skip empty lines or structural lines like { } [ ]
    if (trimmed === "" || trimmed === "{" || trimmed === "}" || trimmed === "[" || trimmed === "]" || trimmed === "}," || trimmed === "],") {
        return line;
    }

    // Case 1: Key-value pair "key": "value",
    let kvMatch = line.match(/^(\s+")(.+?)(":\s+")(.+?)(",?)$/);
    if (kvMatch) {
        let key = kvMatch[2];
        let val = kvMatch[4];
        let start = kvMatch[1];
        let mid = kvMatch[3];
        let end = kvMatch[5];
        return start + key + mid + val.replace(/(?<!\\)"/g, '\\"') + end;
    }

    // Case 2: Array element or just a string line
    if (trimmed.startsWith('"')) {
        let suffix = "";
        let text = trimmed;
        if (text.endsWith(',')) {
            suffix = ",";
            text = text.slice(0, -1);
        }
        
        if (text.endsWith('"')) {
            text = text.slice(1, -1);
        } else {
            text = text.slice(1);
        }
        
        let fixedText = text.replace(/(?<!\\)"/g, '\\"');
        return indent + '"' + fixedText + '"' + suffix;
    }
    
    return line;
});

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log("Fixed quotes with refined logic in ar.json");
