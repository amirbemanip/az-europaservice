
const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
const draftPath = path.join(__dirname, 'seo_content_drafts/001_Home_Global.txt');
const draftContent = fs.readFileSync(draftPath, 'utf8');

function getDraftSection(lang) {
    const markers = {
        'de': { start: 'Meta Title: Facility Management Franken', end: 'Meta Title: Premium Facility Management Franconia' },
        'en': { start: 'Meta Title: Premium Facility Management Franconia', end: 'Meta Title: مدیریت تخصصی تاسیسات' },
        'fa': { start: 'Meta Title: مدیریت تخصصی تاسیسات', end: 'Meta Title: إدارة المرافق المعتمدة' },
        'ar': { start: 'Meta Title: إدارة المرافق المعتمدة', end: 'Meta Title: Управление недвижимостью' },
        'ru': { start: 'Meta Title: Управление недвижимостью', end: 'Meta Title: Комплексне управління нерухомістю' },
        'uk': { start: 'Meta Title: Комплексне управління нерухомістю', end: 'EOF' }
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
    data.seo.home.title = lines[0].replace('Meta Title: ', '');
    data.seo.home.description = lines[1].replace('Meta Description: ', '');
    data.seo.home.slug = lines[2].replace('URL Slug: ', '');

    // Update Hero
    data.hero.title = lines[3];
    data.hero.desc = lines[4];
    
    // Update Paragraphs
    const paragraphs = [];
    for (let i = 5; i < lines.length; i++) {
        let line = lines[i];
        if (line.startsWith('Meta Title:') || line.startsWith('Meta Description:') || line.startsWith('URL Slug:')) continue;
        if (line.startsWith('[') && line.endsWith(']')) continue; // Skip buttons like [Request Consultation]
        paragraphs.push(line);
    }
    
    data.hero.paragraphs = paragraphs;

    fs.writeFileSync(localePath, JSON.stringify(data, null, 2), 'utf8');
});

console.log("Integration of Draft 001 complete.");
