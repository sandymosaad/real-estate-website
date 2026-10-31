"use client";

import { useState, type ElementType, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealVariant = "fade-up" | "fade-in" | "slide-inline" | "scale-in";
type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  as?: ElementType;
  className?: string;
};

const delayClasses = ["delay-0", "delay-1", "delay-2", "delay-3", "delay-4", "delay-5", "delay-6", "delay-7"];

/** Reveals content after it enters the viewport without hiding it from no-JS users. */
export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  as: Component = "div",
  className = "",
}: RevealProps) {
  const [elementReference, isInView] = useInView();
  const [isAnimationReady] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const animationClass = isAnimationReady
    ? `reveal reveal-${variant} ${isInView ? "reveal-visible" : ""} ${delayClasses[Math.min(Math.round(delay / 80), 7)]}`
    : "";
  return (
    <Component ref={elementReference} className={`${animationClass} ${className}`.trim()}>
      {children}
    </Component>
  );
}
