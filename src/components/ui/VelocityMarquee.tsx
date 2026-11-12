"use client";

import { useRef } from "react";
import { Asterisk } from "lucide-react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const BASE_DURATION = 28;
const MAX_BOOST = 8;

export function VelocityMarquee({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const loop = gsap.to("[data-marquee-track]", { xPercent: -50, ease: "none", duration: BASE_DURATION, repeat: -1 });
      loop.totalTime(loop.duration() * 100);

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = Math.min(1 + Math.abs(self.getVelocity()) / 250, MAX_BOOST);
          loop.timeScale(self.direction * boost);
          gsap.to(loop, { timeScale: self.direction, duration: 1, ease: "power2.out", overwrite: true });
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden className="overflow-hidden border-y border-ink-900/10 py-8 sm:py-12">
      <div data-marquee-track className="flex w-max">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="flex items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
            <span
              className={cn(
                "font-display text-6xl leading-none tracking-tight whitespace-nowrap uppercase sm:text-8xl lg:text-9xl",
                (index % items.length) % 2 ? "text-ink-900/15" : "text-ink-900",
              )}
            >
              {item}
            </span>
            <Asterisk className="size-10 shrink-0 text-gold-500 sm:size-16" strokeWidth={1.5} />
          </span>
        ))}
      </div>
    </div>
  );
}
