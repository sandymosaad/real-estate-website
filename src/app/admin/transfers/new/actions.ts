"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/require-admin";
import { connectToDatabase } from "@/lib/db";
import { createSlug } from "@/lib/slug";
import { TransferListingModel } from "@/models/TransferListing";
import {
  transferListingAdminSchema,
  type TransferListingAdminInput,
} from "@/lib/validation/admin/listing-schemas";

function getTransferInput(formData: FormData): TransferListingAdminInput {
  return transferListingAdminSchema.parse(Object.fromEntries(formData));
}

async function getUniqueSlug(source: string): Promise<string> {
  const baseSlug = createSlug(source) || `transfer-${Date.now()}`;
  let slug = baseSlug;
  let suffix = 1;
  while (await TransferListingModel.exists({ slug })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  return slug;
}

/** Creates an unpublished transfer listing for administrator review. */
export async function createTransferListingFromForm(
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  const input = getTransferInput(formData);
  if (input.amountPaid > input.originalPrice) {
    throw new Error("المبلغ المدفوع لا يمكن أن يتجاوز السعر الأصلي.");
  }
  await connectToDatabase();
  const slug = await getUniqueSlug(input.slugSource);
  const images = JSON.parse(input.images) as string[];
  await TransferListingModel.create({
    ...input,
    slug,
    images,
    isPublished: false,
    documentsVerifiedAt: input.isDocumentsVerified ? new Date() : undefined,
  });
  revalidatePath("/admin/transfers");
  revalidatePath("/transfers");
}
