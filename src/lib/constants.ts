export const SITE_NAME = "بيتك أسيوط";

export const NAV_LINKS = [
  { label: "الرئيسية", href: "/" },
  { label: "شقق للبيع", href: "/apartments" },
  { label: "اتحاد ملاك", href: "/union" },
  { label: "تنازل شقق", href: "/transfers" },
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
export const LEAD_RATE_LIMIT_REQUESTS = 5;
export const LEAD_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
export const LEAD_SUCCESS_MESSAGE = "وصلنا طلبك، وهنكلمك قريبًا إن شاء الله.";
export const LEAD_ERROR_MESSAGE = "حصلت مشكلة مؤقتة. جرّب تبعت الطلب تاني.";
export const LEAD_RATE_LIMIT_MESSAGE = "وصلت للحد المؤقت من الطلبات. جرّب تاني بعد شوية.";
export const LEAD_INTEREST_TYPES = [
  "شقة",
  "اتحاد ملاك",
  "استفسار عام",
  "تنازل عن شقة",
  "استلام تنازل",
] as const;
export type LeadInterestType = (typeof LEAD_INTEREST_TYPES)[number];
export const TRANSFER_LISTING_STATUSES = ["متاح", "قيد التفاوض", "تم التنازل"] as const;
export type TransferListingStatus = (typeof TRANSFER_LISTING_STATUSES)[number];
export const TRANSFER_MONEY_MAXIMUM = 100_000_000;
export const TRANSFER_INSTALLMENTS_MAXIMUM = 600;
export const TRANSFER_AREA_MAXIMUM = 10_000;
export const TRANSFER_LEGAL_NOTICE =
  "الموقع وسيط للعرض والتواصل فقط، وإتمام التنازل بيتطلب موافقة الجهة البائعة وعقد تنازل موثق، ويُفضّل مراجعة محامي قبل أي دفع.";

export function isDistrict(value: string | undefined): value is District {
  return Boolean(value && DISTRICTS.includes(value as District));
}

export function isApartmentFinishing(value: string | undefined): value is ApartmentFinishing {
  return Boolean(value && APARTMENT_FINISHINGS.includes(value as ApartmentFinishing));
}

export function isApartmentStatus(value: string | undefined): value is ApartmentStatus {
  return Boolean(value && APARTMENT_STATUSES.includes(value as ApartmentStatus));
}
