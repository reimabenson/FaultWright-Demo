/*
 * Editorial product-direction content.
 *
 * This file describes what FaultWright is being built toward. It is kept
 * separate from `lib/demo.ts`, which is the factual frozen Demo V0 record.
 */

export const productDirection = {
  motto: "Real tasks in. Verified results out.",
  supportingMotto: "Autonomous execution. Independent verification.",
  description:
    "FaultWright is being built to autonomously execute permitted software-engineering AI-training tasks and independently verify the result.",
  provingGround:
    "Existing AI-training platforms provide the first real workloads. Where their rules permit the planned automation and data handling, those tasks are intended to serve as a paid proving ground for the reusable execution and verification system.",
} as const;

export type SystemStepState = "direction" | "demonstrated" | "human-gate";

export type SystemStep = {
  title: string;
  description: string;
  state: SystemStepState;
};

export const systemFlow: SystemStep[] = [
  {
    title: "External AI-training task",
    description: "A real software-engineering workload arrives from a permitted source.",
    state: "direction",
  },
  {
    title: "Policy / permission check",
    description: "Confirm platform rules, data handling, scope, and authorization before automation.",
    state: "human-gate",
  },
  {
    title: "Task intake",
    description: "Capture instructions, repository context, deliverables, and acceptance requirements.",
    state: "direction",
  },
  {
    title: "Normalize",
    description: "Translate the workload into a stable internal task representation.",
    state: "direction",
  },
  {
    title: "Plan",
    description: "Form an execution plan and identify verification and review gates.",
    state: "direction",
  },
  {
    title: "Autonomous execution",
    description: "Perform supported engineering work without treating unsupported cases as automated.",
    state: "direction",
  },
  {
    title: "Verification",
    description: "Evaluate the result independently from the solver. Demo V0 proves this layer.",
    state: "demonstrated",
  },
  {
    title: "Critic / retry",
    description: "Check failure modes and shortcuts; retry when the evidence supports another attempt.",
    state: "direction",
  },
  {
    title: "Human review if required",
    description: "Escalate ambiguity, subjective criteria, compliance decisions, and required approval.",
    state: "human-gate",
  },
  {
    title: "Verified output",
    description: "Package the result, evidence, and unresolved exceptions for delivery.",
    state: "direction",
  },
];

export const platformRationale = {
  kicker: "Paid proving ground",
  title: "Why begin with existing AI-training platforms?",
  lead:
    "They already contain real economic demand, concrete instructions, and acceptance requirements. That makes them a useful place to validate the system against reality.",
  reasons: [
    {
      title: "Real demand",
      description: "The workload exists because someone already values the completed task.",
    },
    {
      title: "Real acceptance criteria",
      description: "Instructions and rejection conditions are part of the task, not invented for a demo.",
    },
    {
      title: "Real task distributions",
      description: "Varied repositories and requirements expose where intake and planning break down.",
    },
    {
      title: "Meaningful feedback",
      description: "Accepted and rejected work provides an external signal for improving the system.",
    },
    {
      title: "Early revenue",
      description: "Paid tasks can help fund development without pretending the marketplace is the final product.",
    },
    {
      title: "Reusable patterns",
      description: "Repeated workload families reveal which capabilities should become shared infrastructure.",
    },
  ],
  conclusion:
    "Marketplace tasks are the input and proving ground. FaultWright is the reusable system being built.",
  constraint:
    "Automation and data handling must remain within the rules and permissions of each platform, customer, and task.",
} as const;

export const accumulatingCapabilities = [
  "Task intake",
  "Task classification",
  "Repository / environment setup",
  "Execution planning",
  "Solver orchestration",
  "Clean replay",
  "Verification",
  "Critic / anti-shortcut checks",
  "Retry logic",
  "Evidence generation",
  "Result packaging",
] as const;

export const productComparison = {
  service: {
    label: "Traditional task execution",
    points: [
      "Similar work is performed again for each task.",
      "Capacity grows mainly by adding human time.",
      "Process knowledge may remain informal.",
    ],
  },
  product: {
    label: "FaultWright direction",
    points: [
      "Execution logic becomes reusable software.",
      "Human intervention should decline across repeated, supported task families.",
      "Independent verification is part of the system.",
      "Each outcome can improve shared infrastructure.",
    ],
  },
} as const;

export const nearTermRoadmap = [
  {
    stage: "Stage 1",
    status: "Near-term entry",
    title: "Paid platform tasks",
    description:
      "Use permitted real workloads for external feedback and early revenue. No paying customers are claimed today.",
  },
  {
    stage: "Stage 2",
    status: "Build direction",
    title: "Reusable autonomous execution",
    description:
      "Reduce human intervention across repeated, supported task families while keeping verification independent.",
  },
  {
    stage: "Stage 3",
    status: "Future target",
    title: "Direct task streams",
    description:
      "Allow customers or platforms to send supported workloads directly into FaultWright. This does not exist today.",
  },
] as const;

export const currentTruth = [
  "Demo V0 proves the verification core under one frozen task and environment.",
  "Autonomous external task intake and execution are under active development.",
  "Not every platform or software-engineering task family is currently supported.",
  "Automation and data handling must be permitted by the platform, customer, and task.",
  "Humans remain necessary for ambiguity, subjective criteria, compliance decisions, exceptions, and required approval.",
] as const;
