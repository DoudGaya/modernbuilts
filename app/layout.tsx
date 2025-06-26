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
  title: "Stablebricks",
  description: "The Nigeria's Real Estate Investment Company. We are stable, We are Reliable",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  
  return (
    <html lang="en" suppressHydrationWarning>
     <body className={`${inter.className} text-gray-950 bg-gray-50`}>
      <GoogleAnalytics />
      <Providers session={session}>
        <PublicNavigations />
        <AnalyticsTracker />
        {children}
        <Footer />
        <Analytics />
        <Toaster />
      </Providers>
      </body>
    </html>
  );
}
