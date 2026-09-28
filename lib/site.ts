import { ARTIFACT_PATHS } from "@/lib/demo";

function resolveSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);

  return new URL(`http://localhost:${process.env.PORT ?? "3000"}`);
}

const repoUrl = "https://github.com/reimabenson/FaultWright-Demo";

export const site = {
  name: "FaultWright",
  descriptor: "Software repair evaluation",
  title: "FaultWright — Verifiable software repair evaluation",
  description:
    "FaultWright evaluates whether a software repair actually restores expected behavior. Demo V0 is a frozen evaluation record: one webhook-idempotency task, two deterministic pipeline controls, hashed public artifacts.",
  url: resolveSiteUrl(),
  repoUrl,
} as const;

export const partnerPage = {
  path: "/partner",
  title: "Partner brief",
  description:
    "FaultWright builds reproducible software-repair tasks for AI evaluation. The technical core is built and publicly demonstrated; the current focus is commercialization with a US-side collaborator. No coding required.",
} as const;

export type NavItem = {
  href: string;
  label: string;
  /** Keep visible in the compact mobile header. */
  primaryOnMobile?: boolean;
};

export type CrossLink = {
  href: string;
  label: string;
  /** Render as an outlined button that stays visible on mobile. */
  prominent: boolean;
};

export type HeaderConfig = {
  /** Where the brand mark links. */
  home: string;
  descriptor: string;
  nav: NavItem[];
  crossLink: CrossLink;
};

export const headers: Record<"demo" | "partner", HeaderConfig> = {
  demo: {
    home: "#top",
    descriptor: site.descriptor,
    nav: [
      { href: "#method", label: "Method", primaryOnMobile: true },
      { href: "#challenge", label: "Challenge" },
      { href: "#controls", label: "Controls" },
      { href: "#evidence", label: "Evidence", primaryOnMobile: true },
      { href: "#artifacts", label: "Artifacts", primaryOnMobile: true },
    ],
    crossLink: { href: partnerPage.path, label: "Partner brief", prominent: false },
  },
  partner: {
    home: "/",
    descriptor: partnerPage.title,
    nav: [
      { href: "#what", label: "What it does" },
      { href: "#collaboration", label: "Collaboration" },
      { href: "#proof", label: "Proof" },
      { href: "#faq", label: "FAQ" },
    ],
    crossLink: { href: "/", label: "Technical demo", prominent: true },
  },
};

export type FooterLink = { href: string; label: string; external?: boolean };

export const footers: Record<"demo" | "partner", FooterLink[]> = {
  demo: [
    { href: ARTIFACT_PATHS.demo, label: "Raw artifact" },
    { href: ARTIFACT_PATHS.freeze, label: "Freeze manifest" },
    { href: partnerPage.path, label: "Partner brief" },
    { href: repoUrl, label: "GitHub", external: true },
  ],
  partner: [
    { href: "/", label: "Technical demo" },
    { href: ARTIFACT_PATHS.demo, label: "Raw artifact" },
    { href: repoUrl, label: "GitHub", external: true },
  ],
};

export type Contact = {
  href: string;
  label: string;
  /** False when no destination is configured and the CTA falls back to the repository. */
  configured: boolean;
};

/**
 * Destination of the "start a conversation" call to action on /partner.
 *
 * Set NEXT_PUBLIC_CONTACT_URL to a `mailto:` address, a scheduling link, or a
 * form URL. Until it is set, the CTA points at the public repository, which is
 * the only contact surface this project currently publishes. No address is
 * invented here.
 */
function resolveContact(): Contact {
  const raw = process.env.NEXT_PUBLIC_CONTACT_URL?.trim();
  if (!raw) {
    return { href: repoUrl, label: "Reach out via GitHub", configured: false };
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`NEXT_PUBLIC_CONTACT_URL is not a valid URL: "${raw}"`);
  }
  if (!["https:", "http:", "mailto:"].includes(url.protocol)) {
    throw new Error(`NEXT_PUBLIC_CONTACT_URL must use https:, http:, or mailto:; got "${url.protocol}"`);
  }

  return { href: url.toString(), label: "Start a conversation", configured: true };
}

export const contact: Contact = resolveContact();
