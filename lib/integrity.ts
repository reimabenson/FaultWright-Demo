import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ARTIFACT_PATHS, freeze } from "@/lib/demo";

/*
 * Build-time artifact verification. Server-only.
 *
 * The page imports the artifact as JSON, which loses byte identity. This
 * module reads the exact bytes that `public/` will serve, hashes them, and
 * compares the digest with the freeze manifest. A mismatch throws, so the
 * production build fails rather than publishing a record whose displayed
 * hash disagrees with the file a visitor can download.
 */

export type NewlineStyle = "lf" | "crlf" | "mixed" | "none";

export type InspectedFile = {
  /** Public URL path, e.g. `/demo/demo-v0.json`. */
  publicPath: string;
  /** Repository path, e.g. `public/demo/demo-v0.json`. */
  repoPath: string;
  fileName: string;
  bytes: number;
  sha256: string;
  newline: NewlineStyle;
  /** Exact file contents, for on-page preview. */
  text: string;
};

function detectNewlines(buffer: Buffer): NewlineStyle {
  let crlf = 0;
  let lf = 0;
  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i] !== 0x0a) continue;
    if (i > 0 && buffer[i - 1] === 0x0d) crlf++;
    else lf++;
  }
  if (crlf === 0 && lf === 0) return "none";
  if (crlf > 0 && lf > 0) return "mixed";
  return crlf > 0 ? "crlf" : "lf";
}

function inspectPublicFile(publicPath: string): InspectedFile {
  const relative = publicPath.replace(/^\//, "");
  const repoPath = `public/${relative}`;
  const buffer = readFileSync(join(process.cwd(), "public", relative));
  return {
    publicPath,
    repoPath,
    fileName: relative.split("/").pop() ?? relative,
    bytes: buffer.length,
    sha256: createHash("sha256").update(buffer).digest("hex"),
    newline: detectNewlines(buffer),
    text: buffer.toString("utf8"),
  };
}

export const demoFile = inspectPublicFile(ARTIFACT_PATHS.demo);
export const freezeFile = inspectPublicFile(ARTIFACT_PATHS.freeze);

export type IntegrityCheck = {
  claimedSha256: string;
  computedSha256: string;
  claimedBytes: number | undefined;
  computedBytes: number;
  newline: NewlineStyle;
  matches: boolean;
};

export const integrity: IntegrityCheck = {
  claimedSha256: freeze.demo_json_sha256,
  computedSha256: demoFile.sha256,
  claimedBytes: freeze.demo_json_bytes,
  computedBytes: demoFile.bytes,
  newline: demoFile.newline,
  matches:
    freeze.demo_json_sha256 === demoFile.sha256 &&
    (freeze.demo_json_bytes === undefined || freeze.demo_json_bytes === demoFile.bytes),
};

if (!integrity.matches) {
  throw new Error(
    [
      "Frozen artifact integrity check failed.",
      `  manifest sha256: ${integrity.claimedSha256}`,
      `  computed sha256: ${integrity.computedSha256}`,
      `  bytes: manifest ${integrity.claimedBytes ?? "n/a"}, file ${integrity.computedBytes} (${integrity.newline})`,
      "Regenerate public/demo/demo-v0-freeze.json from the canonical LF bytes (see README).",
    ].join("\n"),
  );
}
