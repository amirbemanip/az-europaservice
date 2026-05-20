
const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
const draftPath = path.join(__dirname, 'seo_content_drafts/003_Contact_Global.txt');
const draftContent = fs.readFileSync(draftPath, 'utf8');

function getDraftSection(lang) {
    const markers = {
        'de': { start: 'Meta Title: Kontakt & Erstberatung', end: 'Meta Title: Contact & Consultation' },
        'en': { start: 'Meta Title: Contact & Consultation', end: 'Meta Title: تماس و مشاوره' },
        'fa': { start: 'Meta Title: تماس و مشاوره', end: 'Meta Title: اتصل بنا والاستشارة' },
        'ar': { start: 'Meta Title: اتصل بنا والاستشارة', end: 'Meta Title: Контакты и консультация' },
        'ru': { start: 'Meta Title: Контакты и консультация', end: 'Meta Title: Контакти та консультація' },
        'uk': { start: 'Meta Title: Контакти та консультація', end: 'EOF' }
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
    data.seo.contact.title = lines[0].replace('Meta Title: ', '');
    data.seo.contact.description = lines[1].replace('Meta Description: ', '');
    data.seo.contact.slug = lines[2].replace('URL Slug: ', '');

    // Update Contact content
    data.kontakt.hero_title = lines[3];
    data.kontakt.hero_desc = lines[4];
    
    // Update Paragraphs
    const paragraphs = [];
    for (let i = 5; i < lines.length; i++) {
        let line = lines[i];
        if (line.startsWith('Meta Title:') || line.startsWith('Meta Description:') || line.startsWith('URL Slug:')) continue;
        if (line.startsWith('[') && line.endsWith(']')) continue;
        if (line.includes('Telefon:') || line.includes('E-Mail:') || line.includes('Zentrale:')) continue; // Skip static info
        paragraphs.push(line);
    }
    
    data.kontakt.paragraphs = paragraphs;

    fs.writeFileSync(localePath, JSON.stringify(data, null, 2), 'utf8');
});

console.log("Integration of Draft 003 complete.");
