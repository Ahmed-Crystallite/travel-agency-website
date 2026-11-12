# Wanderlux — Travel Agency Website

A premium, fully responsive travel agency website built with **Next.js (App Router)**, **Tailwind CSS** and **GSAP**. It covers four services (Visa, Flights, Hotels and Car Rental) and each one has a working search form backed by mock data.

- **Live demo:** [travel-agency-website-ochre.vercel.app](https://travel-agency-website-ochre.vercel.app/)
- **Repository:** [github.com/Ahmed-Crystallite/travel-agency-website](https://github.com/Ahmed-Crystallite/travel-agency-website)

## Features

- **Search for all four services.** A tabbed search panel with validation (required fields, date order, same-city and own-country checks), a simulated API delay, loading states and animated result cards.
- **Mock data that behaves like real data.** Flight durations and fares come from real airport coordinates (haversine distance). Hotel and car prices scale with each city's cost index. A seeded random generator keeps results stable for the same query.
- **Animated flight routes.** Flight results open with a boarding-pass style route card. The arc draws itself (DrawSVG) and a plane flies along it, turning with the path (MotionPath). Distance and flight time come from the route data.
- **Static detail pages.** `/services/[slug]` and `/destinations/[slug]` are prerendered with `generateStaticParams`, and each has its own metadata. On each detail page the search opens with that service or city already selected. Destination pages show flight fares, stay prices and visa rules from the same search engine the homepage uses.
- **Shared-element page transitions.** React `<ViewTransition>` morphs the image on a service or destination card into the detail page hero.
- **Connected sections.** A service card links to its detail page and can also open its search tab directly.
- **Popular destinations** with region filters, plus "stays from" prices taken from the same hotel data.
- **Testimonials** in an infinite marquee that eases to a stop on hover.
- **Contact form** with field-level validation, accessible error messages and a success state.
- **GSAP animations:**
  - per-character hero headline and per-word section headings (SplitText with line masks)
  - hero intro timeline and scroll parallax
  - pinned horizontal "How it works" section with a scrubbed progress bar (desktop only)
  - marquee whose speed and direction follow scroll velocity
  - scroll-triggered reveals
  - animated stat counters
  - magnetic CTA button
  - timeline-based card hover effects
  - result and filter transitions
- **Accessibility and motion.** Semantic landmarks, ARIA tabs and keyboard-friendly controls. Every image has descriptive `alt` and `title` text from the data layer, and `prefers-reduced-motion` is fully supported.
- **Responsive** from 320px phones to wide desktops.

## Tech Stack

| Area      | Choice                                        |
| --------- | --------------------------------------------- |
| Framework | Next.js 16 (App Router, React 19, React Compiler) |
| Styling   | Tailwind CSS v4 with design tokens in `@theme` |
| Animation | GSAP 3 (ScrollTrigger, SplitText, DrawSVG, MotionPath) + `@gsap/react` |
| Routing   | App Router dynamic segments, SSG and React View Transitions |
| Icons     | lucide-react                                  |
| Fonts     | Fraunces (display) and Manrope (body) via `next/font` |
| Language  | TypeScript (strict)                           |

## Getting Started

**Prerequisites:** Node.js 20+ and [Bun](https://bun.sh) (npm, pnpm or yarn work as well).

```bash
git clone https://github.com/Ahmed-Crystallite/travel-agency-website.git
cd travel-agency-website
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command       | Description                     |
| ------------- | ------------------------------- |
| `bun dev`     | Start the development server    |
| `bun run build` | Create a production build     |
| `bun start`   | Serve the production build      |
| `bun run lint`  | Run ESLint                    |

## Project Structure

```
src/
├── app/                  # Root layout, home page, design tokens
│   ├── services/[slug]/  # Static service detail pages
│   └── destinations/[slug]/ # Static destination detail pages
├── components/
│   ├── layout/           # Header, Footer
│   ├── search/           # Search context, tabbed panel, fields, results
│   ├── sections/         # Hero, Services, Stats, Destinations, Testimonials, Contact
│   └── ui/               # Reusable primitives: Button, Container, Reveal, Counter, Magnetic…
├── data/                 # Static content: site config, services, locations, destinations (with image alt text)…
├── hooks/                # useHoverTimeline, useScrolled, useToday
├── lib/
│   ├── gsap.ts           # Single GSAP entry point (plugin registration, reduced-motion helper)
│   ├── search/           # One module per service plus a shared search runner
│   └── utils.ts          # Formatting, seeded random and class helpers
└── types/                # Shared domain types
```

## Architecture Notes

- **Config-driven search.** Each service exports one `SearchConfig` with its fields, defaults, validation, summary text and search function. The panel, field controls and result cards are generic. To add a new service, write one config module and register it in `lib/search/index.ts`. No UI changes are needed.
- **Server-first rendering.** Sections are Server Components by default. Only interactive parts (search, filters, marquee, animations) are Client Components. Every route is prerendered as static HTML.
- **Persistent shell.** The header and footer live in the root layout, so they stay mounted during client navigation while the page content cross-fades.
- **One source of truth.** Destinations, hotel prices, flight routes and visa countries all come from `data/locations.ts`, so the numbers always match across sections.
- **Animation hygiene.** Every animation runs inside `useGSAP` for automatic cleanup. Elements that animate on first paint start hidden with `motion-safe:invisible` to avoid a flash, and stay visible when the user prefers reduced motion.

## Deployment

1. Push the repository to GitHub.
2. Import the project on [Vercel](https://vercel.com/new). The framework preset is detected automatically.
3. Deploy. No environment variables are needed.

All images are stored locally in `public/images/`, grouped by feature (`brand`, `hero`, `services`, `destinations`, `hotels`, `cars`, `process`, `testimonials`), and served through `next/image`. Photography is from Unsplash.
