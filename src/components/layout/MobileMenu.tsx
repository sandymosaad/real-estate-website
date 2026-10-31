"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "201000000000";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" className="rounded-xl p-2 text-ink md:hidden" aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
        <span className="text-2xl leading-none">{isOpen ? "×" : "☰"}</span>
      </button>
      <div
        className={`fixed inset-0 top-16 z-50 bg-ink/20 opacity-0 transition-opacity duration-300 md:hidden ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none"}`}
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute inset-y-0 end-0 w-72 border-s border-border bg-surface p-6 shadow-lg transition-transform duration-300 ease-site ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(event) => event.stopPropagation()}
        >
          <nav className="flex flex-col gap-5" aria-label="قائمة الهاتف">
            <ThemeToggle />
            {NAV_LINKS.map((link) => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium text-ink">{link.label}</Link>)}
            <Button href={`https://wa.me/${whatsapp}`} onClick={() => setIsOpen(false)}>كلمنا واتساب</Button>
          </nav>
        </div>
      </div>
    </>
  );
}
