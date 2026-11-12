import { getLocation } from "@/data/locations";
import type { Destination } from "@/types";

export const destinations: Destination[] = [
  {
    location: getLocation("santorini"),
    image: { src: "/images/destinations/santorini.jpg", alt: "Whitewashed cliffside houses of Santorini at dusk" },
    tagline: "Sunsets over whitewashed cliffs",
    rating: 4.9,
    overview:
      "Cliff-top villages, volcanic beaches and caldera views that turn gold at dusk. Santorini is the Aegean at its most cinematic — best enjoyed from a private plunge pool in Oia.",
    bestTime: "April – October",
    highlights: ["Sunset in Oia", "Caldera catamaran cruise", "Wine tasting in Pyrgos", "Red Beach & Akrotiri"],
  },
  {
    location: getLocation("bali"),
    image: { src: "/images/destinations/bali.jpg", alt: "Ulun Danu Beratan temple on the shore of Lake Bratan, Bali" },
    tagline: "Temples, rice terraces and surf",
    rating: 4.8,
    overview:
      "Emerald rice terraces, cliff temples and a wellness culture unlike anywhere else. Split your days between Ubud's jungle retreats and the beach clubs of Uluwatu.",
    bestTime: "April – October",
    highlights: ["Tegallalang rice terraces", "Uluwatu temple at dusk", "Ubud wellness retreats", "Nusa Penida day trip"],
  },
  {
    location: getLocation("dubai"),
    image: { src: "/images/destinations/dubai.jpg", alt: "Dubai skyline and Burj Khalifa at sunset" },
    tagline: "Skyline luxury meets desert calm",
    rating: 4.8,
    overview:
      "Record-breaking architecture, world-class dining and golden dunes less than an hour from downtown. Dubai is effortless for families, shoppers and first-time long-haul travellers.",
    bestTime: "November – March",
    highlights: ["Burj Khalifa at sunset", "Desert safari & dinner", "Old Dubai souks", "Palm Jumeirah beach clubs"],
  },
  {
    location: getLocation("paris"),
    image: { src: "/images/destinations/paris.jpg", alt: "Eiffel Tower above the Seine at twilight" },
    tagline: "Boulevards, bistros and the Seine",
    rating: 4.7,
    overview:
      "Museums that define art history, cafés that define a lifestyle and neighbourhoods made for wandering. Paris rewards slow mornings and late dinners.",
    bestTime: "April – June, September – October",
    highlights: ["Louvre & Musée d'Orsay", "Seine dinner cruise", "Le Marais food walk", "Day trip to Versailles"],
  },
  {
    location: getLocation("maldives"),
    image: { src: "/images/destinations/maldives.jpg", alt: "Turquoise lagoon and white sand beach in the Maldives" },
    tagline: "Overwater villas on turquoise lagoons",
    rating: 5.0,
    overview:
      "A thousand coral islands, overwater villas and reefs you can snorkel straight from your deck. The Maldives is the definitive honeymoon and digital-detox escape.",
    bestTime: "November – April",
    highlights: ["Overwater villa stay", "Manta ray snorkelling", "Sandbank picnic", "Underwater dining"],
  },
  {
    location: getLocation("tokyo"),
    image: { src: "/images/destinations/tokyo.jpg", alt: "Neon-lit shopping street in Tokyo" },
    tagline: "Neon nights and ancient shrines",
    rating: 4.9,
    overview:
      "A megacity of quiet shrines and neon alleys, where the world's best sushi counter can sit beneath a train line. Tokyo is precise, safe and endlessly surprising.",
    bestTime: "March – May, October – November",
    highlights: ["Shibuya & Shinjuku nights", "Senso-ji temple", "Tsukiji food tour", "Day trip to Mount Fuji"],
  },
  {
    location: getLocation("london"),
    image: { src: "/images/destinations/london.jpg", alt: "Aerial view of London and the River Thames" },
    tagline: "Royal heritage and riverside culture",
    rating: 4.7,
    overview:
      "Royal palaces, free world-class museums and a theatre scene that rivals Broadway. London balances centuries of history with one of Europe's best food cities.",
    bestTime: "May – September",
    highlights: ["West End show", "Tower of London", "Borough Market", "Thames sunset walk"],
  },
  {
    location: getLocation("new-york"),
    image: { src: "/images/destinations/new-york.jpg", alt: "Billboards and crowds in Times Square, New York" },
    tagline: "The city that never sleeps",
    rating: 4.8,
    overview:
      "Skyline views, Broadway lights and a neighbourhood for every mood. New York packs more culture, food and energy into a single block than most cities manage in a district.",
    bestTime: "April – June, September – November",
    highlights: ["Top of the Rock at sunset", "Central Park by bike", "Broadway show", "Brooklyn food crawl"],
  },
];

export const findDestination = (slug: string) =>
  destinations.find((destination) => destination.location.id === slug);
