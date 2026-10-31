"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { THEME_MODES, type ThemeMode } from "@/lib/constants";
import { useTheme } from "./ThemeProvider";

const modeLabels: Record<ThemeMode, string> = {
  light: "الوضع الفاتح",
  dark: "الوضع الداكن",
  system: "حسب الجهاز",
};

const modeIcons = { light: Sun, dark: Moon, system: Monitor };

/** Cycles between light, dark, and system appearance modes. */
export function ThemeToggle() {
  const { mode, setMode } = useTheme();
  const isMounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  if (!isMounted) {
    return <span aria-hidden="true" className="block h-10 w-10" />;
  }
  const Icon = modeIcons[mode];
  const nextMode = THEME_MODES[
    (THEME_MODES.indexOf(mode) + 1) % THEME_MODES.length
  ];

  return (
    <button
      type="button"
      title={modeLabels[mode]}
      aria-label="تغيير المظهر"
      onClick={() => setMode(nextMode)}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-ink transition-colors hover:bg-primary-light"
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}
