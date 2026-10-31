import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { TransferFilters } from "@/components/services/TransferFilters";
import { TransferListingCard } from "@/components/services/TransferListingCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  ASSIUT_DISTRICTS,
  TRANSFER_LISTING_STATUSES,
  type District,
  type TransferListingStatus,
} from "@/lib/constants";
import { getTransferListings } from "@/lib/data/transfer-listings";
import { transferPageContent } from "@/content/transfers";
import { SectionCTA } from "@/components/contact/SectionCTA";
import { CallButton } from "@/components/contact/CallButton";
import { ContactWhatsAppButton } from "@/components/contact/WhatsAppButton";

export const metadata: Metadata = {
  title: "بيع وحدتك بالتقسيط بدون أوفر",
  description:
    "اتنازل عن وحدتك لمشتري جديد يكمّل الأقساط، أو دور على وحدة بسعر التعاقد القديم.",
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
        title={transferPageContent.hero.title}
        subtitle={transferPageContent.hero.subtitle}
      >
        <div className="mb-6 flex flex-wrap gap-3">
          <CallButton context="تنازل شقق بالتقسيط" />
          <ContactWhatsAppButton context="تنازل شقق بالتقسيط" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <a
            href="#owner-form"
            className="rounded-xl bg-primary p-6 font-bold text-on-primary"
          >
            {transferPageContent.audiences.seller.button}
          </a>
          <Link
            href="#listings"
            className="rounded-xl bg-primary-light p-6 font-bold text-primary"
          >
            {transferPageContent.audiences.buyer.button}
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-bold text-ink">
              {transferPageContent.audiences.seller.title}
            </h2>
            <p className="mt-3 leading-7 text-muted">
              {transferPageContent.audiences.seller.description}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-bold text-ink">
              {transferPageContent.audiences.buyer.title}
            </h2>
            <p className="mt-3 leading-7 text-muted">
              {transferPageContent.audiences.buyer.description}
            </p>
          </div>
        </div>
        <div className="mt-8 rounded-xl border border-border bg-primary-light p-6">
          <h2 className="text-xl font-bold text-ink">
            {transferPageContent.sections.moneyFlowTitle}
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3 md:items-center">
            <div className="rounded-xl bg-surface p-4 text-center font-bold text-primary">
              {transferPageContent.moneyFlow.buyer}
            </div>
            <div className="text-center text-sm text-muted">
              <span className="block">
                ← {transferPageContent.moneyFlow.sellerPayment}
              </span>
              <span className="mt-2 block">
                → {transferPageContent.moneyFlow.companyPayment}
              </span>
            </div>
            <div className="grid gap-3">
              <div className="rounded-xl bg-surface p-4 text-center font-bold text-ink">
                {transferPageContent.moneyFlow.seller}
              </div>
              <div className="rounded-xl bg-surface p-4 text-center font-bold text-ink">
                الجهة البائعة
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-5">
          {transferPageContent.steps.map((step, index) => (
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
        <div className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold text-ink">
            {transferPageContent.sections.documentsTitle}
          </h2>
          <ul className="mt-4 grid gap-2 text-muted sm:grid-cols-2">
            {transferPageContent.requiredDocuments.map((document) => (
              <li key={document}>• {document}</li>
            ))}
          </ul>
        </div>
        <p className="mt-8 rounded-xl border border-border bg-primary-light p-4 text-sm leading-7 text-ink">
          {transferPageContent.sections.legalNotice}
        </p>
      </Section>
      <SectionCTA context="تنازل شقق بالتقسيط" />
      <Section title={transferPageContent.sections.listingsTitle} id="listings">
        <TransferFilters />
        {listings.length === 0 ? (
          <p className="mt-8 rounded-xl border border-border p-8 text-center text-muted">
            {transferPageContent.sections.emptyListings}
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
              title={transferPageContent.sections.formTitle}
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
