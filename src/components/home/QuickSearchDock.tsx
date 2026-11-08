import Link from "next/link";
import { Search, MapPin, Home, ArrowRight } from "lucide-react";

export function QuickSearchDock() {
  return (
    <div className="bg-white border border-sand-dark/70 p-5 md:p-6 rounded-sm shadow-sm space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Lokasi / Area Preview */}
        <div className="space-y-1.5 border-b sm:border-b-0 sm:border-r border-sand-dark/50 pb-3 sm:pb-0 sm:pr-4">
          <label className="text-[11px] font-sans uppercase tracking-wider text-sage font-semibold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-bronze" />
            <span>Kawasan / Kota</span>
          </label>
          <p className="text-sm font-sans font-medium text-ink">
            Jakarta, Bali, Bandung...
          </p>
        </div>

        {/* Tipe Properti Preview */}
        <div className="space-y-1.5 border-b sm:border-b-0 sm:border-r border-sand-dark/50 pb-3 sm:pb-0 sm:pr-4">
          <label className="text-[11px] font-sans uppercase tracking-wider text-sage font-semibold flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-bronze" />
            <span>Tipe Properti</span>
          </label>
          <p className="text-sm font-sans font-medium text-ink">
            Rumah, Vila, Penthouse
          </p>
        </div>

        {/* Status Transaksi Preview */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-sans uppercase tracking-wider text-sage font-semibold flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-bronze" />
            <span>Status Transaksi</span>
          </label>
          <p className="text-sm font-sans font-medium text-ink">
            Dijual & Disewa
          </p>
        </div>
      </div>

      {/* Action to Properties Route */}
      <div className="pt-2">
        <Link
          href="/properties"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink text-limestone hover:bg-bronze transition-colors text-xs uppercase tracking-widest font-sans font-semibold rounded-none"
        >
          <span>Eksplorasi Seluruh Koleksi</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

