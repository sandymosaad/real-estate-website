"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { ANIMATION_OBSERVER_THRESHOLD } from "@/lib/animation-constants";

type InViewResult = [RefObject<HTMLElement | null>, boolean];

/** Observes an element once and disables motion when the user requests it. */
export function useInView(): InViewResult {
  const elementReference = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      return;
    }

    const element = elementReference.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsInView(true);
        observer.disconnect();
      },
      { threshold: ANIMATION_OBSERVER_THRESHOLD },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [elementReference, isInView];
}
