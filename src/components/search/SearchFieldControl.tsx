import { ChevronDown } from "lucide-react";
import type { SearchField } from "@/types";

interface SearchFieldControlProps {
  field: SearchField;
  value: string;
  min?: string;
  onChange: (value: string) => void;
}

const controlStyles = "w-full min-w-0 bg-transparent text-sm font-semibold text-ink-900 outline-none";

export function SearchFieldControl({ field, value, min, onChange }: SearchFieldControlProps) {
  const id = `search-${field.name}`;
  const Icon = field.icon;

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white px-4 pt-2.5 pb-3 transition focus-within:border-gold-500 focus-within:ring-4 focus-within:ring-gold-400/15 hover:border-ink-900/25">
      <label htmlFor={id} className="block text-[11px] font-semibold tracking-[0.14em] text-ink-500 uppercase">
        {field.label}
      </label>
      <div className="relative mt-1.5 flex items-center gap-2.5">
        <Icon className="size-4 shrink-0 text-gold-500" aria-hidden />
        {field.type === "select" ? (
          <>
            <select
              id={id}
              value={value}
              onChange={(event) => onChange(event.target.value)}
              className={`${controlStyles} cursor-pointer appearance-none pr-6`}
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 size-4 text-ink-300" aria-hidden />
          </>
        ) : (
          <input
            id={id}
            type="date"
            value={value}
            min={min}
            onChange={(event) => onChange(event.target.value)}
            className={controlStyles}
          />
        )}
      </div>
    </div>
  );
}
