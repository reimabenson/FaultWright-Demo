import Link from "next/link";

import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Identifier } from "@/components/ui/identifier";
import { StatusBadge } from "@/components/ui/status-badge";
import { demo, isAccepted } from "@/lib/demo";
import { formatUtcDate, shortHash, shortId } from "@/lib/format";
import { controlPresentation } from "@/lib/presentation";

/**
 * A compact rendering of the frozen record in the demo's own visual language.
 * Every value is read from the artifact; nothing here is editorial.
 */
export function DemoPreview() {
  const { task, attempts } = demo;

  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface shadow-raised">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2.5 whitespace-nowrap">
          <span className="text-sm font-semibold text-ink">Evaluation record</span>
          <span className="font-mono text-xs text-faint">Demo V0</span>
        </div>
        <StatusBadge tone="neutral" icon={false}>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
          Frozen · {formatUtcDate(demo.created_at)}
        </StatusBadge>
      </div>

      <div className="border-b border-line bg-bg px-5 py-4">
        <p className="text-sm font-medium leading-snug text-ink">{task.public_summary.title}</p>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-muted">
          <Identifier value={task.task_id} label="task ID" copy={false} />
          <Identifier value={`${task.environment_id} ${task.environment_version}`} label="environment" copy={false} />
          <span>
            run <Identifier value={demo.run_id} display={shortId(demo.run_id)} label="run ID" copy={false} variant="plain" />
          </span>
        </p>
      </div>

      <ul className="divide-y divide-line">
        {attempts.map((attempt) => {
          const accepted = isAccepted(attempt);
          const presentation = controlPresentation(attempt.profile_id);
          return (
            <li key={attempt.profile_id} className="grid gap-2 px-5 py-3.5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">{attempt.solver_label}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {presentation.kind === "positive" ? "Positive" : "Negative"} control ·{" "}
                  {attempt.patch_sha256 ? (
                    <>
                      patch{" "}
                      <Identifier
                        value={attempt.patch_sha256}
                        display={shortHash(attempt.patch_sha256, 8, 6)}
                        label="patch SHA-256"
                        copy={false}
                        variant="plain"
                      />
                    </>
                  ) : (
                    "no patch"
                  )}
                </p>
              </div>
              <StatusBadge tone={accepted ? "success" : "failure"} className="justify-self-start sm:justify-self-end">
                {attempt.canonical_outcome} · {attempt.canonical_capability_verdict}
              </StatusBadge>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-t border-line px-5 py-3 text-xs">
        <span className="whitespace-nowrap font-mono text-faint">sha256 verified at build</span>
        <Link
          href="/#evidence"
          className="inline-flex items-center gap-1 whitespace-nowrap rounded-xs font-medium text-accent transition-colors hover:text-accent-strong"
        >
          Full evidence ledger
          <ArrowUpRightIcon size={12} />
        </Link>
      </div>
    </div>
  );
}
