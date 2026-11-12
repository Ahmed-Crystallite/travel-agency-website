import { Armchair, CalendarDays, PlaneLanding, PlaneTakeoff, Users } from "lucide-react";
import { getLocation, locations } from "@/data/locations";
import { countOptions, locationOptions, recordOptions } from "@/lib/search/options";
import { formatCurrency, formatDate, seededRandom } from "@/lib/utils";
import type { SearchConfig, SearchResult, SearchValues } from "@/types";

const airlines = [
  { code: "EK", name: "Emirates" },
  { code: "QR", name: "Qatar Airways" },
  { code: "TK", name: "Turkish Airlines" },
  { code: "EY", name: "Etihad Airways" },
  { code: "SQ", name: "Singapore Airlines" },
  { code: "PK", name: "PIA" },
];

const cabins = {
  economy: { label: "Economy", multiplier: 1 },
  premium: { label: "Premium Economy", multiplier: 1.7 },
  business: { label: "Business", multiplier: 3.4 },
  first: { label: "First", multiplier: 5.2 },
};

const EARTH_RADIUS_KM = 6371;
const CRUISE_KM_PER_MINUTE = 13.5;
const MINUTES_PER_DAY = 1440;

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

function distanceKm([lat1, lng1]: [number, number], [lat2, lng2]: [number, number]) {
  const a =
    Math.sin(toRadians(lat2 - lat1) / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(toRadians(lng2 - lng1) / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

const pad = (value: number) => String(value).padStart(2, "0");
const formatClock = (minutes: number) =>
  `${pad(Math.floor((minutes % MINUTES_PER_DAY) / 60))}:${pad(minutes % 60)}`;
const formatDuration = (minutes: number) => `${Math.floor(minutes / 60)}h ${pad(minutes % 60)}m`;

export function getRoute(from: string, to: string) {
  const origin = getLocation(from);
  const destination = getLocation(to);
  const distance = distanceKm(origin.coordinates, destination.coordinates);
  const duration = formatDuration(Math.round(distance / CRUISE_KM_PER_MINUTE + 45));
  return { origin, destination, distance: Math.round(distance), duration, carriers: airlines.length };
}

function searchFlights({ from, to, date, passengers, cabin }: SearchValues): SearchResult[] {
  const { origin, destination, distance } = getRoute(from, to);
  const random = seededRandom(`${from}:${to}:${date}`);
  const travellers = Number(passengers);
  const { label: cabinLabel, multiplier } = cabins[cabin as keyof typeof cabins];

  const flights = airlines.map((airline) => {
    const stops = distance > 5000 && random() > 0.45 ? 1 : 0;
    const duration = Math.round(distance / CRUISE_KM_PER_MINUTE + 30 + random() * 30 + stops * (80 + random() * 140));
    const departure = 300 + Math.floor(random() * 64) * 15;
    const fare = Math.round(
      (60 + distance * 0.07) * (0.85 + random() * 0.45) * multiplier * (stops ? 0.88 : 1),
    );
    return { airline, stops, duration, departure, fare, number: `${airline.code} ${100 + Math.floor(random() * 900)}` };
  });

  const fastest = Math.min(...flights.map((flight) => flight.duration));

  return flights
    .sort((a, b) => a.fare - b.fare)
    .map((flight, index) => {
      const arrival = flight.departure + flight.duration;
      return {
        id: flight.number,
        title: flight.airline.name,
        subtitle: `${formatClock(flight.departure)} ${origin.airport} → ${formatClock(arrival)} ${destination.airport}${arrival >= MINUTES_PER_DAY ? " +1" : ""}`,
        highlights: [formatDuration(flight.duration), flight.stops ? "1 stop" : "Non-stop", cabinLabel, flight.number],
        price: flight.fare * travellers,
        priceCaption: travellers > 1 ? `${formatCurrency(flight.fare)} × ${travellers} passengers` : "per passenger",
        badge: index === 0 ? "Best value" : flight.duration === fastest ? "Fastest" : undefined,
      };
    });
}

export const lowestFare = (from: string, to: string) =>
  Math.min(...searchFlights({ from, to, date: "", passengers: "1", cabin: "economy" }).map((flight) => flight.price));

const airportOptions = locationOptions(locations, true);

export const flightSearch: SearchConfig = {
  id: "flights",
  submitLabel: "Search flights",
  fields: [
    { name: "from", label: "From", type: "select", icon: PlaneTakeoff, options: airportOptions },
    { name: "to", label: "To", type: "select", icon: PlaneLanding, options: airportOptions },
    { name: "date", label: "Departure", type: "date", icon: CalendarDays },
    { name: "passengers", label: "Passengers", type: "select", icon: Users, options: countOptions(9, "Passenger") },
    { name: "cabin", label: "Cabin", type: "select", icon: Armchair, options: recordOptions(cabins) },
  ],
  defaults: { from: "lahore", to: "dubai", date: "", passengers: "1", cabin: "economy" },
  validate: ({ from, to }) => (from === to ? "Departure and arrival cities must be different." : null),
  describe: ({ from, to, date }) => `${getLocation(from).name} → ${getLocation(to).name} · ${formatDate(date)}`,
  search: searchFlights,
};
