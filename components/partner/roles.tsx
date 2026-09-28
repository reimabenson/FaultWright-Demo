import { CheckIcon } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cx } from "@/lib/cx";
import { roles } from "@/lib/partner";

type RoleColumnProps = {
  title: string;
  subtitle: string;
  items: readonly string[];
  emphasized?: boolean;
};

function RoleColumn({ title, subtitle, items, emphasized = false }: RoleColumnProps) {
  return (
    <div
      className={cx(
        "rounded-md border bg-surface p-5 shadow-card sm:p-6",
        emphasized ? "border-accent/30" : "border-line",
      )}
    >
      <div aria-hidden="true" className={cx("-mx-5 -mt-5 mb-5 h-0.5 sm:-mx-6 sm:-mt-6", emphasized ? "bg-accent" : "bg-line")} />
      <Kicker className={emphasized ? "text-accent" : undefined}>{subtitle}</Kicker>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-6 text-ink-2">
            <CheckIcon size={14} className={cx("mt-1.5 shrink-0", emphasized ? "text-accent" : "text-faint")} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Roles() {
  return (
    <Section id="roles" labelledBy="roles-title" tone="surface">
      <SectionHeading kicker={roles.kicker} title={roles.title} titleId="roles-title" lead={roles.lead} />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <RoleColumn {...roles.founder} />
        <RoleColumn {...roles.collaborator} emphasized />
      </div>

      <div className="mt-6 grid gap-4 rounded-md border border-accent/20 bg-accent-soft px-5 py-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-8 sm:px-6">
        <p className="text-title text-accent-strong">{roles.callout.headline}</p>
        <p className="max-w-prose text-base leading-relaxed text-ink-2">{roles.callout.body}</p>
      </div>
    </Section>
  );
}
