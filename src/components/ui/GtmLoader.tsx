"use client";

import { useEffect, useRef } from 'react';

export default function GtmLoader({ gtmId }: { gtmId: string }) {
  const injectedRef = useRef(false);

  useEffect(() => {
    function injectGtm() {
      if (!gtmId || gtmId === 'GTM-XXXXXXX' || injectedRef.current) return;
      try {
        // dataLayer init
        (window as any).dataLayer = (window as any).dataLayer || [];
        ;(window as any).dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

        // inject script only (no iframe to avoid CSP issues)
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
        script.id = 'az-gtm-script';
        document.head.appendChild(script);

        injectedRef.current = true;
      } catch (e) {
        console.warn('[GTM] Failed to inject:', e);
      }
    }

    // Inject immediately if consent already present
    try {
      const consent = typeof window !== 'undefined' ? localStorage.getItem('az_cookie_consent') : null;
      if (consent === 'true') injectGtm();
    } catch (e) {
      // ignore
    }

    // Listen for consent change event
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === true) injectGtm();
      else {
        try {
          const consent = localStorage.getItem('az_cookie_consent');
          if (consent === 'true') injectGtm();
        } catch (err) {}
      }
    };

    window.addEventListener('az_cookie_consent_changed', handler as EventListener);
    return () => window.removeEventListener('az_cookie_consent_changed', handler as EventListener);
  }, [gtmId]);

  return null;
}

