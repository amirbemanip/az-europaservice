
const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src/locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

console.log(`Auditing ${files.length} locale files...`);

files.forEach(file => {
    const filePath = path.join(localesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    try {
        JSON.parse(content);
        console.log(`✅ ${file}: Valid`);
    } catch (e) {
        console.error(`❌ ${file}: INVALID`);
        console.error(`   Error: ${e.message}`);
        
        // Find line number
        const lines = content.split('\n');
        let totalChars = 0;
        const match = e.message.match(/position (\d+)/);
        if (match) {
            const pos = parseInt(match[1]);
            for (let i = 0; i < lines.length; i++) {
                totalChars += lines[i].length + 1; // +1 for newline
                if (totalChars >= pos) {
                    console.error(`   Problematic line: ${i + 1}`);
                    console.error(`   Content: ${lines[i].trim()}`);
                    break;
                }
            }
        }
    }
});
