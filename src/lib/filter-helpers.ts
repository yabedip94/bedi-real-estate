import type { ListingStatus, PropertyType } from "@/types/property";
import type { PriceRangePreset, PropertyFilterState } from "@/types/filters";

export interface FilterOption<T> {
  value: T;
  label: string;
}

export const STATUS_OPTIONS: FilterOption<ListingStatus | "all">[] = [
  { value: "all", label: "Semua Status" },
  { value: "dijual", label: "Dijual" },
  { value: "disewa", label: "Disewa" },
];

export const PROPERTY_TYPE_OPTIONS: FilterOption<PropertyType | "all">[] = [
  { value: "all", label: "Semua Tipe" },
  { value: "rumah", label: "Rumah" },
  { value: "vila", label: "Vila" },
  { value: "apartemen", label: "Apartemen" },
  { value: "townhouse", label: "Townhouse" },
  { value: "komersial", label: "Komersial" },
];

export const PRICE_RANGE_OPTIONS: FilterOption<PriceRangePreset>[] = [
  { value: "all", label: "Semua Rentang Harga" },
  { value: "under-5b", label: "< Rp 5 Miliar" },
  { value: "5b-15b", label: "Rp 5 – 15 Miliar" },
  { value: "above-15b", label: "> Rp 15 Miliar" },
];

export const BEDROOM_OPTIONS: FilterOption<number | "all">[] = [
  { value: "all", label: "Semua Kamar" },
  { value: 3, label: "3+ Kamar" },
  { value: 4, label: "4+ Kamar" },
  { value: 5, label: "5+ Kamar" },
  { value: 6, label: "6+ Kamar" },
];

export interface ActiveFilterChip {
  id: keyof PropertyFilterState;
  label: string;
}

/**
 * Derives human-readable active filter labels for display in active filter chips.
 */
export function getActiveFilterChips(filters: PropertyFilterState): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  const trimmedKeyword = filters.keyword.trim();
  if (trimmedKeyword.length > 0) {
    chips.push({
      id: "keyword",
      label: `Kata Kunci: "${trimmedKeyword}"`,
    });
  }

  if (filters.status !== "all") {
    const opt = STATUS_OPTIONS.find((o) => o.value === filters.status);
    chips.push({
      id: "status",
      label: `Status: ${opt ? opt.label : filters.status}`,
    });
  }

  if (filters.type !== "all") {
    const opt = PROPERTY_TYPE_OPTIONS.find((o) => o.value === filters.type);
    chips.push({
      id: "type",
      label: `Tipe: ${opt ? opt.label : filters.type}`,
    });
  }

  if (filters.city !== "all") {
    chips.push({
      id: "city",
      label: `Lokasi: ${filters.city}`,
    });
  }

  if (filters.priceRange !== "all") {
    const opt = PRICE_RANGE_OPTIONS.find((o) => o.value === filters.priceRange);
    chips.push({
      id: "priceRange",
      label: `Harga: ${opt ? opt.label : filters.priceRange}`,
    });
  }

  if (filters.minBedrooms !== "all") {
    chips.push({
      id: "minBedrooms",
      label: `Kamar: ${filters.minBedrooms}+ KT`,
    });
  }

  return chips;
}

