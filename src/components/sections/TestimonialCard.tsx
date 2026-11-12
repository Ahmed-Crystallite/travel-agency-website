import Image from "next/image";
import { Quote } from "lucide-react";
import { Stars } from "@/components/ui/Rating";
import { getService } from "@/data/services";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { name, location, quote, avatar, rating, service } = testimonial;

  return (
    <figure className="flex h-full w-[19rem] flex-col rounded-[1.75rem] bg-white p-7 shadow-[0_20px_60px_-45px_rgba(11,28,46,0.5)] ring-1 ring-ink-900/5 sm:w-[25rem] sm:p-8">
      <div className="flex items-center justify-between">
        <Stars count={rating} />
        <Quote className="size-8 fill-sand-100 text-sand-200" aria-hidden />
      </div>
      <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-ink-900 sm:text-xl">
        “{quote}”
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3 border-t border-ink-900/8 pt-5">
        <Image
          src={avatar}
          alt={`Portrait of ${name}`}
          title={name}
          width={48}
          height={48}
          className="size-12 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink-900">{name}</p>
          <p className="text-xs text-ink-500">{location}</p>
        </div>
        <span className="rounded-full bg-sand-100 px-3 py-1 text-[11px] font-semibold text-ink-700">
          {getService(service).label}
        </span>
      </figcaption>
    </figure>
  );
}
