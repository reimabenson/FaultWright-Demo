import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Identifier } from "@/components/ui/identifier";
import { Ledger, LedgerRow } from "@/components/ui/ledger";
import { StatusBadge } from "@/components/ui/status-badge";
import { cx } from "@/lib/cx";
import { ARTIFACT_PATHS, demo, isAccepted } from "@/lib/demo";
import { formatUtc, shortId } from "@/lib/format";

/** Compact identity panel for the frozen run, shown beside the hero copy. */
export function RecordCard({ className }: { className?: string }) {
  const { task } = demo;

  return (
    <aside
      aria-labelledby="record-title"
      className={cx("rounded-md border border-line bg-surface shadow-raised", className)}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
        <h2 id="record-title" className="text-sm font-semibold text-ink">
          Evaluation record
        </h2>
        <StatusBadge tone="neutral" icon={false}>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
          Complete · Frozen
        </StatusBadge>
      </div>

      <Ledger className="px-5">
        <LedgerRow compact label="Task" hint="task_id">
          <Identifier value={task.task_id} label="task ID" />
        </LedgerRow>
        <LedgerRow compact label="Environment" hint="environment">
          <Identifier value={`${task.environment_id} ${task.environment_version}`} label="environment" copy={false} />
        </LedgerRow>
        <LedgerRow compact label="Run" hint="run_id">
          <Identifier value={demo.run_id} display={shortId(demo.run_id)} label="run ID" />
        </LedgerRow>
        <LedgerRow compact label="Created" hint="created_at">
          {formatUtc(demo.created_at)}
        </LedgerRow>
        <LedgerRow compact label="Attempts">
          {demo.attempts.length} deterministic pipeline controls
        </LedgerRow>
        <LedgerRow compact label="Result">
          <ul className="flex flex-wrap gap-1.5">
            {demo.attempts.map((attempt) => (
              <li key={attempt.profile_id}>
                <StatusBadge tone={isAccepted(attempt) ? "success" : "failure"}>
                  {attempt.solver_label}: {attempt.canonical_outcome}
                </StatusBadge>
              </li>
            ))}
          </ul>
        </LedgerRow>
      </Ledger>

      <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-3 text-xs">
        <span className="font-mono text-faint">schema {demo.schema}</span>
        <a
          href={ARTIFACT_PATHS.demo}
          className="inline-flex items-center gap-1 rounded-xs font-medium text-accent transition-colors hover:text-accent-strong"
        >
          Raw artifact
          <ArrowUpRightIcon size={12} />
        </a>
      </div>
    </aside>
  );
}
