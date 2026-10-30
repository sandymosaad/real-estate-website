import { z } from "zod";
import { DISTRICTS } from "@/lib/constants";

export const testimonialAdminSchema = z.object({
  name: z.string().trim().min(3, "اكتب اسم العميل.").max(100, "الاسم طويل جدًا."),
  district: z.enum(DISTRICTS, { message: "اختار المركز." }),
  text: z.string().trim().min(1, "اكتب رأي العميل.").max(400, "الرأي طويل جدًا."),
  isPublished: z.boolean(),
});

export type TestimonialAdminInput = z.infer<typeof testimonialAdminSchema>;
