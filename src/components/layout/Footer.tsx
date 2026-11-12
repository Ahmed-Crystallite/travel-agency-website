import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { services } from "@/data/services";
import { navLinks, siteConfig } from "@/data/site";

const { contact } = siteConfig;

const columns = [
  { title: "Services", links: services.map((service) => ({ label: service.title, href: `/services/${service.id}` })) },
  { title: "Explore", links: navLinks },
  {
    title: "Contact",
    links: [
      { label: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
      { label: contact.email, href: `mailto:${contact.email}` },
      { label: contact.address, href: "#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink-950 text-white">
      <Container className="grid gap-12 py-20 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-ink-300">{siteConfig.description}</p>
          <ul className="mt-7 flex gap-2">
            {siteConfig.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 text-ink-300 transition-colors hover:border-gold-400 hover:text-gold-300"
                >
                  <SocialIcon name={social.icon} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">{column.title}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-ink-300 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.tagline}.</p>
        </Container>
      </div>
    </footer>
  );
}
