import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getPhoneLink } from "@/lib/contact";

/** Renders a call action with the configured phone number. */
export function CallButton({ context, label = "اتصل بينا دلوقتي" }: { context?: string; label?: string }) {
  return (
    <Button href={getPhoneLink()} size="lg" aria-label={context ? `${label}: ${context}` : label}>
      <Phone size={18} className="ms-2" aria-hidden="true" />
      {label}
    </Button>
  );
}
