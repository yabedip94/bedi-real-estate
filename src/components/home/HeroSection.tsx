import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { QuickSearchDock } from "./QuickSearchDock";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-limestone overflow-hidden border-b border-sand-dark/40">
      <div className="max-w-editorial mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (5 cols): Editorial Typography & Quick Search Dock */}
          <div className="lg:col-span-5 space-y-6 lg:space-y-8">
            <div className="space-y-3">
              <span className="inline-block text-xs font-sans uppercase tracking-[0.2em] text-sage font-semibold">
                NARA ESTATE &mdash; KURASI RESIDENSIAL PREMIUM
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink font-semibold tracking-tight leading-[1.1]">
                Menemukan Ruang untuk Berpulang.
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-bronze-dark pt-1">
                Find a place to belong.
              </p>
            </div>

            <p className="text-sm md:text-base font-sans text-ink-muted leading-relaxed max-w-lg">
              Setiap residensi dalam koleksi NARA dipilih dengan ketelitian arsitektural yang mendalam&mdash;menghadirkan keharmonisan antara estetika spasial, kejujuran material alami, dan kenyamanan hidup yang abadi.
            </p>

            {/* Quick Search Preview Dock */}
            <div className="pt-2">
              <QuickSearchDock />
            </div>

            {/* Supporting Links */}
            <div className="flex items-center gap-6 pt-2 text-xs font-sans text-ink">
              <Link
                href="/properties"
                className="inline-flex items-center gap-1 font-semibold hover:text-bronze transition-colors underline underline-offset-4"
              >
                <span>Lihat Koleksi Unggulan</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="text-sage hover:text-ink transition-colors"
              >
                Jadwalkan Konsultasi Privat
              </Link>
            </div>
          </div>

          {/* Right Column (7 cols): Monograph Architectural Photo Frame */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full rounded-sm overflow-hidden bg-sand border border-sand-dark/60 shadow-sm group">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85"
                alt="Arsitektur Tropis Kontemporer Menteng - NARA ESTATE"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
              />
              {/* Localized Bottom Gradient Overlay: keeps top half bright while securing high-contrast text backing */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5 z-10">
                <span className="text-[11px] font-sans uppercase tracking-widest text-sand-light font-semibold block">
                  Koleksi Residensial Terkurasi
                </span>
                <p className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-white leading-snug drop-shadow-xs">
                  The Kayuputih Residence &mdash; Menteng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

