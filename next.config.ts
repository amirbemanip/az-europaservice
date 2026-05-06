import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.178.36', 'localhost', '127.0.0.1'],
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    const legacyBlogMap = [
      { id: '1', slug: 'bueroreinigung-standards-franken-iso-9001' },
      { id: '2', slug: 'professionelles-gebaeudemanagement-bayern-leitfaden' },
      { id: '3', slug: 'oekologische-gebaeudereinigung-gesundheit-arbeitsplatz' },
      { id: '4', slug: 'winterdienst-bayern-pflichten-haftung' },
    ];

    const localePattern = '(en|fa|ar|ru|uk)';

    const seoRedirects = [
      { source: '/gebaeudereinigung-erlangen', destination: '/de/erlangen/reinigung', permanent: true },
      { source: '/gebaeudereinigung-nuernberg', destination: '/de/nuernberg/reinigung', permanent: true },
      { source: '/gebaeudereinigung-bamberg', destination: '/de/bamberg/reinigung', permanent: true },
      { source: '/hausmeisterservice-erlangen', destination: '/de/erlangen/hausmeisterservice', permanent: true },
      { source: '/hausmeisterservice-nuernberg', destination: '/de/nuernberg/hausmeisterservice', permanent: true },
      { source: '/hausmeisterservice-bamberg', destination: '/de/bamberg/hausmeisterservice', permanent: true },
    ];

    return [
      ...seoRedirects,
      ...legacyBlogMap.flatMap(({ id, slug }) => [
        {
          source: `/blog/${id}`,
          destination: `/blog/${slug}`,
          permanent: true,
        },
        {
          source: `/:locale${localePattern}/blog/${id}`,
          destination: `/:locale/blog/${slug}`,
          permanent: true,
        },
      ]),
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
