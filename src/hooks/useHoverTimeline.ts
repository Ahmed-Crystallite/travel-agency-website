import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function useHoverTimeline<T extends HTMLElement>(build: (timeline: gsap.core.Timeline) => void) {
  const ref = useRef<T>(null);
  const timeline = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      timeline.current = gsap.timeline({ paused: true, defaults: { duration: 0.7, ease: "power3.out" } });
      build(timeline.current);
    },
    { scope: ref },
  );

  return {
    ref,
    onPointerEnter: () => timeline.current?.play(),
    onPointerLeave: () => timeline.current?.reverse(),
  };
}
