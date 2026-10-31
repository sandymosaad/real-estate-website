import { Container } from "@/components/ui/Container";
import { CallButton } from "@/components/contact/CallButton";
import { ContactWhatsAppButton } from "@/components/contact/WhatsAppButton";
import { ctaContent } from "@/content/cta";
import { getFormattedPhone } from "@/lib/contact";

export function FinalCTA() {
  return (
    <section className="bg-primary py-14 text-center text-on-primary md:py-20">
      <Container>
        <h2 className="text-3xl font-bold md:text-4xl">
          {ctaContent.finalTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-on-primary/80">
          {ctaContent.finalDescription}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CallButton context="التواصل من الصفحة الرئيسية" />
          <ContactWhatsAppButton context="التواصل من الصفحة الرئيسية" />
        </div>
        <p className="mt-6 text-2xl font-bold">{getFormattedPhone()}</p>
      </Container>
    </section>
  );
}
