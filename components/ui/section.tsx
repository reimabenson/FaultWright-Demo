import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { cx } from "@/lib/cx";

type SectionProps = {
  id: string;
  /** id of the heading element that names this section. */
  labelledBy: string;
  tone?: "bg" | "surface";
  className?: string;
  children: ReactNode;
};

export function Section({ id, labelledBy, tone = "bg", className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(
        "scroll-mt-16 border-t border-line py-16 sm:py-20 lg:py-24",
        tone === "surface" && "bg-surface",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
