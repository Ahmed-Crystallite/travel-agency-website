"use client";

import { useRef, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ResultCard } from "@/components/search/ResultCard";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { pluralize } from "@/lib/utils";
import type { SearchResult } from "@/types";

interface SearchResultsProps {
  summary: string;
  results: SearchResult[];
  icon: LucideIcon;
  children?: ReactNode;
}

export function SearchResults({ summary, results, icon, children }: SearchResultsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.refresh();
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (prefersReducedMotion()) return;
      gsap.from("[data-result]", { autoAlpha: 0, y: 32, duration: 0.8, stagger: 0.08, ease: "power3.out" });
    },
    { scope: ref, dependencies: [results], revertOnUpdate: true },
  );

  return (
    <div ref={ref} aria-live="polite" className="scroll-mt-24 pt-12">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink-900/10 pb-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase">
            {pluralize(results.length, "option")} available
          </p>
          <h3 className="mt-2 font-display text-2xl text-ink-900 sm:text-3xl">{summary}</h3>
        </div>
        <p className="text-sm text-ink-500">Prices in USD, taxes included</p>
      </div>

      {children}

      {results.length ? (
        <div className="mt-6 grid gap-4">
          {results.map((result) => (
            <ResultCard key={result.id} result={result} icon={icon} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-center text-ink-500">No options match your search. Try adjusting your filters.</p>
      )}
    </div>
  );
}
