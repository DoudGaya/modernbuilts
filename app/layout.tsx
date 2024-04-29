import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { PublicNavigations } from "@/components/PublicNavigations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MZEE Contruction Services",
  description: "Nigerian Top Rated construction company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <PublicNavigations />
        {children}
      </ThemeProvider>
      </body>
    </html>
  );
}