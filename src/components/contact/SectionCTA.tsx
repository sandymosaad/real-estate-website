import { CallButton } from "./CallButton";
import { ContactWhatsAppButton } from "./WhatsAppButton";
import { ctaContent } from "@/content/cta";

/** Provides a compact call-to-action strip for public pages. */
export function SectionCTA({ context }: { context?: string }) {
  return (
    <section className="border-y border-border bg-primary-light py-10">
      <div className="container flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-start">
        <div>
          <h2 className="text-2xl font-bold text-ink">{ctaContent.sectionTitle}</h2>
          <p className="mt-2 text-muted">{ctaContent.sectionDescription}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <CallButton context={context} />
          <ContactWhatsAppButton context={context} />
        </div>
      </div>
    </section>
  );
}
