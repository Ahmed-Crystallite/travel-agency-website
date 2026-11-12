import type { Location } from "@/types";

export const locations: Location[] = [
  { id: "karachi", name: "Karachi", country: "Pakistan", countryCode: "PK", region: "Asia", airport: "KHI", coordinates: [24.906, 67.161], costIndex: 0.6, home: true },
  { id: "lahore", name: "Lahore", country: "Pakistan", countryCode: "PK", region: "Asia", airport: "LHE", coordinates: [31.521, 74.403], costIndex: 0.6, home: true },
  { id: "islamabad", name: "Islamabad", country: "Pakistan", countryCode: "PK", region: "Asia", airport: "ISB", coordinates: [33.549, 72.825], costIndex: 0.65, home: true },
  { id: "dubai", name: "Dubai", country: "United Arab Emirates", countryCode: "AE", region: "Middle East", airport: "DXB", coordinates: [25.253, 55.365], costIndex: 1.25 },
  { id: "istanbul", name: "Istanbul", country: "Türkiye", countryCode: "TR", region: "Europe", airport: "IST", coordinates: [41.275, 28.752], costIndex: 0.9 },
  { id: "paris", name: "Paris", country: "France", countryCode: "FR", region: "Europe", airport: "CDG", coordinates: [49.009, 2.548], costIndex: 1.4 },
  { id: "london", name: "London", country: "United Kingdom", countryCode: "GB", region: "Europe", airport: "LHR", coordinates: [51.47, -0.454], costIndex: 1.5 },
  { id: "santorini", name: "Santorini", country: "Greece", countryCode: "GR", region: "Europe", airport: "JTR", coordinates: [36.399, 25.479], costIndex: 1.3 },
  { id: "cairo", name: "Cairo", country: "Egypt", countryCode: "EG", region: "Africa", airport: "CAI", coordinates: [30.122, 31.405], costIndex: 0.7 },
  { id: "bali", name: "Bali", country: "Indonesia", countryCode: "ID", region: "Asia", airport: "DPS", coordinates: [-8.748, 115.167], costIndex: 0.8 },
  { id: "maldives", name: "Maldives", country: "Maldives", countryCode: "MV", region: "Asia", airport: "MLE", coordinates: [4.191, 73.529], costIndex: 1.6 },
  { id: "tokyo", name: "Tokyo", country: "Japan", countryCode: "JP", region: "Asia", airport: "HND", coordinates: [35.549, 139.78], costIndex: 1.35 },
  { id: "new-york", name: "New York", country: "United States", countryCode: "US", region: "Americas", airport: "JFK", coordinates: [40.641, -73.778], costIndex: 1.55 },
];

export const travelLocations = locations.filter((location) => !location.home);

export function getLocation(id: string) {
  const location = locations.find((item) => item.id === id);
  if (!location) throw new Error(`Unknown location: ${id}`);
  return location;
}
