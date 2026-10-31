"use client";

import { useEffect, useState } from "react";
import { ANIMATION_COUNT_DURATION } from "@/lib/animation-constants";

/** Counts a number once when mounted while preserving the server-rendered value. */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const startTime = performance.now();
    let frameId = 0;
    const updateValue = (time: number) => {
      const progress = Math.min((time - startTime) / ANIMATION_COUNT_DURATION, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setCurrentValue(Math.round(value * easedProgress));
      if (progress < 1) frameId = requestAnimationFrame(updateValue);
    };
    frameId = requestAnimationFrame(updateValue);
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  return <>{new Intl.NumberFormat("ar-EG").format(currentValue)}{suffix}</>;
}
