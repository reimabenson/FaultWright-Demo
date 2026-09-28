import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

type KickerProps = {
  /** Optional ordinal shown in the accent color, e.g. "02". */
  index?: string;
  children: ReactNode;
  className?: string;
};

/** Small monospace label used above headings and inside cards. */
export function Kicker({ index, children, className }: KickerProps) {
  return (
    <span
      className={cx("flex items-center gap-2.5 font-mono text-micro font-medium uppercase text-faint", className)}
    >
      {index && (
        <>
          <span className="text-accent">{index}</span>
          <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
        </>
      )}
      <span>{children}</span>
    </span>
  );
}
