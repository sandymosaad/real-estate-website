import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/require-admin";
import { connectToDatabase } from "@/lib/db";
import { LeadModel } from "@/models/Lead";
import { updateLeadStatus } from "./actions";

export const metadata: Metadata = {
  title: "إدارة الطلبات",
  robots: { index: false, follow: false },
};

type LeadsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

/** Lists and filters contact leads for authenticated administrators. */
export default async function AdminLeadsPage({ searchParams }: LeadsPageProps) {
  await requireAdmin();
  const filters = await searchParams;
  const status = getValue(filters.status);
  const search = getValue(filters.search);
  await connectToDatabase();
  const query: Record<string, unknown> = {};
  if (status) query.status = status;
  if (search) query.$or = [{ fullName: { $regex: search, $options: "i" } }, { phone: { $regex: search } }];
  const leads = await LeadModel.find(query).sort({ createdAt: -1 }).limit(100).lean();
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">الطلبات</h1>
        <Link href="/api/admin/leads/export" className="rounded-xl bg-primary px-4 py-3 font-bold text-on-primary">تصدير CSV</Link>
      </div>
      <form className="form-card mt-6 grid gap-3 p-4 sm:grid-cols-3">
        <input name="search" defaultValue={search} placeholder="ابحث بالاسم أو الموبايل" className="form-control" />
        <select name="status" defaultValue={status} className="form-control form-select"><option value="">كل الحالات</option><option>جديد</option><option>تم التواصل</option><option>مغلق</option></select>
        <button className="rounded-xl bg-surface p-3 font-bold text-on-primary">بحث</button>
      </form>
      <div className="mt-6 overflow-x-auto rounded-xl bg-surface shadow-sm">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-start">التاريخ</th>
              <th className="p-4 text-start">الاسم</th>
              <th className="p-4 text-start">الموبايل</th>
              <th className="p-4 text-start">الاهتمام</th>
              <th className="p-4 text-start">الرسالة</th>
              <th className="p-4 text-start">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={String(lead._id)} className="border-b align-top">
                <td className="p-4">
                  {new Date(lead.createdAt).toLocaleDateString("ar-EG")}
                </td>
                <td className="p-4">{lead.fullName}</td>
                <td className="p-4">{lead.phone}</td>
                <td className="p-4">{lead.interestType}</td>
                <td className="max-w-xs whitespace-pre-wrap p-4 leading-6 text-muted">
                  {lead.message || "مفيش رسالة"}
                </td>
                <td className="p-4">
                  <form
                    action={updateLeadStatus.bind(
                      null,
                      String(lead._id),
                      "تم التواصل",
                    )}
                  >
                    <button className="rounded-lg bg-primary-light px-3 py-2">
                      {lead.status}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
