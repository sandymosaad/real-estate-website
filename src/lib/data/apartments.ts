import { connectToDatabase } from "@/lib/db";
import { ApartmentModel, type Apartment } from "@/models/Apartment";
import type { ApartmentFinishing, ApartmentStatus, District } from "@/lib/constants";

export type ApartmentFilters = {
  district?: District;
  minimumPrice?: number;
  maximumPrice?: number;
  minimumArea?: number;
  maximumArea?: number;
  rooms?: number;
  floor?: number;
  finishing?: ApartmentFinishing;
  status?: ApartmentStatus;
};

function buildApartmentQuery(filters: ApartmentFilters) {
  const query: Record<string, unknown> = { isPublished: true };
  if (filters.district) query.district = filters.district;
  if (filters.rooms) query.rooms = filters.rooms;
  if (filters.floor) query.floor = filters.floor;
  if (filters.finishing) query.finishing = filters.finishing;
  if (filters.status) query.status = filters.status;
  if (filters.minimumPrice || filters.maximumPrice) query.price = { ...(filters.minimumPrice && { $gte: filters.minimumPrice }), ...(filters.maximumPrice && { $lte: filters.maximumPrice }) };
  if (filters.minimumArea || filters.maximumArea) query.areaSqm = { ...(filters.minimumArea && { $gte: filters.minimumArea }), ...(filters.maximumArea && { $lte: filters.maximumArea }) };
  return query;
}

/** Returns published apartments matching validated filters as plain objects. */
export async function getApartments(filters: ApartmentFilters = {}): Promise<Apartment[]> {
  try {
    await connectToDatabase();
    return ApartmentModel.find(buildApartmentQuery(filters)).sort({ createdAt: -1 }).lean<Apartment[]>();
  } catch (error: unknown) {
    console.error("تعذر تحميل الشقق من قاعدة البيانات:", error);
    throw error;
  }
}

/** Returns one published apartment by slug as a plain object. */
export async function getApartmentBySlug(slug: string): Promise<Apartment | null> {
  try {
    await connectToDatabase();
    return ApartmentModel.findOne({ slug, isPublished: true }).lean<Apartment>();
  } catch (error: unknown) {
    console.error("تعذر تحميل الشقة من قاعدة البيانات:", error);
    throw error;
  }
}

/** Returns nearby published apartments with the same district, excluding the current one. */
export async function getSimilarApartments(apartment: Apartment): Promise<Apartment[]> {
  try {
    await connectToDatabase();
    return ApartmentModel.find({ district: apartment.district, slug: { $ne: apartment.slug }, isPublished: true }).limit(3).lean<Apartment[]>();
  } catch (error: unknown) {
    console.error("تعذر تحميل الشقق المشابهة من قاعدة البيانات:", error);
    throw error;
  }
}
