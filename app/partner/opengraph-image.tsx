import { OgChip, renderOgImage } from "@/lib/og";
import { partnerHero } from "@/lib/partner";
import { partnerPage, site } from "@/lib/site";

export const alt = `${site.name} ${partnerPage.title} — ${partnerHero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    topRight: partnerPage.title,
    kicker: "For a prospective commercial collaborator",
    title: partnerHero.headline,
    titleSize: 58,
    footerLeft: [
      <OgChip key="core" tone="success" label="Verification core demonstrated" />,
      <OgChip key="build" tone="accent" label="Execution system in development" />,
    ],
    footerRight: [
      "Workload sources · rules · feedback",
      "Seeking a US-side commercial collaborator",
      "No coding required",
    ],
  });
}
