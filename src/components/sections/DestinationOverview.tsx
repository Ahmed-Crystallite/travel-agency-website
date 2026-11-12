import { BedDouble, CalendarDays, FileCheck2, Plane } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLocation } from "@/data/locations";
import { siteConfig } from "@/data/site";
import { getRoute, lowestFare } from "@/lib/search/flights";
import { lowestNightlyRate } from "@/lib/search/hotels";
import { getVisaRule } from "@/lib/search/visa";
import { formatCurrency, pluralize } from "@/lib/utils";
import type { Destination } from "@/types";

export function DestinationOverview({ destination }: { destination: Destination }) {
  const { location, highlights, bestTime } = destination;
  const home = getLocation(siteConfig.homeLocation);
  const route = getRoute(home.id, location.id);
  const visa = getVisaRule(location.countryCode);

  const facts = [
    {
      icon: Plane,
      label: `Flights from ${home.name}`,
      value: `From ${formatCurrency(lowestFare(home.id, location.id))}`,
      detail: `≈ ${route.duration} · ${route.origin.airport} → ${route.destination.airport}`,
    },
    {
      icon: BedDouble,
      label: "Hand-picked stays",
      value: `From ${formatCurrency(lowestNightlyRate(location.id))}`,
      detail: "per night, taxes included",
    },
    {
      icon: FileCheck2,
      label: `Visa for ${home.country} passports`,
      value: visa.eVisa ? "eVisa" : "Embassy visa",
      detail: `${pluralize(visa.processingDays, "working day")} · up to ${visa.stay}-day stay`,
    },
    { icon: CalendarDays, label: "Best time to visit", value: bestTime, detail: "Peak weather and festivals" },
  ];

  return (
    <section className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Signature experiences"
            title={
              <>
                The best of {location.name}, <em>curated</em>
              </>
            }
            description="Moments our specialists build every itinerary around — bookable as private or small-group experiences."
          />
          <Reveal stagger={0.08} distance={24} className="mt-10 divide-y divide-ink-900/10 border-y border-ink-900/10">
            {highlights.map((highlight, index) => (
              <p key={highlight} className="flex items-baseline gap-6 py-5">
                <span className="font-display text-sm text-gold-600">0{index + 1}</span>
                <span className="font-display text-2xl text-ink-900">{highlight}</span>
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal stagger={0.1} className="grid content-start gap-4 sm:grid-cols-2">
          {facts.map(({ icon: Icon, label, value, detail }) => (
            <article key={label} className="flex flex-col rounded-[1.75rem] bg-white p-7 ring-1 ring-ink-900/5">
              <span className="flex size-11 items-center justify-center rounded-full bg-ink-900 text-gold-300">
                <Icon className="size-5" aria-hidden />
              </span>
              <p className="mt-8 text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">{label}</p>
              <p className="mt-2 font-display text-2xl text-ink-900">{value}</p>
              <p className="mt-1 text-sm text-ink-500">{detail}</p>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
