import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ArchitectureLivingSection() {
  return (
    <section className="py-20 md:py-28 bg-limestone border-b border-sand-dark/40 overflow-hidden">
      <div className="max-w-editorial mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (5 cols): Photo Triptych Collage */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-sand border border-sand-dark/60">
              <Image
                src="https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=800&q=80"
                alt="Detail Material Kayu Jati dan Tekstur Dinding"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-4 pt-6">
              <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-sand border border-sand-dark/60">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80"
                  alt="Sirkulasi Cahaya Alami Ruang Tengah"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-sand border border-sand-dark/60">
                <Image
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80"
                  alt="Harmoni Elemen Air dan Batu Alami"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Monograph Essay Content */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-sage font-semibold block">
              ESAI ARSITEKTURAL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-semibold tracking-tight leading-tight">
              Dialog Antara Cahaya, Material Alami, dan Lanskap Tropis.
            </h2>

            <div className="space-y-4 text-sm md:text-base font-sans text-ink-muted leading-relaxed">
              <p>
                Arsitektur tropis kontemporer di Indonesia mencapai puncaknya ketika batas antara ruang dalam dan ruang luar melebur dengan anggun. Kisi-kisi kayu ulin, dinding beton ekspos bernuansa hangat, dan ventilasi silang bukan sekadar respons fungsional terhadap iklim lembap, melainkan elemen estetika yang mendefinisikan ketenangan batin penghuninya.
              </p>
              <p>
                Bagi NARA ESTATE, kemewahan sejati bukanlah ornamen yang berlebihan, melainkan kejujuran material yang menua dengan indah seiring waktu. Travertine yang memperoleh patina alaminya, bayangan dedaunan palem di atas lantai semen poles, dan hembusan angin sore yang mengalir bebas melalui selasar terbuka.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-semibold text-ink hover:text-bronze transition-colors group"
              >
                <span>Pelajari Pendekatan Desain NARA</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

