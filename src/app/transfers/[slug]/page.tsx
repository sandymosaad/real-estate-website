import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { transferPageContent } from "@/content/transfers";
import { LeadForm } from "@/components/forms/LeadForm";
import { TransferListingCard } from "@/components/services/TransferListingCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  getSimilarTransferListings,
  getTransferListingBySlug,
} from "@/lib/data/transfer-listings";
import { formatArea, formatPrice } from "@/lib/format";
import { decodeRouteSlug } from "@/lib/slug";
import { getPremiumAmount, isNoPremium } from "@/lib/transfer-listing";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Builds metadata from a published transfer listing. */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getTransferListingBySlug(decodeRouteSlug(slug));

  return listing
    ? {
        title: `${listing.title} - تنازل بدون أوفر`,
        description:
          "اعرف سعر التعاقد والمدفوع والمطلوب للتنازل والأقساط المتبقية قبل التواصل.",
      }
    : { title: "التنازل غير موجود" };
}

/** Displays transfer financial details and the taker contact form. */
export default async function TransferDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const listing = await getTransferListingBySlug(decodeRouteSlug(slug));

  if (!listing) notFound();

  const similarListings = await getSimilarTransferListings(listing);
  const whatsappMessage = encodeURIComponent(
    `عايز أعرف تفاصيل ${listing.title} - ${listing.slug}`,
  );
  const remainingBalance =
    listing.monthlyInstallment * listing.remainingInstallments;
  const premiumAmount = getPremiumAmount(listing);

  return (
    <>
      <Section
        title={listing.title}
        subtitle={`${listing.district} - ${formatArea(listing.areaSqm)}`}
      >
        <div className="mb-6 flex flex-wrap gap-2">
          {isNoPremium(listing) && (
            <span className="rounded-full bg-primary-light px-3 py-1 text-sm font-semibold text-success">
              بدون أوفر
            </span>
          )}
          {listing.isDocumentsVerified && (
            <span className="rounded-full bg-primary-light px-3 py-1 text-sm font-semibold text-primary">
              مستندات متراجعة
            </span>
          )}
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div className="flex h-64 items-center justify-center rounded-xl bg-primary-light font-semibold text-primary">
              صورة الشقة
            </div>
            <p className="leading-8 text-muted">{listing.description}</p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ["الحالة", listing.status],
                ["الغرف", listing.rooms],
                ["الحمامات", listing.bathrooms],
                ["الدور", listing.floor],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-border p-4"
                >
                  <p className="text-sm text-muted">{label}</p>
                  <p className="mt-1 font-bold text-ink">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-xl font-bold text-ink">ملخص التكاليف</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt>{transferPageContent.detailLabels.contractPrice}</dt>
                <dd className="font-bold">{formatPrice(listing.originalPrice)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>{transferPageContent.detailLabels.amountPaid}</dt>
                <dd className="font-bold">{formatPrice(listing.amountPaid)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>{transferPageContent.detailLabels.requestedAmount}</dt>
                <dd className="font-bold text-primary">
                  {formatPrice(listing.transferAmountRequested)}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>{transferPageContent.detailLabels.monthlyInstallment}</dt>
                <dd className="font-bold">
                  {formatPrice(listing.monthlyInstallment)}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>{transferPageContent.detailLabels.remainingInstallments}</dt>
                <dd className="font-bold">{listing.remainingInstallments}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>{transferPageContent.detailLabels.remainingBalance}</dt>
                <dd className="font-bold">{formatPrice(remainingBalance)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>
                  {isNoPremium(listing)
                    ? "حالة التنازل"
                    : transferPageContent.detailLabels.premium}
                </dt>
                <dd className={`font-bold ${isNoPremium(listing) ? "text-success" : "text-warning"}`}>
                  {isNoPremium(listing)
                    ? transferPageContent.detailLabels.noPremium
                    : formatPrice(premiumAmount)}
                </dd>
              </div>
              {listing.estimatedMarketPrice != null && (
                <div className="flex justify-between gap-3">
                  <dt>{transferPageContent.detailLabels.marketEstimate}</dt>
                  <dd className="font-bold">{formatPrice(listing.estimatedMarketPrice)}</dd>
                </div>
              )}
              <div className="flex justify-between gap-3">
                <dt>{transferPageContent.detailLabels.sellerCompany}</dt>
                <dd className="font-bold">{listing.sellerCompanyName}</dd>
              </div>
            </dl>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}?text=${whatsappMessage}`}
              className="mt-6 block rounded-xl bg-primary p-3 text-center font-bold text-on-primary"
            >
              كلمنا على واتساب
            </a>
          </div>
        </div>
        <p className="mt-8 rounded-xl border border-border bg-primary-light p-4 text-sm leading-7 text-ink">
          {transferPageContent.sections.legalNotice}
        </p>
      </Section>
      <section className="bg-primary-light py-12">
        <Container>
          <div className="mx-auto max-w-2xl">
            <LeadForm
              title={transferPageContent.sections.detailFormTitle}
              defaultInterestType="استلام تنازل"
              relatedItemType="transferListing"
              relatedItemSlug={listing.slug}
            />
          </div>
        </Container>
      </section>
      {similarListings.length > 0 && (
        <Section title={transferPageContent.sections.similarTitle}>
          <div className="grid gap-6 md:grid-cols-3">
            {similarListings.map((item) => (
              <TransferListingCard key={item.slug} listing={item} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
