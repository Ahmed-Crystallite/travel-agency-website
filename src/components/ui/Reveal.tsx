"use client";

import { useRef, type ComponentProps } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

interface RevealProps extends ComponentProps<"div"> {
  stagger?: number;
  distance?: number;
}

export function Reveal({ stagger = 0.12, distance = 48, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || prefersReducedMotion()) return;

      gsap.from(element.children, {
        autoAlpha: 0,
        y: distance,
        duration: 1.1,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: element, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return <div ref={ref} {...props} />;
}
