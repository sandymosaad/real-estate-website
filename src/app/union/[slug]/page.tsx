import type { Metadata } from "next";
import { MapPin, Ruler } from "lucide-react";
import { notFound } from "next/navigation";
import { WhatsAppButton } from "@/components/services/WhatsAppButton";
import { Section } from "@/components/ui/Section";
import { formatArea, formatPrice } from "@/lib/format";
import { getUnionProjectBySlug } from "@/lib/data/union-projects";
import { decodeRouteSlug } from "@/lib/slug";

type PageProps = { params: Promise<{ slug: string }> };

/** Builds detail-page metadata from the selected union project. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getUnionProjectBySlug(decodeRouteSlug(slug));

  return project
    ? { title: project.title, description: project.description }
    : { title: "المشروع غير موجود" };
}

/** Displays project costs, stage, seats, and the contact action. */
export default async function UnionProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getUnionProjectBySlug(decodeRouteSlug(slug));
  if (!project) notFound();

  const progress = (project.reservedSeats / project.totalSeats) * 100;
  const message = `عايز أحجز مقعد في مشروع: ${project.title} - https://assiut-realestate.com/union/${project.slug}`;

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <p className="font-semibold text-primary">
          اتحاد ملاك - مشاركة في تملك وبناء
        </p>
        <h1 className="mt-3 text-3xl font-bold text-ink md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 flex items-center gap-1 text-muted">
          <MapPin size={18} aria-hidden="true" />
          {project.district}
        </p>
        <p className="mt-6 leading-8 text-muted">{project.description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-5">
            <p className="text-sm text-muted">سعر الأرض</p>
            <p className="mt-2 text-xl font-bold text-ink">
              {formatPrice(project.landPrice)}
            </p>
          </div>
          <div className="rounded-xl border border-border p-5">
            <p className="text-sm text-muted">تكلفة المشروع</p>
            <p className="mt-2 text-xl font-bold text-ink">
              {formatPrice(project.totalProjectCost)}
            </p>
          </div>
          <div className="rounded-xl border border-border p-5">
            <p className="text-sm text-muted">نصيب المقعد</p>
            <p className="mt-2 text-xl font-bold text-primary">
              {formatPrice(project.totalProjectCost / project.totalSeats)}
            </p>
          </div>
          <div className="rounded-xl border border-border p-5">
            <p className="text-sm text-muted">مساحة الأرض</p>
            <p className="mt-2 flex items-center gap-2 text-xl font-bold text-ink">
              <Ruler size={20} aria-hidden="true" />
              {formatArea(project.landAreaSqm)}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-primary-light p-6">
          <div className="flex justify-between font-semibold text-ink">
            <span>المقاعد المحجوزة</span>
            <span>
              {project.reservedSeats} من {project.totalSeats}
            </span>
          </div>
          <span className="mt-3 block h-3 overflow-hidden rounded-full bg-white">
            <span
              className="block h-full rounded-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </span>
          <p className="mt-3 text-muted">
            المرحلة الحالية: {project.stage}
          </p>
        </div>

        <div className="mt-8">
          <WhatsAppButton message={message} label="احجز مقعدك" />
        </div>
      </div>
    </Section>
  );
}
