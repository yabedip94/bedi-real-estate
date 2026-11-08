import { PropertyCard, toPropertyCardData } from "@/components/properties/PropertyCard";
import { getRelatedProperties } from "@/lib/related-properties";
import type { Property } from "@/types/property";

interface RelatedPropertiesSectionProps {
  currentProperty: Property;
  allProperties: Property[];
}

export function RelatedPropertiesSection({
  currentProperty,
  allProperties,
}: RelatedPropertiesSectionProps) {
  const related = getRelatedProperties(currentProperty, allProperties, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-heading" className="space-y-6 pt-10 border-t border-sand-dark/60">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
        <div className="space-y-1">
          <span className="text-xs font-sans uppercase tracking-widest text-bronze-dark font-medium">
            Kurasi Sejenis
          </span>
          <h2 id="related-heading" className="text-2xl md:text-3xl font-serif font-semibold text-ink">
            Properti Arsitektural Terkait
          </h2>
        </div>
        <p className="text-xs font-sans text-sage-dark max-w-md">
          Hunian pilihan dengan karakteristik lokasi, tipologi arsitektur, dan nilai investasi komparabel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {related.map((property) => (
          <PropertyCard
            key={property.id}
            property={toPropertyCardData(property)}
          />
        ))}
      </div>
    </section>
  );
}
