"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/admin/require-admin";
import { LeadModel } from "@/models/Lead";

const leadStatuses = ["جديد", "تم التواصل", "مغلق"] as const;
type LeadStatus = (typeof leadStatuses)[number];

/** Updates a lead status after verifying the administrator session. */
export async function updateLeadStatus(
  leadId: string,
  status: LeadStatus,
): Promise<void> {
  await requireAdmin();
  if (!leadStatuses.includes(status)) throw new Error("حالة غير صالحة.");
  await connectToDatabase();
  await LeadModel.updateOne({ _id: leadId }, { status });
  revalidatePath("/admin/leads");
}

/** Saves an internal note on a lead. */
export async function updateLeadNote(
  leadId: string,
  adminNote: string,
): Promise<void> {
  await requireAdmin();
  await connectToDatabase();
  await LeadModel.updateOne({ _id: leadId }, { adminNote: adminNote.trim().slice(0, 1000) });
  revalidatePath("/admin/leads");
}

/** Deletes a lead after verifying the administrator session. */
export async function deleteLead(leadId: string): Promise<void> {
  await requireAdmin();
  await connectToDatabase();
  await LeadModel.deleteOne({ _id: leadId });
  revalidatePath("/admin/leads");
}
