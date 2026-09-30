import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge } from "@/components/ui/status-badge";
import { nearTermRoadmap } from "@/lib/product";

export function NearTermRoadmap() {
  return (
    <Section id="roadmap" labelledBy="roadmap-title">
      <SectionHeading
        kicker="Near-term roadmap"
        title="From paid proving ground to direct task streams"
        titleId="roadmap-title"
        lead="This is the current market-entry horizon, not a claim that all three stages exist today."
      />

      <ol className="mt-10 grid gap-6 md:grid-cols-3">
        {nearTermRoadmap.map((item, index) => (
          <li key={item.stage} className="flex min-h-64 flex-col rounded-md border border-line bg-surface p-5 shadow-card sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <Kicker>{item.stage}</Kicker>
              <StatusBadge tone={index === 0 ? "accent" : "neutral"} icon={false}>
                {item.status}
              </StatusBadge>
            </div>
            <h3 className="mt-12 text-xl font-semibold tracking-tight text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
