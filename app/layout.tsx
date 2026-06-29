import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner"
import { auth } from "@/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stablebricks | Real Estate and Construction",
  description: "Professional real estate sales, land sales, construction, procurement, and property services in Nigeria.",
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
     <body className="font-poppins text-gray-950 bg-gray-50">
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
