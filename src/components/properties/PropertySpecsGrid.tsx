import type { PropertySpecs, PropertyType, ListingStatus } from "@/types/property";

interface PropertySpecsGridProps {
  specs: PropertySpecs;
  type: PropertyType;
  status: ListingStatus;
  code: string;
}

const TYPE_LABELS: Record<PropertyType, string> = {
  rumah: "Rumah Tapak",
  vila: "Vila Arsitektural",
  apartemen: "Apartemen / Penthouse",
  townhouse: "Townhouse Urban",
  komersial: "Properti Komersial",
};

export function PropertySpecsGrid({
  specs,
  type,
  status,
  code,
}: PropertySpecsGridProps) {
  const specItems = [
    {
      label: "Luas Bangunan (LB)",
      value: `${specs.buildingArea} m²`,
      detail: "Area interior terbangun",
    },
    {
      label: "Luas Tanah (LT)",
      value: specs.landArea ? `${specs.landArea} m²` : "—",
      detail: specs.landArea ? "Luas kavling hak atas tanah" : "Unit strata vertikal",
    },
    {
      label: "Kamar Tidur",
      value: `${specs.bedrooms} Kamar`,
      detail: "Termasuk master suite",
    },
    {
      label: "Kamar Mandi",
      value: `${specs.bathrooms} Kamar`,
      detail: "Termasuk ensuite bath",
    },
    {
      label: "Kapasitas Garasi",
      value: specs.garages ? `${specs.garages} Kendaraan` : "Carport privat",
      detail: "Area parkir tertutup",
    },
    {
      label: "Jumlah Lantai",
      value: specs.floors ? `${specs.floors} Lantai` : "Multi-level",
      detail: "Konfigurasi elevasi hunian",
    },
    {
      label: "Legalitas Sertifikat",
      value: specs.certificate ?? "SHM",
      detail: "Status kepemilikan terverifikasi",
    },
    {
      label: "Tahun Konstruksi",
      value: specs.yearBuilt ? `${specs.yearBuilt}` : "Terawat Prima",
      detail: "Standar arsitektur kontemporer",
    },
  ];

  return (
    <section aria-labelledby="specs-heading" className="space-y-4">
      <div className="flex items-center justify-between border-b border-sand-dark/60 pb-3">
        <h2 id="specs-heading" className="text-xl font-serif font-semibold text-ink">
          Spesifikasi Arsitektural
        </h2>
        <span className="text-xs font-mono tracking-wider text-sage-dark uppercase">
          KODE: {code} · {TYPE_LABELS[type]} · {status === "dijual" ? "DIJUAL" : "DISEWA"}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {specItems.map((item) => (
          <div
            key={item.label}
            className="p-4 bg-white/70 border border-sand-dark/40 rounded-sm hover:border-bronze/50 transition-colors"
          >
            <span className="text-[11px] font-sans uppercase tracking-widest text-sage-dark block mb-1">
              {item.label}
            </span>
            <span className="text-lg md:text-xl font-serif font-bold text-ink block tabular-nums">
              {item.value}
            </span>
            <span className="text-[11px] font-sans text-ink-muted/80 block mt-1">
              {item.detail}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
