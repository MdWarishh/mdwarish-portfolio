import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import {
  Instrument_Serif,
  Manrope,
  JetBrains_Mono,
} from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { PERSONAL_INFO } from "@/data/navigation";
import { getSiteUrl } from "@/lib/utils";

// Three deliberately complementary families: editorial, UI, and technical detail.
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = getSiteUrl().replace(/\/+$/, "");
const SITE_NAME = "MD Warish";
const SITE_TITLE = "MD Warish — Full-Stack Developer & Software Engineer";
const SITE_DESCRIPTION =
  "Explore the portfolio of MD Warish, a full-stack developer building " +
  "business applications, CRM platforms, e-commerce experiences and " +
  "modern websites with Next.js, Angular, TypeScript and Node.js.";
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: `${SITE_NAME} Portfolio`,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  keywords: [
    "MD Warish",
    "MD Warish portfolio",
    "full-stack developer",
    "software engineer",
    "Next.js developer",
    "Angular developer",
    "TypeScript developer",
    "CRM development",
    "custom web applications",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: `${SITE_NAME} Portfolio`,
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MD Warish — Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

// Dark is the initial preference. next-themes owns the actual client theme.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07090D",
};

function getStructuredData() {
  const sameAs = [PERSONAL_INFO.github, PERSONAL_INFO.linkedin].filter(
    (value): value is string =>
      typeof value === "string" && /^https?:\/\//i.test(value)
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE_NAME,
        alternateName: ["Md Warish", "mdwarish"],
        url: SITE_URL,
        jobTitle: "Full-Stack Developer",
        description: SITE_DESCRIPTION,
        ...(PERSONAL_INFO.email ? { email: PERSONAL_INFO.email } : {}),
        knowsAbout: [
          "Full-stack software engineering",
          "Next.js",
          "React",
          "Angular",
          "TypeScript",
          "Node.js",
          "REST APIs",
          "PostgreSQL",
          "MongoDB",
          "CRM systems",
          "Web performance",
        ],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: `${SITE_NAME} Portfolio`,
        url: SITE_URL,
        inLanguage: "en-IN",
        description: SITE_DESCRIPTION,
        publisher: { "@id": PERSON_ID },
      },
    ],
  };
}

function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body
        id="top"
        className="flex min-h-screen flex-col bg-bg font-sans text-text antialiased"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(getStructuredData()) }}
        />

        <ThemeProvider>
         

          <ScrollProgress />
          <CustomCursor />
          <Navbar />

          <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 outline-none">
            {children}
          </main>

          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
