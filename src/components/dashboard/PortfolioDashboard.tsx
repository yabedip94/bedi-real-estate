"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Filter,
  ArrowUpRight,
  RotateCcw,
  Building,
  Key,
  Star,
  Layers,
  Info,
} from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import { formatPropertyPrice } from "@/lib/formatters";

export function PortfolioDashboard() {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Dynamic Metrics derived strictly from the 12-property dataset
  const metrics = useMemo(() => {
    const total = PROPERTIES.length;
    const forSale = PROPERTIES.filter((p) => p.status === "dijual").length;
    const forRent = PROPERTIES.filter((p) => p.status === "disewa").length;
    const featured = PROPERTIES.filter((p) => p.isFeatured).length;
    const uniqueTypes = Array.from(new Set(PROPERTIES.map((p) => p.type))).length;
    const uniqueCities = Array.from(new Set(PROPERTIES.map((p) => p.location.city))).length;

    return {
      total,
      forSale,
      forRent,
      featured,
      uniqueTypes,
      uniqueCities,
    };
  }, []);

  // Distribution calculations
  const distributions = useMemo(() => {
    // By status
    const statusCounts = PROPERTIES.reduce<Record<string, number>>((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {});

    // By type
    const typeCounts = PROPERTIES.reduce<Record<string, number>>((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {});

    // By city
    const cityCounts = PROPERTIES.reduce<Record<string, number>>((acc, p) => {
      acc[p.location.city] = (acc[p.location.city] || 0) + 1;
      return acc;
    }, {});

    return {
      status: statusCounts,
      type: typeCounts,
      city: cityCounts,
    };
  }, []);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((p) => {
      // Keyword search (title, code, area, city)
      if (keyword.trim()) {
        const q = keyword.toLowerCase().trim();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchCode = p.code.toLowerCase().includes(q);
        const matchArea = p.location.area.toLowerCase().includes(q);
        const matchCity = p.location.city.toLowerCase().includes(q);
        if (!matchTitle && !matchCode && !matchArea && !matchCity) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== "all" && p.status !== statusFilter) {
        return false;
      }

      // Type filter
      if (typeFilter !== "all" && p.type !== typeFilter) {
        return false;
      }

      return true;
    });
  }, [keyword, statusFilter, typeFilter]);

  const handleClearFilters = () => {
    setKeyword("");
    setStatusFilter("all");
    setTypeFilter("all");
  };

  const isFiltered = keyword.trim() !== "" || statusFilter !== "all" || typeFilter !== "all";

  return (
    <div className="space-y-12">
      {/* Portfolio Demonstration Notice */}
      <div className="bg-sand/60 border border-sand-dark/80 rounded-sm p-4 sm:p-5 flex items-start gap-3.5">
        <Info className="w-5 h-5 text-bronze-dark flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs font-sans text-ink leading-relaxed">
          <p className="font-semibold text-ink uppercase tracking-wider text-[11px]">
            Simulasi Portofolio Kuratorial — Bukan Sistem Administrasi Produksi
          </p>
          <p className="text-ink-muted">
            Seluruh metrik dan visualisasi di bawah ini dihitung secara dinamis dari{" "}
            <strong>{PROPERTIES.length} residensi arsitektural</strong> resmi NARA ESTATE. Platform ini tidak
            membuat metrik fiktif seperti omset, transaksi finansial komersial, data pengunjung, atau leads.
          </p>
        </div>
      </div>

      {/* Top Metric Strip (derived from the actual 12 properties) */}
      <section aria-label="Metrik Ringkasan Portofolio" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-sand-dark/70 rounded-sm p-5 space-y-1 shadow-xs">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-sage-dark flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-sage" />
            <span>Total Koleksi</span>
          </span>
          <p className="font-serif text-3xl font-bold text-ink tabular-nums">
            {metrics.total}
          </p>
          <p className="text-[11px] font-sans text-ink-muted">Residensi Terkurasi</p>
        </div>

        <div className="bg-white border border-sand-dark/70 rounded-sm p-5 space-y-1 shadow-xs">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-sage-dark flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-sage" />
            <span>Koleksi Dijual</span>
          </span>
          <p className="font-serif text-3xl font-bold text-ink tabular-nums">
            {metrics.forSale}
          </p>
          <p className="text-[11px] font-sans text-ink-muted">
            {Math.round((metrics.forSale / metrics.total) * 100)}% dari portofolio
          </p>
        </div>

        <div className="bg-white border border-sand-dark/70 rounded-sm p-5 space-y-1 shadow-xs">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-sage-dark flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-sage" />
            <span>Koleksi Disewa</span>
          </span>
          <p className="font-serif text-3xl font-bold text-ink tabular-nums">
            {metrics.forRent}
          </p>
          <p className="text-[11px] font-sans text-ink-muted">
            {Math.round((metrics.forRent / metrics.total) * 100)}% dari portofolio
          </p>
        </div>

        <div className="bg-white border border-sand-dark/70 rounded-sm p-5 space-y-1 shadow-xs">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-sage-dark flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sage" />
            <span>Tipologi Properti</span>
          </span>
          <p className="font-serif text-3xl font-bold text-ink tabular-nums">
            {metrics.uniqueTypes}
          </p>
          <p className="text-[11px] font-sans text-ink-muted">Kategori Arsitektur</p>
        </div>

        <div className="bg-white border border-sand-dark/70 rounded-sm p-5 space-y-1 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-sage-dark flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-bronze" />
            <span>Unggulan Terpilih</span>
          </span>
          <p className="font-serif text-3xl font-bold text-ink tabular-nums">
            {metrics.featured}
          </p>
          <p className="text-[11px] font-sans text-ink-muted">Pilihan Kurator</p>
        </div>
      </section>

      {/* Distribution Charts & Visualizations */}
      <section aria-label="Visualisasi Distribusi Portofolio" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Distribution */}
        <div className="bg-white border border-sand-dark/70 rounded-sm p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-sand-dark/40">
            <h3 className="font-serif text-base font-semibold text-ink">
              Distribusi Status Transaksi
            </h3>
            <span className="text-[10px] font-sans uppercase tracking-wider text-sage-dark font-medium">
              12 Unit
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {Object.entries(distributions.status).map(([status, count]) => {
              const pct = Math.round((count / metrics.total) * 100);
              const label = status === "dijual" ? "Dijual (Hak Milik / HGB)" : "Disewa (Sewa Jangka Panjang)";
              return (
                <div key={status} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="font-medium text-ink capitalize">{label}</span>
                    <span className="tabular-nums text-ink font-semibold">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-sand-light rounded-none overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        status === "dijual" ? "bg-ink" : "bg-bronze"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Type Distribution */}
        <div className="bg-white border border-sand-dark/70 rounded-sm p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-sand-dark/40">
            <h3 className="font-serif text-base font-semibold text-ink">
              Distribusi Tipologi Arsitektur
            </h3>
            <span className="text-[10px] font-sans uppercase tracking-wider text-sage-dark font-medium">
              {metrics.uniqueTypes} Tipe
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {Object.entries(distributions.type).map(([type, count]) => {
              const pct = Math.round((count / metrics.total) * 100);
              const typeNames: Record<string, string> = {
                rumah: "Rumah Tapak",
                vila: "Vila Tropis",
                apartemen: "Penthouse / Apartemen",
                townhouse: "Townhouse",
              };
              return (
                <div key={type} className="space-y-1">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="font-medium text-ink">{typeNames[type] || type}</span>
                    <span className="tabular-nums text-ink font-semibold">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-sand-light rounded-none overflow-hidden">
                    <div
                      className="h-full bg-bronze transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* City / Regional Distribution */}
        <div className="bg-white border border-sand-dark/70 rounded-sm p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-sand-dark/40">
            <h3 className="font-serif text-base font-semibold text-ink">
              Sebaran Geografis Kawasan
            </h3>
            <span className="text-[10px] font-sans uppercase tracking-wider text-sage-dark font-medium">
              {metrics.uniqueCities} Kota
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {Object.entries(distributions.city).map(([city, count]) => {
              const pct = Math.round((count / metrics.total) * 100);
              return (
                <div key={city} className="space-y-1">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="font-medium text-ink">{city}</span>
                    <span className="tabular-nums text-ink font-semibold">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-sand-light rounded-none overflow-hidden">
                    <div
                      className="h-full bg-sage-dark transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Inventory Table / Catalog Controls */}
      <section aria-label="Eksplorasi Inventaris Portofolio" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-sand-dark/60">
          <div className="space-y-1">
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-sage font-semibold block">
              TABEL INVENTARIS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold tracking-tight">
              Eksplorasi Koleksi Residensi
            </h2>
            <p className="text-xs font-sans text-ink-muted">
              Menampilkan {filteredProperties.length} dari {PROPERTIES.length} unit residensi terkurasi
            </p>
          </div>

          {/* Interactive Filters Dock */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-sage absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari properti, kode, kota..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-sand-dark/80 text-xs font-sans text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze rounded-none"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter berdasarkan status transaksi"
                className="px-3 py-2 bg-white border border-sand-dark/80 text-xs font-sans text-ink focus:outline-none focus:border-bronze rounded-none"
              >
                <option value="all">Semua Status</option>
                <option value="dijual">Dijual</option>
                <option value="disewa">Disewa</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1.5">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                aria-label="Filter berdasarkan tipe properti"
                className="px-3 py-2 bg-white border border-sand-dark/80 text-xs font-sans text-ink focus:outline-none focus:border-bronze rounded-none"
              >
                <option value="all">Semua Tipe</option>
                <option value="rumah">Rumah</option>
                <option value="vila">Vila</option>
                <option value="apartemen">Apartemen</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>

            {/* Clear Filter Button */}
            {isFiltered && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-sand text-ink text-xs font-sans font-medium hover:bg-sand-dark/50 transition-colors border border-sand-dark/70 rounded-none"
              >
                <RotateCcw className="w-3.5 h-3.5 text-sage" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white border border-sand-dark/70 rounded-sm p-12 text-center space-y-4 shadow-xs">
            <Filter className="w-8 h-8 text-sage mx-auto" />
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-semibold text-ink">
                Tidak Ada Properti yang Sesuai
              </h3>
              <p className="text-xs font-sans text-ink-muted max-w-md mx-auto">
                Kombinasi pencarian &ldquo;{keyword}&rdquo; dan filter yang Anda pilih tidak menghasilkan residensi yang cocok dalam portofolio 12 unit saat ini.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-limestone text-xs font-sans uppercase tracking-widest font-semibold hover:bg-bronze transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Bersihkan Filter Pencarian</span>
            </button>
          </div>
        ) : (
          /* Inventory Table (Desktop) & Cards (Mobile) */
          <div className="bg-white border border-sand-dark/80 rounded-sm overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-sand/60 border-b border-sand-dark/70 text-ink font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th scope="col" className="py-3.5 px-4">Properti &amp; Kode</th>
                    <th scope="col" className="py-3.5 px-4">Lokasi &amp; Kawasan</th>
                    <th scope="col" className="py-3.5 px-4">Status &amp; Tipe</th>
                    <th scope="col" className="py-3.5 px-4">Dimensi Spasial</th>
                    <th scope="col" className="py-3.5 px-4 text-right">Nilai Penawaran</th>
                    <th scope="col" className="py-3.5 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-dark/40">
                  {filteredProperties.map((property) => {
                    const primaryImg = property.images.find((img) => img.isPrimary) || property.images[0];
                    const priceFormatted = formatPropertyPrice(property.price, property.pricePeriod);

                    return (
                      <tr
                        key={property.id}
                        className="hover:bg-sand/20 transition-colors group"
                      >
                        {/* Title & Code */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-sm overflow-hidden bg-sand flex-shrink-0 border border-sand-dark/60">
                              <Image
                                src={primaryImg.url}
                                alt={primaryImg.alt}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <Link
                                href={`/properties/${property.slug}`}
                                className="font-serif text-sm font-semibold text-ink group-hover:text-bronze-dark transition-colors flex items-center gap-1"
                              >
                                <span>{property.title}</span>
                              </Link>
                              <span className="text-[10px] font-mono text-sage-dark block">
                                {property.code}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-0.5">
                            <span className="font-medium text-ink block">
                              {property.location.area}
                            </span>
                            <span className="text-ink-muted text-[11px]">
                              {property.location.city}
                            </span>
                          </div>
                        </td>

                        {/* Status & Type */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider rounded-none ${
                                property.status === "dijual"
                                  ? "bg-limestone text-ink border border-sand-dark"
                                  : "bg-bronze text-ink font-semibold"
                              }`}
                            >
                              {property.status === "dijual" ? "Dijual" : "Disewa"}
                            </span>
                            <span className="px-2 py-0.5 text-[10px] uppercase font-medium bg-sand/60 text-ink border border-sand-dark/40 rounded-none">
                              {property.type}
                            </span>
                          </div>
                        </td>

                        {/* Spatial Specs */}
                        <td className="py-3.5 px-4 tabular-nums text-ink-muted">
                          <div className="space-y-0.5">
                            <span>
                              {property.specs.landArea ? `LT ${property.specs.landArea} m² · ` : ""}
                              LB {property.specs.buildingArea} m²
                            </span>
                            <span className="block text-[11px] text-sage">
                              {property.specs.bedrooms} KT · {property.specs.bathrooms} KM
                            </span>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-4 text-right font-serif font-bold text-ink tabular-nums text-sm">
                          {priceFormatted}
                        </td>

                        {/* Detail Link CTA */}
                        <td className="py-3.5 px-4 text-center">
                          <Link
                            href={`/properties/${property.slug}`}
                            className="inline-flex items-center justify-center p-2 text-ink hover:text-bronze transition-colors hover:bg-sand/60 rounded-sm"
                            aria-label={`Buka detail ${property.title}`}
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
