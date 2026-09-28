import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { faq } from "@/lib/partner";

export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title" tone="surface">
      <SectionHeading kicker={faq.kicker} title={faq.title} titleId="faq-title" />

      <ul className="mt-10 grid gap-x-12 gap-y-8 border-t border-line pt-8 lg:grid-cols-2">
        {faq.items.map((item) => (
          <li key={item.question}>
            <h3 className="text-base font-semibold leading-6 text-ink">{item.question}</h3>
            <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-muted">{item.answer}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
