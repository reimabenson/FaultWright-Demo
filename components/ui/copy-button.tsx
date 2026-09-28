"use client";

import { useEffect, useRef, useState } from "react";

import { AlertIcon, CheckIcon, CopyIcon } from "@/components/ui/icons";
import { cx } from "@/lib/cx";

type CopyState = "idle" | "copied" | "failed";

type CopyButtonProps = {
  /** Text placed on the clipboard. */
  value: string;
  /** Human-readable name of the value, used for the accessible label. */
  label: string;
  className?: string;
};

const RESET_DELAY_MS = 1800;

export function CopyButton({ value, label, className }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    };
  }, []);

  async function handleClick() {
    const ok = await writeToClipboard(value);
    setState(ok ? "copied" : "failed");
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setState("idle"), RESET_DELAY_MS);
  }

  const title = state === "copied" ? "Copied" : state === "failed" ? "Copy failed — select the text instead" : `Copy ${label}`;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Copy ${label}`}
      title={title}
      data-state={state}
      className={cx(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-xs border border-transparent text-faint transition-colors",
        "hover:border-line hover:bg-surface hover:text-ink",
        "data-[state=copied]:border-success-line data-[state=copied]:bg-success-soft data-[state=copied]:text-success",
        "data-[state=failed]:border-failure-line data-[state=failed]:bg-failure-soft data-[state=failed]:text-failure",
        className,
      )}
    >
      {state === "copied" ? <CheckIcon size={13} /> : state === "failed" ? <AlertIcon size={13} /> : <CopyIcon size={13} />}
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? `${label} copied to clipboard` : state === "failed" ? "Copy failed" : ""}
      </span>
    </button>
  );
}

/**
 * Copies text with the async Clipboard API when it is available (secure
 * contexts only), then falls back to a selection-based copy. Returns whether
 * the copy is believed to have succeeded; never throws.
 */
async function writeToClipboard(text: string): Promise<boolean> {
  try {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function" &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Permission denied or API unavailable; try the legacy path below.
  }
  return legacyCopy(text);
}

function legacyCopy(text: string): boolean {
  if (typeof document === "undefined" || typeof document.execCommand !== "function") return false;

  const selection = document.getSelection();
  const previousRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.setAttribute("aria-hidden", "true");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.width = "1px";
  textarea.style.height = "1px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);

  let ok = false;
  try {
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  } finally {
    document.body.removeChild(textarea);
    if (selection && previousRange) {
      selection.removeAllRanges();
      selection.addRange(previousRange);
    }
  }
  return ok;
}
