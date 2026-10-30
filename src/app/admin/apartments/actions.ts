"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/require-admin";
import { connectToDatabase } from "@/lib/db";
import { ApartmentModel } from "@/models/Apartment";

/** Changes apartment visibility after verifying the admin session. */
export async function toggleApartmentPublish(
  apartmentId: string,
  isPublished: boolean,
): Promise<void> {
  await requireAdmin();
  await connectToDatabase();
  await ApartmentModel.updateOne({ _id: apartmentId }, { isPublished });
  revalidatePath("/admin/apartments");
  revalidatePath("/apartments");
}

/** Deletes an apartment after verifying the admin session. */
export async function deleteApartment(apartmentId: string): Promise<void> {
  await requireAdmin();
  await connectToDatabase();
  await ApartmentModel.deleteOne({ _id: apartmentId });
  revalidatePath("/admin/apartments");
  revalidatePath("/apartments");
}
