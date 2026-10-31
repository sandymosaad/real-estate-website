import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/require-admin";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { ASSIUT_DISTRICTS, UNION_STAGES } from "@/lib/constants";
import { createUnionProjectFromForm } from "./actions";

export const metadata: Metadata = {
  title: "إضافة مشروع اتحاد",
  robots: { index: false, follow: false },
};
export const instant = false;

/** Renders the protected union project creation form. */
export default async function NewUnionProjectPage() {
  await requireAdmin();
  return (
    <section>
      <h1 className="text-3xl font-bold">إضافة مشروع اتحاد</h1>
      <form action={createUnionProjectFromForm} className="mt-6 grid gap-4 rounded-xl bg-surface p-6 shadow-sm md:grid-cols-2">
        <input name="title" required placeholder="اسم المشروع" className="rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
        <input name="slugSource" required placeholder="مصدر الرابط" className="rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
        <textarea name="description" required placeholder="الوصف" className="min-h-28 rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary md:col-span-2" />
        <select name="district" required className="rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary"><option value="">المركز</option>{ASSIUT_DISTRICTS.map((item) => <option key={item}>{item}</option>)}</select>
        <select name="stage" required className="rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary"><option value="">المرحلة</option>{UNION_STAGES.map((item) => <option key={item}>{item}</option>)}</select>
        <input name="landPrice" type="number" min="0" required placeholder="سعر الأرض" className="rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
        <input name="totalProjectCost" type="number" min="0" required placeholder="إجمالي تكلفة المشروع" className="rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
        <input name="totalSeats" type="number" min="1" required placeholder="إجمالي المقاعد" className="rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
        <input name="reservedSeats" type="number" min="0" required placeholder="المقاعد المحجوزة" className="rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
        <input name="landAreaSqm" type="number" min="0" required placeholder="مساحة الأرض" className="rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
        <ImageUploader />
        <button className="rounded-xl bg-primary p-3 font-bold text-on-primary md:col-span-2">حفظ المشروع</button>
      </form>
    </section>
  );
}
