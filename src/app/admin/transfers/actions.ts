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

/** Marks transfer documents as reviewed or clears that admin-only status. */
export async function setTransferDocumentsVerified(
  listingId: string,
  isDocumentsVerified: boolean,
): Promise<void> {
  await requireAdmin();
  await connectToDatabase();
  await TransferListingModel.updateOne(
    { _id: listingId },
    {
      isDocumentsVerified,
      documentsVerifiedAt: isDocumentsVerified ? new Date() : null,
    },
  );
  revalidatePath("/admin/transfers");
  revalidatePath("/transfers");
}
