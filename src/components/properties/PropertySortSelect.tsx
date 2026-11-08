import { ArrowUpDown } from "lucide-react";
import type { SortOption } from "@/types/filters";

interface PropertySortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Unggulan" },
  { value: "newest", label: "Terbaru" },
  { value: "price-asc", label: "Harga: Rendah ke Tinggi" },
  { value: "price-desc", label: "Harga: Tinggi ke Rendah" },
  { value: "land-area-desc", label: "Luas Tanah Terbesar" },
];

export function PropertySortSelect({ value, onChange }: PropertySortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="property-sort-select"
        className="text-xs font-sans uppercase tracking-wider text-sage font-medium whitespace-nowrap hidden sm:inline-flex items-center gap-1"
      >
        <ArrowUpDown className="w-3.5 h-3.5 text-bronze" />
        <span>Urutkan:</span>
      </label>

      <div className="relative">
        <select
          id="property-sort-select"
          aria-label="Urutkan Koleksi Properti"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none bg-white border border-sand-dark/60 text-ink text-xs font-sans font-medium px-3.5 py-2 pr-8 rounded-none focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze cursor-pointer transition-colors"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sage">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

