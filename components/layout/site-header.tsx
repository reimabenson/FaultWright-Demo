import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ArrowUpRightIcon, BrandMark } from "@/components/ui/icons";
import { cx } from "@/lib/cx";
import { headers, site } from "@/lib/site";

export function SiteHeader({ variant }: { variant: keyof typeof headers }) {
  const config = headers[variant];
  const { crossLink } = config;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <Container className="flex h-14 items-center justify-between gap-6">
        <Link
          href={config.home}
          className="flex min-w-0 items-center gap-2.5 rounded-xs"
          aria-label={config.home === "/" ? `${site.name} — technical demo` : `${site.name} — back to top`}
        >
          <BrandMark size={22} />
          <span className="text-[15px] font-semibold tracking-tight text-ink">{site.name}</span>
          <span className="hidden items-center whitespace-nowrap text-sm text-muted lg:inline-flex">
            <span aria-hidden="true" className="mx-2.5 text-line-strong">
              /
            </span>
            {config.descriptor}
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-4 sm:gap-6">
            {config.nav.map((item) => (
              <li key={item.href} className={cx(!item.primaryOnMobile && "hidden sm:block")}>
                <a href={item.href} className="rounded-xs text-sm text-muted transition-colors hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
            <li
              className={cx(
                "sm:border-l sm:border-line sm:pl-6",
                !crossLink.prominent && "hidden sm:block",
              )}
            >
              <Link
                href={crossLink.href}
                className={cx(
                  "inline-flex items-center gap-1.5 rounded-sm text-sm transition-colors",
                  crossLink.prominent
                    ? "border border-line-strong px-3 py-1.5 font-medium text-ink hover:border-ink"
                    : "text-muted hover:text-ink",
                )}
              >
                {crossLink.label}
                <ArrowUpRightIcon size={12} />
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
