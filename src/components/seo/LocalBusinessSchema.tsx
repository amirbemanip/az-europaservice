import React from 'react';
import { CityData } from '@/types';

interface SchemaProps {
  city: CityData;
  service?: {
    id: string;
    title: string;
    description: string;
  };
}

export function LocalBusinessSchema({ city, service }: SchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "CleaningService", "HousekeepingService"],
    "name": service 
      ? `${service.title} in ${city.name} - AZ Europa Service GmbH`
      : `AZ Europa Service GmbH - ${city.name}`,
    "description": service?.description || "Professionelle Gebäudereinigung und Facility Management.",
    "image": "https://az-europaservice.de/logo.png",
    "@id": `https://az-europaservice.de/#localbusiness-${city.slug}`,
    "url": `https://az-europaservice.de/${city.slug}`,
    "telephone": city.location.phone,
    "priceRange": "€€",
    "hasMap": city.location.googleMapsUrl,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": city.location.address,
      "addressLocality": city.location.city,
      "postalCode": city.location.postalCode,
      "addressRegion": "Bayern",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": city.location.coordinates?.latitude || "49.598",
      "longitude": city.location.coordinates?.longitude || "11.004"
    },
    "openingHoursSpecification": city.location.openingHours ? city.location.openingHours.map(oh => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": oh.dayOfWeek,
      "opens": oh.opens,
      "closes": oh.closes
    })) : {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "07:00",
      "closes": "20:00"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": city.name,
        "sameAs": `https://www.wikidata.org/wiki/${city.id === 'nuernberg' ? 'Q2090' : city.id === 'erlangen' ? 'Q3124' : 'Q3951'}`
      },
      ...(city.location.serviceAreas || []).map(area => ({
        "@type": "City",
        "name": area
      })),
      {
        "@type": "AdministrativeArea",
        "name": "Mittelfranken"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Franken"
      }
    ],
    "sameAs": city.location.socialLinks ? [
      city.location.socialLinks.instagram,
      city.location.socialLinks.facebook,
      city.location.socialLinks.linkedin
    ].filter(Boolean) : [],
    "parentOrganization": {
      "@type": "Organization",
      "@id": "https://az-europaservice.de/#organization",
      "name": "AZ Europa Service GmbH",
      "url": "https://az-europaservice.de"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": city.id === 'nuernberg' ? "85" : city.id === 'erlangen' ? "124" : "42",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
