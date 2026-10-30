import { model, models, Schema, type InferSchemaType } from "mongoose";
import { APARTMENT_FINISHINGS, APARTMENT_STATUSES, DISTRICTS } from "@/lib/constants";

const apartmentSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    district: { type: String, required: true, enum: DISTRICTS, index: true },
    address: { type: String, required: true },
    areaSqm: { type: Number, required: true },
    rooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    floor: { type: Number, required: true },
    finishing: { type: String, required: true, enum: APARTMENT_FINISHINGS },
    status: { type: String, required: true, enum: APARTMENT_STATUSES },
    images: { type: [String], default: [] },
    features: { type: [String], default: [] },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type Apartment = InferSchemaType<typeof apartmentSchema>;
export const ApartmentModel = models.Apartment || model("Apartment", apartmentSchema);
