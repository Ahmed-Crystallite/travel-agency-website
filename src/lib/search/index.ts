import { carSearch } from "@/lib/search/cars";
import { flightSearch } from "@/lib/search/flights";
import { hotelSearch } from "@/lib/search/hotels";
import { visaSearch } from "@/lib/search/visa";
import { daysBetween, wait } from "@/lib/utils";
import type { SearchConfig, SearchValues, ServiceId } from "@/types";

const MOCK_LATENCY_MS = 700;

export const searchConfigs: Record<ServiceId, SearchConfig> = {
  visa: visaSearch,
  flights: flightSearch,
  hotels: hotelSearch,
  cars: carSearch,
};

export function validateSearch({ fields, validate }: SearchConfig, values: SearchValues) {
  for (const field of fields) {
    if (!values[field.name]) return `${field.label} is required.`;

    const reference = fields.find((item) => item.name === field.after);
    if (reference && daysBetween(values[reference.name], values[field.name]) <= 0) {
      return `${field.label} must be after ${reference.label.toLowerCase()}.`;
    }
  }
  return validate?.(values) ?? null;
}

export async function runSearch(config: SearchConfig, values: SearchValues) {
  await wait(MOCK_LATENCY_MS);
  return config.search(values);
}
