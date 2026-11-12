import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SearchPanel } from "@/components/search/SearchPanel";
import { SearchProvider } from "@/components/search/SearchProvider";
import { Contact } from "@/components/sections/Contact";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { ServiceOverview } from "@/components/sections/ServiceOverview";
import { findService, services } from "@/data/services";

export const dynamicParams = false;

export const generateStaticParams = () => services.map((service) => ({ slug: service.id }));

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = findService((await params).slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    openGraph: { title: service.title, description: service.description, images: [service.image.src] },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = findService((await params).slug);
  if (!service) notFound();

  return (
    <SearchProvider initialService={service.id}>
      <main>
        <PageHero
          eyebrow="Our services"
          title={service.title}
          description={service.overview}
          image={service.image}
          transitionName={`service-${service.id}`}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/#services" },
          ]}
        />
        <SearchPanel />
        <ServiceOverview service={service} />
        <RelatedServices current={service.id} />
        <Contact />
      </main>
    </SearchProvider>
  );
}
