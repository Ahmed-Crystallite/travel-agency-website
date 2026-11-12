import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SearchPanel } from "@/components/search/SearchPanel";
import { SearchProvider } from "@/components/search/SearchProvider";
import { Contact } from "@/components/sections/Contact";
import { DestinationCard } from "@/components/sections/DestinationCard";
import { DestinationOverview } from "@/components/sections/DestinationOverview";
import { toDestinationItem } from "@/components/sections/Destinations";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { destinations, findDestination } from "@/data/destinations";

const RELATED_COUNT = 4;

export const dynamicParams = false;

export const generateStaticParams = () => destinations.map(({ location }) => ({ slug: location.id }));

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const destination = findDestination((await params).slug);
  if (!destination) return {};

  const title = `${destination.location.name}, ${destination.location.country}`;
  return {
    title,
    description: destination.overview,
    openGraph: { title, description: destination.overview, images: [destination.image.src] },
  };
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const destination = findDestination((await params).slug);
  if (!destination) notFound();

  const { location } = destination;
  const related = destinations.filter((item) => item.location.id !== location.id).slice(0, RELATED_COUNT);

  return (
    <SearchProvider initialService="hotels" preset={{ destination: location.id }}>
      <main>
        <PageHero
          eyebrow={location.country}
          title={location.name}
          description={destination.overview}
          image={destination.image}
          transitionName={`destination-${location.id}`}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Destinations", href: "/#destinations" },
          ]}
          facts={[
            { label: "Region", value: location.region },
            { label: "Traveller rating", value: `${destination.rating.toFixed(1)} / 5` },
            { label: "Best time", value: destination.bestTime },
          ]}
        />
        <SearchPanel />
        <DestinationOverview destination={destination} />
        <section className="bg-ink-950 py-24 sm:py-32">
          <Container>
            <SectionHeading
              tone="light"
              eyebrow="Keep exploring"
              title={
                <>
                  More places worth the <em>journey</em>
                </>
              }
            />
            <Reveal className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <DestinationCard key={item.location.id} destination={toDestinationItem(item)} />
              ))}
            </Reveal>
          </Container>
        </section>
        <Contact />
      </main>
    </SearchProvider>
  );
}
