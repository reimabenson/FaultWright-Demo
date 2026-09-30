import { ARTIFACT_PATHS } from "@/lib/demo";

function resolveSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);

  return new URL(`http://localhost:${process.env.PORT ?? "3000"}`);
}

export const site = {
  name: "FaultWright",
  descriptor: "Verification-first task factory",
  title: "FaultWright — Verification-first AI-training task factory",
  description:
    "FaultWright is being built to autonomously execute permitted software-engineering AI-training tasks, independently verify the result, and produce auditable evidence.",
  url: resolveSiteUrl(),
} as const;

export const partnerPage = {
  path: "/partner",
  title: "Partner brief",
  description:
    "A partner brief for building FaultWright: a reusable, verification-first system for permitted software-engineering AI-training workloads.",
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
      { href: "#system", label: "Direction", primaryOnMobile: true },
      { href: "#proving-ground", label: "Proving ground" },
      { href: "#capabilities", label: "System asset" },
      { href: "#demo-v0", label: "Demo V0", primaryOnMobile: true },
      { href: "#evidence", label: "Evidence", primaryOnMobile: true },
    ],
    crossLink: { href: partnerPage.path, label: "Partner brief", prominent: false },
  },
  partner: {
    home: "/",
    descriptor: partnerPage.title,
    nav: [
      { href: "#what", label: "Direction" },
      { href: "#roles", label: "Role" },
      { href: "#proof", label: "Proof" },
      { href: "#faq", label: "FAQ" },
    ],
    crossLink: { href: "/", label: "Technical demo", prominent: true },
  },
};

export type FooterLink = { href: string; label: string };

export const footers: Record<"demo" | "partner", FooterLink[]> = {
  demo: [
    { href: ARTIFACT_PATHS.demo, label: "Raw artifact" },
    { href: ARTIFACT_PATHS.freeze, label: "Freeze manifest" },
    { href: partnerPage.path, label: "Partner brief" },
  ],
  partner: [
    { href: "/", label: "Technical demo" },
    { href: ARTIFACT_PATHS.demo, label: "Raw artifact" },
  ],
};

export type Contact =
  | { configured: true; href: string; label: "Start a conversation" }
  | { configured: false };

/**
 * Destination of the "start a conversation" call to action on /partner.
 *
 * Set NEXT_PUBLIC_CONTACT_URL to a `mailto:` address, a scheduling link, or a
 * form URL. Until it is set, the page shows no contact link at all. No
 * address, and no source-repository link, is invented here.
 */
function resolveContact(): Contact {
  const raw = process.env.NEXT_PUBLIC_CONTACT_URL?.trim();
  if (!raw) {
    return { configured: false };
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

  return { configured: true, href: url.toString(), label: "Start a conversation" };
}

export const contact: Contact = resolveContact();
