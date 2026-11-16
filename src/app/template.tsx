
"use client";

import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Template({
  children,
}: {
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 12,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        opacity: {
          duration: reducedMotion ? 0 : 0.45,
          ease: EASE,
        },
        y: {
          duration: reducedMotion ? 0 : 0.65,
          ease: EASE,
        },
      }}
      className="relative min-h-full"
    >
      {children}
    </motion.div>
  );
}
