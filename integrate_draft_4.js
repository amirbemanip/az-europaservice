
const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
const draftPath = path.join(__dirname, 'seo_content_drafts/004_Karriere_Global.txt');
const draftContent = fs.readFileSync(draftPath, 'utf8');

function getDraftSection(lang) {
    const markers = {
        'de': { start: 'Meta Title: Karriere Facility Management', end: 'Meta Title: Careers in Facility Management' },
        'en': { start: 'Meta Title: Careers in Facility Management', end: 'Meta Title: استخدام و فرصت‌های شغلی' },
        'fa': { start: 'Meta Title: استخدام و فرصت‌های شغلی', end: 'Meta Title: وظائف وإدارة مرافق' },
        'ar': { start: 'Meta Title: وظائف وإدارة مرافق', end: 'Meta Title: Карьера и вакансии' },
        'ru': { start: 'Meta Title: Карьера и вакансии', end: 'Meta Title: Кар\'єра та вакансії' },
        'uk': { start: 'Meta Title: Кар\'єра та вакансії', end: 'EOF' }
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
    data.seo.karriere.title = lines[0].replace('Meta Title: ', '');
    data.seo.karriere.description = lines[1].replace('Meta Description: ', '');
    data.seo.karriere.slug = lines[2].replace('URL Slug: ', '');

    // Update Karriere content
    data.karriere.hero_title = lines[3];
    data.karriere.hero_desc = lines[4];
    
    // Update Paragraphs
    const paragraphs = [];
    for (let i = 5; i < lines.length; i++) {
        let line = lines[i];
        if (line.startsWith('Meta Title:') || line.startsWith('Meta Description:') || line.startsWith('URL Slug:')) continue;
        if (line.startsWith('[') && line.endsWith(']')) continue;
        if (line.includes('jobs@az-europaservice.de')) continue;
        paragraphs.push(line);
    }
    
    data.karriere.paragraphs = paragraphs;

    fs.writeFileSync(localePath, JSON.stringify(data, null, 2), 'utf8');
});

console.log("Integration of Draft 004 complete.");
