"use client";

import { useEffect, useRef, useState } from "react";
import { X, Search, RotateCcw } from "lucide-react";
import type { PropertyFilterState } from "@/types/filters";
import { DEFAULT_FILTER_STATE } from "@/lib/property-filters";
import {
  STATUS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PRICE_RANGE_OPTIONS,
  BEDROOM_OPTIONS,
} from "@/lib/filter-helpers";

export interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: PropertyFilterState;
  onApply: (draftFilters: PropertyFilterState) => void;
  cities: string[];
  totalResults?: number;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApply,
  cities,
  totalResults,
  triggerRef,
}: MobileFilterDrawerProps) {
  // Mobile selections must use a draft state
  const [draft, setDraft] = useState<PropertyFilterState>(filters);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Synchronize draft filters whenever drawer opens
  useEffect(() => {
    if (isOpen) {
      setDraft(filters);
    }
  }, [isOpen, filters]);

  // Body scroll lock and focus management
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const triggerNode = triggerRef.current;

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      // Restore focus to trigger button
      triggerNode?.focus();
    };
  }, [isOpen, triggerRef]);

  // Handle Escape key and focus trap
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }

    if (e.key === "Tab" && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  if (!isOpen) return null;

  const handleResetDraft = () => {
    setDraft({
      ...DEFAULT_FILTER_STATE,
      sortBy: draft.sortBy,
    });
  };

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex justify-end"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Dialog Container */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-filter-title"
        className="relative z-10 w-full max-w-md bg-white h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sand-dark/40 bg-limestone/40">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-sage font-medium block">
              Kurasi Properti
            </span>
            <h2
              id="mobile-filter-title"
              className="font-serif text-2xl font-semibold text-ink"
            >
              Filter Properti
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup panel filter"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-ink hover:text-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-bronze"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Kata Kunci */}
          <div className="space-y-2">
            <label
              htmlFor="mobile-filter-keyword"
              className="block text-xs font-sans uppercase tracking-wider text-sage font-semibold"
            >
              Kata Kunci
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage pointer-events-none" />
              <input
                id="mobile-filter-keyword"
                type="text"
                value={draft.keyword}
                onChange={(e) => setDraft({ ...draft, keyword: e.target.value })}
                placeholder="Nama properti, area, kota..."
                className="w-full bg-white border border-sand-dark/60 text-ink text-sm font-sans pl-10 pr-9 py-2.5 rounded-none focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze"
              />
              {draft.keyword.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => setDraft({ ...draft, keyword: "" })}
                  aria-label="Hapus kata kunci"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-sage hover:text-ink focus:outline-none"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Status Transaksi */}
          <div className="space-y-2">
            <label
              htmlFor="mobile-filter-status"
              className="block text-xs font-sans uppercase tracking-wider text-sage font-semibold"
            >
              Status Transaksi
            </label>
            <div className="relative">
              <select
                id="mobile-filter-status"
                value={draft.status}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    status: e.target.value as PropertyFilterState["status"],
                  })
                }
                className="w-full appearance-none bg-white border border-sand-dark/60 text-ink text-sm font-sans px-3.5 py-2.5 pr-8 rounded-none focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze cursor-pointer"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-sage">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
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
          <div className="space-y-2">
            <label
              htmlFor="mobile-filter-type"
              className="block text-xs font-sans uppercase tracking-wider text-sage font-semibold"
            >
              Tipe Properti
            </label>
            <div className="relative">
              <select
                id="mobile-filter-type"
                value={draft.type}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    type: e.target.value as PropertyFilterState["type"],
                  })
                }
                className="w-full appearance-none bg-white border border-sand-dark/60 text-ink text-sm font-sans px-3.5 py-2.5 pr-8 rounded-none focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze cursor-pointer"
              >
                {PROPERTY_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-sage">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
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
          <div className="space-y-2">
            <label
              htmlFor="mobile-filter-city"
              className="block text-xs font-sans uppercase tracking-wider text-sage font-semibold"
            >
              Lokasi / Kota
            </label>
            <div className="relative">
              <select
                id="mobile-filter-city"
                value={draft.city}
                onChange={(e) => setDraft({ ...draft, city: e.target.value })}
                className="w-full appearance-none bg-white border border-sand-dark/60 text-ink text-sm font-sans px-3.5 py-2.5 pr-8 rounded-none focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze cursor-pointer"
              >
                <option value="all">Semua Lokasi</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-sage">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
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
          <div className="space-y-2">
            <label
              htmlFor="mobile-filter-price-range"
              className="block text-xs font-sans uppercase tracking-wider text-sage font-semibold"
            >
              Rentang Harga
            </label>
            <div className="relative">
              <select
                id="mobile-filter-price-range"
                value={draft.priceRange}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    priceRange: e.target.value as PropertyFilterState["priceRange"],
                  })
                }
                className="w-full appearance-none bg-white border border-sand-dark/60 text-ink text-sm font-sans px-3.5 py-2.5 pr-8 rounded-none focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze cursor-pointer"
              >
                {PRICE_RANGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-sage">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Kamar Tidur Minimum */}
          <div className="space-y-2">
            <label
              htmlFor="mobile-filter-min-bedrooms"
              className="block text-xs font-sans uppercase tracking-wider text-sage font-semibold"
            >
              Kamar Tidur Minimum
            </label>
            <div className="relative">
              <select
                id="mobile-filter-min-bedrooms"
                value={draft.minBedrooms}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    minBedrooms:
                      e.target.value === "all" ? "all" : Number(e.target.value),
                  })
                }
                className="w-full appearance-none bg-white border border-sand-dark/60 text-ink text-sm font-sans px-3.5 py-2.5 pr-8 rounded-none focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze cursor-pointer"
              >
                {BEDROOM_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-sage">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
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

        {/* Sticky Drawer Footer */}
        <div className="border-t border-sand-dark/40 bg-sand/20 px-6 py-4 flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDraft}
            className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-3 border border-sand-dark/80 bg-white text-ink text-xs uppercase tracking-wider font-sans font-semibold hover:border-bronze hover:text-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-bronze rounded-none"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-[2] min-h-[44px] inline-flex items-center justify-center px-4 py-3 bg-ink text-limestone text-xs uppercase tracking-widest font-sans font-semibold hover:bg-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-bronze rounded-none"
          >
            {totalResults !== undefined
              ? `Terapkan (${totalResults})`
              : "Terapkan Filter"}
          </button>
        </div>
      </div>
    </div>
  );
}
