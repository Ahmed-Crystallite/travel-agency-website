"use client";

import { useRef } from "react";
import { Plane } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { getRoute } from "@/lib/search/flights";
import { formatNumber } from "@/lib/utils";
import type { SearchValues } from "@/types";

const ARC = "M 16 132 Q 300 -36 584 132";

export function FlightRoute({ values }: { values: SearchValues }) {
  const ref = useRef<HTMLDivElement>(null);
  const { origin, destination, distance, duration, carriers } = getRoute(values.from, values.to);

  useGSAP(
    () => {
      const motionPath = { path: "[data-arc]", align: "[data-arc]", alignOrigin: [0.5, 0.5], autoRotate: 45 };

      if (prefersReducedMotion()) {
        gsap.set("[data-plane]", { motionPath: { ...motionPath, start: 1, end: 1 } });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-endpoint]", { scale: 0, transformOrigin: "50% 50%", duration: 0.6, stagger: 0.15 })
        .fromTo("[data-arc]", { drawSVG: "0%" }, { drawSVG: "100%", duration: 2.2, ease: "power1.inOut" }, 0.2)
        .to("[data-plane]", { motionPath, duration: 2.2, ease: "power1.inOut" }, 0.2)
        .from("[data-route-meta]", { autoAlpha: 0, y: 16, stagger: 0.1, duration: 0.7 }, 0.8);
    },
    { scope: ref, dependencies: [values.from, values.to], revertOnUpdate: true },
  );

  const endpoints = [
    { location: origin, label: "Departing" },
    { location: destination, label: "Arriving" },
  ];

  return (
    <div ref={ref} className="mt-6 overflow-hidden rounded-3xl bg-ink-950 p-6 text-white sm:p-10">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-[auto_1fr_auto] lg:items-end lg:gap-10">
        {endpoints.map(({ location, label }, index) => (
          <div key={label} data-route-meta className={index ? "text-right lg:col-start-3" : undefined}>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-gold-300 uppercase">{label}</p>
            <p className="mt-2 font-display text-5xl leading-none sm:text-7xl">{location.airport}</p>
            <p className="mt-2 text-sm text-ink-300">
              {location.name}, {location.country}
            </p>
          </div>
        ))}

        <svg
          viewBox="0 0 600 150"
          className="col-span-2 w-full overflow-visible lg:col-span-1 lg:col-start-2 lg:row-start-1"
          aria-hidden
        >
          <path d={ARC} fill="none" stroke="currentColor" strokeOpacity={0.15} strokeWidth={1.5} strokeDasharray="4 8" />
          <path data-arc d={ARC} fill="none" stroke="#ddb674" strokeWidth={2} strokeLinecap="round" />
          {[
            [16, 132],
            [584, 132],
          ].map(([cx, cy]) => (
            <g key={cx} data-endpoint>
              <circle cx={cx} cy={cy} r={14} fill="#ddb674" fillOpacity={0.15} />
              <circle cx={cx} cy={cy} r={5} fill="#ddb674" />
            </g>
          ))}
          <g data-plane>
            <circle r={20} fill="#06121f" />
            <Plane x={-12} y={-12} width={24} height={24} color="#e9cf9e" strokeWidth={1.75} />
          </g>
        </svg>
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-sm">
        {[
          { term: "Distance", value: `${formatNumber(distance)} km` },
          { term: "Flight time", value: `≈ ${duration}` },
          { term: "Airlines", value: `${carriers} carriers` },
        ].map(({ term, value }) => (
          <div key={term} data-route-meta>
            <dt className="text-xs text-ink-300">{term}</dt>
            <dd className="mt-1 font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
