import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { PublicNavigations } from "@/components/PublicNavigations";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"
import { auth } from "@/auth";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Stable Bricks",
  description: "The Nigeria's Real Estate Company. We are stable, We are Reliable",
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
      <Providers session={session}>
        {children}
        <Analytics />
        <Toaster />
      </Providers>
      </body>
    </html>
  );
}
