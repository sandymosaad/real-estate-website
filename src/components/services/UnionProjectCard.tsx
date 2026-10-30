import Link from "next/link";
import Image from "next/image";
import { MapPin, Ruler } from "lucide-react";
import type { UnionProject } from "@/models/UnionProject";
import { DEFAULT_LISTING_IMAGE } from "@/lib/constants";
import { formatArea, formatPrice } from "@/lib/format";
import { getListingPath } from "@/lib/slug";

/** Presents an open union project and its current seat availability. */
export function UnionProjectCard({ project }: { project: UnionProject }) {
  const progress = (project.reservedSeats / project.totalSeats) * 100;
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="relative h-44 bg-primary-light text-primary">
        <Image
          src={project.images?.[0] || DEFAULT_LISTING_IMAGE}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <p className="text-sm font-semibold text-primary">اتحاد ملاك</p>
        <h2 className="mt-2 text-xl font-bold text-ink">{project.title}</h2>
        <p className="mt-3 flex items-center gap-1 text-sm text-muted"><MapPin size={16} aria-hidden="true" />{project.district}</p>
        <p className="mt-3 flex items-center gap-1 text-sm text-muted"><Ruler size={16} aria-hidden="true" />{formatArea(project.landAreaSqm)}</p>
        <p className="mt-4 flex justify-between text-sm text-muted"><span>الشركاء</span><strong className="text-ink">{project.reservedSeats} من {project.totalSeats}</strong></p>
        <span className="mt-1 block h-2 overflow-hidden rounded-full bg-primary-light"><span className="block h-full rounded-full bg-primary" style={{ width: `${progress}%` }} /></span>
        <p className="mt-4 text-lg font-bold text-primary">{formatPrice(project.totalProjectCost / project.totalSeats)} للمقعد</p>
        <Link
          href={getListingPath("union", project.slug)}
          className="mt-3 inline-flex font-semibold text-primary"
        >
          شوف التفاصيل
        </Link>
      </div>
    </article>
  );
}
