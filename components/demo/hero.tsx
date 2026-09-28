import { RecordCard } from "@/components/demo/record-card";
import { Container } from "@/components/ui/container";
import { ArrowDownIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { demo } from "@/lib/demo";
import { taskPresentation } from "@/lib/presentation";

export function Hero() {
  const presentation = taskPresentation(demo.task.task_id);

  return (
    <section id="top" aria-labelledby="hero-title" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-7">
            <Kicker>Demo V0 · Frozen evaluation record</Kicker>
            <h1 id="hero-title" className="mt-5 max-w-[18ch] text-balance text-display text-ink">
              Software repair is only useful if recovery can be verified.
            </h1>
            <p className="mt-6 max-w-prose text-lead text-muted">
              FaultWright starts from known working behavior, introduces a controlled software fault,
              evaluates a repair attempt, and verifies whether the expected behavior is actually
              restored.
            </p>
            <p className="mt-4 max-w-prose text-base text-muted">
              This page is one frozen evaluation run: a {presentation.shortTitle.toLowerCase()} task,{" "}
              {demo.attempts.length} deterministic pipeline controls, and the canonical outcomes recorded
              by the evaluator. Nothing is recomputed in the browser.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#controls"
                className="inline-flex items-center gap-2 rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
              >
                See the evaluation
                <ArrowDownIcon size={14} />
              </a>
              <a
                href="#artifacts"
                className="inline-flex items-center gap-1.5 rounded-xs text-sm font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Inspect the artifacts
                <ArrowUpRightIcon size={14} />
              </a>
            </div>
          </div>
          <RecordCard className="lg:col-span-5 lg:mt-2" />
        </div>
      </Container>
    </section>
  );
}
