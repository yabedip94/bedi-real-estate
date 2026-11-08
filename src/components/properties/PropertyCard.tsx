import Image from "next/image";
import Link from "next/link";
import type { PropertyCardData } from "@/lib/property-adapter";
export type { PropertyCardData } from "@/lib/property-adapter";
export { toPropertyCardData } from "@/lib/property-adapter";

export function PropertyCard({ property }: { property: PropertyCardData }) {
  return (
    <article className="group relative bg-white border border-sand-dark/60 rounded-sm overflow-hidden flex flex-col transition-all duration-500 hover:border-bronze/60 hover:shadow-sm">
      {/* Visual Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
        <Image
          src={property.imageUrl}
          alt={property.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {/* Stone Status Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 text-[11px] font-sans font-semibold uppercase tracking-wider bg-limestone text-ink border border-sand-dark/80 shadow-xs rounded-none">
            {property.status === "dijual" ? "Dijual" : "Disewa"}
          </span>
          <span className="px-2.5 py-1 text-[11px] font-sans font-medium uppercase tracking-wider bg-ink text-white border border-ink/80 shadow-xs rounded-none">
            {property.type}
          </span>
        </div>
      </div>

      {/* Editorial Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <p className="text-xs font-sans uppercase tracking-widest text-sage">
            {property.area}, {property.city}
          </p>
          <h3 className="text-xl font-serif font-semibold text-ink leading-snug group-hover:text-bronze-dark transition-colors duration-300">
            <Link href={`/properties/${property.slug}`} className="focus:outline-none focus:underline">
              {property.title}
            </Link>
          </h3>
          <p className="text-lg font-serif font-bold text-ink tabular-nums pt-1">
            {property.priceFormatted}
            {property.pricePeriod && (
              <span className="text-xs font-sans font-normal text-sage pl-1">
                / {property.pricePeriod}
              </span>
            )}
          </p>
        </div>

        {/* Architectural Specs Ribbon */}
        <div className="pt-3 border-t border-sand-dark/40 flex items-center justify-between text-xs font-sans text-ink-muted tabular-nums">
          {property.specs.landArea !== undefined ? (
            <>
              <span>LT {property.specs.landArea} m²</span>
              <span className="text-sand-dark">·</span>
            </>
          ) : null}
          <span>LB {property.specs.buildingArea} m²</span>
          <span className="text-sand-dark">·</span>
          <span>{property.specs.bedrooms} KT</span>
          <span className="text-sand-dark">·</span>
          <span>{property.specs.bathrooms} KM</span>
        </div>
      </div>
    </article>
  );
}
