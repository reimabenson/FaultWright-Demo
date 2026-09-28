import type { ReactNode } from "react";

import { Kicker } from "@/components/ui/kicker";

type SectionHeadingProps = {
  /** Optional ordinal, e.g. "02". Used on the evidence page; omitted on the partner brief. */
  index?: string;
  kicker: string;
  title: ReactNode;
  titleId: string;
  lead?: ReactNode;
};

export function SectionHeading({ index, kicker, title, titleId, lead }: SectionHeadingProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <Kicker index={index}>{kicker}</Kicker>
        <h2 id={titleId} className="mt-4 text-balance text-title text-ink">
          {title}
        </h2>
      </div>
      {lead && (
        <p className="max-w-prose text-lead text-muted lg:col-span-5 lg:self-end lg:pb-1">{lead}</p>
      )}
    </div>
  );
}
