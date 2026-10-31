import { ArrowDown, ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { RevealList } from "@/components/animation/RevealList";
import { homeContent } from "@/content/home";

export function HowItWorks() {
  return (
    <Section title="هنمشي معاك خطوة بخطوة">
      <RevealList className="grid gap-6 md:grid-cols-4">
        {homeContent.steps.map((step, index) => (
          <div
            key={step}
            className="relative flex items-center gap-4 md:block md:text-center"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-on-primary">
              {index + 1}
            </span>
            <h3 className="font-bold text-ink">{step}</h3>
            {index < homeContent.steps.length - 1 && (
              <span className="absolute start-5 top-14 text-primary md:-end-5 md:start-auto md:top-4">
                <ArrowDown
                  className="md:hidden"
                  size={18}
                  aria-hidden="true"
                />
                <ArrowLeft
                  className="hidden md:block"
                  size={18}
                  aria-hidden="true"
                />
              </span>
            )}
          </div>
        ))}
      </RevealList>
    </Section>
  );
}
