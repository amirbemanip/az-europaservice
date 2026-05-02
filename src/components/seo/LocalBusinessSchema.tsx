import React from 'react';
import { CityData } from '@/types';

interface SchemaProps {
  city: CityData;
}

export function LocalBusinessSchema({ city }: SchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `AZ Europa Service GmbH - ${city.name}`,
    "image": "https://az-europaservice.de/logo.png",
    "@id": `https://az-europaservice.de/#localbusiness-${city.slug}`,
    "url": `https://az-europaservice.de/${city.slug}`,
    "telephone": city.location.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": city.location.address,
      "addressLocality": city.location.city,
      "postalCode": city.location.postalCode,
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": city.location.coordinates?.latitude || "49.598",
      "longitude": city.location.coordinates?.longitude || "11.004"
    },
    "parentOrganization": {
      "@type": "Organization",
      "@id": "https://az-europaservice.de/#organization",
      "name": "AZ Europa Service GmbH",
      "url": "https://az-europaservice.de"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "07:00",
      "closes": "22:00"
    },
    "priceRange": "€€"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
