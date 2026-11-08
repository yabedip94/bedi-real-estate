import type { ListingStatus, PropertyType } from "@/types/property";
import type {
  PriceRangePreset,
  PropertyFilterState,
  SortOption,
} from "@/types/filters";
import { DEFAULT_FILTER_STATE } from "./property-filters.ts";
import { PROPERTY_CITIES } from "../data/properties.ts";
import {
  STATUS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PRICE_RANGE_OPTIONS,
  BEDROOM_OPTIONS,
} from "./filter-helpers.ts";

const VALID_STATUSES: Set<ListingStatus> = new Set(
  STATUS_OPTIONS.map((o) => o.value).filter(
    (v): v is ListingStatus => v !== "all"
  )
);

const VALID_TYPES: Set<PropertyType> = new Set(
  PROPERTY_TYPE_OPTIONS.map((o) => o.value).filter(
    (v): v is PropertyType => v !== "all"
  )
);

const VALID_PRICE_RANGES: Set<PriceRangePreset> = new Set(
  PRICE_RANGE_OPTIONS.map((o) => o.value).filter(
    (v): v is PriceRangePreset => v !== "all"
  )
);

const VALID_BEDROOMS: Set<number> = new Set(
  BEDROOM_OPTIONS.map((o) => o.value).filter(
    (v): v is number => typeof v === "number"
  )
);

const VALID_SORT_OPTIONS: Set<SortOption> = new Set([
  "featured",
  "newest",
  "price-asc",
  "price-desc",
  "land-area-desc",
]);

const MANAGED_PARAM_KEYS = [
  "q",
  "status",
  "type",
  "city",
  "priceRange",
  "minBedrooms",
  "sortBy",
] as const;

/**
 * Safely parses URL search parameters into a strongly-typed PropertyFilterState.
 * Invalid or missing parameters safely fall back to DEFAULT_FILTER_STATE values.
 */
export function parseFilterParams(params: URLSearchParams): PropertyFilterState {
  // Keyword: support "q" primarily, with fallback to "keyword"
  const rawKeyword = params.get("q") ?? params.get("keyword") ?? "";
  const keyword = rawKeyword.trim();

  // Status
  const rawStatus = (params.get("status") ?? "all").trim();
  const status: ListingStatus | "all" = VALID_STATUSES.has(
    rawStatus as ListingStatus
  )
    ? (rawStatus as ListingStatus)
    : DEFAULT_FILTER_STATE.status;

  // Type
  const rawType = (params.get("type") ?? "all").trim();
  const type: PropertyType | "all" = VALID_TYPES.has(rawType as PropertyType)
    ? (rawType as PropertyType)
    : DEFAULT_FILTER_STATE.type;

  // City: match against PROPERTY_CITIES case-insensitively
  const rawCity = (params.get("city") ?? "all").trim();
  let city: string = DEFAULT_FILTER_STATE.city;
  if (rawCity !== "all" && rawCity.length > 0) {
    const matchedCity = PROPERTY_CITIES.find(
      (c) => c.toLowerCase() === rawCity.toLowerCase()
    );
    if (matchedCity) {
      city = matchedCity;
    }
  }

  // Price Range
  const rawPriceRange = (params.get("priceRange") ?? "all").trim();
  const priceRange: PriceRangePreset = VALID_PRICE_RANGES.has(
    rawPriceRange as PriceRangePreset
  )
    ? (rawPriceRange as PriceRangePreset)
    : DEFAULT_FILTER_STATE.priceRange;

  // Minimum Bedrooms
  const rawMinBedrooms = params.get("minBedrooms");
  let minBedrooms: number | "all" = DEFAULT_FILTER_STATE.minBedrooms;
  if (rawMinBedrooms !== null && rawMinBedrooms.trim() !== "") {
    const parsed = parseInt(rawMinBedrooms.trim(), 10);
    if (!isNaN(parsed) && VALID_BEDROOMS.has(parsed)) {
      minBedrooms = parsed;
    }
  }

  // Sort By
  const rawSortBy = (params.get("sortBy") ?? "featured").trim();
  const sortBy: SortOption = VALID_SORT_OPTIONS.has(rawSortBy as SortOption)
    ? (rawSortBy as SortOption)
    : DEFAULT_FILTER_STATE.sortBy;

  return {
    keyword,
    status,
    type,
    city,
    priceRange,
    minBedrooms,
    sortBy,
  };
}

/**
 * Serializes PropertyFilterState into a clean URL query string without leading '?'.
 * Omits default parameters, preserves unrelated parameters, and enforces deterministic key ordering.
 */
export function serializeFilterParams(
  filters: PropertyFilterState,
  currentParams?: URLSearchParams
): string {
  const params = currentParams
    ? new URLSearchParams(currentParams.toString())
    : new URLSearchParams();

  // Delete legacy parameter if present
  params.delete("keyword");

  // 1. Keyword (q)
  const trimmedKeyword = filters.keyword.trim();
  if (trimmedKeyword.length > 0) {
    params.set("q", trimmedKeyword);
  } else {
    params.delete("q");
  }

  // 2. Status
  if (filters.status !== "all" && VALID_STATUSES.has(filters.status)) {
    params.set("status", filters.status);
  } else {
    params.delete("status");
  }

  // 3. Type
  if (filters.type !== "all" && VALID_TYPES.has(filters.type)) {
    params.set("type", filters.type);
  } else {
    params.delete("type");
  }

  // 4. City
  if (
    filters.city !== "all" &&
    PROPERTY_CITIES.some(
      (c) => c.toLowerCase() === filters.city.trim().toLowerCase()
    )
  ) {
    const matchedCity = PROPERTY_CITIES.find(
      (c) => c.toLowerCase() === filters.city.trim().toLowerCase()
    )!;
    params.set("city", matchedCity);
  } else {
    params.delete("city");
  }

  // 5. Price Range
  if (
    filters.priceRange !== "all" &&
    VALID_PRICE_RANGES.has(filters.priceRange)
  ) {
    params.set("priceRange", filters.priceRange);
  } else {
    params.delete("priceRange");
  }

  // 6. Minimum Bedrooms
  if (
    filters.minBedrooms !== "all" &&
    VALID_BEDROOMS.has(filters.minBedrooms)
  ) {
    params.set("minBedrooms", String(filters.minBedrooms));
  } else {
    params.delete("minBedrooms");
  }

  // 7. Sort By
  if (
    filters.sortBy !== "featured" &&
    VALID_SORT_OPTIONS.has(filters.sortBy)
  ) {
    params.set("sortBy", filters.sortBy);
  } else {
    params.delete("sortBy");
  }

  // Deterministic ordering: managed parameters first in fixed order, then unrelated parameters alphabetically
  const orderedParams = new URLSearchParams();

  for (const key of MANAGED_PARAM_KEYS) {
    if (params.has(key)) {
      orderedParams.set(key, params.get(key)!);
    }
  }

  const unrelatedKeys = Array.from(params.keys())
    .filter((k) => !(MANAGED_PARAM_KEYS as readonly string[]).includes(k))
    .sort();

  for (const key of unrelatedKeys) {
    const values = params.getAll(key);
    for (const val of values) {
      orderedParams.append(key, val);
    }
  }

  return orderedParams.toString();
}
