import { TechIcon, techLabel } from "@/components/icons/TechIcon";
import { SKILL_GROUPS } from "@/content/skills";

export function TechStack() {
  return (
    <div className="stack-groups">
      {SKILL_GROUPS.map((group, gi) => (
        <section
          key={group.title}
          className="stack-group"
          aria-labelledby={`stack-${gi}`}
          data-reveal
          style={{ ["--i" as string]: gi }}
        >
          <div className="stack-group__head">
            <h3 className="stack-group__title" id={`stack-${gi}`}>
              {group.title}
            </h3>
            <p className="stack-group__note">{group.note}</p>
          </div>
          <ul className="tech-list" role="list">
            {group.icons.map((id) => (
              <li key={id} className="tech">
                <TechIcon id={id} />
                <span>{techLabel(id)}</span>
              </li>
            ))}
            {group.text.map((t) => (
              <li key={t} className="tech tech--text">
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
