
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/locales/ar.json');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the over-escaping of keys
content = content.replace(/\\":/g, '":');
// Fix the over-escaping at the end of objects/arrays if any
content = content.replace(/"{/g, '{');
content = content.replace(/"}/g, '}');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed over-escaping in ar.json");
