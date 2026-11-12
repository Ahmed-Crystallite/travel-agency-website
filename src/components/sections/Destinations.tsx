import type { DestinationItem } from "@/components/sections/DestinationCard";
import { DestinationGrid } from "@/components/sections/DestinationGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { destinations } from "@/data/destinations";
import { lowestNightlyRate } from "@/lib/search/hotels";
import type { Destination } from "@/types";

export const toDestinationItem = (destination: Destination): DestinationItem => ({
  ...destination,
  nightlyFrom: lowestNightlyRate(destination.location.id),
});

export function Destinations() {
  const items = destinations.map(toDestinationItem);

  return (
    <section id="destinations" className="bg-sand-100 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Popular destinations"
          title={
            <>
              Where our travellers are <em>heading</em> next
            </>
          }
          description="Hand-selected places our clients return to again and again. Tap a destination to explore stays, flights and visa details."
          className="mb-10"
        />
        <DestinationGrid destinations={items} />
      </Container>
    </section>
  );
}
