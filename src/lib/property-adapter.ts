import type { Property } from "@/types/property";
import { formatCompactIDR } from "./formatters.ts";

export interface PropertyCardData {
  title: string;
  slug: string;
  status: "dijual" | "disewa";
  type: string;
  priceFormatted: string;
  pricePeriod?: string;
  area: string;
  city: string;
  specs: {
    landArea?: number; // m² (optional for apartments / penthouses)
    buildingArea: number; // m²
    bedrooms: number;
    bathrooms: number;
  };
  imageUrl: string;
  imageAlt: string;
}

const TYPE_LABELS: Record<string, string> = {
  rumah: "Rumah",
  vila: "Vila",
  apartemen: "Apartemen",
  townhouse: "Townhouse",
  komersial: "Komersial",
};

/**
 * Adapter mapping domain Property model to presentation PropertyCardData.
 */
export function toPropertyCardData(property: Property): PropertyCardData {
  const primaryImage =
    property.images.find((img) => img.isPrimary) || property.images[0];

  return {
    title: property.title,
    slug: property.slug,
    status: property.status,
    type: TYPE_LABELS[property.type] || property.type,
    priceFormatted: formatCompactIDR(property.price),
    pricePeriod: property.pricePeriod,
    area: property.location.area,
    city: property.location.city,
    specs: property.specs,
    imageUrl: primaryImage?.url || "",
    imageAlt: primaryImage?.alt || property.title,
  };
}

