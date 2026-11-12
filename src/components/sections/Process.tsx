"use client";

import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";
import { gsap, useGSAP } from "@/lib/gsap";

const PINNED_LAYOUT = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(PINNED_LAYOUT, () => {
        const element = track.current!;
        const distance = () => element.scrollWidth - element.parentElement!.clientWidth;

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(element, { x: () => -distance() }, 0)
          .fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1 }, 0);
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="process"
      ref={ref}
      className="overflow-hidden bg-ink-950 py-24 text-white sm:py-32 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-20"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="light"
            eyebrow="How it works"
            title={
              <>
                From first idea to <em>touchdown</em>
              </>
            }
            description="One specialist, four simple steps. Scroll through how we turn a travel plan into a finished itinerary."
          />
          <div aria-hidden className="hidden h-px w-64 bg-white/15 lg:block">
            <div data-progress className="h-full origin-left bg-gold-400" />
          </div>
        </div>

        <ol ref={track} className="mt-14 grid gap-6 lg:flex lg:w-max lg:gap-8">
          {processSteps.map(({ title, description, image, icon: Icon }, index) => (
            <li
              key={title}
              className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white/5 ring-1 ring-white/10 lg:w-[34rem] lg:flex-row"
            >
              <div className="relative aspect-video shrink-0 overflow-hidden lg:aspect-auto lg:w-56">
                <Image
                  src={image.src}
                  alt={image.alt}
                  title={image.alt}
                  fill
                  sizes="(min-width: 1024px) 224px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-full bg-gold-400 text-ink-950">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-display text-5xl text-transparent [-webkit-text-stroke:1px_var(--color-gold-300)]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-10 font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
