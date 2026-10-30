import Link from "next/link";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import type { Listing } from "@/lib/mock-data";
import { getListingPath } from "@/lib/slug";

export function ListingCard({ listing }: { listing: Listing }) {
  const price = new Intl.NumberFormat("ar-EG").format(listing.price);
  const progress =
    listing.seats && listing.totalSeats
      ? (listing.seats / listing.totalSeats) * 100
      : 0;

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="flex h-40 items-center justify-center bg-primary-light text-primary">
        <span className="text-sm font-semibold">
          {listing.type === "union" ? "مشروع اتحاد ملاك" : "صورة الوحدة"}
        </span>
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
