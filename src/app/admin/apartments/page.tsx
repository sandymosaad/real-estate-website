import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/require-admin";
import { connectToDatabase } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { ApartmentModel } from "@/models/Apartment";
import { deleteApartment, toggleApartmentPublish } from "./actions";

export const metadata: Metadata = {
  title: "إدارة الشقق",
  robots: { index: false, follow: false },
};

export const instant = false;

type ApartmentsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSearchValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

/** Lists and protects apartments for administrators. */
export default async function AdminApartmentsPage({
  searchParams,
}: ApartmentsPageProps) {
  await requireAdmin();
  const filters = await searchParams;
  const search = getSearchValue(filters.search);
  await connectToDatabase();
  const query = search
    ? { title: { $regex: search, $options: "i" } }
    : {};
  const apartments = await ApartmentModel.find(query)
    .sort({ createdAt: -1 })
    .lean();

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">الشقق</h1>
        <Link href="/admin/apartments/new" className="rounded-xl bg-primary px-4 py-3 font-bold text-on-primary">
          إضافة شقة
        </Link>
      </div>
      <form className="mt-6 flex gap-3 rounded-xl bg-surface p-4 shadow-sm">
        <input
          name="search"
          defaultValue={search}
          placeholder="ابحث بعنوان الشقة"
          className="flex-1 rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary"
        />
        <button className="rounded-xl bg-surface px-5 font-bold text-on-primary">
          بحث
        </button>
      </form>
      <div className="mt-6 overflow-x-auto rounded-xl bg-surface shadow-sm">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-start">العنوان</th>
              <th className="p-4 text-start">المركز</th>
              <th className="p-4 text-start">السعر</th>
              <th className="p-4 text-start">النشر</th>
              <th className="p-4 text-start">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {apartments.map((apartment) => (
              <tr key={String(apartment._id)} className="border-b">
                <td className="p-4 font-semibold">{apartment.title}</td>
                <td className="p-4">{apartment.district}</td>
                <td className="p-4">{formatPrice(apartment.price)}</td>
                <td className="p-4">
                  {apartment.isPublished ? "منشورة" : "مخفية"}
                </td>
                <td className="flex gap-2 p-4">
                  <form
                    action={toggleApartmentPublish.bind(
                      null,
                      String(apartment._id),
                      !apartment.isPublished,
                    )}
                  >
                    <button className="rounded-lg border px-3 py-2">
                      {apartment.isPublished ? "إلغاء النشر" : "نشر"}
                    </button>
                  </form>
                  <form
                    action={deleteApartment.bind(null, String(apartment._id))}
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
        {apartments.length === 0 && (
          <p className="p-8 text-center text-muted">
            لا توجد شقق مسجلة حتى الآن.
          </p>
        )}
      </div>
    </section>
  );
}
