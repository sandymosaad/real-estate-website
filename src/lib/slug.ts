const arabicTransliteration: Record<string, string> = {
  ا: "a",
  أ: "a",
  إ: "i",
  آ: "a",
  ب: "b",
  ت: "t",
  ث: "th",
  ج: "j",
  ح: "h",
  خ: "kh",
  د: "d",
  ذ: "th",
  ر: "r",
  ز: "z",
  س: "s",
  ش: "sh",
  ص: "s",
  ض: "d",
  ط: "t",
  ظ: "z",
  ع: "a",
  غ: "gh",
  ف: "f",
  ق: "q",
  ك: "k",
  ل: "l",
  م: "m",
  ن: "n",
  ه: "h",
  و: "w",
  ي: "y",
  ى: "a",
  ة: "h",
};

/** Creates a stable lowercase ASCII slug for database records and URLs. */
export function createSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .split("")
    .map((character) => arabicTransliteration[character] ?? character)
    .join("")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Decodes one route parameter before it is passed to a database query. */
export function decodeRouteSlug(slug: string): string {
  return decodeURIComponent(slug);
}

/** Builds the canonical detail path for an apartment or union project. */
export function getListingPath(
  type: "apartment" | "union",
  slug: string,
): string {
  const route = type === "apartment" ? "apartments" : "union";
  return `/${route}/${encodeURIComponent(slug)}`;
}
