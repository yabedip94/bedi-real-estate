import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, ShieldCheck, Home, Key, TrendingUp, Sparkles, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "Penasihat Properti | NARA ESTATE",
  description:
    "Layanan konsultasi arsitektural institusional dan panduan kuratorial pemilihan residensi mewah di Indonesia.",
};

const CONSULTATION_PILLARS = [
  {
    icon: Compass,
    number: "01",
    title: "Penemuan & Seleksi Properti",
    subtitle: "Property Discovery & Spatial Matching",
    description:
      "Kami mendalami preferensi estetika, ritme harian, serta kebutuhan spasial keluarga Anda. Dari orientasi cahaya khatulistiwa hingga keterhubungan ruang terbuka, setiap rekomendasi disusun secara terkurasi.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Panduan Integritas Arsitektur",
    subtitle: "Architectural Integrity Guidance",
    description:
      "Penilaian komprehensif terhadap kejujuran material—seperti kayu ulin, jati solid, batu andesit lokal, dan marmer alam—serta daya tahan struktur fisik bangunan dalam iklim tropis Indonesia.",
  },
  {
    icon: Home,
    number: "03",
    title: "Konsultasi Pembelian Properti",
    subtitle: "Acquisition Advisory",
    description:
      "Pendampingan menyeluruh dalam proses akuisisi kepemilikan residensial, meliputi transparansi legalitas sertifikat (SHM, HGB, Strata Title), uji kelayakan dokumen, hingga proses peralihan hak yang aman.",
  },
  {
    icon: Key,
    number: "04",
    title: "Konsultasi Sewa Jangka Panjang",
    subtitle: "Curated Lease Advisory",
    description:
      "Pilihan vila resor privat di Bali dan penthouse prestisius di Jakarta untuk masa sewa tahunan. Menitikberatkan pada standar perawatan prima, privasi lingkungan, dan fleksibilitas gaya hidup berpindah.",
  },
  {
    icon: TrendingUp,
    number: "05",
    title: "Eksplorasi Nilai Jangka Panjang",
    subtitle: "Value & Scarcity Exploration",
    description:
      "Analisis nilai intrinsik properti berbasis kelangkaan tapak lahan di kawasan historis (Menteng, Kebayoran Baru) serta potensi apresiasi kawasan berkembang, disajikan secara objektif tanpa janji spekulatif imbal hasil finansial.",
  },
  {
    icon: Sparkles,
    number: "06",
    title: "Kerahasiaan & Diskresi Penuh",
    subtitle: "Confidentiality & Discretion",
    description:
      "Setiap dialog dan pertukaran informasi kepemilikan properti diperlakukan dengan standar kerahasiaan tertinggi, menghormati privasi penuh para klien institusional dan individu terkemuka.",
  },
];

