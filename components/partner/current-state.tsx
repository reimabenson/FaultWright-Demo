import Link from "next/link";

import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge } from "@/components/ui/status-badge";
import { currentState } from "@/lib/partner";

export function CurrentState() {
  return (
    <Section id="state" labelledBy="state-title">
      <SectionHeading
        kicker={currentState.kicker}
        title={currentState.title}
        titleId="state-title"
        lead={currentState.lead}
      />

      <dl className="mt-10 divide-y divide-line rounded-md border border-line bg-surface shadow-card">
        {currentState.rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-2 px-5 py-4 sm:grid-cols-[11rem_9rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:px-6"
          >
            <dt className="text-sm font-semibold text-ink">{row.label}</dt>
            <dd>
              <StatusBadge tone={row.tone} icon={false}>
                {row.status}
              </StatusBadge>
            </dd>
            <dd className="text-sm leading-relaxed text-muted">
              {row.detail}
              {row.href && (
                <>
                  {" "}
                  <Link
                    href={row.href}
                    className="inline-flex items-center gap-1 rounded-xs font-medium text-accent transition-colors hover:text-accent-strong"
                  >
                    Open the demo
                    <ArrowUpRightIcon size={12} />
                  </Link>
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
