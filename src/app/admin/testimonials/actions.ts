"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/require-admin";
import { connectToDatabase } from "@/lib/db";
import {
  testimonialAdminSchema,
  type TestimonialAdminInput,
} from "@/lib/validation/admin/testimonial-schema";
import { TestimonialModel } from "@/models/Testimonial";
import type { District } from "@/lib/constants";

function parseTestimonialInput(input: TestimonialAdminInput): TestimonialAdminInput {
  return testimonialAdminSchema.parse(input);
}

function getTestimonialInput(formData: FormData): TestimonialAdminInput {
  return {
    name: String(formData.get("name") ?? ""),
    district: String(formData.get("district") ?? "") as District,
    text: String(formData.get("text") ?? ""),
    isPublished: formData.get("isPublished") === "true",
  };
}

/** Creates a testimonial from the protected administrator form. */
export async function createTestimonialFromForm(
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  await createTestimonial(getTestimonialInput(formData));
}

/** Creates a testimonial after validating the administrator input. */
export async function createTestimonial(
  input: TestimonialAdminInput,
): Promise<void> {
  await requireAdmin();
  await connectToDatabase();
  await TestimonialModel.create(parseTestimonialInput(input));
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

/** Updates a testimonial from the protected administrator form. */
export async function updateTestimonialFromForm(
  testimonialId: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  await updateTestimonial(testimonialId, getTestimonialInput(formData));
}

/** Updates a testimonial after validating the administrator input. */
export async function updateTestimonial(
  testimonialId: string,
  input: TestimonialAdminInput,
): Promise<void> {
  await requireAdmin();
  await connectToDatabase();
  await TestimonialModel.updateOne(
    { _id: testimonialId },
    parseTestimonialInput(input),
  );
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

/** Deletes a testimonial after verifying the administrator session. */
export async function deleteTestimonial(testimonialId: string): Promise<void> {
  await requireAdmin();
  await connectToDatabase();
  await TestimonialModel.deleteOne({ _id: testimonialId });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

/** Changes testimonial visibility after verifying the administrator session. */
export async function toggleTestimonialPublish(
  testimonialId: string,
  isPublished: boolean,
): Promise<void> {
  await requireAdmin();
  await connectToDatabase();
  await TestimonialModel.updateOne(
    { _id: testimonialId },
    { isPublished: Boolean(isPublished) },
  );
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
