import { FileCheck2, MessagesSquare, PlaneTakeoff, Sparkles } from "lucide-react";
import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    title: "Share your plan",
    description: "Tell us where, when and who is travelling. A dedicated specialist builds your first itinerary within 24 hours.",
    image: { src: "/images/services/visa.jpg", alt: "Travel map, notebook and camera laid out for trip planning" },
    icon: MessagesSquare,
  },
  {
    title: "Visa & documents",
    description: "We audit your paperwork, book embassy appointments and track the application until your passport is back.",
    image: { src: "/images/process/airport-lounge.jpg", alt: "Traveller relaxing in an airport lounge as a plane takes off" },
    icon: FileCheck2,
  },
  {
    title: "Flights & stays",
    description: "Fares, cabins, hotels and transfers are confirmed in one booking — with a single contact for every change.",
    image: { src: "/images/services/flights.jpg", alt: "Aircraft wing above the clouds at sunset" },
    icon: PlaneTakeoff,
  },
  {
    title: "Travel, supported",
    description: "Land to a car at arrivals and a team on call 24/7. You enjoy the journey — we handle everything around it.",
    image: { src: "/images/process/traveller-lake.jpg", alt: "Backpacker looking out over a mountain lake" },
    icon: Sparkles,
  },
];
