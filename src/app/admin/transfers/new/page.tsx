import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/require-admin";
import { ASSIUT_DISTRICTS, APARTMENT_STATUSES, TRANSFER_LISTING_STATUSES } from "@/lib/constants";
import { createTransferListingFromForm } from "./actions";

export const metadata: Metadata = {
  title: "إضافة شقة تنازل",
  robots: { index: false, follow: false },
};
export const instant = false;

/** Renders the protected transfer listing creation form. */
export default async function NewTransferListingPage() {
  await requireAdmin();
  return (
    <section>
      <h1 className="text-3xl font-bold">إضافة شقة تنازل</h1>
      <p className="mt-2 text-amber-700">الإعلان سيظل غير منشور حتى تتم مراجعته.</p>
      <form action={createTransferListingFromForm} className="mt-6 grid gap-4 rounded-xl bg-white p-6 shadow-sm md:grid-cols-2">
        <input name="title" required placeholder="عنوان الإعلان" className="rounded-xl border p-3" />
        <input name="slugSource" required placeholder="مصدر الرابط" className="rounded-xl border p-3" />
        <textarea name="description" required placeholder="الوصف" className="min-h-28 rounded-xl border p-3 md:col-span-2" />
        <input name="address" required placeholder="العنوان" className="rounded-xl border p-3" />
        <select name="district" required className="rounded-xl border p-3"><option value="">المركز</option>{ASSIUT_DISTRICTS.map((item) => <option key={item}>{item}</option>)}</select>
        <input name="areaSqm" type="number" min="0" required placeholder="المساحة" className="rounded-xl border p-3" />
        <input name="rooms" type="number" min="0" required placeholder="الغرف" className="rounded-xl border p-3" />
        <input name="bathrooms" type="number" min="0" required placeholder="الحمامات" className="rounded-xl border p-3" />
        <input name="floor" type="number" min="0" required placeholder="الدور" className="rounded-xl border p-3" />
        <select name="status" required className="rounded-xl border p-3"><option value="">الحالة</option>{APARTMENT_STATUSES.map((item) => <option key={item}>{item}</option>)}</select>
        <input name="sellerCompanyName" required placeholder="الجهة البائعة" className="rounded-xl border p-3" />
        <input name="originalPrice" type="number" min="0" required placeholder="السعر الأصلي" className="rounded-xl border p-3" />
        <input name="amountPaid" type="number" min="0" required placeholder="المبلغ المدفوع" className="rounded-xl border p-3" />
        <input name="transferAmountRequested" type="number" min="0" required placeholder="مبلغ التنازل" className="rounded-xl border p-3" />
        <input name="monthlyInstallment" type="number" min="0" required placeholder="القسط الشهري" className="rounded-xl border p-3" />
        <input name="remainingInstallments" type="number" min="0" required placeholder="الأقساط المتبقية" className="rounded-xl border p-3" />
        <select name="listingStatus" required className="rounded-xl border p-3"><option value="">حالة الإعلان</option>{TRANSFER_LISTING_STATUSES.map((item) => <option key={item}>{item}</option>)}</select>
        <button className="rounded-xl bg-primary p-3 font-bold text-white md:col-span-2">حفظ الإعلان للمراجعة</button>
      </form>
    </section>
  );
}
