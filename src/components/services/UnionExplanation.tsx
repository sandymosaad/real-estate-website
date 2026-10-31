import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";

const steps = ["نحدد الهدف", "نختار المنطقة", "نراجع التفاصيل", "نتفق على التكلفة", "نبدأ التنفيذ", "نتابع المراحل"];

/** Explains union ownership as a clear shared ownership and building process. */
export function UnionExplanation() {
  return (
    <>
      <Section title="يعني إيه اتحاد ملاك؟" 
        subtitle="مشاركة في تملك وبناء مشروع عقاري مع مجموعة شركاء، بخطوات وتكاليف معلنة."
      >
        <p className="max-w-3xl leading-8 text-muted">
          اتحاد الملاك بيساعد مجموعة من الناس يتشاركوا في مشروع واحد، من اختيار الأرض ومراجعة التكلفة لحد متابعة مراحل البناء، وكل شريك بيكون عارف نصيبه والتفاصيل المتفق عليها.
        </p>
      </Section>


      <Section title="بيشتغل إزاي؟">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => <div key={step} className="flex items-center gap-3 rounded-xl border border-border p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">
              {index + 1}
            </span>
            <span className="font-semibold text-ink">
              {step}
            </span>
          </div>
          )}
        </div>
      </Section>

      <Section title="مثال مبسط">
        <div className="rounded-xl bg-primary-light p-6 text-center">
          <p className="text-lg font-semibold text-ink">
            نصيب الشريك = (سعر الأرض + تكلفة البناء) ÷ عدد المقاعد
          </p>
          <p className="mt-3 text-muted">
            مثال: (2,000,000 + 8,000,000) ÷ 10 = 1,000,000 جنيه للمقعد
          </p>
        </div>
      </Section>

      <Section title="إيه اللي بنوضحه؟">
        <div className="grid gap-4 md:grid-cols-3">
          {
          ["تفاصيل التكلفة", "مراحل المشروع", "عدد المقاعد المتاحة"]
            .map((item) => <div key={item} 
            className="flex gap-3 text-muted">
              <CheckCircle2 className="shrink-0 text-primary" size={22} aria-hidden="true" />
                <span>
                  {item} بشكل واضح قبل التواصل.
                </span>
            </div>)}
        </div>
      </Section>
    </>
  );
}
