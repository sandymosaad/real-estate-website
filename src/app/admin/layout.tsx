import type { Metadata } from "next";
import Link from "next/link";
import { destroySession } from "@/lib/admin/session";
import { getSession } from "@/lib/admin/session";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
export const instant = false;

const adminLinks = [
  ["لوحة البيانات", "/admin"],
  ["الشقق", "/admin/apartments"],
  ["مشاريع الاتحاد", "/admin/union-projects"],
  ["شقق التنازل", "/admin/transfers"],
  ["الطلبات", "/admin/leads"],
  ["آراء العملاء", "/admin/testimonials"],
] as const;

/** Protects and wraps all administrator pages. */
export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) return children;
  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 text-ink">
      <aside className="fixed inset-y-0 start-0 hidden w-64 border-e bg-slate-950 p-5 text-white lg:block">
        <h1 className="text-xl font-bold">إدارة بيتك أسيوط</h1>
        <nav className="mt-8 space-y-2">
          {adminLinks.map(([label, href]) => <Link key={href} href={href} className="block rounded-lg p-3 hover:bg-slate-800">{label}</Link>)}
        </nav>
        <form action={async () => { "use server"; await destroySession(); }} className="mt-8">
          <button type="submit" className="w-full rounded-lg border border-slate-700 p-3 text-start">تسجيل الخروج</button>
        </form>
      </aside>
      <main className="min-h-screen p-5 lg:ms-64 lg:p-8">{children}</main>
    </div>
  );
}
