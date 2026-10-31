import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/require-admin";
import { connectToDatabase } from "@/lib/db";
import { ASSIUT_DISTRICTS } from "@/lib/constants";
import { TestimonialModel } from "@/models/Testimonial";
import { updateTestimonialFromForm } from "../actions";

export const metadata: Metadata = {
  title: "تعديل رأي عميل",
  robots: { index: false, follow: false },
};

export const instant = false;

type TestimonialEditPageProps = {
  params: Promise<{ id: string }>;
};

/** Renders the protected testimonial edit form. */
export default async function TestimonialEditPage({
  params,
}: TestimonialEditPageProps) {
  await requireAdmin();
  const { id } = await params;
  await connectToDatabase();
  const testimonial = await TestimonialModel.findById(id).lean();
  if (!testimonial) notFound();

  return (
    <section>
      <h1 className="text-3xl font-bold">تعديل رأي عميل</h1>
      <form
        action={updateTestimonialFromForm.bind(null, String(testimonial._id))}
        className="mt-6 grid max-w-2xl gap-4 rounded-xl bg-surface p-5 shadow-sm"
      >
        <input
          name="name"
          required
          defaultValue={testimonial.name}
          placeholder="اسم العميل"
          className="rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary"
        />
        <select
          name="district"
          required
          defaultValue={testimonial.district}
          className="rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary"
        >
          {ASSIUT_DISTRICTS.map((district) => (
            <option key={district}>{district}</option>
          ))}
        </select>
        <textarea
          name="text"
          required
          maxLength={400}
          defaultValue={testimonial.text}
          className="min-h-28 rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            name="isPublished"
            type="checkbox"
            value="true"
            defaultChecked={testimonial.isPublished}
          />
          منشور
        </label>
        <button
          type="submit"
          className="rounded-xl bg-primary p-3 font-bold text-on-primary"
        >
          حفظ التعديلات
        </button>
      </form>
    </section>
  );
}
