import { BadgeCheck, FileCheck2, Handshake, MapPinned } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { RevealList } from "@/components/animation/RevealList";
import { homeContent } from "@/content/home";

const icons = [BadgeCheck, FileCheck2, Handshake, MapPinned];

export function WhyUs() {
  return (
    <Section
      title="ليه تختارنا؟"
      subtitle="بنخلي رحلة البحث عن عقارك أبسط وأوضح."
    >
      <RevealList className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {homeContent.benefits.map(([title, description], index) => {
          const Icon = icons[index];
          return (
          <div key={title}>
            <Icon className="text-primary" size={28} aria-hidden="true" />
            <h3 className="mt-4 font-bold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
          </div>
          );
        })}
      </RevealList>
    </Section>
  );
}
