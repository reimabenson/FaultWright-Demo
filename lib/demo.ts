import demoJson from "@/public/demo/demo-v0.json";
import freezeJson from "@/public/demo/demo-v0-freeze.json";

/*
 * Frozen evaluation artifact.
 *
 * The JSON files are imported statically so the page is prerendered from the
 * exact record shipped in `public/demo`. Every accessor here throws on
 * malformed or missing data so that an inconsistent artifact fails the build
 * instead of rendering a partially wrong page.
 */

export type CanonicalOutcome = "PASS" | "FAIL";
export type CapabilityVerdict = "SOLVED" | "NOT_SOLVED";
export type VerificationPhase = "OK" | "FAILED";

export type DemoAttempt = {
  canonical_capability_verdict: CapabilityVerdict;
  canonical_outcome: CanonicalOutcome;
  human_summary: string;
  patch_sha256: string;
  profile_id: string;
  solver_id: string;
  solver_label: string;
  verification_phase: VerificationPhase;
};

export type EvidenceReference =
  | { kind: "task_fingerprint"; sha256: string }
  | { kind: "environment_execution_digest"; sha256: string }
  | {
      kind: "attempt";
      attempt_id: string;
      profile_id: string;
      solver_id: string;
    }
  | { kind: "patch_sha256"; sha256: string };

export type DemoArtifact = {
  schema: string;
  run_id: string;
  created_at: string;
  attempts: DemoAttempt[];
  evidence_refs: EvidenceReference[];
  narrative: string[];
  scenario: {
    scenario_id: string;
    market_category: string;
    short_description: string;
    expected_deliverables: string[];
  };
  task: {
    environment_digest: string;
    environment_id: string;
    environment_version: string;
    fingerprint: string;
    task_id: string;
    public_summary: {
      environment_id: string;
      problem_statement: string;
      starting_state: string;
      task_id: string;
      title: string;
      visible_tests: string[];
    };
  };
};

export type ManifestCorrection = {
  reason: string;
  previous_demo_json_sha256?: string;
  previous_demo_json_newline?: string;
};

export type FreezeManifest = {
  kind: string;
  run_id: string;
  task_id: string;
  task_fingerprint: string;
  scenario_id: string;
  environment_id: string;
  environment_version: string;
  environment_digest: string;
  demo_implementation_commit: string;
  demo_json_sha256: string;
  demo_json_bytes?: number;
  demo_json_newline?: string;
  demo_json_path?: string;
  /** When the evaluation record was exported. Must equal the artifact's `created_at`. */
  artifact_created_at: string;
  /** When the engine generated this manifest. */
  manifest_generated_at: string;
  /** When a repository-side correction was applied to the manifest, if any. */
  manifest_corrected_at?: string;
  correction?: ManifestCorrection;
  note: string;
  solvers: Array<{
    canonical_capability_verdict: CapabilityVerdict;
    canonical_outcome: CanonicalOutcome;
    profile_id: string;
    solver_id: string;
    solver_label: string;
  }>;
};

export const ARTIFACT_PATHS = {
  demo: "/demo/demo-v0.json",
  freeze: "/demo/demo-v0-freeze.json",
} as const;

export const SUPPORTED_SCHEMA = "demo-v0";

const OUTCOMES: readonly CanonicalOutcome[] = ["PASS", "FAIL"];
const VERDICTS: readonly CapabilityVerdict[] = ["SOLVED", "NOT_SOLVED"];
const PHASES: readonly VerificationPhase[] = ["OK", "FAILED"];
const EVIDENCE_KINDS = [
  "task_fingerprint",
  "environment_execution_digest",
  "attempt",
  "patch_sha256",
] as const;

class ArtifactError extends Error {
  constructor(message: string) {
    super(`Frozen demo artifact is invalid: ${message}`);
    this.name = "ArtifactError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function expectString(record: Record<string, unknown>, key: string, where: string): string {
  const value = record[key];
  if (typeof value !== "string") {
    throw new ArtifactError(`${where}.${key} must be a string`);
  }
  return value;
}

function expectStringArray(record: Record<string, unknown>, key: string, where: string): string[] {
  const value = record[key];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new ArtifactError(`${where}.${key} must be an array of strings`);
  }
  return value as string[];
}

function expectOneOf<T extends string>(
  record: Record<string, unknown>,
  key: string,
  allowed: readonly T[],
  where: string,
): T {
  const value = expectString(record, key, where);
  if (!allowed.includes(value as T)) {
    throw new ArtifactError(`${where}.${key} must be one of ${allowed.join(", ")}; got "${value}"`);
  }
  return value as T;
}

