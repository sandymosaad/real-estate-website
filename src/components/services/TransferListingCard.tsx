import Link from "next/link";
import Image from "next/image";
import { MapPin, Ruler } from "lucide-react";
import type { TransferListing } from "@/models/TransferListing";
import { DEFAULT_LISTING_IMAGE } from "@/lib/constants";
import { formatArea, formatPrice } from "@/lib/format";
import { getListingPath } from "@/lib/slug";
import { getPremiumAmount, isNoPremium } from "@/lib/transfer-listing";

/** Presents a published installment transfer without exposing owner data. */
export function TransferListingCard({
  listing,
}: {
  listing: TransferListing;
}) {
  return (
    <article className="card-hover overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="relative h-44 bg-primary-light text-primary">
        <Image
          src={listing.images?.[0] || DEFAULT_LISTING_IMAGE}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="card-image object-cover dark:brightness-90"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-primary">تنازل شقة بالتقسيط</p>
          <div className="flex flex-wrap justify-end gap-2">
            <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
              {listing.listingStatus}
            </span>
            {isNoPremium(listing) && (
              <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-success">
                بدون أوفر
              </span>
            )}
            {listing.isDocumentsVerified && (
              <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                مستندات متراجعة
              </span>
            )}
          </div>
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
          {formatPrice(listing.transferAmountRequested)} المطلوب للتنازل
        </p>
        {!isNoPremium(listing) && (
          <p className="mt-1 text-sm text-warning">
            أوفر: {formatPrice(getPremiumAmount(listing))}
          </p>
        )}
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
