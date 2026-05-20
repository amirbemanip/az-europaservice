const fs = require('fs');
const path = require('path');

const EXTRACTED_DATA_FILE = 'd:/az-europaservice.de/site/codes/az-europa-next/scratch/advanced_extracted_content.json';
const LOCALES_DIR = 'd:/az-europaservice.de/site/codes/az-europa-next/src/locales';
const languages = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];

const idToEntity = {
    // Global Pages
    '001': { type: 'global_home' },
    '002': { type: 'global_about' },
    '003': { type: 'global_contact' },
    '004': { type: 'global_careers' },
    '005': { type: 'global_locations' },
    '006': { type: 'global_services' },
    '007': { type: 'global_legal', legalId: 'impressum' },
    '008': { type: 'global_legal', legalId: 'datenschutz' },
    '009': { type: 'global_legal', legalId: 'agb' },

    // City Hubs
    '010': { type: 'city', id: 'erlangen' },
    '011': { type: 'city', id: 'nuernberg' },
    '012': { type: 'city', id: 'bamberg' },
};

// Dynamically add 31-101 based on filenames
const extractedData = JSON.parse(fs.readFileSync(EXTRACTED_DATA_FILE, 'utf8'));

extractedData.forEach(item => {
    if (idToEntity[item.id]) return; // Already mapped

    const fileName = item.fileName;
    const parts = fileName.split('_');
    const name = parts[1];
    const cityOrType = parts[2] ? parts[2].replace('.txt', '') : '';

    if (item.type === 'matrix') {
        const cityId = cityOrType.toLowerCase();
        let serviceId = name.toLowerCase();
        
        // Map service names to JSON keys
        if (serviceId === 'rueckbau') serviceId = 'abbrucharbeiten';
        if (serviceId === 'wohnungsaufloesung' || serviceId === 'kellerentruempelung') serviceId = 'entruempelung';
        if (serviceId === 'rasenmaehen' || serviceId === 'heckenschnitt' || serviceId === 'gartengestaltung') serviceId = 'gartenpflege';
        if (serviceId === 'baureinigung' || serviceId === 'bueroreinigung' || serviceId === 'desinfektionsreinigung' || serviceId === 'fassadenreinigung' || serviceId === 'industriereinigung' || serviceId === 'krankenhausreinigung' || serviceId === 'praxisreinigung' || serviceId === 'treppenhausreinigung' || serviceId === 'glasreinigung') {
             // These are sub-services under cleaning or separate? 
             // In matrix, they usually go into matrix[city][service]
        }
        
        idToEntity[item.id] = { type: 'matrix', cityId, serviceId };
    }
});

languages.forEach(lang => {
    const localePath = path.join(LOCALES_DIR, `${lang}.json`);
    if (!fs.existsSync(localePath)) return;

    const dict = JSON.parse(fs.readFileSync(localePath, 'utf8'));

    extractedData.forEach(item => {
        const entity = idToEntity[item.id];
        if (!entity) return;

        const langData = item.locales[lang];
        if (!langData) return;

        switch (entity.type) {
            case 'global_home':
                if (!dict.seo.home) dict.seo.home = {};
                dict.seo.home.title = langData.seo_title;
                dict.seo.home.description = langData.seo_desc;
                if (!dict.hero) dict.hero = {};
                dict.hero.title = langData.hero_title;
                dict.hero.desc = langData.hero_desc;
                dict.hero.paragraphs = langData.paragraphs;
                break;
            case 'global_about':
                if (!dict.seo.about) dict.seo.about = {};
                dict.seo.about.title = langData.seo_title;
                dict.seo.about.description = langData.seo_desc;
                if (!dict.about) dict.about = {};
                dict.about.hero_title = langData.hero_title;
                dict.about.hero_desc = langData.hero_desc;
                dict.about.paragraphs = langData.paragraphs;
                break;
            case 'global_services':
                if (!dict.seo.services) dict.seo.services = {};
                dict.seo.services.title = langData.seo_title;
                dict.seo.services.description = langData.seo_desc;
                if (!dict.leistungen) dict.leistungen = {};
                dict.leistungen.hero_title = langData.hero_title;
                dict.leistungen.hero_desc = langData.hero_desc;
                dict.leistungen.paragraphs = langData.paragraphs;
                break;
            case 'global_careers':
                if (!dict.seo.karriere) dict.seo.karriere = {};
                dict.seo.karriere.title = langData.seo_title;
                dict.seo.karriere.description = langData.seo_desc;
                if (!dict.karriere) dict.karriere = {};
                dict.karriere.hero_title = langData.hero_title;
                dict.karriere.hero_desc = langData.hero_desc;
                dict.karriere.paragraphs = langData.paragraphs;
                break;
            case 'global_contact':
                if (!dict.seo.contact) dict.seo.contact = {};
                dict.seo.contact.title = langData.seo_title;
                dict.seo.contact.description = langData.seo_desc;
                if (!dict.kontakt) dict.kontakt = {};
                dict.kontakt.hero_title = langData.hero_title;
                dict.kontakt.hero_desc = langData.hero_desc;
                break;
            case 'global_locations':
                if (!dict.seo.locations) dict.seo.locations = {};
                dict.seo.locations.title = langData.seo_title;
                dict.seo.locations.description = langData.seo_desc;
                break;
            case 'global_legal':
                if (!dict.legal) dict.legal = {};
                if (!dict.legal[entity.legalId]) dict.legal[entity.legalId] = {};
                dict.legal[entity.legalId].title = langData.hero_title;
                dict.legal[entity.legalId].desc = langData.hero_desc;
                dict.legal[entity.legalId].paragraphs = langData.paragraphs;
                break;
            case 'city':
                if (!dict.cities) dict.cities = {};
                if (!dict.cities[entity.id]) dict.cities[entity.id] = {};
                dict.cities[entity.id].hero_title_2 = langData.hero_title;
                dict.cities[entity.id].hero_desc = langData.hero_desc;
                dict.cities[entity.id].paragraphs = langData.paragraphs;
                dict.cities[entity.id].features = langData.features;
                
                if (!dict.seo[entity.id]) dict.seo[entity.id] = {};
                dict.seo[entity.id].title = langData.seo_title;
                dict.seo[entity.id].description = langData.seo_desc;
                break;
            case 'matrix':
                if (!dict.matrix) dict.matrix = {};
                if (!dict.matrix[entity.cityId]) dict.matrix[entity.cityId] = {};
                if (!dict.matrix[entity.cityId][entity.serviceId]) dict.matrix[entity.cityId][entity.serviceId] = {};
                
                const mEntry = dict.matrix[entity.cityId][entity.serviceId];
                mEntry.hero_title = langData.hero_title;
                mEntry.hero_desc = langData.hero_desc;
                mEntry.paragraphs = langData.paragraphs;
                mEntry.features = langData.features;
                break;
        }
    });

    fs.writeFileSync(localePath, JSON.stringify(dict, null, 2), 'utf8');
    console.log(`Updated ${lang}.json`);
});
