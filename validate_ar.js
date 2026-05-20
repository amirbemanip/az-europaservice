
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/locales/ar.json');
const content = fs.readFileSync(filePath, 'utf8');

try {
    JSON.parse(content);
    console.log("JSON is valid!");
} catch (e) {
    console.log("JSON Error: " + e.message);
    // Find the approximate location
    const match = e.message.match(/position (\d+)/);
    if (match) {
        const pos = parseInt(match[1]);
        const start = Math.max(0, pos - 100);
        const end = Math.min(content.length, pos + 100);
        console.log("Context around error:");
        console.log(content.substring(start, end));
    }
}
