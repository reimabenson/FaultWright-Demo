import { CopyButton } from "@/components/ui/copy-button";
import { cx } from "@/lib/cx";

type IdentifierProps = {
  /** Full value; this is what the copy button places on the clipboard. */
  value: string;
  /** Human-readable name used for the copy button's accessible label. */
  label: string;
  /** Optional shortened form to display instead of the full value. */
  display?: string;
  copy?: boolean;
  /**
   * chip: bordered inline token for ids and versions.
   * plain: monospace text without a border.
   * hash: monospace text that wraps anywhere, for full-length digests.
   */
  variant?: "chip" | "plain" | "hash";
  className?: string;
};

export function Identifier({ value, label, display, copy = true, variant = "chip", className }: IdentifierProps) {
  const shown = display ?? value;
  const isShortened = shown !== value;

  return (
    <span className={cx("inline-flex max-w-full items-center gap-1.5 align-middle", className)}>
      <code
        title={isShortened ? value : undefined}
        className={cx(
          "min-w-0 text-[0.8125rem] leading-5 text-ink-2",
          variant === "chip" && "truncate rounded-xs border border-line bg-surface-2 px-1.5",
          variant === "plain" && "[overflow-wrap:anywhere]",
          variant === "hash" && "text-hash",
        )}
      >
        {shown}
      </code>
      {copy && <CopyButton value={value} label={label} />}
    </span>
  );
}
