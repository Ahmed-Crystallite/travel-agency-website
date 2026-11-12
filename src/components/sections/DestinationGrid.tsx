"use client";

import { useRef, useState } from "react";
import { DestinationCard, type DestinationItem } from "@/components/sections/DestinationCard";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const ALL_REGIONS = "All";

export function DestinationGrid({ destinations }: { destinations: DestinationItem[] }) {
  const [region, setRegion] = useState(ALL_REGIONS);
  const ref = useRef<HTMLDivElement>(null);

  const regions = [ALL_REGIONS, ...new Set(destinations.map(({ location }) => location.region))];
  const visible = region === ALL_REGIONS ? destinations : destinations.filter(({ location }) => location.region === region);

  useGSAP(
    () => {
      ScrollTrigger.refresh();
      if (prefersReducedMotion()) return;
      gsap.from("[data-destination]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref, dependencies: [region], revertOnUpdate: true },
  );

  return (
    <div ref={ref}>
      <div role="group" aria-label="Filter destinations by region" className="flex flex-wrap gap-2">
        {regions.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={region === item}
            onClick={() => setRegion(item)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300",
              region === item
                ? "border-ink-900 bg-ink-900 text-white"
                : "border-ink-900/15 text-ink-700 hover:border-ink-900/40",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((destination) => (
          <DestinationCard key={destination.location.id} destination={destination} />
        ))}
      </div>
    </div>
  );
}
