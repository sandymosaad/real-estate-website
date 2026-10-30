"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ASSIUT_DISTRICTS, TRANSFER_LISTING_STATUSES } from "@/lib/constants";

const fieldClassName =
  "mt-2 w-full rounded-xl border border-border bg-white p-3 text-sm outline-none focus:border-primary";

/** Updates transfer listing filters in the URL. */
export function TransferFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  function updateFilter(name: string, value: string): void {
    const parameters = new URLSearchParams(searchParameters.toString());
    if (value) parameters.set(name, value);
    else parameters.delete(name);
    router.push(`${pathname}?${parameters.toString()}`);
  }

  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-semibold text-ink">
          المركز
          <select
            className={fieldClassName}
            value={searchParameters.get("district") ?? ""}
            onChange={(event) => updateFilter("district", event.target.value)}
          >
            <option value="">كل المراكز</option>
            {ASSIUT_DISTRICTS.map((district) => (
              <option key={district}>{district}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-ink">
          الحد الأقصى لمبلغ التنازل
          <select
            className={fieldClassName}
            value={searchParameters.get("maximumTransferAmount") ?? ""}
            onChange={(event) =>
              updateFilter("maximumTransferAmount", event.target.value)
            }
          >
            <option value="">أي مبلغ</option>
            <option value="500000">لحد 500 ألف</option>
            <option value="1000000">لحد مليون</option>
            <option value="2000000">لحد 2 مليون</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-ink">
          الحد الأقصى للقسط
          <select
            className={fieldClassName}
            value={searchParameters.get("maximumMonthlyInstallment") ?? ""}
            onChange={(event) =>
              updateFilter("maximumMonthlyInstallment", event.target.value)
            }
          >
            <option value="">أي قسط</option>
            <option value="5000">لحد 5 آلاف</option>
            <option value="10000">لحد 10 آلاف</option>
            <option value="20000">لحد 20 ألف</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-ink">
          الحالة
          <select
            className={fieldClassName}
            value={searchParameters.get("listingStatus") ?? ""}
            onChange={(event) =>
              updateFilter("listingStatus", event.target.value)
            }
          >
            <option value="">كل الحالات</option>
            {TRANSFER_LISTING_STATUSES.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
