import { CheckIcon } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { productModel } from "@/lib/partner";
import { productComparison } from "@/lib/product";

export function ProductModel() {
  return (
    <Section id="product-model" labelledBy="product-model-title">
      <SectionHeading
        kicker={productModel.kicker}
        title={productModel.title}
        titleId="product-model-title"
        lead={productModel.lead}
      />

      <div className="mt-10 grid divide-y divide-line rounded-md border border-line bg-surface shadow-card md:grid-cols-2 md:divide-x md:divide-y-0">
        <article className="p-5 sm:p-6">
          <Kicker>{productComparison.service.label}</Kicker>
          <ul className="mt-4 space-y-3">
            {productComparison.service.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                <CheckIcon size={14} className="mt-1.5 shrink-0 text-faint" />
                {point}
              </li>
            ))}
          </ul>
        </article>
        <article className="p-5 sm:p-6">
          <Kicker className="text-accent">{productComparison.product.label}</Kicker>
          <ul className="mt-4 space-y-3">
            {productComparison.product.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                <CheckIcon size={14} className="mt-1.5 shrink-0 text-accent" />
                {point}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <p className="mt-6 rounded-md border border-accent/20 bg-accent-soft p-5 text-balance text-lg font-semibold leading-snug text-accent-strong sm:p-6 sm:text-xl">
        {productModel.conclusion}
      </p>
    </Section>
  );
}
