import { THEME_STORAGE_KEY } from "@/lib/constants";

export const themeScript = `
(() => {
  try {
    const savedMode = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    const mode = savedMode === "light" || savedMode === "dark" || savedMode === "system" ? savedMode : "system";
    const resolvedTheme = mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : mode === "system" ? "light" : mode;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.style.colorScheme = resolvedTheme;
  } catch {
    document.documentElement.style.colorScheme = "light";
  }
})();
`;
