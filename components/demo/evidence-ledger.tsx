import type { ReactNode } from "react";

import { Identifier } from "@/components/ui/identifier";
import { Ledger, LedgerRow } from "@/components/ui/ledger";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge } from "@/components/ui/status-badge";
import { attemptIdFor, demo, isAccepted, type EvidenceReference } from "@/lib/demo";
import { formatIndex, formatUtc, humanizeIdentifier } from "@/lib/format";
import { controlPresentation } from "@/lib/presentation";

type EvidenceGroupProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function EvidenceGroup({ title, description, children }: EvidenceGroupProps) {
  return (
    <section
      aria-label={title}
      className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10"
    >
      <div className="lg:pt-3.5">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

const referenceKindLabels: Record<EvidenceReference["kind"], string> = {
  task_fingerprint: "Task fingerprint",
  environment_execution_digest: "Environment execution digest",
  attempt: "Attempt record",
  patch_sha256: "Patch digest",
};

function ReferenceValue({ reference }: { reference: EvidenceReference }) {
  if (reference.kind === "attempt") {
    return (
      <dl className="grid gap-1.5 text-xs leading-5 text-muted sm:grid-cols-[4.5rem_minmax(0,1fr)]">
        <dt>attempt_id</dt>
        <dd>
          <Identifier value={reference.attempt_id} label="attempt ID" />
        </dd>
        <dt>profile_id</dt>
        <dd>
          <Identifier value={reference.profile_id} label="profile ID" />
        </dd>
        <dt>solver_id</dt>
        <dd>
          <Identifier value={reference.solver_id} label="solver ID" />
        </dd>
      </dl>
    );
  }
  return (
    <Identifier
      variant="hash"
      value={reference.sha256}
      label={`${referenceKindLabels[reference.kind].toLowerCase()} SHA-256`}
    />
  );
}

export function EvidenceLedger() {
  const { task, scenario, attempts, evidence_refs: references } = demo;

  return (
    <Section id="evidence" labelledBy="evidence-title" tone="surface">
      <SectionHeading
        index="04"
        kicker="Technical evidence"
        title="Verification record"
        titleId="evidence-title"
        lead="Every value below is read from the frozen artifact. Digests are shown in full so they can be compared byte for byte with the raw file."
      />

      <div className="mt-12 divide-y divide-line rounded-md border border-line bg-surface shadow-card">
        <EvidenceGroup title="Run" description="Identity and provenance of this evaluation run.">
          <Ledger>
            <LedgerRow label="Run ID" hint="run_id">
              <Identifier variant="hash" value={demo.run_id} label="run ID" />
            </LedgerRow>
            <LedgerRow label="Created" hint="created_at">
              {formatUtc(demo.created_at)}{" "}
              <span className="font-mono text-xs text-faint">({demo.created_at})</span>
            </LedgerRow>
            <LedgerRow label="Schema" hint="schema">
              <Identifier value={demo.schema} label="schema" copy={false} />
            </LedgerRow>
            <LedgerRow label="Scenario" hint="scenario.scenario_id">
              <Identifier value={scenario.scenario_id} label="scenario ID" />
            </LedgerRow>
            <LedgerRow label="Category" hint="scenario.market_category">
              {humanizeIdentifier(scenario.market_category)}
            </LedgerRow>
            <LedgerRow label="Description" hint="scenario.short_description">
              <span className="text-ink-2">{scenario.short_description}</span>
            </LedgerRow>
          </Ledger>
        </EvidenceGroup>

        <EvidenceGroup title="Task identity" description="The frozen task and environment shared by every attempt.">
          <Ledger>
            <LedgerRow label="Task ID" hint="task.task_id">
              <Identifier value={task.task_id} label="task ID" />
            </LedgerRow>
            <LedgerRow label="Title" hint="task.public_summary.title">
              <span className="text-ink-2">{task.public_summary.title}</span>
            </LedgerRow>
            <LedgerRow label="Environment" hint="environment_id · environment_version">
              <Identifier value={`${task.environment_id} ${task.environment_version}`} label="environment" copy={false} />
            </LedgerRow>
            <LedgerRow label="Task fingerprint" hint="task.fingerprint">
              <Identifier variant="hash" value={task.fingerprint} label="task fingerprint" />
            </LedgerRow>
            <LedgerRow label="Environment digest" hint="task.environment_digest">
              <Identifier variant="hash" value={task.environment_digest} label="environment digest" />
            </LedgerRow>
            <LedgerRow label="Visible tests" hint="public_summary.visible_tests">
              <ul className="flex flex-wrap gap-1.5">
                {task.public_summary.visible_tests.map((test) => (
                  <li key={test}>
                    <Identifier value={test} label="visible test path" copy={false} />
                  </li>
                ))}
              </ul>
            </LedgerRow>
          </Ledger>
        </EvidenceGroup>

        {attempts.map((attempt) => {
          const presentation = controlPresentation(attempt.profile_id);
          const accepted = isAccepted(attempt);
          const attemptId = attemptIdFor(attempt);
          return (
            <EvidenceGroup
              key={attempt.profile_id}
              title={`Attempt · ${attempt.solver_label}`}
              description={presentation.role}
            >
              <Ledger>
                <LedgerRow label="Attempt ID" hint="evidence_refs[].attempt_id">
                  {attemptId ? (
                    <Identifier value={attemptId} label="attempt ID" />
                  ) : (
                    <span className="text-muted">Not recorded</span>
                  )}
                </LedgerRow>
                <LedgerRow label="Profile" hint="profile_id">
                  <Identifier value={attempt.profile_id} label="profile ID" />
                </LedgerRow>
                <LedgerRow label="Solver" hint="solver_id">
                  <Identifier value={attempt.solver_id} label="solver ID" />
                </LedgerRow>
                <LedgerRow label="Outcome" hint="canonical_outcome">
                  <StatusBadge tone={accepted ? "success" : "failure"}>{attempt.canonical_outcome}</StatusBadge>
                </LedgerRow>
                <LedgerRow label="Verdict" hint="canonical_capability_verdict">
                  <span className="font-mono text-[0.8125rem]">{attempt.canonical_capability_verdict}</span>
                </LedgerRow>
                <LedgerRow label="Verification phase" hint="verification_phase">
                  <span className="font-mono text-[0.8125rem]">{attempt.verification_phase}</span>
                </LedgerRow>
                <LedgerRow label="Patch SHA-256" hint="patch_sha256">
                  {attempt.patch_sha256 ? (
                    <Identifier variant="hash" value={attempt.patch_sha256} label="patch SHA-256" />
                  ) : (
                    <span className="text-muted">Empty — no patch was submitted</span>
                  )}
                </LedgerRow>
                <LedgerRow label="Summary" hint="human_summary">
                  {attempt.human_summary}
                </LedgerRow>
              </Ledger>
            </EvidenceGroup>
          );
        })}

        <EvidenceGroup
          title="Evidence references"
          description={`${references.length} references exported with the record, in artifact order.`}
        >
          <ol className="divide-y divide-line">
            {references.map((reference, index) => (
              <li
                key={`${reference.kind}-${index}`}
                className="grid gap-2 py-3 sm:grid-cols-[2rem_11rem_minmax(0,1fr)] sm:gap-4 sm:py-3.5"
              >
                <span className="font-mono text-xs leading-5 text-faint">{formatIndex(index + 1)}</span>
                <div>
                  <p className="text-xs font-medium leading-5 text-muted">{referenceKindLabels[reference.kind]}</p>
                  <p className="font-mono text-[0.6875rem] leading-5 text-faint">{reference.kind}</p>
                </div>
                <div className="min-w-0 text-sm">
                  <ReferenceValue reference={reference} />
                </div>
              </li>
            ))}
          </ol>
        </EvidenceGroup>
      </div>
    </Section>
  );
}
