import { model, models, Schema, type InferSchemaType } from "mongoose";
import { DISTRICTS } from "@/lib/constants";

const leadSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    district: { type: String, enum: DISTRICTS },
    interestType: {
      type: String,
      required: true,
      enum: [
        "شقة",
        "اتحاد ملاك",
        "استفسار عام",
        "تنازل عن شقة",
        "استلام تنازل",
      ],
    },
    message: { type: String },
    relatedItemType: {
      type: String,
      enum: ["apartment", "unionProject", "transferListing"],
    },
    relatedItemSlug: { type: String },
    apartmentDistrict: { type: String, enum: DISTRICTS },
    monthlyInstallment: { type: Number, min: 0 },
    remainingInstallments: { type: Number, min: 0, integer: true },
    amountPaid: { type: Number, min: 0 },
    sellerCompanyName: { type: String },
    status: {
      type: String,
      enum: ["جديد", "تم التواصل", "مغلق"],
      default: "جديد",
    },
    source: { type: String, default: "website" },
  },
  { timestamps: true },
);

leadSchema.index({ createdAt: -1 });
leadSchema.index({ status: 1 });

export type Lead = InferSchemaType<typeof leadSchema>;
export const LeadModel = models.Lead || model("Lead", leadSchema);
