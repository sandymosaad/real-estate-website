"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  THEME_MODES,
  THEME_STORAGE_KEY,
  type ThemeMode,
} from "@/lib/constants";

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialMode(): ThemeMode {
  if (typeof window === "undefined") return "system";
  try {
    const savedMode = localStorage.getItem(THEME_STORAGE_KEY);
    return savedMode && THEME_MODES.includes(savedMode as ThemeMode)
      ? (savedMode as ThemeMode)
      : "system";
  } catch {
    return "system";
  }
}

function applyTheme(mode: ThemeMode): void {
  const resolvedTheme = mode === "system" ? getSystemTheme() : mode;
  document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  document.documentElement.style.colorScheme = resolvedTheme;
}

/** Provides persistent light, dark, and system theme state. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    applyTheme(mode);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (mode === "system") applyTheme("system");
    };
    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      setMode: (nextMode: ThemeMode) => {
        setModeState(nextMode);
        try {
          localStorage.setItem(THEME_STORAGE_KEY, nextMode);
        } catch {
          return;
        }
      },
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Reads the current theme mode and its setter. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider.");
  return context;
}
