import { PROPERTIES } from "../data/properties.ts";
import type { Property } from "../types/property.ts";

/**
 * Retrieves a property record by its slug.
 */
export function getPropertyBySlug(slug: string): Property | undefined {
  if (!slug || typeof slug !== "string") {
    return undefined;
  }
  return PROPERTIES.find((property) => property.slug === slug);
}

/**
 * Returns all available property slugs for static route generation.
 */
export function getAllPropertySlugs(): string[] {
  return PROPERTIES.map((property) => property.slug);
}

export interface DetailMetadataResult {
  title: string;
  description: string;
  openGraph?: {
    title: string;
    description: string;
    type: "website";
    images: Array<{ url: string; alt: string }>;
  };
}

/**
 * Builds standard metadata for a property detail page.
 */
export function buildPropertyMetadata(
  property: Property | undefined
): DetailMetadataResult {
  if (!property) {
    return {
      title: "Properti Tidak Ditemukan | NARA ESTATE",
      description: "Properti tidak tersedia dalam kurasi NARA ESTATE.",
    };
  }

  const primaryImage =
    property.images[0] ?? property.images.find((img) => img.isPrimary);

  return {
    title: `${property.title} | NARA ESTATE`,
    description: `${property.tagline} — ${property.location.area}, ${property.location.city}. Luas Bangunan ${property.specs.buildingArea}m².`,
    openGraph: {
      title: `${property.title} | NARA ESTATE`,
      description: property.tagline,
      type: "website",
      images: primaryImage
        ? [
            {
              url: primaryImage.url,
              alt: primaryImage.alt,
            },
          ]
        : [],
    },
  };
}
