import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { PROPERTIES } from "../../src/data/properties.ts";
import {
  getPropertyBySlug,
  getAllPropertySlugs,
  buildPropertyMetadata,
} from "../../src/lib/property-detail.ts";
import { getRelatedProperties } from "../../src/lib/related-properties.ts";
import { buildInquiryMessageText } from "../../src/lib/whatsapp.ts";
import { toPropertyCardData } from "../../src/lib/property-adapter.ts";

describe("property detail route & integration logic", () => {
  it("getAllPropertySlugs returns all 12 property slugs", () => {
    const slugs = getAllPropertySlugs();
    assert.equal(slugs.length, 12);
    assert.equal(new Set(slugs).size, 12);
    PROPERTIES.forEach((prop) => {
      assert.ok(slugs.includes(prop.slug), `Missing slug ${prop.slug}`);
    });
  });

  it("getPropertyBySlug correctly resolves every property in PROPERTIES", () => {
    PROPERTIES.forEach((prop) => {
      const found = getPropertyBySlug(prop.slug);
      assert.ok(found, `Expected to find property for slug ${prop.slug}`);
      assert.equal(found.id, prop.id);
      assert.equal(found.code, prop.code);
    });
  });

  it("getPropertyBySlug returns undefined for nonexistent slugs", () => {
    assert.equal(getPropertyBySlug("non-existent-villa"), undefined);
    assert.equal(getPropertyBySlug(""), undefined);
  });

  it("buildPropertyMetadata produces correct title and OpenGraph tags for valid property", () => {
    const property = PROPERTIES[0];
    const metadata = buildPropertyMetadata(property);

    assert.equal(metadata.title, `${property.title} | NARA ESTATE`);
    assert.ok(metadata.description.includes(property.tagline));
    assert.ok(metadata.openGraph?.images);
    assert.equal(metadata.openGraph?.images.length, 1);
    assert.equal(metadata.openGraph?.images[0].url, property.images[0].url);
  });

  it("buildPropertyMetadata handles undefined property gracefully", () => {
    const metadata = buildPropertyMetadata(undefined);
    assert.equal(metadata.title, "Properti Tidak Ditemukan | NARA ESTATE");
  });

  it("verifies consultation message contains correct institutional details for every property", () => {
    PROPERTIES.forEach((prop) => {
      const msg = buildInquiryMessageText(prop);
      assert.ok(msg.includes(prop.title), `Message should include title ${prop.title}`);
      assert.ok(msg.includes(prop.code), `Message should include code ${prop.code}`);
      assert.ok(msg.includes(prop.location.area), `Message should include area ${prop.location.area}`);
      assert.ok(msg.includes("Halo NARA ESTATE"), "Message must use institutional greeting");
      assert.ok(
        !msg.includes("+62 811-9988-7766"),
        "Must NOT contain hardcoded fictional phone number"
      );
    });
  });

  it("verifies related properties can be adapted to PropertyCardData without errors", () => {
    PROPERTIES.forEach((prop) => {
      const related = getRelatedProperties(prop, PROPERTIES, 3);
      assert.equal(related.length, 3);
      related.forEach((rel) => {
        const cardData = toPropertyCardData(rel);
        assert.ok(cardData.title);
        assert.ok(cardData.imageUrl);
        assert.ok(cardData.priceFormatted);
      });
    });
  });
});
