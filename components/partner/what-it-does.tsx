import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatIndex } from "@/lib/format";
import { whatItDoes } from "@/lib/partner";

export function WhatItDoes() {
  return (
    <Section id="what" labelledBy="what-title" tone="surface">
      <SectionHeading kicker={whatItDoes.kicker} title={whatItDoes.title} titleId="what-title" />

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="max-w-prose space-y-5 lg:col-span-7">
          {whatItDoes.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lead text-ink-2">
              {paragraph}
            </p>
          ))}
        </div>

        <ol className="grid gap-5 self-start rounded-md border border-line bg-bg p-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:p-6">
          {whatItDoes.flow.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="mt-0.5 w-6 shrink-0 font-mono text-xs font-medium text-accent">
                {formatIndex(index + 1)}
              </span>
              <div>
                <h3 className="text-[15px] font-semibold leading-6 text-ink">{step.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
