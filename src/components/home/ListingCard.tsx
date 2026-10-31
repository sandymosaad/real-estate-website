import Link from "next/link";
import Image from "next/image";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import type { Listing } from "@/lib/mock-data";
import { getListingPath } from "@/lib/slug";
import { DEFAULT_LISTING_IMAGE } from "@/lib/constants";

export function ListingCard({ listing }: { listing: Listing }) {
  const price = new Intl.NumberFormat("ar-EG").format(listing.price);
  const progress =
    listing.seats && listing.totalSeats
      ? (listing.seats / listing.totalSeats) * 100
      : 0;

  return (
    <article className="card-hover overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="relative h-40 bg-primary-light text-primary">
        <Image
          src={listing.image || DEFAULT_LISTING_IMAGE}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="card-image object-cover dark:brightness-90"
        />
      </div>
      <div className="p-5">
        <p className="text-sm font-semibold text-primary">
          {listing.type === "union" ? "اتحاد ملاك" : "شقة للبيع"}
        </p>
        <h3 className="mt-2 min-h-14 text-lg font-bold text-ink">
          {listing.title}
        </h3>
        <p className="mt-3 flex items-center gap-1 text-sm text-muted">
          <MapPin size={16} aria-hidden="true" />
          {listing.district}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 border-t border-border pt-4 text-sm text-muted">
          <span className="flex items-center gap-1">
            <Ruler size={16} aria-hidden="true" />
            {listing.area} م²
          </span>
          {listing.type === "union" ? (
            <span className="w-full">
              <span className="mb-1 flex justify-between">
                <span>الشركاء</span>
                <strong className="text-ink">
                  {listing.seats} من {listing.totalSeats}
                </strong>
              </span>
              <span className="block h-2 overflow-hidden rounded-full bg-primary-light">
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{ width: `${progress}%` }}
                />
              </span>
            </span>
          ) : (
            <>
              <span className="flex items-center gap-1">
                <BedDouble size={16} aria-hidden="true" />
                {listing.rooms} غرف
              </span>
              <span className="flex items-center gap-1">
                <Bath size={16} aria-hidden="true" />
                {listing.bathrooms} حمام
              </span>
            </>
          )}
        </div>
        <p className="mt-5 text-xl font-bold text-primary">{price} جنيه</p>
        <Link
          href={getListingPath(listing.type, listing.id)}
          className="mt-4 inline-flex font-semibold text-primary"
        >
          شوف التفاصيل
        </Link>
      </div>
    </article>
  );
}
