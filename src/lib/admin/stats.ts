import { connectToDatabase } from "@/lib/db";
import { ApartmentModel } from "@/models/Apartment";
import { LeadModel } from "@/models/Lead";
import { TransferListingModel } from "@/models/TransferListing";
import { UnionProjectModel } from "@/models/UnionProject";

export type AdminStats = {
  newLeads: number;
  apartments: { published: number; unpublished: number };
  unionProjects: { published: number; unpublished: number };
  transferListings: { published: number; unpublished: number };
};

/** Returns protected counts used by the administrator dashboard. */
export async function getAdminStats(): Promise<AdminStats> {
  await connectToDatabase();
  const [
    newLeads,
    publishedApartments,
    unpublishedApartments,
    publishedUnionProjects,
    unpublishedUnionProjects,
    publishedTransferListings,
    unpublishedTransferListings,
  ] = await Promise.all([
    LeadModel.countDocuments({ status: "جديد" }),
    ApartmentModel.countDocuments({ isPublished: true }),
    ApartmentModel.countDocuments({ isPublished: false }),
    UnionProjectModel.countDocuments({ isPublished: true }),
    UnionProjectModel.countDocuments({ isPublished: false }),
    TransferListingModel.countDocuments({ isPublished: true }),
    TransferListingModel.countDocuments({ isPublished: false }),
  ]);
  return {
    newLeads,
    apartments: { published: publishedApartments, unpublished: unpublishedApartments },
    unionProjects: { published: publishedUnionProjects, unpublished: unpublishedUnionProjects },
    transferListings: { published: publishedTransferListings, unpublished: unpublishedTransferListings },
  };
}

/** Returns the latest five leads without exposing password or session data. */
export async function getLatestLeads() {
  await connectToDatabase();
  return LeadModel.find().sort({ createdAt: -1 }).limit(5).lean();
}
