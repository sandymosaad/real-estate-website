"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  APARTMENT_FINISHINGS,
  APARTMENT_STATUSES,
  ASSIUT_DISTRICTS,
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const fieldClassName =
  "mt-2 w-full rounded-xl border border-border bg-surface p-3 text-sm outline-none focus:border-primary";

/** Updates apartment filters in the URL so results remain shareable and refresh-safe. */
export function ApartmentFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateFilter(name: string, value: string) {
    const parameters = new URLSearchParams(searchParams.toString());

    if (value) {
      parameters.set(name, value);
    } else {
      parameters.delete(name);
    }

    router.push(`${pathname}?${parameters.toString()}`);
  }

  function clearFilters() {
    router.push(pathname);
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-semibold text-ink">
          المركز
          <select
            className={fieldClassName}
            value={searchParams.get("district") ?? ""}
            onChange={(event) => updateFilter("district", event.target.value)}
          >
            <option value="">كل المراكز</option>
            {ASSIUT_DISTRICTS.map((district) => (
              <option key={district}>{district}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-ink">
          السعر
          <select
            className={fieldClassName}
            value={searchParams.get("price") ?? ""}
            onChange={(event) => updateFilter("price", event.target.value)}
          >
            <option value="">كل الأسعار</option>
            <option value="under-1000000">أقل من مليون</option>
            <option value="1000000-2000000">من مليون لـ 2 مليون</option>
            <option value="over-2000000">أكتر من 2 مليون</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-ink">
          المساحة
          <select
            className={fieldClassName}
            value={searchParams.get("area") ?? ""}
            onChange={(event) => updateFilter("area", event.target.value)}
          >
            <option value="">كل المساحات</option>
            <option value="under-100">أقل من 100 م²</option>
            <option value="100-150">من 100 لـ 150 م²</option>
            <option value="over-150">أكتر من 150 م²</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-ink">
          عدد الغرف
          <select
            className={fieldClassName}
            value={searchParams.get("rooms") ?? ""}
            onChange={(event) => updateFilter("rooms", event.target.value)}
          >
            <option value="">كل الغرف</option>
            <option value="2">غرفتين</option>
            <option value="3">3 غرف</option>
            <option value="4">4 غرف أو أكتر</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-ink">
          الدور
          <select
            className={fieldClassName}
            value={searchParams.get("floor") ?? ""}
            onChange={(event) => updateFilter("floor", event.target.value)}
          >
            <option value="">كل الأدوار</option>
            <option value="1">الأرضي</option>
            <option value="2">الدور الثاني</option>
            <option value="3">الدور الثالث</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-ink">
          التشطيب
          <select
            className={fieldClassName}
            value={searchParams.get("finishing") ?? ""}
            onChange={(event) => updateFilter("finishing", event.target.value)}
          >
            <option value="">كل أنواع التشطيب</option>
            {APARTMENT_FINISHINGS.map((finishing) => (
              <option key={finishing}>{finishing}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-ink">
          الحالة
          <select
            className={fieldClassName}
            value={searchParams.get("status") ?? ""}
            onChange={(event) => updateFilter("status", event.target.value)}
          >
            <option value="">كل الحالات</option>
            {APARTMENT_STATUSES.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
        <Button
          type="button"
          variant="outline"
          className="self-end"
          onClick={clearFilters}
        >
          مسح الفلاتر
        </Button>
      </div>
    </div>
  );
}
