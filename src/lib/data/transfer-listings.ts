import { connectToDatabase } from "@/lib/db";
import type {
  District,
  TransferListingStatus,
} from "@/lib/constants";
import {
  TransferListingModel,
  type TransferListing,
} from "@/models/TransferListing";

export type TransferListingFilters = {
  district?: District;
  maximumTransferAmount?: number;
  maximumMonthlyInstallment?: number;
  listingStatus?: TransferListingStatus;
  rooms?: number;
};

function buildTransferQuery(
  filters: TransferListingFilters,
): Record<string, unknown> {
  const query: Record<string, unknown> = { isPublished: true };
  if (filters.district) query.district = filters.district;
  if (filters.listingStatus) query.listingStatus = filters.listingStatus;
  if (filters.rooms) query.rooms = filters.rooms;
  if (filters.maximumTransferAmount) {
    query.transferAmountRequested = { $lte: filters.maximumTransferAmount };
  }
  if (filters.maximumMonthlyInstallment) {
    query.monthlyInstallment = { $lte: filters.maximumMonthlyInstallment };
  }
  return query;
}

/** Returns published transfer listings matching the selected filters. */
export async function getTransferListings(
  filters: TransferListingFilters = {},
): Promise<TransferListing[]> {
  try {
    await connectToDatabase();
    return TransferListingModel.find(buildTransferQuery(filters))
      .sort({ createdAt: -1 })
      .lean<TransferListing[]>();
  } catch (error: unknown) {
    console.error("تعذر تحميل تنازلات الشقق:", error);
    throw error;
  }
}

/** Returns one published transfer listing by slug. */
export async function getTransferListingBySlug(
  slug: string,
): Promise<TransferListing | null> {
  try {
    await connectToDatabase();
    return TransferListingModel.findOne({
      slug,
      isPublished: true,
    }).lean<TransferListing>();
  } catch (error: unknown) {
    console.error("تعذر تحميل تنازل الشقة:", error);
    throw error;
  }
}

/** Returns up to three similar published transfer listings in the same district. */
export async function getSimilarTransferListings(
  listing: TransferListing,
): Promise<TransferListing[]> {
  try {
    await connectToDatabase();
    return TransferListingModel.find({
      district: listing.district,
      slug: { $ne: listing.slug },
      isPublished: true,
    })
      .limit(3)
      .lean<TransferListing[]>();
  } catch (error: unknown) {
    console.error("تعذر تحميل تنازلات شبيهة:", error);
    throw error;
  }
}
