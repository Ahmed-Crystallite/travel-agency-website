import { SearchPanel } from "@/components/search/SearchPanel";
import { SearchProvider } from "@/components/search/SearchProvider";
import { Contact } from "@/components/sections/Contact";
import { Destinations } from "@/components/sections/Destinations";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { VelocityMarquee } from "@/components/ui/VelocityMarquee";
import { services } from "@/data/services";

export default function Home() {
  return (
    <SearchProvider>
      <main>
        <Hero />
        <SearchPanel />
        <Services />
        <Process />
        <VelocityMarquee items={services.map((service) => service.title)} />
        <Stats />
        <Destinations />
        <Testimonials />
        <Contact />
      </main>
    </SearchProvider>
  );
}
