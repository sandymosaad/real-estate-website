import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/require-admin";
import { connectToDatabase } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { TransferListingModel } from "@/models/TransferListing";
import {
  deleteTransferListing,
  setTransferDocumentsVerified,
  toggleTransferListingPublish,
} from "./actions";

export const metadata: Metadata = {
  title: "إدارة شقق التنازل",
  robots: { index: false, follow: false },
};

export const instant = false;

type TransfersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSearchValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

/** Lists and protects transfer listings for administrator review. */
export default async function AdminTransfersPage({
  searchParams,
}: TransfersPageProps) {
  await requireAdmin();
  const filters = await searchParams;
  const search = getSearchValue(filters.search);
  await connectToDatabase();

  const query = search
    ? { title: { $regex: search, $options: "i" } }
    : {};
  const listings = await TransferListingModel.find(query)
    .sort({ createdAt: -1 })
    .lean();

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">شقق التنازل</h1>
        <Link href="/admin/transfers/new" className="rounded-xl bg-primary px-4 py-3 font-bold text-on-primary">
          إضافة إعلان
        </Link>
      </div>
      <p className="mt-2 text-muted">
        راجع الإعلانات قبل نشرها على الموقع العام.
      </p>
      <form className="mt-6 flex gap-3 rounded-xl bg-surface p-4 shadow-sm">
        <input
          name="search"
          defaultValue={search}
          placeholder="ابحث بعنوان الإعلان"
          className="flex-1 rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="rounded-xl bg-surface px-5 font-bold text-on-primary"
        >
          بحث
        </button>
      </form>
      <div className="mt-6 overflow-x-auto rounded-xl bg-surface shadow-sm">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-start">العنوان</th>
              <th className="p-4 text-start">المركز</th>
              <th className="p-4 text-start">مبلغ التنازل</th>
              <th className="p-4 text-start">الحالة</th>
              <th className="p-4 text-start">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={String(listing._id)} className="border-b">
                <td className="p-4 font-semibold">{listing.title}</td>
                <td className="p-4">{listing.district}</td>
                <td className="p-4">
                  {formatPrice(listing.transferAmountRequested)}
                </td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 ${
                      listing.isPublished
                        ? "bg-primary-light text-success"
                        : "bg-primary-light text-warning"
                    }`}
                  >
                    {listing.isPublished ? "منشور" : "للمراجعة"}
                  </span>
                  {listing.isDocumentsVerified && (
                    <span className="ms-2 rounded-full bg-primary-light px-3 py-1 text-primary">
                      مستندات متراجعة
                    </span>
                  )}
                </td>
                <td className="flex gap-2 p-4">
                  <form
                    action={toggleTransferListingPublish.bind(
                      null,
                      String(listing._id),
                      !listing.isPublished,
                    )}
                  >
                    <button className="rounded-lg border px-3 py-2">
                      {listing.isPublished ? "إلغاء النشر" : "نشر"}
                    </button>
                  </form>
                  <form
                    action={setTransferDocumentsVerified.bind(
                      null,
                      String(listing._id),
                      !listing.isDocumentsVerified,
                    )}
                  >
                    <button className="rounded-lg border px-3 py-2">
                      {listing.isDocumentsVerified
                        ? "إلغاء مراجعة المستندات"
                        : "تأكيد مراجعة المستندات"}
                    </button>
                  </form>
                  <form
                    action={deleteTransferListing.bind(
                      null,
                      String(listing._id),
                    )}
                  >
                    <button className="rounded-lg border border-error px-3 py-2 text-error">
                      حذف
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {listings.length === 0 && (
          <p className="p-8 text-center text-muted">
            لا توجد شقق تنازل مسجلة حتى الآن.
          </p>
        )}
      </div>
    </section>
  );
}
