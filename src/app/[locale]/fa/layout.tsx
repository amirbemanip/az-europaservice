import React from 'react';

export default function PersianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" lang="fa" className="font-serif">
      {children}
    </div>
  );
}
