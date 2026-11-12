import { pluralize } from "@/lib/utils";
import type { Location, Option } from "@/types";

export const locationOptions = (list: Location[], withAirport = false): Option[] =>
  list.map((location) => ({
    value: location.id,
    label: withAirport ? `${location.name} (${location.airport})` : location.name,
  }));

export const countOptions = (max: number, singular: string, plural?: string): Option[] =>
  Array.from({ length: max }, (_, index) => ({
    value: String(index + 1),
    label: pluralize(index + 1, singular, plural),
  }));

export const recordOptions = (record: Record<string, { label: string }>): Option[] =>
  Object.entries(record).map(([value, { label }]) => ({ value, label }));
