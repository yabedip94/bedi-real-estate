import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandManifestoSection() {
  return (
    <section className="py-20 md:py-28 bg-sand border-b border-sand-dark/50">
      <div className="max-w-editorial mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (6 cols): Display Pull-Quote */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-sage font-semibold block">
              FILOSOFI KURASI
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink font-normal leading-snug">
              &ldquo;Kami memandang hunian bukan sekadar komoditas fisik, melainkan ruang hidup tempat arsitektur, lanskap alam, dan ritme keseharian berpadu dalam harmoni.&rdquo;
            </blockquote>
            <p className="font-serif italic text-base text-bronze-dark">
              &mdash; Perspektif Kuratorial NARA ESTATE
            </p>
          </div>

          {/* Right Column (6 cols): Curatorial Narrative & 4 Editorial Statements */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4 text-sm md:text-base font-sans text-ink-muted leading-relaxed">
              <p>
                Di tengah arus pemasaran properti massal yang seragam, NARA ESTATE hadir memberikan ruang kurasi tersendiri. Kami menyeleksi residensi bukan berdasarkan volume, melainkan kejelasan visi rancang bangun, kejujuran material, serta keselarasan dengan konteks lingkungannya.
              </p>
              <p>
                Setiap hunian yang kami tampilkan memiliki narasi arsitektural yang utuh&mdash;menciptakan ruang di mana penghuni merasakan kedamaian, privasi, dan rasa memiliki yang sejati.
              </p>
            </div>

            {/* 4 Authentic Curatorial Editorial Statements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-sand-dark/60">
              <div className="space-y-1 p-3 bg-limestone/60 rounded-none border border-sand-dark/30">
                <h4 className="text-sm font-serif font-bold text-ink">Integritas Arsitektur</h4>
                <p className="text-xs font-sans text-ink-muted">
                  Kurasi residensi dengan karakter spasial yang kuat dan kejujuran material.
                </p>
              </div>
              <div className="space-y-1 p-3 bg-limestone/60 rounded-none border border-sand-dark/30">
                <h4 className="text-sm font-serif font-bold text-ink">Konteks & Lanskap</h4>
                <p className="text-xs font-sans text-ink-muted">
                  Harmoni antara struktur bangunan dan karakter lingkungan sekitarnya.
                </p>
              </div>
              <div className="space-y-1 p-3 bg-limestone/60 rounded-none border border-sand-dark/30">
                <h4 className="text-sm font-serif font-bold text-ink">Transparansi Spasial</h4>
                <p className="text-xs font-sans text-ink-muted">
                  Penyajian dokumentasi visual arsitektural dan spesifikasi yang terstruktur.
                </p>
              </div>
              <div className="space-y-1 p-3 bg-limestone/60 rounded-none border border-sand-dark/30">
                <h4 className="text-sm font-serif font-bold text-ink">Perspektif Berkelanjutan</h4>
                <p className="text-xs font-sans text-ink-muted">
                  Apresiasi terhadap desain yang menua dengan anggun melintasi waktu.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-semibold text-ink hover:text-bronze transition-colors group"
              >
                <span>Jelajahi Koleksi Residensial</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

