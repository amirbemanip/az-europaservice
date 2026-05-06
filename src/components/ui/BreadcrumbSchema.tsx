"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  locale: string;
}

export function BreadcrumbSchema({ items, locale }: BreadcrumbProps) {
  const isRTL = locale === 'fa' || locale === 'ar';
  const baseUrl = 'https://az-europaservice.de';

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/${locale}`
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `${baseUrl}${item.href}`
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] uppercase py-6 ${isRTL ? 'flex-row-reverse' : ''}`} aria-label="Breadcrumb">
        <Link href={`/${locale}`} className="text-[#7c839b] hover:text-[#fed01b] transition-colors flex items-center gap-1.5">
          <Home className="w-3 h-3" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight className={`w-3 h-3 text-[#e0e3e5] ${isRTL ? 'rotate-180' : ''}`} />
            <Link 
              href={item.href}
              className={`transition-colors truncate max-w-[150px] ${idx === items.length - 1 ? 'text-[#fed01b] font-black' : 'text-[#7c839b] hover:text-white'}`}
            >
              {item.label}
            </Link>
          </React.Fragment>
        ))}
      </nav>
    </>
  );
}
