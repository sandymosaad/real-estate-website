"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/Section";

const questions = [
  ["يعني إيه اتحاد ملاك؟", "هو طريقة للمشاركة في مشروع عقاري مع مجموعة شركاء، بتفاصيل وحصص واضحة."],
  ["هل العقود موثقة؟", "بنوضح لك مستندات التعاقد المطلوبة ونساعدك تعرف كل خطوة قبل التوقيع."],
  ["إزاي أختار المنطقة المناسبة؟", "بنسألك عن احتياجاتك وميزانيتك ونقارن لك بين المراكز المتاحة."],
  ["هل أقدر أعاين الشقة قبل القرار؟", "طبعاً، بننسق معاك موعد مناسب للمعاينة قبل ما تاخد قرارك."],
  ["هل الأسعار قابلة للتفاوض؟", "كل وحدة لها ظروفها، وبنوضح لك السعر والتفاصيل المتاحة وقت التواصل."],
  ["إزاي أبدأ البحث؟", "استخدم البحث السريع أو كلمنا مباشرة، وفريقنا هيساعدك تبدأ."],
  ["إزاي أتنازل عن شقة بالتقسيط؟", "لو مش قادر تكمّل، ابعت بيانات وحدتك من صفحة التنازل. المشتري الجديد يدفع لك اللي دفعته حسب الاتفاق، ويكمّل الأقساط مع الجهة البائعة بعد الموافقة والتوثيق."],
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return <Section title="أسئلة بتتكرر">
    <div className="mx-auto max-w-3xl divide-y divide-border rounded-xl border border-border">
      {questions.map(([question, answer], index) => <div key={question}>
        <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-4 p-5 text-start font-semibold text-ink">
          <span>{question}</span>
          <ChevronDown 
            size={20} 
            className={`shrink-0 text-primary transition-transform ${open === index ? "rotate-180" : ""}`} aria-hidden="true" 
          />
        </button>

        {open === index && <p className="px-5 pb-5 leading-7 text-muted">
          {answer}
        </p>}
      </div>)}
    
    
    </div>
  
  </Section>;
}
