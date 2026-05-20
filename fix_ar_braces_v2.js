
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/locales/ar.json');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove all newlines and extra spaces to treat it as a single stream
// but be careful not to join words.
content = content.replace(/\r?\n/g, ' ');
content = content.replace(/\s+/g, ' ');

// 2. Fix the structural patterns
// Fix objects: {" -> { "
content = content.replace(/\{\s*"/g, '{ "');
// Fix nested objects: : { " -> : {
content = content.replace(/:\s*{\s*"/g, ': { "'); 
// Wait, the above might be wrong. In JSON, { is followed by "key".
// The problem was if we had { " and NO key following it.

// Let's use a cleaner approach:
// Replace any " followed by { or [ or } or ] with just the brace
content = content.replace(/"\{/g, '{');
content = content.replace(/"\[/g, '[');
content = content.replace(/\}"/g, '}');
content = content.replace(/\]"/g, ']');

// Also fix the case where a quote is before a brace
content = content.replace(/\{"/g, '{');
content = content.replace(/\["/g, '[');
// But wait, the key starts with "! 
// So we need { "key"
content = content.replace(/\{\s*/g, '{ "');
content = content.replace(/"\s*"/g, '"'); // Fix double quotes

// This is still risky. Let's do a SIMPLE line-by-line fix instead.
content = fs.readFileSync(filePath, 'utf8');
let lines = content.split(/\r?\n/);
let fixed = lines.map(line => {
    let t = line.trim();
    // If a line is just a quote and a brace, it's wrong.
    if (t === '"{' || t === '{"' || t === '{" ') return line.replace(t, '{');
    if (t === '"[' || t === '["' || t === '[" ') return line.replace(t, '[');
    
    // Fix ends of lines
    if (line.endsWith('{"')) return line.replace('{"', '{');
    if (line.endsWith('["')) return line.replace('["', '[');
    
    return line;
});

fs.writeFileSync(filePath, fixed.join('\n'), 'utf8');
