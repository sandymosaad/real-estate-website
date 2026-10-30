import type { Metadata } from "next";
import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { WHATSAPP_DEFAULT_NUMBER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "تواصل معانا",
  description: "كلم بيتك أسيوط واسأل عن الشقق ومشاريع اتحاد الملاك.",
};

const phone = process.env.NEXT_PUBLIC_PHONE || "01000000000";
const whatsapp =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || WHATSAPP_DEFAULT_NUMBER;

/** Provides the contact form and the available communication channels. */
export default function ContactPage() {
  return (
    <Section
      title="تواصل معانا"
      subtitle="قولنا محتاج إيه وهنرجعلك بأقرب وقت."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <LeadForm
          defaultInterestType="استفسار عام"
          title="ابعتلنا طلبك"
        />
        <div className="space-y-5">
          <div className="rounded-xl border border-border p-6">
            <h2 className="text-2xl font-bold text-ink">بيانات التواصل</h2>
            <div className="mt-5 space-y-4 text-muted">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-3"
              >
                <Phone
                  size={20}
                  className="text-primary"
                  aria-hidden="true"
                />
                {phone}
              </a>
              <a
                href={`https://wa.me/${whatsapp}`}
                className="flex items-center gap-3"
              >
                <MessageCircle
                  size={20}
                  className="text-primary"
                  aria-hidden="true"
                />
                واتساب
              </a>
              <p className="flex items-center gap-3">
                <MapPin
                  size={20}
                  className="text-primary"
                  aria-hidden="true"
                />
                العنوان: أسيوط - العنوان هيتحدد قريبًا
              </p>
              <p className="flex items-center gap-3">
                <Clock3
                  size={20}
                  className="text-primary"
                  aria-hidden="true"
                />
                مواعيد العمل: من السبت للخميس، 10 ص لـ 6 م
              </p>
            </div>
            <Button
              href={`https://wa.me/${whatsapp}`}
              className="mt-6"
            >
              كلمنا واتساب
            </Button>
          </div>
          <div className="h-56 rounded-xl bg-primary-light p-6 text-center text-muted">
            <MapPin
              className="mx-auto text-primary"
              size={32}
              aria-hidden="true"
            />
            <p className="mt-3">خريطة الموقع هتظهر هنا قريبًا.</p>
            {/* TODO: embed Google Maps after confirming the office location. */}
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">تابعنا</p>
            <div className="mt-3 flex gap-4 text-sm text-muted">
              <a href="#" aria-label="فيسبوك">
                فيسبوك
              </a>
              <a href="#" aria-label="إنستجرام">
                إنستجرام
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
