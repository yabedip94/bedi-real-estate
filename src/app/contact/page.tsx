import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { MapPin, Clock, ShieldCheck, ArrowRight, PhoneCall } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Kontak & Konsultasi | NARA ESTATE",
  description:
    "Formulir konsultasi kuratorial dan inisiasi dialog arsitektural residensi mewah di Indonesia.",
};

function FormLoadingFallback() {
  return (
    <div className="bg-white border border-sand-dark/80 rounded-sm p-8 text-center space-y-4 shadow-sm animate-pulse">
      <div className="h-6 bg-sand/60 w-1/3 mx-auto" />
      <div className="h-4 bg-sand/40 w-2/3 mx-auto" />
      <div className="h-48 bg-sand/30" />
      <div className="h-10 bg-sand/60 w-full" />
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-limestone text-ink pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="max-w-editorial mx-auto px-5 md:px-8 space-y-12 md:space-y-16">
        {/* Editorial Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sand/70 border border-sand-dark/80 rounded-none text-[11px] font-sans font-semibold uppercase tracking-widest text-ink">
            <PhoneCall className="w-3.5 h-3.5 text-bronze-dark" />
            <span>Dialog &amp; Inisiasi Kuratorial</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-semibold tracking-tight leading-tight">
            Hubungi Penasihat Residensial Kami.
          </h1>

          <p className="text-sm sm:text-base font-sans text-ink-muted leading-relaxed">
            Sampaikan parameter hunian atau kebutuhan konsultasi arsitektur Anda. Setiap pesan yang disusun
            melalui formulir ini terstandarisasi untuk memudahkan komunikasi langsung dengan tim kurator NARA ESTATE.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Form on Left (7 cols), Contextual Sidebar on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Consultation Form Column */}
          <div className="lg:col-span-7">
            <Suspense fallback={<FormLoadingFallback />}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Contextual & Representative Gallery Sidebar */}
          <aside className="lg:col-span-5 space-y-8">
            {/* Gallery / Office Coordinates */}
            <div className="bg-sand/40 border border-sand-dark/80 rounded-sm p-6 sm:p-7 space-y-6">
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-sage font-semibold block">
                GALERI REPRESENTATIF
              </span>

              <div className="space-y-5">
                <div className="space-y-1.5 pb-4 border-b border-sand-dark/50">
                  <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-bronze" />
                    <span>Jakarta Diplomatic Gallery</span>
                  </h3>
                  <p className="text-xs font-sans text-ink-muted leading-relaxed">
                    Jl. Teuku Umar No. 24, Menteng, Jakarta Pusat, DKI Jakarta 10350
                  </p>
                  <p className="text-[11px] font-sans text-sage-dark flex items-center gap-1 pt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Senin – Sabtu: 09.00 – 18.00 WIB (Dengan Janji Temu)</span>
                  </p>
                </div>

                <div className="space-y-1.5 pb-4 border-b border-sand-dark/50">
                  <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-bronze" />
                    <span>Bali Coastal Pavilion</span>
                  </h3>
                  <p className="text-xs font-sans text-ink-muted leading-relaxed">
                    Jl. Kayu Aya No. 88, Seminyak, Kuta, Kabupaten Badung, Bali 80361
                  </p>
                  <p className="text-[11px] font-sans text-sage-dark flex items-center gap-1 pt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Senin – Minggu: 10.00 – 19.00 WITA</span>
                  </p>
                </div>
              </div>

              {/* Discretion Guarantee */}
              <div className="flex items-start gap-3 pt-2">
                <ShieldCheck className="w-5 h-5 text-bronze flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-ink">
                    Jaminan Diskresi &amp; Privasi
                  </h4>
                  <p className="text-[11px] font-sans text-ink-muted leading-relaxed">
                    Kami memahami pentingnya privasi bagi setiap klien. Seluruh komunikasi diperlakukan secara konfidensial
                    tanpa publikasi atau distribusi komersial pihak ketiga.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Catalog Cross-Link */}
            <div className="bg-white border border-sand-dark/70 rounded-sm p-6 space-y-3 shadow-xs">
              <span className="text-[11px] font-sans uppercase tracking-widest text-sage font-medium block">
                BELUM MEMILIKI PILIHAN PROPERTI?
              </span>
              <h3 className="font-serif text-xl font-semibold text-ink">
                Eksplorasi 12 Residensi Terkurasi
              </h3>
              <p className="text-xs font-sans text-ink-muted leading-relaxed">
                Telusuri katalog lengkap kami untuk menemukan inspirasi arsitektur di Menteng, Uluwatu, Senopati, Dago Pakar, dan BSD City.
              </p>
              <div className="pt-2">
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest font-semibold text-ink hover:text-bronze transition-colors group"
                >
                  <span>Buka Katalog Properti</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
