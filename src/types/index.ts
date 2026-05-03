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
}

export interface CityData {
  id: string;
  name: string;
  slug: string;
  location: Location;
  isPrimaryHub?: boolean;
}

export interface ServiceData {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  cityId: string;
  serviceId: string;
  content: string;
  rating: number;
}
