import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function PropertyNotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-limestone">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-sand-dark/30 border border-sand-dark/60 flex items-center justify-center text-ink-muted">
          <Compass className="w-8 h-8 text-bronze" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-sans uppercase tracking-widest text-bronze font-semibold">
            Status 404 · Properti Tidak Ditemukan
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink">
            Hunian Tidak Ditemukan
          </h1>
          <p className="text-sm font-sans text-ink-muted leading-relaxed pt-1">
            Properti dengan tautan ini tidak tersedia dalam katalog kurasi NARA ESTATE atau telah dialihkan.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/properties"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink hover:bg-ink-light text-limestone text-xs font-sans uppercase tracking-widest font-medium rounded-none transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-sand-dark hover:border-ink text-ink text-xs font-sans uppercase tracking-widest font-medium rounded-none transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            <span>Beranda</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
