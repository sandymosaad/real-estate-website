"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/require-admin";
import { connectToDatabase } from "@/lib/db";
import { UnionProjectModel } from "@/models/UnionProject";

/** Changes union project visibility after verifying the admin session. */
export async function toggleUnionProjectPublish(
  projectId: string,
  isPublished: boolean,
): Promise<void> {
  await requireAdmin();
  await connectToDatabase();
  await UnionProjectModel.updateOne({ _id: projectId }, { isPublished });
  revalidatePath("/admin/union-projects");
  revalidatePath("/union");
}

/** Deletes a union project after verifying the admin session. */
export async function deleteUnionProject(projectId: string): Promise<void> {
  await requireAdmin();
  await connectToDatabase();
  await UnionProjectModel.deleteOne({ _id: projectId });
  revalidatePath("/admin/union-projects");
  revalidatePath("/union");
}
