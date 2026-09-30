import { OgChip, renderOgImage } from "@/lib/og";
import { productDirection } from "@/lib/product";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${productDirection.motto} ${productDirection.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    topRight: "Current build direction",
    kicker: "Verification-first AI-training task factory",
    title: productDirection.motto,
    titleSize: 58,
    footerLeft: [
      <OgChip key="direction" tone="accent" label="Autonomous execution · build direction" />,
      <OgChip key="demo" tone="success" label="Demo V0 · verification core" />,
    ],
    footerRight: [
      productDirection.supportingMotto,
      "Permitted workloads · auditable evidence",
    ],
  });
}
