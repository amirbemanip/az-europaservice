import { CityData, MacroService, MicroService, CityServiceMatrix, Testimonial } from '@/types';

export const cities: CityData[] = [
  {
    id: 'erlangen',
    name: 'Erlangen',
    slug: 'erlangen',
    isPrimaryHub: true,
    location: {
      address: 'Apfelstraße 5',
      postalCode: '91054',
      city: 'Erlangen',
      phone: '09131 6146235',
      googleMapsUrl: 'https://maps.app.goo.gl/JQ8n4ZsFxQ8tnRrB6',
      coordinates: { latitude: 49.598, longitude: 11.004 },
      openingHours: [
        { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '07:00', closes: '20:00' },
        { dayOfWeek: ['Friday'], opens: '07:00', closes: '17:00' },
        { dayOfWeek: ['Saturday'], opens: '09:00', closes: '15:00' }
      ],
      serviceAreas: ['Uttenreuth', 'Erlangen', 'Adelsdorf', 'Baiersdorf', 'Bubenreuth', 'Möhrendorf', 'Spardorf', 'Forchheim', 'Höchstadt', 'Erlangen-Höchstadt', 'Herzogenaurach'],
      socialLinks: {
        instagram: 'https://www.instagram.com/az_europaservice/',
        facebook: 'https://www.facebook.com/profile.php?id=100081220661990',
        linkedin: 'https://de.linkedin.com/company/az-europa-service'
      }
    }
  },
  {
    id: 'nuernberg',
    name: 'Nürnberg',
    slug: 'nuernberg',
    isPrimaryHub: true,
    location: {
      address: 'Glockenhofstraße 29',
      postalCode: '90478',
      city: 'Nürnberg',
      phone: '0176 62494401',
      googleMapsUrl: 'https://maps.app.goo.gl/4hpC4qL6sWknEXR79',
      coordinates: { latitude: 49.445, longitude: 11.091 },
      openingHours: [
        { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '07:00', closes: '20:00' },
        { dayOfWeek: ['Friday'], opens: '07:00', closes: '17:00' },
        { dayOfWeek: ['Saturday'], opens: '09:00', closes: '15:00' }
      ],
      serviceAreas: ['Stein', 'Fürth', 'Feucht', 'Erlangen', 'Nürnberg', 'Oberasbach', 'Wendelstein', 'Zirndorf', 'Schwabach', 'Lauf an der Pegnitz', 'Nürnberger Land'],
      socialLinks: {
        instagram: 'https://www.instagram.com/az_trustservice7/',
        facebook: 'https://www.facebook.com/profile.php?id=100081220661990',
        linkedin: 'https://de.linkedin.com/company/az-europa-service'
      }
    }
  },
  {
    id: 'bamberg',
    name: 'Bamberg',
    slug: 'bamberg',
    isPrimaryHub: true,
    location: {
      address: 'Ob. Königstraße 39',
      postalCode: '96052',
      city: 'Bamberg',
      phone: '0173 3081757',
      googleMapsUrl: 'https://maps.app.goo.gl/vEGthNFEW8SaUwXd9',
      coordinates: { latitude: 49.897, longitude: 10.895 },
      openingHours: [
        { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '07:00', closes: '20:00' },
        { dayOfWeek: ['Friday'], opens: '07:00', closes: '17:00' },
        { dayOfWeek: ['Saturday'], opens: '09:00', closes: '15:00' }
      ],
      serviceAreas: ['Bamberg', 'Hirschaid', 'Forchheim', 'Strullendorf', 'Hallstadt', 'Bischberg', 'Litzendorf', 'Stegaurach', 'Burgebrach', 'Memmelsdorf'],
      socialLinks: {
        instagram: 'https://www.instagram.com/az_europaservice/',
        facebook: 'https://www.facebook.com/profile.php?id=100081220661990',
        linkedin: 'https://de.linkedin.com/company/az-europa-service'
      }
    }
  }
];

