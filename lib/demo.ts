import demoJson from "@/public/demo/demo-v0.json";

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

export const demo = demoJson as DemoArtifact;

export function humanizeIdentifier(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function shortHash(value: string): string {
  if (!value) return "No patch";
  return `${value.slice(0, 10)}…${value.slice(-8)}`;
}

export function attemptByProfile(profileId: string): DemoAttempt {
  const attempt = demo.attempts.find(
    (candidate) => candidate.profile_id === profileId,
  );

  if (!attempt) {
    throw new Error(`Missing frozen demo attempt: ${profileId}`);
  }

  return attempt;
}
