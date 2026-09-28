import type { ReactNode } from "react";

import { CheckIcon, CrossIcon } from "@/components/ui/icons";
import { cx } from "@/lib/cx";

export type StatusTone = "success" | "failure" | "neutral" | "accent";

const tones: Record<StatusTone, string> = {
  success: "border-success-line bg-success-soft text-success",
  failure: "border-failure-line bg-failure-soft text-failure",
  neutral: "border-line bg-surface-2 text-ink-2",
  accent: "border-accent/20 bg-accent-soft text-accent",
};

type StatusBadgeProps = {
  tone: StatusTone;
  children: ReactNode;
  /** Show the semantic check/cross icon so state is not conveyed by color alone. */
  icon?: boolean;
  className?: string;
};

export function StatusBadge({ tone, children, icon = true, className }: StatusBadgeProps) {
  const Glyph = tone === "success" ? CheckIcon : tone === "failure" ? CrossIcon : null;
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm border px-2 py-0.5 text-xs font-medium leading-5",
        tones[tone],
        className,
      )}
    >
      {icon && Glyph && <Glyph size={12} strokeWidth={2.25} />}
      {children}
    </span>
  );
}
