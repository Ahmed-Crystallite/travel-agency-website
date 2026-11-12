import type { NavLink } from "@/types";

export const siteConfig = {
  name: "Wanderlux",
  wordmark: { base: "Wander", accent: "lux" },
  tagline: "Journeys, thoughtfully arranged",
  homeLocation: "lahore",
  description:
    "Wanderlux is a full-service travel agency for visas, flights, hotels and car rentals — curated by specialists, handled end to end.",
  contact: {
    phone: "+92 42 3577 8800",
    email: "hello@wanderlux.travel",
    address: "Office 14, MM Alam Road, Gulberg III, Lahore",
    hours: "Mon – Sat, 9:00 – 19:00",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "X", href: "https://x.com", icon: "x" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  ],
} as const;

export const navLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact", href: "#contact" },
];
