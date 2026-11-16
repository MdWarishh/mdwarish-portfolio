
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  PROJECTS,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/data/projects";

import { ProjectDetailView } from "@/sections/projects/_components/project-detail-view";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://mdwarish.com"
).replace(/\/$/, "");

const SITE_NAME = "MD Warish";

function getProjectPath(slug: string) {
  return `/projects/${encodeURIComponent(slug)}`;
}

function getAbsoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

function isUsableImage(image: string | undefined) {
  if (!image) return false;

  return (
    image.startsWith("/") ||
    image.startsWith("https://") ||
    image.startsWith("http://")
  );
}

/* =============================================
   PREGENERATED PROJECT ROUTES
============================================= */

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

/* =============================================
   PER-PROJECT SEO METADATA
============================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${project.title} — Case Study`;

  const description =
    project.shortDescription ||
    `Explore ${project.title}, a software development project by MD Warish.`;

  const projectPath = getProjectPath(project.slug);

  const imageAvailable =
    project.hasRealScreenshot &&
    isUsableImage(project.image);

  const images = imageAvailable
    ? [
        {
          url: project.image,
          alt: `${project.title} — project preview`,
        },
      ]
    : undefined;

  return {
    title,
    description,

    alternates: {
      canonical: projectPath,
    },

    openGraph: {
      type: "article",
      title: `${project.title} | ${SITE_NAME}`,
      description,
      url: projectPath,
      siteName: SITE_NAME,
      locale: "en_IN",
      ...(images ? { images } : {}),
    },

    twitter: {
      card: images
        ? "summary_large_image"
        : "summary",
      title: `${project.title} | ${SITE_NAME}`,
      description,
      ...(images
        ? {
            images: [project.image],
          }
        : {}),
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* =============================================
   SAFE JSON-LD SERIALIZATION
============================================= */

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c"
  );
}

/* =============================================
   PROJECT STRUCTURED DATA
============================================= */

function ProjectStructuredData({
  project,
}: {
  project: NonNullable<
    ReturnType<typeof getProjectBySlug>
  >;
}) {
  const projectUrl = getAbsoluteUrl(
    getProjectPath(project.slug)
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${projectUrl}#breadcrumbs`,
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
            name: "Projects",
            item: getAbsoluteUrl("/projects"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: projectUrl,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${projectUrl}#case-study`,
        name: project.title,
        description:
          project.shortDescription ||
          project.fullDescription,
        url: projectUrl,
        genre: project.category,
        author: {
          "@id": `${SITE_URL}/#person`,
        },
        keywords: project.technologies.join(", "),
        about: {
          "@type": "Thing",
          name: project.category,
        },
        ...(project.liveUrl
          ? {
              subjectOf: {
                "@type": "WebPage",
                url: project.liveUrl,
              },
            }
          : {}),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(schema),
      }}
    />
  );
}

/* =============================================
   PROJECT DETAIL PAGE
============================================= */

export default async function ProjectDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } =
    getAdjacentProjects(project.slug);

  return (
    <>
      <ProjectStructuredData project={project} />

      <ProjectDetailView
        project={project}
        prevProject={prev}
        nextProject={next}
      />
    </>
  );
}
