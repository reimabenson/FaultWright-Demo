import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge, type StatusTone } from "@/components/ui/status-badge";
import { formatIndex } from "@/lib/format";
import { systemFlow, type SystemStepState } from "@/lib/product";

const statePresentation: Record<SystemStepState, { label: string; tone: StatusTone }> = {
  direction: { label: "Build direction", tone: "neutral" },
  demonstrated: { label: "Demonstrated", tone: "success" },
  "human-gate": { label: "Human / policy gate", tone: "accent" },
};

export function SystemFlow() {
  return (
    <Section id="system" labelledBy="system-title" tone="surface">
      <SectionHeading
        kicker="Current build direction"
        title="A verification-first task factory"
        titleId="system-title"
        lead="The intended system carries a permitted workload from intake through execution, independent verification, exceptions, and evidence-backed output."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        <StatusBadge tone="neutral" icon={false}>
          Current build direction · end-to-end flow
        </StatusBadge>
        <StatusBadge tone="success">Currently demonstrated · verification core</StatusBadge>
      </div>

      <ol className="mt-8 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {systemFlow.map((step, index) => {
          const state = statePresentation[step.state];
          return (
            <li key={step.title} className="flex min-h-48 flex-col bg-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-xs font-medium text-accent">{formatIndex(index + 1)}</span>
                <StatusBadge tone={state.tone} icon={step.state === "demonstrated"}>
                  {state.label}
                </StatusBadge>
              </div>
              <h3 className="mt-8 text-[15px] font-semibold leading-6 text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 grid gap-5 rounded-md border border-line bg-bg p-5 sm:grid-cols-2 sm:p-6">
        <div>
          <Kicker>Currently demonstrated</Kicker>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            Demo V0 proves that one candidate repair can be evaluated against a frozen task,
            discriminated from no repair, and packaged with auditable evidence.
          </p>
        </div>
        <div>
          <Kicker>Not proved by Demo V0</Kicker>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            The public record does not prove external task intake, policy checks, autonomous planning
            or execution, critic / retry behavior, or direct workload delivery.
          </p>
        </div>
      </div>
    </Section>
  );
}
