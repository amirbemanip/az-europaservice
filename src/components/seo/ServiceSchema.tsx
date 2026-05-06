"use client";

import React from 'react';

interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  providerName: string;
  providerLogo?: string;
  providerUrl: string;
  areaServed: string;
  category?: string;
}

export function ServiceSchema({
  serviceName,
  description,
  providerName,
  providerLogo,
  providerUrl,
  areaServed,
  category
}: ServiceSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": providerName,
      "image": providerLogo || "https://az-europaservice.de/logo.png",
      "url": providerUrl
    },
    "areaServed": {
      "@type": "City",
      "name": areaServed
    },
    "serviceType": category || serviceName,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${serviceName} in ${areaServed}`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": serviceName
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
