import { connectToDatabase } from "@/lib/db";
import { UnionProjectModel, type UnionProject } from "@/models/UnionProject";
import type { District, UnionStage } from "@/lib/constants";

export type UnionProjectFilters = { district?: District; stage?: UnionStage; maximumShare?: number };

/** Returns published union projects matching validated filters as plain objects. */
export async function getUnionProjects(filters: UnionProjectFilters = {}): Promise<UnionProject[]> {
  await connectToDatabase();
  const query: Record<string, unknown> = { isPublished: true };
  if (filters.district) query.district = filters.district;
  if (filters.stage) query.stage = filters.stage;
  if (filters.maximumShare) query.$expr = { $lte: [{ $divide: ["$totalProjectCost", "$totalSeats"] }, filters.maximumShare] };
  return UnionProjectModel.find(query).sort({ createdAt: -1 }).lean<UnionProject[]>();
}

/** Returns one published union project by slug as a plain object. */
export async function getUnionProjectBySlug(slug: string): Promise<UnionProject | null> {
  await connectToDatabase();
  return UnionProjectModel.findOne({ slug, isPublished: true }).lean<UnionProject>();
}
