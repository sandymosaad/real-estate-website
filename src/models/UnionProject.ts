import { model, models, Schema, type InferSchemaType } from "mongoose";
import { DISTRICTS, UNION_STAGES } from "@/lib/constants";

function validateReservedSeats(this: { totalSeats: number }, value: number): boolean {
  return value <= this.totalSeats;
}

const unionProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    district: { type: String, required: true, enum: DISTRICTS, index: true },
    landPrice: { type: Number, required: true, index: true },
    totalProjectCost: { type: Number, required: true },
    totalSeats: { type: Number, default: 10, required: true },
    reservedSeats: {
      type: Number,
      default: 0,
      required: true,
      validate: { validator: validateReservedSeats, message: "عدد المقاعد المحجوزة أكبر من الإجمالي." },
    },
    landAreaSqm: { type: Number, required: true },
    images: { type: [String], default: [] },
    stage: { type: String, required: true, enum: UNION_STAGES },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

unionProjectSchema.virtual("remainingSeats").get(function () {
  return this.totalSeats - this.reservedSeats;
});
unionProjectSchema.virtual("sharePerSeat").get(function () {
  return this.totalProjectCost / this.totalSeats;
});

export type UnionProject = InferSchemaType<typeof unionProjectSchema>;
export const UnionProjectModel = models.UnionProject || model("UnionProject", unionProjectSchema);
