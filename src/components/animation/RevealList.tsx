"use client";

import { Children, type ReactNode } from "react";
import { ANIMATION_STAGGER_MAX, ANIMATION_STAGGER_STEP } from "@/lib/animation-constants";
import { Reveal } from "./Reveal";

/** Reveals list children in a capped, index-based sequence. */
export function RevealList({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => (
        <Reveal key={index} delay={Math.min(index * ANIMATION_STAGGER_STEP, ANIMATION_STAGGER_MAX)}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

