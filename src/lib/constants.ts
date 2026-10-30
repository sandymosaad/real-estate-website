export const SITE_NAME = "بيتك أسيوط";

export const NAV_LINKS = [
  { label: "الرئيسية", href: "/" },
  { label: "شقق للبيع", href: "/apartments" },
  { label: "اتحاد ملاك", href: "/union" },
  { label: "قصتنا", href: "/about" },
  { label: "تواصل معانا", href: "/contact" },
] as const;

export const ASSIUT_DISTRICTS = [
  "أسيوط", "أسيوط الجديدة", "ديروط", "القوصية", "منفلوط", "أبنوب",
  "أبو تيج", "الفتح", "ساحل سليم", "البداري", "صدفا", "الغنايم",
] as const;

export const DISTRICTS = ASSIUT_DISTRICTS;
export type District = (typeof DISTRICTS)[number];
export const APARTMENT_FINISHINGS = ["نص تشطيب", "تشطيب كامل", "على الطوب"] as const;
export type ApartmentFinishing = (typeof APARTMENT_FINISHINGS)[number];
export const APARTMENT_STATUSES = ["جاهزة", "تحت الإنشاء"] as const;
export type ApartmentStatus = (typeof APARTMENT_STATUSES)[number];
export const UNION_STAGES = ["تجميع شركاء", "شراء الأرض", "تحت البناء", "مكتمل"] as const;
export type UnionStage = (typeof UNION_STAGES)[number];
export const EMPTY_RESULTS_MESSAGE = "مفيش نتائج مطابقة دلوقتي. جرّب تغيّر الفلاتر.";
export const WHATSAPP_DEFAULT_NUMBER = "201000000000";

export function isDistrict(value: string | undefined): value is District {
  return Boolean(value && DISTRICTS.includes(value as District));
}

export function isApartmentFinishing(value: string | undefined): value is ApartmentFinishing {
  return Boolean(value && APARTMENT_FINISHINGS.includes(value as ApartmentFinishing));
}

export function isApartmentStatus(value: string | undefined): value is ApartmentStatus {
  return Boolean(value && APARTMENT_STATUSES.includes(value as ApartmentStatus));
}
