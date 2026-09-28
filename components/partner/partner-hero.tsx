import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ArrowDownIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { Ledger, LedgerRow } from "@/components/ui/ledger";
import { partnerHero } from "@/lib/partner";

export function PartnerHero() {
  return (
    <section id="top" aria-labelledby="partner-hero-title" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-7">
            <Kicker>{partnerHero.kicker}</Kicker>
            <h1 id="partner-hero-title" className="mt-5 max-w-[20ch] text-balance text-display text-ink">
              {partnerHero.headline}
            </h1>
            <p className="mt-6 max-w-prose text-lead text-muted">{partnerHero.lead}</p>
            <p className="mt-4 max-w-prose text-lead text-ink-2">{partnerHero.supporting}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href={partnerHero.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
              >
                {partnerHero.primaryCta.label}
                <ArrowUpRightIcon size={14} />
              </Link>
              <a
                href={partnerHero.secondaryCta.href}
                className="inline-flex items-center gap-1.5 rounded-xs text-sm font-medium text-accent transition-colors hover:text-accent-strong"
              >
                {partnerHero.secondaryCta.label}
                <ArrowDownIcon size={14} />
              </a>
            </div>
          </div>

          <aside
            aria-labelledby="brief-title"
            className="rounded-md border border-line bg-surface shadow-raised lg:col-span-5 lg:mt-2"
          >
            <div className="border-b border-line px-5 py-3.5">
              <h2 id="brief-title" className="text-sm font-semibold text-ink">
                In brief
              </h2>
            </div>
            <Ledger className="px-5">
              {partnerHero.brief.map((row) => (
                <LedgerRow key={row.label} compact label={row.label}>
                  <span className="text-ink-2">{row.value}</span>
                </LedgerRow>
              ))}
            </Ledger>
          </aside>
        </div>
      </Container>
    </section>
  );
}
