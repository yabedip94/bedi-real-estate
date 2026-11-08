import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  formatCurrencyIDR,
  formatCompactIDR,
  formatPropertyPrice,
  formatAreaSqm,
} from "../../src/lib/formatters.ts";

describe("formatters", () => {
  describe("formatCurrencyIDR", () => {
    it("formats amounts into standard IDR currency format", () => {
      const formatted = formatCurrencyIDR(38500000000);
      assert.match(formatted, /Rp/);
      assert.match(formatted, /38\.500\.000\.000/);
    });

    it("formats zero correctly", () => {
      const formatted = formatCurrencyIDR(0);
      assert.match(formatted, /Rp/);
      assert.match(formatted, /0/);
    });
  });

  describe("formatCompactIDR", () => {
    it("formats billions with Miliar", () => {
      assert.equal(formatCompactIDR(38500000000), "Rp 38,5 Miliar");
      assert.equal(formatCompactIDR(24000000000), "Rp 24 Miliar");
      assert.equal(formatCompactIDR(45000000000), "Rp 45 Miliar");
    });

    it("formats millions with Juta", () => {
      assert.equal(formatCompactIDR(850000000), "Rp 850 Juta");
      assert.equal(formatCompactIDR(450000000), "Rp 450 Juta");
      assert.equal(formatCompactIDR(980000000), "Rp 980 Juta");
    });

    it("handles million-to-billion transition boundaries with clean rounding", () => {
      assert.equal(formatCompactIDR(999949999), "Rp 999,9 Juta");
      assert.equal(formatCompactIDR(999950000), "Rp 1 Miliar");
      assert.equal(formatCompactIDR(999999999), "Rp 1 Miliar");
      assert.equal(formatCompactIDR(1000000000), "Rp 1 Miliar");
      assert.equal(formatCompactIDR(1500000000), "Rp 1,5 Miliar");
    });

    it("formats zero amount without crashing", () => {
      const formatted = formatCompactIDR(0);
      assert.match(formatted, /Rp/);
      assert.match(formatted, /0/);
    });
  });

  describe("formatPropertyPrice", () => {
    it("appends / tahun for annual rental listings", () => {
      assert.equal(formatPropertyPrice(850000000, "tahun"), "Rp 850 Juta / tahun");
    });

    it("appends / bulan for monthly rental listings", () => {
      assert.equal(formatPropertyPrice(50000000, "bulan"), "Rp 50 Juta / bulan");
    });

    it("does not append period for sale listings", () => {
      assert.equal(formatPropertyPrice(38500000000), "Rp 38,5 Miliar");
      assert.equal(formatPropertyPrice(38500000000, undefined), "Rp 38,5 Miliar");
    });
  });

  describe("formatAreaSqm", () => {
    it("formats square meter values correctly", () => {
      assert.equal(formatAreaSqm(620), "620 m²");
      assert.equal(formatAreaSqm(1200), "1.200 m²");
    });

    it("formats zero area correctly", () => {
      assert.equal(formatAreaSqm(0), "0 m²");
    });
  });
});
