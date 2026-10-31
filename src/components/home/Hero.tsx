import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-light to-white py-16 md:py-24">
      <div className="absolute -end-16 -top-20 h-56 w-56 rounded-full bg-primary/10" aria-hidden="true" />
      <Container className="relative">
        <div className="max-w-3xl">
          <Reveal as="p" className="mb-4 font-semibold text-primary">بيتك الصح يبدأ بخطوة</Reveal>
          <Reveal as="h1" delay={80} className="text-4xl font-bold leading-tight text-ink md:text-6xl">
            ابني مستقبلك في أسيوط… لوحدك أو مع شركاء
          </Reveal>
          <Reveal as="p" delay={160} className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            اختيارات عقارية واضحة تساعدك تاخد قرارك بثقة وراحة.
          </Reveal>
          <Reveal delay={240} className="mt-8 flex flex-wrap gap-3">
            <Button href="/apartments" size="lg">تصفح الشقق</Button>
            <Button href="/union" variant="outline" size="lg">اعرف عن اتحاد الملاك</Button>
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
