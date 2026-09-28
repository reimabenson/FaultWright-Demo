#!/usr/bin/env node
// Verifies that the frozen public artifact on disk is byte-for-byte the one
// described by the freeze manifest. Runs before every production build so a
// deployment can never serve bytes whose digest disagrees with the manifest.

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const manifestPath = resolve(root, "public/demo/demo-v0-freeze.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const artifactRelPath = manifest.demo_json_path ?? "public/demo/demo-v0.json";
const artifactPath = resolve(root, artifactRelPath);
const bytes = readFileSync(artifactPath);

const actualSha256 = createHash("sha256").update(bytes).digest("hex");
const crCount = bytes.filter((b) => b === 0x0d).length;

const problems = [];
if (actualSha256 !== manifest.demo_json_sha256) {
  problems.push(
    `sha256 mismatch\n    manifest: ${manifest.demo_json_sha256}\n    actual:   ${actualSha256}`,
  );
}
if (typeof manifest.demo_json_bytes === "number" && bytes.length !== manifest.demo_json_bytes) {
  problems.push(`size mismatch: manifest says ${manifest.demo_json_bytes} bytes, file has ${bytes.length}`);
}
if (manifest.demo_json_newline === "lf" && crCount > 0) {
  problems.push(`${crCount} carriage-return byte(s) found; canonical artifact must use LF newlines`);
}

// Provenance: the manifest must describe the record's own export time, so a
// manifest correction can never be mistaken for a re-run of the evaluation.
let artifactCreatedAt = "(unreadable)";
try {
  artifactCreatedAt = JSON.parse(bytes.toString("utf8")).created_at;
} catch {
  problems.push("artifact is not valid JSON");
}
if (typeof manifest.artifact_created_at !== "string") {
  problems.push("manifest is missing artifact_created_at");
} else if (manifest.artifact_created_at !== artifactCreatedAt) {
  problems.push(
    `artifact_created_at mismatch\n    manifest: ${manifest.artifact_created_at}\n    artifact: ${artifactCreatedAt}`,
  );
}
if (typeof manifest.manifest_generated_at !== "string") {
  problems.push("manifest is missing manifest_generated_at");
}

console.log(`artifact   ${artifactRelPath}`);
console.log(`bytes      ${bytes.length}`);
console.log(`sha256     ${actualSha256}`);
console.log(`newlines   ${crCount === 0 ? "lf" : "crlf/mixed"}`);
console.log(`created    ${artifactCreatedAt}  (artifact_created_at)`);
console.log(`manifest   ${manifest.manifest_generated_at ?? "n/a"}  (manifest_generated_at)`);
if (manifest.manifest_corrected_at) {
  console.log(`corrected  ${manifest.manifest_corrected_at}  (manifest_corrected_at)`);
}

if (problems.length > 0) {
  console.error("\nArtifact integrity check FAILED:");
  for (const p of problems) console.error(`  - ${p}`);
  console.error(
    "\nIf you edited the artifact intentionally, regenerate public/demo/demo-v0-freeze.json from the canonical LF bytes.",
  );
  process.exit(1);
}

console.log("\nArtifact integrity check passed: bytes match the freeze manifest.");
