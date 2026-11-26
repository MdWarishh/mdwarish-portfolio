import type { CSSProperties, ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

/** Oversized outlined section number + title + optional short aside, in an asymmetric row. */
export function SectionHead({
  num,
  eyebrow,
  title,
  aside,
  id,
}: {
  num?: string;
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
  id?: string;
}) {
  return (
    <div className={`sec-head${aside ? "" : " sec-head--no-aside"}`}>
      {num ? (
        <span className="sec-num" aria-hidden>
          {num}
        </span>
      ) : null}
      <div className="sec-head__title">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="h2" id={id} data-reveal>
          {title}
        </h2>
      </div>
      {aside ? (
        <div className="sec-head__aside" data-reveal style={{ "--i": 1 } as CSSProperties}>
          {aside}
        </div>
      ) : null}
    </div>
  );
}
