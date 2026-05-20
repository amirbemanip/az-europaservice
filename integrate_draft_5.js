
const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
const draftPath = path.join(__dirname, 'seo_content_drafts/005_Locations_Overview.txt');
const draftContent = fs.readFileSync(draftPath, 'utf8');

function getDraftSection(lang) {
    const markers = {
        'de': { start: 'Meta Title: Facility Management Erlangen Nürnberg Bamberg', end: 'Meta Title: Facility Management Erlangen Nürnberg Bamberg | Local Hub' },
        'en': { start: 'Meta Title: Facility Management Erlangen Nürnberg Bamberg | Local Hub', end: 'Meta Title: مدیریت تاسیسات در ارلانگن، نورنبرگ و بامبرگ' },
        'fa': { start: 'Meta Title: مدیریت تاسیسات در ارلانگن، نورنبرگ و بامبرگ', end: 'Meta Title: إدارة المرافق في إرلانجن، نورنبرغ، بامبرغ' },
        'ar': { start: 'Meta Title: إدارة المرافق في إرلانجن، نورنبرغ، بامبرغ', end: 'Meta Title: Фасилити-менеджмент Эрланген Нюрнберг Бамберг' },
        'ru': { start: 'Meta Title: Фасилити-менеджмент Эрланген Нюрнберг Бамберг', end: 'Meta Title: Фасіліті-менеджмент Ерланген Нюрнберг Бамберг' },
        'uk': { start: 'Meta Title: Фасіліті-менеджмент Ерланген Нюрнберг Бамберг', end: 'EOF' }
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
    if(!data.seo.locations) data.seo.locations = {};
    data.seo.locations.title = lines[0].replace('Meta Title: ', '');
    data.seo.locations.description = lines[1].replace('Meta Description: ', '');
    data.seo.locations.slug = lines[2].replace('URL Slug: ', '');

    // Add Locations content object
    const paragraphs = [];
    for (let i = 4; i < lines.length; i++) {
        let line = lines[i];
        if (line.startsWith('Meta Title:') || line.startsWith('Meta Description:') || line.startsWith('URL Slug:')) continue;
        if (line.startsWith('[') && line.endsWith(']')) continue;
        paragraphs.push(line);
    }
    
    data.locations = {
        hero_title: lines[3],
        hero_desc: lines[4],
        paragraphs: paragraphs
    };

    fs.writeFileSync(localePath, JSON.stringify(data, null, 2), 'utf8');
});

console.log("Integration of Draft 005 complete.");
