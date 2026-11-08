import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_FILTER_STATE } from "../../src/lib/property-filters.ts";
import {
  STATUS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PRICE_RANGE_OPTIONS,
  BEDROOM_OPTIONS,
  getActiveFilterChips,
} from "../../src/lib/filter-helpers.ts";
import type { PropertyFilterState } from "../../src/types/filters.ts";

describe("filter-helpers", () => {
  describe("Option definitions", () => {
    it("defines valid status options including all", () => {
      assert.equal(STATUS_OPTIONS.length, 3);
      assert.deepEqual(
        STATUS_OPTIONS.map((o) => o.value),
        ["all", "dijual", "disewa"]
      );
    });

    it("defines all supported property types", () => {
      assert.equal(PROPERTY_TYPE_OPTIONS.length, 6);
      assert.ok(PROPERTY_TYPE_OPTIONS.some((o) => o.value === "rumah"));
      assert.ok(PROPERTY_TYPE_OPTIONS.some((o) => o.value === "apartemen"));
      assert.ok(PROPERTY_TYPE_OPTIONS.some((o) => o.value === "vila"));
      assert.ok(PROPERTY_TYPE_OPTIONS.some((o) => o.value === "townhouse"));
      assert.ok(PROPERTY_TYPE_OPTIONS.some((o) => o.value === "komersial"));
    });

    it("defines all price range preset options", () => {
      assert.equal(PRICE_RANGE_OPTIONS.length, 4);
      assert.deepEqual(
        PRICE_RANGE_OPTIONS.map((o) => o.value),
        ["all", "under-5b", "5b-15b", "above-15b"]
      );
    });

    it("defines bedroom count options", () => {
      assert.equal(BEDROOM_OPTIONS.length, 5);
      assert.deepEqual(
        BEDROOM_OPTIONS.map((o) => o.value),
        ["all", 3, 4, 5, 6]
      );
    });
  });

  describe("getActiveFilterChips", () => {
    it("returns empty array for default filter state", () => {
      const chips = getActiveFilterChips(DEFAULT_FILTER_STATE);
      assert.equal(chips.length, 0);
    });

    it("produces a chip for non-empty keyword", () => {
      const state: PropertyFilterState = {
        ...DEFAULT_FILTER_STATE,
        keyword: "Menteng",
      };
      const chips = getActiveFilterChips(state);
      assert.equal(chips.length, 1);
      assert.equal(chips[0].id, "keyword");
      assert.equal(chips[0].label, 'Kata Kunci: "Menteng"');
    });

    it("ignores whitespace-only keyword", () => {
      const state: PropertyFilterState = {
        ...DEFAULT_FILTER_STATE,
        keyword: "   ",
      };
      const chips = getActiveFilterChips(state);
      assert.equal(chips.length, 0);
    });

    it("produces a chip for active status", () => {
      const state: PropertyFilterState = {
        ...DEFAULT_FILTER_STATE,
        status: "dijual",
      };
      const chips = getActiveFilterChips(state);
      assert.equal(chips.length, 1);
      assert.equal(chips[0].id, "status");
      assert.equal(chips[0].label, "Status: Dijual");
    });

    it("produces a chip for active property type", () => {
      const state: PropertyFilterState = {
        ...DEFAULT_FILTER_STATE,
        type: "vila",
      };
      const chips = getActiveFilterChips(state);
      assert.equal(chips.length, 1);
      assert.equal(chips[0].id, "type");
      assert.equal(chips[0].label, "Tipe: Vila");
    });

    it("produces a chip for active city", () => {
      const state: PropertyFilterState = {
        ...DEFAULT_FILTER_STATE,
        city: "Jakarta Selatan",
      };
      const chips = getActiveFilterChips(state);
      assert.equal(chips.length, 1);
      assert.equal(chips[0].id, "city");
      assert.equal(chips[0].label, "Lokasi: Jakarta Selatan");
    });

    it("produces a chip for active price range preset", () => {
      const state: PropertyFilterState = {
        ...DEFAULT_FILTER_STATE,
        priceRange: "under-5b",
      };
      const chips = getActiveFilterChips(state);
      assert.equal(chips.length, 1);
      assert.equal(chips[0].id, "priceRange");
      assert.equal(chips[0].label, "Harga: < Rp 5 Miliar");
    });

    it("produces a chip for active minimum bedrooms", () => {
      const state: PropertyFilterState = {
        ...DEFAULT_FILTER_STATE,
        minBedrooms: 5,
      };
      const chips = getActiveFilterChips(state);
      assert.equal(chips.length, 1);
      assert.equal(chips[0].id, "minBedrooms");
      assert.equal(chips[0].label, "Kamar: 5+ KT");
    });

    it("produces multiple chips in deterministic order when multiple filters are active", () => {
      const state: PropertyFilterState = {
        keyword: "Menteng",
        status: "dijual",
        type: "rumah",
        city: "Jakarta Pusat",
        priceRange: "above-15b",
        minBedrooms: 4,
        sortBy: "price-desc",
      };
      const chips = getActiveFilterChips(state);
      assert.equal(chips.length, 6);
      assert.deepEqual(
        chips.map((c) => c.id),
        ["keyword", "status", "type", "city", "priceRange", "minBedrooms"]
      );
      assert.equal(chips[0].label, 'Kata Kunci: "Menteng"');
      assert.equal(chips[1].label, "Status: Dijual");
      assert.equal(chips[2].label, "Tipe: Rumah");
      assert.equal(chips[3].label, "Lokasi: Jakarta Pusat");
      assert.equal(chips[4].label, "Harga: > Rp 15 Miliar");
      assert.equal(chips[5].label, "Kamar: 4+ KT");
    });
  });
});

