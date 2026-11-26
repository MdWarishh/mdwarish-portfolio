import type { ReactNode } from "react";

/** Remounts on every navigation, so the CSS .page-enter animation plays once per route change. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
