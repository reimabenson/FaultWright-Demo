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
  headline: "Building reproducible software-repair tasks for AI evaluation.",
  lead:
    "FaultWright turns a software failure into a task whose repair can be verified rather than merely reviewed. The technical core exists and one complete evaluation is published as a frozen public record. The work now is commercial: finding the first paid engagements and learning which use cases repeat.",
  supporting:
    "I can carry the technical execution. I am looking for a US-side collaborator who can carry the commercial conversations.",
  primaryCta: { label: "View technical demo", href: "/" },
  brief: [
    { label: "Stage", value: "Technical core built; commercialization beginning" },
    { label: "Looking for", value: "A US-side commercial collaborator" },
    { label: "Their role", value: "Opportunities, customer conversations, proposals, relationships" },
    { label: "Coding", value: "Not required" },
    { label: "Model", value: "Project revenue split initially; company economics later, separately" },
  ],
} as const;

export const whatItDoes = {
  kicker: "What FaultWright does",
  title: "A patch is a claim. Restored behavior is evidence.",
  paragraphs: [
    "When a coding system produces a patch, the patch alone does not show that the software has recovered. It can compile, look reasonable, and still leave the original failure in place. Reading a diff is a judgment. Checking behavior is a measurement.",
    "FaultWright starts with software that is known to work, introduces one controlled and reproducible fault, lets a repair be attempted, and then checks whether the expected behavior is actually restored. The task, the environment and the verification are frozen together, so the same case can be run again and give the same answer.",
    "Each verified case is a reusable unit: a reproducible problem, a controlled environment, and a verifier that has been shown to accept a genuine repair and reject a missing one. Sets of such cases can be useful for evaluating AI software-repair systems, and potentially for training them.",
  ],
  flow: [
    { title: "Working software", description: "Expected behavior is known and observable." },
    { title: "Controlled fault", description: "One reproducible failure is introduced and frozen." },
    { title: "Repair attempt", description: "A candidate fix is applied under the same conditions." },
    { title: "Behavioral check", description: "Verification decides whether behavior is restored." },
  ],
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
      label: "Technical core",
      status: "Built",
      tone: "accent",
      detail: "Task construction, controlled environments and behavioral verification run end to end.",
    },
    {
      label: "Public Demo V0",
      status: "Available",
      tone: "accent",
      detail: "One frozen evaluation record, published with hashed, independently checkable artifacts.",
      href: "/",
    },
    {
      label: "Commercialization",
      status: "Beginning",
      tone: "neutral",
      detail: "The first paid engagements are the current objective.",
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
  title: "The technical side is covered. The commercial side is open.",
  lead: "I can build, run and deliver the technical work. What I cannot do well from where I sit is find and hold the commercial conversations in the US market.",
  founder: {
    title: "Founder",
    subtitle: "Technical execution",
    items: [
      "Designing and constructing evaluation tasks",
      "Environments, faults and verification",
      "Delivering the technical work for each engagement",
      "Engineering decisions and technical customer questions",
    ],
  },
  collaborator: {
    title: "Collaborator",
    subtitle: "Commercial execution",
    items: [
      "Identifying paid opportunities",
      "Customer discovery",
      "Contacting potential clients",
      "Business conversations and proposals",
      "Contracts and commercial relationships",
      "Learning which use cases have repeatable demand",
    ],
  },
  callout: {
    headline: "No coding is required.",
    body: "Technical contribution is welcome where it is genuinely useful, but it is not the role. The role is commercial.",
  },
} as const;

export const arrangement = {
  kicker: "Initial revenue arrangement",
  title: "A project-level split to begin with",
  statements: [
    "For early paid client work that we bring in together, the current proposal is to split collected project revenue 50/50 after any mutually agreed direct project expenses.",
    "This is an initial project-level collaboration model. If FaultWright develops into a formal company, long-term company ownership and economics would be discussed separately.",
  ],
  clarification:
    "This describes an independent collaboration between two people, not employment, and it is a starting point for discussion rather than a finished agreement.",
} as const;

export const technicalProof = {
  kicker: "Technical proof",
  title: "See what's actually built",
  lead: "Demo V0 publishes a frozen evaluation record. It is the same evidence a technical reviewer would ask for, and anyone can inspect it.",
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
        "Yes, at demonstration scale. The technical core runs end to end, and Demo V0 is a frozen record of one complete evaluation: a webhook-idempotency task, two pipeline controls, verified outcomes and hashed artifacts. It is a working system, not yet a product with customers.",
    },
    {
      question: "Do I need to code?",
      answer:
        "No. Technical execution is my responsibility. The useful contribution is commercial: finding paid opportunities, holding customer conversations, writing proposals and building relationships. If you also want to contribute technically and it is genuinely useful, that is welcome, but it is not the role.",
    },
    {
      question: "Are there paying customers already?",
      answer:
        "Not yet. Commercialization is beginning now. The first goal is a small number of paid engagements, chosen to learn which use cases have repeatable demand.",
    },
    {
      question: "Why focus on the US market?",
      answer:
        "Much of the buying for coding-AI evaluation and training data is concentrated in US-based labs and data vendors. Those conversations go better with someone who can hold them from inside the market, in the same time zones and business culture. That is the gap I am trying to fill.",
    },
    {
      question: "Is FaultWright already a company?",
      answer:
        "No. It is a founder-led project. If it develops into a formal company, ownership and economics would be discussed separately from the initial project-level revenue arrangement described above.",
    },
    {
      question: "How much of the technical mechanism is public?",
      answer:
        "The evaluation philosophy, the inputs and outputs, and the frozen Demo V0 artifacts are public on this site. The engine itself, meaning task construction, environments, verifiers and reference material, is private.",
    },
  ],
};

export const finalCta = {
  kicker: "Next step",
  title: "Interested in exploring it?",
  body: "If the direction sounds relevant to your background, the next step is simply a conversation. We can compare what each of us wants, discuss the commercial model, and decide whether there is a useful way to work together.",
  secondary: { label: "View technical demo", href: "/" },
} as const;
