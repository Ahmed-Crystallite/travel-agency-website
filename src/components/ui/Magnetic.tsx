"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
}

export function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || !window.matchMedia("(hover: hover)").matches) return;

      const config = { duration: 0.8, ease: "elastic.out(1, 0.45)" };
      const moveX = gsap.quickTo(element, "x", config);
      const moveY = gsap.quickTo(element, "y", config);

      const handleMove = (event: PointerEvent) => {
        const { left, top, width, height } = element.getBoundingClientRect();
        moveX((event.clientX - left - width / 2) * strength);
        moveY((event.clientY - top - height / 2) * strength);
      };
      const handleLeave = () => {
        moveX(0);
        moveY(0);
      };

      element.addEventListener("pointermove", handleMove);
      element.addEventListener("pointerleave", handleLeave);
      return () => {
        element.removeEventListener("pointermove", handleMove);
        element.removeEventListener("pointerleave", handleLeave);
      };
    },
    { scope: ref, dependencies: [strength] },
  );

  return (
    <div ref={ref} className="inline-flex">
      {children}
    </div>
  );
}
