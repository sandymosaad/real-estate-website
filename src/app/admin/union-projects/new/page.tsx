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
      <form action={createUnionProjectFromForm} className="form-card mt-6 grid gap-4 shadow-sm md:grid-cols-2">
        <input name="title" required placeholder="اسم المشروع" className="form-control" />
        <input name="slugSource" required placeholder="مصدر الرابط" className="form-control" />
        <textarea name="description" required placeholder="الوصف" className="min-h-28 form-control md:col-span-2" />
        <select name="district" required className="form-control form-select"><option value="">المركز</option>{ASSIUT_DISTRICTS.map((item) => <option key={item}>{item}</option>)}</select>
        <select name="stage" required className="form-control form-select"><option value="">المرحلة</option>{UNION_STAGES.map((item) => <option key={item}>{item}</option>)}</select>
        <input name="landPrice" type="number" min="0" required placeholder="سعر الأرض" className="form-control" />
        <input name="totalProjectCost" type="number" min="0" required placeholder="إجمالي تكلفة المشروع" className="form-control" />
        <input name="totalSeats" type="number" min="1" required placeholder="إجمالي المقاعد" className="form-control" />
        <input name="reservedSeats" type="number" min="0" required placeholder="المقاعد المحجوزة" className="form-control" />
        <input name="landAreaSqm" type="number" min="0" required placeholder="مساحة الأرض" className="form-control" />
        <ImageUploader />
        <button className="rounded-xl bg-primary p-3 font-bold text-on-primary md:col-span-2">حفظ المشروع</button>
      </form>
    </section>
  );
}
