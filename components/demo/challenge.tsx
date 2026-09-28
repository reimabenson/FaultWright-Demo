import type { ReactNode } from "react";

import { ChevronDownIcon } from "@/components/ui/icons";
import { Identifier } from "@/components/ui/identifier";
import { Kicker } from "@/components/ui/kicker";
import { Ledger, LedgerRow } from "@/components/ui/ledger";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { demo } from "@/lib/demo";
import { formatIndex, humanizeIdentifier, shortHash } from "@/lib/format";
import { taskPresentation } from "@/lib/presentation";

type FacetProps = {
  label: string;
  /** Where the text comes from, so readers can tell artifact data from editorial framing. */
  source: string;
  children: ReactNode;
};

function Facet({ label, source, children }: FacetProps) {
  return (
    <div className="flex flex-col bg-surface p-5 sm:p-6">
      <dt>
        <Kicker>{label}</Kicker>
      </dt>
      <dd className="mt-3 text-[15px] leading-relaxed text-ink-2">{children}</dd>
      <dd className="mt-auto pt-4 font-mono text-[0.6875rem] leading-5 text-faint">{source}</dd>
    </div>
  );
}

export function Challenge() {
  const { task, scenario, narrative } = demo;
  const summary = task.public_summary;
  const presentation = taskPresentation(task.task_id);

  return (
    <Section id="challenge" labelledBy="challenge-title" tone="surface">
      <SectionHeading
        index="02"
        kicker={`Frozen challenge · ${presentation.shortTitle}`}
        title={summary.title}
        titleId="challenge-title"
        lead={presentation.plainEnglish}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <dl className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:col-span-8">
          <Facet label="Starting condition" source="artifact · task.public_summary.starting_state">
            {summary.starting_state}
          </Facet>
          <Facet label="Expected behavior" source="artifact · task.public_summary.problem_statement">
            {summary.problem_statement}
          </Facet>
          <Facet label="Failure condition" source="editorial · negation of the expected behavior">
            {presentation.failureCondition}
          </Facet>
          <Facet
            label="Verification target"
            source={`artifact · visible tests: ${summary.visible_tests.join(", ")}`}
          >
            {presentation.verificationTarget}
          </Facet>
        </dl>

        <aside aria-labelledby="task-identity-title" className="rounded-md border border-line bg-bg p-5 lg:col-span-4">
          <h3 id="task-identity-title" className="text-sm font-semibold text-ink">
            Task identity
          </h3>
          <p className="mt-1 text-xs text-muted">Shared by every attempt in this record.</p>
          <Ledger className="mt-3">
            <LedgerRow compact label="Task ID" hint="task_id">
              <Identifier value={task.task_id} label="task ID" />
            </LedgerRow>
            <LedgerRow compact label="Environment" hint="environment">
              <Identifier
                value={`${task.environment_id} ${task.environment_version}`}
                label="environment"
                copy={false}
              />
            </LedgerRow>
            <LedgerRow compact label="Fingerprint" hint="task.fingerprint">
              <Identifier
                value={task.fingerprint}
                display={shortHash(task.fingerprint, 8, 6)}
                label="task fingerprint"
              />
            </LedgerRow>
            <LedgerRow compact label="Env. digest" hint="environment_digest">
              <Identifier
                value={task.environment_digest}
                display={shortHash(task.environment_digest, 8, 6)}
                label="environment digest"
              />
            </LedgerRow>
            <LedgerRow compact label="Scenario" hint="scenario_id">
              <Identifier value={scenario.scenario_id} label="scenario ID" variant="plain" copy={false} />
            </LedgerRow>
            <LedgerRow compact label="Category" hint="market_category">
              {humanizeIdentifier(scenario.market_category)}
            </LedgerRow>
          </Ledger>
        </aside>
      </div>

      <details className="group mt-6 rounded-md border border-line bg-surface">
        <summary className="flex items-center justify-between gap-4 rounded-md px-5 py-4 text-sm text-ink">
          <span>
            <span className="font-medium">Engine narrative</span>
            <span className="text-muted">
              {" "}
              — {narrative.length} statements exported with the record
            </span>
          </span>
          <ChevronDownIcon className="shrink-0 text-faint transition-transform group-open:rotate-180" />
        </summary>
        <ol className="grid gap-3 border-t border-line px-5 py-5">
          {narrative.map((statement, index) => (
            <li key={statement} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 text-sm leading-relaxed text-ink-2">
              <span className="font-mono text-xs leading-6 text-faint">{formatIndex(index + 1)}</span>
              <span>{statement}</span>
            </li>
          ))}
        </ol>
      </details>
    </Section>
  );
}
