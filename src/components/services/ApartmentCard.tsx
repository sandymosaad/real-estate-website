import Link from "next/link";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import type { Apartment } from "@/models/Apartment";
import { formatArea, formatPrice } from "@/lib/format";

/** Presents an apartment result with only the information needed for comparison. */
export function ApartmentCard({ apartment }: { apartment: Apartment }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="flex h-44 items-center justify-center bg-primary-light text-primary">
        <span className="font-semibold">صورة الوحدة</span>
      </div>
      <div className="p-5">
        <p className="text-sm font-semibold text-primary">شقة للبيع</p>
        <h2 className="mt-2 text-xl font-bold text-ink">{apartment.title}</h2>
        <p className="mt-3 flex items-center gap-1 text-sm text-muted">
          <MapPin size={16} aria-hidden="true" />
          {apartment.district}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
          <span className="flex items-center gap-1">
            <Ruler size={16} aria-hidden="true" />
            {formatArea(apartment.areaSqm)}
          </span>
          <span className="flex items-center gap-1">
            <BedDouble size={16} aria-hidden="true" />
            {apartment.rooms} غرف
          </span>
          <span className="flex items-center gap-1">
            <Bath size={16} aria-hidden="true" />
            {apartment.bathrooms} حمام
          </span>
        </div>
        <p className="mt-5 text-xl font-bold text-primary">{formatPrice(apartment.price)}</p>
        <Link
          href={`/apartments/${apartment.slug}`}
          className="mt-4 inline-flex font-semibold text-primary"
        >
          شوف التفاصيل
        </Link>
      </div>
    </article>
  );
}
