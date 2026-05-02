import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Protect API routes from being crawled
    },
    sitemap: 'https://az-europaservice.de/sitemap.xml',
  };
}
