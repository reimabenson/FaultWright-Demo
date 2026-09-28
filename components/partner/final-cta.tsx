import Link from "next/link";

import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { finalCta } from "@/lib/partner";
import { contact } from "@/lib/site";

export function FinalCta() {
  const isExternal = /^https?:/.test(contact.href);

  return (
    <Section id="contact" labelledBy="contact-title">
      <div className="grid gap-8 rounded-md border border-line bg-surface p-6 shadow-card sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
        <div className="lg:col-span-7">
          <Kicker>{finalCta.kicker}</Kicker>
          <h2 id="contact-title" className="mt-4 text-balance text-title text-ink">
            {finalCta.title}
          </h2>
          <p className="mt-5 max-w-prose text-lead text-muted">{finalCta.body}</p>
        </div>
        <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end lg:justify-center">
          <a
            href={contact.href}
            className="inline-flex items-center gap-2 rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
            {...(isExternal ? { rel: "noopener noreferrer", target: "_blank" } : {})}
          >
            {contact.label}
            <ArrowUpRightIcon size={14} />
          </a>
          <Link
            href={finalCta.secondary.href}
            className="inline-flex items-center gap-1.5 rounded-xs text-sm font-medium text-accent transition-colors hover:text-accent-strong"
          >
            {finalCta.secondary.label}
            <ArrowUpRightIcon size={14} />
          </Link>
          {!contact.configured && <p className="text-xs text-faint lg:text-right">{finalCta.fallbackNote}</p>}
        </div>
      </div>
    </Section>
  );
}
