import { CalendarCheck, CalendarX, CarFront, MapPin } from "lucide-react";
import { getLocation, travelLocations } from "@/data/locations";
import { locationOptions, recordOptions } from "@/lib/search/options";
import { daysBetween, formatCurrency, formatDate, pluralize } from "@/lib/utils";
import type { SearchConfig, SearchResult, SearchValues } from "@/types";

const categories = {
  all: { label: "Any vehicle" },
  economy: { label: "Economy" },
  suv: { label: "SUV" },
  premium: { label: "Premium" },
  sports: { label: "Sports" },
  luxury: { label: "Luxury" },
};

type Category = Exclude<keyof typeof categories, "all">;

const fleet: Array<{ model: string; category: Category; seats: number; transmission: string; fuel: string; daily: number; image: string }> = [
  { model: "Fiat 500", category: "economy", seats: 4, transmission: "Manual", fuel: "Petrol", daily: 35, image: "/images/cars/fiat-500.jpg" },
  { model: "Nissan Juke", category: "suv", seats: 5, transmission: "Automatic", fuel: "Hybrid", daily: 55, image: "/images/cars/nissan-juke.jpg" },
  { model: "Tesla Model 3", category: "premium", seats: 5, transmission: "Automatic", fuel: "Electric", daily: 85, image: "/images/cars/tesla-model-3.jpg" },
  { model: "BMW M5", category: "premium", seats: 5, transmission: "Automatic", fuel: "Petrol", daily: 120, image: "/images/cars/bmw-m5.jpg" },
  { model: "Chevrolet Camaro", category: "sports", seats: 4, transmission: "Automatic", fuel: "Petrol", daily: 125, image: "/images/cars/chevrolet-camaro.jpg" },
  { model: "Ford Mustang GT", category: "sports", seats: 4, transmission: "Automatic", fuel: "Petrol", daily: 130, image: "/images/cars/ford-mustang-gt.jpg" },
  { model: "BMW M4 Coupé", category: "sports", seats: 4, transmission: "Automatic", fuel: "Petrol", daily: 150, image: "/images/cars/bmw-m4.jpg" },
  { model: "Porsche Panamera", category: "luxury", seats: 4, transmission: "Automatic", fuel: "Hybrid", daily: 260, image: "/images/cars/porsche-panamera.jpg" },
  { model: "Ferrari 488 GTB", category: "luxury", seats: 2, transmission: "Automatic", fuel: "Petrol", daily: 650, image: "/images/cars/ferrari-488.jpg" },
];

function searchCars({ location, pickup, dropoff, category }: SearchValues): SearchResult[] {
  const city = getLocation(location);
  const days = daysBetween(pickup, dropoff);
  const matches = fleet.filter((car) => category === "all" || car.category === category);

  return matches
    .map((car) => ({ car, daily: Math.round(car.daily * (0.8 + city.costIndex * 0.2)) }))
    .sort((a, b) => a.daily - b.daily)
    .map(({ car, daily }, index) => ({
      id: car.model,
      title: car.model,
      subtitle: `${categories[car.category].label} · Pick-up in ${city.name}`,
      highlights: [`${car.seats} seats`, car.transmission, car.fuel, "Free cancellation"],
      price: daily * days,
      priceCaption: `${formatCurrency(daily)}/day · ${pluralize(days, "day")}`,
      image: { src: car.image, alt: `${car.model} rental car` },
      badge: index === 0 ? "Best value" : undefined,
    }));
}

export const carSearch: SearchConfig = {
  id: "cars",
  submitLabel: "Search cars",
  fields: [
    { name: "location", label: "Pick-up location", type: "select", icon: MapPin, options: locationOptions(travelLocations) },
    { name: "pickup", label: "Pick-up date", type: "date", icon: CalendarCheck },
    { name: "dropoff", label: "Return date", type: "date", icon: CalendarX, after: "pickup" },
    { name: "category", label: "Vehicle type", type: "select", icon: CarFront, options: recordOptions(categories) },
  ],
  defaults: { location: "dubai", pickup: "", dropoff: "", category: "all" },
  describe: ({ location, pickup, dropoff }) =>
    `${getLocation(location).name} · ${formatDate(pickup)} – ${formatDate(dropoff)}`,
  search: searchCars,
};
