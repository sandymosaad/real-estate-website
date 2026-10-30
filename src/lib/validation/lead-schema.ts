import { z } from "zod";
import {
  DISTRICTS,
  LEAD_INTEREST_TYPES,
  TRANSFER_INSTALLMENTS_MAXIMUM,
  TRANSFER_MONEY_MAXIMUM,
} from "@/lib/constants";

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

export const leadSchema = z
  .object({
  fullName: z
    .string()
    .trim()
    .min(3, "اكتب اسمك بالكامل.")
    .max(60, "الاسم طويل زيادة عن اللزوم."),
  phone: phoneSchema,
  district: z.enum(DISTRICTS).optional(),
  interestType: z.enum(LEAD_INTEREST_TYPES),
  message: z.string().trim().max(500, "الرسالة طويلة زيادة عن اللزوم.").optional(),
  relatedItemType: z
    .enum(["apartment", "unionProject", "transferListing"])
    .optional(),
  relatedItemSlug: z.string().trim().max(160).optional(),
  apartmentDistrict: z.enum(DISTRICTS).optional(),
  monthlyInstallment: z
    .number()
    .min(0, "القسط الشهري مينفعش يكون بالسالب.")
    .max(TRANSFER_MONEY_MAXIMUM, "القسط الشهري كبير بشكل غير متوقع.")
    .optional(),
  remainingInstallments: z
    .number()
    .int("عدد الأقساط لازم يكون رقم صحيح.")
    .min(0, "عدد الأقساط مينفعش يكون بالسالب.")
    .max(TRANSFER_INSTALLMENTS_MAXIMUM, "عدد الأقساط كبير بشكل غير متوقع.")
    .optional(),
  amountPaid: z
    .number()
    .min(0, "المبلغ المدفوع مينفعش يكون بالسالب.")
    .max(TRANSFER_MONEY_MAXIMUM, "المبلغ المدفوع كبير بشكل غير متوقع.")
    .optional(),
  sellerCompanyName: z.string().trim().max(160, "اسم الجهة طويل زيادة.").optional(),
  website: z.string().optional(),
  })
  .superRefine((value, context) => {
    if (value.interestType !== "تنازل عن شقة") return;
    const requiredFields = [
      ["apartmentDistrict", value.apartmentDistrict, "اختار مركز الشقة."],
      ["monthlyInstallment", value.monthlyInstallment, "اكتب القسط الشهري."],
      ["remainingInstallments", value.remainingInstallments, "اكتب عدد الأقساط المتبقية."],
      ["amountPaid", value.amountPaid, "اكتب المبلغ المدفوع."],
      ["sellerCompanyName", value.sellerCompanyName, "اكتب اسم الجهة البائعة."],
    ] as const;
    for (const [path, fieldValue, message] of requiredFields) {
      if (fieldValue === undefined || fieldValue === "") {
        context.addIssue({ code: z.ZodIssueCode.custom, path: [path], message });
      }
    }
    if (
      value.amountPaid !== undefined &&
      value.monthlyInstallment !== undefined &&
      value.remainingInstallments !== undefined &&
      value.amountPaid < 0
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["amountPaid"],
        message: "راجع بيانات المبالغ المدخلة.",
      });
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;
