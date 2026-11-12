"use client";

import { useRef } from "react";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import type { Testimonial } from "@/types";

const SECONDS_PER_CARD = 7;

export function TestimonialMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const loop = useRef<gsap.core.Tween>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      loop.current = gsap.to("[data-track]", {
        xPercent: -50,
        ease: "none",
        duration: testimonials.length * SECONDS_PER_CARD,
        repeat: -1,
      });
    },
    { scope: ref, dependencies: [testimonials.length] },
  );

  const setSpeed = (timeScale: number) => {
    if (loop.current) gsap.to(loop.current, { timeScale, duration: 0.8, ease: "power2.out" });
  };

  return (
    <div
      ref={ref}
      onPointerEnter={() => setSpeed(0)}
      onPointerLeave={() => setSpeed(1)}
      className="overflow-x-auto mask-x-from-90% mask-x-to-100% py-4 motion-safe:overflow-hidden"
    >
      <ul data-track className="flex w-max">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <li key={index} aria-hidden={index >= testimonials.length} className="pr-5 sm:pr-6">
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>
    </div>
  );
}
