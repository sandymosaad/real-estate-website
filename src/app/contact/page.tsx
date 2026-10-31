import type { Metadata } from "next";
import { Clock3, MapPin, Phone } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Section } from "@/components/ui/Section";
import { CallButton } from "@/components/contact/CallButton";
import { ContactWhatsAppButton } from "@/components/contact/WhatsAppButton";
import { contactContent } from "@/content/contact";
import { CONTACT_REPLY_TIME, getFormattedPhone } from "@/lib/contact";

export const metadata: Metadata = {
  title: contactContent.title,
  description: contactContent.subtitle,
};

/** Provides the contact form and the available communication channels. */
export default function ContactPage() {
  return (
    <Section
      title={contactContent.title}
      subtitle={contactContent.subtitle}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="order-first flex flex-wrap gap-3 lg:col-span-2">
          <CallButton context="صفحة التواصل" />
          <ContactWhatsAppButton context="صفحة التواصل" />
        </div>
        <LeadForm
          defaultInterestType="استفسار عام"
          title={contactContent.formTitle}
          submitLabel="ابعتلنا طلبك"
        />
        <div className="space-y-5">
          <div className="rounded-xl border border-border p-6">
            <h2 className="text-2xl font-bold text-ink">بيانات التواصل</h2>
            <div className="mt-5 space-y-4 text-muted">
              <a
                href={`tel:${getFormattedPhone()}`}
                className="flex items-center gap-3"
              >
                <Phone
                  size={20}
                  className="text-primary"
                  aria-hidden="true"
                />
                {getFormattedPhone()}
              </a>
              <p className="flex items-center gap-3">
                <MapPin
                  size={20}
                  className="text-primary"
                  aria-hidden="true"
                />
                العنوان: أسيوط - {contactContent.addressPlaceholder}
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
            <p className="mt-6 text-sm text-muted">هنراجع طلبك ونتواصل معاك {CONTACT_REPLY_TIME}.</p>
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
