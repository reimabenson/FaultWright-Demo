import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Arrangement } from "@/components/partner/arrangement";
import { CurrentState } from "@/components/partner/current-state";
import { Faq } from "@/components/partner/faq";
import { FinalCta } from "@/components/partner/final-cta";
import { PartnerHero } from "@/components/partner/partner-hero";
import { ProductModel } from "@/components/partner/product-model";
import { Roles } from "@/components/partner/roles";
import { TechnicalProof } from "@/components/partner/technical-proof";
import { WhatItDoes } from "@/components/partner/what-it-does";
import { partnerPage, site } from "@/lib/site";

const fullTitle = `${partnerPage.title} — ${site.name}`;

export const metadata: Metadata = {
  title: partnerPage.title,
  description: partnerPage.description,
  alternates: {
    canonical: partnerPage.path,
  },
  openGraph: {
    type: "website",
    url: partnerPage.path,
    siteName: site.name,
    title: fullTitle,
    description: partnerPage.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: partnerPage.description,
  },
};

export default function PartnerPage() {
  return (
    <>
      <SiteHeader variant="partner" />
      <main id="content">
        <PartnerHero />
        <WhatItDoes />
        <ProductModel />
        <CurrentState />
        <Roles />
        <Arrangement />
        <TechnicalProof />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter variant="partner" />
    </>
  );
}
