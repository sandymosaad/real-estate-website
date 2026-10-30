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
