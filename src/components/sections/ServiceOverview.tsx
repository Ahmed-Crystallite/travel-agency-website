import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Service } from "@/types";

export function ServiceOverview({ service }: { service: Service }) {
  return (
    <section className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="How we handle it"
            title={
              <>
                {service.title}, <em>without</em> the stress
              </>
            }
            description={service.description}
          />
          <Reveal stagger={0.08} distance={20} className="mt-10 space-y-3">
            {service.features.map((feature) => (
              <p key={feature} className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-semibold ring-1 ring-ink-900/5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-400/20 text-gold-600">
                  <Check className="size-4" aria-hidden />
                </span>
                {feature}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal stagger={0.15} className="relative space-y-4 self-center">
          {service.steps.map((step, index) => (
            <article key={step.title} className="flex gap-6 rounded-[1.75rem] bg-ink-950 p-7 text-white sm:p-9">
              <span className="font-display text-5xl leading-none text-transparent [-webkit-text-stroke:1px_var(--color-gold-300)]">
                0{index + 1}
              </span>
              <div>
                <h3 className="font-display text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{step.description}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
