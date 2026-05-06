import { MetadataRoute } from 'next';
import { cities, macroServices, microServices } from '@/data/db';
import { blogPosts } from '@/data/blog';

const baseUrl = 'https://az-europaservice.de';
const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
const staticPaths = ['', '/ueber-uns', '/leistungen', '/kontakt', '/impressum', '/datenschutz', '/agb', '/karriere', '/blog'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // 1. Static Pages for all Locales
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

  // 2. Service Overview Pages
  [...macroServices, ...microServices].forEach((service) => {
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

  // Add city-service pages (Macro)
  cities.forEach(city => {
    macroServices.forEach(macro => {
      locales.forEach(locale => {
        const isDefault = locale === 'de';
        const path = isDefault ? `/${city.slug}/${macro.slug}` : `/${locale}/${city.slug}/${macro.slug}`;
        
        routes.push({
          url: `${baseUrl}${path}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    });
  });

  // 3. City Hubs and Service Matrix Pages
  cities.forEach((city) => {
    locales.forEach((locale) => {
      const cityBase = locale === 'de'
        ? `${baseUrl}/${city.slug}`
        : `${baseUrl}/${locale}/${city.slug}`;

      // City Main Page
      routes.push({
        url: cityBase,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });

      // Removed legacy City + Service Matrix Pages
    });
  });


  // 4. Blog Posts
  blogPosts.forEach((post) => {
    locales.forEach((locale) => {
      const url = locale === 'de'
        ? `${baseUrl}/blog/${post.slug}`
        : `${baseUrl}/${locale}/blog/${post.slug}`;
      routes.push({
        url,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return routes;
}
