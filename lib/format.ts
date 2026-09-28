/** `c5671ad60f…605a102` — keeps both ends of a digest visible. */
export function shortHash(value: string, head = 10, tail = 7): string {
  if (value.length <= head + tail + 1) return value;
  return `${value.slice(0, head)}…${value.slice(-tail)}`;
}

/** First `length` characters of an identifier, e.g. a run id prefix. */
export function shortId(value: string, length = 12): string {
  return value.length <= length ? value : value.slice(0, length);
}

const acronyms: Record<string, string> = {
  ai: "AI",
  api: "API",
  id: "ID",
  json: "JSON",
  url: "URL",
};

/** `reproducible_problem` → `Reproducible problem`; `coding_ai_evaluation` → `Coding AI evaluation` */
export function humanizeIdentifier(value: string): string {
  const words = value
    .split(/[_-]+/)
    .filter(Boolean)
    .map((word) => acronyms[word.toLowerCase()] ?? word);
  if (words.length === 0) return value;
  const [first, ...rest] = words;
  return [first.charAt(0).toUpperCase() + first.slice(1), ...rest].join(" ");
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * ISO timestamp → `2026-09-28 12:11 UTC` (or `12:11:07 UTC` with `"seconds"`),
 * independent of build machine locale.
 */
export function formatUtc(iso: string, precision: "minutes" | "seconds" = "minutes"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const time = `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}${
    precision === "seconds" ? `:${pad(date.getUTCSeconds())}` : ""
  }`;
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${time} UTC`;
}

/** ISO timestamp → `2026-09-28` */
export function formatUtcDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

export function formatBytes(bytes: number): string {
  return `${bytes.toLocaleString("en-US")} bytes`;
}

export function formatIndex(index: number): string {
  return String(index).padStart(2, "0");
}
