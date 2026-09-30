import { AlertIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatIndex } from "@/lib/format";
import { platformRationale } from "@/lib/product";

export function ProvingGround() {
  return (
    <Section id="proving-ground" labelledBy="proving-ground-title">
      <SectionHeading
        kicker={platformRationale.kicker}
        title={platformRationale.title}
        titleId="proving-ground-title"
        lead={platformRationale.lead}
      />

      <ol className="mt-10 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {platformRationale.reasons.map((reason, index) => (
          <li key={reason.title} className="bg-surface p-5 sm:p-6">
            <span className="font-mono text-xs font-medium text-accent">{formatIndex(index + 1)}</span>
            <h3 className="mt-5 text-base font-semibold text-ink">{reason.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{reason.description}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-md border border-accent/20 bg-accent-soft p-5 sm:p-6">
        <p className="text-balance text-xl font-semibold tracking-tight text-accent-strong sm:text-2xl">
          {platformRationale.conclusion}
        </p>
        <p className="mt-4 flex max-w-prose gap-3 text-sm leading-relaxed text-ink-2">
          <AlertIcon size={16} className="mt-1 shrink-0 text-accent" />
          <span>{platformRationale.constraint}</span>
        </p>
      </div>
    </Section>
  );
}
