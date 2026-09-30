import { CheckIcon } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { accumulatingCapabilities, productComparison } from "@/lib/product";

function ComparisonColumn({
  label,
  points,
  emphasized = false,
}: {
  label: string;
  points: readonly string[];
  emphasized?: boolean;
}) {
  return (
    <article className="p-5 sm:p-6">
      <Kicker className={emphasized ? "text-accent" : undefined}>{label}</Kicker>
      <ul className="mt-4 space-y-3">
        {points.map((point) => (
          <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-2">
            <CheckIcon
              size={14}
              className={`mt-1.5 shrink-0 ${emphasized ? "text-accent" : "text-faint"}`}
            />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function CapabilityLoop() {
  return (
    <Section id="capabilities" labelledBy="capabilities-title" tone="surface">
      <SectionHeading
        kicker="What accumulates"
        title="Each completed task should leave reusable capability behind"
        titleId="capabilities-title"
        lead="The goal is not only to finish one workload. Repeated tasks should improve the shared system used for the next supported workload."
      />

      <ul className="mt-10 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {accumulatingCapabilities.map((capability) => (
          <li
            key={capability}
            className="flex items-center gap-3 bg-surface px-5 py-4 text-sm font-medium text-ink last:sm:col-span-2"
          >
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
            {capability}
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <div className="max-w-prose">
          <Kicker>Service vs. product direction</Kicker>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Early work may look task-by-task from the outside. The intended structural difference is
            what becomes reusable after each task.
          </p>
        </div>
        <div className="mt-5 grid divide-y divide-line rounded-md border border-line bg-surface shadow-card md:grid-cols-2 md:divide-x md:divide-y-0">
          <ComparisonColumn {...productComparison.service} />
          <ComparisonColumn {...productComparison.product} emphasized />
        </div>
      </div>
    </Section>
  );
}
