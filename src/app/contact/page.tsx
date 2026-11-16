
import type { Metadata } from "next";
import { ContactSection } from "@/sections/contact/_components/contact-section";

const description =
  "Contact MD Warish about custom web applications, CRM platforms, e-commerce, business websites, API integrations, and software engineering opportunities.";

export const metadata: Metadata = {
  title: "Contact MD Warish | Let's Build Something Useful",
  description,

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    type: "website",
    title: "Contact MD Warish — Full-Stack Software Engineer",
    description,
    url: "/contact",
    siteName: "MD Warish",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title: "Contact MD Warish",
    description,
  },
};

export default function ContactPage() {
  return <ContactSection />;
}
