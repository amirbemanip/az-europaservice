import React from 'react';
import { cn } from '@/lib/utils';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body className={cn('font-sans antialiased min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e]')}>
        {children}
      </body>
    </html>
  );
}
