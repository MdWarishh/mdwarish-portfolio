import type { CSSProperties } from "react";
import { TechIcon, techLabel } from "@/components/icons/TechIcon";
import { SKILL_GROUPS } from "@/content/skills";

/**
 * The tools behind the services, drawn as the layers of a system: interface on top, then the API,
 * the data, and the infrastructure underneath. A spine links the layers and draws as they arrive.
 * Content is SKILL_GROUPS, unchanged.
 */
export function StackLayers() {
  return (
    <ol className="layers" role="list">
      {SKILL_GROUPS.map((g, gi) => (
        <li key={g.title} className="layer" data-reveal style={{ "--i": gi } as CSSProperties}>
          <div className="layer__name">
            <h3 className="layer__title">{g.title}</h3>
            <p className="layer__note">{g.note}</p>
          </div>
          <ul className="layer__items" role="list">
            {g.icons.map((id) => (
              <li key={id}>
                <TechIcon id={id} />
                <span>{techLabel(id)}</span>
              </li>
            ))}
            {g.text.map((t) => (
              <li key={t} className="layer__text">
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
