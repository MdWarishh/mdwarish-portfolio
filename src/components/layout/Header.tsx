import Link from "next/link";
import { CONTACT_CTA, PERSON } from "@/config/site";
import { LogoMark } from "@/components/svg/Logo";
import { NavLinks } from "@/components/navigation/NavLinks";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/** The navbar only navigates. The animation switch lives in the footer (see MotionToggle). */
export function Header() {
  return (
    <header className="site-header" data-site-header data-scrolled="false">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label={`${PERSON.name} — home`}>
          <LogoMark className="brand__mark" />
        </Link>
        <NavLinks />
        <div className="header-tools">
          <ThemeToggle />
          <Link href={CONTACT_CTA.href} className="btn btn--sm header-cta">
            Contact
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
