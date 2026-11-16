
"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "select",
  "summary",
  "[role='button']",
  "[role='link']",
  "[data-cursor='interactive']",
].join(", ");

const HIDE_SELECTOR = [
  "input",
  "textarea",
  "[contenteditable='true']",
  "[data-cursor='hidden']",
].join(", ");

export function CustomCursor() {
  const reducedMotion = useReducedMotion();

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, {
    stiffness: 190,
    damping: 24,
    mass: 0.55,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 190,
    damping: 24,
    mass: 0.55,
  });

  /* Detect supported desktop pointer */

  useEffect(() => {
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1024px)"
    );

    const update = () => {
      const allowed =
        media.matches && !reducedMotion;

      setEnabled(allowed);

      if (!allowed) {
        setVisible(false);
        setHovered(false);
        setPressed(false);
      }
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, [reducedMotion]);

  /* Track mouse and interactive elements */

  useEffect(() => {
    if (!enabled) return;

    const updateTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        setHovered(false);
        return;
      }

      const shouldHide = Boolean(
        target.closest(HIDE_SELECTOR)
      );

      const isInteractive = Boolean(
        target.closest(INTERACTIVE_SELECTOR)
      );

      setVisible(!shouldHide);
      setHovered(isInteractive && !shouldHide);
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      mouseX.set(event.clientX);
      mouseY.set(event.clientY);

      updateTarget(event.target);
    };

    const handlePointerOver = (
      event: PointerEvent
    ) => {
      if (event.pointerType !== "mouse") return;
      updateTarget(event.target);
    };

    const handlePointerOut = (
      event: PointerEvent
    ) => {
      if (event.pointerType !== "mouse") return;

      if (!event.relatedTarget) {
        setVisible(false);
        setHovered(false);
        setPressed(false);
      }
    };

    const handleDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        setPressed(true);
      }
    };

    const handleUp = () => {
      setPressed(false);
    };

    const handleBlur = () => {
      setVisible(false);
      setPressed(false);
    };

    window.addEventListener(
      "pointermove",
      handleMove,
      { passive: true }
    );

    window.addEventListener(
      "pointerover",
      handlePointerOver,
      { passive: true }
    );

    window.addEventListener(
      "pointerout",
      handlePointerOut,
      { passive: true }
    );

    window.addEventListener(
      "pointerdown",
      handleDown,
      { passive: true }
    );

    window.addEventListener(
      "pointerup",
      handleUp,
      { passive: true }
    );

    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener(
        "pointermove",
        handleMove
      );

      window.removeEventListener(
        "pointerover",
        handlePointerOver
      );

      window.removeEventListener(
        "pointerout",
        handlePointerOut
      );

      window.removeEventListener(
        "pointerdown",
        handleDown
      );

      window.removeEventListener(
        "pointerup",
        handleUp
      );

      window.removeEventListener(
        "blur",
        handleBlur
      );
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed inset-0 z-[90]
        hidden overflow-hidden
        lg:block
      "
    >
      {/* Smooth follower */}

      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute left-0 top-0"
      >
        <motion.div
          style={{
            transform: "translate(-50%, -50%)",
          }}
          initial={false}
          animate={{
            width: pressed
              ? 28
              : hovered
                ? 43
                : 25,

            height: pressed
              ? 28
              : hovered
                ? 43
                : 25,

            opacity: visible ? 1 : 0,

            borderColor: hovered
              ? "var(--accent)"
              : "var(--accent)",
          }}
          transition={{
            width: {
              duration: 0.38,
              ease: [0.22, 1, 0.36, 1],
            },
            height: {
              duration: 0.38,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
              duration: 0.22,
            },
          }}
          className="
            relative flex items-center
            justify-center rounded-full
            border border-accent/65
            bg-transparent
          "
        >
          {/* Four subtle precision marks on hover */}

          <motion.span
            initial={false}
            animate={{
              opacity: hovered ? 0.8 : 0,
              scale: hovered ? 1 : 0.75,
            }}
            transition={{ duration: 0.3 }}
            className="
              absolute -top-[4px] left-1/2
              h-[5px] w-px
              -translate-x-1/2
              bg-accent
            "
          />

          <motion.span
            initial={false}
            animate={{
              opacity: hovered ? 0.8 : 0,
              scale: hovered ? 1 : 0.75,
            }}
            transition={{ duration: 0.3 }}
            className="
              absolute -bottom-[4px] left-1/2
              h-[5px] w-px
              -translate-x-1/2
              bg-accent
            "
          />

          <motion.span
            initial={false}
            animate={{
              opacity: hovered ? 0.8 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="
              absolute -left-[4px] top-1/2
              h-px w-[5px]
              -translate-y-1/2
              bg-accent
            "
          />

          <motion.span
            initial={false}
            animate={{
              opacity: hovered ? 0.8 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="
              absolute -right-[4px] top-1/2
              h-px w-[5px]
              -translate-y-1/2
              bg-accent
            "
          />
        </motion.div>
      </motion.div>

      {/* Precise center dot follows pointer directly */}

      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        className="absolute left-0 top-0"
      >
        <motion.div
          style={{
            transform: "translate(-50%, -50%)",
          }}
          initial={false}
          animate={{
            width: hovered ? 4 : 5,
            height: hovered ? 4 : 5,
            opacity: visible ? 1 : 0,
            scale: pressed ? 0.6 : 1,
          }}
          transition={{
            duration: 0.22,
          }}
          className="
            rounded-full bg-accent
            shadow-[0_0_10px_var(--accent-soft)]
          "
        />
      </motion.div>
    </div>
  );
}
