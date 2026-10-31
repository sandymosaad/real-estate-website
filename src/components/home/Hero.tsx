import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { homeContent } from "@/content/home";
import { CallButton } from "@/components/contact/CallButton";
import { ContactWhatsAppButton } from "@/components/contact/WhatsAppButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-light to-white py-16 md:py-24">
      <div className="absolute -end-16 -top-20 h-56 w-56 rounded-full bg-primary/10" aria-hidden="true" />
      <Container className="relative">
        <div className="max-w-3xl">
          <Reveal as="p" className="mb-4 font-semibold text-primary">{homeContent.hero.eyebrow}</Reveal>
          <Reveal as="h1" delay={80} className="text-4xl font-bold leading-tight text-ink md:text-6xl">
            {homeContent.hero.title}
          </Reveal>
          <Reveal as="p" delay={160} className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            {homeContent.hero.subtitle}
          </Reveal>
          <Reveal delay={240} className="mt-8 flex flex-wrap gap-3">
            <CallButton context="البحث عن عقار في أسيوط" label="كلمنا دلوقتي" />
            <ContactWhatsAppButton context="البحث عن عقار في أسيوط" label="شوف الوحدات" />
          </Reveal>
          <Reveal as="ul" delay={280} className="mt-5 flex flex-wrap gap-4 text-sm text-muted">
            {homeContent.hero.trustPoints.map((point) => <li key={point}>✓ {point}</li>)}
          </Reveal>
          <Reveal as="div" delay={320}>
            <Link href="#latest" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            شوف أحدث الاختيارات <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
