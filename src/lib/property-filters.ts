import type { Property } from "@/types/property";
import type { PropertyFilterState, SortOption } from "@/types/filters";

export const DEFAULT_FILTER_STATE: PropertyFilterState = {
  keyword: "",
  status: "all",
  type: "all",
  city: "all",
  priceRange: "all",
  minBedrooms: "all",
  sortBy: "featured",
};

/**
 * Checks if the current filter state differs from default values.
 * Note: `sortBy` is a presentation option, not an active filter criteria.
 */
export function hasActiveFilters(filters: PropertyFilterState): boolean {
  return (
    filters.keyword.trim().length > 0 ||
    filters.status !== "all" ||
    filters.type !== "all" ||
    filters.city !== "all" ||
    filters.priceRange !== "all" ||
    filters.minBedrooms !== "all"
  );
}

/**
 * Counts how many filter categories currently have non-default criteria applied.
 * `sortBy` is strictly excluded from active filter counts.
 */
export function getActiveFilterCount(filters: PropertyFilterState): number {
  let count = 0;
  if (filters.keyword.trim().length > 0) count++;
  if (filters.status !== "all") count++;
  if (filters.type !== "all") count++;
  if (filters.city !== "all") count++;
  if (filters.priceRange !== "all") count++;
  if (filters.minBedrooms !== "all") count++;
  return count;
}

/**
 * Filters a list of properties according to multiple criteria using logical AND.
 *
 * PRICE FILTERING BEHAVIOR:
 * - Uses raw numeric IDR values (`property.price`).
 * - Threshold boundaries:
 *     - "under-5b": price < 5.000.000.000
 *     - "5b-15b"  : price >= 5.000.000.000 && price <= 15.000.000.000
 *     - "above-15b": price > 15.000.000.000
 * - When `status === "all"`, numeric comparisons evaluate raw `price` without
 *   converting annual rental prices into purchase prices or vice versa.
 * - The original `property.status` remains untouched so caller and UI can
 *   render appropriate indicators (e.g., "/ tahun" suffix on rentals).
 * - Pair with `status: "dijual"` or `status: "disewa"` for segmented financial discovery.
 *
 * Returns a new array without mutating the input.
 */
export function filterProperties(
  properties: Property[],
  filters: PropertyFilterState
): Property[] {
  const query = filters.keyword.trim().toLowerCase();

  return properties.filter((property) => {
    // 1. Keyword search (case-insensitive substring across multiple relevant fields)
    if (query.length > 0) {
      const matchTitle = property.title.toLowerCase().includes(query);
      const matchCode = property.code.toLowerCase().includes(query);
      const matchArea = property.location.area.toLowerCase().includes(query);
      const matchCity = property.location.city.toLowerCase().includes(query);
      const matchProvince = property.location.province.toLowerCase().includes(query);
      const matchTagline = property.tagline.toLowerCase().includes(query);
      const matchDescription = property.description.toLowerCase().includes(query);

      const matchesKeyword =
        matchTitle ||
        matchCode ||
        matchArea ||
        matchCity ||
        matchProvince ||
        matchTagline ||
        matchDescription;

      if (!matchesKeyword) return false;
    }

    // 2. Transaction status (dijual | disewa)
    if (filters.status !== "all" && property.status !== filters.status) {
      return false;
    }

    // 3. Property type (rumah | vila | apartemen | townhouse | komersial)
    if (filters.type !== "all" && property.type !== filters.type) {
      return false;
    }

    // 4. City / Region
    if (
      filters.city !== "all" &&
      property.location.city.toLowerCase() !== filters.city.toLowerCase()
    ) {
      return false;
    }

    // 5. Price range presets (exact numeric IDR boundaries)
    if (filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "under-5b":
          if (property.price >= 5_000_000_000) return false;
          break;
        case "5b-15b":
          if (property.price < 5_000_000_000 || property.price > 15_000_000_000) {
            return false;
          }
          break;
        case "above-15b":
          if (property.price <= 15_000_000_000) return false;
          break;
      }
    }

    // 6. Minimum Bedrooms (bedrooms >= selectedValue)
    if (
      filters.minBedrooms !== "all" &&
      property.specs.bedrooms < filters.minBedrooms
    ) {
      return false;
    }

    return true;
  });
}

/**
 * Deterministically sorts an array of properties based on the selected SortOption.
 *
 * TIE-BREAKING CONTRACT:
 * - "featured"       : isFeatured (true first) -> createdAt desc -> ID asc (stable string compare)
 * - "newest"         : createdAt desc -> ID asc
 * - "price-asc"      : price asc -> createdAt desc -> ID asc
 * - "price-desc"     : price desc -> createdAt desc -> ID asc
 * - "land-area-desc" : landed first (landArea desc -> buildingArea desc -> ID asc),
 *                      non-landed after (buildingArea desc -> ID asc)
 *
 * Returns a new array without mutating the input.
 */
export function sortProperties(
  properties: Property[],
  sortBy: SortOption
): Property[] {
  const result = [...properties];

  switch (sortBy) {
    case "featured":
      return result.sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) {
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
        const dateDiff = Date.parse(b.createdAt) - Date.parse(a.createdAt);
        if (dateDiff !== 0) return dateDiff;
        return a.id.localeCompare(b.id);
      });

    case "newest":
      return result.sort((a, b) => {
        const dateDiff = Date.parse(b.createdAt) - Date.parse(a.createdAt);
        if (dateDiff !== 0) return dateDiff;
        return a.id.localeCompare(b.id);
      });

    case "price-asc":
      return result.sort((a, b) => {
        const priceDiff = a.price - b.price;
        if (priceDiff !== 0) return priceDiff;
        const dateDiff = Date.parse(b.createdAt) - Date.parse(a.createdAt);
        if (dateDiff !== 0) return dateDiff;
        return a.id.localeCompare(b.id);
      });

    case "price-desc":
      return result.sort((a, b) => {
        const priceDiff = b.price - a.price;
        if (priceDiff !== 0) return priceDiff;
        const dateDiff = Date.parse(b.createdAt) - Date.parse(a.createdAt);
        if (dateDiff !== 0) return dateDiff;
        return a.id.localeCompare(b.id);
      });

    case "land-area-desc":
      return result.sort((a, b) => {
        const areaA = a.specs.landArea;
        const areaB = b.specs.landArea;

        // Both landed: compare landArea descending, then buildingArea descending, then ID ascending
        if (areaA !== undefined && areaB !== undefined) {
          const diff = areaB - areaA;
          if (diff !== 0) return diff;
          const bldgDiff = b.specs.buildingArea - a.specs.buildingArea;
          if (bldgDiff !== 0) return bldgDiff;
          return a.id.localeCompare(b.id);
        }

        // Only a is landed: a comes first
        if (areaA !== undefined && areaB === undefined) {
          return -1;
        }

        // Only b is landed: b comes first
        if (areaA === undefined && areaB !== undefined) {
          return 1;
        }

        // Neither is landed (e.g. penthouses/apartments): sub-sort by buildingArea descending, then ID ascending
        const bldgDiff = b.specs.buildingArea - a.specs.buildingArea;
        if (bldgDiff !== 0) return bldgDiff;
        return a.id.localeCompare(b.id);
      });

    default:
      return result;
  }
}
