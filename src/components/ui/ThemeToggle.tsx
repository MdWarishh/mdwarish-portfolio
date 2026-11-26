"use client";

import { useEffect, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/Icons";
import {
  applyTheme,
  getSavedTheme,
  readHtmlAttribute,
  subscribeHtmlAttribute,
  systemTheme,
  type Theme,
} from "@/lib/preferences";

const subscribe = (cb: () => void) => subscribeHtmlAttribute("data-theme", cb);
const getSnapshot = () => readHtmlAttribute("data-theme") as Theme | null;
const getServerSnapshot = () => null;

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Follow OS changes only while the visitor has not made an explicit choice.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!getSavedTheme()) applyTheme(systemTheme(), false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = theme ? `Switch to ${next} theme` : "Toggle colour theme";

  return (
    <button
      type="button"
      className="icon-btn theme-btn"
      onClick={() => applyTheme(next)}
      aria-label={label}
      title={label}
      data-testid="theme-toggle"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