export const macroServices: MacroService[] = [
  {
    id: 'reinigung',
    title: 'Reinigung aller Art',
    slug: 'reinigung',
    description: 'Professionelle Reinigungsservices für ein hygienisch einwandfreies Umfeld.',
    cover_image: '/photos/Reinigung aller Art.png',
  },
  {
    id: 'hausmeisterservice',
    title: 'Hausmeisterservice',
    slug: 'hausmeisterservice',
    description: 'Rundum-Betreuung Ihrer Immobilie, kleine Reparaturen und Instandhaltung.',
    cover_image: '/photos/Hausmeisterservice.png',
  },
  {
    id: 'renovierungen',
    title: 'Renovierungen',
    slug: 'renovierungen',
    description: 'Malerarbeiten, Bodenverlegung und Komplettlösungen für frischen Glanz.',
    cover_image: '/photos/Renovierungen.png',
  },
  {
    id: 'abbrucharbeiten',
    title: 'Abbrucharbeiten',
    slug: 'abbrucharbeiten',
    description: 'Effizienter Rückbau, Planung und fachgerechte Entsorgung.',
    cover_image: '/photos/Abbrucharbeiten.png',
  },
  {
    id: 'gartenpflege',
    title: 'Gartenpflege',
    slug: 'gartenpflege',
    description: 'Rasenmähen, Heckenschnitt und liebevolle Gestaltung Ihrer Außenanlagen.',
    cover_image: '/photos/Gartenpflege.png',
  },
  {
    id: 'entruempelung',
    title: 'Entrümpelung',
    slug: 'entruempelungen',
    description: 'Fachgerechte Entsorgung und besenreine Räumung.',
    cover_image: '/photos/Entrümpelung.png',
  }
];

export const microServices: MicroService[] = [
  // Reinigung
  { id: 'unterhaltsreinigung', macro_id: 'reinigung', title: 'Unterhaltsreinigung', slug: 'unterhaltsreinigung', description: 'Regelmäßige Reinigung für Büros, Praxen und Geschäftsräume.', seo_meta: { title: 'Unterhaltsreinigung' } },
  { id: 'baureinigung', macro_id: 'reinigung', title: 'Baureinigung', slug: 'baureinigung', description: 'Nach dem Bau kommt der Glanz. Wir kümmern uns um die professionelle Endreinigung.', seo_meta: { title: 'Baureinigung' } },
  { id: 'bueroreinigung', macro_id: 'reinigung', title: 'Büroreinigung', slug: 'bueroreinigung', description: 'Gründliche Reinigung für eine produktive Arbeitsatmosphäre.', seo_meta: { title: 'Büroreinigung' } },
  { id: 'desinfektionsreinigung', macro_id: 'reinigung', title: 'Desinfektionsreinigung', slug: 'desinfektionsreinigung', description: 'Hygienische Desinfektion für sensible Bereiche.', seo_meta: { title: 'Desinfektionsreinigung' } },
  { id: 'fassadenreinigung', macro_id: 'reinigung', title: 'Fassadenreinigung', slug: 'fassadenreinigung', description: 'Schonende und gründliche Reinigung von Außenfassaden.', seo_meta: { title: 'Fassadenreinigung' } },
  { id: 'industriereinigung', macro_id: 'reinigung', title: 'Industriereinigung', slug: 'industriereinigung', description: 'Spezialisierte Reinigung für Produktions- und Lagerhallen.', seo_meta: { title: 'Industriereinigung' } },
  { id: 'krankenhausreinigung', macro_id: 'reinigung', title: 'Krankenhausreinigung', slug: 'krankenhausreinigung', description: 'Höchste Hygienestandards für Kliniken und medizinische Einrichtungen.', seo_meta: { title: 'Krankenhausreinigung' } },
  { id: 'praxisreinigung', macro_id: 'reinigung', title: 'Praxisreinigung', slug: 'praxisreinigung', description: 'Hygiene auf höchstem Niveau für Arztpraxen.', seo_meta: { title: 'Praxisreinigung' } },
  { id: 'treppenhausreinigung', macro_id: 'reinigung', title: 'Treppenhausreinigung', slug: 'treppenhausreinigung', description: 'Saubere Treppenhäuser als Visitenkarte Ihrer Immobilie.', seo_meta: { title: 'Treppenhausreinigung' } },
  { id: 'glasreinigung', macro_id: 'reinigung', title: 'Glas- & Fensterreinigung', slug: 'glasreinigung', description: 'Streifenfreier Glanz für Fenster und Glasflächen.', seo_meta: { title: 'Glas- und Fensterreinigung' } },
  
  // Renovierungen
  { id: 'malerarbeiten', macro_id: 'renovierungen', title: 'Malerarbeiten', slug: 'malerarbeiten', description: 'Professionelle Anstriche für Innen- und Außenbereiche.', seo_meta: { title: 'Malerarbeiten' } },
  { id: 'bodenverlegung', macro_id: 'renovierungen', title: 'Bodenverlegung', slug: 'bodenverlegung', description: 'Verlegung von Laminat, Parkett und Fliesen.', seo_meta: { title: 'Bodenverlegung' } },
  { id: 'komplettumbau', macro_id: 'renovierungen', title: 'Komplettumbau', slug: 'komplettumbau', description: 'Ganzheitliche Renovierungslösungen aus einer Hand.', seo_meta: { title: 'Komplettumbau' } },
  
  // Abbruch
  { id: 'rueckbau', macro_id: 'abbrucharbeiten', title: 'Rückbau', slug: 'rueckbau', description: 'Kontrollierter und sicherer Rückbau von Strukturen.', seo_meta: { title: 'Rückbau' } },
  { id: 'entsorgung', macro_id: 'abbrucharbeiten', title: 'Entsorgung', slug: 'entsorgung', description: 'Fachgerechte Trennung und Entsorgung von Bauschutt.', seo_meta: { title: 'Fachgerechte Entsorgung' } },
  
  // Gartenpflege
  { id: 'rasenmaehen', macro_id: 'gartenpflege', title: 'Rasenmähen', slug: 'rasenmaehen', description: 'Regelmäßiger Schnitt für einen gesunden Rasen.', seo_meta: { title: 'Rasenmähen' } },
  { id: 'heckenschnitt', macro_id: 'gartenpflege', title: 'Heckenschnitt', slug: 'heckenschnitt', description: 'Formschnitt und Pflege für Hecken und Sträucher.', seo_meta: { title: 'Heckenschnitt' } },
  { id: 'neugestaltung', macro_id: 'gartenpflege', title: 'Gartengestaltung', slug: 'neugestaltung', description: 'Kreative Konzepte für Ihr grünes Paradies.', seo_meta: { title: 'Gartengestaltung' } },
  
  // Entrümpelung
  { id: 'wohnungsaufloesung', macro_id: 'entruempelung', title: 'Wohnungsauflösung', slug: 'wohnungsaufloesung', description: 'Diskrete und schnelle Räumung von Wohnungen.', seo_meta: { title: 'Wohnungsauflösung' } },
  { id: 'kellerentruempelung', macro_id: 'entruempelung', title: 'Kellerentrümpelung', slug: 'kellerentruempelung', description: 'Platz schaffen durch gründliche Kellerentrümpelung.', seo_meta: { title: 'Kellerentrümpelung' } }
];

