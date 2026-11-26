import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <section className="container section notfound">
      <p className="eyebrow">404 · Page not found</p>
      <h1 className="h1">
        This page doesn&apos;t exist <em>— or it moved.</em>
      </h1>
      <p className="lede">Try the work or the home page.</p>
      <div className="actions">
        <Link href="/projects" className="btn">
          Explore My Work <ArrowRight />
        </Link>
        <Link href="/" className="btn btn--ghost">
          Back to home
        </Link>
      </div>
    </section>
  );
}
