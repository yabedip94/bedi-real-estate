import type { ListingStatus, PropertyType } from "./property";

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "land-area-desc";

export type PriceRangePreset =
  | "all"
  | "under-5b" // < Rp 5 Miliar
  | "5b-15b" // Rp 5 Miliar – Rp 15 Miliar
  | "above-15b"; // > Rp 15 Miliar

export interface PropertyFilterState {
  keyword: string;
  status: ListingStatus | "all";
  type: PropertyType | "all";
  city: string | "all";
  priceRange: PriceRangePreset;
  minBedrooms: number | "all";
  sortBy: SortOption;
}
