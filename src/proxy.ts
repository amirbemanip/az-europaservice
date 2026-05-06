import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
const defaultLocale = 'de';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets and internal paths
  if (
    pathname.includes('.') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 2. Force Lowercase URLs (SEO Best Practice)
  if (pathname !== pathname.toLowerCase()) {
    return NextResponse.redirect(
      new URL(pathname.toLowerCase() + request.nextUrl.search, request.url),
      301
    );
  }

  // 3. Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Detect preferred language from browser
    const acceptLanguage = request.headers.get('accept-language');
    let targetLocale = defaultLocale;

    if (acceptLanguage) {
      // Basic detection: check if any of our supported locales are in the header
      const preferredLocale = locales.find(locale => 
        acceptLanguage.toLowerCase().includes(locale)
      );
      if (preferredLocale) {
        targetLocale = preferredLocale;
      }
    }

    // Redirect to locale-prefixed URLs for all languages.
    return NextResponse.redirect(new URL(`/${targetLocale}${pathname}`, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply to all paths except those with dots (files) or specific excluded folders
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