function parseAttempt(value: unknown, index: number): DemoAttempt {
  const where = `attempts[${index}]`;
  if (!isRecord(value)) throw new ArtifactError(`${where} must be an object`);
  return {
    canonical_capability_verdict: expectOneOf(value, "canonical_capability_verdict", VERDICTS, where),
    canonical_outcome: expectOneOf(value, "canonical_outcome", OUTCOMES, where),
    human_summary: expectString(value, "human_summary", where),
    patch_sha256: expectString(value, "patch_sha256", where),
    profile_id: expectString(value, "profile_id", where),
    solver_id: expectString(value, "solver_id", where),
    solver_label: expectString(value, "solver_label", where),
    verification_phase: expectOneOf(value, "verification_phase", PHASES, where),
  };
}

function parseEvidenceReference(value: unknown, index: number): EvidenceReference {
  const where = `evidence_refs[${index}]`;
  if (!isRecord(value)) throw new ArtifactError(`${where} must be an object`);
  const kind = expectOneOf(value, "kind", EVIDENCE_KINDS, where);
  if (kind === "attempt") {
    return {
      kind,
      attempt_id: expectString(value, "attempt_id", where),
      profile_id: expectString(value, "profile_id", where),
      solver_id: expectString(value, "solver_id", where),
    };
  }
  return { kind, sha256: expectString(value, "sha256", where) };
}

function parseArtifact(value: unknown): DemoArtifact {
  if (!isRecord(value)) throw new ArtifactError("root must be an object");

  const schema = expectString(value, "schema", "artifact");
  if (schema !== SUPPORTED_SCHEMA) {
    throw new ArtifactError(`schema "${schema}" is not supported; expected "${SUPPORTED_SCHEMA}"`);
  }

  if (!Array.isArray(value.attempts) || value.attempts.length === 0) {
    throw new ArtifactError("attempts must be a non-empty array");
  }
  if (!Array.isArray(value.evidence_refs)) {
    throw new ArtifactError("evidence_refs must be an array");
  }
  const scenario = value.scenario;
  const task = value.task;
  if (!isRecord(scenario)) throw new ArtifactError("scenario must be an object");
  if (!isRecord(task)) throw new ArtifactError("task must be an object");
  const summary = task.public_summary;
  if (!isRecord(summary)) throw new ArtifactError("task.public_summary must be an object");

  const artifact: DemoArtifact = {
    schema,
    run_id: expectString(value, "run_id", "artifact"),
    created_at: expectString(value, "created_at", "artifact"),
    attempts: value.attempts.map(parseAttempt),
    evidence_refs: value.evidence_refs.map(parseEvidenceReference),
    narrative: expectStringArray(value, "narrative", "artifact"),
    scenario: {
      scenario_id: expectString(scenario, "scenario_id", "scenario"),
      market_category: expectString(scenario, "market_category", "scenario"),
      short_description: expectString(scenario, "short_description", "scenario"),
      expected_deliverables: expectStringArray(scenario, "expected_deliverables", "scenario"),
    },
    task: {
      environment_digest: expectString(task, "environment_digest", "task"),
      environment_id: expectString(task, "environment_id", "task"),
      environment_version: expectString(task, "environment_version", "task"),
      fingerprint: expectString(task, "fingerprint", "task"),
      task_id: expectString(task, "task_id", "task"),
      public_summary: {
        environment_id: expectString(summary, "environment_id", "task.public_summary"),
        problem_statement: expectString(summary, "problem_statement", "task.public_summary"),
        starting_state: expectString(summary, "starting_state", "task.public_summary"),
        task_id: expectString(summary, "task_id", "task.public_summary"),
        title: expectString(summary, "title", "task.public_summary"),
        visible_tests: expectStringArray(summary, "visible_tests", "task.public_summary"),
      },
    },
  };

  const profiles = new Set<string>();
  for (const attempt of artifact.attempts) {
    if (profiles.has(attempt.profile_id)) {
      throw new ArtifactError(`duplicate attempt profile "${attempt.profile_id}"`);
    }
    profiles.add(attempt.profile_id);
  }

  return artifact;
}

function parseCorrection(value: unknown): ManifestCorrection | undefined {
  if (value === undefined) return undefined;
  if (!isRecord(value)) throw new ArtifactError("freeze.correction must be an object");
  return {
    reason: expectString(value, "reason", "freeze.correction"),
    previous_demo_json_sha256:
      typeof value.previous_demo_json_sha256 === "string" ? value.previous_demo_json_sha256 : undefined,
    previous_demo_json_newline:
      typeof value.previous_demo_json_newline === "string" ? value.previous_demo_json_newline : undefined,
  };
}

