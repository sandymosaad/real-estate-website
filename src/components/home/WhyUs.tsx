import { BadgeCheck, FileCheck2, Handshake, MapPinned } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { RevealList } from "@/components/animation/RevealList";

const features = [
  {
    title: "شفافية في الأسعار",
    description: "تفاصيل واضحة من البداية عشان تختار وأنت مطمّن.",
    icon: BadgeCheck,
  },
  {
    title: "عقود موثقة",
    description: "بنوضح لك مستندات وخطوات التعاقد المطلوبة.",
    icon: FileCheck2,
  },
  {
    title: "متابعة بعد الشراء",
    description: "بنفضل موجودين معاك بعد إتمام الخطوات.",
    icon: Handshake,
  },
  {
    title: "معرفة بالسوق المحلي",
    description: "فاهمين مراكز أسيوط واحتياجات أهلها.",
    icon: MapPinned,
  },
];

export function WhyUs() {
  return (
    <Section
      title="ليه تختارنا؟"
      subtitle="بنخلي رحلة البحث عن عقارك أبسط وأوضح."
    >
      <RevealList className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ title, description, icon: Icon }) => (
          <div key={title}>
            <Icon className="text-primary" size={28} aria-hidden="true" />
            <h3 className="mt-4 font-bold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
          </div>
        ))}
      </RevealList>
    </Section>
  );
}
