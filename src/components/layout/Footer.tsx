import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

const phone = process.env.NEXT_PUBLIC_PHONE || "01000000000";
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "201000000000";
const copyrightYear = "2026";

export function Footer() {
  return (
    <footer className="border-t border-border bg-light">
      <Container className="grid gap-8 py-12 md:grid-cols-3">
        <div><h2 className="text-xl font-bold text-primary">{SITE_NAME}</h2><p className="mt-3 leading-7 text-muted">{SITE_TAGLINE}</p></div>
        <div><h2 className="font-bold text-ink">روابط سريعة</h2><nav className="mt-3 flex flex-col gap-2" aria-label="روابط سريعة">{NAV_LINKS.slice(0, 4).map((link) => <Link key={link.href} href={link.href} className="text-muted hover:text-primary">{link.label}</Link>)}</nav></div>
        <div><h2 className="font-bold text-ink">تواصل معانا</h2><div className="mt-3 flex flex-col gap-2 text-muted"><a href={`tel:${phone}`}>تليفون: {phone}</a><a href={`https://wa.me/${whatsapp}`}>واتساب: {whatsapp}</a></div></div>
      </Container>
      <div className="border-t border-border py-4 text-center text-sm text-muted">© {copyrightYear} {SITE_NAME}. كل الحقوق محفوظة.</div>
    </footer>
  );
}
