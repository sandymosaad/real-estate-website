import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/require-admin";
import { getAdminStats, getLatestLeads } from "@/lib/admin/stats";

export const metadata: Metadata = {
  title: "لوحة البيانات",
  robots: { index: false, follow: false },
};

/** Displays the protected administrator dashboard entry point. */
export default async function AdminDashboardPage() {
  await requireAdmin();
  const [stats, latestLeads] = await Promise.all([
    getAdminStats(),
    getLatestLeads(),
  ]);
  return (
    <section>
      <h1 className="text-3xl font-bold">لوحة البيانات</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="الطلبات الجديدة" value={stats.newLeads} />
        <StatCard
          label="الشقق"
          value={`${stats.apartments.published} منشورة / ${stats.apartments.unpublished} مخفية`}
        />
        <StatCard
          label="مشاريع الاتحاد"
          value={`${stats.unionProjects.published} منشورة / ${stats.unionProjects.unpublished} مخفية`}
        />
        <StatCard
          label="شقق التنازل"
          value={`${stats.transferListings.published} منشورة / ${stats.transferListings.unpublished} للمراجعة`}
        />
      </div>
      <div className="mt-8 overflow-x-auto rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">آخر الطلبات</h2>
        <table className="mt-4 w-full text-start text-sm">
          <thead><tr className="border-b text-start"><th className="p-3 text-start">الاسم</th><th className="p-3 text-start">الاهتمام</th><th className="p-3 text-start">الحالة</th></tr></thead>
          <tbody>{latestLeads.map((lead) => <tr key={String(lead._id)} className="border-b"><td className="p-3">{lead.fullName}</td><td className="p-3">{lead.interestType}</td><td className="p-3">{lead.status}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return <div className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-xl font-bold">{value}</p></div>;
}
