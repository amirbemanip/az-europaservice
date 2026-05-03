import { MetadataRoute } from 'next';
import { cities, services } from '@/data/db';

const baseUrl = 'https://az-europaservice.de';
const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
const staticPaths = ['', '/ueber-uns', '/leistungen', '/kontakt', '/impressum', '/datenschutz', '/agb', '/karriere', '/blog'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    staticPaths.forEach((path) => {
      const url = locale === 'de' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;
      routes.push({
        url,
        lastModified: new Date(),
        changeFrequency: path === '/blog' ? 'weekly' : path === '' ? 'weekly' : path === '/leistungen' ? 'monthly' : path === '/karriere' ? 'monthly' : 'yearly',
        priority: path === '' ? 1.0 : path === '/leistungen' ? 0.9 : path === '/blog' ? 0.6 : 0.7,
      });
    });
  });

  // Add Service Overviews
  services.forEach((service) => {
    locales.forEach((locale) => {
      const url = locale === 'de'
        ? `${baseUrl}/leistungen/${service.slug}`
        : `${baseUrl}/${locale}/leistungen/${service.slug}`;
      routes.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  // Add City Hubs and Service Matrix Pages
  cities.forEach((city) => {
    locales.forEach((locale) => {
      const cityBase = locale === 'de'
        ? `${baseUrl}/${city.slug}`
        : `${baseUrl}/${locale}/${city.slug}`;

      routes.push({
        url: cityBase,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });

      services.forEach((service) => {
        const url = locale === 'de'
          ? `${cityBase}/${service.slug}`
          : `${cityBase}/${service.slug}`;
        routes.push({
          url,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    });
  });

  return routes;
}
