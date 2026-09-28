import { AttemptCard } from "@/components/demo/attempt-card";
import { ControlConsistency } from "@/components/demo/control-consistency";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { demo } from "@/lib/demo";

export function ControlComparison() {
  const { attempts } = demo;

  return (
    <Section id="controls" labelledBy="controls-title">
      <SectionHeading
        index="03"
        kicker="Pipeline controls"
        title="Two controls. One frozen task."
        titleId="controls-title"
        lead="These controls verify that the evaluation pipeline distinguishes a valid repair from no repair under the same frozen task and environment. They are deterministic references, not competing AI models."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {attempts.map((attempt, index) => (
          <AttemptCard key={attempt.profile_id} attempt={attempt} index={index + 1} total={attempts.length} />
        ))}
      </div>

      <ControlConsistency attempts={attempts} />
    </Section>
  );
}
