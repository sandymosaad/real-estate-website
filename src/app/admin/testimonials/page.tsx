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
      <form action={createTestimonialFromForm} className="mt-6 grid gap-4 rounded-xl bg-white p-5 shadow-sm md:grid-cols-2">
        <input name="name" required placeholder="اسم العميل" className="rounded-xl border p-3" />
        <select name="district" required className="rounded-xl border p-3">
          <option value="">اختار المركز</option>
          {ASSIUT_DISTRICTS.map((district) => <option key={district}>{district}</option>)}
        </select>
        <textarea name="text" required maxLength={400} placeholder="رأي العميل" className="min-h-28 rounded-xl border p-3 md:col-span-2" />
        <label className="flex items-center gap-2 text-sm"><input name="isPublished" type="checkbox" value="true" /> نشر الرأي فورًا</label>
        <button type="submit" className="rounded-xl bg-primary p-3 font-bold text-white">إضافة رأي</button>
      </form>
      <div className="mt-6 grid gap-4">
        {testimonials.map((testimonial) => (
          <article key={String(testimonial._id)} className="rounded-xl bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><h2 className="font-bold">{testimonial.name}</h2><p className="text-sm text-slate-500">{testimonial.district}</p></div>
              <span className={`rounded-full px-3 py-1 text-sm ${testimonial.isPublished ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                {testimonial.isPublished ? "منشور" : "مسودة"}
              </span>
            </div>
            <p className="mt-4 leading-7 text-slate-600">{testimonial.text}</p>
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
                <button className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700">حذف</button>
              </form>
            </div>
          </article>
        ))}
        {testimonials.length === 0 && <p className="rounded-xl bg-white p-8 text-center text-slate-500">لا توجد آراء عملاء حتى الآن.</p>}
      </div>
    </section>
  );
}
