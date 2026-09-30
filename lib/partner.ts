/*
 * Editorial content for /partner.
 *
 * Everything here is commercial framing written by the founder. None of it
 * comes from, or is written into, the frozen evaluation artifact. Facts about
 * the demo (task, controls, outcomes) are read from `lib/demo.ts` by the
 * components that need them.
 */

export const partnerHero = {
  kicker: "Partner brief",
  headline: "Build the commercial path for a verification-first task factory.",
  lead:
    "FaultWright is being built to autonomously execute permitted software-engineering AI-training tasks, independently verify the result, and produce auditable evidence. Demo V0 proves the verification core; the wider execution system is under active development.",
  supporting:
    "The first marketplaces give us real work to prove the system against; they are not the product we are trying to build.",
  primaryCta: { label: "View technical demo", href: "/" },
  brief: [
    { label: "Stage", value: "Verification core demonstrated; execution system in development" },
    { label: "Near-term input", value: "Permitted AI-training platform workloads" },
    { label: "Looking for", value: "A US-side commercial collaborator" },
    { label: "Their role", value: "Workload sources, rules, commercial operations, product feedback" },
    { label: "Coding", value: "Not required" },
    { label: "Product path", value: "Paid proving ground → reusable execution → direct task streams" },
  ],
} as const;

export const whatItDoes = {
  kicker: "What FaultWright does",
  title: "Real workloads become verified outputs—and reusable system capability.",
  paragraphs: [
    "FaultWright is intended to receive permitted software-engineering AI-training tasks, normalize their instructions and acceptance requirements, plan the work, and execute supported task families with as little human intervention as the task safely allows.",
    "The solver does not certify itself. FaultWright independently verifies the result, checks for failure modes or shortcuts, retries when the evidence supports it, and packages the outcome for review.",
    "The current public demo proves that verification layer under one frozen repair task. It does not yet prove autonomous intake and execution of external platform tasks.",
  ],
  flow: [
    { title: "Permitted workload", description: "A real task whose rules allow the planned automation and data handling." },
    { title: "Intake and plan", description: "Normalize instructions, acceptance requirements, environment, and execution steps." },
    { title: "Autonomous execution", description: "Perform the supported engineering work and escalate unsupported or ambiguous cases." },
    { title: "Independent verification", description: "Evaluate, critique, retry if warranted, and package auditable evidence." },
  ],
} as const;

export const productModel = {
  kicker: "Proving ground vs. product",
  title: "The work is the input. The reusable system is the asset.",
  lead:
    "Early platform tasks matter because they expose FaultWright to real requirements, rejection criteria, and operating constraints. Repeated work should become shared product capability rather than staying informal task knowledge.",
  conclusion:
    "The first marketplaces give us real work to prove the system against; they are not the product we are trying to build.",
} as const;

export type StateTone = "accent" | "neutral";

export type StateRow = {
  label: string;
  status: string;
  tone: StateTone;
  detail: string;
  href?: string;
};

export const currentState: { kicker: string; title: string; lead: string; rows: StateRow[] } = {
  kicker: "Current state",
  title: "Where things stand",
  lead: "A precise picture of the present, so the conversation can start from the same facts.",
  rows: [
    {
      label: "Verification core",
      status: "Built",
      tone: "accent",
      detail: "Demo V0 shows discriminative verification, canonical outcomes, evidence, and artifact integrity.",
    },
    {
      label: "Autonomous task factory",
      status: "In development",
      tone: "neutral",
      detail: "External intake, normalization, planning, execution, critic / retry, and result packaging are the active build direction.",
    },
    {
      label: "Platform / task coverage",
      status: "Selective",
      tone: "neutral",
      detail: "Not every platform or software-engineering task family is supported. Permission and compliance are required gates.",
    },
    {
      label: "Commercialization",
      status: "Beginning",
      tone: "neutral",
      detail: "The first target is permitted platform workloads that provide real feedback and early revenue.",
    },
    {
      label: "Paying customers",
      status: "None to date",
      tone: "neutral",
      detail: "No revenue or adoption is claimed.",
    },
    {
      label: "Formal company",
      status: "Not yet formed",
      tone: "neutral",
      detail: "Founder-led project. A formal entity would follow if the work warrants it.",
    },
  ],
};

