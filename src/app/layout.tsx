import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { business } from "@/content/business";
import { isPreview, siteUrl } from "@/lib/site";

// Fonts are self-hosted from npm packages (OFL-1.1), so no request goes to Google Fonts.
// Display font: "block" (not "swap") because Anton is much narrower than any fallback.
// Swapping caused headings to re-wrap and the page to jump (CLS 0.11 measured on the live site).
// The file is small and preloaded, so the block period is brief.
const anton = localFont({
  src: "../../node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2",
  variable: "--font-anton",
  display: "block",
  weight: "400",
  adjustFontFallback: false,
});

const workSans = localFont({
  src: [
    { path: "../../node_modules/@fontsource-variable/work-sans/files/work-sans-latin-wght-normal.woff2", style: "normal" },
    { path: "../../node_modules/@fontsource-variable/work-sans/files/work-sans-latin-wght-italic.woff2", style: "italic" },
  ],
  variable: "--font-work-sans",
  display: "swap",
  weight: "100 900",
});

const description =
  "Souse, BBQ ribs and soul food takeout from Souseman Larry in Opa-locka, Miami. As featured on Netflix’s Street Food: USA. 4.7★ from 108 Google reviews. Order online or call (786) 617-6472.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | Souse & Soul Food in Opa-locka, Miami`,
    template: `%s | ${business.shortName}`,
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: business.name,
    title: `${business.name} | Souse & Soul Food in Opa-locka, Miami`,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1c1510",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${workSans.variable} antialiased`}>
      <body className="min-h-screen bg-cream text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-mustard focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
