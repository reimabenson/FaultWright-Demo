import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { demo } from "@/lib/demo";
import { formatIndex } from "@/lib/format";
import { methodSteps } from "@/lib/presentation";

/** Artifact-derived metadata attached to each method step, by step index. */
function stepMetadata(): Array<string | undefined> {
  const { task, attempts } = demo;
  const outcomes = attempts
    .map((attempt) => `${attempt.canonical_outcome} · ${attempt.canonical_capability_verdict}`)
    .join("  /  ");

  return [
    undefined,
    `task ${task.task_id}`,
    `environment ${task.environment_id} ${task.environment_version}`,
    `${attempts.length} controlled attempts in this record`,
    `visible tests: ${task.public_summary.visible_tests.join(", ")}`,
    outcomes,
  ];
}

export function EvaluationFlow() {
  const metadata = stepMetadata();

  return (
    <Section id="method" labelledBy="method-title">
      <SectionHeading
        index="01"
        kicker="Verification core method"
        title="How Demo V0 evaluates a repair"
        titleId="method-title"
        lead="Six steps, all bound to one frozen task identity. This is the verification layer of the broader system, and its output is a behavioral outcome rather than an opinion about the diff."
      />

      <ol className="mt-12 grid gap-y-9 border-t border-line pt-8 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-6">
        {methodSteps.map((step, index) => (
          <li key={step.title} className="flex gap-4 sm:block">
            <div className="flex items-center gap-3">
              <span className="w-6 shrink-0 font-mono text-xs font-medium text-accent">{formatIndex(index + 1)}</span>
              <span aria-hidden="true" className="hidden h-px flex-1 bg-line sm:block" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold leading-6 text-ink sm:mt-5">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              {metadata[index] && (
                <p className="mt-3 break-words font-mono text-[0.6875rem] leading-5 text-faint">{metadata[index]}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