const CONSULTATION_PROCESS = [
  {
    step: "01",
    title: "Dialog Pemahaman Awal",
    description:
      "Diskusi mendalam mengenai preferensi arsitektur, parameter lokasi, rentang anggaran, dan tujuan kepemilikan hunian Anda.",
  },
  {
    step: "02",
    title: "Penyusunan Kurasi Khusus",
    description:
      "Penyaringan portofolio residensial eksklusif yang secara spesifik menjawab kebutuhan spasial dan filosofi hidup Anda.",
  },
  {
    step: "03",
    title: "Inspeksi Spasial Privat",
    description:
      "Peninjauan langsung ke lokasi dengan pendampingan kuratorial untuk merasakan kualitas cahaya, material, dan sirkulasi alami ruang.",
  },
  {
    step: "04",
    title: "Penyelarasan & Finalisasi",
    description:
      "Verifikasi keabsahan dokumen legalitas dan fasilitasi dialog transaksi dengan transparansi penuh hingga proses serah terima.",
  },
];

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-limestone text-ink pt-28 md:pt-36">
      {/* Editorial Hero Section */}
      <section className="border-b border-sand-dark/60 pb-16 md:pb-24">
        <div className="max-w-editorial mx-auto px-5 md:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sand/70 border border-sand-dark/80 rounded-none text-[11px] font-sans font-semibold uppercase tracking-widest text-ink">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
              Layanan Konsultasi Institusional
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink font-semibold tracking-tight leading-[1.12]">
              Panduan Kuratorial &amp; Dialog Spasial Berkelanjutan.
            </h1>

            <p className="text-base sm:text-lg font-sans text-ink-muted leading-relaxed">
              NARA ESTATE menghadirkan pendekatan konsultasi properti yang berakar pada pemahaman arsitektur,
              kejujuran material, dan transparansi informasi. Kami tidak bertindak sebagai perantara transaksional
              konvensional, melainkan mitra berdialog untuk menemukan ruang hunian yang memiliki makna mendalam.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-ink text-limestone text-xs font-sans uppercase tracking-widest font-semibold hover:bg-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-bronze"
              >
                <span>Mulai Konsultasi Privat</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-transparent border border-ink/40 text-ink text-xs font-sans uppercase tracking-widest font-semibold hover:border-ink hover:bg-sand/40 transition-colors focus:outline-none focus:ring-2 focus:ring-ink"
              >
                Eksplorasi Katalog Koleksi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Atmospheric Editorial Photographic Panel */}
      <section className="bg-sand border-b border-sand-dark/60 py-12 md:py-16">
        <div className="max-w-editorial mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] rounded-sm overflow-hidden border border-sand-dark/80 shadow-xs">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
                alt="Dialog arsitektur tropis modern di NARA ESTATE"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-sans uppercase tracking-widest text-sand-light/90 block">
                  Filosofi Ruang NARA
                </span>
                <p className="font-serif text-lg font-medium text-white drop-shadow-xs">
                  Arsitektur sebagai latar kehidupan yang abadi.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-sage font-semibold block">
                METODOLOGI KONSULTASI
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold tracking-tight">
                Membaca Kebutuhan Lebih Dari Sekadar Luas Ruang
              </h2>
              <p className="text-sm font-sans text-ink-muted leading-relaxed">
                Pemilihan hunian bukan semata perhitungan meter persegi atau daftar fasilitas. Kami membantu Anda
                menganalisis bagaimana interaksi cahaya alami, proporsi langit-langit, serta ketahanan material
                berkontribusi pada kenyamanan psikologis penghuni dalam jangka panjang.
              </p>
              <div className="pt-2">
                <blockquote className="border-l-2 border-bronze pl-4 py-1 italic font-serif text-ink text-base">
                  &ldquo;Sebuah rumah yang dirancang dengan integritas material akan menua dengan indah bersama Anda.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Pillars Grid */}
      <section className="py-20 md:py-28 max-w-editorial mx-auto px-5 md:px-8 space-y-16">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-sage font-semibold block">
            PILAR LAYANAN
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight">
            Ruang Lingkup Konsultasi Kami
          </h2>
          <p className="text-sm font-sans text-ink-muted leading-relaxed">
            Dari akuisisi residensial bernilai tinggi hingga kurasi sewa tahunan, layanan kami dirancang untuk
            memberikan kejelasan objektif di setiap tahapan keputusan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CONSULTATION_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.number}
                className="bg-white border border-sand-dark/70 rounded-sm p-7 space-y-5 flex flex-col justify-between transition-all duration-300 hover:border-bronze/70 hover:shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-sm bg-sand/60 border border-sand-dark/60 flex items-center justify-center text-ink">
                      <Icon className="w-5 h-5 text-ink" />
                    </div>
                    <span className="font-serif text-sm text-sage font-semibold">{pillar.number}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-semibold text-ink leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] font-sans uppercase tracking-wider text-sage-dark font-medium">
                      {pillar.subtitle}
                    </p>
                  </div>

                  <p className="text-xs font-sans text-ink-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-sand-dark/40">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-semibold text-ink hover:text-bronze transition-colors group"
                  >
                    <span>Konsultasikan</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Advisory Process Journey */}
      <section className="bg-sand/40 border-y border-sand-dark/60 py-20 md:py-28">
        <div className="max-w-editorial mx-auto px-5 md:px-8 space-y-16">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-sage font-semibold block">
              TAHAPAN KONSULTASI
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight">
              Alur Perjalanan Konsultasi Institusional
            </h2>
            <p className="text-sm font-sans text-ink-muted leading-relaxed">
              Sebuah proses terstruktur yang menghargai waktu dan privasi Anda, memastikan setiap langkah
              dilandasi data faktual dan pemahaman arsitektural yang jernih.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CONSULTATION_PROCESS.map((item) => (
              <div key={item.step} className="space-y-3 relative">
                <div className="font-serif text-3xl font-bold text-bronze-dark/80 pb-2 border-b border-sand-dark/70">
                  {item.step}
                </div>
                <h3 className="font-serif text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="text-xs font-sans text-ink-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Inquiry Invitation Section */}
      <section className="py-20 md:py-28 max-w-editorial mx-auto px-5 md:px-8">
        <div className="bg-ink text-limestone rounded-sm p-8 sm:p-12 lg:p-16 border border-ink-light grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-bronze-light font-semibold">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Inisiasi Konsultasi Pribadi</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-semibold tracking-tight">
              Mulai Percakapan Spasial Anda Bersama Kami
            </h2>
            <p className="text-sm font-sans text-sand-light/90 leading-relaxed max-w-2xl">
              Sampaikan preferensi hunian idaman atau kebutuhan portofolio Anda melalui formulir konsultasi kuratorial.
              Tim konsultan kami siap menyusun rekomendasi residensial yang sesuai dengan visi Anda.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-limestone text-ink text-xs font-sans uppercase tracking-widest font-semibold hover:bg-bronze hover:text-white transition-colors"
            >
              <span>Buka Formulir Kontak</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent border border-sand-light/40 text-sand-light text-xs font-sans uppercase tracking-widest font-semibold hover:border-sand-light hover:bg-ink-light transition-colors"
            >
              Koleksi Properti Terkurasi
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
