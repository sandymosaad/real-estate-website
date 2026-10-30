import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mock-data";
import { Section } from "@/components/ui/Section";

export function Testimonials() {
  return (
    <Section title="كلام من ناس جربتنا">
      <div className="grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((item) => (
          <article
            key={item.name}
            className="rounded-xl border border-border p-6"
          >
            <Quote className="text-primary" size={24} aria-hidden="true" />
            <p className="mt-4 leading-7 text-muted">
              &quot;{item.text}&quot;
            </p>
            <div className="mt-5 border-t border-border pt-4">
              <p className="font-bold text-ink">{item.name}</p>
              <p className="mt-1 text-sm text-muted">{item.district}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
