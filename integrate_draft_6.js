
const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
const draftPath = path.join(__dirname, 'seo_content_drafts/006_Leistungen_Overview.txt');
const draftContent = fs.readFileSync(draftPath, 'utf8');

// Helper to extract section from draft
function getDraftSection(lang) {
    const markers = {
        'de': { start: 'Meta Title: Dienstleistungen Gebäudemanagement', end: 'Meta Title: Facility Management Services' },
        'en': { start: 'Meta Title: Facility Management Services', end: 'Meta Title: کاتالوگ خدمات مدیریت تاسیسات' },
        'fa': { start: 'Meta Title: کاتالوگ خدمات مدیریت تاسیسات', end: 'Meta Title: خدمات إدارة المرافق' },
        'ar': { start: 'Meta Title: خدمات إدارة المرافق', end: 'Meta Title: Услуги фасилити-менеджмента' },
        'ru': { start: 'Meta Title: Услуги фасилити-менеджмента', end: 'Meta Title: Послуги фасіліті-менеджменту' },
        'uk': { start: 'Meta Title: Послуги фасіліті-менеджменту', end: 'EOF' }
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
    data.seo.services.title = lines[0].replace('Meta Title: ', '');
    data.seo.services.description = lines[1].replace('Meta Description: ', '');
    data.seo.services.slug = lines[2].replace('URL Slug: ', '');

    // Update leistungen content
    data.leistungen.hero_title = lines[3];
    data.leistungen.hero_desc = lines[4];
    
    // Extract paragraphs (lines starting from index 5)
    // We need to skip markers like [Cleaning], [Management], [Renovation] headers if they are just titles
    const paragraphs = [];
    for (let i = 5; i < lines.length; i++) {
        let line = lines[i];
        if (line.startsWith('Meta Title:') || line.startsWith('Meta Description:') || line.startsWith('URL Slug:')) continue;
        if (line.startsWith('[') && line.endsWith(']')) continue; // Skip navigation labels
        paragraphs.push(line);
    }
    
    data.leistungen.paragraphs = paragraphs;

    fs.writeFileSync(localePath, JSON.stringify(data, null, 2), 'utf8');
});

console.log("Integration of Draft 006 complete for all languages.");
