import { RecordCard } from "@/components/demo/record-card";
import { Container } from "@/components/ui/container";
import { ArrowDownIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { productDirection } from "@/lib/product";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-7">
            <Kicker>FaultWright · Current build direction</Kicker>
            <h1 id="hero-title" className="mt-5 max-w-[19ch] text-balance text-display text-ink">
              {productDirection.motto}
            </h1>
            <p className="mt-6 max-w-prose text-lead text-muted">
              {productDirection.description}
            </p>
            <p className="mt-4 max-w-prose text-base text-muted">
              {productDirection.provingGround}
            </p>
            <p className="mt-5 font-mono text-xs font-medium uppercase tracking-wider text-accent">
              {productDirection.supportingMotto}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#system"
                className="inline-flex items-center gap-2 rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
              >
                See the system direction
                <ArrowDownIcon size={14} />
              </a>
              <a
                href="#demo-v0"
                className="inline-flex items-center gap-1.5 rounded-xs text-sm font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Inspect Demo V0
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
