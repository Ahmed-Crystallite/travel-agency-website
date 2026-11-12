"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Stars } from "@/components/ui/Rating";
import { testimonials } from "@/data/testimonials";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";
import type { Photo } from "@/types";

const HERO_IMAGE: Photo = {
  src: "/images/hero/home.jpg",
  alt: "Wooden boat on a turquoise alpine lake surrounded by mountains",
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo("[data-hero-media]", { autoAlpha: 0, scale: 1.25 }, { autoAlpha: 1, scale: 1, duration: 2.6, ease: "power2.out" })
        .fromTo("[data-hero-fade]", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.9);

      SplitText.create("[data-hero-title]", {
        type: "lines,chars",
        mask: "lines",
        autoSplit: true,
        onSplit: (split) => {
          gsap.set(split.elements, { autoAlpha: 1 });
          return gsap.from(split.chars, {
            yPercent: 115,
            rotate: 8,
            duration: 1.2,
            stagger: 0.022,
            delay: 0.3,
            ease: "power4.out",
          });
        },
      });

      gsap.to("[data-hero-parallax]", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-ink-950 pt-32 pb-48 text-white sm:pb-56"
    >
      <div data-hero-parallax className="absolute inset-0 -z-10">
        <div data-hero-media className="absolute inset-0 motion-safe:invisible">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            title={HERO_IMAGE.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-ink-950/75 via-ink-950/35 to-ink-950/90" />
      </div>

      <Container>
        <div className="max-w-4xl">
          <h1
            data-hero-title
            className="mt-7 font-display text-5xl leading-[1.05] tracking-tight motion-safe:invisible sm:text-7xl lg:text-[5.75rem]"
          >
            Journeys crafted
            <br />
            beyond the <em className="text-gold-300">ordinary</em>
          </h1>

          <p
            data-hero-fade
            className="mt-6 max-w-xl text-base leading-relaxed text-white/75 motion-safe:invisible sm:text-lg"
          >
            From visas and flights to five-star stays and chauffeur-ready cars — every detail of your trip handled by
            one dedicated team.
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-3 motion-safe:invisible">
            <Magnetic>
              <a href="#search" className={buttonStyles({ size: "lg" })}>
                Start planning
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </Magnetic>
            <a href="#destinations" className={buttonStyles({ variant: "light", size: "lg" })}>
              Explore destinations
            </a>
          </div>

          <div data-hero-fade className="mt-12 flex items-center gap-4 motion-safe:invisible">
            <div className="flex -space-x-3">
              {testimonials.slice(0, 4).map((testimonial) => (
                <Image
                  key={testimonial.name}
                  src={testimonial.avatar}
                  alt={`Portrait of ${testimonial.name}`}
                  title={testimonial.name}
                  width={44}
                  height={44}
                  className="size-11 rounded-full object-cover ring-2 ring-ink-950"
                />
              ))}
            </div>
            <div className="text-sm">
              <Stars count={5} />
              <p className="mt-1 text-white/70">
                <span className="font-semibold text-white">4.9/5</span> from 2,300+ verified travellers
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
