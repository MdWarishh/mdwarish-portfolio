import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { JsonLd } from "@/components/layout/JsonLd";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import { PERSON, SITE, SITE_URL } from "@/config/site";
import { INTRO_SCRIPT } from "@/lib/intro";
import { PREFERENCES_SCRIPT } from "@/lib/preferences";
import { graph, personJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

// Self-hosted, Latin-subset fonts (≈80 KB total). No request to Google at runtime or build time.
const serif = localFont({
  src: [
    { path: "./fonts/InstrumentSerif-Regular.woff", weight: "400", style: "normal" },
    { path: "./fonts/InstrumentSerif-Italic.woff", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
});

const sans = localFont({
  src: "./fonts/Manrope-Variable.woff",
  weight: "200 800",
  variable: "--font-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSON.name} — ${PERSON.title} in Delhi NCR`,
    template: `%s — ${PERSON.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE.name,
    locale: SITE.locale,
    title: `${PERSON.name} — ${PERSON.title}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSON.name} — ${PERSON.title}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    // the --paper tokens in globals.css
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0e" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${serif.variable} ${sans.variable}`}
      data-theme="light"
      data-motion="full"
      suppressHydrationWarning
    >
      <head>
        {/* Applies saved/OS theme and motion before first paint. Must stay first in <head>. */}
        <script dangerouslySetInnerHTML={{ __html: PREFERENCES_SCRIPT }} />
        {/* First visit in a browser session only: sets html[data-intro] before paint (see lib/intro.ts). */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>
        <IntroLoader />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="paper-grid" aria-hidden />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MotionRuntime />
        <JsonLd data={graph(personJsonLd(), websiteJsonLd())} />
      </body>
    </html>
  );
}
