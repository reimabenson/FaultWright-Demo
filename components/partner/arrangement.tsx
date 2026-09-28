import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { arrangement } from "@/lib/partner";

export function Arrangement() {
  const [proposal, scope] = arrangement.statements;

  return (
    <Section id="arrangement" labelledBy="arrangement-title">
      <SectionHeading kicker={arrangement.kicker} title={arrangement.title} titleId="arrangement-title" />

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <div className="rounded-md border border-line bg-surface p-6 shadow-card sm:p-8 lg:col-span-8">
          <p className="max-w-[46rem] text-balance text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl">
            {proposal}
          </p>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-2">{scope}</p>
        </div>
        <aside className="rounded-md border border-line bg-bg p-5 text-sm leading-relaxed text-muted lg:col-span-4 lg:self-start">
          {arrangement.clarification}
        </aside>
      </div>
    </Section>
  );
}
