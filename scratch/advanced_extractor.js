const fs = require('fs');
const path = require('path');

const DRAFTS_DIR = 'd:/az-europaservice.de/site/codes/az-europa-next/seo_content_drafts';
const OUTPUT_FILE = 'd:/az-europaservice.de/site/codes/az-europa-next/scratch/advanced_extracted_content.json';

const languages = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];

function extractContent(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    const id = fileName.split('_')[0];
    
    let type = 'matrix';
    if (fileName.includes('City_Hub')) type = 'city';
    if (fileName.includes('Global')) type = 'global';

    const result = {
        id: id,
        type: type,
        fileName: fileName,
        locales: {}
    };

    const blocks = content.split(/Meta Title:/i).slice(1);
    
    blocks.forEach((block, index) => {
        const lang = languages[index];
        if (!lang) return;

        const lines = ('Meta Title: ' + block).split('\n').map(l => l.trim()).filter(Boolean);
        
        const data = {
            seo_title: '',
            seo_desc: '',
            slug: '',
            hero_title: '',
            hero_desc: '',
            paragraphs: [],
            features: []
        };

        lines.forEach(line => {
            if (line.startsWith('Meta Title:')) {
                data.seo_title = line.replace('Meta Title:', '').trim();
            } else if (line.startsWith('Meta Description:')) {
                data.seo_desc = line.replace('Meta Description:', '').trim();
            } else if (line.startsWith('URL Slug:')) {
                data.slug = line.replace('URL Slug:', '').trim();
            } else if (line.match(/^[\d\u0660-\u0669\u06F0-\u06F9]+[\.\)]/) || line.match(/^[\-\*\u2022\u25CF]\s+/)) {
                // List item detected
                const item = line.replace(/^[\d\u0660-\u0669\u06F0-\u06F9]+[\.\)]\s*|^[\-\*\u2022\u25CF]\s*/, '').trim();
                data.features.push(item);
            } else if (!data.hero_title && line.length > 10 && !line.includes('Meta') && !line.includes('URL') && !line.includes('[')) {
                data.hero_title = line;
            } else if (data.hero_title && !data.hero_desc && line.length > 20 && !line.includes('Meta') && !line.includes('URL') && !line.includes('[')) {
                data.hero_desc = line;
            } else if (line.startsWith('[') && line.endsWith(']')) {
                return;
            } else if (line.length > 5) {
                // Check if it's a heading (usually short and no dot at end)
                if (line.length < 100 && !line.endsWith('.') && !line.endsWith('!') && !line.endsWith('؟') && !line.endsWith('?')) {
                    // Heading: make it bold for paragraphs
                    data.paragraphs.push(`**${line}**`);
                } else {
                    data.paragraphs.push(line);
                }
            }
        });

        result.locales[lang] = data;
    });

    return result;
}

const filesToProcess = fs.readdirSync(DRAFTS_DIR)
    .filter(f => f.endsWith('.txt'))
    .sort((a, b) => parseInt(a.split('_')[0]) - parseInt(b.split('_')[0]))
    .map(f => path.join(DRAFTS_DIR, f));

const allData = filesToProcess.map(extractContent);

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allData, null, 2), 'utf8');
console.log(`Processed ${allData.length} files. Output saved to ${OUTPUT_FILE}`);
