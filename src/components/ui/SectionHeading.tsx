"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const scrollTrigger = { trigger: ref.current, start: "top 85%", once: true };

      SplitText.create("[data-heading]", {
        type: "lines,words",
        mask: "lines",
        autoSplit: true,
        onSplit: (split) =>
          gsap.from(split.words, { yPercent: 110, duration: 1.1, stagger: 0.05, ease: "power4.out", scrollTrigger }),
      });
      gsap.from("[data-heading-fade]", { autoAlpha: 0, y: 20, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p data-heading-fade className="text-xs font-semibold tracking-[0.25em] text-gold-500 uppercase">
        {eyebrow}
      </p>
      <h2
        data-heading
        className={cn(
          "mt-4 font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl [&_em]:text-gold-500",
          tone === "light" && "text-white [&_em]:text-gold-300",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          data-heading-fade
          className={cn(
            "mt-5 text-base leading-relaxed text-pretty sm:text-lg",
            tone === "light" ? "text-ink-300" : "text-ink-500",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
