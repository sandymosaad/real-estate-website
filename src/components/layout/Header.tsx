import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "201000000000";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="shrink-0 text-xl font-bold text-primary">{SITE_NAME}</Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="التنقل الرئيسي">
          {NAV_LINKS.map((link) => <Link key={link.href} href={link.href} className="text-sm font-medium text-ink hover:text-primary">{link.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button href={`https://wa.me/${whatsapp}`} size="sm">كلمنا واتساب</Button>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
