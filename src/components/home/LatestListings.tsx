import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LATEST_LISTINGS } from "@/lib/mock-data";
import { Section } from "@/components/ui/Section";
import { ListingCard } from "./ListingCard";

export function LatestListings() {
  return (
    <Section
      id="latest"
      title="أحدث الاختيارات"
      subtitle="اختيارات مبدئية من شقق ومشاريع اتحاد ملاك في أسيوط."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {LATEST_LISTINGS.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
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
