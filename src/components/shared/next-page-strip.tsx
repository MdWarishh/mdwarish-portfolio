"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface NextPageStripProps {
  number?: string; // Retained for compatibility with older pages, intentionally not displayed.
  label: string;
  title: string;
  description: string;
  href: string;
}

export function NextPageStrip({ label, title, description, href }: NextPageStripProps) {
  const reducedMotion = useReducedMotion();
  return (
    <section aria-label={`Continue to ${label}`} className="border-t border-border bg-bg-soft/50">
      <div className="container-x py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={href} className="group grid items-end gap-7 border-b border-border-strong pb-9 transition-colors hover:border-accent focus-visible:rounded-sm md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
            <div className="max-w-[690px]">
              <p className="label-mono">Up next · {label}</p>
              <h2 className="mt-5 max-w-[670px] font-display text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.08] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-accent">
                {title}
              </h2>
              <p className="mt-5 max-w-[520px] text-sm leading-[1.8] text-text-muted sm:text-base">{description}</p>
            </div>
            <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center border border-border-strong text-accent transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-accent sm:h-16 sm:w-16">
              <ArrowUpRight className="h-6 w-6" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
