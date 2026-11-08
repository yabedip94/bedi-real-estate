import type { Property } from "@/types/property";
import { PropertyCard, toPropertyCardData } from "./PropertyCard";
import { PropertyEmptyState } from "./PropertyEmptyState";

export interface PropertyGridProps {
  properties: Property[];
  totalCount: number;
  onResetFilters: () => void;
  keyword?: string;
}

export function PropertyGrid({
  properties,
  totalCount,
  onResetFilters,
  keyword,
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="py-6">
        <PropertyEmptyState onReset={onResetFilters} keyword={keyword} />
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label={`Daftar ${properties.length} properti terkurasi dari total ${totalCount}`}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
    >
      {properties.map((property) => {
        const cardData = toPropertyCardData(property);
        return <PropertyCard key={property.id} property={cardData} />;
      })}
    </div>
  );
}

