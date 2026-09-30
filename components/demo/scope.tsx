import { CrossIcon } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { demo } from "@/lib/demo";
import { formatIndex, humanizeIdentifier } from "@/lib/format";
import { currentTruth } from "@/lib/product";
import { deliverableDescriptions, notClaimed } from "@/lib/presentation";

export function Scope() {
  const deliverables = demo.scenario.expected_deliverables;

  return (
    <Section id="scope" labelledBy="scope-title">
      <SectionHeading
        index="06"
        kicker="Scope"
        title="What this record does and does not claim"
        titleId="scope-title"
        lead="A controlled proof comes before broader claims. The deliverables on the left are the ones the artifact itself lists."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <h3 className="text-sm font-semibold text-ink">Demonstrated</h3>
          <p className="mt-1 font-mono text-[0.6875rem] text-faint">scenario.expected_deliverables</p>
          <ol className="mt-4 divide-y divide-line border-y border-line">
            {deliverables.map((deliverable, index) => (
              <li key={deliverable} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-3.5">
                <span className="font-mono text-xs leading-6 text-accent">{formatIndex(index + 1)}</span>
                <div>
                  <p className="text-sm font-medium leading-6 text-ink">{humanizeIdentifier(deliverable)}</p>
                  {deliverableDescriptions[deliverable] && (
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{deliverableDescriptions[deliverable]}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Not claimed</h3>
          <p className="mt-1 font-mono text-[0.6875rem] text-faint">editorial</p>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {notClaimed.map((item) => (
              <li key={item} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-3.5">
                <CrossIcon size={14} className="mt-1.5 text-faint" />
                <p className="text-sm leading-relaxed text-ink-2">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-line pt-8">
        <Kicker>Honest current state</Kicker>
        <ul className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {currentTruth.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-2">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
