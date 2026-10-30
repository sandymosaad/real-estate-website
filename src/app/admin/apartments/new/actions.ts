"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/require-admin";
import { connectToDatabase } from "@/lib/db";
import { createSlug } from "@/lib/slug";
import { ApartmentModel } from "@/models/Apartment";
import {
  apartmentAdminSchema,
  type ApartmentAdminInput,
} from "@/lib/validation/admin/listing-schemas";

function getApartmentInput(formData: FormData): ApartmentAdminInput {
  return apartmentAdminSchema.parse(Object.fromEntries(formData));
}

async function getUniqueSlug(source: string): Promise<string> {
  const baseSlug = createSlug(source) || `apartment-${Date.now()}`;
  let slug = baseSlug;
  let suffix = 1;
  while (await ApartmentModel.exists({ slug })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  return slug;
}

/** Creates an apartment after validating the protected admin form. */
export async function createApartmentFromForm(formData: FormData): Promise<void> {
  await requireAdmin();
  const input = getApartmentInput(formData);
  await connectToDatabase();
  const slug = await getUniqueSlug(input.slugSource);
  await ApartmentModel.create({ ...input, slug, images: [], features: [] });
  revalidatePath("/admin/apartments");
  revalidatePath("/apartments");
}
