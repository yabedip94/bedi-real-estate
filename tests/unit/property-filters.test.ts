import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { PROPERTIES } from "../../src/data/properties.ts";
import {
  DEFAULT_FILTER_STATE,
  filterProperties,
  sortProperties,
  hasActiveFilters,
  getActiveFilterCount,
} from "../../src/lib/property-filters.ts";
import type { PropertyFilterState } from "../../src/types/filters.ts";
import type { Property } from "../../src/types/property.ts";

// Helper function to create synthetic minimal property fixtures for unit testing
function createSyntheticProperty(overrides: Partial<Property> = {}): Property {
  return {
    id: overrides.id ?? "synth-01",
    code: overrides.code ?? "SYN-001",
    slug: overrides.slug ?? "synthetic-property",
    title: overrides.title ?? "Synthetic Title",
    tagline: overrides.tagline ?? "Synthetic Tagline",
    description: overrides.description ?? "Synthetic Description",
    status: overrides.status ?? "dijual",
    type: overrides.type ?? "rumah",
    price: overrides.price ?? 10_000_000_000,
    pricePeriod: overrides.pricePeriod,
    location: overrides.location ?? {
      address: "Jl. Sintetik No. 1",
      area: "Sintetik Area",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
    },
    specs: overrides.specs ?? {
      landArea: 500,
      buildingArea: 400,
      bedrooms: 4,
      bathrooms: 4,
    },
    facilities: overrides.facilities ?? ["Kolam Renang"],
    images: overrides.images ?? [
      {
        url: "https://example.com/synth.jpg",
        alt: "Synthetic Image",
        isPrimary: true,
      },
    ],
    isFeatured: overrides.isFeatured ?? false,
    createdAt: overrides.createdAt ?? "2026-01-01T00:00:00Z",
  };
}

