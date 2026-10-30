import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { TransferFilters } from "@/components/services/TransferFilters";
import { TransferListingCard } from "@/components/services/TransferListingCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  ASSIUT_DISTRICTS,
  TRANSFER_LEGAL_NOTICE,
  TRANSFER_LISTING_STATUSES,
  type District,
  type TransferListingStatus,
} from "@/lib/constants";
import { getTransferListings } from "@/lib/data/transfer-listings";

export const metadata: Metadata = {
  title: "تنازل شقق بالتقسيط",
  description: "شقق متاحة للتنازل واستكمال الأقساط في مراكز أسيوط.",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleValue(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function getFilters(
  searchParams: Record<string, string | string[] | undefined>,
) {
  const district = getSingleValue(searchParams.district);
  const listingStatus = getSingleValue(searchParams.listingStatus);
  const maximumTransferAmount = Number(
    getSingleValue(searchParams.maximumTransferAmount),
  );
  const maximumMonthlyInstallment = Number(
    getSingleValue(searchParams.maximumMonthlyInstallment),
  );

  return {
    district: ASSIUT_DISTRICTS.includes(district as District)
      ? (district as District)
      : undefined,
    listingStatus: TRANSFER_LISTING_STATUSES.includes(
      listingStatus as TransferListingStatus,
    )
      ? (listingStatus as TransferListingStatus)
      : undefined,
    maximumTransferAmount:
      maximumTransferAmount > 0 ? maximumTransferAmount : undefined,
    maximumMonthlyInstallment:
      maximumMonthlyInstallment > 0
        ? maximumMonthlyInstallment
        : undefined,
  };
}

/** Lists installment transfer opportunities and the owner submission form. */
export default async function TransfersPage({ searchParams }: PageProps) {
  const listings = await getTransferListings(getFilters(await searchParams));

  return (
    <>
      <Section
        title="تنازل شقق بالتقسيط"
        subtitle="لو مش قادر تكمل الأقساط، نساعدك تعرض الوحدة للتواصل مع مهتمين."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <a
            href="#owner-form"
            className="rounded-xl bg-primary p-6 font-bold text-white"
          >
            عندي شقة عايز اتنازل عنها
          </a>
          <Link
            href="#listings"
            className="rounded-xl bg-primary-light p-6 font-bold text-primary"
          >
            عايز أكمل أقساط شقة
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-5">
          {[
            "ابعت بياناتك",
            "نراجع المعلومات",
            "ننشر الإعلان",
            "تتواصل مع المهتم",
            "تستكمل الإجراءات",
          ].map((step, index) => (
            <div
              key={step}
              className="rounded-xl border border-border p-4 text-center"
            >
              <span className="text-2xl font-bold text-primary">
                {index + 1}
              </span>
              <p className="mt-2 text-sm text-muted">{step}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
          {TRANSFER_LEGAL_NOTICE}
        </p>
      </Section>
      <Section title="الشقق المتاحة" id="listings">
        <TransferFilters />
        {listings.length === 0 ? (
          <p className="mt-8 rounded-xl border border-border p-8 text-center text-muted">
            مفيش تنازلات مطابقة حاليًا، جرّب تغيّر الفلاتر أو كلمنا.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <TransferListingCard
                key={listing.slug}
                listing={listing}
              />
            ))}
          </div>
        )}
      </Section>
      <section
        id="owner-form"
        className="bg-primary-light py-12 md:py-16"
      >
        <Container>
          <div className="mx-auto max-w-3xl">
            <LeadForm
              title="عايز اتنازل عن شقتي"
              defaultInterestType="تنازل عن شقة"
              showTransferFields
              showDistrictField={false}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
