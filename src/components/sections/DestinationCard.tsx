"use client";

import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Rating } from "@/components/ui/Rating";
import { useHoverTimeline } from "@/hooks/useHoverTimeline";
import { formatCurrency } from "@/lib/utils";
import type { Destination } from "@/types";

export interface DestinationItem extends Destination {
  nightlyFrom: number;
}

export function DestinationCard({ destination }: { destination: DestinationItem }) {
  const { location, image, tagline, rating, nightlyFrom } = destination;
  const hover = useHoverTimeline<HTMLElement>((timeline) =>
    timeline
      .to("[data-media]", { scale: 1.1, duration: 1.2 }, 0)
      .to("[data-shade]", { opacity: 1 }, 0)
      .to("[data-arrow]", { rotate: 45, backgroundColor: "#ddb674", color: "#06121f" }, 0)
      .to("[data-details]", { y: -8 }, 0),
  );

  return (
    <article
      data-destination
      {...hover}
      className="relative isolate flex aspect-3/4 flex-col justify-between overflow-hidden rounded-[1.75rem] p-5 text-white"
    >
      <ViewTransition name={`destination-${location.id}`} share="morph" default="none">
        <div data-media className="absolute inset-0 -z-10">
          <Image
            src={image.src}
            alt={image.alt}
            title={image.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </ViewTransition>
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950/90 via-ink-950/20 to-ink-950/10" />
      <div data-shade className="absolute inset-0 -z-10 bg-ink-950/25 opacity-0" />

      <div className="flex items-start justify-between">
        <Rating value={rating} className="rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-md" />
        <span data-arrow className="flex size-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>

      <div data-details>
        <p className="text-[11px] font-semibold tracking-[0.2em] text-gold-300 uppercase">{location.country}</p>
        <h3 className="mt-1 font-display text-3xl">{location.name}</h3>
        <p className="mt-1.5 text-sm text-white/75">{tagline}</p>
        <p className="mt-4 border-t border-white/15 pt-4 text-sm text-white/75">
          Stays from <span className="font-semibold text-white">{formatCurrency(nightlyFrom)}</span> / night
        </p>
      </div>

      <Link
        href={`/destinations/${location.id}`}
        title={`Explore ${location.name}, ${location.country}`}
        className="absolute inset-0 rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
      >
        <span className="sr-only">Explore {location.name}</span>
      </Link>
    </article>
  );
}