describe("property-filters", () => {
  describe("DEFAULT_FILTER_STATE", () => {
    it("returns all 12 properties when default filters are applied", () => {
      const results = filterProperties(PROPERTIES, DEFAULT_FILTER_STATE);
      assert.equal(results.length, 12);
    });

    it("identifies default state as having no active filters", () => {
      assert.equal(hasActiveFilters(DEFAULT_FILTER_STATE), false);
      assert.equal(getActiveFilterCount(DEFAULT_FILTER_STATE), 0);
    });

    it("identifies active filters correctly", () => {
      const stateWithKeyword: PropertyFilterState = {
        ...DEFAULT_FILTER_STATE,
        keyword: "Menteng",
      };
      assert.equal(hasActiveFilters(stateWithKeyword), true);
      assert.equal(getActiveFilterCount(stateWithKeyword), 1);

      const stateMulti: PropertyFilterState = {
        ...DEFAULT_FILTER_STATE,
        keyword: "Menteng",
        status: "dijual",
        minBedrooms: 4,
      };
      assert.equal(hasActiveFilters(stateMulti), true);
      assert.equal(getActiveFilterCount(stateMulti), 3);
    });
  });

  describe("Keyword Search", () => {
    it("performs case-insensitive partial match on title", () => {
      const r1 = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, keyword: "kayuputih" });
      const r2 = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, keyword: "KAYUPUTIH" });
      const r3 = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, keyword: "Kayu" });
      assert.equal(r1.length, 1);
      assert.equal(r2.length, 1);
      assert.equal(r1[0].id, "prop-01");
      assert.equal(r3.length, 3);
      assert.ok(r3.some((p) => p.id === "prop-01"));
    });

    it("matches property code", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, keyword: "NRE-BAL-002" });
      assert.equal(results.length, 1);
      assert.equal(results[0].id, "prop-02");
    });

    it("matches neighborhood/area", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, keyword: "Canggu" });
      assert.equal(results.length, 1);
      assert.equal(results[0].location.area, "Canggu");
    });

    it("matches city name", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, keyword: "Bandung" });
      assert.equal(results.length, 2);
    });

    it("matches province name", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, keyword: "Bali" });
      assert.equal(results.length, 3);
    });

    it("matches tagline in isolation", () => {
      const synth = [
        createSyntheticProperty({
          id: "tag-01",
          tagline: "Keanggunan tropis berakar di kawasan diplomasi bersejarah Menteng.",
        }),
        createSyntheticProperty({
          id: "tag-02",
          tagline: "Panorama samudra tanpa batas.",
        }),
      ];
      const results = filterProperties(synth, {
        ...DEFAULT_FILTER_STATE,
        keyword: "diplomasi",
      });
      assert.equal(results.length, 1);
      assert.equal(results[0].id, "tag-01");
    });

    it("matches description in isolation", () => {
      const synth = [
        createSyntheticProperty({
          id: "desc-01",
          description: "Fasad berbalut kisi-kisi kayu jati solid dan travertine.",
        }),
        createSyntheticProperty({
          id: "desc-02",
          description: "Beton ekspos minimalis modern.",
        }),
      ];
      const results = filterProperties(synth, {
        ...DEFAULT_FILTER_STATE,
        keyword: "travertine",
      });
      assert.equal(results.length, 1);
      assert.equal(results[0].id, "desc-01");
    });

    it("trims whitespace safely", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, keyword: "   Menteng   " });
      assert.equal(results.length, 1);
      assert.equal(results[0].location.area, "Menteng");
    });

    it("handles whitespace-only keyword as empty (returns all 12)", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, keyword: "     " });
      assert.equal(results.length, 12);
    });
  });

  describe("Status Filtering", () => {
    it("filters sold properties (dijual)", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, status: "dijual" });
      assert.equal(results.length, 9);
      assert.ok(results.every((p) => p.status === "dijual"));
    });

    it("filters rental properties (disewa)", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, status: "disewa" });
      assert.equal(results.length, 3);
      assert.ok(results.every((p) => p.status === "disewa"));
    });
  });

  describe("Property Type Filtering", () => {
    it("filters by rumah", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, type: "rumah" });
      assert.equal(results.length, 6);
      assert.ok(results.every((p) => p.type === "rumah"));
    });

    it("filters by vila", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, type: "vila" });
      assert.equal(results.length, 3);
      assert.ok(results.every((p) => p.type === "vila"));
    });

    it("filters by apartemen", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, type: "apartemen" });
      assert.equal(results.length, 2);
      assert.ok(results.every((p) => p.type === "apartemen"));
    });

    it("filters by townhouse", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, type: "townhouse" });
      assert.equal(results.length, 1);
      assert.equal(results[0].type, "townhouse");
    });

    it("filters by komersial (returns empty)", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, type: "komersial" });
      assert.equal(results.length, 0);
    });
  });

  describe("City Filtering", () => {
    it("filters by specific city", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, city: "Badung, Bali" });
      assert.equal(results.length, 3);
      assert.ok(results.every((p) => p.location.city === "Badung, Bali"));
    });

    it("filters case-insensitively for city", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, city: "jakarta selatan" });
      assert.equal(results.length, 4);
    });
  });

  describe("Price Range Filtering", () => {
    it("filters under-5b (< Rp 5 Miliar) against static dataset", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, priceRange: "under-5b" });
      assert.equal(results.length, 3);
      assert.ok(results.every((p) => p.price < 5_000_000_000));
    });

    it("filters 5b-15b (Rp 5 Miliar - Rp 15 Miliar) against static dataset", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, priceRange: "5b-15b" });
      assert.equal(results.length, 1);
      assert.equal(results[0].title, "Cipete Modern Townhouse");
      assert.equal(results[0].price, 9_800_000_000);
    });

    it("filters above-15b (> Rp 15 Miliar) against static dataset", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, priceRange: "above-15b" });
      assert.equal(results.length, 8);
      assert.ok(results.every((p) => p.price > 15_000_000_000));
    });

    it("returns zero results for sale properties under 5B in static dataset", () => {
      const results = filterProperties(PROPERTIES, {
        ...DEFAULT_FILTER_STATE,
        status: "dijual",
        priceRange: "under-5b",
      });
      assert.equal(results.length, 0);
    });

    it("verifies exact synthetic price boundary fixtures", () => {
      const synthetic = [
        createSyntheticProperty({ id: "p-under", price: 4_999_999_999 }),
        createSyntheticProperty({ id: "p-5b", price: 5_000_000_000 }),
        createSyntheticProperty({ id: "p-15b", price: 15_000_000_000 }),
        createSyntheticProperty({ id: "p-above", price: 15_000_000_001 }),
      ];

      // Test under-5b
      const under5b = filterProperties(synthetic, { ...DEFAULT_FILTER_STATE, priceRange: "under-5b" });
      assert.equal(under5b.length, 1);
      assert.equal(under5b[0].id, "p-under");

      // Test 5b-15b includes both 5,000,000,000 and 15,000,000,000
      const range5b15b = filterProperties(synthetic, { ...DEFAULT_FILTER_STATE, priceRange: "5b-15b" });
      assert.equal(range5b15b.length, 2);
      assert.ok(range5b15b.some((p) => p.id === "p-5b"));
      assert.ok(range5b15b.some((p) => p.id === "p-15b"));

      // Test above-15b
      const above15b = filterProperties(synthetic, { ...DEFAULT_FILTER_STATE, priceRange: "above-15b" });
      assert.equal(above15b.length, 1);
      assert.equal(above15b[0].id, "p-above");
    });
  });

  describe("Minimum Bedrooms Filtering", () => {
    it("filters properties with at least 5 bedrooms", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, minBedrooms: 5 });
      assert.equal(results.length, 4);
      assert.ok(results.every((p) => p.specs.bedrooms >= 5));
    });

    it("filters properties with at least 6 bedrooms", () => {
      const results = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, minBedrooms: 6 });
      assert.equal(results.length, 1);
      assert.equal(results[0].specs.bedrooms, 6);
    });
  });

  describe("Combined Multi-Criteria AND Filtering", () => {
    it("correctly combines status + type + city", () => {
      const results = filterProperties(PROPERTIES, {
        ...DEFAULT_FILTER_STATE,
        status: "dijual",
        type: "rumah",
        city: "Bandung",
      });
      assert.equal(results.length, 2);
      assert.ok(results.every((p) => p.status === "dijual" && p.type === "rumah" && p.location.city === "Bandung"));
    });

    it("returns empty array when combined criteria yield no match", () => {
      const results = filterProperties(PROPERTIES, {
        ...DEFAULT_FILTER_STATE,
        status: "disewa",
        city: "Jakarta Pusat",
      });
      assert.equal(results.length, 0);
    });
  });

  describe("Immutability", () => {
    it("returns a new array and preserves immutability of input array during filterProperties()", () => {
      const originalCopy = [...PROPERTIES];
      const result = filterProperties(PROPERTIES, { ...DEFAULT_FILTER_STATE, status: "disewa", keyword: "Canggu" });
      assert.notEqual(result, PROPERTIES);
      assert.deepEqual(PROPERTIES, originalCopy);
    });

    it("returns a new array and preserves immutability of input array during sortProperties()", () => {
      const originalCopy = [...PROPERTIES];
      const result = sortProperties(PROPERTIES, "price-asc");
      assert.notEqual(result, PROPERTIES);
      assert.deepEqual(PROPERTIES, originalCopy);
    });
  });

  describe("Sorting & Deterministic Tie-Breaking", () => {
    it("sorts by featured first, then newest, with deterministic tie-breaking", () => {
      const sorted = sortProperties(PROPERTIES, "featured");
      assert.equal(sorted.length, 12);
      assert.equal(sorted[0].isFeatured, true);
      assert.equal(sorted[1].isFeatured, true);
      assert.equal(sorted[2].isFeatured, true);
      assert.equal(sorted[3].isFeatured, true);
      assert.equal(sorted[4].isFeatured, false);
    });

    it("tie-breaks equal featured status and dates using ID ascending", () => {
      const synth = [
        createSyntheticProperty({ id: "feat-b", isFeatured: true, createdAt: "2026-03-01T00:00:00Z" }),
        createSyntheticProperty({ id: "feat-a", isFeatured: true, createdAt: "2026-03-01T00:00:00Z" }),
        createSyntheticProperty({ id: "feat-c", isFeatured: false, createdAt: "2026-03-01T00:00:00Z" }),
      ];
      const sorted = sortProperties(synth, "featured");
      assert.deepEqual(sorted.map((p) => p.id), ["feat-a", "feat-b", "feat-c"]);
    });

    it("sorts by newest date descending", () => {
      const sorted = sortProperties(PROPERTIES, "newest");
      for (let i = 0; i < sorted.length - 1; i++) {
        const d1 = Date.parse(sorted[i].createdAt);
        const d2 = Date.parse(sorted[i + 1].createdAt);
        assert.ok(d1 >= d2);
      }
    });

    it("tie-breaks equal createdAt in newest sorting using ID ascending", () => {
      const synth = [
        createSyntheticProperty({ id: "new-b", createdAt: "2026-02-01T00:00:00Z" }),
        createSyntheticProperty({ id: "new-a", createdAt: "2026-02-01T00:00:00Z" }),
        createSyntheticProperty({ id: "new-older", createdAt: "2026-01-01T00:00:00Z" }),
      ];
      const sorted = sortProperties(synth, "newest");
      assert.deepEqual(sorted.map((p) => p.id), ["new-a", "new-b", "new-older"]);
    });

    it("sorts by price ascending numerically", () => {
      const sorted = sortProperties(PROPERTIES, "price-asc");
      assert.equal(sorted[0].price, 450_000_000); // The Lumina Penthouse (rent)
      assert.equal(sorted[sorted.length - 1].price, 52_000_000_000); // Dharmawangsa Manor (sale)
      for (let i = 0; i < sorted.length - 1; i++) {
        assert.ok(sorted[i].price <= sorted[i + 1].price);
      }
    });

    it("sorts by price descending numerically", () => {
      const sorted = sortProperties(PROPERTIES, "price-desc");
      assert.equal(sorted[0].price, 52_000_000_000);
      assert.equal(sorted[sorted.length - 1].price, 450_000_000);
      for (let i = 0; i < sorted.length - 1; i++) {
        assert.ok(sorted[i].price >= sorted[i + 1].price);
      }
    });

    it("sorts by land area descending, placing non-landed apartments at end", () => {
      const sorted = sortProperties(PROPERTIES, "land-area-desc");
      assert.equal(sorted[0].specs.landArea, 1200); // Villa Terra Cliff
      const landed = sorted.filter((p) => p.specs.landArea !== undefined);
      assert.equal(landed.length, 10);
      for (let i = 0; i < landed.length - 1; i++) {
        assert.ok(landed[i].specs.landArea! >= landed[i + 1].specs.landArea!);
      }
      assert.equal(sorted[10].specs.landArea, undefined);
      assert.equal(sorted[11].specs.landArea, undefined);
      assert.equal(sorted[10].specs.buildingArea, 480); // The Senopati Sky Penthouse
      assert.equal(sorted[11].specs.buildingArea, 310); // The Lumina Penthouse
    });

    it("tie-breaks equal prices using createdAt descending then ID ascending", () => {
      const synth = [
        createSyntheticProperty({ id: "p-02", price: 10_000_000_000, createdAt: "2026-01-01T00:00:00Z" }),
        createSyntheticProperty({ id: "p-01", price: 10_000_000_000, createdAt: "2026-02-01T00:00:00Z" }),
        createSyntheticProperty({ id: "p-03", price: 10_000_000_000, createdAt: "2026-01-01T00:00:00Z" }),
      ];
      const sorted = sortProperties(synth, "price-asc");
      // p-01 has newer createdAt -> first
      assert.equal(sorted[0].id, "p-01");
      // p-02 and p-03 have same createdAt -> tie-break by id asc: p-02 before p-03
      assert.equal(sorted[1].id, "p-02");
      assert.equal(sorted[2].id, "p-03");
    });

    it("tie-breaks equal land areas using buildingArea descending then ID ascending", () => {
      const synth = [
        createSyntheticProperty({ id: "land-02", specs: { landArea: 500, buildingArea: 300, bedrooms: 3, bathrooms: 3 } }),
        createSyntheticProperty({ id: "land-01", specs: { landArea: 500, buildingArea: 450, bedrooms: 4, bathrooms: 4 } }),
        createSyntheticProperty({ id: "land-03", specs: { landArea: 500, buildingArea: 300, bedrooms: 3, bathrooms: 3 } }),
      ];
      const sorted = sortProperties(synth, "land-area-desc");
      // land-01 has larger buildingArea (450) -> first
      assert.equal(sorted[0].id, "land-01");
      // land-02 and land-03 have same buildingArea (300) -> tie-break by id asc: land-02 before land-03
      assert.equal(sorted[1].id, "land-02");
      assert.equal(sorted[2].id, "land-03");
    });

    it("tie-breaks equal building areas on non-landed apartments using ID ascending", () => {
      const synth = [
        createSyntheticProperty({ id: "apt-b", specs: { buildingArea: 400, bedrooms: 3, bathrooms: 3 } }),
        createSyntheticProperty({ id: "apt-a", specs: { buildingArea: 400, bedrooms: 3, bathrooms: 3 } }),
      ];
      const sorted = sortProperties(synth, "land-area-desc");
      assert.equal(sorted[0].id, "apt-a");
      assert.equal(sorted[1].id, "apt-b");
    });

    it("guarantees idempotence over repeated sort executions", () => {
      const run1 = sortProperties(PROPERTIES, "featured");
      const run2 = sortProperties(PROPERTIES, "featured");
      const run3 = sortProperties(PROPERTIES, "featured");
      assert.deepEqual(run1.map((p) => p.id), run2.map((p) => p.id));
      assert.deepEqual(run2.map((p) => p.id), run3.map((p) => p.id));
    });
  });
});
