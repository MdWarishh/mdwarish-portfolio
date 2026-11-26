import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/layout/JsonLd";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { CtaBand } from "@/components/sections/CtaBand";
import { PERSON } from "@/config/site";
import { getProject, PROJECTS } from "@/content/projects";
import { absoluteUrl, breadcrumbJsonLd, graph, pageMetadata } from "@/lib/seo";

type Params = { slug: string };

const CTA_TITLES = {
  "business-app": (
    <>
      Need a system like this <em>for your business?</em>
    </>
  ),
  exhibition: (
    <>
      Running an event that needs <em>a site like this?</em>
    </>
  ),
  corporate: (
    <>
      Want a website that <em>works this hard?</em>
    </>
  ),
} as const;

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const cover = project.gallery[0];
  return pageMetadata({
    title: `${project.title} — case study`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    ogType: "article",
    image: { url: cover.src, width: cover.width, height: cover.height, alt: cover.alt },
  });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
          {
            "@type": "CreativeWork",
            name: project.title,
            description: project.summary,
            url: absoluteUrl(`/projects/${project.slug}`),
            creator: { "@id": `${absoluteUrl("/")}/#person`, name: PERSON.name },
            dateModified: project.year,
            image: absoluteUrl(project.gallery[0].src),
          },
        )}
      />
      <CaseStudy project={project} />
      <CtaBand
        title={CTA_TITLES[project.category]}
        secondary={{ label: "Back to all work", href: "/projects" }}
      />
    </>
  );
}
