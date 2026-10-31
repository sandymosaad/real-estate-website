import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "201000000000";

export function FinalCTA() {
  return (
    <section className="bg-primary py-14 text-center text-on-primary md:py-20">
      <Container>
        <h2 className="text-3xl font-bold md:text-4xl">
          جاهز تبدأ رحلة بيتك؟
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-on-primary/80">
          كلمنا وخلينا نساعدك تلاقي الاختيار المناسب ليك في أسيوط.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            href={`https://wa.me/${whatsapp}`}
            size="lg"
            className="bg-surface text-primary hover:bg-primary-light"
          >
            <MessageCircle
              size={18}
              className="ms-2 text-primary"
              aria-hidden="true"
            />
            <span className=" text-primary">واتساب</span>
          </Button>
          <Button
            href="/contact"
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-surface/10"
          >
            تواصل معانا
          </Button>
        </div>
      </Container>
    </section>
  );
}
