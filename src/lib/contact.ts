import { WHATSAPP_DEFAULT_NUMBER } from "@/lib/constants";

export const CONTACT_REPLY_TIME = "في نفس اليوم";

function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || WHATSAPP_DEFAULT_NUMBER;
}

/** Builds a WhatsApp URL with an optional pre-filled message. */
export function getWhatsAppLink(message?: string): string {
  const suffix = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${getWhatsAppNumber()}${suffix}`;
}

/** Builds the phone URL from the configured contact number. */
export function getPhoneLink(): string {
  return `tel:${process.env.NEXT_PUBLIC_PHONE || "01000000000"}`;
}

/** Returns the configured phone number for visible contact details. */
export function getFormattedPhone(): string {
  return process.env.NEXT_PUBLIC_PHONE || "01000000000";
}

/** Emits a local event so analytics can listen later without adding a provider. */
export function trackCtaClick(name: string): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cta_click", { detail: { name } }));
  }
}