function parseFreeze(value: unknown, artifact: DemoArtifact): FreezeManifest {
  if (!isRecord(value)) throw new ArtifactError("freeze manifest root must be an object");
  const where = "freeze";
  if (!Array.isArray(value.solvers)) throw new ArtifactError("freeze.solvers must be an array");

  const manifest: FreezeManifest = {
    kind: expectString(value, "kind", where),
    run_id: expectString(value, "run_id", where),
    task_id: expectString(value, "task_id", where),
    task_fingerprint: expectString(value, "task_fingerprint", where),
    scenario_id: expectString(value, "scenario_id", where),
    environment_id: expectString(value, "environment_id", where),
    environment_version: expectString(value, "environment_version", where),
    environment_digest: expectString(value, "environment_digest", where),
    demo_implementation_commit: expectString(value, "demo_implementation_commit", where),
    demo_json_sha256: expectString(value, "demo_json_sha256", where),
    demo_json_bytes: typeof value.demo_json_bytes === "number" ? value.demo_json_bytes : undefined,
    demo_json_newline: typeof value.demo_json_newline === "string" ? value.demo_json_newline : undefined,
    demo_json_path: typeof value.demo_json_path === "string" ? value.demo_json_path : undefined,
    artifact_created_at: expectString(value, "artifact_created_at", where),
    manifest_generated_at: expectString(value, "manifest_generated_at", where),
    manifest_corrected_at:
      typeof value.manifest_corrected_at === "string" ? value.manifest_corrected_at : undefined,
    correction: parseCorrection(value.correction),
    note: expectString(value, "note", where),
    solvers: value.solvers.map((solver, index) => {
      const solverWhere = `freeze.solvers[${index}]`;
      if (!isRecord(solver)) throw new ArtifactError(`${solverWhere} must be an object`);
      return {
        canonical_capability_verdict: expectOneOf(solver, "canonical_capability_verdict", VERDICTS, solverWhere),
        canonical_outcome: expectOneOf(solver, "canonical_outcome", OUTCOMES, solverWhere),
        profile_id: expectString(solver, "profile_id", solverWhere),
        solver_id: expectString(solver, "solver_id", solverWhere),
        solver_label: expectString(solver, "solver_label", solverWhere),
      };
    }),
  };

  // The manifest must describe the same run the page renders.
  if (manifest.run_id !== artifact.run_id) {
    throw new ArtifactError(`freeze.run_id ${manifest.run_id} does not match artifact run_id ${artifact.run_id}`);
  }
  if (manifest.artifact_created_at !== artifact.created_at) {
    throw new ArtifactError(
      `freeze.artifact_created_at ${manifest.artifact_created_at} does not match artifact created_at ${artifact.created_at}`,
    );
  }
  if (manifest.manifest_corrected_at && !manifest.correction) {
    throw new ArtifactError("freeze.manifest_corrected_at is set but no correction is described");
  }
  if (manifest.task_id !== artifact.task.task_id) {
    throw new ArtifactError("freeze.task_id does not match the artifact task");
  }
  if (manifest.task_fingerprint !== artifact.task.fingerprint) {
    throw new ArtifactError("freeze.task_fingerprint does not match the artifact fingerprint");
  }
  for (const solver of manifest.solvers) {
    const attempt = artifact.attempts.find((candidate) => candidate.profile_id === solver.profile_id);
    if (!attempt) {
      throw new ArtifactError(`freeze.solvers lists profile "${solver.profile_id}" which is not in the artifact`);
    }
    if (
      attempt.canonical_outcome !== solver.canonical_outcome ||
      attempt.canonical_capability_verdict !== solver.canonical_capability_verdict
    ) {
      throw new ArtifactError(`freeze.solvers outcome for "${solver.profile_id}" disagrees with the artifact`);
    }
  }

  return manifest;
}

export const demo: DemoArtifact = parseArtifact(demoJson);
export const freeze: FreezeManifest = parseFreeze(freezeJson, demo);

/** The attempt identifier recorded in `evidence_refs` for a given attempt. */
export function attemptIdFor(attempt: DemoAttempt): string | undefined {
  for (const ref of demo.evidence_refs) {
    if (ref.kind === "attempt" && ref.profile_id === attempt.profile_id) {
      return ref.attempt_id;
    }
  }
  return undefined;
}

export function isAccepted(attempt: DemoAttempt): boolean {
  return attempt.canonical_outcome === "PASS";
}
