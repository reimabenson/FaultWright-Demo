import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

/** A definition list rendered as label/value rows separated by hairlines. */
export function Ledger({ className, children }: { className?: string; children: ReactNode }) {
  return <dl className={cx("divide-y divide-line", className)}>{children}</dl>;
}

type LedgerRowProps = {
  label: ReactNode;
  /** Secondary text under the label, e.g. the artifact field name. */
  hint?: string;
  /** Narrower label column for small panels. */
  compact?: boolean;
  children: ReactNode;
  className?: string;
};

export function LedgerRow({ label, hint, compact = false, children, className }: LedgerRowProps) {
  return (
    <div
      className={cx(
        "grid gap-1.5 py-3 sm:gap-6 sm:py-3.5",
        compact ? "sm:grid-cols-[5.75rem_minmax(0,1fr)]" : "sm:grid-cols-[minmax(8rem,11rem)_minmax(0,1fr)]",
        className,
      )}
    >
      <dt className="text-xs font-medium leading-5 text-muted">
        {label}
        {hint && <span className="block font-mono text-[0.6875rem] font-normal text-faint">{hint}</span>}
      </dt>
      <dd className="min-w-0 text-sm leading-5 text-ink">{children}</dd>
    </div>
  );
}
