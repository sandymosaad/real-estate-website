import type { TransferListing } from "@/models/TransferListing";

/** Returns whether the requested transfer amount has no premium over the paid amount. */
export function isNoPremium(listing: TransferListing): boolean {
  return listing.transferAmountRequested <= listing.amountPaid;
}

/** Returns the premium amount only when the requested amount exceeds the paid amount. */
export function getPremiumAmount(listing: TransferListing): number {
  return Math.max(listing.transferAmountRequested - listing.amountPaid, 0);
}
