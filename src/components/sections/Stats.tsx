import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/data/stats";

export function Stats() {
  return (
    <section aria-label="Our numbers" className="bg-ink-950 py-20 text-white sm:py-24">
      <Container>
        <Reveal className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l border-white/10 pl-5 sm:pl-8">
              <p className="font-display text-4xl text-gold-300 sm:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-sm text-ink-300 sm:text-base">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
