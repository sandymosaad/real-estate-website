"use client";

import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ASSIUT_DISTRICTS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

export function QuickSearch() {
  const router = useRouter();
  const [district, setDistrict] = useState<string>(ASSIUT_DISTRICTS[0]);
  const [type, setType] = useState("apartment");
  const [budget, setBudget] = useState("all");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const destination = type === "union" ? "/union" : "/apartments";
    router.push(
      `${destination}?district=${encodeURIComponent(district)}&budget=${budget}`,
    );
  }

  return (
    <div className="relative z-10 -mt-8 px-4 md:-mt-12">
      <Reveal variant="fade-up">
      <form
        onSubmit={submit}
        className="mx-auto grid max-w-6xl gap-3 rounded-xl border border-border bg-surface p-4 shadow-xl md:grid-cols-4 md:p-5"
      >
        <label className="text-sm font-semibold text-ink">
          المركز
          <select
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-surface p-3 font-normal outline-none focus:border-primary"
          >
            {ASSIUT_DISTRICTS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-ink">
          نوع الوحدة
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-surface p-3 font-normal outline-none focus:border-primary"
          >
            <option value="apartment">شقة</option>
            <option value="union">اتحاد ملاك</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-ink">
          الميزانية
          <select
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-surface p-3 font-normal outline-none focus:border-primary"
          >
            <option value="all">كل الميزانيات</option>
            <option value="under-1000000">أقل من مليون</option>
            <option value="1000000-2000000">من مليون لـ 2 مليون</option>
            <option value="over-2000000">أكتر من 2 مليون</option>
          </select>
        </label>
        <Button type="submit" size="lg" className="self-end">
          <Search size={18} className="ms-2" aria-hidden="true" />
          ابحث
        </Button>
      </form>
      </Reveal>
    </div>
  );
}
