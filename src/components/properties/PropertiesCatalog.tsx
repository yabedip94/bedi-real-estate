"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { PROPERTIES, PROPERTY_CITIES } from "@/data/properties";
import {
  filterProperties,
  sortProperties,
  DEFAULT_FILTER_STATE,
} from "@/lib/property-filters";
import {
  parseFilterParams,
  serializeFilterParams,
} from "@/lib/catalog-params";
import type { PropertyFilterState, SortOption } from "@/types/filters";
import { PropertyFilterBar } from "./PropertyFilterBar";
import { PropertySortSelect } from "./PropertySortSelect";
import { PropertyGrid } from "./PropertyGrid";

export function PropertiesCatalog() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Initialize filter state from URL search params
  const [filters, setFilters] = useState<PropertyFilterState>(() =>
    parseFilterParams(searchParams)
  );

  // Synchronize state when browser Back/Forward navigation occurs
  useEffect(() => {
    const fromUrl = parseFilterParams(searchParams);
    setFilters((current) => {
      // Check if URL params actually differ from current state to prevent unnecessary re-renders
      if (
        current.keyword === fromUrl.keyword &&
        current.status === fromUrl.status &&
        current.type === fromUrl.type &&
        current.city === fromUrl.city &&
        current.priceRange === fromUrl.priceRange &&
        current.minBedrooms === fromUrl.minBedrooms &&
        current.sortBy === fromUrl.sortBy
      ) {
        return current;
      }
      return fromUrl;
    });
  }, [searchParams]);

  // Update filter state and synchronize URL search parameters cleanly without reload
  const handleFilterChange = useCallback(
    (newFilters: PropertyFilterState) => {
      setFilters(newFilters);
      const queryString = serializeFilterParams(newFilters, searchParams);
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      window.history.replaceState(null, "", url);
    },
    [pathname, searchParams]
  );

  // Reset filters while preserving current sortBy preference
  const handleResetFilters = useCallback(() => {
    handleFilterChange({
      ...DEFAULT_FILTER_STATE,
      sortBy: filters.sortBy,
    });
  }, [filters.sortBy, handleFilterChange]);

  // Update sort option
  const handleSortChange = useCallback(
    (newSortBy: SortOption) => {
      handleFilterChange({
        ...filters,
        sortBy: newSortBy,
      });
    },
    [filters, handleFilterChange]
  );

  // Pure callback for mobile drawer to calculate reactive draft result counts
  const handleGetDraftCount = useCallback((draft: PropertyFilterState): number => {
    return filterProperties(PROPERTIES, draft).length;
  }, []);

  // Compute filtered and sorted properties
  const filteredProperties = filterProperties(PROPERTIES, filters);
  const sortedProperties = sortProperties(filteredProperties, filters.sortBy);

  return (
    <div className="w-full space-y-8">
      {/* Filter Controls (Desktop Panel & Mobile Trigger) */}
      <PropertyFilterBar
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
        cities={PROPERTY_CITIES}
        totalResults={sortedProperties.length}
        onGetDraftCount={handleGetDraftCount}
      />

      {/* Catalog Toolbar: Dynamic Result Counter & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-dark/40">
        <div>
          <p className="text-xs sm:text-sm font-sans text-ink-muted">
            Menampilkan{" "}
            <span className="font-semibold text-ink">
              {sortedProperties.length}
            </span>{" "}
            dari {PROPERTIES.length} properti terkurasi
          </p>
        </div>

        <div>
          <PropertySortSelect
            value={filters.sortBy}
            onChange={handleSortChange}
          />
        </div>
      </div>

      {/* Property Cards Grid or Empty State */}
      <PropertyGrid
        properties={sortedProperties}
        totalCount={PROPERTIES.length}
        onResetFilters={handleResetFilters}
        keyword={filters.keyword}
      />
    </div>
  );
}

