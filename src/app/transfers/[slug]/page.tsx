import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { TransferListingCard } from "@/components/services/TransferListingCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TRANSFER_LEGAL_NOTICE } from "@/lib/constants";
import {
  getSimilarTransferListings,
  getTransferListingBySlug,
} from "@/lib/data/transfer-listings";
import { formatArea, formatPrice } from "@/lib/format";
import { decodeRouteSlug } from "@/lib/slug";

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
    ? { title: listing.title, description: listing.description }
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

  return (
    <>
      <Section
        title={listing.title}
        subtitle={`${listing.district} - ${formatArea(listing.areaSqm)}`}
      >
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
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-ink">ملخص التكاليف</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt>السعر الأصلي</dt>
                <dd className="font-bold">{formatPrice(listing.originalPrice)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>المدفوع</dt>
                <dd className="font-bold">{formatPrice(listing.amountPaid)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>مبلغ التنازل</dt>
                <dd className="font-bold text-primary">
                  {formatPrice(listing.transferAmountRequested)}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>القسط الشهري</dt>
                <dd className="font-bold">
                  {formatPrice(listing.monthlyInstallment)}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>الأقساط المتبقية</dt>
                <dd className="font-bold">{listing.remainingInstallments}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>الرصيد المتبقي</dt>
                <dd className="font-bold">{formatPrice(remainingBalance)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>الجهة البائعة</dt>
                <dd className="font-bold">{listing.sellerCompanyName}</dd>
              </div>
            </dl>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}?text=${whatsappMessage}`}
              className="mt-6 block rounded-xl bg-primary p-3 text-center font-bold text-white"
            >
              كلمنا على واتساب
            </a>
          </div>
        </div>
        <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
          {TRANSFER_LEGAL_NOTICE}
        </p>
      </Section>
      <section className="bg-primary-light py-12">
        <Container>
          <div className="mx-auto max-w-2xl">
            <LeadForm
              title="عايز أكمل أقساط الشقة دي"
              defaultInterestType="استلام تنازل"
              relatedItemType="transferListing"
              relatedItemSlug={listing.slug}
            />
          </div>
        </Container>
      </section>
      {similarListings.length > 0 && (
        <Section title="تنازلات مشابهة">
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
