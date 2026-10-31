import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/require-admin";
import { ImageUploader } from "@/components/admin/ImageUploader";
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
      <p className="mt-2 text-warning">
        الإعلان سيظل غير منشور حتى تتم مراجعته.
      </p>
      <form action={createTransferListingFromForm} className="form-card mt-6 grid gap-4 shadow-sm md:grid-cols-2">
        <input name="title" required placeholder="عنوان الإعلان" className="form-control" />
        <input name="slugSource" required placeholder="مصدر الرابط" className="form-control" />
        <textarea name="description" required placeholder="الوصف" className="min-h-28 form-control md:col-span-2" />
        <input name="address" required placeholder="العنوان" className="form-control" />
        <select name="district" required className="form-control form-select"><option value="">المركز</option>{ASSIUT_DISTRICTS.map((item) => <option key={item}>{item}</option>)}</select>
        <input name="areaSqm" type="number" min="0" required placeholder="المساحة" className="form-control" />
        <input name="rooms" type="number" min="0" required placeholder="الغرف" className="form-control" />
        <input name="bathrooms" type="number" min="0" required placeholder="الحمامات" className="form-control" />
        <input name="floor" type="number" min="0" required placeholder="الدور" className="form-control" />
        <select name="status" required className="form-control form-select"><option value="">الحالة</option>{APARTMENT_STATUSES.map((item) => <option key={item}>{item}</option>)}</select>
        <input name="sellerCompanyName" required placeholder="الجهة البائعة" className="form-control" />
        <input name="originalPrice" type="number" min="0" required placeholder="السعر الأصلي" className="form-control" />
        <input name="amountPaid" type="number" min="0" required placeholder="المبلغ المدفوع" className="form-control" />
        <input name="estimatedMarketPrice" type="number" min="0" placeholder="تقدير سعر السوق (اختياري)" className="form-control" />
        <input name="transferAmountRequested" type="number" min="0" required placeholder="مبلغ التنازل" className="form-control" />
        <input name="monthlyInstallment" type="number" min="0" required placeholder="القسط الشهري" className="form-control" />
        <input name="remainingInstallments" type="number" min="0" required placeholder="الأقساط المتبقية" className="form-control" />
        <select name="listingStatus" required className="form-control form-select"><option value="">حالة الإعلان</option>{TRANSFER_LISTING_STATUSES.map((item) => <option key={item}>{item}</option>)}</select>
        <ImageUploader />
        <label className="flex items-center gap-2 text-sm">
          <input name="isDocumentsVerified" type="checkbox" value="true" className="form-check" />
          مستندات متراجعة
        </label>
        <button className="rounded-xl bg-primary p-3 font-bold text-on-primary md:col-span-2">حفظ الإعلان للمراجعة</button>
      </form>
    </section>
  );
}
