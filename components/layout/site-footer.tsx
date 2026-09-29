import Link from "next/link";

import { Container } from "@/components/ui/container";
import { BrandMark } from "@/components/ui/icons";
import { demo } from "@/lib/demo";
import { footers, site } from "@/lib/site";

export function SiteFooter({ variant }: { variant: keyof typeof footers }) {
  const year = new Date(demo.created_at).getUTCFullYear();
  const links = footers[variant];

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <BrandMark size={20} />
            <span className="text-[15px] font-semibold tracking-tight text-ink">{site.name}</span>
          </div>
          <p className="mt-2 text-sm text-muted">{site.descriptor}</p>
          <p className="mt-1 font-mono text-xs text-faint">Frozen Demo V0 · {year}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {links.map((link) => {
              const className = "rounded-xs text-muted transition-colors hover:text-ink";
              const isPage = link.href.startsWith("/") && !link.href.startsWith("/demo/");
              return (
                <li key={link.href}>
                  {isPage ? (
                    <Link href={link.href} className={className}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className={className}>
                      {link.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
