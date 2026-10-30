import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/require-admin";
import {
  APARTMENT_FINISHINGS,
  APARTMENT_STATUSES,
  ASSIUT_DISTRICTS,
} from "@/lib/constants";
import { createApartmentFromForm } from "./actions";

export const metadata: Metadata = {
  title: "إضافة شقة",
  robots: { index: false, follow: false },
};

export const instant = false;

/** Renders the protected apartment creation form. */
export default async function NewApartmentPage() {
  await requireAdmin();

  return (
    <section>
      <h1 className="text-3xl font-bold">إضافة شقة</h1>
      <form
        action={createApartmentFromForm}
        className="mt-6 grid gap-4 rounded-xl bg-white p-6 shadow-sm md:grid-cols-2"
      >
        <input
          name="title"
          required
          placeholder="عنوان الشقة"
          className="rounded-xl border p-3"
        />
        <input
          name="slugSource"
          required
          placeholder="مصدر الرابط بالإنجليزية أو العربية"
          className="rounded-xl border p-3"
        />
        <textarea
          name="description"
          required
          placeholder="الوصف"
          className="min-h-28 rounded-xl border p-3 md:col-span-2"
        />
        <input
          name="address"
          required
          placeholder="العنوان"
          className="rounded-xl border p-3"
        />
        <select
          name="district"
          required
          className="rounded-xl border p-3"
        >
          <option value="">المركز</option>
          {ASSIUT_DISTRICTS.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <input
          name="price"
          type="number"
          min="0"
          required
          placeholder="السعر"
          className="rounded-xl border p-3"
        />
        <input
          name="areaSqm"
          type="number"
          min="0"
          required
          placeholder="المساحة بالمتر"
          className="rounded-xl border p-3"
        />
        <input
          name="rooms"
          type="number"
          min="0"
          required
          placeholder="عدد الغرف"
          className="rounded-xl border p-3"
        />
        <input
          name="bathrooms"
          type="number"
          min="0"
          required
          placeholder="عدد الحمامات"
          className="rounded-xl border p-3"
        />
        <input
          name="floor"
          type="number"
          min="0"
          required
          placeholder="الدور"
          className="rounded-xl border p-3"
        />
        <select
          name="finishing"
          required
          className="rounded-xl border p-3"
        >
          <option value="">التشطيب</option>
          {APARTMENT_FINISHINGS.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select name="status" required className="rounded-xl border p-3">
          <option value="">الحالة</option>
          {APARTMENT_STATUSES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <button className="rounded-xl bg-primary p-3 font-bold text-white md:col-span-2">
          حفظ الشقة
        </button>
      </form>
    </section>
  );
}
