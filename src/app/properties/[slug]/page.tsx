import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, ArrowLeft } from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import {
  getPropertyBySlug,
  getAllPropertySlugs,
  buildPropertyMetadata,
} from "@/lib/property-detail";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { PropertySpecsGrid } from "@/components/properties/PropertySpecsGrid";
import { PropertyFacilitiesList } from "@/components/properties/PropertyFacilitiesList";
import { PropertyConsultationCard } from "@/components/properties/PropertyConsultationCard";
import { RelatedPropertiesSection } from "@/components/properties/RelatedPropertiesSection";

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  return buildPropertyMetadata(property);
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-limestone text-ink pb-20">
      {/* Breadcrumbs Navigation Bar */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-sand-dark/50 bg-limestone/80 backdrop-blur-xs sticky top-0 z-30"
      >
        <div className="max-w-editorial mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between text-xs font-sans text-ink-muted">
          <ol className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap py-0.5">
            <li>
              <Link
                href="/"
                className="hover:text-ink transition-colors focus:outline-none focus:underline"
              >
                Beranda
              </Link>
            </li>
            <li aria-hidden="true" className="text-sand-dark">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li>
              <Link
                href="/properties"
                className="hover:text-ink transition-colors focus:outline-none focus:underline"
              >
                Koleksi Properti
              </Link>
            </li>
            <li aria-hidden="true" className="text-sand-dark">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li>
              <span className="text-sage-dark font-medium">
                {property.location.city}
              </span>
            </li>
            <li aria-hidden="true" className="text-sand-dark">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li aria-current="page">
              <span className="text-ink font-semibold truncate max-w-[200px] md:max-w-none inline-block">
                {property.title}
              </span>
            </li>
          </ol>

          <Link
            href="/properties"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-sage-dark hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Katalog</span>
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-editorial mx-auto px-4 md:px-8 pt-6 md:pt-10 space-y-10 md:space-y-12">
        {/* Editorial Property Header */}
        <header className="space-y-3 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2.5 py-1 text-[11px] font-sans font-semibold uppercase tracking-wider ${
                property.status === "dijual"
                  ? "bg-ink text-limestone"
                  : "bg-bronze text-ink"
              }`}
            >
              {property.status === "dijual" ? "Dijual" : "Disewa"}
            </span>

            <span className="px-2.5 py-1 text-[11px] font-sans font-medium uppercase tracking-wider bg-white/80 border border-sand-dark/60 text-ink">
              {property.type}
            </span>

            <span className="text-xs font-mono text-sage-dark tracking-wider px-2">
              KODE: {property.code}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink leading-tight">
            {property.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-serif italic text-sage-dark leading-relaxed">
            {property.tagline}
          </p>

          <div className="flex items-center gap-2 text-xs md:text-sm font-sans text-ink-muted pt-1">
            <MapPin className="w-4 h-4 text-bronze flex-shrink-0" />
            <span>
              {property.location.address}, {property.location.area},{" "}
              {property.location.city}, {property.location.province}
            </span>
          </div>
        </header>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Visual Gallery, Description, Specifications & Features */}
          <div className="lg:col-span-8 space-y-10 md:space-y-12">
            {/* Interactive Gallery & Lightbox */}
            <PropertyGallery
              images={property.images}
              title={property.title}
            />

            {/* Architectural Narrative Description */}
            <section aria-labelledby="narrative-heading" className="space-y-4 pt-2">
              <h2
                id="narrative-heading"
                className="text-xl md:text-2xl font-serif font-semibold text-ink border-b border-sand-dark/60 pb-3"
              >
                Narasi Arsitektur & Konsep Ruang
              </h2>
              <div className="prose prose-stone max-w-none text-sm md:text-base font-sans text-ink-light leading-relaxed whitespace-pre-line">
                {property.description}
              </div>
            </section>

            {/* Architectural Specifications Grid */}
            <PropertySpecsGrid
              specs={property.specs}
              type={property.type}
              status={property.status}
              code={property.code}
            />

            {/* Facilities & Exclusive Features */}
            <PropertyFacilitiesList facilities={property.facilities} />

            {/* Conceptual / Illustrative Disclosure */}
            <div className="p-4 bg-sand/40 border border-sand-dark/50 rounded-sm text-xs font-sans text-ink-muted leading-relaxed">
              <p className="italic">
                Catatan Kuratorial: Seluruh visualisasi fotografi pada laman portofolio ini merupakan representasi arsitektur terkurasi untuk tujuan konseptual showcase NARA ESTATE.
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Consultation Card & Actions */}
          <div className="lg:col-span-4 lg:sticky lg:top-16 space-y-6">
            <PropertyConsultationCard property={property} />
          </div>
        </div>

        {/* Full-Width Section: Deterministic Related Properties */}
        <RelatedPropertiesSection
          currentProperty={property}
          allProperties={PROPERTIES}
        />
      </div>
    </main>
  );
}
