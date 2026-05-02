import { CityData, ServiceData, Testimonial } from '@/types';

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
      phone: '+49 9131 6146235',
      googleMapsUrl: 'https://maps.google.com/?q=Apfelstraße+5,91054+Erlangen',
      coordinates: { latitude: 49.598, longitude: 11.004 }
    }
  },
  {
    id: 'nuernberg',
    name: 'Nürnberg',
    slug: 'nuernberg',
    location: {
      address: 'Glockenhofstraße 29',
      postalCode: '90478',
      city: 'Nürnberg',
      phone: '+49 176 62494401',
      googleMapsUrl: 'https://maps.google.com/?q=Glockenhofstraße+29,90478+Nürnberg',
      coordinates: { latitude: 49.445, longitude: 11.091 }
    }
  },
  {
    id: 'bamberg',
    name: 'Bamberg',
    slug: 'bamberg',
    location: {
      address: 'Ob. Königstraße 39',
      postalCode: '96052',
      city: 'Bamberg',
      phone: '+49 173 3081757',
      googleMapsUrl: 'https://maps.google.com/?q=Ob.+Königstraße+39,96052+Bamberg',
      coordinates: { latitude: 49.897, longitude: 10.895 }
    }
  }
];

export const services: ServiceData[] = [
  {
    id: 'reinigung',
    title: 'Reinigung',
    slug: 'reinigung',
    description: 'Professionelle Gebäudereinigung und Unterhaltsreinigung für Büros und Privathaushalte.'
  },
  {
    id: 'hausmeisterservice',
    title: 'Hausmeisterservice',
    slug: 'hausmeisterservice',
    description: 'Zuverlässige Objektbetreuung, Kleinreparaturen und Instandhaltung Ihrer Immobilien.'
  },
  {
    id: 'renovierungen',
    title: 'Renovierungen',
    slug: 'renovierungen',
    description: 'Malerarbeiten, Bodenverlegung und Komplettumbauten für einen frischen Look.'
  },
  {
    id: 'abbrucharbeiten',
    title: 'Abbrucharbeiten',
    slug: 'abbrucharbeiten',
    description: 'Sicherer und effizienter Rückbau inklusive Planung und fachgerechter Entsorgung.'
  },
  {
    id: 'gartenpflege',
    title: 'Gartenpflege',
    slug: 'gartenpflege',
    description: 'Rasenmähen, Heckenschnitt und Neugestaltung für Ihr grünes Paradies.'
  },
  {
    id: 'entruempelung',
    title: 'Entrümpelung',
    slug: 'entruempelung',
    description: 'Fachgerechte und besenreine Entrümpelung von Wohnungen, Kellern und Büros.'
  }
];

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
