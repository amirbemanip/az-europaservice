import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
const defaultLocale = 'de';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Force Lowercase URLs
  if (pathname !== pathname.toLowerCase()) {
    return NextResponse.redirect(
      new URL(pathname.toLowerCase() + request.nextUrl.search, request.url),
      301
    );
  }

  // 2. Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Redirect to default locale
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url),
      301
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and public files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
