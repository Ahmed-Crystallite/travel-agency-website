import { CalendarCheck, CalendarX, MapPin, Users } from "lucide-react";
import { getLocation, travelLocations } from "@/data/locations";
import { countOptions, locationOptions } from "@/lib/search/options";
import { daysBetween, formatDate, pluralize, seededRandom } from "@/lib/utils";
import type { SearchConfig, SearchResult, SearchValues } from "@/types";

const hotelTemplates = [
  { name: "The Azure {city}", stars: 5, nightly: 280, image: "/images/hotels/the-azure.jpg", amenities: ["Infinity pool", "Spa", "Fine dining"] },
  { name: "Aurelia Resort {city}", stars: 5, nightly: 240, image: "/images/hotels/aurelia-resort.jpg", amenities: ["Private beach", "Spa", "Breakfast included"] },
  { name: "Maison Solenne", stars: 4, nightly: 160, image: "/images/hotels/maison-solenne.jpg", amenities: ["Boutique design", "Rooftop bar", "Free Wi-Fi"] },
  { name: "Villa Ardent", stars: 5, nightly: 340, image: "/images/hotels/villa-ardent.jpg", amenities: ["Private pool", "Butler service", "Airport transfer"] },
  { name: "The Linden {city}", stars: 4, nightly: 130, image: "/images/hotels/the-linden.jpg", amenities: ["City views", "Fitness centre", "Free Wi-Fi"] },
  { name: "Palm Court Hotel", stars: 4, nightly: 180, image: "/images/hotels/palm-court.jpg", amenities: ["Outdoor pool", "Breakfast included", "Lounge bar"] },
  { name: "Harbour House", stars: 3, nightly: 90, image: "/images/hotels/harbour-house.jpg", amenities: ["Central location", "Free Wi-Fi", "24h reception"] },
  { name: "Lagoon Lodge", stars: 4, nightly: 200, image: "/images/services/hotels.jpg", amenities: ["Lagoon views", "Spa", "Kids club"] },
];

const HOTELS_PER_CITY = 5;
const GUESTS_PER_ROOM = 2;

export function getHotels(locationId: string) {
  const location = getLocation(locationId);
  const random = seededRandom(locationId);

  return hotelTemplates
    .map((template, index) => ({ template, index, order: random() }))
    .sort((a, b) => a.order - b.order)
    .slice(0, HOTELS_PER_CITY)
    .map(({ template, index }) => ({
      id: `${locationId}-${index}`,
      name: template.name.replace("{city}", location.name),
      stars: template.stars,
      amenities: template.amenities,
      image: template.image,
      rating: Math.round((4.2 + random() * 0.75) * 10) / 10,
      nightly: Math.round(template.nightly * location.costIndex * (0.9 + random() * 0.25)),
      location,
    }));
}

export const lowestNightlyRate = (locationId: string) =>
  Math.min(...getHotels(locationId).map((hotel) => hotel.nightly));

function searchHotels({ destination, checkIn, checkOut, guests }: SearchValues): SearchResult[] {
  const nights = daysBetween(checkIn, checkOut);
  const rooms = Math.ceil(Number(guests) / GUESTS_PER_ROOM);
  const hotels = getHotels(destination).sort((a, b) => b.rating - a.rating);

  return hotels.map((hotel, index) => ({
    id: hotel.id,
    title: hotel.name,
    subtitle: `${hotel.location.name}, ${hotel.location.country}`,
    highlights: [`${hotel.stars}-star`, ...hotel.amenities],
    price: hotel.nightly * nights * rooms,
    priceCaption: `${pluralize(nights, "night")} · ${pluralize(rooms, "room")}`,
    image: { src: hotel.image, alt: `${hotel.name}, ${hotel.location.name}` },
    rating: hotel.rating,
    badge: index === 0 ? "Guest favourite" : undefined,
  }));
}

export const hotelSearch: SearchConfig = {
  id: "hotels",
  submitLabel: "Search hotels",
  fields: [
    { name: "destination", label: "Destination", type: "select", icon: MapPin, options: locationOptions(travelLocations) },
    { name: "checkIn", label: "Check-in", type: "date", icon: CalendarCheck },
    { name: "checkOut", label: "Check-out", type: "date", icon: CalendarX, after: "checkIn" },
    { name: "guests", label: "Guests", type: "select", icon: Users, options: countOptions(8, "Guest") },
  ],
  defaults: { destination: "dubai", checkIn: "", checkOut: "", guests: "2" },
  describe: ({ destination, checkIn, checkOut }) =>
    `${getLocation(destination).name} · ${formatDate(checkIn)} – ${formatDate(checkOut)}`,
  search: searchHotels,
};
