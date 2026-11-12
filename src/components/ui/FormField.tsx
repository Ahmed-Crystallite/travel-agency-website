import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputStyles =
  "w-full rounded-2xl border border-ink-900/10 bg-white px-4 py-3.5 text-sm text-ink-900 transition outline-none placeholder:text-ink-300 focus:border-gold-500 focus:ring-4 focus:ring-gold-400/15 aria-invalid:border-red-400";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}

export function FormField({ id, label, error, optional, className, children }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink-900">
        {label}
        {optional && <span className="ml-1 font-normal text-ink-500">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
