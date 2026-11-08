import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function TheNaraApproachSection() {
  return (
    <section className="py-20 md:py-28 bg-limestone border-b border-sand-dark/40">
      <div className="max-w-editorial mx-auto px-5 md:px-8 space-y-12 md:space-y-16">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-sage font-semibold block">
            PENDEKATAN KAMI
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight">
            Kurasi Berlandaskan Nilai dan Integritas Spasial
          </h2>
          <p className="text-sm md:text-base font-sans text-ink-muted leading-relaxed">
            NARA ESTATE memandu penjelajahan properti mewah melalui empat prinsip editorial terstruktur yang menghargai keindahan arsitektur dan ketenangan eksplorasi Anda.
          </p>
        </div>

        {/* 4 Approved Editorial Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Principle 01 */}
          <div className="p-6 bg-white border border-sand-dark/60 rounded-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-serif text-3xl text-bronze font-semibold block">01</span>
              <h3 className="font-serif text-lg font-bold text-ink">Curated Architecture</h3>
              <p className="text-xs font-sans text-ink-muted leading-relaxed">
                Setiap residensi dipilih berdasarkan karakter spasial yang kuat, harmoni proporsi, dan integritas desain yang autentik.
              </p>
            </div>
            <span className="text-[10px] font-sans uppercase tracking-widest text-sage font-medium pt-3 border-t border-sand-dark/30">
              Standar Spasial
            </span>
          </div>

          {/* Principle 02 */}
          <div className="p-6 bg-white border border-sand-dark/60 rounded-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-serif text-3xl text-bronze font-semibold block">02</span>
              <h3 className="font-serif text-lg font-bold text-ink">Location &amp; Lifestyle</h3>
              <p className="text-xs font-sans text-ink-muted leading-relaxed">
                Menghubungkan hunian dengan konteks lingkungannya&mdash;dari ketenangan enklave bersejarah hingga lanskap pesisir tropis.
              </p>
            </div>
            <span className="text-[10px] font-sans uppercase tracking-widest text-sage font-medium pt-3 border-t border-sand-dark/30">
              Karakter Kawasan
            </span>
          </div>

          {/* Principle 03 */}
          <div className="p-6 bg-white border border-sand-dark/60 rounded-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-serif text-3xl text-bronze font-semibold block">03</span>
              <h3 className="font-serif text-lg font-bold text-ink">Property Information</h3>
              <p className="text-xs font-sans text-ink-muted leading-relaxed">
                Menyajikan data spesifikasi fisik (LT, LB, KT, KM) dan dokumentasi visual arsitektural secara transparan dan terstruktur.
              </p>
            </div>
            <span className="text-[10px] font-sans uppercase tracking-widest text-sage font-medium pt-3 border-t border-sand-dark/30">
              Kejelasan Data
            </span>
          </div>

          {/* Principle 04 */}
          <div className="p-6 bg-white border border-sand-dark/60 rounded-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-serif text-3xl text-bronze font-semibold block">04</span>
              <h3 className="font-serif text-lg font-bold text-ink">Thoughtful Guidance</h3>
              <p className="text-xs font-sans text-ink-muted leading-relaxed">
                Pendekatan eksplorasi yang tenang, menghargai waktu dan preferensi estetika penikmat arsitektur tanpa tekanan penjualan agresif.
              </p>
            </div>
            <span className="text-[10px] font-sans uppercase tracking-widest text-sage font-medium pt-3 border-t border-sand-dark/30">
              Eksplorasi Tenang
            </span>
          </div>
        </div>

        {/* Showcase Transparency Notice & Agent Route Link */}
        <div className="p-6 bg-sand border border-sand-dark/60 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-bronze shrink-0" />
            <p className="text-xs sm:text-sm font-sans text-ink-muted">
              <strong className="text-ink font-semibold">Pemberitahuan Showcase:</strong> NARA ESTATE merupakan platform demonstrasi portofolio premium yang mengedepankan kurasi arsitektur dan pengalaman digital modern.
            </p>
          </div>
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-semibold text-ink hover:text-bronze shrink-0 group"
          >
            <span>Lihat Profil Penasihat</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

