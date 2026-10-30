import Link from "next/link";
import { MapPin, Ruler } from "lucide-react";
import type { TransferListing } from "@/models/TransferListing";
import { formatArea, formatPrice } from "@/lib/format";
import { getListingPath } from "@/lib/slug";

/** Presents a published installment transfer without exposing owner data. */
export function TransferListingCard({
  listing,
}: {
  listing: TransferListing;
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="flex h-44 items-center justify-center bg-primary-light text-primary">
        <span className="font-semibold">صورة الشقة</span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-primary">تنازل شقة بالتقسيط</p>
          <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
            {listing.listingStatus}
          </span>
        </div>
        <h2 className="mt-3 text-xl font-bold text-ink">{listing.title}</h2>
        <p className="mt-3 flex items-center gap-1 text-sm text-muted">
          <MapPin size={16} aria-hidden="true" />
          {listing.district}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
          <span className="flex items-center gap-1">
            <Ruler size={16} aria-hidden="true" />
            {formatArea(listing.areaSqm)}
          </span>
          <span>{listing.remainingInstallments} قسط متبقي</span>
        </div>
        <p className="mt-4 text-lg font-bold text-primary">
          {formatPrice(listing.transferAmountRequested)} مبلغ التنازل
        </p>
        <p className="mt-1 text-sm text-muted">
          {formatPrice(listing.monthlyInstallment)} شهريًا
        </p>
        <Link
          href={getListingPath("transfer", listing.slug)}
          className="mt-4 inline-flex font-semibold text-primary"
        >
          شوف التفاصيل
        </Link>
      </div>
    </article>
  );
}
