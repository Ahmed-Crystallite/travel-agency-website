"use client";

import { useRef, useState, type ComponentType, type CSSProperties, type FormEvent } from "react";
import { LoaderCircle, Search } from "lucide-react";
import { FlightRoute } from "@/components/search/FlightRoute";
import { SEARCH_SECTION_ID, useSearch } from "@/components/search/SearchProvider";
import { SearchFieldControl } from "@/components/search/SearchFieldControl";
import { SearchResults } from "@/components/search/SearchResults";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getService, services } from "@/data/services";
import { useToday } from "@/hooks/useToday";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { runSearch, searchConfigs, validateSearch } from "@/lib/search";
import { cn } from "@/lib/utils";
import type { SearchResult, SearchValues, ServiceId } from "@/types";

interface SearchOutcome {
  service: ServiceId;
  values: SearchValues;
  summary: string;
  results: SearchResult[];
}

const resultVisuals: Partial<Record<ServiceId, ComponentType<{ values: SearchValues }>>> = {
  flights: FlightRoute,
};

export function SearchPanel() {
  const { service, values, selectService, updateValue } = useSearch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<SearchOutcome | null>(null);
  const today = useToday();
  const ref = useRef<HTMLElement>(null);

  const config = searchConfigs[service];
  const current = values[service];
  const visibleOutcome = outcome?.service === service ? outcome : null;
  const ResultVisual = visibleOutcome && resultVisuals[visibleOutcome.service];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-search-card]",
        { autoAlpha: 0, y: 64 },
        { autoAlpha: 1, y: 0, duration: 1.3, delay: 0.9, ease: "power4.out" },
      );
    },
    { scope: ref },
  );

  const handleTabChange = (id: ServiceId) => {
    selectService(id);
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = validateSearch(config, current);
    setError(message);
    if (message) return;

    setLoading(true);
    const results = await runSearch(config, current);
    setOutcome({ service, values: current, summary: config.describe(current), results });
    setLoading(false);
  };

  return (
    <section id={SEARCH_SECTION_ID} ref={ref} className="relative z-10 -mt-28 scroll-mt-24 sm:-mt-36">
      <Container>
        <div
          data-search-card
          className="rounded-4xl bg-white p-2.5 shadow-[0_40px_120px_-40px_rgba(6,18,31,0.45)] ring-1 ring-ink-900/5 motion-safe:invisible sm:p-3"
        >
          <div role="tablist" aria-label="Choose a service" className="grid grid-cols-2 gap-1 rounded-[1.6rem] bg-sand-100 p-1.5 sm:flex">
            {services.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={service === id}
                aria-controls="search-form"
                onClick={() => handleTabChange(id)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors duration-300",
                  service === id ? "bg-ink-900 text-white shadow-lg shadow-ink-900/20" : "text-ink-500 hover:text-ink-900",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </button>
            ))}
          </div>

          <form
            id="search-form"
            role="tabpanel"
            aria-labelledby={`tab-${service}`}
            noValidate
            onSubmit={handleSubmit}
            style={{ "--fields": config.fields.length } as CSSProperties}
            className="grid gap-3 p-3 pt-4 sm:grid-cols-2 sm:p-4 lg:grid-cols-[repeat(var(--fields),minmax(0,1fr))_auto]"
          >
            {config.fields.map((field) => (
              <SearchFieldControl
                key={`${service}-${field.name}`}
                field={field}
                value={current[field.name]}
                min={field.type === "date" ? (field.after && current[field.after]) || today : undefined}
                onChange={(value) => updateValue(field.name, value)}
              />
            ))}
            <Button type="submit" size="lg" disabled={loading} className="h-auto min-h-14 sm:col-span-2 lg:col-span-1">
              {loading ? <LoaderCircle className="size-5 animate-spin" aria-hidden /> : <Search className="size-5" aria-hidden />}
              {loading ? "Searching…" : config.submitLabel}
            </Button>
          </form>

          {error && (
            <p role="alert" className="px-4 pb-4 text-sm font-medium text-red-600 sm:px-5">
              {error}
            </p>
          )}
        </div>

        {visibleOutcome && (
          <SearchResults
            summary={visibleOutcome.summary}
            results={visibleOutcome.results}
            icon={getService(visibleOutcome.service).icon}
          >
            {ResultVisual && <ResultVisual values={visibleOutcome.values} />}
          </SearchResults>
        )}
      </Container>
    </section>
  );
}
