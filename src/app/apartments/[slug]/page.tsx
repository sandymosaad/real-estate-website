import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApartmentDetail } from "@/components/services/ApartmentDetail";
import { getApartmentBySlug, getSimilarApartments } from "@/lib/data/apartments";

type PageProps = { params: Promise<{ slug: string }> };

/** Builds detail-page metadata from the selected apartment. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const apartment = await getApartmentBySlug(slug).catch(() => null);

  return apartment
    ? { title: apartment.title, description: apartment.description }
    : { title: "الشقة غير موجودة" };
}

/** Displays an apartment detail page and nearby alternatives. */
export default async function ApartmentDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const apartment = await getApartmentBySlug(slug).catch(() => null);

  if (!apartment) notFound();

  const similarApartments = await getSimilarApartments(apartment).catch(() => []);

  return (
    <ApartmentDetail
      apartment={apartment}
      similarApartments={similarApartments}
    />
  );
}
