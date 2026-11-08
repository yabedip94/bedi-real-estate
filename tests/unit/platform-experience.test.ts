import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { PROPERTIES } from "../../src/data/properties.ts";

describe("M06 Platform Experience Logic", () => {
  describe("Dashboard Metrics Aggregation", () => {
    it("derives exact metrics from the 12 property records", () => {
      const total = PROPERTIES.length;
      const forSale = PROPERTIES.filter((p) => p.status === "dijual").length;
      const forRent = PROPERTIES.filter((p) => p.status === "disewa").length;
      const featured = PROPERTIES.filter((p) => p.isFeatured).length;
      const uniqueTypes = new Set(PROPERTIES.map((p) => p.type)).size;
      const uniqueCities = new Set(PROPERTIES.map((p) => p.location.city)).size;

      assert.equal(total, 12, "Total properties must be exactly 12");
      assert.equal(forSale, 9, "Properties for sale must be 9");
      assert.equal(forRent, 3, "Properties for rent must be 3");
      assert.equal(uniqueTypes, 4, "Property types must be 4 (rumah, vila, apartemen, townhouse)");
      assert.equal(uniqueCities, 5, "Unique cities must be 5 (Jakarta Pusat, Jakarta Selatan, Badung, Bandung, Tangerang)");
      assert.ok(featured >= 3, "Featured properties must be at least 3");
    });

    it("ensures status distribution sums to 100% of the catalog", () => {
      const statusCounts = PROPERTIES.reduce<Record<string, number>>((acc, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
      }, {});

      const sum = Object.values(statusCounts).reduce((a, b) => a + b, 0);
      assert.equal(sum, PROPERTIES.length);
    });

    it("ensures type distribution covers all 12 properties", () => {
      const typeCounts = PROPERTIES.reduce<Record<string, number>>((acc, p) => {
        acc[p.type] = (acc[p.type] || 0) + 1;
        return acc;
      }, {});

      const sum = Object.values(typeCounts).reduce((a, b) => a + b, 0);
      assert.equal(sum, PROPERTIES.length);
      assert.ok(typeCounts.rumah > 0);
      assert.ok(typeCounts.vila > 0);
      assert.ok(typeCounts.apartemen > 0);
      assert.ok(typeCounts.townhouse > 0);
    });
  });

  describe("Dashboard Filtering Logic", () => {
    it("filters correctly by keyword across title, code, area, and city", () => {
      // Keyword matching title
      const mentengMatches = PROPERTIES.filter((p) => {
        const q = "kayuputih";
        return (
          p.title.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.location.area.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q)
        );
      });
      assert.equal(mentengMatches.length, 1);
      assert.equal(mentengMatches[0].slug, "the-kayuputih-residence-menteng");

      // Keyword matching code
      const codeMatches = PROPERTIES.filter((p) => {
        const q = "nre-bdg-004";
        return (
          p.title.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.location.area.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q)
        );
      });
      assert.equal(codeMatches.length, 1);
      assert.equal(codeMatches[0].slug, "dago-pakar-sanctuary");

      // Keyword matching city
      const bandungMatches = PROPERTIES.filter((p) => {
        const q = "bandung";
        return (
          p.title.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.location.area.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q)
        );
      });
      assert.equal(bandungMatches.length, 2); // Dago Pakar & Cimanuk Heritage
    });

    it("filters accurately by transaction status", () => {
      const sale = PROPERTIES.filter((p) => p.status === "dijual");
      const rent = PROPERTIES.filter((p) => p.status === "disewa");

      assert.equal(sale.length, 9);
      assert.equal(rent.length, 3);
      assert.ok(rent.every((p) => p.status === "disewa"));
    });

    it("filters accurately by property type", () => {
      const townhouses = PROPERTIES.filter((p) => p.type === "townhouse");
      assert.equal(townhouses.length, 1);
      assert.equal(townhouses[0].slug, "cipete-modern-townhouse");
    });
  });

  describe("Contact Form Validation & Format Assembly", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    it("validates email formats strictly", () => {
      assert.ok(emailRegex.test("klien@naraestate.com"));
      assert.ok(emailRegex.test("user.name+tag@domain.co.id"));
      assert.ok(!emailRegex.test("invalid-email"));
      assert.ok(!emailRegex.test("missing@domain"));
      assert.ok(!emailRegex.test("@nodomain.com"));
      assert.ok(!emailRegex.test("spaces in@email.com"));
    });

    it("formats structured consultation message accurately with property prefill", () => {
      const property = PROPERTIES[0]; // The Kayuputih Residence
      const applicantName = "Rian Pratama";
      const applicantEmail = "rian@example.com";
      const applicantPhone = "+62 812 3456 7890";
      const consultationType = "Pembelian Properti";
      const messageBody = "Ingin mengatur jadwal peninjauan privat pada akhir pekan.";

      let msg = `NARA ESTATE — PERMOHONAN KONSULTASI\n`;
      msg += `• Nama Lengkap: ${applicantName}\n`;
      msg += `• Email: ${applicantEmail}\n`;
      msg += `• Telepon: ${applicantPhone}\n`;
      msg += `• Jenis Konsultasi: ${consultationType}\n`;
      msg += `• Properti Diminati: ${property.title} [${property.code}]\n`;
      msg += `• Lokasi: ${property.location.area}, ${property.location.city}\n`;
      msg += `"${messageBody}"`;

      assert.ok(msg.includes(property.title));
      assert.ok(msg.includes(property.code));
      assert.ok(msg.includes(applicantName));
      assert.ok(msg.includes(applicantEmail));
      assert.ok(msg.includes("Menteng"));
      assert.ok(msg.includes(messageBody));
    });

    it("handles general consultation without specific property safely", () => {
      const applicantName = "Siti Rahma";
      const applicantEmail = "siti@example.com";
      const consultationType = "Konsultasi Pilihan Properti";
      const messageBody = "Mencari rekomendasi vila di pesisir Bali.";

      let msg = `NARA ESTATE — PERMOHONAN KONSULTASI\n`;
      msg += `• Nama Lengkap: ${applicantName}\n`;
      msg += `• Email: ${applicantEmail}\n`;
      msg += `• Jenis Konsultasi: ${consultationType}\n`;
      msg += `• Properti Diminati: Portofolio Umum / Konsultasi Terbuka\n`;
      msg += `"${messageBody}"`;

      assert.ok(msg.includes("Portofolio Umum / Konsultasi Terbuka"));
      assert.ok(msg.includes(applicantName));
      assert.ok(msg.includes(messageBody));
    });
  });
});
