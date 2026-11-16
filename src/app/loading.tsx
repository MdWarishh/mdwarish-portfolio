
/* ==========================================
   REUSABLE SKELETON ELEMENT
========================================== */

function SkeletonLine({
  width,
  height = "h-3",
  className = "",
}: {
  width: string;
  height?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`
        ${width}
        ${height}
        ${className}
        bg-border/50
        motion-safe:animate-pulse
      `}
    />
  );
}

/* ==========================================
   EDITORIAL LOADING UI
========================================== */

export default function Loading() {
  return (
    <section
      role="status"
      aria-label="Loading page"
      aria-live="polite"
      aria-busy="true"
      className="
        relative min-h-[65vh]
        overflow-hidden bg-bg
      "
    >
      <div className="container-x py-16 sm:py-24 lg:py-28">
        {/* Label skeleton */}

        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-accent/60"
          />

          <SkeletonLine
            width="w-28"
            height="h-[9px]"
          />
        </div>

        {/* Main headline skeleton */}

        <div className="mt-10 max-w-[800px] space-y-4">
          <SkeletonLine
            width="w-[90%]"
            height="h-[50px] sm:h-[72px]"
          />

          <SkeletonLine
            width="w-[64%]"
            height="h-[50px] sm:h-[72px]"
          />
        </div>

        {/* Intro text skeleton */}

        <div className="mt-9 max-w-[480px] space-y-3">
          <SkeletonLine
            width="w-full"
            height="h-3"
          />

          <SkeletonLine
            width="w-[94%]"
            height="h-3"
          />

          <SkeletonLine
            width="w-[68%]"
            height="h-3"
          />
        </div>

        {/* Minimal loading indicator */}

        <div className="mt-12 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="
              relative block h-[6px] w-[6px]
              bg-accent
              motion-safe:animate-pulse
            "
          />

          <span
            className="
              font-mono text-[10px]
              uppercase tracking-[0.16em]
              text-text-muted
            "
          >
            Loading experience
          </span>
        </div>

        {/* Elegant content separator */}

        <div className="mt-16 border-t border-border pt-10 sm:mt-20">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SkeletonLine
                width="w-[75%]"
                height="h-8"
              />

              <div className="mt-6 space-y-3">
                <SkeletonLine width="w-full" />
                <SkeletonLine width="w-[85%]" />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                aria-hidden="true"
                className="
                  aspect-[16/8]
                  w-full bg-border/30
                  motion-safe:animate-pulse
                "
              />
            </div>
          </div>
        </div>

        <span className="sr-only">
          Please wait while the page content loads.
        </span>
      </div>
    </section>
  );
}
