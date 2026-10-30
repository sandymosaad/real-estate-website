import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import { connectToDatabase } from "@/lib/db";
import { LeadModel } from "@/models/Lead";

function escapeCsvCell(value: unknown): string {
  const text = String(value ?? "");
  const safeText = /^[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safeText.replaceAll('"', '""')}"`;
}

/** Exports protected lead data as formula-safe CSV. */
export async function GET(): Promise<NextResponse> {
  await requireAdmin();
  await connectToDatabase();
  const leads = await LeadModel.find().sort({ createdAt: -1 }).lean();
  const rows = [
    ["التاريخ", "الاسم", "الموبايل", "الاهتمام", "المركز", "الحالة"],
    ...leads.map((lead) => [
      lead.createdAt,
      lead.fullName,
      lead.phone,
      lead.interestType,
      lead.district,
      lead.status,
    ]),
  ];
  const csv = rows.map((row) => row.map(escapeCsvCell).join(",")).join("\n");
  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="leads.csv"',
    },
  });
}
