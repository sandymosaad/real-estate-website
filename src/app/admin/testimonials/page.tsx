import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/require-admin";
import { connectToDatabase } from "@/lib/db";
import { ASSIUT_DISTRICTS } from "@/lib/constants";
import { TestimonialModel } from "@/models/Testimonial";
import {
  createTestimonialFromForm,
  deleteTestimonial,
  toggleTestimonialPublish,
} from "./actions";
import Link from "next/link";

export const metadata: Metadata = {
  title: "إدارة آراء العملاء",
  robots: { index: false, follow: false },
};

export const instant = false;

/** Lists testimonials and exposes protected create, publish, and delete actions. */
export default async function AdminTestimonialsPage() {
  await requireAdmin();
  await connectToDatabase();
  const testimonials = await TestimonialModel.find().sort({ createdAt: -1 }).lean();

  return (
    <section>
      <h1 className="text-3xl font-bold">آراء العملاء</h1>
      <form action={createTestimonialFromForm} className="form-card mt-6 grid gap-4 p-5 shadow-sm md:grid-cols-2">
        <input name="name" required placeholder="اسم العميل" className="form-control" />
        <select name="district" required className="form-control form-select">
          <option value="">اختار المركز</option>
          {ASSIUT_DISTRICTS.map((district) => <option key={district}>{district}</option>)}
        </select>
        <textarea name="text" required maxLength={400} placeholder="رأي العميل" className="min-h-28 form-control md:col-span-2" />
        <label className="flex items-center gap-2 text-sm"><input name="isPublished" type="checkbox" value="true" className="form-check" /> نشر الرأي فورًا</label>
        <button type="submit" className="rounded-xl bg-primary p-3 font-bold text-on-primary">إضافة رأي</button>
      </form>
      <div className="mt-6 grid gap-4">
        {testimonials.map((testimonial) => (
          <article key={String(testimonial._id)} className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><h2 className="font-bold">{testimonial.name}</h2><p className="text-sm text-muted">{testimonial.district}</p></div>
              <span className={`rounded-full px-3 py-1 text-sm ${testimonial.isPublished ? "bg-primary-light text-success" : "bg-primary-light text-warning"}`}>
                {testimonial.isPublished ? "منشور" : "مسودة"}
              </span>
            </div>
            <p className="mt-4 leading-7 text-muted">{testimonial.text}</p>
            <div className="mt-4 flex gap-2">
              <Link
                href={`/admin/testimonials/${String(testimonial._id)}`}
                className="rounded-lg border px-3 py-2 text-sm"
              >
                تعديل
              </Link>
              <form action={toggleTestimonialPublish.bind(null, String(testimonial._id), !testimonial.isPublished)}>
                <button className="rounded-lg border px-3 py-2 text-sm">{testimonial.isPublished ? "إلغاء النشر" : "نشر"}</button>
              </form>
              <form action={deleteTestimonial.bind(null, String(testimonial._id))}>
                <button className="rounded-lg border border-error px-3 py-2 text-sm text-error">حذف</button>
              </form>
            </div>
          </article>
        ))}
        {testimonials.length === 0 && <p className="rounded-xl border border-border bg-surface p-8 text-center text-muted">لا توجد آراء عملاء حتى الآن.</p>}
      </div>
    </section>
  );
}
