"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { formatNumber } from "@/lib/utils";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function Counter({ value, suffix = "", duration = 2.2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || prefersReducedMotion()) return;

      const render = (current: number) => {
        element.textContent = `${formatNumber(Math.round(current))}${suffix}`;
      };
      const counter = { current: 0 };
      render(0);

      gsap.to(counter, {
        current: value,
        duration,
        ease: "power2.out",
        onUpdate: () => render(counter.current),
        scrollTrigger: { trigger: element, start: "top 90%", once: true },
      });
    },
    { dependencies: [value, suffix, duration] },
  );

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(value)}
      {suffix}
    </span>
  );
}
