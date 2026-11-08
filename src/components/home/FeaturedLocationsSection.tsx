import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function FeaturedLocationsSection() {
  return (
    <section className="py-20 md:py-28 bg-sand border-b border-sand-dark/50">
      <div className="max-w-editorial mx-auto px-5 md:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-sage font-semibold block">
            DESTINASI & ENKLAVE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight">
            Kawasan Berkarakter
          </h2>
          <p className="text-sm md:text-base font-sans text-ink-muted leading-relaxed">
            Dari keheningan bersejarah Menteng hingga cakrawala samudera Uluwatu, setiap kawasan menawarkan karakter spasial dan narasi hidup yang khas.
          </p>
        </div>

        {/* 4-Card Asymmetric Editorial Mosaic (1 Large, 2 Medium, 1 Landscape) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1 (Large Featured Enclave - 6 cols, full height anchor) */}
          <Link
            href="/properties"
            className="group lg:col-span-6 relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:min-h-[580px] rounded-sm overflow-hidden bg-ink shadow-sm border border-sand-dark/60 block"
          >
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Menteng dan Kebayoran Baru - Kawasan Bersejarah Jakarta"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            {/* Localized Bottom Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 z-10">
              <span className="text-[11px] font-sans uppercase tracking-widest text-sand-light font-semibold block">
                Kawasan Bersejarah
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white flex items-center justify-between">
                <span>Menteng &amp; Kebayoran Baru</span>
                <ArrowUpRight className="w-5 h-5 text-sand-light group-hover:text-white opacity-0 group-hover:opacity-100 transition-all" />
              </h3>
              <p className="text-xs sm:text-sm font-sans text-sand-light/95 leading-relaxed max-w-md">
                Keanggunan arsitektur kolonial tropis dan keteduhan pepohonan berusia seabad di jantung kawasan diplomatik Jakarta.
              </p>
            </div>
          </Link>

          {/* Right Column Stack (6 cols: 1 Medium top, 2 side-by-side bottom) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Card 2 (Medium Enclave - Top right) */}
            <Link
              href="/properties"
              className="group relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-auto lg:h-[275px] rounded-sm overflow-hidden bg-ink shadow-sm border border-sand-dark/60 block"
            >
              <Image
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80"
                alt="Uluwatu dan Canggu - Pesisir Tropis Bali"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              {/* Localized Bottom Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink/95 via-ink/65 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5 z-10">
                <span className="text-[11px] font-sans uppercase tracking-widest text-sand-light font-semibold block">
                  Pesisir Samudra
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-white flex items-center justify-between">
                  <span>Uluwatu &amp; Canggu, Bali</span>
                  <ArrowUpRight className="w-4 h-4 text-sand-light group-hover:text-white opacity-0 group-hover:opacity-100 transition-all" />
                </h3>
                <p className="text-xs font-sans text-sand-light/95 leading-relaxed">
                  Kemegahan tebing kapur dan ketenangan gaya hidup pesisir tropis modern.
                </p>
              </div>
            </Link>

            {/* Split Bottom Row: Card 3 & Card 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              {/* Card 3 (Medium Enclave - Bottom left) */}
              <Link
                href="/properties"
                className="group relative aspect-[4/3] sm:aspect-auto sm:min-h-[275px] rounded-sm overflow-hidden bg-ink shadow-sm border border-sand-dark/60 block"
              >
                <Image
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                  alt="Dago Pakar - Lereng Bukit Bandung"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                {/* Localized Bottom Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-ink/95 via-ink/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 z-10">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-sand-light font-semibold block">
                    Dataran Tinggi
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-white">
                    Dago Pakar, Bandung
                  </h4>
                  <p className="text-[11px] sm:text-xs font-sans text-sand-light/95 leading-snug">
                    Hunian lereng bukit berhawa sejuk dengan panorama lembah pinus.
                  </p>
                </div>
              </Link>

              {/* Card 4 (Shorter Landscape Enclave - Bottom right) */}
              <Link
                href="/properties"
                className="group relative aspect-[4/3] sm:aspect-auto sm:min-h-[275px] rounded-sm overflow-hidden bg-ink shadow-sm border border-sand-dark/60 block"
              >
                <Image
                  src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
                  alt="BSD City - Urbanisme Kontemporer"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                {/* Localized Bottom Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-ink/95 via-ink/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 z-10">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-sand-light font-semibold block">
                    Urban Hijau
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-white">
                    BSD City, Tangerang
                  </h4>
                  <p className="text-[11px] sm:text-xs font-sans text-sand-light/95 leading-snug">
                    Presisi kota terencana dengan keterhubungan lanskap botani dan air.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

