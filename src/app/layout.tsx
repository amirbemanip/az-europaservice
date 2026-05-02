import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is a shell. 
  // The actual HTML structure is defined in [locale]/layout.tsx
  return children;
}
