// TypeScript: add gtag to window
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
// Google Analytics 4 (GA4) utility for Next.js
// Uses NEXT_PUBLIC_GA_MEASUREMENT_ID from environment variables
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Track a pageview
export function pageview(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
    });
  }
}

// Track a custom event
export function gaEvent({ action, params }: { action: string; params?: Record<string, any> }) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
}
