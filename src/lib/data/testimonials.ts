import { connectToDatabase } from "@/lib/db";
import { TestimonialModel, type Testimonial } from "@/models/Testimonial";

/** Returns published testimonials for the public landing page. */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  try {
    await connectToDatabase();
    return TestimonialModel.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .lean<Testimonial[]>();
  } catch (error: unknown) {
    console.error("تعذر تحميل آراء العملاء:", error);
    throw error;
  }
}
