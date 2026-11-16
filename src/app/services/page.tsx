import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ServicesGrid } from "@/sections/services/_components/services-grid";
import { SERVICE_ITEMS } from "@/data/services";

const title = "Full-Stack Development & Business Software Services";
const description =
  "Custom web applications, CRM dashboards, business websites, e-commerce, API integrations, workflow automation and ongoing maintenance by MD Warish.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    title: `${title} | MD Warish`,
    description,
    url: "/services",
    siteName: "MD Warish",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: `${title} | MD Warish`,
    description,
  },
};

// Use the same production origin configured in your root layout.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://mdwarish.com")
  .replace(/\/$/, "");

function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/services#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_URL}/services`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/services#services`,
        name: "Software engineering services by MD Warish",
        itemListElement: SERVICE_ITEMS.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            url: `${SITE_URL}/services#${service.id}`,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function ContactTransition() {
  return (
    <section aria-labelledby="services-contact-heading" className="border-t border-border bg-bg-soft">
      <div className="container-x py-16 sm:py-20">
        <Link href="/contact" className="group grid items-end gap-7 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-9">
            <p className="label-mono">Next step / Let’s talk</p>
            <h2
              id="services-contact-heading"
              className="mt-5 max-w-[820px] font-display text-[clamp(2.3rem,4.6vw,4.7rem)] font-normal leading-[1.11] tracking-[-0.035em] text-ink"
            >
              Have something in mind? <em className="text-accent">Let’s build it well.</em>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-text-muted">
              Share your goals, existing workflow and timeline. We can discuss an approach that fits your project.
            </p>
          </div>
          <div className="lg:col-span-3 lg:justify-self-end">
            <span className="inline-flex min-h-12 items-center gap-4 border-b border-accent pb-2 text-sm font-semibold text-ink transition-colors group-hover:text-accent">
              Start a conversation
              <ArrowUpRight aria-hidden="true" className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <StructuredData />
      <ServicesGrid />
      <ContactTransition />
    </>
  );
}
