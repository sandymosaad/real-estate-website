import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WHATSAPP_DEFAULT_NUMBER } from "@/lib/constants";

/** Creates a WhatsApp action with a pre-filled message for the selected item. */
export function WhatsAppButton({ message, label }: { message: string; label: string }) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || WHATSAPP_DEFAULT_NUMBER;
  
  return <Button href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`} size="lg">
    <MessageCircle size={18} className="ms-2" aria-hidden="true" />
    {label}
  </Button>;
}
