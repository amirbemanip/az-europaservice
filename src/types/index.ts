export interface OpeningHours {
  dayOfWeek: string[];
  opens: string;
  closes: string;
  closed?: boolean;
}

export interface Location {
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  googleMapsUrl?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: OpeningHours[];
  serviceAreas?: string[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export interface CityData {
  id: string;
  name: string;
  slug: string;
  location: Location;
  isPrimaryHub?: boolean;
}

export interface MacroService {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image: string;
  icon?: string;
}

export interface MicroService {
  id: string;
  macro_id: string;
  title: string;
  slug: string;
  description: string;
  seo_meta?: {
    title?: string;
    description?: string;
  };
  features?: string[];
  image?: string;
  icon?: string;
}

export type CityServiceMatrix = Record<string, Record<string, boolean>>;

export interface Testimonial {
  id: string;
  author: string;
  cityId: string;
  serviceId: string;
  content: string;
  rating: number;
}
