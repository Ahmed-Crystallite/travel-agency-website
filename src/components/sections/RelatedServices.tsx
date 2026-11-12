import { ServiceCard } from "@/components/sections/ServiceCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import type { ServiceId } from "@/types";

export function RelatedServices({ current }: { current: ServiceId }) {
  return (
    <section className="bg-ink-950 py-24 sm:py-32">
      <Container>
        <SectionHeading
          tone="light"
          eyebrow="Complete your trip"
          title={
            <>
              Everything else, <em>in one place</em>
            </>
          }
        />
        <Reveal className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, ...service }, index) =>
            service.id === current ? null : (
              <ServiceCard key={service.id} service={service} index={index} icon={<Icon className="size-5" aria-hidden />} />
            ),
          )}
        </Reveal>
      </Container>
    </section>
  );
}
