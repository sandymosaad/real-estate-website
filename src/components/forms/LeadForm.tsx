"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  ASSIUT_DISTRICTS,
  LEAD_INTEREST_TYPES,
  WHATSAPP_DEFAULT_NUMBER,
  type District,
  type LeadInterestType,
} from "@/lib/constants";
import { FormField } from "./FormField";
import { useLeadForm } from "./useLeadForm";

type LeadFormProps = {
  defaultInterestType: LeadInterestType;
  relatedItemType?: "apartment" | "unionProject";
  relatedItemSlug?: string;
  title?: string;
  submitLabel?: string;
  showDistrictField?: boolean;
  showMessageField?: boolean;
};

/** Provides an accessible lead form shared by contact and detail pages. */
export function LeadForm({
  defaultInterestType,
  relatedItemType,
  relatedItemSlug,
  title = "كلمنا ونساعدك",
  submitLabel = "ابعت الطلب",
  showDistrictField = true,
  showMessageField = true,
}: LeadFormProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [message, setMessage] = useState("");
  const [interestType, setInterestType] = useState<LeadInterestType>(
    defaultInterestType,
  );
  const [website, setWebsite] = useState("");
  const form = useLeadForm({
    defaultInterestType,
    relatedItemType,
    relatedItemSlug,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await form.submitLead({
      fullName,
      phone,
      district: (district || undefined) as District | undefined,
      message: showMessageField ? message : undefined,
      interestType,
      relatedItemType,
      relatedItemSlug,
      website,
    });
  }

  if (form.status === "success") {
    const whatsapp =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || WHATSAPP_DEFAULT_NUMBER;

    return (
      <div
        aria-live="polite"
        className="rounded-xl bg-primary-light p-6 text-center"
      >
        <h2 className="text-xl font-bold text-ink">تمام، شكرًا ليك!</h2>
        <p className="mt-2 text-muted">{form.message}</p>
        <a
          href={`https://wa.me/${whatsapp}`}
          className="mt-4 inline-flex items-center font-semibold text-primary"
        >
          <MessageCircle
            size={18}
            className="ms-2"
            aria-hidden="true"
          />
          كلمنا على واتساب
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-white p-6 shadow-sm"
      aria-live="polite"
    >
      {title && (
        <h2 className="mb-6 text-2xl font-bold text-ink">{title}</h2>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          id="fullName"
          name="fullName"
          label="الاسم"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          error={form.errors.fullName}
          required
        />
        <FormField
          id="phone"
          name="phone"
          label="رقم الموبايل"
          inputMode="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          error={form.errors.phone}
          required
        />
        {showDistrictField && (
          <div>
            <label htmlFor="district" className="text-sm font-semibold text-ink">
              المركز
            </label>
            <select
              id="district"
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-white p-3 outline-none focus:border-primary"
              aria-invalid={Boolean(form.errors.district)}
            >
              <option value="">اختار المركز</option>
              {ASSIUT_DISTRICTS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            {form.errors.district && (
              <p className="mt-1 text-sm text-red-600">
                {form.errors.district}
              </p>
            )}
          </div>
        )}
        <div>
          <label
            htmlFor="interestType"
            className="text-sm font-semibold text-ink"
          >
            مهتم بـ
          </label>
          <select
            id="interestType"
            value={interestType}
            onChange={(event) =>
              setInterestType(event.target.value as LeadInterestType)
            }
            className="mt-2 w-full rounded-xl border border-border bg-white p-3 outline-none"
          >
            {LEAD_INTEREST_TYPES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        {showMessageField && (
          <div className="md:col-span-2">
            <label htmlFor="message" className="text-sm font-semibold text-ink">
              الرسالة
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              aria-invalid={Boolean(form.errors.message)}
              className="mt-2 min-h-28 w-full rounded-xl border border-border p-3 outline-none focus:border-primary"
            />
            {form.errors.message && (
              <p className="mt-1 text-sm text-red-600">
                {form.errors.message}
              </p>
            )}
          </div>
        )}
        <input
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          name="website"
        />
      </div>
      {form.status === "error" && (
        <p className="mt-4 text-sm text-red-600">{form.message}</p>
      )}
      <Button
        type="submit"
        className="mt-6"
        disabled={form.status === "submitting"}
      >
        {form.status === "submitting" ? "جاري الإرسال..." : submitLabel}
      </Button>
    </form>
  );
}
