
"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

export function ScrollProgress() {
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 110,
      damping: 32,
      mass: 0.35,
      restDelta: 0.001,
    }
  );

  const progress = reducedMotion
    ? scrollYProgress
    : smoothProgress;

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed left-0 right-0 top-0
        z-[100] h-[2px]
      "
    >
      {/* Delicate track */}

      <div
        className="
          absolute inset-0
          bg-accent/10
        "
      />

      {/* Main progress fill */}

      <motion.div
        style={{
          scaleX: progress,
          transformOrigin: "left center",
        }}
        className="
          absolute inset-0
          bg-accent
          will-change-transform
        "
      />

      {/* Subtle gold highlight */}

      <motion.div
        style={{
          scaleX: progress,
          transformOrigin: "left center",
        }}
        className="
          absolute inset-0
          bg-gradient-to-r
          from-transparent
          via-transparent
          to-white/25
          will-change-transform
        "
      />
    </div>
  );
}
