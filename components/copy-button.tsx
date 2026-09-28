"use client";

import { useState } from "react";

type CopyButtonProps = {
  label: string;
  value: string;
};

export function CopyButton({ label, value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      className="copy-button"
      onClick={copy}
      aria-label={`Copy ${label}`}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
