"use client";

import { useState, type ReactNode } from "react";

type Option = { value: string; label: string; count: number };

/**
 * Category filter for the Work page. The case studies are server-rendered children; the filter only
 * sets data-filter on the wrapper and CSS hides the other categories, so the list stays crawlable.
 */
export function WorkFilter({ options, total, children }: { options: Option[]; total: number; children: ReactNode }) {
  const [filter, setFilter] = useState("all");
  const visible = options.find((o) => o.value === filter)?.count ?? total;
  return (
    <div className="wk-filter" data-filter={filter}>
      <div className="wk-filter__bar" role="group" aria-label="Filter projects by type" data-reveal>
        {options.map((o) => (
          <button key={o.value} type="button" className="wk-filter__btn" aria-pressed={filter === o.value} onClick={() => setFilter(o.value)}>
            {o.label}
            <span className="wk-filter__count">{o.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible} of {total} projects
      </p>
      {children}
    </div>
  );
}
