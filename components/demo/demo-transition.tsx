import { CheckIcon, CrossIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";

export function DemoTransition() {
  return (
    <Section id="demo-v0" labelledBy="demo-v0-title" tone="surface">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:col-span-7">
          <StatusBadge tone="success">Currently demonstrated</StatusBadge>
          <h2 id="demo-v0-title" className="mt-4 text-balance text-title text-ink">
            Demo V0 — Verification Core
          </h2>
          <p className="mt-5 max-w-prose text-lead text-muted">
            The public demo below focuses on one layer of FaultWright: proving that a candidate software
            repair can be evaluated against a frozen task and independently verified.
          </p>
        </div>

        <div className="grid gap-4 lg:col-span-5">
          <div className="flex gap-3 rounded-md border border-success-line bg-success-soft p-4">
            <CheckIcon size={16} className="mt-1 shrink-0 text-success" />
            <p className="text-sm leading-relaxed text-ink-2">
              It demonstrates discriminative verification, canonical outcomes, evidence references,
              artifact integrity, and provenance.
            </p>
          </div>
          <div className="flex gap-3 rounded-md border border-line bg-bg p-4">
            <CrossIcon size={16} className="mt-1 shrink-0 text-faint" />
            <p className="text-sm leading-relaxed text-ink-2">
              It does not demonstrate autonomous intake or execution of an external platform task. Those
              capabilities remain the current build direction.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
