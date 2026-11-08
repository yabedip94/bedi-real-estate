import { Check } from "lucide-react";

interface PropertyFacilitiesListProps {
  facilities: string[];
}

export function PropertyFacilitiesList({ facilities }: PropertyFacilitiesListProps) {
  if (!facilities || facilities.length === 0) return null;

  return (
    <section aria-labelledby="facilities-heading" className="space-y-4">
      <div className="border-b border-sand-dark/60 pb-3">
        <h2 id="facilities-heading" className="text-xl font-serif font-semibold text-ink">
          Fasilitas & Fitur Unggulan
        </h2>
        <p className="text-xs font-sans text-sage-dark tracking-wide mt-0.5">
          Kelengkapan arsitektur dan fasilitas eksklusif unit
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {facilities.map((facility, index) => (
          <div
            key={facility + index}
            className="flex items-start gap-2.5 p-3.5 bg-white/70 border border-sand-dark/40 rounded-sm"
          >
            <span className="p-1 rounded-full bg-bronze/10 text-bronze-dark flex-shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span className="text-sm font-sans text-ink leading-snug">
              {facility}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
