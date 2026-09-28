import { Identifier } from "@/components/ui/identifier";
import { Kicker } from "@/components/ui/kicker";
import { Ledger, LedgerRow } from "@/components/ui/ledger";
import { StatusBadge } from "@/components/ui/status-badge";
import { cx } from "@/lib/cx";
import { attemptIdFor, isAccepted, type DemoAttempt } from "@/lib/demo";
import { formatIndex, shortHash } from "@/lib/format";
import { controlPresentation } from "@/lib/presentation";

type AttemptCardProps = {
  attempt: DemoAttempt;
  /** 1-based position in the artifact's attempt list. */
  index: number;
  total: number;
};

export function AttemptCard({ attempt, index, total }: AttemptCardProps) {
  const presentation = controlPresentation(attempt.profile_id);
  const accepted = isAccepted(attempt);
  const attemptId = attemptIdFor(attempt);
  const headingId = `attempt-${attempt.profile_id}`;

  return (
    <article
      aria-labelledby={headingId}
      className="flex flex-col overflow-hidden rounded-md border border-line bg-surface shadow-card"
    >
      <div aria-hidden="true" className={cx("h-0.5", accepted ? "bg-success" : "bg-failure")} />

      <header className="flex items-start justify-between gap-4 p-5 sm:p-6">
        <div className="min-w-0">
          <Kicker>
            Control {formatIndex(index)} / {formatIndex(total)} · {presentation.kind} control
          </Kicker>
          <h3 id={headingId} className="mt-3 text-xl font-semibold tracking-tight text-ink">
            {attempt.solver_label}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{presentation.role}</p>
        </div>
        <StatusBadge tone={accepted ? "success" : "failure"} className="mt-0.5">
          {accepted ? "Accepted" : "Rejected"}
        </StatusBadge>
      </header>

      <div className="grid grid-cols-2 gap-4 border-t border-line px-5 py-5 sm:px-6">
        <div>
          <Kicker>Expected</Kicker>
          <p className="mt-2 font-mono text-sm text-ink">
            {presentation.expected.outcome}
            <span className="text-faint"> · </span>
            {presentation.expected.verdict}
          </p>
          <p className="mt-1 text-xs leading-5 text-muted">{presentation.expected.summary}</p>
        </div>
        <div>
          <Kicker>Observed</Kicker>
          <p className={cx("mt-2 font-mono text-sm font-semibold", accepted ? "text-success" : "text-failure")}>
            {attempt.canonical_outcome}
            <span className="font-normal opacity-60"> · </span>
            {attempt.canonical_capability_verdict}
          </p>
          <p className="mt-1 text-xs leading-5 text-muted">
            {attempt.human_summary} · verification {attempt.verification_phase}
          </p>
        </div>
      </div>

      <Ledger className="mt-auto border-t border-line px-5 sm:px-6">
        <LedgerRow label="Submission">{presentation.submission}</LedgerRow>
        <LedgerRow label="Profile" hint="profile_id">
          <Identifier value={attempt.profile_id} label="profile ID" />
        </LedgerRow>
        <LedgerRow label="Solver" hint="solver_id">
          <Identifier value={attempt.solver_id} label="solver ID" />
        </LedgerRow>
        <LedgerRow label="Attempt" hint="attempt_id">
          {attemptId ? (
            <Identifier value={attemptId} label="attempt ID" />
          ) : (
            <span className="text-muted">Not recorded in evidence_refs</span>
          )}
        </LedgerRow>
        <LedgerRow label="Patch" hint="patch_sha256">
          {attempt.patch_sha256 ? (
            <Identifier
              value={attempt.patch_sha256}
              display={shortHash(attempt.patch_sha256)}
              label="patch SHA-256"
            />
          ) : (
            <span className="text-muted">No patch submitted</span>
          )}
        </LedgerRow>
      </Ledger>
    </article>
  );
}
