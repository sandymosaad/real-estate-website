import { z } from "zod";
import {
  APARTMENT_FINISHINGS,
  APARTMENT_STATUSES,
  ASSIUT_DISTRICTS,
  TRANSFER_LISTING_STATUSES,
  UNION_STAGES,
} from "@/lib/constants";

const requiredText = z.string().trim().min(1, "الحقل مطلوب.");
const positiveNumber = z.coerce.number().min(0, "اكتب رقمًا صحيحًا.");

export const apartmentAdminSchema = z.object({
  title: requiredText,
  slugSource: requiredText,
  description: requiredText,
  district: z.enum(ASSIUT_DISTRICTS),
  address: requiredText,
  price: positiveNumber,
  areaSqm: positiveNumber,
  rooms: positiveNumber,
  bathrooms: positiveNumber,
  floor: positiveNumber,
  finishing: z.enum(APARTMENT_FINISHINGS),
  status: z.enum(APARTMENT_STATUSES),
});

export const unionProjectAdminSchema = z.object({
  title: requiredText,
  slugSource: requiredText,
  description: requiredText,
  district: z.enum(ASSIUT_DISTRICTS),
  landPrice: positiveNumber,
  totalProjectCost: positiveNumber,
  totalSeats: z.coerce.number().int().min(1, "عدد المقاعد لازم يكون أكبر من صفر."),
  reservedSeats: z.coerce.number().int().min(0, "عدد المقاعد غير صحيح."),
  landAreaSqm: positiveNumber,
  stage: z.enum(UNION_STAGES),
});

export const transferListingAdminSchema = z.object({
  title: requiredText,
  slugSource: requiredText,
  description: requiredText,
  district: z.enum(ASSIUT_DISTRICTS),
  address: requiredText,
  areaSqm: positiveNumber,
  rooms: positiveNumber,
  bathrooms: positiveNumber,
  floor: positiveNumber,
  status: z.enum(APARTMENT_STATUSES),
  sellerCompanyName: requiredText,
  originalPrice: positiveNumber,
  amountPaid: positiveNumber,
  transferAmountRequested: positiveNumber,
  monthlyInstallment: positiveNumber,
  remainingInstallments: z.coerce.number().int().min(0),
  listingStatus: z.enum(TRANSFER_LISTING_STATUSES),
});

export type ApartmentAdminInput = z.infer<typeof apartmentAdminSchema>;
export type UnionProjectAdminInput = z.infer<typeof unionProjectAdminSchema>;
export type TransferListingAdminInput = z.infer<
  typeof transferListingAdminSchema
>;
