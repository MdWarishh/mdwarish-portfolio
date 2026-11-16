
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  LockKeyhole,
} from "lucide-react";

import type { Project } from "@/types";
import { ProjectBrowserFallback } from "@/components/ui/svg-illustrations";

const EASE = [0.22, 1, 0.36, 1] as const;

type ProjectCardProps = {
  project: Project;
  index?: number;
  priority?: boolean;
};

export function ProjectCard({
  project,
  index = 0,
  priority = false,
}: ProjectCardProps) {
  const reducedMotion = useReducedMotion();

  const href = `/projects/${project.slug}`;
  const hasScreenshot =
    Boolean(project.hasRealScreenshot) &&
    Boolean(project.image);

  const technologies = project.technologies.slice(0, 3);

  return (
    <motion.article
      initial={
        reducedMotion
          ? false
          : { opacity: 0, y: 24 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion
          ? 0
          : Math.min(index * 0.055, 0.22),
        ease: EASE,
      }}
      className="
        group relative flex min-w-0
        flex-col
      "
    >
      {/* ==================================
          PROJECT IMAGE
      ================================== */}

      <Link
        href={href}
        aria-label={`Explore ${project.title} case study`}
        className="
          relative block aspect-[16/10]
          w-full overflow-hidden
          border border-border
          bg-bg-soft
          outline-offset-4
          focus-visible:outline-2
          focus-visible:outline-accent
        "
      >
        <div
          className="
            relative h-full w-full
            overflow-hidden
            transition-transform
            duration-[900ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            motion-safe:group-hover:scale-[1.035]
          "
        >
          {hasScreenshot ? (
            <Image
              src={project.image}
              alt={`${project.title} interface preview`}
              fill
              priority={priority}
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                33vw
              "
              className="
                object-cover object-top
              "
            />
          ) : (
            <ProjectBrowserFallback
              project={project}
              variant="card"
            />
          )}
        </div>

        {/* Subtle bottom fade */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-x-0 bottom-0
            h-1/4
            bg-gradient-to-t
            from-black/10 to-transparent
          "
        />

        {/* Minimal corner action */}

        <span
          aria-hidden="true"
          className="
            absolute right-4 top-4
            flex h-11 w-11
            items-center justify-center
            border border-border/70
            bg-bg/95 text-ink
            backdrop-blur-md
            transition-[background-color,color,transform,border-color]
            duration-500
            group-hover:-translate-y-1
            group-hover:translate-x-1
            group-hover:border-accent
            group-hover:bg-accent
            group-hover:text-[color:var(--on-accent)]
          "
        >
          <ArrowUpRight
            className="h-[19px] w-[19px]"
            strokeWidth={1.7}
          />
        </span>

        {/* Authentication state */}

        {project.loginRequired && (
          <span
            className="
              absolute bottom-4 left-4
              inline-flex items-center
              gap-2 bg-bg/95
              px-3 py-2
              font-mono text-[10px]
              text-text-muted
              backdrop-blur-md
            "
          >
            <LockKeyhole
              aria-hidden="true"
              className="h-3 w-3 text-accent"
            />
            Protected dashboard
          </span>
        )}
      </Link>

      {/* ==================================
          CONTENT
      ================================== */}

      <div className="flex flex-1 flex-col border-b border-border pb-6 pt-6">
        <p
          className="
            font-mono text-[10px]
            font-medium uppercase
            tracking-[0.14em]
            text-accent
          "
        >
          {project.category}
        </p>

        <h3
          className="
            mt-3 font-display
            text-[clamp(1.75rem,2.4vw,2.35rem)]
            font-normal
            leading-[1.12]
            tracking-[-0.025em]
          "
        >
          <Link
            href={href}
            className="
              text-ink
              outline-offset-4
              transition-colors duration-300
              hover:text-accent
              group-hover:text-accent
            "
          >
            {project.title}
          </Link>
        </h3>

        <p
          className="
            mt-3 line-clamp-3
            max-w-[520px]
            text-[13px] leading-[1.85]
            text-text-muted
            sm:text-[14px]
          "
        >
          {project.shortDescription}
        </p>

        {/* Technologies */}

        {technologies.length > 0 && (
          <ul
            aria-label="Technologies used"
            className="
              mt-5 flex flex-wrap
              items-center gap-x-4 gap-y-2
            "
          >
            {technologies.map((tech) => (
              <li
                key={tech}
                className="
                  font-mono text-[10px]
                  leading-relaxed text-text-muted
                "
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {/* ==================================
            ACTIONS
        ================================== */}

        <div
          className="
            mt-auto flex flex-wrap
            items-center justify-between
            gap-4 pt-7
          "
        >
          <Link
            href={href}
            className="
              group/action inline-flex
              min-h-10 items-center gap-2
              border-b border-accent
              pb-1 text-[12px]
              font-semibold text-ink
              transition-colors duration-300
              hover:text-accent
            "
          >
            View case study

            <ArrowUpRight
              aria-hidden="true"
              className="
                h-4 w-4
                transition-transform duration-300
                group-hover/action:-translate-y-0.5
                group-hover/action:translate-x-0.5
              "
            />
          </Link>

          <div className="flex items-center gap-3">
            {project.frontendGithub && (
              <a
                href={project.frontendGithub}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} frontend repository (opens in new tab)`}
                title="Frontend repository"
                className="
                  inline-flex h-10 w-10
                  items-center justify-center
                  text-text-muted
                  transition-colors duration-300
                  hover:text-accent
                  focus-visible:outline-offset-2
                "
              >
                <Github
                  className="h-[17px] w-[17px]"
                  strokeWidth={1.6}
                />
              </a>
            )}

            {project.backendGithub && (
              <a
                href={project.backendGithub}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} backend repository (opens in new tab)`}
                title="Backend repository"
                className="
                  inline-flex h-10 w-10
                  items-center justify-center
                  text-text-muted
                  transition-colors duration-300
                  hover:text-accent
                "
              >
                <Github
                  className="h-[17px] w-[17px]"
                  strokeWidth={1.6}
                />
                <span className="sr-only">
                  Backend
                </span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title} live website (opens in new tab)`}
                title="Live website"
                className="
                  inline-flex h-10 w-10
                  items-center justify-center
                  text-accent
                  transition-transform duration-300
                  hover:-translate-y-0.5
                  hover:translate-x-0.5
                "
              >
                <ExternalLink
                  className="h-[17px] w-[17px]"
                  strokeWidth={1.7}
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
