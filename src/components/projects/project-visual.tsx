import Image from "next/image";
import type { Project } from "@/types";
import { ProjectBrowserFallback } from "@/components/ui/svg-illustrations";

/** Reusable visual; doesn't pretend an illustration is a product screenshot. */
export function ProjectVisual({
  project,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 70vw",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  const isScreenshot = Boolean(project.hasRealScreenshot && project.image);

  return (
    <div className="relative h-full w-full overflow-hidden bg-bg-soft">
      {isScreenshot ? (
        <Image
          src={project.image}
          alt={`${project.title} — actual interface screenshot`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.025]"
        />
      ) : (
        <div className="h-full w-full [&>svg]:h-full [&>svg]:w-full">
          <ProjectBrowserFallback project={project} variant="detail" />
        </div>
      )}
    </div>
  );
}
