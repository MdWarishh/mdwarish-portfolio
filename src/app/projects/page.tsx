
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ProjectsCatalog } from "@/sections/projects/_components/projects-catalog";

const pageTitle = "Projects & Case Studies";

const pageDescription =
  "Explore real-world projects by MD Warish, including full-stack CRM platforms, inventory management systems, e-commerce applications, SaaS products, and international B2B exhibition websites.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,

  alternates: {
    canonical: "/projects",
  },

  openGraph: {
    type: "website",
    title: `${pageTitle} | MD Warish`,
    description: pageDescription,
    url: "/projects",
    siteName: "MD Warish",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title: `${pageTitle} | MD Warish`,
    description: pageDescription,
  },

  robots: {
    index: true,
    follow: true,
  },
};

function CatalogLoading() {
  return (
    <div
      role="status"
      aria-label="Loading projects"
      className="container-x min-h-[65vh] py-20 sm:py-28"
    >
      <div className="h-3 w-32 animate-pulse bg-bg-soft" />

      <div className="mt-8 h-14 w-full max-w-xl animate-pulse bg-bg-soft sm:h-20" />

      <div className="mt-5 h-4 w-full max-w-md animate-pulse bg-bg-soft" />

      <div className="mt-14 aspect-[16/8] w-full max-w-5xl animate-pulse bg-bg-soft" />

      <span className="sr-only">
        Loading the project archive
      </span>
    </div>
  );
}

function ExperienceTransition() {
  return (
    <section
      aria-labelledby="experience-transition-heading"
      className="relative overflow-hidden border-t border-border bg-bg"
    >
      <div className="container-x py-14 sm:py-20">
        <Link
          href="/experience"
          className="
            group grid items-end gap-7
            lg:grid-cols-12
            lg:gap-12
          "
        >
          <div className="lg:col-span-9">
            <p className="label-mono">
              Continue exploring
            </p>

            <h2
              id="experience-transition-heading"
              className="
                mt-4 max-w-3xl
                font-display
                text-[clamp(2.25rem,4.4vw,4.3rem)]
                font-normal
                leading-[1.13]
                tracking-[-0.03em]
                text-ink
                transition-colors duration-500
                group-hover:text-accent
              "
            >
              The experience
              <span className="italic text-accent">
                {" "}behind the work.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-[1.85] text-text-muted sm:text-[15px]">
              Explore my professional journey,
              responsibilities, and experience
              delivering production-ready software.
            </p>
          </div>

          <div className="lg:col-span-3 lg:justify-self-end">
            <span
              className="
                inline-flex h-14 w-14
                items-center justify-center
                border border-border-strong
                text-ink
                transition-all duration-500
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

export default function ProjectsPage() {
  return (
    <main id="projects-page">
      <Suspense fallback={<CatalogLoading />}>
        <ProjectsCatalog />
      </Suspense>

      <ExperienceTransition />
    </main>
  );
}
