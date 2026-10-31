"use client";

import { useEffect, useState } from "react";
import { CallButton } from "./CallButton";
import { ContactWhatsAppButton } from "./WhatsAppButton";

/** Shows mobile contact actions while avoiding keyboard and menu overlap. */
export function StickyContactBar() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleFocus = () => setIsHidden(Boolean(document.activeElement?.closest("form")));
    const handleMenu = (event: Event) => setIsHidden((event as CustomEvent<boolean>).detail);
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleFocus);
    window.addEventListener("mobile-menu-change", handleMenu);
    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleFocus);
      window.removeEventListener("mobile-menu-change", handleMenu);
    };
  }, []);

  return (
    <div className={`sticky-contact-bar fixed inset-x-0 bottom-0 z-30 px-3 pb-[env(safe-area-inset-bottom)] pt-2 md:hidden ${isHidden ? "pointer-events-none translate-y-full opacity-0" : ""}`}>
      <div className="mx-auto flex max-w-md justify-center gap-2 rounded-xl border border-border bg-surface/95 p-2 shadow-lg backdrop-blur">
        <CallButton context="الموقع" label="اتصل" />
        <ContactWhatsAppButton context="الموقع" label="واتساب" />
      </div>
    </div>
  );
}
