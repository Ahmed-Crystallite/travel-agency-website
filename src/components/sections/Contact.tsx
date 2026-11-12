import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";

const { contact } = siteConfig;

const channels = [
  { icon: Phone, label: "Call us", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: MapPin, label: "Visit", value: contact.address },
  { icon: Clock, label: "Office hours", value: contact.hours },
];

export function Contact() {
  return (
    <section id="contact" className="bg-sand-100 py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Get in touch"
            title={
              <>
                Let&apos;s plan your next <em>escape</em>
              </>
            }
            description="Share a few details and a dedicated specialist will craft an itinerary around you — visas, flights, stays and transfers included."
          />
          <Reveal stagger={0.08} distance={24} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink-900 text-gold-300">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">{label}</span>
                    <span className="mt-0.5 block text-sm font-semibold text-ink-900">{value}</span>
                  </span>
                </>
              );
              const styles = "flex items-center gap-4 rounded-2xl bg-white/70 p-4 ring-1 ring-ink-900/5";

              return href ? (
                <a key={label} href={href} className={`${styles} transition-colors hover:bg-white`}>
                  {content}
                </a>
              ) : (
                <div key={label} className={styles}>
                  {content}
                </div>
              );
            })}
          </Reveal>
        </div>

        <Reveal distance={60}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
