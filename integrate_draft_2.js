
const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
const draftPath = path.join(__dirname, 'seo_content_drafts/002_About_Us_Global.txt');
const draftContent = fs.readFileSync(draftPath, 'utf8');

function getDraftSection(lang) {
    const markers = {
        'de': { start: 'Meta Title: Über uns', end: 'Meta Title: About Us' },
        'en': { start: 'Meta Title: About Us', end: 'Meta Title: درباره ما' },
        'fa': { start: 'Meta Title: درباره ما', end: 'Meta Title: معلومات عنا' },
        'ar': { start: 'Meta Title: معلومات عنا', end: 'Meta Title: О нас' },
        'ru': { start: 'Meta Title: О нас', end: 'Meta Title: Про нас' },
        'uk': { start: 'Meta Title: Про нас', end: 'EOF' }
    };

    const marker = markers[lang];
    let section = "";
    if (marker.end === 'EOF') {
        section = draftContent.substring(draftContent.indexOf(marker.start));
    } else {
        section = draftContent.substring(draftContent.indexOf(marker.start), draftContent.indexOf(marker.end));
    }
    return section;
}

locales.forEach(lang => {
    console.log(`Processing ${lang}...`);
    const section = getDraftSection(lang);
    const lines = section.split('\n').map(l => l.trim()).filter(l => l !== "");
    
    const localePath = path.join(__dirname, `src/locales/${lang}.json`);
    const data = JSON.parse(fs.readFileSync(localePath, 'utf8'));

    // Update SEO
    data.seo.about.title = lines[0].replace('Meta Title: ', '');
    data.seo.about.description = lines[1].replace('Meta Description: ', '');
    data.seo.about.slug = lines[2].replace('URL Slug: ', '');

    // Update About content
    data.about.hero_title = lines[3];
    // Hero desc is usually the first paragraph
    data.about.hero_desc = lines[4];
    
    // Update Paragraphs
    const paragraphs = [];
    for (let i = 4; i < lines.length; i++) {
        let line = lines[i];
        if (line.startsWith('Meta Title:') || line.startsWith('Meta Description:') || line.startsWith('URL Slug:')) continue;
        paragraphs.push(line);
    }
    
    data.about.paragraphs = paragraphs;

    fs.writeFileSync(localePath, JSON.stringify(data, null, 2), 'utf8');
});

console.log("Integration of Draft 002 complete.");
