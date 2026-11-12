import { Briefcase, Flag, IdCard, Users } from "lucide-react";
import { travelLocations } from "@/data/locations";
import { countOptions, recordOptions } from "@/lib/search/options";
import { formatCurrency, pluralize } from "@/lib/utils";
import type { SearchConfig, SearchResult, SearchValues } from "@/types";

const nationalities = {
  PK: { label: "Pakistan" },
  IN: { label: "India" },
  BD: { label: "Bangladesh" },
  AE: { label: "United Arab Emirates" },
  SA: { label: "Saudi Arabia" },
  GB: { label: "United Kingdom" },
  US: { label: "United States" },
  CA: { label: "Canada" },
};

const visaTypes = {
  tourist: { label: "Tourist", multiplier: 1 },
  business: { label: "Business", multiplier: 1.5 },
  transit: { label: "Transit", multiplier: 0.6 },
};

const embassyRules: Record<string, { processingDays: number; fee: number; stay: number; eVisa: boolean }> = {
  AE: { processingDays: 4, fee: 95, stay: 30, eVisa: true },
  TR: { processingDays: 3, fee: 60, stay: 90, eVisa: true },
  FR: { processingDays: 15, fee: 90, stay: 90, eVisa: false },
  GB: { processingDays: 21, fee: 140, stay: 180, eVisa: false },
  GR: { processingDays: 15, fee: 90, stay: 90, eVisa: false },
  EG: { processingDays: 5, fee: 30, stay: 30, eVisa: true },
  ID: { processingDays: 3, fee: 50, stay: 30, eVisa: true },
  MV: { processingDays: 2, fee: 20, stay: 30, eVisa: true },
  JP: { processingDays: 7, fee: 40, stay: 90, eVisa: false },
  US: { processingDays: 30, fee: 185, stay: 180, eVisa: false },
};

export const getVisaRule = (countryCode: string) => embassyRules[countryCode];

const tiers = [
  { name: "Standard", serviceFee: 25, speed: 1, perk: "Document checklist" },
  { name: "Express", serviceFee: 65, speed: 0.5, perk: "Priority appointment" },
  { name: "Concierge", serviceFee: 140, speed: 0.35, perk: "Doorstep document pickup" },
];

const countries = Object.fromEntries(
  travelLocations.map((location) => [location.countryCode, { label: location.country }]),
);

function searchVisa({ nationality, destination, type, travelers }: SearchValues): SearchResult[] {
  const rule = embassyRules[destination];
  const visaType = visaTypes[type as keyof typeof visaTypes];
  const applicants = Number(travelers);
  const country = countries[destination].label;

  return tiers.map((tier, index) => {
    const fee = Math.round(rule.fee * visaType.multiplier + tier.serviceFee);
    return {
      id: `${destination}-${type}-${tier.name}`,
      title: `${tier.name} ${visaType.label} Visa`,
      subtitle: `${country} · for ${nationalities[nationality as keyof typeof nationalities].label} passport holders`,
      highlights: [
        `${Math.max(1, Math.round(rule.processingDays * tier.speed))} working days`,
        `Up to ${rule.stay}-day stay`,
        rule.eVisa ? "eVisa" : "Embassy appointment",
        tier.perk,
      ],
      price: fee * applicants,
      priceCaption: applicants > 1 ? `${formatCurrency(fee)} × ${pluralize(applicants, "applicant")}` : "per applicant",
      badge: index === 1 ? "Most popular" : undefined,
    };
  });
}

export const visaSearch: SearchConfig = {
  id: "visa",
  submitLabel: "Check visa",
  fields: [
    { name: "nationality", label: "Nationality", type: "select", icon: IdCard, options: recordOptions(nationalities) },
    { name: "destination", label: "Travelling to", type: "select", icon: Flag, options: recordOptions(countries) },
    { name: "type", label: "Visa type", type: "select", icon: Briefcase, options: recordOptions(visaTypes) },
    { name: "travelers", label: "Applicants", type: "select", icon: Users, options: countOptions(6, "Applicant") },
  ],
  defaults: { nationality: "PK", destination: "AE", type: "tourist", travelers: "1" },
  validate: ({ nationality, destination }) =>
    nationality === destination ? "No visa is required to visit your own country." : null,
  describe: ({ destination, type }) =>
    `${countries[destination].label} · ${visaTypes[type as keyof typeof visaTypes].label} visa`,
  search: searchVisa,
};
