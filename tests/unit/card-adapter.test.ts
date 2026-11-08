import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { PROPERTIES } from "../../src/data/properties.ts";
import { toPropertyCardData } from "../../src/lib/property-adapter.ts";
import type { Property } from "../../src/types/property.ts";

describe("toPropertyCardData", () => {
  it("maps a landed property correctly with land area", () => {
    const landed = PROPERTIES.find((p) => p.id === "prop-01")!;
    const cardData = toPropertyCardData(landed);

    assert.equal(cardData.title, "The Kayuputih Residence");
    assert.equal(cardData.slug, "the-kayuputih-residence-menteng");
    assert.equal(cardData.status, "dijual");
    assert.equal(cardData.type, "Rumah");
    assert.equal(cardData.priceFormatted, "Rp 38,5 Miliar");
    assert.equal(cardData.pricePeriod, undefined);
    assert.equal(cardData.area, "Menteng");
    assert.equal(cardData.city, "Jakarta Pusat");
    assert.equal(cardData.specs.landArea, 620);
    assert.equal(cardData.specs.buildingArea, 780);
    assert.equal(cardData.specs.bedrooms, 5);
    assert.equal(cardData.specs.bathrooms, 6);
    assert.equal(cardData.imageUrl, landed.images[0].url);
    assert.equal(cardData.imageAlt, landed.images[0].alt);
  });

  it("maps an apartment correctly without land area (landArea is undefined)", () => {
    const apartment = PROPERTIES.find((p) => p.id === "prop-03")!;
    const cardData = toPropertyCardData(apartment);

    assert.equal(cardData.title, "The Senopati Sky Penthouse");
    assert.equal(cardData.status, "dijual");
    assert.equal(cardData.type, "Apartemen");
    assert.equal(cardData.specs.landArea, undefined);
    assert.equal(cardData.specs.buildingArea, 480);
    assert.equal(cardData.priceFormatted, "Rp 29 Miliar");
  });

  it("maps rental properties with pricePeriod", () => {
    const rental = PROPERTIES.find((p) => p.status === "disewa")!;
    const cardData = toPropertyCardData(rental);

    assert.equal(cardData.status, "disewa");
    assert.equal(cardData.pricePeriod, "tahun");
    assert.ok(cardData.priceFormatted.includes("Juta"));
  });

  it("selects the primary image or falls back to first image", () => {
    const syntheticProp: Property = {
      id: "test-img",
      code: "TST-001",
      slug: "test-image",
      title: "Test Image Property",
      tagline: "Test",
      description: "Test",
      status: "dijual",
      type: "rumah",
      price: 10_000_000_000,
      location: {
        address: "Jl. Test",
        area: "Test Area",
        city: "Jakarta Selatan",
        province: "DKI Jakarta",
      },
      specs: {
        landArea: 300,
        buildingArea: 250,
        bedrooms: 3,
        bathrooms: 3,
      },
      facilities: [],
      images: [
        { url: "https://example.com/sec.jpg", alt: "Secondary Image", isPrimary: false },
        { url: "https://example.com/prim.jpg", alt: "Primary Image", isPrimary: true },
      ],
      isFeatured: false,
      createdAt: "2026-01-01T00:00:00Z",
    };

    const cardData = toPropertyCardData(syntheticProp);
    assert.equal(cardData.imageUrl, "https://example.com/prim.jpg");
    assert.equal(cardData.imageAlt, "Primary Image");
  });

  it("successfully maps all 12 properties in the dataset without errors", () => {
    for (const property of PROPERTIES) {
      const cardData = toPropertyCardData(property);
      assert.ok(cardData.title);
      assert.ok(cardData.slug);
      assert.ok(cardData.imageUrl);
      assert.ok(cardData.priceFormatted.startsWith("Rp "));
      if (property.type === "apartemen") {
        assert.equal(cardData.specs.landArea, undefined);
      } else {
        assert.equal(typeof cardData.specs.landArea, "number");
      }
    }
  });
});
