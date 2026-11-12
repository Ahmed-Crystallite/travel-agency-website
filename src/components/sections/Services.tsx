import { ServiceCard } from "@/components/sections/ServiceCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Four services, <em>one</em> seamless journey
            </>
          }
          description="Whether it is a weekend escape or a multi-city expedition, our specialists take care of every booking so you only have to pack."
        />
        <Reveal className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map(({ icon: Icon, ...service }, index) => (
            <ServiceCard key={service.id} service={service} index={index} icon={<Icon className="size-5" aria-hidden />} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
