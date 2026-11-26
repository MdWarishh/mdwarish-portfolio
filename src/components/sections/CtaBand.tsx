import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { CtaArt } from "@/components/svg/CtaArt";
import { ArrowRight } from "@/components/ui/Icons";
import { PERSON } from "@/config/site";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/**
 * The closing band at the end of every page. The band is the single [data-reveal] trigger: when it
 * arrives the headline rises from a mask, then the status, text, buttons and email line follow in a
 * short stagger (CSS, keyed on --i). Content is fully visible without JS. Background: CtaArt.
 */
export function CtaBand({
  title = (
    <>
      Got something to build? <em>Tell me about it.</em>
    </>
  ),
  body = "Send me what it should do and who will use it. I read every message myself and reply with questions or a first plan.",
  secondary = { label: "Hiring? See my experience", href: "/experience" },
}: {
  title?: ReactNode;
  body?: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="section--tight cta" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-band" data-reveal>
          <CtaArt />
          <div className="cta-band__content">
            <p className="cta-band__status" style={i(1)}>
              <span className="status-dot" aria-hidden />
              {PERSON.availability}
            </p>
            <h2 className="h2 cta-band__title" id="cta-title">
              <span className="cta-band__lift">{title}</span>
            </h2>
            <p className="cta-band__body" style={i(4)}>
              {body}
            </p>
            <div className="actions cta-band__actions" style={i(6)}>
              <Link href="/contact?intent=freelance" className="btn">
                Discuss a Project <ArrowRight />
              </Link>
              <Link href={secondary.href} className="btn btn--ghost">
                {secondary.label}
              </Link>
            </div>
            <p className="cta-band__mail" style={i(8)}>
              Or write to <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
