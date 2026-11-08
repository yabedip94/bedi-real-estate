import { Suspense } from "react";
import type { Metadata } from "next";
import { PropertiesCatalog } from "@/components/properties/PropertiesCatalog";
import { CatalogLoadingSkeleton } from "@/components/properties/CatalogLoadingSkeleton";

export const metadata: Metadata = {
  title: "Koleksi Properti Terkurasi | NARA ESTATE",
  description:
    "Jelajahi portofolio residensi mewah, vila privat, dan penthouse prestisius pilihan NARA ESTATE di kawasan terkemuka Indonesia.",
};

export default function PropertiesPage() {
  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-20 bg-limestone">
      <div className="max-w-editorial mx-auto px-5 md:px-8">
        {/* Editorial Page Header */}
        <header className="mb-8 md:mb-10">
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-bronze font-semibold mb-2 block">
            Koleksi Residensial
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink tracking-tight mb-3">
            Koleksi Properti Terkurasi
          </h1>
          <p className="text-sm sm:text-base font-sans text-ink-muted max-w-2xl leading-relaxed">
            Eksplorasi pilihan residensi mewah, vila privat, dan penthouse
            eksklusif karya arsitek terkemuka di kawasan prestisius Indonesia.
          </p>
        </header>

        {/* Client Catalog Island Wrapped in Suspense */}
        <Suspense fallback={<CatalogLoadingSkeleton />}>
          <PropertiesCatalog />
        </Suspense>
      </div>
    </main>
  );
}

