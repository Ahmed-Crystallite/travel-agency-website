import { BedDouble, CarFront, FileCheck2, Plane } from "lucide-react";
import type { Service, ServiceId } from "@/types";

export const services: Service[] = [
  {
    id: "visa",
    label: "Visa",
    title: "Visa Services",
    description:
      "End-to-end visa assistance with document checks, embassy appointments and live status updates.",
    features: ["Tourist, business & transit visas", "Specialist document review", "Express processing available"],
    cta: "Check visa options",
    image: { src: "/images/services/visa.jpg", alt: "Travel map with a notebook, camera and backpack laid out for trip planning" },
    icon: FileCheck2,
    overview:
      "Visa applications fail on details. Our specialists audit every document, book your embassy slot and track the file until the passport is back in your hands — for tourist, business and transit visas across 120+ countries.",
    steps: [
      { title: "Eligibility check", description: "We confirm the right visa category and list every document your profile needs." },
      { title: "File preparation", description: "Forms, cover letters, itineraries and insurance are prepared and reviewed twice." },
      { title: "Submission & tracking", description: "We book the appointment, submit the file and send you live status updates." },
    ],
  },
  {
    id: "flights",
    label: "Flights",
    title: "Flight Booking",
    description:
      "Compare fares across leading airlines and secure the best routes, cabins and connections.",
    features: ["Economy to first class", "Flexible date changes", "24/7 rebooking support"],
    cta: "Find flights",
    image: { src: "/images/services/flights.jpg", alt: "Aircraft wing above the clouds at sunset" },
    icon: Plane,
    overview:
      "We compare fares across full-service and partner airlines to find the route that balances price, comfort and connection time — and we stay on call if plans change mid-journey.",
    steps: [
      { title: "Route planning", description: "Tell us where and when — we shortlist the smartest routes and cabins." },
      { title: "Fare lock", description: "Hold the best fare while you decide, with transparent baggage and change rules." },
      { title: "In-trip support", description: "Delays and missed connections are rebooked by our team around the clock." },
    ],
  },
  {
    id: "hotels",
    label: "Hotels",
    title: "Hotel Booking",
    description:
      "Handpicked stays from boutique hideaways to five-star resorts, verified by our travel curators.",
    features: ["Curated luxury collection", "Member-only rates", "Free cancellation options"],
    cta: "Browse hotels",
    image: { src: "/images/services/hotels.jpg", alt: "Resort pool deck with sun loungers beside a thatched villa" },
    icon: BedDouble,
    overview:
      "Every property in our collection is inspected or verified by our curators. You get member-only rates, room upgrades where possible and a single contact for every request during your stay.",
    steps: [
      { title: "Curated shortlist", description: "Three to five stays matched to your budget, style and travel party." },
      { title: "Best-rate booking", description: "Member rates, breakfast and flexible cancellation negotiated on your behalf." },
      { title: "Stay concierge", description: "Early check-in, transfers and special occasions arranged before you arrive." },
    ],
  },
  {
    id: "cars",
    label: "Car Rental",
    title: "Car Rental",
    description:
      "Premium vehicles delivered to the airport or your hotel, with transparent pricing and full cover.",
    features: ["Economy to exotic fleet", "Airport & hotel delivery", "Comprehensive insurance"],
    cta: "Rent a car",
    image: { src: "/images/services/cars.jpg", alt: "Driver's hands on a steering wheel at dusk" },
    icon: CarFront,
    overview:
      "From compact city cars to grand tourers, every rental includes comprehensive insurance, clear mileage terms and delivery to wherever you land — no queues at the rental desk.",
    steps: [
      { title: "Pick your vehicle", description: "Choose a category and we confirm the exact model available for your dates." },
      { title: "Door-to-door delivery", description: "The car meets you at arrivals or your hotel, fuelled and inspected." },
      { title: "Drive covered", description: "Full insurance and 24/7 roadside assistance for the length of your trip." },
    ],
  },
];

export const findService = (slug: string) => services.find((service) => service.id === slug);

export const getService = (id: ServiceId) => findService(id)!;
