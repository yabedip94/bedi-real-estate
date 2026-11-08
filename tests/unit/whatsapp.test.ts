import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  sanitizePhoneNumber,
  buildInquiryMessageText,
  buildWhatsAppPropertyInquiryUrl,
  buildGeneralInquiryMessageText,
  buildWhatsAppGeneralInquiryUrl,
} from "../../src/lib/whatsapp.ts";

describe("whatsapp & consultation helper", () => {
  describe("sanitizePhoneNumber", () => {
    it("returns null for empty, null, or undefined input", () => {
      assert.equal(sanitizePhoneNumber(), null);
      assert.equal(sanitizePhoneNumber(null), null);
      assert.equal(sanitizePhoneNumber(""), null);
      assert.equal(sanitizePhoneNumber("   "), null);
    });

    it("sanitizes Indonesian numbers starting with leading 0", () => {
      assert.equal(sanitizePhoneNumber("08123456789"), "628123456789");
      assert.equal(sanitizePhoneNumber("0812-3456-7890"), "6281234567890");
      assert.equal(sanitizePhoneNumber("(0812) 345 6789"), "628123456789");
    });

    it("sanitizes international numbers starting with +62", () => {
      assert.equal(sanitizePhoneNumber("+62 812-3456-7890"), "6281234567890");
      assert.equal(sanitizePhoneNumber("+6281199887766"), "6281199887766");
      assert.equal(sanitizePhoneNumber("62 812 3456 7890"), "6281234567890");
    });

    it("preserves valid international numbers", () => {
      assert.equal(sanitizePhoneNumber("+65 9123 4567"), "6591234567");
      assert.equal(sanitizePhoneNumber("+1 (415) 555-2671"), "14155552671");
    });

    it("returns null when phone contains no digits or is abnormally short", () => {
      assert.equal(sanitizePhoneNumber("abc-xyz"), null);
      assert.equal(sanitizePhoneNumber("123"), null);
      assert.equal(sanitizePhoneNumber("0812"), null);
    });
  });

  describe("buildInquiryMessageText", () => {
    const mockProperty = {
      title: "The Kayuputih Residence",
      code: "NRE-JKT-001",
      price: 38500000000,
      location: {
        address: "Jl. Kayuputih Utama No. 18",
        area: "Menteng",
        city: "Jakarta Pusat",
        province: "DKI Jakarta",
      },
    };

    it("generates structured plain-text inquiry message for sale property", () => {
      const text = buildInquiryMessageText(mockProperty);

      assert.ok(text.includes("The Kayuputih Residence"));
      assert.ok(text.includes("Kode: NRE-JKT-001"));
      assert.ok(text.includes("Harga: Rp 38,5 Miliar"));
      assert.ok(text.includes("Menteng, Jakarta Pusat"));
      assert.ok(text.includes("kunjungan privat"));
    });

    it("properly formats rental property with rental period suffix", () => {
      const rentalProperty = {
        title: "Batu Bolong Curated Residence",
        code: "NRE-BAL-006",
        price: 850000000,
        pricePeriod: "tahun" as const,
        location: {
          address: "Jl. Pantai Batu Bolong No. 88",
          area: "Canggu",
          city: "Badung, Bali",
          province: "Bali",
        },
      };

      const text = buildInquiryMessageText(rentalProperty);

      assert.ok(text.includes("Rp 850 Juta / tahun"));
      assert.ok(text.includes("Canggu, Badung, Bali"));
    });
  });

  describe("buildWhatsAppPropertyInquiryUrl", () => {
    const mockProperty = {
      title: "The Kayuputih Residence",
      code: "NRE-JKT-001",
      price: 38500000000,
      location: {
        address: "Jl. Kayuputih Utama No. 18",
        area: "Menteng",
        city: "Jakarta Pusat",
        province: "DKI Jakarta",
      },
    };

    it("returns null if no phone number is provided (avoids inventing numbers)", () => {
      const url = buildWhatsAppPropertyInquiryUrl({ property: mockProperty });
      assert.equal(url, null);

      const emptyUrl = buildWhatsAppPropertyInquiryUrl({
        property: mockProperty,
        phone: "",
      });
      assert.equal(emptyUrl, null);
    });

    it("returns valid wa.me URL when a valid phone number is provided", () => {
      const url = buildWhatsAppPropertyInquiryUrl({
        property: mockProperty,
        phone: "0812-9988-7766",
      });

      assert.ok(url);
      assert.ok(url.startsWith("https://wa.me/6281299887766?text="));

      const encoded = url.split("?text=")[1];
      const decoded = decodeURIComponent(encoded);

      assert.ok(decoded.includes("The Kayuputih Residence"));
      assert.ok(decoded.includes("Kode: NRE-JKT-001"));
      assert.ok(decoded.includes("Rp 38,5 Miliar"));
    });
  });

  describe("buildGeneralInquiryMessageText", () => {
    it("builds standard general inquiry text when no agent name is provided", () => {
      const text = buildGeneralInquiryMessageText();
      assert.equal(
        text,
        "Halo NARA ESTATE, saya ingin berkonsultasi mengenai koleksi properti premium yang tersedia saat ini. Terima kasih."
      );
    });

    it("builds personalized consultation text when agent name is provided", () => {
      const text = buildGeneralInquiryMessageText("Aruna Wardhana");
      assert.equal(
        text,
        "Halo Aruna Wardhana dari NARA ESTATE, saya ingin berkonsultasi mengenai koleksi properti premium yang tersedia saat ini. Terima kasih."
      );
    });
  });

  describe("buildWhatsAppGeneralInquiryUrl", () => {
    it("returns null when no phone number is provided", () => {
      assert.equal(buildWhatsAppGeneralInquiryUrl(), null);
    });

    it("builds general inquiry URL when phone is provided", () => {
      const url = buildWhatsAppGeneralInquiryUrl({
        phone: "0811-2233-4455",
        agentName: "Aruna Wardhana",
      });

      assert.ok(url);
      assert.ok(url.startsWith("https://wa.me/6281122334455?text="));

      const decoded = decodeURIComponent(url.split("?text=")[1]);
      assert.ok(decoded.includes("Halo Aruna Wardhana dari NARA ESTATE"));
    });
  });
});

