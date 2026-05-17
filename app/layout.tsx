import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import { PublicNavigations } from "@/components/PublicNavigations";
import { Footer } from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner"
import { auth } from "@/auth";
// import '/../public/fonts.css'
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
     <SessionProvider session={session}>
     <body className={`${inter.className} text-gray-950 bg-gray-50`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
      </ThemeProvider>
        <Toaster />
      </body>
     </SessionProvider>
    </html>
  );
}
