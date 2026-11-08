/**
 * NARA ESTATE — Related Properties Curation Engine
 * Deterministically curates related properties based on location,
 * architectural property type, transaction status, and compatible price proximity.
 */

import type { Property } from "@/types/property";

/**
 * Calculates an architectural and contextual relevance score between
 * a candidate property and the active property.
 */
export function calculateRelevanceScore(
  candidate: Property,
  current: Property
): number {
  let score = 0;

  // 1. Same city has highest contextual proximity (+3)
  if (
    candidate.location.city.toLowerCase() === current.location.city.toLowerCase()
  ) {
    score += 3;
  } else if (
    candidate.location.province.toLowerCase() ===
    current.location.province.toLowerCase()
  ) {
    // Same province (+1) if different city
    score += 1;
  }

  // 2. Same architectural property type (+2)
  if (candidate.type === current.type) {
    score += 2;
  }

  // 3. Same transaction status (+1)
  if (candidate.status === current.status) {
    score += 1;
  }

  // 4. Compatible Price Comparison (+1)
  // CRITICAL: Only evaluate price proximity if status AND pricePeriod are compatible!
  // Comparing sale (tens of billions) with annual lease (hundreds of millions) is strictly prevented.
  const isStatusCompatible = candidate.status === current.status;
  const isPeriodCompatible =
    candidate.status === "dijual" ||
    candidate.pricePeriod === current.pricePeriod;

  if (
    isStatusCompatible &&
    isPeriodCompatible &&
    candidate.price > 0 &&
    current.price > 0
  ) {
    const minPrice = Math.min(candidate.price, current.price);
    const maxPrice = Math.max(candidate.price, current.price);
    if (minPrice / maxPrice >= 0.65) {
      score += 1; // Within 35% price range
    }
  }

  return score;
}

/**
 * Returns a deterministically curated list of related properties for a given property.
 *
 * Requirements:
 * - Strictly excludes the currently viewed property (candidate.id !== current.id).
 * - Sorts candidates by relevance score descending.
 * - Deterministic multi-tier tie-breaking using guaranteed domain fields:
 *   1. isFeatured (featured properties first)
 *   2. createdAt descending (newest first)
 *   3. id ascending (guarantees idempotent results)
 * - Slices up to the requested limit (defaults to 3).
 * - Always returns a new array without mutating input.
 * - When fewer than 3 high-score matches exist, fills remaining slots with top overall
 *   properties from the catalog, ensuring a complete 3-card presentation.
 */
export function getRelatedProperties(
  current: Property,
  catalog: Property[],
  limit = 3
): Property[] {
  if (!catalog || catalog.length === 0 || limit <= 0) {
    return [];
  }

  // Strict exclusion of the current property
  const candidates = catalog.filter((item) => item.id !== current.id);

  if (candidates.length === 0) {
    return [];
  }

  const scored = candidates.map((item) => ({
    property: item,
    score: calculateRelevanceScore(item, current),
  }));

  scored.sort((a, b) => {
    // 1. Primary: Score descending
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    // 2. Secondary: Featured first
    if (a.property.isFeatured !== b.property.isFeatured) {
      return a.property.isFeatured ? -1 : 1;
    }

    // 3. Tertiary: Newest createdAt descending
    const dateDiff = b.property.createdAt.localeCompare(a.property.createdAt);
    if (dateDiff !== 0) {
      return dateDiff;
    }

    // 4. Final tie-break: ID ascending
    return a.property.id.localeCompare(b.property.id);
  });

  return scored.slice(0, limit).map((entry) => entry.property);
}

