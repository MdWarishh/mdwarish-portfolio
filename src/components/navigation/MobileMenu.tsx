"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CONTACT_CTA, NAV_ITEMS, PERSON } from "@/config/site";
import { MenuIcon } from "@/components/ui/Icons";
import { isActive } from "./NavLinks";

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock page scroll, move focus into the panel, close on Escape, keep Tab inside.
  useEffect(() => {
    const html = document.documentElement;
    if (!open) {
      html.removeAttribute("data-menu-open");
      return;
    }
    html.setAttribute("data-menu-open", "true");
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusables = [buttonRef.current, ...panel.querySelectorAll<HTMLElement>("a, button")].filter(
        (el): el is HTMLElement => Boolean(el),
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.removeAttribute("data-menu-open");
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="icon-btn menu-btn"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        data-testid="menu-toggle"
      >
        <MenuIcon open={open} />
      </button>
      <div
        id={panelId}
        ref={panelRef}
        className="mobile-menu"
        data-open={open}
        aria-hidden={!open}
        inert={!open}
        data-testid="mobile-menu"
      >
        <nav aria-label="Mobile">
          <ul className="mobile-menu__list">
            {[{ label: "Home", href: "/" }, ...NAV_ITEMS, { label: "Contact", href: "/contact" }].map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="mobile-menu__link"
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <span aria-hidden>{String(i).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__foot">
          <Link href={CONTACT_CTA.href} className="btn" onClick={() => setOpen(false)}>
            {CONTACT_CTA.label}
          </Link>
          <a href={`mailto:${PERSON.email}`} className="muted small">
            {PERSON.email}
          </a>
        </div>
      </div>
    </>
  );
}
