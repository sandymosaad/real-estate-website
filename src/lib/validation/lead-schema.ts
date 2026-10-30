import { z } from "zod";
import { DISTRICTS, LEAD_INTEREST_TYPES } from "@/lib/constants";

const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
const englishDigits = "0123456789";

/** Normalizes Egyptian phone input before applying the shared phone rule. */
export function normalizeEgyptianPhone(value: string): string {
  return value
    .split("")
    .map((character) => {
      const digitIndex = arabicDigits.indexOf(character);
      return digitIndex === -1 ? character : englishDigits[digitIndex];
    })
    .join("")
    .replace(/[\s-]/g, "");
}

const phoneSchema = z
  .string()
  .transform(normalizeEgyptianPhone)
  .refine((value) => /^01[0125][0-9]{8}$/.test(value), {
    message: "اكتب رقم موبايل مصري صحيح من 11 رقم.",
  });

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "اكتب اسمك بالكامل.")
    .max(60, "الاسم طويل زيادة عن اللزوم."),
  phone: phoneSchema,
  district: z.enum(DISTRICTS).optional(),
  interestType: z.enum(LEAD_INTEREST_TYPES),
  message: z.string().trim().max(500, "الرسالة طويلة زيادة عن اللزوم.").optional(),
  relatedItemType: z.enum(["apartment", "unionProject"]).optional(),
  relatedItemSlug: z.string().trim().max(160).optional(),
  website: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
