import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppLink } from "@/lib/contact";

/** Renders a WhatsApp action with an optional context message. */
export function ContactWhatsAppButton({ context, label = "كلمنا على واتساب" }: { context?: string; label?: string }) {
  const message = context ? `أهلاً، محتاج مساعدة بخصوص ${context}.` : undefined;
  return (
    <Button href={getWhatsAppLink(message)} size="lg" aria-label={context ? `${label}: ${context}` : label}>
      <MessageCircle size={18} className="ms-2" aria-hidden="true" />
      {label}
    </Button>
  );
}
