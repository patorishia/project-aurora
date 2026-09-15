import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aurora — Coupons, Deals & Cashback",
    template: "%s | Aurora",
  },
  description:
    "Save money on every online purchase with verified coupons, exclusive deals, and cashback rewards.",
  metadataBase: new URL("https://aurora.com"),
  openGraph: {
    title: "Aurora — Coupons, Deals & Cashback",
    description:
      "Save money on every online purchase with verified coupons, exclusive deals, and cashback rewards.",
    type: "website",
    locale: "en_US",
    siteName: "Aurora",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora — Coupons, Deals & Cashback",
    description:
      "Save money on every online purchase with verified coupons, exclusive deals, and cashback rewards.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <MainLayout>{children}</MainLayout>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}