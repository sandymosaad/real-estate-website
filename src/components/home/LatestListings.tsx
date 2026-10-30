import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { getApartments } from "@/lib/data/apartments";
import { getUnionProjects } from "@/lib/data/union-projects";
import type { Listing } from "@/lib/mock-data";
import { ListingCard } from "./ListingCard";

/** Loads a small mixed selection for the home page without exposing database errors. */
export async function LatestListings() {
  let listings: Listing[] = [];
  try {
    const [apartments, unionProjects] = await Promise.all([
      getApartments(),
      getUnionProjects(),
    ]);
    listings = [
      ...apartments.slice(0, 3).map((apartment) => ({
        id: apartment.slug,
        type: "apartment" as const,
        title: apartment.title,
        district: apartment.district,
        price: apartment.price,
        area: apartment.areaSqm,
        rooms: apartment.rooms,
        bathrooms: apartment.bathrooms,
      })),
      ...unionProjects.slice(0, 3).map((project) => ({
        id: project.slug,
        type: "union" as const,
        title: project.title,
        district: project.district,
        price: project.totalProjectCost / project.totalSeats,
        area: project.landAreaSqm,
        seats: project.reservedSeats,
        totalSeats: project.totalSeats,
      })),
    ];
  } catch (error: unknown) {
    console.error("تعذر تحميل أحدث الاختيارات:", error);
  }

  return (
    <Section
      id="latest"
      title="أحدث الاختيارات"
      subtitle="اختيارات مبدئية من شقق ومشاريع اتحاد ملاك في أسيوط."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      {listings.length === 0 && (
        <p className="rounded-xl border border-border p-8 text-center text-muted">
          الاختيارات الجديدة هتظهر هنا قريبًا.
        </p>
      )}
      <Link
        href="/apartments"
        className="mx-auto mt-8 flex w-fit items-center gap-2 font-semibold text-primary"
      >
        شوف كل الوحدات
        <ArrowLeft size={16} aria-hidden="true" />
      </Link>
    </Section>
  );
}
