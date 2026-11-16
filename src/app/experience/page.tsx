
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ExperienceTimeline } from "@/sections/experience/_components/experience-timeline";

const title = "Professional Experience";
const description =
  "Explore the professional software engineering experience of MD Warish at Futurex Trade Fair & Events Pvt. Ltd. and NodalXPoint, including full-stack web applications, B2B websites, integrations and production deployment.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/experience",
  },
  openGraph: {
    type: "profile",
    title: `${title} | MD Warish`,
    description,
    url: "/experience",
    siteName: "MD Warish",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: `${title} | MD Warish`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

function ServicesTransition() {
  return (
    <section
      aria-labelledby="services-transition-title"
      className="border-t border-border bg-bg"
    >
      <div className="container-x py-14 sm:py-20">
        <Link
          href="/services"
          className="group grid items-end gap-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-9">
            <p className="label-mono">
              Continue exploring
            </p>

            <h2
              id="services-transition-title"
              className="
                mt-4 max-w-[760px] font-display
                text-[clamp(2.2rem,4.5vw,4.4rem)]
                font-normal leading-[1.12]
                tracking-[-0.03em] text-ink
                transition-colors duration-500
                group-hover:text-accent
              "
            >
              From experience to{" "}
              <em className="text-accent">
                execution.
              </em>
            </h2>

            <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-text-muted">
              Explore how I help businesses build
              custom applications, CRM systems,
              e-commerce platforms and dependable
              web experiences.
            </p>
          </div>

          <div className="lg:col-span-3 lg:justify-self-end">
            <span
              className="
                flex h-14 w-14 items-center
                justify-center border border-border
                text-ink transition-all duration-500
                group-hover:-translate-y-1
                group-hover:translate-x-1
                group-hover:border-accent
                group-hover:bg-accent
                group-hover:text-[color:var(--on-accent)]
              "
            >
              <ArrowUpRight
                aria-hidden="true"
                className="h-6 w-6"
                strokeWidth={1.5}
              />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default function ExperiencePage() {
  return (
    <>
      <ExperienceTimeline />
      <ServicesTransition />
    </>
  );
}
