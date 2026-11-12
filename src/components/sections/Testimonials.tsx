import { TestimonialMarquee } from "@/components/sections/TestimonialMarquee";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section id="testimonials" className="overflow-hidden py-24 sm:py-32">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title={
            <>
              Trusted by travellers <em>worldwide</em>
            </>
          }
          description="Real stories from clients who let us handle the details."
        />
      </Container>
      <Reveal className="mt-14">
        <TestimonialMarquee testimonials={testimonials} />
      </Reveal>
    </section>
  );
}
