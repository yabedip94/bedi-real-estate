import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  parseFilterParams,
  serializeFilterParams,
} from "../../src/lib/catalog-params.ts";
import { DEFAULT_FILTER_STATE } from "../../src/lib/property-filters.ts";
import type { PropertyFilterState } from "../../src/types/filters.ts";

describe("catalog-params", () => {
  describe("parseFilterParams", () => {
    // 1. Empty query returns DEFAULT_FILTER_STATE
    it("1. returns DEFAULT_FILTER_STATE for empty query", () => {
      const parsed = parseFilterParams(new URLSearchParams());
      assert.deepEqual(parsed, DEFAULT_FILTER_STATE);
    });

    // 2. All valid parameters parse correctly
    it("2. parses all valid parameters correctly", () => {
      const qs =
        "q=Menteng&status=dijual&type=rumah&city=Jakarta+Pusat&priceRange=above-15b&minBedrooms=5&sortBy=price-desc";
      const parsed = parseFilterParams(new URLSearchParams(qs));

      assert.equal(parsed.keyword, "Menteng");
      assert.equal(parsed.status, "dijual");
      assert.equal(parsed.type, "rumah");
      assert.equal(parsed.city, "Jakarta Pusat");
      assert.equal(parsed.priceRange, "above-15b");
      assert.equal(parsed.minBedrooms, 5);
      assert.equal(parsed.sortBy, "price-desc");
    });

    // 3. Each invalid enum falls back independently
    it("3. falls back to defaults independently for invalid enums", () => {
      const invalidStatus = parseFilterParams(new URLSearchParams("status=lelang&type=rumah"));
      assert.equal(invalidStatus.status, "all");
      assert.equal(invalidStatus.type, "rumah");

      const invalidType = parseFilterParams(new URLSearchParams("status=dijual&type=istana"));
      assert.equal(invalidType.status, "dijual");
      assert.equal(invalidType.type, "all");

      const invalidPrice = parseFilterParams(new URLSearchParams("priceRange=gratis"));
      assert.equal(invalidPrice.priceRange, "all");

      const invalidSort = parseFilterParams(new URLSearchParams("sortBy=acak"));
      assert.equal(invalidSort.sortBy, "featured");
    });

    // 4. Invalid city falls back safely
    it("4. falls back safely to 'all' for unknown cities", () => {
      const unknownCity = parseFilterParams(new URLSearchParams("city=Surabaya"));
      assert.equal(unknownCity.city, "all");

      // Valid city with case-insensitivity
      const validCity = parseFilterParams(new URLSearchParams("city=jakarta+selatan"));
      assert.equal(validCity.city, "Jakarta Selatan");
    });

    // 5. Minimum bedroom parsing and validation
    it("5. validates minimum bedroom count strictly against allowed values [3, 4, 5, 6]", () => {
      // Valid bedroom counts
      assert.equal(parseFilterParams(new URLSearchParams("minBedrooms=3")).minBedrooms, 3);
      assert.equal(parseFilterParams(new URLSearchParams("minBedrooms=4")).minBedrooms, 4);
      assert.equal(parseFilterParams(new URLSearchParams("minBedrooms=5")).minBedrooms, 5);
      assert.equal(parseFilterParams(new URLSearchParams("minBedrooms=6")).minBedrooms, 6);

      // Unsupported numbers fall back to 'all'
      assert.equal(parseFilterParams(new URLSearchParams("minBedrooms=1")).minBedrooms, "all");
      assert.equal(parseFilterParams(new URLSearchParams("minBedrooms=2")).minBedrooms, "all");
      assert.equal(parseFilterParams(new URLSearchParams("minBedrooms=7")).minBedrooms, "all");
      assert.equal(parseFilterParams(new URLSearchParams("minBedrooms=-3")).minBedrooms, "all");
      assert.equal(parseFilterParams(new URLSearchParams("minBedrooms=100")).minBedrooms, "all");

      // Non-numeric strings fall back to 'all'
      assert.equal(parseFilterParams(new URLSearchParams("minBedrooms=empat")).minBedrooms, "all");
      assert.equal(parseFilterParams(new URLSearchParams("minBedrooms=NaN")).minBedrooms, "all");
    });

    // 6. Keyword whitespace trimming
    it("6. trims keyword whitespace safely", () => {
      const parsed = parseFilterParams(new URLSearchParams("q=%20%20Menteng%20Asri%20%20"));
      assert.equal(parsed.keyword, "Menteng Asri");

      // Fallback to legacy "keyword" parameter
      const fallback = parseFilterParams(new URLSearchParams("keyword=%20Kemang%20"));
      assert.equal(fallback.keyword, "Kemang");
    });

    // 7. Empty values
    it("7. handles empty values without throwing and returns defaults", () => {
      const emptyParams = new URLSearchParams(
        "q=&status=&type=&city=&priceRange=&minBedrooms=&sortBy="
      );
      const parsed = parseFilterParams(emptyParams);
      assert.deepEqual(parsed, DEFAULT_FILTER_STATE);
    });
  });

  describe("serializeFilterParams", () => {
    // 8. Serialization omits default parameters
    it("8. omits parameters that have default values", () => {
      const serialized = serializeFilterParams(DEFAULT_FILTER_STATE);
      assert.equal(serialized, "");
    });

    // 9. Serialization includes active parameters
    it("9. includes active parameters in output query string", () => {
      const state: PropertyFilterState = {
        ...DEFAULT_FILTER_STATE,
        keyword: "Penthouse",
        status: "dijual",
        type: "apartemen",
      };
      const serialized = serializeFilterParams(state);
      assert.equal(serialized, "q=Penthouse&status=dijual&type=apartemen");
    });

    // 10. Serialization preserves unrelated query parameters
    it("10. preserves unrelated query parameters", () => {
      const base = new URLSearchParams("utm_source=google&ref=newsletter");
      const state: PropertyFilterState = {
        ...DEFAULT_FILTER_STATE,
        status: "disewa",
      };
      const serialized = serializeFilterParams(state, base);
      assert.equal(serialized, "status=disewa&ref=newsletter&utm_source=google");
    });

    // 11. Serialization replaces managed parameters without duplicates
    it("11. replaces managed parameters rather than creating duplicates", () => {
      const base = new URLSearchParams("q=OldQuery&status=dijual&sortBy=newest");
      const state: PropertyFilterState = {
        ...DEFAULT_FILTER_STATE,
        keyword: "NewQuery",
        status: "disewa",
        sortBy: "price-asc",
      };
      const serialized = serializeFilterParams(state, base);
      assert.equal(serialized, "q=NewQuery&status=disewa&sortBy=price-asc");

      // Confirm no duplicates exist
      const parsedParams = new URLSearchParams(serialized);
      assert.equal(parsedParams.getAll("q").length, 1);
      assert.equal(parsedParams.getAll("status").length, 1);
      assert.equal(parsedParams.getAll("sortBy").length, 1);
    });

    // 12. Serialization removes parameters reset to defaults
    it("12. removes managed parameters when their values return to defaults", () => {
      const base = new URLSearchParams("q=Villa&type=vila&city=Badung%2C+Bali&extra=stay");
      const state: PropertyFilterState = {
        ...DEFAULT_FILTER_STATE,
        // All filters reset to defaults except keyword
        keyword: "",
        type: "all",
        city: "all",
      };
      const serialized = serializeFilterParams(state, base);
      assert.equal(serialized, "extra=stay");
    });

    // 13. Parse/serialize round-trip consistency
    it("13. guarantees parse/serialize round-trip consistency", () => {
      const original: PropertyFilterState = {
        keyword: "Vila Tropis",
        status: "disewa",
        type: "vila",
        city: "Badung, Bali",
        priceRange: "under-5b",
        minBedrooms: 3,
        sortBy: "land-area-desc",
      };

      const serialized = serializeFilterParams(original);
      const parsed = parseFilterParams(new URLSearchParams(serialized));

      assert.deepEqual(parsed, original);
    });

    // 14. Deterministic parameter ordering
    it("14. produces deterministic parameter ordering: q, status, type, city, priceRange, minBedrooms, sortBy, then unrelated", () => {
      const base = new URLSearchParams("beta=2&alpha=1");
      const state: PropertyFilterState = {
        keyword: "Canggu",
        status: "disewa",
        type: "vila",
        city: "Badung, Bali",
        priceRange: "5b-15b",
        minBedrooms: 4,
        sortBy: "newest",
      };

      const serialized = serializeFilterParams(state, base);
      const expected =
        "q=Canggu&status=disewa&type=vila&city=Badung%2C+Bali&priceRange=5b-15b&minBedrooms=4&sortBy=newest&alpha=1&beta=2";
      assert.equal(serialized, expected);
    });
  });
});
