import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { cn, formatCurrency } from "@/lib/utils";
import type { SearchResult } from "@/types";

interface ResultCardProps {
  result: SearchResult;
  icon: LucideIcon;
}

export function ResultCard({ result, icon: Icon }: ResultCardProps) {
  const { title, subtitle, highlights, price, priceCaption, image, badge, rating } = result;

  return (
    <article
      data-result
      className="group flex flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-white transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(11,28,46,0.35)] sm:flex-row"
    >
      <div className={cn("relative shrink-0 overflow-hidden bg-sand-100", image ? "h-48 sm:h-auto sm:w-56" : "h-28 sm:h-auto sm:w-36")}>
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            title={image.alt}
            fill
            sizes="(min-width: 640px) 224px, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Icon className="size-9 text-gold-500" strokeWidth={1.25} aria-hidden />
          </div>
        )}
        {badge && (
          <span className="absolute top-3 left-3 rounded-full bg-ink-900 px-3 py-1 text-[11px] font-semibold text-white">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h4 className="font-display text-xl text-ink-900">{title}</h4>
            {rating && <Rating value={rating} className="text-ink-700" />}
          </div>
          <p className="mt-1 text-sm text-ink-500">{subtitle}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {highlights.map((highlight) => (
              <li key={highlight} className="rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-ink-700">
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-ink-900/8 pt-4 md:flex-col md:border-0 md:pt-0">
          <div className="md:text-right">
            <p className="font-display text-2xl text-ink-900">{formatCurrency(price)}</p>
            <p className="text-xs text-ink-500">{priceCaption}</p>
          </div>
          <a href="#contact" className={buttonStyles({ variant: "dark", size: "sm" })}>
            Reserve
          </a>
        </div>
      </div>
    </article>
  );
}
