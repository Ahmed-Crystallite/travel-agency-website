"use client";

import Image from "next/image";
import Link from "next/link";
import { ViewTransition, type ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useSearch } from "@/components/search/SearchProvider";
import { useHoverTimeline } from "@/hooks/useHoverTimeline";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Omit<Service, "icon">;
  icon: ReactNode;
  index: number;
}

export function ServiceCard({ service, icon, index }: ServiceCardProps) {
  const { openSearch } = useSearch();
  const hover = useHoverTimeline<HTMLElement>((timeline) =>
    timeline
      .to("[data-media]", { scale: 1.08 }, 0)
      .to("[data-arrow]", { rotate: -45, backgroundColor: "#ddb674", color: "#06121f" }, 0)
      .to("[data-card-body]", { y: -6 }, 0),
  );

  return (
    <article
      {...hover}
      className="flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_20px_60px_-40px_rgba(11,28,46,0.4)] ring-1 ring-ink-900/5"
    >
      <Link
        href={`/services/${service.id}`}
        tabIndex={-1}
        aria-hidden
        title={service.title}
        className="relative block aspect-4/3 overflow-hidden"
      >
        <ViewTransition name={`service-${service.id}`} share="morph" default="none">
          <div data-media className="absolute inset-0">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              title={service.image.alt}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </ViewTransition>
        <div className="absolute inset-0 bg-linear-to-t from-ink-950/40 to-transparent" />
        <span className="absolute top-4 left-4 flex size-11 items-center justify-center rounded-full bg-white/90 text-ink-900 backdrop-blur">
          {icon}
        </span>
        <span className="absolute top-5 right-5 font-display text-sm text-white">0{index + 1}</span>
      </Link>

      <div data-card-body className="flex flex-1 flex-col bg-white p-6">
        <h3 className="font-display text-2xl text-ink-900">
          <Link href={`/services/${service.id}`} className="transition-colors hover:text-gold-600">
            {service.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-500">{service.description}</p>
        <ul className="mt-5 space-y-2.5 text-sm text-ink-700">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-gold-500" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => openSearch(service.id)}
          className="mt-auto flex items-center justify-between pt-7 text-sm font-semibold text-ink-900"
        >
          {service.cta}
          <span data-arrow className="flex size-10 items-center justify-center rounded-full bg-ink-900 text-white">
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </button>
      </div>
    </article>
  );
}
