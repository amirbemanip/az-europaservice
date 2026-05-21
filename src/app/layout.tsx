import React from 'react';
import { Inter, Outfit, Vazirmatn } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const vazir = Vazirmatn({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-vazir',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning className={cn('font-sans antialiased min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e]', inter.variable, outfit.variable, vazir.variable)}>
        {children}
      </body>
    </html>
  );
}
