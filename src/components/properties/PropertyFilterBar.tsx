"use client";

import { useRef, useState } from "react";
import { Search, X, SlidersHorizontal, RotateCcw } from "lucide-react";
import type { PropertyFilterState } from "@/types/filters";
import {
  DEFAULT_FILTER_STATE,
  getActiveFilterCount,
} from "@/lib/property-filters";
import { PROPERTY_CITIES } from "@/data/properties";
import {
  STATUS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PRICE_RANGE_OPTIONS,
  BEDROOM_OPTIONS,
  getActiveFilterChips,
} from "@/lib/filter-helpers";
import { MobileFilterDrawer } from "./MobileFilterDrawer";

export interface PropertyFilterBarProps {
  filters: PropertyFilterState;
  onChange: (filters: PropertyFilterState) => void;
  onReset?: () => void;
  cities?: string[];
  totalResults?: number;
}

export function PropertyFilterBar({
  filters,
  onChange,
  onReset,
  cities = PROPERTY_CITIES,
  totalResults,
}: PropertyFilterBarProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);

  const activeCount = getActiveFilterCount(filters);
  const activeChips = getActiveFilterChips(filters);

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      onChange({
        ...DEFAULT_FILTER_STATE,
        sortBy: filters.sortBy,
      });
    }
  };

  const removeChip = (key: keyof PropertyFilterState) => {
    if (key === "keyword") {
      onChange({ ...filters, keyword: "" });
    } else if (key === "status") {
      onChange({ ...filters, status: "all" });
    } else if (key === "type") {
      onChange({ ...filters, type: "all" });
    } else if (key === "city") {
      onChange({ ...filters, city: "all" });
    } else if (key === "priceRange") {
      onChange({ ...filters, priceRange: "all" });
    } else if (key === "minBedrooms") {
      onChange({ ...filters, minBedrooms: "all" });
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Mobile Toolbar (< md) */}
      <div className="flex md:hidden items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage pointer-events-none" />
          <input
            type="text"
            aria-label="Cari koleksi properti"
            value={filters.keyword}
            onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
            placeholder="Cari hunian..."
            className="w-full bg-white border border-sand-dark/60 text-ink text-sm font-sans pl-10 pr-9 py-2.5 rounded-none focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze"
          />
          {filters.keyword.trim().length > 0 && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, keyword: "" })}
              aria-label="Hapus kata kunci"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-sage hover:text-ink focus:outline-none"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          ref={mobileTriggerRef}
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          aria-label={`Buka filter properti. ${activeCount} filter aktif.`}
          aria-haspopup="dialog"
          aria-expanded={isMobileDrawerOpen}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border border-sand-dark/60 text-ink text-xs font-sans uppercase tracking-wider font-semibold hover:border-bronze hover:text-bronze transition-colors focus:outline-none focus:ring-1 focus:ring-bronze rounded-none shrink-0"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-bronze" />
          <span>Filter</span>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-bronze text-white text-[10px] font-sans font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Toolbar (>= md) */}
      <div className="hidden md:block bg-white border border-sand-dark/60 rounded-none p-5 space-y-4 shadow-xs">
        {/* Row 1: Search Input */}
        <div className="relative">
          <label htmlFor="desktop-filter-keyword" className="sr-only">
            Cari Properti
          </label>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage pointer-events-none" />
          <input
            id="desktop-filter-keyword"
            type="text"
            value={filters.keyword}
            onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
            placeholder="Cari berdasarkan nama residensi, kawasan, kota, atau kata kunci..."
            className="w-full bg-sand/20 border border-sand-dark/40 text-ink text-sm font-sans pl-10 pr-9 py-2.5 rounded-none focus:outline-none focus:bg-white focus:border-bronze focus:ring-1 focus:ring-bronze transition-colors"
          />
          {filters.keyword.trim().length > 0 && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, keyword: "" })}
              aria-label="Hapus kata kunci pencarian"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-sage hover:text-ink focus:outline-none"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Row 2: Select Controls */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Status */}
          <div className="space-y-1">
            <label
              htmlFor="desktop-filter-status"
              className="block text-[10px] font-sans uppercase tracking-wider text-sage font-semibold"
            >
              Status
            </label>
            <div className="relative">
              <select
                id="desktop-filter-status"
                value={filters.status}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    status: e.target.value as PropertyFilterState["status"],
                  })
                }
                className="w-full appearance-none bg-white border border-sand-dark/60 text-ink text-xs font-sans px-3 py-2 pr-7 rounded-none focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze cursor-pointer"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sage">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Tipe Properti */}
          <div className="space-y-1">
            <label
              htmlFor="desktop-filter-type"
              className="block text-[10px] font-sans uppercase tracking-wider text-sage font-semibold"
            >
              Tipe
            </label>
            <div className="relative">
              <select
                id="desktop-filter-type"
                value={filters.type}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    type: e.target.value as PropertyFilterState["type"],
                  })
                }
                className="w-full appearance-none bg-white border border-sand-dark/60 text-ink text-xs font-sans px-3 py-2 pr-7 rounded-none focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze cursor-pointer"
              >
                {PROPERTY_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sage">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Lokasi / Kota */}
          <div className="space-y-1">
            <label
              htmlFor="desktop-filter-city"
              className="block text-[10px] font-sans uppercase tracking-wider text-sage font-semibold"
            >
              Lokasi
            </label>
            <div className="relative">
              <select
                id="desktop-filter-city"
                value={filters.city}
                onChange={(e) => onChange({ ...filters, city: e.target.value })}
                className="w-full appearance-none bg-white border border-sand-dark/60 text-ink text-xs font-sans px-3 py-2 pr-7 rounded-none focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze cursor-pointer"
              >
                <option value="all">Semua Lokasi</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sage">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Rentang Harga */}
          <div className="space-y-1">
            <label
              htmlFor="desktop-filter-price-range"
              className="block text-[10px] font-sans uppercase tracking-wider text-sage font-semibold"
            >
              Rentang Harga
            </label>
            <div className="relative">
              <select
                id="desktop-filter-price-range"
                value={filters.priceRange}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    priceRange: e.target.value as PropertyFilterState["priceRange"],
                  })
                }
                className="w-full appearance-none bg-white border border-sand-dark/60 text-ink text-xs font-sans px-3 py-2 pr-7 rounded-none focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze cursor-pointer"
              >
                {PRICE_RANGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sage">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Kamar Tidur */}
          <div className="space-y-1">
            <label
              htmlFor="desktop-filter-min-bedrooms"
              className="block text-[10px] font-sans uppercase tracking-wider text-sage font-semibold"
            >
              Kamar Tidur
            </label>
            <div className="relative">
              <select
                id="desktop-filter-min-bedrooms"
                value={filters.minBedrooms}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    minBedrooms:
                      e.target.value === "all" ? "all" : Number(e.target.value),
                  })
                }
                className="w-full appearance-none bg-white border border-sand-dark/60 text-ink text-xs font-sans px-3 py-2 pr-7 rounded-none focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze cursor-pointer"
              >
                {BEDROOM_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sage">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div
          role="region"
          aria-label="Filter aktif"
          className="flex flex-wrap items-center gap-2 pt-1"
        >
          <span className="text-[11px] font-sans uppercase tracking-wider text-sage font-medium mr-1">
            Filter Aktif ({activeCount}):
          </span>

          {activeChips.map((chip) => (
            <span
              key={chip.id}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans bg-white border border-sand-dark/80 text-ink shadow-2xs"
            >
              <span>{chip.label}</span>
              <button
                type="button"
                onClick={() => removeChip(chip.id)}
                aria-label={`Hapus ${chip.label}`}
                className="text-sage hover:text-ink focus:outline-none focus:ring-1 focus:ring-bronze p-0.5 rounded-none"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-sans text-sage hover:text-bronze underline underline-offset-4 focus:outline-none focus:ring-1 focus:ring-bronze ml-2 py-0.5"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Seluruh Filter</span>
          </button>
        </div>
      )}

      {/* Mobile Drawer Modal */}
      <MobileFilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        filters={filters}
        onApply={(draft) => onChange(draft)}
        cities={cities}
        totalResults={totalResults}
        triggerRef={mobileTriggerRef}
      />
    </div>
  );
}

