import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";

export function ClosingCtaSection() {
  // Configured demo WhatsApp message using explicit demo number
  const demoWaNumber = "6281199887766";
  const demoWaMessage = encodeURIComponent(
    "Halo NARA ESTATE, saya tertarik berkonsultasi mengenai kurasi properti residensial premium. Mohon informasi lebih lanjut. Terima kasih."
  );
  const waUrl = `https://wa.me/${demoWaNumber}?text=${demoWaMessage}`;

  return (
    <section className="py-24 md:py-32 bg-ink text-limestone relative overflow-hidden border-b border-ink-light">
      <div className="max-w-editorial mx-auto px-5 md:px-8 relative z-10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-bronze-light font-semibold block">
            HUBUNGI KAMI
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-limestone font-semibold tracking-tight leading-tight">
            Mulai Percakapan Mengenai Hunian Impian Anda.
          </h2>
          <p className="font-serif italic text-lg text-bronze">
            Find a place to belong.
          </p>
          <p className="text-sm md:text-base font-sans text-sage-light leading-relaxed pt-2">
            Tertarik untuk mengetahui lebih lanjut mengenai koleksi properti NARA ESTATE? Hubungi kami untuk mendiskusikan kurasi hunian yang sesuai dengan visi estetika dan ruang hidup Anda.
          </p>

          {/* Dual Action Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-bronze text-ink font-sans text-xs uppercase tracking-widest font-semibold hover:bg-bronze-light transition-colors rounded-none shadow-sm"
            >
              <span>Kirim Pesan / Kontak</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-sand-dark/40 text-limestone font-sans text-xs uppercase tracking-widest font-semibold hover:bg-white/5 transition-colors rounded-none"
            >
              <MessageSquare className="w-4 h-4 text-bronze" />
              <span>Tanya via WhatsApp (Demo)</span>
            </a>
          </div>

          {/* Flagship Descriptor */}
          <div className="pt-8 text-xs font-sans text-sage">
            <p>Senopati Architectural Gallery &mdash; Kebayoran Baru, Jakarta Selatan</p>
            <p className="pt-1 text-[11px] text-sage-light">Kunjungan privat berdasarkan perjanjian temu.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

