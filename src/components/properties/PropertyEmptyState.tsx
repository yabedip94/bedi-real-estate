import { SearchX, RotateCcw } from "lucide-react";

interface PropertyEmptyStateProps {
  onReset: () => void;
  keyword?: string;
}

export function PropertyEmptyState({ onReset, keyword }: PropertyEmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-white border border-sand-dark/60 rounded-sm py-16 px-6 sm:px-12 text-center max-w-2xl mx-auto my-8 shadow-sm space-y-6"
    >
      <div className="w-16 h-16 mx-auto rounded-full bg-sand/60 border border-sand-dark/40 flex items-center justify-center text-bronze">
        <SearchX className="w-8 h-8 stroke-[1.5]" />
      </div>

      <div className="space-y-2">
        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-sage font-semibold block">
          HASIL TIDAK DITEMUKAN
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
          Koleksi Tidak Ditemukan
        </h3>
        <p className="text-sm font-sans text-ink-muted leading-relaxed max-w-md mx-auto">
          {keyword ? (
            <>
              Tidak ada properti yang cocok dengan kata kunci &ldquo;
              <span className="font-semibold text-ink">{keyword}</span>&rdquo; dan filter yang aktif.
            </>
          ) : (
            "Tidak ada properti yang memenuhi kombinasi filter pencarian Anda saat ini."
          )}
        </p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink text-limestone hover:bg-bronze transition-colors text-xs uppercase tracking-widest font-sans font-semibold rounded-none focus:outline-none focus:ring-2 focus:ring-bronze"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Seluruh Filter</span>
        </button>
      </div>
    </div>
  );
}

