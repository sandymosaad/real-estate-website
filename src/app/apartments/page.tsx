import { ApartmentCard } from "@/components/services/ApartmentCard";
import { ApartmentFilters } from "@/components/services/ApartmentFilters";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  isApartmentFinishing,
  isApartmentStatus,
  isDistrict,
} from "@/lib/constants";
import {
  getApartments,
  type ApartmentFilters as ApartmentFilterValues,
} from "@/lib/data/apartments";
import type { Apartment } from "@/models/Apartment";
import { apartmentsContent } from "@/content/apartments";
import { SectionCTA } from "@/components/contact/SectionCTA";
import { CallButton } from "@/components/contact/CallButton";
import { ContactWhatsAppButton } from "@/components/contact/WhatsAppButton";

type SearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function numberValue(value: string | undefined): number | undefined {
  const parsedValue = Number(value);
  return value && Number.isFinite(parsedValue) ? parsedValue : undefined;
}

function createFilters(searchParams: SearchParams): ApartmentFilterValues {
  const district = firstValue(searchParams.district);
  const price = firstValue(searchParams.price);
  const area = firstValue(searchParams.area);
  const rooms = numberValue(firstValue(searchParams.rooms));
  const floor = numberValue(firstValue(searchParams.floor));
  const finishing = firstValue(searchParams.finishing);
  const status = firstValue(searchParams.status);

  return {
    district: isDistrict(district) ? district : undefined,
    minimumPrice:
      price === "1000000-2000000"
        ? 1000000
        : price === "over-2000000"
          ? 2000000
          : undefined,
    maximumPrice:
      price === "under-1000000"
        ? 999999
        : price === "1000000-2000000"
          ? 2000000
          : undefined,
    minimumArea:
      area === "100-150" ? 100 : area === "over-150" ? 151 : undefined,
    maximumArea:
      area === "under-100" ? 99 : area === "100-150" ? 150 : undefined,
    rooms: rooms && rooms >= 4 ? 4 : rooms,
    floor,
    finishing: isApartmentFinishing(finishing) ? finishing : undefined,
    status: isApartmentStatus(status) ? status : undefined,
  };
}

/** Displays filterable published apartments from MongoDB. */
export default async function ApartmentsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filters = createFilters(await searchParams);
  let apartments: Apartment[] = [];
  let hasDatabaseError = false;

  try {
    apartments = await getApartments(filters);
  } catch (error: unknown) {
    console.error("تعذر تحميل الشقق:", error);
    hasDatabaseError = true;
  }

  if (hasDatabaseError) {
    return (
      <Section title={apartmentsContent.title}>
        <Container>
          <p className="rounded-xl border border-border p-8 text-center text-muted">
            حصلت مشكلة مؤقتة في تحميل الشقق. جرّب تاني بعد شوية.
          </p>
        </Container>
      </Section>
    );
  }

  return (
    <>
    <Section
      title={apartmentsContent.title}
      subtitle={apartmentsContent.subtitle}
    >
      <div className="mb-6 flex flex-wrap gap-3">
        <CallButton context="شقق للبيع" />
        <ContactWhatsAppButton context="شقق للبيع" />
      </div>
      <ApartmentFilters />
      <p className="mt-6 font-semibold text-ink">{apartments.length} نتيجة</p>
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment.slug} apartment={apartment} />
        ))}
      </div>
      {apartments.length === 0 && (
        <p className="mt-5 rounded-xl border border-border p-8 text-center text-muted">
          {apartmentsContent.empty}
        </p>
      )}
    </Section>
    <SectionCTA context="شقق للبيع" />
    </>
  );
}
