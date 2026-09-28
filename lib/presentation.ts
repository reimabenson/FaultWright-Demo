import type { CanonicalOutcome, CapabilityVerdict } from "@/lib/demo";

/*
 * Presentation metadata.
 *
 * Everything in this file is display copy that cannot be derived from the
 * frozen artifact: how to explain a control's purpose, what result the
 * pipeline is expected to produce for it, and plain-English framing for the
 * task. It is keyed by the artifact's own identifiers so that a swapped
 * artifact fails loudly instead of being described with the wrong words.
 */

export type ControlKind = "positive" | "negative";

export type ControlPresentation = {
  kind: ControlKind;
  /** One or two sentences on what this control is for. */
  role: string;
  /** What was actually submitted to the evaluator. */
  submission: string;
  /** The result a correctly working pipeline must produce for this control. */
  expected: {
    outcome: CanonicalOutcome;
    verdict: CapabilityVerdict;
    summary: string;
  };
};

const controls: Record<string, ControlPresentation> = {
  "replay-known-good": {
    kind: "positive",
    role: "Positive control. A repair already known to restore the expected behavior is replayed onto the faulted software.",
    submission: "Known-good patch applied",
    expected: {
      outcome: "PASS",
      verdict: "SOLVED",
      summary: "A working pipeline must accept it.",
    },
  },
  noop: {
    kind: "negative",
    role: "Negative control. Nothing is changed, so the fault stays in place and verification runs against the broken software.",
    submission: "No patch submitted",
    expected: {
      outcome: "FAIL",
      verdict: "NOT_SOLVED",
      summary: "A working pipeline must reject it.",
    },
  },
};

export function controlPresentation(profileId: string): ControlPresentation {
  const presentation = controls[profileId];
  if (!presentation) {
    throw new Error(
      `No presentation metadata for control profile "${profileId}". Add it to lib/presentation.ts.`,
    );
  }
  return presentation;
}

export type TaskPresentation = {
  shortTitle: string;
  plainEnglish: string;
  failureCondition: string;
  verificationTarget: string;
};

const tasks: Record<string, TaskPresentation> = {
  "IF-WEBHOOK-00001": {
    shortTitle: "Webhook idempotency",
    plainEnglish:
      "A webhook provider may deliver the same event more than once. Correct software must handle those retries without creating duplicate invoices.",
    failureCondition:
      "Repeated deliveries of one event are treated as distinct events, so a single payment can produce more than one invoice.",
    verificationTarget:
      "Deliver the same event repeatedly, sequentially and concurrently, and confirm that at most one invoice exists per event while the public API is unchanged.",
  },
};

export function taskPresentation(taskId: string): TaskPresentation {
  const presentation = tasks[taskId];
  if (!presentation) {
    throw new Error(`No presentation metadata for task "${taskId}". Add it to lib/presentation.ts.`);
  }
  return presentation;
}

export type MethodStep = {
  title: string;
  description: string;
};

export const methodSteps: MethodStep[] = [
  {
    title: "Known-good software",
    description: "Start from software whose expected behavior is already established and observable.",
  },
  {
    title: "Controlled fault",
    description: "Introduce one specific, reproducible failure. The task identity is frozen at this point.",
  },
  {
    title: "Verified failure",
    description: "Confirm the fault is observable before any repair is attempted. An undetectable fault cannot be evaluated.",
  },
  {
    title: "Repair attempt",
    description: "Submit a candidate repair against the same frozen task and the same environment.",
  },
  {
    title: "Behavioral verification",
    description: "Run verification again. The question is whether expected behavior is restored, not whether the diff looks plausible.",
  },
  {
    title: "Evaluation result",
    description: "Record a canonical outcome and a capability verdict together with the evidence that produced them.",
  },
];

/** One-line explanations for the deliverables listed in `scenario.expected_deliverables`. */
export const deliverableDescriptions: Record<string, string> = {
  reproducible_problem: "A failure that can be reproduced on demand from a frozen task identity.",
  controlled_environment: "One pinned environment, identified by version and execution digest.",
  verified_solution_attempt: "A repair attempt whose effect is checked by re-running verification, not by reading the diff.",
  discriminative_verification: "A verifier shown to accept a valid repair and reject no repair under identical conditions.",
  evidence_package: "Identifiers, digests, and outcomes exported as a public, hashable artifact.",
};

export const notClaimed: string[] = [
  "No AI model or coding agent was evaluated in this record. Both attempts are deterministic controls.",
  "The controls are not competing systems. They exist to check the evaluator, not to rank solvers.",
  "No success rates, benchmark scores, customers, or production usage are asserted.",
];

export type RoadmapItem = {
  stage: "Now" | "Next" | "Later";
  title: string;
  description: string;
};

export const roadmap: RoadmapItem[] = [
  {
    stage: "Now",
    title: "Reference-controlled evaluation",
    description: "This record: deterministic controls under one frozen task and environment.",
  },
  {
    stage: "Next",
    title: "Named coding agents",
    description: "Evaluate real repair systems under the same frozen conditions.",
  },
  {
    stage: "Later",
    title: "Regression workflows",
    description: "Compare changes against stable task identities over time.",
  },
];
