import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-semibold", className)}>
      <Star className="size-3.5 fill-gold-400 text-gold-400" aria-hidden />
      {value.toFixed(1)}
    </span>
  );
}

export function Stars({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`Rated ${count} out of ${max}`}>
      {Array.from({ length: max }, (_, index) => (
        <Star
          key={index}
          className={cn("size-4", index < count ? "fill-gold-400 text-gold-400" : "text-sand-200")}
          aria-hidden
        />
      ))}
    </span>
  );
}
