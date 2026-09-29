import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge, type StatusTone } from "@/components/ui/status-badge";
import { formatIndex } from "@/lib/format";
import { collaboration, type StepOwner } from "@/lib/partner";

const ownerTone: Record<StepOwner, StatusTone> = {
  Collaborator: "accent",
  Founder: "neutral",
  Together: "neutral",
};

export function CollaborationSteps() {
  return (
    <Section id="collaboration" labelledBy="collaboration-title" tone="surface">
      <SectionHeading
        kicker={collaboration.kicker}
        title={collaboration.title}
        titleId="collaboration-title"
        lead={collaboration.lead}
      />

      <ol className="mt-10 divide-y divide-line rounded-md border border-line bg-surface shadow-card">
        {collaboration.steps.map((step, index) => (
          <li
            key={step.title}
            className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 gap-y-2 px-5 py-4 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:items-start sm:gap-x-5 sm:px-6 sm:py-5"
          >
            <span className="pt-0.5 font-mono text-sm font-medium text-accent">{formatIndex(index + 1)}</span>
            <div className="min-w-0">
              <h3 className="text-base font-semibold leading-6 text-ink">{step.title}</h3>
              <p className="mt-1 max-w-prose text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
            <div className="col-start-2 sm:col-start-3 sm:pt-0.5">
              <StatusBadge tone={ownerTone[step.owner]} icon={false}>
                {step.owner}
              </StatusBadge>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <StatusBadge tone="accent" icon={false}>
            Collaborator
          </StatusBadge>
          leads
        </span>
        <span className="inline-flex items-center gap-1.5">
          <StatusBadge tone="neutral" icon={false}>
            Founder
          </StatusBadge>
          leads
        </span>
        <span className="inline-flex items-center gap-1.5">
          <StatusBadge tone="neutral" icon={false}>
            Together
          </StatusBadge>
          shared
        </span>
      </p>
    </Section>
  );
}
