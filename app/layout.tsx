import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { PublicNavigations } from "@/components/PublicNavigations";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics"
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker"
import { auth } from "@/auth";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    default: "StableBricks - Nigeria's Premier Real Estate Investment Platform",
    template: "%s | StableBricks"
  },
  description: "Invest in Nigeria's most profitable real estate projects with StableBricks. High returns, low risk, transparent processes. Join thousands of successful real estate investors today.",
  keywords: [
    "real estate investment Nigeria",
    "property investment",
    "real estate crowdfunding",
    "investment opportunities Nigeria", 
    "property development",
    "real estate portfolio",
    "Nigerian real estate",
    "property investment platform",
    "real estate returns",
    "investment properties",
    "commercial real estate",
    "residential investment",
    "Lagos real estate",
    "Abuja property investment",
    "stable returns",
    "property crowdfunding Nigeria"
  ],
  authors: [{ name: "StableBricks" }],
  creator: "StableBricks",
  publisher: "StableBricks",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://stablebricks.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://stablebricks.com',
    title: "StableBricks - Nigeria's Premier Real Estate Investment Platform",
    description: "Invest in Nigeria's most profitable real estate projects with StableBricks. High returns, low risk, transparent processes.",
    siteName: 'StableBricks',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'StableBricks - Real Estate Investment Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "StableBricks - Nigeria's Premier Real Estate Investment Platform",
    description: "Invest in Nigeria's most profitable real estate projects with StableBricks. High returns, low risk, transparent processes.",
    images: ['/og-image.jpg'],
    creator: '@stablebricks',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T26C8MZ3');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
     <body className={`${inter.className} text-gray-950 bg-gray-50`}>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-T26C8MZ3"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      <GoogleAnalytics />
      <Providers session={session}>
        {/* <PublicNavigations /> */}
        <AnalyticsTracker />
        {children}
        <Analytics />
        <Toaster />
      </Providers>
      </body>
    </html>
  );
}
