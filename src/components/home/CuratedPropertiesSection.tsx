import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PropertyCard, type PropertyCardData } from "@/components/properties/PropertyCard";

// Presentational showcase properties representing flagship architectural types
const FEATURED_PROPERTIES: PropertyCardData[] = [
  {
    title: "The Kayuputih Residence",
    slug: "the-kayuputih-residence-menteng",
    status: "dijual",
    type: "Rumah Tapak",
    priceFormatted: "Rp 38,5 Miliar",
    area: "Menteng",
    city: "Jakarta Pusat",
    specs: {
      landArea: 620,
      buildingArea: 780,
      bedrooms: 5,
      bathrooms: 6,
    },
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "The Kayuputih Residence Menteng - Fasad Utama",
  },
  {
    title: "Villa Terra Cliff",
    slug: "villa-terra-cliff-uluwatu",
    status: "dijual",
    type: "Vila Arsitektural",
    priceFormatted: "Rp 45,0 Miliar",
    area: "Uluwatu",
    city: "Badung, Bali",
    specs: {
      landArea: 1200,
      buildingArea: 850,
      bedrooms: 4,
      bathrooms: 5,
    },
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Villa Terra Cliff Uluwatu - Infinity Pool",
  },
  {
    title: "The Senopati Sky Penthouse",
    slug: "the-senopati-sky-penthouse",
    status: "dijual",
    type: "Penthouse",
    priceFormatted: "Rp 29,0 Miliar",
    area: "Kebayoran Baru",
    city: "Jakarta Selatan",
    specs: {
      landArea: 480,
      buildingArea: 480,
      bedrooms: 4,
      bathrooms: 5,
    },
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "The Senopati Sky Penthouse - Ruang Utama",
  },
];

export function CuratedPropertiesSection() {
  return (
    <section className="py-20 md:py-28 bg-limestone border-b border-sand-dark/40">
      <div className="max-w-editorial mx-auto px-5 md:px-8 space-y-12 md:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-sand-dark/40">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-sage font-semibold block">
              KOLEKSI PILIHAN
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight">
              Koleksi Residensial Pilihan
            </h2>
            <p className="text-sm font-sans text-ink-muted">
              Pilihan hunian dengan keunggulan arsitektural, kejujuran material, dan lokasi terkurasi.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-semibold text-ink hover:text-bronze transition-colors self-start md:self-auto group"
          >
            <span>Lihat Seluruh Koleksi</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-Card Asymmetric Rhythm Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PROPERTIES.map((property, idx) => (
            <div
              key={property.slug}
              className={idx === 1 ? "lg:translate-y-4 transition-transform" : ""}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="pt-8 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-widest font-sans font-semibold bg-ink text-limestone hover:bg-bronze transition-colors rounded-none shadow-sm"
          >
            Jelajahi Koleksi Lengkap
          </Link>
        </div>
      </div>
    </section>
  );
}