export const roles = {
  kicker: "Why another person is useful",
  title: "The product owns technical execution. The collaborator opens and interprets the market.",
  lead:
    "I own the FaultWright system and technical execution. The collaborator helps find more high-value tasks for current step.",
  founder: {
    title: "Founder",
    subtitle: "System / technical execution",
    items: [
      "Task intake, normalization, and execution architecture",
      "Solver orchestration, environments, and supported automation",
      "Independent verification, critic behavior, retry logic, and evidence",
      "Turning repeated workload patterns into reusable product capability",
      "Technical delivery and engineering decisions",
      "Submission of a high-quality, flawless deliverable",
    ],
  },
  collaborator: {
    title: "Collaborator",
    subtitle: "Workloads / commercial operations",
    items: [
      "Find relevant AI-training and software-engineering workload sources",
      "Understand platform and customer rules",
      "Identify task families compatible with FaultWright",
      "Support communication, contracts, and payment operations",
      "Secure more paid work from platforms ultimately",
    ],
  },
  callout: {
    headline: "No coding is required.",
    body:
      "Technical contribution is welcome where it is genuinely useful, but it is not the role. This is a securing high-value paid contracts role—not recruitment for a manual task-delivery team.",
  },
} as const;

export const arrangement = {
  kicker: "Initial revenue arrangement",
  title: "A project-level model for the paid proving ground",
  statements: [
    "For early paid platform or customer work that we bring in together, the current proposal is to split collected project revenue 50/50 after any mutually agreed direct project expenses.",
    "This applies to early project revenue while real workloads validate the reusable FaultWright system. If FaultWright develops into a formal company, long-term company ownership and economics would be discussed separately.",
  ],
  clarification:
    "This describes an independent collaboration between two people, not employment, and it is a starting point for discussion rather than a finished agreement.",
} as const;

export const technicalProof = {
  kicker: "Technical proof",
  title: "Demo V0 proves the verification core",
  lead:
    "The frozen record below demonstrates independent repair evaluation and auditable evidence. It does not claim autonomous intake or execution of an external platform task.",
  publishes: [
    "Task identity: task ID, environment, fingerprint",
    "Controlled pipeline-validation attempts",
    "Verification outcomes and capability verdicts",
    "Evidence references and attempt identifiers",
    "Artifact digests verified at build time",
    "Independently inspectable JSON records",
  ],
  cta: { label: "Open Demo V0", href: "/" },
} as const;

export type FaqItem = { question: string; answer: string };

export const faq: { kicker: string; title: string; items: FaqItem[] } = {
  kicker: "Questions",
  title: "Likely questions, answered plainly",
  items: [
    {
      question: "Is FaultWright already working?",
      answer:
        "The verification core is working at demonstration scale. Demo V0 is one complete frozen evaluation with pipeline controls, verified outcomes, and hashed artifacts. Autonomous external task intake and execution are under active development.",
    },
    {
      question: "Do I need to code?",
      answer:
        "No. The useful contribution is commercial and operational: finding workload sources, understanding rules, identifying compatible tasks, supporting relationships and payments, and returning external feedback to the product.",
    },
    {
      question: "Is this an outsourcing operation?",
      answer:
        "Early workloads may arrive task by task, but the objective is to move repeated execution, verification, retry behavior, and evidence generation into reusable software.",
    },
    {
      question: "Are there paying customers already?",
      answer:
        "Not yet. Existing platforms are the intended near-term entry point because they contain real workloads and acceptance feedback. No revenue, direct task stream, or guaranteed demand is claimed today.",
    },
    {
      question: "Why focus on the US market?",
      answer:
        "Many relevant AI-training platforms, labs, and data vendors operate in the US market. A US-side collaborator can better understand their rules, workload needs, time zones, contracts, and payment operations.",
    },
    {
      question: "Is FaultWright already a company?",
      answer:
        "No. It is a founder-led project. If it develops into a formal company, ownership and economics would be discussed separately from the initial project-level revenue arrangement described above.",
    },
  ],
};

export const finalCta = {
  kicker: "Next step",
  title: "Interested in the product direction?",
  body:
    "If this path matches your commercial background, the next step is simply a conversation about workload sources, platform rules, the initial project model, and whether there is a useful way to work together.",
  secondary: { label: "View technical demo", href: "/" },
} as const;
