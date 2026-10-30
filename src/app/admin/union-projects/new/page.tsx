import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/require-admin";
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
      <form action={createUnionProjectFromForm} className="mt-6 grid gap-4 rounded-xl bg-white p-6 shadow-sm md:grid-cols-2">
        <input name="title" required placeholder="اسم المشروع" className="rounded-xl border p-3" />
        <input name="slugSource" required placeholder="مصدر الرابط" className="rounded-xl border p-3" />
        <textarea name="description" required placeholder="الوصف" className="min-h-28 rounded-xl border p-3 md:col-span-2" />
        <select name="district" required className="rounded-xl border p-3"><option value="">المركز</option>{ASSIUT_DISTRICTS.map((item) => <option key={item}>{item}</option>)}</select>
        <select name="stage" required className="rounded-xl border p-3"><option value="">المرحلة</option>{UNION_STAGES.map((item) => <option key={item}>{item}</option>)}</select>
        <input name="landPrice" type="number" min="0" required placeholder="سعر الأرض" className="rounded-xl border p-3" />
        <input name="totalProjectCost" type="number" min="0" required placeholder="إجمالي تكلفة المشروع" className="rounded-xl border p-3" />
        <input name="totalSeats" type="number" min="1" required placeholder="إجمالي المقاعد" className="rounded-xl border p-3" />
        <input name="reservedSeats" type="number" min="0" required placeholder="المقاعد المحجوزة" className="rounded-xl border p-3" />
        <input name="landAreaSqm" type="number" min="0" required placeholder="مساحة الأرض" className="rounded-xl border p-3" />
        <button className="rounded-xl bg-primary p-3 font-bold text-white md:col-span-2">حفظ المشروع</button>
      </form>
    </section>
  );
}
