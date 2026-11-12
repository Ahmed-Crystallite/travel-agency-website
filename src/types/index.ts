import type { LucideIcon } from "lucide-react";

export interface Photo {
  src: string;
  alt: string;
}

export type ServiceId = "visa" | "flights" | "hotels" | "cars";

export type Region = "Europe" | "Asia" | "Middle East" | "Africa" | "Americas";

export interface Location {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  region: Region;
  airport: string;
  coordinates: [latitude: number, longitude: number];
  costIndex: number;
  home?: boolean;
}

export interface Service {
  id: ServiceId;
  label: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  image: Photo;
  icon: LucideIcon;
  overview: string;
  steps: Step[];
}

export interface Step {
  title: string;
  description: string;
}

export interface ProcessStep extends Step {
  image: Photo;
  icon: LucideIcon;
}

export interface Destination {
  location: Location;
  image: Photo;
  tagline: string;
  rating: number;
  overview: string;
  bestTime: string;
  highlights: string[];
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  avatar: string;
  rating: number;
  service: ServiceId;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface SearchField {
  name: string;
  label: string;
  type: "select" | "date";
  icon: LucideIcon;
  options?: Option[];
  after?: string;
}

export type SearchValues = Record<string, string>;

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  highlights: string[];
  price: number;
  priceCaption: string;
  image?: Photo;
  badge?: string;
  rating?: number;
}

export interface SearchConfig {
  id: ServiceId;
  submitLabel: string;
  fields: SearchField[];
  defaults: SearchValues;
  validate?: (values: SearchValues) => string | null;
  describe: (values: SearchValues) => string;
  search: (values: SearchValues) => SearchResult[];
}
