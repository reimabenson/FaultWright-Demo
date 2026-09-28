import { Identifier } from "@/components/ui/identifier";
import { Kicker } from "@/components/ui/kicker";
import { StatusBadge } from "@/components/ui/status-badge";
import { demo, type DemoAttempt } from "@/lib/demo";
import { humanizeIdentifier, shortHash } from "@/lib/format";
import { controlPresentation } from "@/lib/presentation";

/**
 * Compares each control's expected result (presentation metadata) with the
 * observed result (artifact). The agreement is computed, not asserted, so a
 * record in which the evaluator misbehaved would be reported as inconsistent.
 */
export function ControlConsistency({ attempts }: { attempts: DemoAttempt[] }) {
  const { task } = demo;
  const rows = attempts.map((attempt) => {
    const presentation = controlPresentation(attempt.profile_id);
    const consistent =
      attempt.canonical_outcome === presentation.expected.outcome &&
      attempt.canonical_capability_verdict === presentation.expected.verdict;
    return { attempt, presentation, consistent };
  });
  const allConsistent = rows.every((row) => row.consistent);

  return (
    <div className="mt-6 grid gap-8 rounded-md border border-line bg-surface p-5 sm:p-6 lg:grid-cols-12 lg:gap-10 lg:p-8">
      <div className="lg:col-span-5">
        <Kicker>Why two controls</Kicker>
        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-ink">
          The controls validate the evaluator, not the other way round.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Both controls use the same task identity and environment. Only the repair behavior changes.
          If the known-good repair had not passed, or the no-op attempt had passed, the evaluation
          pipeline itself would be suspect.
        </p>
        <p className="mt-4 text-xs leading-6 text-muted">
          Shared identity: task <Identifier value={task.task_id} label="task ID" copy={false} />{" "}
          · environment{" "}
          <Identifier
            value={`${task.environment_id} ${task.environment_version}`}
            label="environment"
            copy={false}
          />{" "}
          · fingerprint{" "}
          <Identifier value={task.fingerprint} display={shortHash(task.fingerprint)} label="task fingerprint" />
        </p>
      </div>

      <div className="lg:col-span-7">
        <ul className="divide-y divide-line border-y border-line">
          <li
            aria-hidden="true"
            className="hidden grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 py-2 text-[0.6875rem] font-medium uppercase tracking-wider text-faint sm:grid"
          >
            <span>Control</span>
            <span>Expected</span>
            <span>Observed</span>
            <span className="text-right">Agreement</span>
          </li>
          {rows.map(({ attempt, presentation, consistent }) => (
            <li
              key={attempt.profile_id}
              className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 py-3.5 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">{attempt.solver_label}</p>
                <p className="text-xs text-muted">{humanizeIdentifier(presentation.kind)} control</p>
              </div>
              <StatusBadge tone={consistent ? "success" : "failure"} className="justify-self-end sm:order-last">
                {consistent ? "Consistent" : "Inconsistent"}
              </StatusBadge>
              <p className="col-span-2 font-mono text-xs leading-5 text-ink-2 sm:col-span-1">
                <span className="text-faint sm:hidden">expected </span>
                {presentation.expected.outcome} · {presentation.expected.verdict}
              </p>
              <p className="col-span-2 font-mono text-xs leading-5 text-ink-2 sm:col-span-1">
                <span className="text-faint sm:hidden">observed </span>
                {attempt.canonical_outcome} · {attempt.canonical_capability_verdict}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <StatusBadge tone={allConsistent ? "success" : "failure"}>
            {allConsistent ? "Pipeline discriminates" : "Pipeline inconsistent"}
          </StatusBadge>
          <span className="text-muted">
            {allConsistent
              ? "The evaluator accepted the valid repair and rejected the absent one under identical conditions."
              : "At least one control disagrees with its expected result. The evaluator, not the repairs, is in question."}
          </span>
        </p>
      </div>
    </div>
  );
}
