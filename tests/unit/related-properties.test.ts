import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calculateRelevanceScore,
  getRelatedProperties,
} from "../../src/lib/related-properties.ts";
import { PROPERTIES } from "../../src/data/properties.ts";
import type { Property } from "../../src/types/property.ts";

describe("related properties engine", () => {
  const propertyA: Property = {
    id: "prop-a",
    code: "NRE-JKT-001",
    slug: "property-a",
    title: "Property A",
    tagline: "Tagline A",
    description: "Desc A",
    status: "dijual",
    type: "rumah",
    price: 30_000_000_000,
    location: {
      address: "Jl. Menteng 1",
      area: "Menteng",
      city: "Jakarta Pusat",
      province: "DKI Jakarta",
    },
    specs: {
      landArea: 500,
      buildingArea: 600,
      bedrooms: 4,
      bathrooms: 4,
    },
    facilities: ["Pool"],
    images: [{ url: "https://example.com/a.jpg", alt: "A", isPrimary: true }],
    isFeatured: true,
    createdAt: "2026-01-01T00:00:00Z",
  };

  const propertySameCityAndType: Property = {
    ...propertyA,
    id: "prop-b",
    slug: "property-b",
    title: "Property B",
    price: 35_000_000_000, // Within 35%
    createdAt: "2026-01-02T00:00:00Z",
  };

  const propertySameCityDiffType: Property = {
    ...propertyA,
    id: "prop-c",
    slug: "property-c",
    title: "Property C",
    type: "apartemen",
    price: 32_000_000_000,
    createdAt: "2026-01-03T00:00:00Z",
  };

  const propertySameProvDiffCity: Property = {
    ...propertyA,
    id: "prop-c2",
    slug: "property-c2",
    title: "Property C2",
    location: {
      address: "Jl. Senopati 1",
      area: "Senopati",
      city: "Jakarta Selatan",
      province: "DKI Jakarta", // Same province (+1), different city
    },
    type: "apartemen",
    price: 32_000_000_000,
    createdAt: "2026-01-03T12:00:00Z",
  };

  const propertyDiffCityDiffType: Property = {
    ...propertyA,
    id: "prop-d",
    slug: "property-d",
    title: "Property D",
    location: {
      address: "Jl. Dago 1",
      area: "Dago",
      city: "Bandung",
      province: "Jawa Barat",
    },
    type: "vila",
    price: 15_000_000_000,
    createdAt: "2026-01-04T00:00:00Z",
  };

  const rentalProperty: Property = {
    ...propertyA,
    id: "prop-e",
    slug: "property-e",
    title: "Property E",
    status: "disewa",
    price: 800_000_000,
    pricePeriod: "tahun",
    createdAt: "2026-01-05T00:00:00Z",
  };

  describe("calculateRelevanceScore", () => {
    it("awards highest points for matching city (+3), type (+2), status (+1), and compatible price (+1)", () => {
      const score = calculateRelevanceScore(propertySameCityAndType, propertyA);
      // City: 3, Type: 2, Status: 1, Price proximity: 1 -> Total = 7
      assert.equal(score, 7);
    });

    it("awards partial points when type differs", () => {
      const score = calculateRelevanceScore(propertySameCityDiffType, propertyA);
      // City: 3, Type: 0, Status: 1, Price proximity: 1 -> Total = 5
      assert.equal(score, 5);
    });

    it("awards same province points (+1) when city differs but province matches", () => {
      const score = calculateRelevanceScore(propertySameProvDiffCity, propertyA);
      // City diff (0), Prov same (+1), Type diff (0), Status same (+1), Price compatible (+1) -> Total = 3
      assert.equal(score, 3);
    });

    it("does not compare prices between sale and lease (incompatible status)", () => {
      const score = calculateRelevanceScore(rentalProperty, propertyA);
      // City: 3, Type: 2, Status: 0, Price: 0 (incompatible status) -> Total = 5
      assert.equal(score, 5);
    });

    it("awards 0 for completely distinct location, type, and status", () => {
      const score = calculateRelevanceScore(propertyDiffCityDiffType, rentalProperty);
      // City diff (0), Prov diff (0), Type diff (0), Status diff (0), Price incompatible (0) -> 0
      assert.equal(score, 0);
    });
  });

  describe("getRelatedProperties", () => {
    it("strictly excludes the current property from recommendations", () => {
      const catalog = [propertyA, propertySameCityAndType, propertySameCityDiffType];
      const related = getRelatedProperties(propertyA, catalog);

      assert.ok(!related.some((p) => p.id === propertyA.id));
      assert.equal(related.length, 2);
    });

    it("ranks candidates by relevance score descending", () => {
      const catalog = [
        propertyDiffCityDiffType, // score 0
        propertySameCityDiffType, // score 5
        propertySameCityAndType,  // score 7
      ];

      const related = getRelatedProperties(propertyA, catalog);
      assert.equal(related[0].id, "prop-b"); // highest score (7)
      assert.equal(related[1].id, "prop-c"); // second highest (5)
      assert.equal(related[2].id, "prop-d"); // lowest score (0)
    });

    it("breaks ties deterministically using isFeatured, then createdAt, then id", () => {
      const propTie1: Property = {
        ...propertyA,
        id: "prop-tie-1",
        slug: "prop-tie-1",
        isFeatured: false,
        createdAt: "2026-01-01T00:00:00Z",
      };
      const propTie2Featured: Property = {
        ...propertyA,
        id: "prop-tie-2",
        slug: "prop-tie-2",
        isFeatured: true,
        createdAt: "2026-01-01T00:00:00Z",
      };
      const propTie3Newer: Property = {
        ...propertyA,
        id: "prop-tie-3",
        slug: "prop-tie-3",
        isFeatured: false,
        createdAt: "2026-01-02T00:00:00Z",
      };

      // All score identically against propertyA
      const related = getRelatedProperties(propertyA, [propTie1, propTie2Featured, propTie3Newer]);

      // Featured property comes first
      assert.equal(related[0].id, "prop-tie-2");
      // Newer non-featured property comes second
      assert.equal(related[1].id, "prop-tie-3");
      // Older non-featured property comes third
      assert.equal(related[2].id, "prop-tie-1");
    });

    it("respects the requested limit parameter (defaults to 3)", () => {
      const catalog = [
        propertyA,
        propertySameCityAndType,
        propertySameCityDiffType,
        propertyDiffCityDiffType,
        rentalProperty,
      ];

      const relatedDefault = getRelatedProperties(propertyA, catalog);
      assert.equal(relatedDefault.length, 3);

      const relatedLimit2 = getRelatedProperties(propertyA, catalog, 2);
      assert.equal(relatedLimit2.length, 2);
    });

    it("handles empty catalog and empty limit gracefully", () => {
      assert.deepEqual(getRelatedProperties(propertyA, []), []);
      assert.deepEqual(getRelatedProperties(propertyA, [propertySameCityAndType], 0), []);
    });

    it("verifies with real dataset: every property receives exactly 3 distinct related properties", () => {
      PROPERTIES.forEach((prop) => {
        const related = getRelatedProperties(prop, PROPERTIES, 3);
        assert.equal(related.length, 3, `Property ${prop.slug} should receive 3 related properties`);
        assert.ok(!related.some((r) => r.id === prop.id), `Property ${prop.slug} must not include itself`);

        // IDs must be unique
        const ids = new Set(related.map((r) => r.id));
        assert.equal(ids.size, 3, `Related properties for ${prop.slug} must be unique`);
      });
    });

    it("guarantees immutability of the input catalog", () => {
      const originalCatalog = [...PROPERTIES];
      getRelatedProperties(PROPERTIES[0], originalCatalog, 3);
      assert.deepEqual(originalCatalog, PROPERTIES);
    });
  });

  describe("dataset integrity validation", () => {
    it("ensures exactly 12 property records exist", () => {
      assert.equal(PROPERTIES.length, 12);
    });

    it("ensures every property slug is unique", () => {
      const slugs = PROPERTIES.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);
      assert.equal(uniqueSlugs.size, 12);
    });

    it("ensures every property has 4 to 5 images", () => {
      PROPERTIES.forEach((prop) => {
        assert.ok(
          prop.images.length >= 4 && prop.images.length <= 5,
          `Property ${prop.slug} has ${prop.images.length} images; expected 4-5`
        );
      });
    });

    it("ensures exactly one primary image exists per property", () => {
      PROPERTIES.forEach((prop) => {
        const primaryImages = prop.images.filter((img) => img.isPrimary);
        assert.equal(
          primaryImages.length,
          1,
          `Property ${prop.slug} must have exactly one primary image`
        );
        assert.equal(
          prop.images[0].isPrimary,
          true,
          `Slot 0 of property ${prop.slug} must be the primary image`
        );
      });
    });

    it("verifies exact certificate distribution: SHM 8, HGB 2, Strata Title 2", () => {
      const distribution: Record<string, number> = {};
      PROPERTIES.forEach((prop) => {
        const cert = prop.specs?.certificate;
        if (cert) {
          distribution[cert] = (distribution[cert] || 0) + 1;
        }
      });

      assert.equal(distribution["SHM"], 8, "Expected exactly 8 SHM certificates");
      assert.equal(distribution["HGB"], 2, "Expected exactly 2 HGB certificates");
      assert.equal(distribution["Strata Title"], 2, "Expected exactly 2 Strata Title certificates");
      assert.equal(
        (distribution["SHM"] || 0) + (distribution["HGB"] || 0) + (distribution["Strata Title"] || 0),
        12,
        "Total certificates must equal 12"
      );
    });
  });
});
