import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/require-admin";
import {
  APARTMENT_FINISHINGS,
  APARTMENT_STATUSES,
  ASSIUT_DISTRICTS,
} from "@/lib/constants";
import { ImageUploader } from "@/components/admin/ImageUploader";
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
        className="form-card mt-6 grid gap-4 shadow-sm md:grid-cols-2"
      >
        <input
          name="title"
          required
          placeholder="عنوان الشقة"
          className="form-control"
        />
        <input
          name="slugSource"
          required
          placeholder="مصدر الرابط بالإنجليزية أو العربية"
          className="form-control"
        />
        <textarea
          name="description"
          required
          placeholder="الوصف"
          className="min-h-28 form-control md:col-span-2"
        />
        <input
          name="address"
          required
          placeholder="العنوان"
          className="form-control"
        />
        <select
          name="district"
          required
          className="form-control form-select"
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
          className="form-control"
        />
        <input
          name="areaSqm"
          type="number"
          min="0"
          required
          placeholder="المساحة بالمتر"
          className="form-control"
        />
        <input
          name="rooms"
          type="number"
          min="0"
          required
          placeholder="عدد الغرف"
          className="form-control"
        />
        <input
          name="bathrooms"
          type="number"
          min="0"
          required
          placeholder="عدد الحمامات"
          className="form-control"
        />
        <input
          name="floor"
          type="number"
          min="0"
          required
          placeholder="الدور"
          className="form-control"
        />
        <select
          name="finishing"
          required
          className="form-control form-select"
        >
          <option value="">التشطيب</option>
          {APARTMENT_FINISHINGS.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select name="status" required className="form-control form-select">
          <option value="">الحالة</option>
          {APARTMENT_STATUSES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <ImageUploader />
        <button className="rounded-xl bg-primary p-3 font-bold text-on-primary md:col-span-2">
          حفظ الشقة
        </button>
      </form>
    </section>
  );
}
