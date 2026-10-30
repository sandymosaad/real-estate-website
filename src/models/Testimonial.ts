import { model, models, Schema, type InferSchemaType } from "mongoose";
import { DISTRICTS } from "@/lib/constants";

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    district: { type: String, required: true, enum: DISTRICTS },
    text: { type: String, required: true, maxlength: 400, trim: true },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type Testimonial = InferSchemaType<typeof testimonialSchema>;
export const TestimonialModel =
  models.Testimonial || model("Testimonial", testimonialSchema);
