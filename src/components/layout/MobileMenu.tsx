"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "201000000000";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" className="rounded-xl p-2 text-ink md:hidden" aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
        <span className="text-2xl leading-none">{isOpen ? "×" : "☰"}</span>
      </button>
      {isOpen && (
        <div className="fixed inset-y-16 end-0 z-50 w-72 border-s border-border bg-white p-6 shadow-lg md:hidden">
          <nav className="flex flex-col gap-5" aria-label="قائمة الهاتف">
            {NAV_LINKS.map((link) => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium text-ink">{link.label}</Link>)}
            <Button href={`https://wa.me/${whatsapp}`} onClick={() => setIsOpen(false)}>كلمنا واتساب</Button>
          </nav>
        </div>
      )}
    </>
  );
}
