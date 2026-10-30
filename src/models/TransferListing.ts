import { model, models, Schema, type InferSchemaType } from "mongoose";
import {
  DISTRICTS,
  TRANSFER_LISTING_STATUSES,
} from "@/lib/constants";

const transferListingSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    district: { type: String, required: true, enum: DISTRICTS, index: true },
    address: { type: String, required: true },
    areaSqm: { type: Number, required: true, min: 0 },
    rooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    floor: { type: Number, required: true, min: 0 },
    status: { type: String, required: true, enum: ["جاهزة", "تحت الإنشاء"] },
    sellerCompanyName: { type: String, required: true },
    originalPrice: { type: Number, required: true, min: 0 },
    amountPaid: { type: Number, required: true, min: 0 },
    transferAmountRequested: { type: Number, required: true, min: 0 },
    monthlyInstallment: { type: Number, required: true, min: 0 },
    remainingInstallments: { type: Number, required: true, min: 0, integer: true },
    installmentEndDate: { type: Date },
    requiresSellerApproval: { type: Boolean, default: true },
    images: { type: [String], default: [] },
    listingStatus: {
      type: String,
      enum: TRANSFER_LISTING_STATUSES,
      default: "متاح",
      index: true,
    },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

transferListingSchema.path("amountPaid").validate(function (value: number) {
  return value <= this.originalPrice;
}, "المبلغ المدفوع لا يمكن أن يتجاوز السعر الأصلي.");

transferListingSchema.virtual("remainingBalance").get(function () {
  return this.monthlyInstallment * this.remainingInstallments;
});

export type TransferListing = InferSchemaType<typeof transferListingSchema>;
export const TransferListingModel =
  models.TransferListing || model("TransferListing", transferListingSchema);