export const cityServiceMatrix: CityServiceMatrix = {
  erlangen: {
    unterhaltsreinigung: true, baureinigung: true, bueroreinigung: true, desinfektionsreinigung: true, fassadenreinigung: true, industriereinigung: true, krankenhausreinigung: true, praxisreinigung: true, treppenhausreinigung: true, glasreinigung: true, malerarbeiten: true, bodenverlegung: true, komplettumbau: true, rueckbau: true, entsorgung: true, rasenmaehen: true, heckenschnitt: true, neugestaltung: true, wohnungsaufloesung: true, kellerentruempelung: true
  },
  nuernberg: {
    unterhaltsreinigung: true, baureinigung: true, bueroreinigung: true, desinfektionsreinigung: true, fassadenreinigung: true, industriereinigung: true, krankenhausreinigung: true, praxisreinigung: true, treppenhausreinigung: true, glasreinigung: true, malerarbeiten: true, bodenverlegung: true, komplettumbau: true, rueckbau: true, entsorgung: true, rasenmaehen: true, heckenschnitt: true, neugestaltung: true, wohnungsaufloesung: true, kellerentruempelung: true
  },
  bamberg: {
    unterhaltsreinigung: true, baureinigung: true, bueroreinigung: true, desinfektionsreinigung: true, fassadenreinigung: true, industriereinigung: true, krankenhausreinigung: true, praxisreinigung: true, treppenhausreinigung: true, glasreinigung: true, malerarbeiten: true, bodenverlegung: true, komplettumbau: true, rueckbau: true, entsorgung: true, rasenmaehen: true, heckenschnitt: true, neugestaltung: true, wohnungsaufloesung: true, kellerentruempelung: true
  }
};

// Placeholder testimonials to be rendered dynamically based on city
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    author: 'Sybille H.',
    cityId: 'erlangen',
    serviceId: 'reinigung',
    content: 'Sehr gründliche Reinigung, professionell und sehr freundlich. Wir sind sehr zufrieden.',
    rating: 5
  },
  {
    id: 't2',
    author: 'Ya',
    cityId: 'nuernberg',
    serviceId: 'reinigung',
    content: 'Ich bin sehr zufrieden mit AZ-Europa Service, ich habe eine Grundreinigung bei AZ bestellt, und jetzt glänzt meine Wohnung.',
    rating: 5
  }
];
