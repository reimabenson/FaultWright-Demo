import Link from "next/link";

import { DemoPreview } from "@/components/partner/demo-preview";
import { ArrowUpRightIcon, CheckIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ARTIFACT_PATHS } from "@/lib/demo";
import { technicalProof } from "@/lib/partner";

export function TechnicalProof() {
  return (
    <Section id="proof" labelledBy="proof-title">
      <SectionHeading
        kicker={technicalProof.kicker}
        title={technicalProof.title}
        titleId="proof-title"
        lead={technicalProof.lead}
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:col-span-5">
          <h3 className="text-sm font-semibold text-ink">Demo V0 publishes</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {technicalProof.publishes.map((item) => (
              <li key={item} className="flex gap-3 py-3 text-[15px] leading-6 text-ink-2">
                <CheckIcon size={14} className="mt-1.5 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={technicalProof.cta.href}
              className="inline-flex items-center gap-2 rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
            >
              {technicalProof.cta.label}
              <ArrowUpRightIcon size={14} />
            </Link>
            <a
              href={ARTIFACT_PATHS.demo}
              className="inline-flex items-center gap-1.5 rounded-xs text-sm font-medium text-accent transition-colors hover:text-accent-strong"
            >
              Raw artifact
              <ArrowUpRightIcon size={14} />
            </a>
          </div>
        </div>
        <div className="lg:col-span-7">
          <DemoPreview />
        </div>
      </div>
    </Section>
  );
}
