'use client'

import Script from 'next/script'
import { GA_TRACKING_ID, GA_ENABLED } from '@/lib/analytics'

export const GoogleAnalytics = () => {
  if (!GA_ENABLED) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  )
}

// Utility functions for tracking events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!GA_ENABLED || typeof window === 'undefined' || !window.gtag) {
    return
  }
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

export const trackPageView = (url: string) => {
  if (!GA_ENABLED || typeof window === 'undefined' || !window.gtag) {
    return
  }
  
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}
