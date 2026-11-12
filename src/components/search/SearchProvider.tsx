"use client";

import { createContext, use, useState, type ReactNode } from "react";
import { searchConfigs } from "@/lib/search";
import type { SearchValues, ServiceId } from "@/types";

export const SEARCH_SECTION_ID = "search";

interface SearchContextValue {
  service: ServiceId;
  values: Record<ServiceId, SearchValues>;
  selectService: (service: ServiceId) => void;
  updateValue: (name: string, value: string) => void;
  openSearch: (service: ServiceId, preset?: SearchValues) => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

interface SearchProviderProps {
  children: ReactNode;
  initialService?: ServiceId;
  preset?: SearchValues;
}

const buildInitialValues = (service: ServiceId, preset: SearchValues) =>
  Object.fromEntries(
    Object.values(searchConfigs).map((config) => [
      config.id,
      config.id === service ? { ...config.defaults, ...preset } : config.defaults,
    ]),
  ) as Record<ServiceId, SearchValues>;

export function SearchProvider({ children, initialService = "flights", preset = {} }: SearchProviderProps) {
  const [service, selectService] = useState(initialService);
  const [values, setValues] = useState(() => buildInitialValues(initialService, preset));

  const updateValue = (name: string, value: string) =>
    setValues((current) => ({ ...current, [service]: { ...current[service], [name]: value } }));

  const openSearch = (next: ServiceId, preset: SearchValues = {}) => {
    selectService(next);
    setValues((current) => ({ ...current, [next]: { ...current[next], ...preset } }));
    document.getElementById(SEARCH_SECTION_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SearchContext value={{ service, values, selectService, updateValue, openSearch }}>{children}</SearchContext>
  );
}

export function useSearch() {
  const context = use(SearchContext);
  if (!context) throw new Error("useSearch must be used within a SearchProvider");
  return context;
}
