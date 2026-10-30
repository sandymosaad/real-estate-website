"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/require-admin";
import { connectToDatabase } from "@/lib/db";
import { TransferListingModel } from "@/models/TransferListing";

/** Changes transfer listing visibility after verifying the admin session. */
export async function toggleTransferListingPublish(
  listingId: string,
  isPublished: boolean,
): Promise<void> {
  await requireAdmin();
  await connectToDatabase();
  await TransferListingModel.updateOne(
    { _id: listingId },
    { isPublished: Boolean(isPublished) },
  );
  revalidatePath("/admin/transfers");
  revalidatePath("/transfers");
}

/** Deletes a transfer listing after verifying the admin session. */
export async function deleteTransferListing(listingId: string): Promise<void> {
  await requireAdmin();
  await connectToDatabase();
  await TransferListingModel.deleteOne({ _id: listingId });
  revalidatePath("/admin/transfers");
  revalidatePath("/transfers");
}
