"use client";

import { useRef, ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";
import type { NavLink, Photo } from "@/types";

interface PageHeroProps {
  title: string;
  eyebrow: string;
  description: string;
  image: Photo;
  transitionName: string;
  breadcrumbs: NavLink[];
  facts?: Array<{ label: string; value: string }>;
}

export function PageHero({ title, eyebrow, description, image, transitionName, breadcrumbs, facts }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      SplitText.create("[data-page-title]", {
        type: "lines,chars",
        mask: "lines",
        autoSplit: true,
        onSplit: (split) => {
          gsap.set(split.elements, { autoAlpha: 1 });
          return gsap.from(split.chars, { yPercent: 115, duration: 1.1, stagger: 0.03, delay: 0.2, ease: "power4.out" });
        },
      });
      gsap.fromTo(
        "[data-page-fade]",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, delay: 0.5, ease: "power3.out" },
      );
      gsap.to("[data-page-parallax]", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: ref, dependencies: [title] },
  );

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[85svh] items-end overflow-hidden bg-ink-950 pt-36 pb-44 text-white sm:pb-52"
    >
      <div data-page-parallax className="absolute inset-0 -z-10">
        <ViewTransition name={transitionName} share="morph" default="none">
          <div className="absolute inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              title={image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </ViewTransition>
        <div className="absolute inset-0 bg-linear-to-b from-ink-950/70 via-ink-950/40 to-ink-950/90" />
      </div>

      <Container>
        <nav aria-label="Breadcrumb" data-page-fade className="motion-safe:invisible">
          <ol className="flex items-center gap-1.5 text-xs font-medium text-white/60">
            {breadcrumbs.map((crumb) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                <Link href={crumb.href} className="transition-colors hover:text-white">
                  {crumb.label}
                </Link>
                <ChevronRight className="size-3.5" aria-hidden />
              </li>
            ))}
            <li aria-current="page" className="text-white">
              {title}
            </li>
          </ol>
        </nav>

        <p data-page-fade className="mt-8 text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase motion-safe:invisible">
          {eyebrow}
        </p>
        <h1
          data-page-title
          className="mt-4 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight motion-safe:invisible sm:text-7xl lg:text-8xl"
        >
          {title}
        </h1>
        <p data-page-fade className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 motion-safe:invisible sm:text-lg">
          {description}
        </p>

        {facts && (
          <dl data-page-fade className="mt-10 flex flex-wrap gap-x-10 gap-y-4 motion-safe:invisible">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">{fact.label}</dt>
                <dd className="mt-1 font-display text-xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
