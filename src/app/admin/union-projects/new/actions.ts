"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/require-admin";
import { connectToDatabase } from "@/lib/db";
import { createSlug } from "@/lib/slug";
import { UnionProjectModel } from "@/models/UnionProject";
import {
  unionProjectAdminSchema,
  type UnionProjectAdminInput,
} from "@/lib/validation/admin/listing-schemas";

function getProjectInput(formData: FormData): UnionProjectAdminInput {
  return unionProjectAdminSchema.parse(Object.fromEntries(formData));
}

async function getUniqueSlug(source: string): Promise<string> {
  const baseSlug = createSlug(source) || `union-project-${Date.now()}`;
  let slug = baseSlug;
  let suffix = 1;
  while (await UnionProjectModel.exists({ slug })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  return slug;
}

/** Creates a union project after validating the protected admin form. */
export async function createUnionProjectFromForm(formData: FormData): Promise<void> {
  await requireAdmin();
  const input = getProjectInput(formData);
  if (input.reservedSeats > input.totalSeats) {
    throw new Error("عدد المقاعد المحجوزة أكبر من الإجمالي.");
  }
  await connectToDatabase();
  const slug = await getUniqueSlug(input.slugSource);
  await UnionProjectModel.create({ ...input, slug, images: [] });
  revalidatePath("/admin/union-projects");
  revalidatePath("/union");
}
